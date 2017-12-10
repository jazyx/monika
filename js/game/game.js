"use strict"


;(function gameLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> 


  if (!monika) {
    monika = window.monika = {}
  }


  class Game {
    constructor (articleClass, options) {
      this.articleClass = articleClass

      this.options = options
      this.name = options.name || options.className

      this.articles = [].slice.call(document.querySelectorAll("article"))
      this.article = document.querySelector("article." + this.articleClass)
      this.section = this.article.querySelector("main section")

      this.queue = []
      this.queue.recycle = function recycle(number) {
        let ii = Math.max(Math.floor(Math.random()*this.length-2), 0)
        this.splice(ii, 0, number)
      }

      this.decoys = []
      this.names  = {}
      this.words  = {}
      this.images = {}
      this.number = -1
      this.remaining = 3
    }


    initialize() {
      this.articles.forEach(article => {
        if (article === this.article) {
          article.classList.add("active")
        } else {
          article.classList.remove("active")
        }
      })

      //log("Article", this.articleClass, "activated")

      this.section = document.querySelector(
        "article."+this.articleClass+" main section"
      )

      let treatTap = this.treatTap.bind(this)
      this.section.onmousedown = this.section.ontouchstart = treatTap

      this.number = -1
      this.renewQueue()
      this.newChallenge()
    }


    treatTap (event) {
      let target = event.target

      while (target && target.nodeName !== "LI") {
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
        return
      }

      this.treatCorrectAnswer(target)
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

      // Shuffle
      let ii = queue.length
      while (ii--) {
        let random = Math.floor(Math.random() * ii)
        let temp = queue[random]
        queue[random] = queue[ii]
        queue[ii] = temp
      }

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


    setWordsAndImages() {
      let word = this.words[this.number] = getWord(this.number)
      this.images[word] = monika.media.getImageFor(word)

      this.decoys.forEach(decoy => {
        let word = this.words[decoy] = getWord(decoy)
        this.images[word] = monika.media.getImageFor(word)
      })

      function getWord(number) {        
        return monika.media.getWordFor(number)
      }
    }


    getCueArray(total) {
      total -= 1
      var cueArray = this.decoys.splice(0, total)
      cueArray.splice(random(total), 0, this.number)
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

        if (cue === this.number) {
          li.src = monika.media.getAudioFor("number", cue)

        } else {
          // The <li> element may have an out-of-date src, but it
          // won't be used
          
          li.classList.add("decoy")
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

        // Colour the consonants
        let mapped = monika.media.consonants.map[cue]
        let regex  = new RegExp ("[" + mapped + "]")
        let match  = name.match(regex)

        if (match) {
          name = name.replaceAt(match.index, "<span>" + match[0] + "</span>")
        }

        li.innerHTML = "<p>" + name + "</p>"
        li.className = ""

        if (cue === this.number) {
          li.src = monika.media.getAudioFor("number", cue)

        } else {
          li.classList.add("decoy")
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

        if (cue === this.number) {
          li.src = monika.media.getAudioFor("word", audio)

        } else {
          li.classList.add("decoy")
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

        li.innerHTML = "<img src='" + img + "'/>"

        li.className = ""

        if (cue === this.number) {
          li.src = monika.media.getAudioFor("word", word)

        } else {
          // The <li> element may have an out-of-date src, but it
          // won't be used
          
          li.classList.add("decoy")
        }
      }
    }


    showConsonants() {

    }


    newChallenge() {
      this.number = this.getNextNumber()

      if (this.number === undefined) {
        
        return monika.menu.completeLevel()

      }

      this.setDecoys()
      this.setNames()
      this.setWordsAndImages()

      this.showConsonants()
      this.showNumbers()
      this.showNames()
      this.showWords()
      this.showImages()

      this.remaining = 3

      let audioCue = monika.media.getAudioFor("number", this.number)
      monika.audio.play(audioCue)
    }


    treatCorrectAnswer(target) {
      //log(this.name, "answer")

      let src = target.src

      let forceAndUseCallback = (--this.remaining)
                              ? null
                              : this.newChallenge.bind(this)
      monika.audio.play(src, forceAndUseCallback)
    }


    cleanUp() {
      // TODO: remove all touchstart and mousedown event handlers
      this.section.onmousedown = this.section.ontouchstart = null
      log (this.name, "(clean)")
    }
  }


  monika.Game = Game

})(window.monika)