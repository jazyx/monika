// MEDIA MANAGER //


;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  monika.manager = ({
    setCue: function setCue(number) {
    // x = {
    //   path:   <path to media folder>
    // , name:  "ноль"
    // , word:  "ирей"
    // , number: [<name of recording of number>, ...]
    // , audio:  [<name of recording of word>, ...]
    // , images: [<name of image>, ..., <name of counter image>]
    // }

      numberMedia = this.media[number]
      if (!numberMedia) {
        console.log("Media not found for", number)
        return 0
      }

      decoys = getRandomDecoys()

      decoys = {
        numbers:    decoys
      , words:      []
      , images:     []
      , consonants: []
      }

      cue = {
        cue: numberMedia
      , decoys: decoys
      }

      return cue

      function getRandomDecoys () {
        var available = []
        var chosen = []
        var start = this.range.start
        var stop = this.range.end + 1
        var count = stop - start
        var ii
          , random
          , decoy

        for (ii = start; ii < stop; ii += 1) {
          available.push(ii)
        }

        for ( ; count; count -=1 ) {
          random = Math.floor(Math.random() * count)
          decoy = available.splice(random, 1)[0]
          if (decoy !== number) {
            chosen.push(decoy)
          }
        }

        return chosen
      }
    }

  , setOptions: function setOptions(options) {
      
    }

    /**
     * Reads in number_word_LUT and word_image_LUT from local
     * storage, updates with any new numbers and words that are
     * available and saves it back to local storage
     */
  , loadMedia: function loadMedia(media) {
      console.log("loadMedia called")

      var regex = /default\.(?:png|jpg)$/i
      var number_word_LUT = this.number_word_LUT
      var word_image_LUT = this.word_image_LUT

      this.media = media

      ;(function updateLUT() {
        let numbersData = media.numbers

        for(let number in numbersData) {
          var image

          let dataForNumber = numbersData[number]
          let wordList = dataForNumber.words
          let default_word = wordList.default_word
          number_word_LUT[number] = default_word

          for (let word in wordList) {
            if (word === "default_word") {
              continue
            }

            let images = wordList[word].images
            // Use the first available image...
            image = images[0]

            if (images.length > 1) {
              // ... or default.jpg (png) if there is one with that name
              images.every(checkForDefaultImage)
            }

            word_image_LUT[word] = image
          }

          function checkForDefaultImage(URL) {
            if (regex.test(URL)) {
              image = URL
              return false
            }

            return true
          }
        }
      })()

      console.log("number_word_LUT", number_word_LUT)
      console.log("word_image_LUT", word_image_LUT)
    }

  , media: {}
  , range: { start: 0, end: 9 }
  , number_word_LUT: {}
  , word_image_LUT: {}

  , initialize: function initialize() {
      if (monika.media) {
        this.loadMedia(monika.media)
      }

      return this
    }

  }).initialize()

})(window.monika)