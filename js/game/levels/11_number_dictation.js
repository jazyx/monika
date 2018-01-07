;(function loadNumberPad(monika){

  if (!monika) {
    monika = window.monika = {}
  }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class NumberDictation extends monika.Game{

    constructor (options) {
      options.cue_range = options.cue_range || { start: 10, end: 99 }
      options.repeat = options.repeat || 2

      super("number-dictation", options)

      this.wrongDelay = 1000
      this.rightDelay = 1500

      let section = document.querySelector("section.number-dictation")
      this.img = section.querySelector(".image img")
      this.imgP = section.querySelector(".image p")
      this.p = section.querySelector(".dialled p")
      this.mask = section.querySelector(".mask")

      let padParent = section.querySelector(".number-pad-parent")

      let padOptions = {
        parentNode: padParent
      , tapNumberCallback: this.tapNumber.bind(this)
      , tapDeleteCallback: this.clearNumber.bind(this)
      , tapHashCallback:   this.playNumber.bind(this)
      }

      this.pad = monika.numberPad.initialize(padOptions)

      this.supportElement = section.querySelector("img")
    }


    playNumber() {
      monika.audio.play(this.src)
    }


    clearNumber() {
      this.p.innerHTML = this.dialled = ""
    }


    tapNumber(number, target) {
     
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

      return this.queue.length
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


  monika.classes["NumberDictation"] = NumberDictation


})(window.monika)