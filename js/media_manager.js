// MEDIA MANAGER //


;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  monika.manager = ({
    getQueue: function getQueue() {
      // TODO: Remember mistakes and add items to queue in proportion
      // to past errors
      
      let queue = []
      let ii = this.range.start
      let end = this.range.end + 1
      for ( ; ii < end; ii += 1) {
        queue.push(ii, ii)
      }

      ii = queue.length
      while (ii--) {
        let random = Math.floor(Math.random() * ii)
        temp = queue[random]
        queue[random] = queue[ii]
        queue[ii] = temp
      }

      queue.recycle = function (number) {
        let ii = Math.max(Math.floor(Math.random()*this.length-2),0)
        this.splice(ii, 0, number)
      }

      return queue
    }

  , getCue: function getCue(number) {
    // x = {
    //   path:   <path to media folder>
    // , name:  "ноль"
    // , word:  "ирей"
    // , number: [<name of recording of number>, ...]
    // , audio:  [<name of recording of word>, ...]
    // , images: [<name of image>, ..., <name of counter image>]
    // }

      var numberMedia = this.media.numbers[number]
      if (!numberMedia) {
        console.log("Media not found for", number)
        return 0
      }

      let decoys = this.getRandomDecoys(number)

      let names = this.getNames(decoys)
      let words = this.getWords(decoys)

      decoys = {
        numbers:    decoys
      , names:      names
      , words:      words
      , images:     []
      , consonants: this.media.consonants
      }

      let cue = {
        answer: numberMedia
      , decoys: decoys
      }

      return cue
    }

  , getRandomDecoys: function getRandomDecoys(number) {
      var available = []
      var chosen = []
      var start = this.range.start
      var stop = this.range.end + 1
      var count = stop - start
      var ii
        , random
        , decoy

      for (ii = start; ii < stop; ii += 1) {
        if (ii === number) {
          count -= 1
        } else {
          available.push(ii)
        }
      }

      for ( ; count; count -=1 ) {
        random = Math.floor(Math.random() * count)
        decoy = available.splice(random, 1)[0]
        chosen.push(decoy)
      }

      return chosen
    }

  , getNames: function getNames(numberArray) {
      var names = {}

      for (let number in numberArray) {
        number = numberArray[number]

        // TODO: Decide how to treat numbers with multiple genders
        let name = this.media.numbers[number].name.match(/[^|]+/)[0]
        names[number] = name
      }
      return names
    }

  , getWords: function getWords(numberArray) {
      var words = {}

      for (let number in numberArray) {
        number = numberArray[number]
        words[number] = this.number_word_LUT[number]
      }

      return words
    }

  , setOptions: function setOptions(options) {
      for (let option in options) {
        this[option] = options[option]
      }
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

      const updateLUT = () => {
        let numbersData = media.numbers

        for(let number in numbersData) {
          var image

          let dataForNumber = numbersData[number]
          let wordList = dataForNumber.words
          let default_word = wordList.default_word

          dataForNumber.consonants = media.consonants[number]
          this.number_word_LUT[number] = default_word

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

            this.word_image_LUT[word] = image
          }

          function checkForDefaultImage(URL) {
            if (regex.test(URL)) {
              image = URL
              return false
            }

            return true
          }
        }
      }

      updateLUT()

      console.log("number_word_LUT", this.number_word_LUT)
      console.log("word_image_LUT", this.word_image_LUT)
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