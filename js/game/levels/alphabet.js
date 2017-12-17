"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }


  class Alphabet extends monika.layouts.Reference {
    constructor (options) {
      options.toggle = "#_123"
      super("_abc", options)
    }


    initialize() {
      super.initialize()

      this.style = this.article.querySelector("._abc li.style")
      let switchStyle = this.switchStyle.bind(this)
      this.style.onmousedown = this.style.ontouchstart = switchStyle

      this.section = this.article.querySelector("section")
      let playAudio = this.playAudio.bind(this)
      this.section.onmousedown = this.section.ontouchstart = playAudio

      this.list = this.section.querySelectorAll("li")
    }
    

    switchStyle(event) {
      let target = event.target
      while (target && target.nodeName !== "ARTICLE") {
        target = target.parentNode
      }

      if (target.classList.contains("script")) {
        target.classList.remove("script")
        target.classList.add("keyboard")
      } else {       
        target.classList.add("script")
        target.classList.remove("keyboard")
      }
    }


    playAudio (event) {
      let target = event.target
      let letter = target.innerHTML[0]
      let src = monika.media.getAudioFor("alphabet", letter)

      let self = this
      let callback = function callback () {
        setTimeout(function pretendThereIsAudioPlaying() {
          self.audioDone()
          document.querySelector("aside").innerHTML = ""
        }, 1000)
      }

      target.classList.add("touched")
      monika.audio.play(src, callback)
    }
  }


  monika.classes["Alphabet"] = Alphabet


})(window.monika)