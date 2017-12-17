"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class AllImages extends monika.layouts.Images {
    // constructor (options) {
    //   super(options)
    // }

    // initialize () {
    //   super.initialize()
    //   log(this.name + " is initialized in ConnsonantCue")
    // }

    setImages() {  
      var word = monika.media.getWordFor(this.number)
      var image = monika.media.getImageFor(word)
      this.updateImagesFor(this.number, image)

      this.decoys.forEach(decoy => {
        word = monika.media.getWordFor(decoy)
        image = monika.media.getImageFor(word)
        this.updateImagesFor(decoy, image)
      })
    }


    /**
     * Images for all words are updated every time, even if they are
     * not used. However, the currentImage is only update when it is
     * used. The default image may thus be the *second* illustration
     * of the word, and this may be the first time the word is the
     * right answer.
     *
     * @param      {integer}  cue
     */
    updateImagesFor(cue) {
      let word = this.words[cue]
      let images = this.images[cue]
      let currentImage 

      if (images) {
        currentImage = images.currentImage
      } else {
        // Exclude the default image the first time around
        currentImage = monika.media.getImageFor(word)
      }

      images = monika.media.getImageFor(word, "all")
      images = [].concat(images)

      // Don't repeat the most recently shown image
      images.splice(images.indexOf(currentImage), 1)

      this.shuffle(images)
      // Pass the current image to the new list
      images.currentImage = currentImage

      this.images[cue] = images
    }
    

    showImages() {
      var list = this.section.querySelectorAll("ul.images li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]
        let word = this.words[cue]

        // Use the next (randomized) image, and remember which it was
        // so it isn't repeated immediately
        let images = this.images[cue]
        let img = this.images[cue].currentImage = images.pop()

        if (!images.length) {
          this.updateImagesFor(cue)
        }

        li.innerHTML = "<img src='" + img + "'/>"

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


    setCue() {
      let word = this.words[this.number]
      let audioCue = monika.media.getAudioFor("word", word)
      monika.audio.play(audioCue)
    }
  }


  monika.classes["AllImages"] = AllImages


})(window.monika)