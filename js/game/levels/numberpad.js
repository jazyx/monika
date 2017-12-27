;(function loadNumberPad(monika){

  if (!monika) {
    monika = window.monika = {}
  }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class NumberPad extends monika.Game{

    constructor (options) {
      options.cue_range = options.cue_range || { start: 10, end: 99 }
      options.repeat = options.repeat || 2

      super("numberpad", options)

      this.wrongDelay = 1000
      this.rightDelay = 1500

      this.img = document.querySelector(".numberpad .image img")
      this.imgP = document.querySelector(".numberpad .image p")
      this.p = document.querySelector(".numberpad .dialled p")
      this.mask = document.querySelector(".numberpad .mask")
      let pad = this.pad = document.querySelector(".numberpad .numbers")
     
      // TODO: Find solution for computers with touchscreens and mice
      if (monika.mobileKeyboard.isTouchScreen) {
        pad.ontouchstart = this.touchStart.bind(this)
      } else { 
        pad.onmousedown = this.touchStart.bind(this)
      }

      this.supportElement =  document.querySelector(".numberpad img")
    }


    touchStart(event) {
      let target = event.target
      let number = target.innerHTML

      console.log(number)

      switch (number) {
        case "#":
          monika.audio.play(this.src)
          return

        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
          // continue after switch

        break
        default: // whatever the DELETE button is called
          this.p.innerHTML = this.dialled = ""
          return
      }

      // PLAY TONE FOR NUMBER

      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = 0
      }

      this.dialled += number
      this.p.innerHTML = this.dialled

      let result = (this.dialled === this.number)

      if (result) {
        this.treatCorrectAnswer()

      } else if (this.dialled.length === 2) {
        target.number = this.dialled // SIMPLE HACK
        this.treatWrongAnswer(target)

      } else {
        // Wait for the next click
        return
      }

      // this.performCustomAction(target)
      monika.support.treatResult(result)
    }


    tapStart() {
      // No need to call super
    }


    tapEnd() {
      // No need to call super
    }


    renewQueue() {
      super.renewQueue()

      // Convert numbers to strings
      this.queue.forEach((cue, index, array) => {
        array[index] = "" + cue
      })

      return queue.length
    }


    // getNextNumber() {
    //   let range = this.options.cue_range
    //   let number = "" + this.getRandom(range.start, range.end)
    //   return number
    // }


    newChallenge() {
      this.number = this.getNextNumber()

      if (this.number === undefined) {
        
        return monika.menu.completeLevel()

      }

      this.dialled = ""
      this.p.innerHTML = ""
      this.word = monika.media.getWordFor(this.number)

      this.pad.classList.remove("fadeout")
      this.mask.classList.remove("fadeout")

      this.src = monika.media.getAudioFor("word", this.word)

      let imgSrc = monika.media.getImageFor(this.word)
      
      // if (imgSrc[0] === "&") {
      //   this.imgP.innerHTML = imgSrc
      //   this.img.src = "/monika/media/ru/numbers/3/words/око/images/blue.jpg"
      // } else {
      //   this.imgP.innerHTML = ""
      this.img.src = imgSrc
      // }

      monika.audio.play(this.src)

      log(this.number)
    }


    treatWrongAnswer(target) {
      super.treatWrongAnswer(target) // needlessly adds class "disabled"
      target.classList.remove("disabled")

      monika.audio.play(this.src)

      this.dialled = ""
      this.timeout = setTimeout(() => {
        this.p.innerHTML = ""
      }, this.wrongDelay)
    }


    provideSupport(support) {
      let instructions = {
        forget:  2     // replace the n oldest 0s with 1s
      }

      monika.support.execute(instructions)

      let string = this.word
      // Custom treatment of image
      let htmlElement = this.supportElement.cloneWithStyle()

      htmlElement.style.width = "55vmin"
      htmlElement.style.height = "55vmin"
      htmlElement.style.webkitLogicalHeight = ""
      htmlElement.style.position = "relative"
      htmlElement.style.left = "0"

      let options = {
        htmlElement: htmlElement
      , string:      string
      , callback:    this.callbackFromSupport.bind(this)
      }

      monika.customKeyboard.setInputCue(options)
    }
     

    callbackFromSupport(message) {
      switch (message) {
        case "open": 
        case "done": // fallthrough
          monika.audio.play(this.src)
        break
      }
    }
     

    treatCorrectAnswer() {
      this.pad.classList.add("fadeout")
      this.mask.classList.add("fadeout")

      let src = monika.media.getAudioFor("number", this.number)

      let next = () => {
        setTimeout(() => {
          this.newChallenge()
        }, this.rightDelay)
      }
      
      monika.audio.play(src, next)
    }

  }


  monika.classes["NumberPad"] = NumberPad


})(window.monika)