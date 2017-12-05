// ss/levels.js

// For each level, this script knows
// * The layout to use (html & css)
// * The game play (script)
// * The media to use
// * The initial order


;(function manageMonika(window, document) {
  const $article = $("body > article")
  const levelOptions = {} // populated below
  const layoutPath = "layouts/"
  const menu = document.querySelector("nav ul")
  const check = document.querySelector("input[type=checkbox]")

  var monika = window.monika
  var level_css = document.querySelector("link.level")
  var level_js = document.querySelector("script.level")
  var levelTarget = 0
  var levelName
  var levelObject

  ;(function initializeMonika() {
    // Global object that each new level script will have access to
 
    if (!monika) {
      monika = window.monika = {}
    }

    monika.map = {}  // level objects will be added here
    
    // .level and .options will change depending on the level
    monika.level = ""
    monika.options = {}

    // .media and .completed will not change
    monika.completed = levelCompleted // method below
    // monika.media = added in json.js scrit
  })()

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

  function loadLevel(level) {
    var levelData = monika.options = levelOptions[level]
    var levelPath = layoutPath + levelData.layout + "/layout."

    // GET AJAX AND CALL prepareLevel() ON SUCCESS
    var remaining = 3

    check.checked = false 

    if (level === levelName) {
      // RELOAD?
      // return
    }

    levelName = monika.level = level

    $article.load(levelPath+"html", loaded)
    level_css = swapFile(level_css, "link", "href", levelPath + "css")
    level_js = swapFile(level_js, "script", "src", levelPath + "js")

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
        
        levelObject = monika.map[levelName]

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
      layout: "01_digits"
    , numbers: 9
    , order: "exact"
    , media: "simple"
    }
  //// Even digits and their key consonants
    levelOptions[2] = {
      layout: "consonants"
    , numbers: [2, 4, 6, 8, 0]
    , consonants: "дцшвн"
    , order: "exact"
    , media: "simple"
    }
    // Odd digits and their key consonants
    levelOptions[3] = {
      layout: "consonants"
    , numbers: [1, 3, 5, 7, 9]
    , consonants: "ркпсм"
    , order: "random"
    , media: "simple"
    }
    // All digits and their key consonants
    levelOptions[4] = {
      layout: "consonants"
    , numbers: 9
    , consonants: "рдкчпшсвмн"
    , order: "random"
    , media: "simple"
    , options: { colour: "ркм", show_alternatives: true }
    }
    // All digits and all their consonants
    levelOptions[5] = {
      layout: "consonants"
    , numbers: 9
    , order: "random"
    , media: "simple"
    , options: { use: 3 }
    }
    // All digits and all their consonants
    levelOptions[6] = {
      layout: "consonants"
    , numbers: 9
    , order: "exact"
    , media: "simple"
    , options: { use: 1, colour: "pause" }
    }
  //// Words for digits
    levelOptions[7] = {
      layout: "words"
    , numbers: 9
    , order: "random"
    , media: "simple"
    }
  //// Consonant cue
    levelOptions[8] = {
      layout: "consonant_cue"
    , numbers: 9
    , order: "random"
    , media: "simple"
    }
  //// Image cue
    levelOptions[9] = {
      layout: "image_cue"
    , numbers: 9
    , order: "random"
    , media: "simple"
    }
  //// Image cue
    levelOptions[9] = {
      layout: "image_cue"
    , numbers: 9
    , order: "random"
    , media: "simple"
    }
    // Image cue with varied images
    levelOptions[10] = {
      layout: "image_cue"
    , numbers: 9
    , order: "random"
    , media: ["images"]
    }
  //// Number cue with varied images
    levelOptions[11] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: 9
    , order: "random"
    , media: ["images"]
    , options: { colour: "pause" }
    }
    // Number cue with varied images (colour all consonants in words)
    levelOptions[11] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    }

    //...

  //// 
    levelOptions[13] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    }
  //// 
    levelOptions[14] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    }

    //...

  //// 
    levelOptions[19] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    }

    //...

  //// 
    levelOptions[24] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    }

    //...

  //// 
    levelOptions[29] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    }

    //...

  //// 
    levelOptions[34] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    }

    //...

  //// 
    levelOptions[39] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    }
  //// 
    levelOptions[40] = {
      layout: "number_cue" // may be same as consonant cue
    , numbers: { start: 10, end: 19 }
    , order: "exact"
    , media: "simple"
    }
//////
})(window, document)