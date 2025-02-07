"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class Numbers extends monika.layouts.Reference {
   constructor (options) {
      options.toggle = "#_abc"
      options.timeless = true
      super("_123", options)

      this.image = this.section.querySelector("._123 img")
      this.word = this.section.querySelector("._123 p.word")
      this.ul = this.section.querySelector("ul")
      this.list = this.ul.querySelectorAll("li")
      let treatNumber = this.treatNumber.bind(this)
      this.ul.onmousedown = this.ul.ontouchstart = treatNumber
    }

    treatNumber({ target }) {
      const digit = target.innerText[0]
      const showRandomImageFor = this.showRandomImageFor.bind(this)
      const playAudio = this.playAudio.bind(this)
      
      showRandomImageFor(digit)
      playAudio (target, digit)
    }

    showRandomImageFor(digit) {
      // monika.media.numbers[<ref>]words
      //       .audio: [],
      //       .images: []

      const word = monika.media.getWordFor(digit)
      const image = monika.media.getImageFor(word, "random")

      this.word.innerText = word
      this.image.src = image
    }
    

    playAudio (target, digit) {
      const src = monika.media.getAudioFor("number", digit)
      const callback = this.audioDone.bind(this)

      target.classList.add("touched")
      monika.audio.play(src, callback)
    }
  }


  monika.classes["Numbers"] = Numbers


})(window.monika)