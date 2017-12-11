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
  const STATUS = { 
      locked: "locked"
    , active: "active"
    , unlocked: "unlocked"
    , started: "started"
    , completed: "completed"
    , archived: "archived" // may be synonym for completed
    }

  class Menu {
    constructor () {
      this.level = 1
      this.levelInstance = null // will be instance of level class
      this.levelTarget = null   // will be button touched on menu
      this.menu = document.querySelector( 'nav ul' )
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


    initialize() {
      let level = parseInt(window.location.hash.substring(1), 10)
      let force = /[?&]force$/.test(window.location.href)

      if (force) {
        if (!isNaN(level) && level > 0) {
          if (this.preferences.levels.indexOf(level) < 0) {
            this.level = level
            this.updateStatus()
          }
        }

      } else {
        level = Math.min(level, this.bestLevel())
      }

      let success = this.setLevel(level, "dontOpen")
      if (success) {
        this.showActiveLevel()
        this.check.checked = true
      }
    }


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


    selectLevel(event) {
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

      let success = this.setLevel(level)

      if (success) {
        // Close the menu
        this.levelTarget = 0
        document.body.onmouseup = document.body.ontouchend = null
        this.check.checked = false
      }
    }


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


    setLevel(level, dontOpen) {
      log("Level", level, "selected")
      let options = monika.levelOptions[level]
      var intLevel = parseInt(level, 10)

      if (options) {
        let levelInstance = this.getLevel(options)

        if (levelInstance) {
          if (this.levelInstance) {
            this.levelInstance.cleanUp()
          }

          this.level = intLevel

          if (!dontOpen) {
            this.levelInstance = levelInstance.initialize(options)

            this.showActiveLevel()
            this.updateStatus()
          }

          return true
        }
      }

      log("No level options found for level", level)
      return false
    }


    showActiveLevel() {
      let list = document.querySelectorAll("nav li")
      let levelIndex = this.level - 1

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


    bestLevel() {
      let unlocked = this.preferences.levels
      let bestLevel = Math.max.apply(null, unlocked)

      return bestLevel
    }


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


    selectImageForWord(word, src) {
      let user_images = this.preferences.user_images

      if (!user_images) {
        user_images = {}
        this.preferences.user_images = user_images
      }

      user_images[word] = src
      localStorage[STORAGE_NAME] = JSON.stringify(this.preferences)
    }
  }


  monika.menu = new Menu()
  monika.menu.initialize()

})(window.monika)