"use strict"


;(function loaded(monika){
  // monika = 
  // { Game: class
  // , classes: {Intro, EvenConsonants, …}
  // , layouts: {Digits, Words, ...}
  // , levelOptions: {"1": {...}, ...}
  // , levels: {}
  // , media: {}
  // }


  const STORAGE_NAME = "monika"


  class Menu {
    constructor () {
      this.level = 1
      this.levelInstance = null // will be instance of level class
      this.levelTarget = null   // will be button touched on menu
      this.menu = document.querySelector( 'nav section' )
      this.check = document.querySelector( 'input[type=checkbox]' )
      this.links = [].slice.call(document.querySelectorAll("nav a"))
      this.preferences = {}

      this.updateStatus()

      // Mouse events
      {
        let touchLevel = this.touchLevel.bind(this)
        this.menu.addEventListener("mousedown", touchLevel, false)
        this.menu.addEventListener("touchstart", touchLevel, false)

        // Prevent a movable label from appear when user drags on link
        this.menu.ondragstart = function() { return false; }

        let closeMenu = this.closeMenu.bind(this)
        document.body.addEventListener("mousedown", closeMenu, false)
        document.body.addEventListener("touchstart", closeMenu, false)
      }
    }


    // PRIVATE METHODS


    // Called automatically immediately after constructor()
    initialize() {
      let level = parseInt(window.location.hash.substring(1), 10) || 0
      let force = /[?&]force$/.test(window.location.href)

      if (force) {
        if (level > 0) {
          if (this.preferences.levels.indexOf(level) < 0) {
            this.level = level
            this.updateStatus()
          }
        }

      } else {
        level = Math.min(level, this.bestLevel())
      }

      if (level) {
        let success = this.setLevel(level, "dontOpen")
        if (success) {
          this.showActiveLevel()
          this.check.checked = true
        }
      }
    }


    // Called by mousedown|touchstart anywhere but on the menu
    closeMenu(event) {
      let target = event.target

      if (this.check.checked) {
        while (target && target.nodeName !== "NAV") {
          target = target.parentNode
        }

        if (!target) {
          // The user tapped outside the open menu. Close it.
          this.check.checked = false
        }
      }
    }


    // Called by mousedown|touchstart on the menu
    touchLevel(event) {
      let target = event.target

      while (target && target.nodeName !== "A") {
        target = target.parentNode
      }

      if (!target) {
        return
      }

      this.levelTarget = target
      let selectLevel = this.selectLevel.bind(this)

      document.body.onmouseup = document.body.ontouchend = selectLevel
    }


    // Called by a mouseup|touchend, as set in touchLevel
    selectLevel(event) {
      var success
      let level = this.levelTarget.innerHTML

      if (event.target !== this.levelTarget) {
        log(
          "Button"
        , level
        , "touched,"
        , "but button"
        , event.target.innerHTML
        , "released. No action.")
        return // Leave the menu open
      }

      if (this.levelTarget.parentNode.classList.contains("ref")) {
        success = this.showReference(this.levelTarget)
      } else {
        success = this.setLevel(level)
      }

      if (success) {
        // Close the menu
        this.levelTarget = 0
        document.body.onmouseup = document.body.ontouchend = null
        this.check.checked = false
      }
    }


    // Called by selectLevel when user selects АБВ or 123 pre-levels
    showReference(link) {
      let hash = decodeURIComponent(link.hash)
      return this.displayRef(hash, )
    }


    // Called by setLevel
    getLevel(options) {
      let className = options.className
      let levelName = options.name || className

      let level = monika.levels[levelName]

      if (!level) {
        let levelClass = monika.classes[className]

        if (levelClass) {
          level = new levelClass(options)
          monika.levels[levelName] = level

        } else {
          log("Unknown level:", className)
        }
      }

      return level 
    }


    /**
     * Called by initialize, selectLevel, displayRef and completeLevel
     *
     * When called by initialize() on launch, dontOpen will be true.
     * This simply opens the menu at the chosen level, so that the
     * end user can tap and thus activate audio.
     * 
     * TODO: On a non-touch-screen device, there is no need for an
     * extra click. We should detect the type of device and ignore
     * `dontOpen` if it's not needed.
     *
     * @param      {Function}  level     The level
     * @param      {<type>}    dontOpen  The don't open
     * @return     {boolean}   { description_of_the_return_value }
     */
    setLevel(level, dontOpen, dontScroll) {
      log("Level", level, "selected")
      let options = monika.levelOptions[level]
      var intLevel = parseInt(level, 10) || false

      if (options) {
        let levelInstance = this.getLevel(options)

        if (levelInstance) {
          if (this.levelInstance) {
            this.levelInstance.cleanUp()
          }

          if (intLevel) {
            this.level = intLevel
          }
          
          if (!dontOpen) {
            this.levelInstance = levelInstance.initialize(options)

            this.showActiveLevel()
            this.updateStatus()
            monika.customKeyboard.close()

            if (!dontScroll) {
              window.scrollTo(0, 1)
            }
          }

          return true
        }
      }

      log("No level options found for level", level)
      return false
    }


    // Called by initialize, displayLevel and setLevel
    showActiveLevel(levelIndex) {
      let list = document.querySelectorAll("nav li")
      levelIndex = levelIndex || this.level - 1

      var total = list.length       
      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        if (ii === levelIndex) {
          li.classList.add("active")
          li.scrollIntoView()
        } else {
          li.classList.remove("active")
        }
      }
    }


    // Called by constructor, initialize and setLevel
    updateStatus() {
      let preferences

      try {
        preferences = JSON.parse(localStorage[STORAGE_NAME])
      } catch(error) {}

      if (!preferences) {
        preferences = this.preferences
      }

      let user_images = preferences.user_images
      if (!user_images) {
        user_images = {}
        preferences.user_images = user_images
      }

      let levelsPlayed = preferences.levels
      if (!levelsPlayed) {
        levelsPlayed = []
        preferences.levels = levelsPlayed
      }

      if (this.level && (levelsPlayed.indexOf(this.level) < 0)) {
        levelsPlayed.push(this.level)
      }

      localStorage[STORAGE_NAME] = JSON.stringify(preferences)
      this.preferences = preferences

      this.updateMenu()
    }


    // Called by initialize and updateMenu
    bestLevel() {
      let unlocked = this.preferences.levels
      let bestLevel = Math.max.apply(null, unlocked)

      return bestLevel
    }


    // Called by updateStatus
    updateMenu() {
      let list = document.querySelectorAll("nav li")
      let bestLevel = this.bestLevel()

      var total = list.length       
      for ( let ii = 0; ii < total; /* see below */ ) {
        // Increment ii after getting the list item
        let li = list[ii++]
        // ii is now equal to the level for the li element

        if (ii === this.level) {
          li.classList.add("active")
          li.scrollIntoView()

        } else {
          li.classList.remove("active")
        }

        if (ii > bestLevel) {
          li.setAttribute("disabled", "")
        } else {
          li.removeAttribute("disabled")
        }
      }
    }

    // PUBLIC METHODS


    // Called by the newChallenge method in game.js and its inheritors
    completeLevel() {
      let level = (this.level || 0) + 1
      let success = this.setLevel(level)

      // Placeholder jubilation

      if (success) {
        alert (
          "**** Fireworks display! ****\n\n"
        + "You've reached the next level!\n\n"
        + "Молодец!")
      } else {         
        alert ("You've reached the end! Congratulations")
      }
    }


    // Called by selectImageForWord in game.js
    setImageForWord(word, src) {
      let user_images = this.preferences.user_images

      if (!user_images) {
        user_images = {}
        this.preferences.user_images = user_images
      }

      user_images[word] = src
      localStorage[STORAGE_NAME] = JSON.stringify(this.preferences)
    }


    // Called by showReference and also by toggleType in layout/reference.js
    displayRef(hash, dontScroll) {
      let refLinks = document.querySelectorAll("nav div.ref a")

      this.showActiveLevel(-1) // doesn't change this.level

      var total = refLinks.length       
      for (let ii = 0; ii < total; ii += 1) {
        let refLink = refLinks[ii]
        if (refLink.hash === hash) {
          refLink.classList.add("active")
        } else {
          refLink.classList.remove("active")
        }
      }

      this.setLevel(hash.substring(1), false, dontScroll)

      return true
    }
  }


  monika.menu = new Menu()
  monika.menu.initialize()

})(window.monika)