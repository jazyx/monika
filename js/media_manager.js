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
      let repeats = this.options.repeats
      let ii = this.options.range.start
      let end = this.options.range.end + 1
      for ( ; ii < end; ii += 1) {
        for (jj = 0; jj < repeats; jj += 1) {
          queue.push(ii)
        }
      }

      ii = queue.length
      while (ii--) {
        let random = Math.floor(Math.random() * ii)
        temp = queue[random]
        queue[random] = queue[ii]
        queue[ii] = temp
      }

      if (this.options.consecutive) {
        ii = end
        end = this.options.range.start
        for ( ; end < ii--; ) {
          queue.push(ii)
        }

        if (!end) {
          // Don't start with zero
          queue.pop()
        } 
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
      let audio = this.getAudio(decoys.concat([number]))

      decoys = {
        numbers:    decoys
      , names:      names
      , words:      words
      , images:     []
      }

      let media = {
        consonants: this.media.consonants
      , audio:      audio
      }

      let cue = {
        answer: numberMedia
      , decoys: decoys
      , media: media
      }

      return cue
    }

  , getRandomDecoys: function getRandomDecoys(number) {
      var available = []
      var chosen = []
      var start = this.options.range.start
      var stop = this.options.range.end + 1
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

  , getAudio: function getAudio(numberArray) {
      let audio = this.options.audio
      let consonants = audio.indexOf("consonants") + 1
      let numbers = audio.indexOf("numbers") + 1
      let words = audio.indexOf("words") + 1
      audio = []

      addWords = (wordArray, whichRecordings) => {
        // TODO: Allow for multiple recordings of multiple words
        //
        // wordArray = { 
        //   default_word: "string"
        // , "word:" : {
        //      "audio": [...]
        //    , "images" [...]
        //    }
        //  , ...
        //  }

        // for (let word in wordArray) {
        //   let audioArray = wordArray[word].audio
        //   if (audioArray) {
        //     audio.push(audioArray[0])
        //   }
        // }

        // Assume one audio for default word
        audio.push(wordArray[wordArray.default_word].audio[0])
      } 

      for (let number in numberArray) {
        number = this.media.numbers[numberArray[number]]
        if (words) {
          addWords(number.words, "default")
        }

        if (numbers) {
          audio = audio.concat(number.audio)
        }
      }

      if (consonants) {
        // TODE
      }

      return audio
    }

  , setOptions: function setOptions(options) {
      for (let option in options) {
        this.options[option] = options[option]
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

  , options: {
      range: { start: 0, end: 9 }
    , consecutive: true
    , repeats: 2
    , audio: [ "numbers" ] // , "consonants", "words" ]
    }

  , media: {}
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