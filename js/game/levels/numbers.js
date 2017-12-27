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

      this.ul = this.section.querySelector("ul")
      this.list = this.ul.querySelectorAll("li")
      let playAudio = this.playAudio.bind(this)
      this.ul.onmousedown = this.ul.ontouchstart = playAudio
    }


    playAudio (event) {
      let target = event.target
      let digit = target.innerHTML[0]
      let src = monika.media.getAudioFor("number", digit)
      let callback = this.audioDone.bind(this)

      target.classList.add("touched")
      monika.audio.play(src, callback)
    }
  }


  monika.classes["Numbers"] = Numbers


})(window.monika)