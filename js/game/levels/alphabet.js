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
      options.timeless = true
      super("_abc", options)
      this.options = options
    }


    // WET: Duplicate in numbers.js, near-duplicate in game.js
    setHeader(options) {
      const header = document.querySelector("header h1")
      const text = document.querySelector("header div")
      header.innerHTML = options.header || ""
      text.innerHTML = options.text || ""
    }


    initialize() {
      super.initialize()

      this.setHeader(this.options)

      // Activate the "print/handwritten" style button
      this.style = this.section.querySelector("._abc li.style")
      let switchStyle = this.switchStyle.bind(this)
      this.style.onmouseup = switchStyle
      // this.style.onmouseup = this.style.ontouchend = switchStyle

      let playAudio = this.playAudio.bind(this)
      this.section.onmouseup = playAudio
      // this.section.onmouseup = this.section.ontouchend = playAudio

      this.list = this.section.querySelectorAll("li")
    }
    

    switchStyle(event) {
      let target = event.target
      while (target && target.nodeName !== "SECTION") {
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
      if (target.classList.contains("style")
       || target.classList.contains("toggle")) {
        // Ignore .style and .toggle buttons
        return
      }

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