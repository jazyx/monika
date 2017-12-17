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
      pad.onmousedown = pad.ontouchstart = this.touchStart.bind(this)
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

        break
        default:
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

      if (this.dialled === this.number) {
        this.treatCorrectAnswer()

      } else if (this.dialled.length === 2) {
        this.treatWrongAnswer()
      }
    }


    tapStart() {
      // No need to call super
    }


    tapEnd() {
      // No need to call super
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


    treatWrongAnswer() {
      monika.audio.play(this.src)

      this.queue.recycle(this.dialled)
      this.queue.recycle(this.number)

      this.dialled = ""
      this.timeout = setTimeout(() => {
        this.p.innerHTML = ""
      }, this.wrongDelay)
    }


    renewQueue() {
      super.renewQueue()

      // Convert numbers to strings
      this.queue.forEach((cue, index, array) => {
        array[index] = "" + cue
      })
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
if (imgSrc[0] === "&") {
  this.imgP.innerHTML = imgSrc
  this.img.src = "/monika/media/ru/numbers/3/words/око/images/blue.jpg"
} else {
  this.imgP.innerHTML = ""

      this.img.src = monika.media.getImageFor(this.word)
}

      monika.audio.play(this.src)

      log(this.number)
    }

  }


  monika.classes["NumberPad"] = NumberPad


})(window.monika)