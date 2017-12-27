"use strict"


;(function gameLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> 


  if (!monika) {
    monika = window.monika = {}
  }


  class Game {
    constructor (sectionClass, options) {
      this.sectionClass = sectionClass

      this.options = options
      // Ensure there is a .name in options, for the timer
      this.name = options.name = options.name || options.className

      // HTML elements
      this.sections = [].slice.call(document.querySelectorAll("section"))
      this.section = document.querySelector("section." + this.sectionClass)
      this.header = document.querySelector("header h1")
      this.text = document.querySelector("header div")
      this.feedback = document.getElementById("feedback")
      this.mask = document.getElementById("mask")

      // Alternate images
      this.liForSelectingAnImage = null

      // Additional support
      this.support = options.support || "numbers"
      this.supportElement = null
      this.supportElements = {}
      this.lastErrorClass = ""

      // Events
      this.mask.onmouseup = this.mask.ontouchend = this.tapEnd.bind(this)

      this.trackTouchEvent = {} // may not be necessary
      this.tapStartData = { target: 0, time: 0}
      this.delay = 250 // ms required to trigger an alternative action

      // Challenges
      this.queue = []
      this.queue.recycle = function recycle(number) {
        let ii = Math.max(Math.floor(Math.random()*this.length-2), 0)
        this.splice(ii, 0, number)
      }

      // Data for wayPoints
      this.expectedTotal = 0
      this.answersPerChallenge = 3

      this.decoys = []
      this.names  = {}
      this.words  = {}
      this.images = {}
      this.number = -1
      this.remaining = 3
    }


    initialize() {
      // Show timer?
      let article = document.querySelector("article")

      if (this.options.timeless || monika.timeless) {
        article.classList.add("timeless")
      } else {
        article.classList.remove("timeless")         
      }

      // Listeners
      let supportCallback = this.provideSupport.bind(this)
      monika.support.addEventListener("failure", supportCallback)

      this.display()

      let tapStart = this.tapStart.bind(this)
      this.section.onmousedown = this.section.ontouchstart = tapStart

      monika.timer.prepareLevel(this.options)

      this.setHeader()
      this.number = -1
      this.expectedTotal = this.renewQueue()
      this.started = false
      this.correctAnswers = 0
      this.reward = 0
      this.errorInChallenge = false

      this.newChallenge()

      return this
    }


    display () {
      this.sections.forEach(section => {
        if (section === this.section) {
          section.classList.add("active")
        } else {
          section.classList.remove("active")
        }
      })

      this.feedback.classList.add("active")
    }


    // TOUCH EVENTS

    tapStart (event) {
      event.preventDefault()
      let target = event.target

      while (target && target.nodeName !== "LI") {
        target = target.parentNode
      }

      if (!target) {
        return
      }

      let time = new Date().getTime()
      this.tapStartData = { target: target, time: time}

      let trackTouch = this.trackTouch.bind(this)
      document.body.ontouchmove = trackTouch
      this.trackTouch(event)

      let tapEnd = this.tapEnd.bind(this)
      document.body.onmouseup = document.body.ontouchend = tapEnd
    }


    /** 
     * On a touch screen, the touchEnd event will not include a target
     * so we have to keep track of the last 
     */
    trackTouch(event) {
      this.trackTouchEvent = event
    }


    tapEnd (event) {
      document.body.ontouchmove = null
      document.body.onmouseup = document.body.ontouchend = null

      let target = event.target || this.trackTouchEvent.target
      let src
      let result = 1

      while (target && target.nodeName !== "LI") {
        target = target.parentNode
      }

      if (this.liForSelectingAnImage) {
        if (target) {
          src = event.target.src
        } else {
          src = this.liForSelectingAnImage.firstElementChild.firstElementChild.src
        }

        src = decodeURIComponent(src.match(/\/monika\/.*$/)[0])

        return this.selectImageForWord(this.liForSelectingAnImage, src)
      }

      let timeNow = new Date().getTime()
      let longTap = (timeNow - this.tapStartData.time) > this.delay

      if (target !== this.tapStartData.target) {
        return

      } else if (longTap) {
        return this.treatLongTap(target, event.target)
        
      } else if (target.classList.contains("touched")) {
        return
      }

      this.treatAnswer(target)
    }


    treatLongTap (liElement, target) {
      let type = liElement.parentNode.className
      // numbers | names | consonants | words | images

      switch (type) {
        case "images":
          this.showAlternativeImages(liElement, target)
        break
        default:
          monika.audio.play(liElement.src)
      }
    }


    // ALTERNATIVE IMAGES

    showAlternativeImages(liElement, target) {
      let src = target.src.match(/\/monika\/.*$/)[0]
      src = decodeURIComponent(src)

      let word = liElement.word
      let imgURLs = monika.media.getImageFor(word, "all")
      let count = imgURLs.length
      var innerHTML

      if (count > 8) {
        innerHTML = this.getRandomImages(imgURLs, src, 8)
        liElement.classList.add("multi", "nine")
      } else if (count > 3) {
        innerHTML = this.getRandomImages(imgURLs, src, 3)
        liElement.classList.add("multi", "four")
      } else {
        return
      }

      liElement.innerHTML = innerHTML
      this.mask.classList.add("multi")

      setTimeout(function () {
        liElement.classList.add("update")
      }, 1)

      monika.audio.play(liElement.src)
      this.liForSelectingAnImage = liElement
    }


    selectImageForWord(liElement, src) {
      liElement.innerHTML = '<img src="' + src + '"/>'

      liElement.classList.remove("multi", "four", "nine", "update")
      this.mask.classList.remove("multi")

      monika.menu.setUserImageForWord(liElement.word, src)
      this.liForSelectingAnImage = null
    }


    getRandomImages(imgURLs, src, count) {
      let innerHTML = "<div><img src='" + src + "'/>" 

      imgURLs = [].concat(imgURLs)
      imgURLs.splice(imgURLs.indexOf(src), 1)
      let remaining = imgURLs.length 

      for ( let ii=0 ; ii < count ; ii += 1 ) {
        let random = Math.floor(Math.random() * remaining)
        let imgURL = imgURLs.splice(random, 1)[0]
        innerHTML += '<img src="' + imgURL + '"/>'

        remaining--
      }

      innerHTML += "<div>"

      return innerHTML
    }


    // PREPARE CHALLENGE
   

    setHeader() {
      this.header.innerHTML = this.options.header || ""
      this.text.innerHTML = this.options.text || ""
    }


    renewQueue() {
      let queue = this.queue
      queue.length = 0

      let range = this.options.cue_range
      let repeat = this.options.repeat

      const populateRangeQueue = () =>{     
        let end = range.end + 1
        for (let ii = range.start ; ii < end; ii += 1) {
          for (let jj = 0; jj < repeat; jj += 1) {
            queue.push(ii)
          }
        }
      }

      const populateDiscreteQueue = () => {
        let total = range.length
        for (let ii = 0 ; ii < total; ii += 1) {
          for (let jj = 0 ; jj < repeat; jj += 1) {
            queue.push(range[ii])
          }
        }
      }

      if (range instanceof Array) {
        populateDiscreteQueue()
      } else {
        populateRangeQueue()
      }

      this.shuffle(queue)

      // Start with the numbers in numerical order?
      if (this.options.consecutive) {
        let end = range.start - 1
        for ( let ii = range.end ; end < ii; ii -= 1 ) {
          queue.push(ii)
        }

        if (end < 0) {
          // Don't start with zero
          queue.pop()
        } 
      }

      return queue.length
    }


    shuffle(array) {
      let ii = array.length
      while (ii--) {
        let random = Math.floor(Math.random() * ii)
        let temp = array[random]
        array[random] = array[ii]
        array[ii] = temp
      }
    }


    getNextNumber() {
      let number = this.queue.pop()

      if (number === this.number) {
        let canRecycle = this.queue.length
                       && (( this.queue.max() !== number
                          || this.queue.min() !== number))

        if ( canRecycle ) {
          this.queue.recycle(number)
          return this.getNextNumber()

        } else {
          // The rest of the queue is identical. Delete it
          this.queue.length = 0
          return
        }
      }

      log(this.queue)

      return number
    }


    setDecoys() {
      var decoys = this.decoys
      var available = []
      var range = this.options.decoy_range
      var sortBy = this.options.sortBy
      var count

      decoys.length = 0

      const makeRangeSelection = () => {
        var start = range.start
        var stop = range.end + 1
        var ii
          , random
          , decoy

        for (ii = start; ii < stop; ii += 1) {
          if (ii !== this.number) {
            available.push(ii)
          }
        }    
      }

      const makeDiscreteSelection = () => {
        let index = range.indexOf(this.number)
        available = available.concat(range)

        if (index < 0) {
        } else {
          available.splice(index, 1)
        }
      }

      if (range instanceof Array) {
        makeDiscreteSelection()
      } else {
        makeRangeSelection()
      }

      count = available.length
      for ( ; count; count -=1 ) {
        let random = Math.floor(Math.random() * count)
        let decoy = available.splice(random, 1)[0]
        decoys.push(decoy)
      }  

      switch (sortBy) {
        case "odd&even":
          moveEvenToTheEnd(0)
        break
        case "even&odd":
          moveEvenToTheEnd(1)
        break
      }

      function moveEvenToTheEnd(filter) {
        let ii = decoys.length
        for ( ; ii-- ; ) {
          let number = decoys[ii]
          if (filter === number % 2) {
            decoys.splice(ii, 1)
            decoys.push(number)
          }
        }
      }
    }


    setNames() {
      this.names[this.number] = monika.media.getNameFor(this.number)

      this.decoys.forEach(decoy => {
        this.names[decoy] = monika.media.getNameFor(decoy)
      })
    }


    setWords(number) {        
      this.words[this.number] = monika.media.getWordFor(this.number)

      this.decoys.forEach(decoy => {
        this.words[decoy] = monika.media.getWordFor(decoy)
      })  
    }


    setImages() {
      var word = this.words[this.number]
      this.images[word] = monika.media.getImageFor(word)

      this.decoys.forEach(decoy => {
        word = this.words[decoy]
        this.images[word] = monika.media.getImageFor(word)
      })
    }


    getCueArray(total, dontAddAnswer) {
      total -= 1
      var cueArray = this.decoys.splice(0, total)

      if (!dontAddAnswer) {
        cueArray.splice(random(total), 0, this.number)
      }

      return cueArray
      
      function random(max) {
        return Math.floor(Math.random() * (max + 1))
      }
    }


    showNumbers() {
      var list = this.section.querySelectorAll("ul.numbers li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]

        li.innerHTML = cue
        li.className = ""
        li.number = cue
        li.src = monika.media.getAudioFor("number", cue)

        if (cue !== this.number) {
          li.classList.add("decoy")
        } else {
          this.supportElements["numbers"] = li
        }
      }
    }
    

    showNames() {
      var list = this.section.querySelectorAll("ul.names li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li     = list[ii]
        let cue    = cueArray[ii]
        let name   = this.names[cue]
       
        li.word = name

        // Colour the consonants
        let mapped = monika.media.consonants.map[cue]
        let regex  = new RegExp ("[" + mapped + "]")
        let match  = name.match(regex)

        if (match) {
          name = name.replaceAt(match.index, "<span>" + match[0] + "</span>")
        }

        li.innerHTML = "<p>" + name + "</p>"
        li.className = ""
        li.number = cue
        li.src = monika.media.getAudioFor("number", cue)

        if (cue !== this.number) {
          li.classList.add("decoy")
        } else {
          this.supportElements["names"] = li
        }
      }
    }
    

    showWords() {
      var list = this.section.querySelectorAll("ul.words li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li    = list[ii]
        let cue   = cueArray[ii]
        let word  = this.words[cue]
        let audio = word

        // Colour the consonants
        let mapped = monika.media.consonants.map[cue]
        let regex  = new RegExp ("[" + mapped + "]")
        let match  = word.match(regex)

        if (match) {
          word = word.replaceAt(match.index, "<span>" + match[0] + "</span>")
        }

        li.innerHTML = "<p>" + word + "</p>"
        li.className = ""
        li.number = cue
        li.word = word
        li.src = monika.media.getAudioFor("word", audio)

        if (cue !== this.number) {
          li.classList.add("decoy")
        } else {
          this.supportElements["words"] = li
        }
      }
    }
    

    showImages() {
     var list = this.section.querySelectorAll("ul.images li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]
        let word = monika.media.getWordFor(cue)
        let img = monika.media.getImageFor(word)

        if (img[0] === "&") {
          li.innerHTML = img
        } else {
          li.innerHTML = "<img src='" + img + "'/>"
        }

        li.className = ""
        li.number = cue
        li.word = word
        li.src = monika.media.getAudioFor("word", word)

        if (cue !== this.number) {
          li.classList.add("decoy")
        } else {
          this.supportElements["images"] = li
        }
      }
    }


    getConsonant (cue) {
      return monika.media.consonants.map[cue][0]
    }


    showConsonants () {
      var list = this.section.querySelectorAll("ul.consonants li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total) 

      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]
        let consonant = this.getConsonant(cue)

        li.className = ""
        li.number = cue
        li.src = monika.media.getAudioFor("consonant", consonant)

        if (cue === this.number) {
          li.innerHTML = "<span>" + consonant + "</span>"
           this.supportElements["consonants"] = li
       } else {
          li.innerHTML = consonant       
          li.classList.add("decoy")
        }
      }
    }


    setCue() {
      let audioCue = monika.media.getAudioFor("number", this.number)
      monika.audio.play(audioCue)
    }


    newChallenge() {
      this.number = this.getNextNumber()

      if (this.number === undefined) {
        log ("no more numbers in newChallenge")
        let reward = monika.timer.getReward()
        log ("reward in newChallenge: ", reward)
        return monika.pass.show(reward)

      }

      // Allow 3 errors in a row before triggering support
      monika.support.absolve()
      this.errorInChallenge = false // add this.number to queue only once

      this.setDecoys()
      this.setNames()
      this.setWords()
      this.setImages()

      this.showNumbers()
      this.showNames()
      this.showWords()
      this.showImages()
      this.showConsonants()

      this.remaining = 3

      this.setCue()
    }


    // ANSWERS 

    treatAnswer(target) {
      if (!this.started) {
        this.started = monika.timer.start()
      }

      target.classList.add("touched")

      let result = !(target.classList.contains("decoy"))

      if (result) {
        this.treatCorrectAnswer(target)

      } else {
        this.treatWrongAnswer(target) 
      }

      this.performCustomAction(target)

      this.updateTimer()

      monika.support.treatResult(result)
    }


    performCustomAction (target) {
      // Do nothing. May be overridden by inheritors.
    }


    updateTimer() {
      let soFar =  this.correctAnswers /
        (this.expectedTotal * this.answersPerChallenge)

      monika.timer.addWayPoint(soFar)
    }


    // ERRORS

    getListClass(listElement) {
      let className = listElement.className // "" at least
      while (listElement && !className) {
        listElement = listElement.parentNode
        className = listElement.className
      }

      // May contain active or some other words. Assume that at least
      // one of the words in the regex below is applied.
      className = className.match(/numbers|names|consonants|words|images/)
      if (className) {
        className = className[0]
      } else {
        className = ""
      }

      return className
    }

    numberIsInRange(wrongNumber) {
      let range = this.options.cue_range // ? decoy_range
      let max = range.end

      if (max) {
        return !(wrongNumber > max)
      }

      // If we get here, cue_range is an array
      return range.indexOf(wrongNumber) > -1
    }


    treatWrongAnswer(target) {
      let wrongNumber = target.number
      let wrongInRange = this.numberIsInRange(wrongNumber)

      // Only add this cue number once per error
      if (!this.errorInChallenge) {
        this.queue.recycle(this.number)
        this.expectedTotal += 1
        this.errorInChallenge = true
      }

      // TODO: Remember this as an number to be revised everywhere

      if (wrongInRange) {
        this.queue.recycle(wrongNumber)
        this.expectedTotal += 1
      }

      
      this.lastErrorClass = this.getListClass(target)

      target.classList.add("disabled")
    } 


    // MULTIPLE ERRORS

    provideSupport(support) {
      let instructions = {
        pause:   false // don't count errors until `resume` is called
      , skip:    0     // ignore the next n errors
      , absolve: false // reset successArray to all 1s
      , forgive: 0     // replace the n most recent 0s with 1s
      , forget:  2     // replace the n oldest 0s with 1s
      }

      monika.support.execute(instructions)

      this.supportElement = this.supportElements[this.support]
      let string = this.names[this.number]

      let options = {
        htmlElement: this.supportElement.cloneWithStyle()
      , string:      string
      // , options: {
      //     highlightNext: true
      //   , enableKeys: true
      //   , showModel: true
      //   }
      //, audio:       audio
      , callback:    this.callbackFromSupport.bind(this)
      }

      monika.customKeyboard.setInputCue(options)
    }
     

    callbackFromSupport(message) {
      switch (message) {
        case "open": 
        case "done": // fallthrough
          if (this.supportElement && this.supportElement.src) {
            monika.audio.play(this.supportElement.src)
          }
        break
      }
    }


    // CORRECT ANSWERS

    treatCorrectAnswer(target) {
      let src = target.src

      let forceAndUseCallback = (--this.remaining)
                              ? null
                              : this.newChallenge.bind(this)
      monika.audio.play(src, forceAndUseCallback)

      this.correctAnswers += 1
    }


    cleanUp() {
      this.section.onmousedown = this.section.ontouchstart = null
      this.feedback.classList.remove("active")
      monika.support.removeEventListener("failure", "all")
    }
  }


  monika.Game = Game

})(window.monika) 