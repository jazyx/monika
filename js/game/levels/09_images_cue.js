"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class ImageCue extends monika.layouts.Images {
    // constructor (options) {
    //   super(options)
    // }

    // initialize () {
    //   super.initialize()
    //   log(this.name + " is initialized in ConnsonantCue")
    // }


    setCue() {
      let word = this.words[this.number]
      let audioCue = monika.media.getAudioFor("word", word)
      monika.audio.play(audioCue)
    }
  }


  monika.classes["ImageCue"] = ImageCue


})(window.monika)