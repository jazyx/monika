"use strict"


;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }
  


  function Level() {
    /////////////////////////////////////////////////////////////////
    this.name = "Consonants"
    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

   this.queue = []

    console.log(this.name + " is instantiated")
  }



  Level.prototype.initialize = function initialize() {
    console.log(this.name + " is being initialized")

    //div.addEventListener("transitionend", levelComplete, false)

    this.startGame()

    function levelComplete(event) {
      monika.completed(monika.level)
    }
  }



  Level.prototype.startGame = function startGame() {
    var self = this
    var section = document.querySelector("main section")
    var target
 
    /////////////////////////////////////////////////////////////////
    // Sent as options //
    /////////////////////////////////////////////////////////////////

    monika.manager.setOptions({
      cue_range: [ 0, 2, 4, 6, 8]
    , decoy_range: { start: 0, end: 9, sortby: "odd&even"}
    , repeats: 3
    , consecutive: false
    , audio: [ "numbers", "consonants" ]
    })

    this.variant = "Even"

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    this.queue = monika.manager.getQueue()

    let treatTap = (event) => {
      target = event.target

      while (target  && target.nodeName !== "LI") {
        target = target.parentNode
      }

      if (!target) {
        return
      } else if (target.classList.contains("touched")) {
        return
      }

      target.classList.add("touched")

      if (target.classList.contains("decoy")) {
        target.classList.add("disabled")

        // TODO: Remember this as an number to be revised
        this.queue.recycle(this.number)

      } else {

        let forceAndUseCallback = (--this.remaining)
                                 ? null
                                 : this.newChallenge.bind(this)
        monika.audio.play(this.audio, forceAndUseCallback)
      }
    }

    section.onmousedown = section.ontouchstart = treatTap // startTap
    this.newChallenge()
  }



  Level.prototype.newChallenge = function newChallenge() {
    const getNumber = () => {
      let number = this.queue.pop()

      if (number === this.number) {
        let canRecycle = this.queue.length
                       && (( this.queue.max() !== number
                          || this.queue.min() !== number))

        if ( canRecycle ) {
          this.queue.recycle(number)
          return getNumber()
        } else {
          // The rest of the queue is identical. Delete it
          this.queue.length = 0
          return
        }
      }

      this.number = number

      return number
    }

    var number = getNumber()

    if (number === undefined) {
      //alert("Time for a new level (when it's ready)")
      return this.startGame()
    }

    var cue = monika.manager.getCue(number)
    var decoys = cue.decoys
    var media  = cue.media
    var answer = cue.answer
    
    monika.audio.preload(media.audio)

    this.remaining = 3
    this.audio = answer.audio[0]

    function getCueArray(total) {
      total -= 1
      var cueArray = decoys.numbers.splice(0, total)
      cueArray.splice(random(total), 0, number)
      return cueArray
    }

    function random (max) {
      return Math.floor(Math.random() * max + 1)
    }

     /////////////////////////////////////////////////////////////////
  
     /**
     * This layout has 4 permutations:
     * Even:
     *    All cues, numbers and names will be even, consonant decoys
     *    will be chosen from odd numbers (where the numbers are not
     *    obvious yet, so their oddness won't be noticeable)
     * Odd:
     *    All cues, numbers and names will be odd, consonant decoys
     *    will be chosen from even numbers
     * Key
     *    All numbers will be used; but only key consonants for the
     *    cue. Secondary consonants will be shown dimmed
     * Multi
     *    All numbers will be used; all consonants for the cue will be
     *    shown and highlighted
     * Solo
     *    All numbers will be used, with only one consonant for the
     *    cue. It will become highlighted only after a pause or 2
     *    errors.
     * 
     * In all cases, the decoy consonants will be chosen from the
     * first 5 numbers in the decoy array. The decoy array will be
     * randomized, but the odd numbers may all be gathered at the
     * beginning (Even) or at the end (Odd).
     */
    const showConsonants = () => {
      var section = document.querySelector("article main section")
      var list = section.querySelectorAll("ul.consonants li")
      var total = list.length    
      var child

      var cueArray = getCueArray(total)

      // For the Key variant, the contents of each li need to be
      // custom built, with the secondary consonants in the 
      // background.

      // For the Multi variant, up to two decoys need to be removed
      // to make place for the cue consonants.

      // For Solo the consonant is chosen at random

      const getConsonant = (cue) => {
        let consonants = media.consonants[cue]

        switch (this.variant) {
          case "Even":
          case "Odd":
            return consonants[0]
          break
          case "Multi":

          break
        }
      }

      var total = list.length    
      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]
        let consonant = getConsonant(cue)

        while (child = li.lastChild) {
          li.removeChild(child)
        }

        li.className = ""

        if (cue === number) {
          li.innerHTML = "<span>" + consonant + "</span>"
        } else {
          li.innerHTML = consonant       
          li.classList.add("decoy")
        }
      }
    }

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    function showNames() {    
      var section = document.querySelector("article main section")
      var list = section.querySelectorAll("ul.words li")
      var total = list.length    
      var child

      var cueArray = getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]
        let name = decoys.names[cue] || answer.name.match(/[^|]+/)[0]
        let consonants = media.consonants[cue]
        let regex = new RegExp ("[" + consonants + "]")
        let match = name.match(regex)

        if (match) {
          name = name.replaceAt(match.index, "<span>" + match[0] + "</span>")
        }

        li.innerHTML = "<p>" + name + "</p>"
        li.className = ""

        if (cue !== number) {
          li.classList.add("decoy")
        }
      }
    }

    function showNumbers() {    
      var section = document.querySelector("article main section")
      var list = section.querySelectorAll("ul.numbers li")
      var total = list.length    
      var child

      var cueArray = getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]

        li.innerHTML = cue
        li.className = ""

        if (cue !== number) {
          li.classList.add("decoy")
        }
      }
    }

    /////////////////////////////////////////////////////////////////

    showConsonants()

    //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    showNames()
    showNumbers()
    monika.audio.play(this.audio)
  }



  Level.prototype.kill = function kill() {
    // Clean up when level is about to be replaced
  }



  if (typeof monika.level === "string") {
    if (typeof monika.map === "object") {
      var object = monika.map[monika.level] = new Level()
    }
  }

})(window.monika)