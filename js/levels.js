// ss/levels.js

// For each level, this script knows
// * The layout to use (html & css)
// * The game play (script)
// * The media to use
// * The initial order
// 
// This script contains a map of 

;(function levels(window, document) {
  const $article = $("body > article")
  const levelOptions = {} // populated below
  const paths = {
    layout: "layouts/"
  , js: "js/"
  }
  const menu = document.querySelector("nav ul")
  const check = document.querySelector("input[type=checkbox]")

  var level_css = document.querySelector("link.level")
  var level_js = document.querySelector("script.level")
  var levelTarget = 0
  var levelName
  var levelObject

  // Create a global object that each new level script will have
  // access to
  window.level = {
    map: {}  // level objects will be added here
  // .name and .options will change depending on the level
  , name: ""
  , options: {}
  // .paths and .completed will not change
  , paths: {
    // TODO: populate this map
  }
  , completed: levelCompleted // method below
  }

  menu.addEventListener("mousedown", touchLevel, false)
  menu.addEventListener("touchstart", touchLevel, false)

  function touchLevel(event) {
    levelTarget = event.target

    document.body.addEventListener("mouseup", selectLevel,false)
    document.body.addEventListener("touchend", selectLevel,false)
  }

  function selectLevel(event) {
    if (event.target !== levelTarget) {
      console.log(
        "Button"
      , levelTarget.innerHTML
      , "touched,"
      , "but button"
      , event.target.innerHTML
      , "released. No action.")

    } else {
      console.log("Level", levelTarget.innerHTML, "selected")
      loadLevel(levelTarget.innerHTML)
    }

    levelTarget = 0
    document.body.removeEventListener("mouseup", selectLevel,false)
    document.body.removeEventListener("touchend", selectLevel,false)
  }

  function loadLevel(name) {
    var levelData = level.options = levelOptions[name]
    var layoutPath = paths.layout + levelData.layout + "/level."
    var scriptPath = paths.js + levelData.script

    // GET AJAX AND CALL prepareLevel() ON SUCCESS
    var remaining = 3

    check.checked = false 

    if (name === levelName) {
      return
    }

    levelName = level.name = name

    $article.load(layoutPath+"html", loaded)
    level_css = swapFile(level_css, "link", "href", layoutPath + "css")
    level_js = swapFile(level_js, "script", "src", scriptPath)

    function loaded(mainElement) {
      checkIfAllIsLoaded()
    }

    /**
     * Callback for link and script, set in swapFile
     *
     * @param  {event}  event   Object containing the data for the
     *                          onload event
     */
    function elementLoaded(event) {
      var element = event.target

      element.removeEventListener("load", elementLoaded, false)
      checkIfAllIsLoaded()
    }

    function checkIfAllIsLoaded() {
      if (!--remaining) {
        // HTML and CSS are ready, and the IIFE in the JS file will
        // have triggered.
        
        levelObject = level.map[levelName]

        if (levelObject && levelObject.initialize) {
          levelObject.initialize()

        } else {
          console.log("Unable to initialize level " + levelName)
        }
      }
    }

    function swapFile(current, type, attribute, path) {
      var element = document.createElement(type)

      current.parentNode.replaceChild(element, current)
      element.addEventListener("load", elementLoaded, false)

      if (type === "link") {
        element.setAttribute("rel", "stylesheet")
        element.setAttribute("type", "text/css")
      }

      element.setAttribute(attribute, path)

      return element
    }
  }

  function prepareLevel(argument) {
    console.log("prepareLevel called")
  }


  function levelCompleted() {
    console.log("Level completed")
  }

  ////////////////////////////////////////////////////////////////////
  // LEVEL OPTIONS / LEVEL OPTIONS // LEVEL OPTIONS / LEVEL OPTIONS //
  ////////////////////////////////////////////////////////////////////

//// Digits and their names
    levelOptions[1] = {
      layout: "intro"
    , numbers: 9
    , order: "exact"
    , media: "simple"
    , script: "intro.js"
    }
  //// Even digits and their key consonants
    levelOptions[2] = {
      layout: "consonants"
    , numbers: [2, 4, 6, 8, 0]
    , consonants: "дцшвн"
    , order: "exact"
    , media: "simple"
    , script: "consonants.js"
    }
    // Odd digits and their key consonants
    levelOptions[3] = {
      layout: "consonants"
    , numbers: [1, 3, 5, 7, 9]
    , consonants: "ркпсм"
    , order: "random"
    , media: "simple"
    , script: "consonants.js"
    }
    // All digits and their key consonants
    levelOptions[4] = {
      layout: "consonants"
    , numbers: 9
    , consonants: "рдкчпшсвмн"
    , order: "random"
    , media: "simple"
    , script: "consonants.js"
    , options: { colour: "ркм", show_alternatives: true }
    }
    // All digits and all their consonants
    levelOptions[5] = {
      layout: "consonants"
    , numbers: 9
    , order: "random"
    , media: "simple"
    , script: "consonants.js"
    , options: { use: 3 }
    }
    // All digits and all their consonants
    levelOptions[6] = {
      layout: "consonants"
    , numbers: 9
    , order: "exact"
    , media: "simple"
    , script: "consonants.js"
    , options: { use: 1, colour: "pause" }
    }
  //// Words for digits
    levelOptions[7] = {
      layout: "words"
    , numbers: 9
    , order: "random"
    , media: "simple"
    , script: "words.js"
    }
  //// Consonant cue
    levelOptions[8] = {
      layout: "consonant_cue"
    , numbers: 9
    , order: "random"
    , media: "simple"
    , script: "consonant_cue.js"
    }
  //// Image cue
    levelOptions[9] = {
      layout: "image_cue"
    , numbers: 9
    , order: "random"
    , media: "simple"
    , script: "image_cue.js"
    }
  //// Image cue
    levelOptions[9] = {
      layout: "image_cue"
    , numbers: 9
    , order: "random"
    , media: "simple"
    , script: "image_cue.js"
    }
    // Image cue with varied images
    levelOptions[10] = {
      layout: "image_cue"
    , numbers: 9
    , order: "random"
    , media: ["images"]
    , script: "image_cue.js"
    }
  //// Number cue with varied images
    levelOptions[11] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: 9
    , order: "random"
    , media: ["images"]
    , script: "number_cue.js"
    , options: { colour: "pause" }
    }
    // Number cue with varied images (colour all consonants in words)
    levelOptions[11] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    , script: "number_cue.js"
    }

    //...

  //// 
    levelOptions[13] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    , script: "number_cue.js"
    }
  //// 
    levelOptions[14] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    , script: "number_cue.js"
    }

    //...

  //// 
    levelOptions[19] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    , script: "number_cue.js"
    }

    //...

  //// 
    levelOptions[24] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    , script: "number_cue.js"
    }

    //...

  //// 
    levelOptions[29] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    , script: "number_cue.js"
    }

    //...

  //// 
    levelOptions[34] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    , script: "number_cue.js"
    }

    //...

  //// 
    levelOptions[39] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    , script: "number_cue.js"
    }
  //// 
    levelOptions[40] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    , script: "number_cue.js"
    }
//////
})(window, document)