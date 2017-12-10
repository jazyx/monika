"use strict"

// MEDIA //


;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  monika.processor = ({

    /**
     * TODO: Reads in number_word_LUT and word_image_LUT from local
     * storage, updates with any new numbers and words that are
     * available and saves it back to local storage
     * 
     * After running this method, monika.media will have the structure:
     * 
     * { errorSound: <file path>
     * , consonants: { map:      { <number>: <string }
     *               , audio:    { <char>: [ <file path>, ... ] }
     *               }
     * , numbers:    { <string>: { name:       <str|ing>
     *                 ADDED >>> , consonants: <string>
     *                           , audio: [ <file path>, ... ]
     *                           , words: { 
     *                               default_word: <string>
     *                             , <word>: {
     *                                 images: [<file path>, ...]
     *                               , audio: [<file path>, ...]
     *                               }
     *                             }
     *                           }
     *               , ...
     *               }
     *   ADDED
     *   vvvvv
     * , number_word_LUT: { <number string>: <default_word>, ... }
     * , word_image_LUT: { <word>: <default image path>, ... }
     * 
     * , getNameFor(number)
     * , getWordFor(number, atRandom)
     * , getAudioFor(type, reference) 
     * }
     * 
     */
    run: function loadMedia(media) {
      var image // set to first or default image in inner for loop

      let regex = /default\.(?:png|jpg)$/i
      let map = media.consonants.map
      let number_word_LUT = media.number_word_LUT = {}
      let word_image_LUT  = media.word_image_LUT  = {}
      let word_number_LUT = media.word_number_LUT = {}

      let numbersData = media.numbers

      for (let number in numbersData) {
        let dataForNumber = numbersData[number]
        let wordList = dataForNumber.words

        // Add default word to number_word_LUT

        let default_word = wordList.default_word
        number_word_LUT[number] = default_word

        // Add consonants string to the number map

        dataForNumber.consonants = map[number]

        // Add (first or default) image to word_image_LUT

        for (let word in wordList) {
          if (word === "default_word") {
            // Not a folder
            continue
          }

          word_number_LUT[word] = number

          let images = wordList[word].images
          // Use the first available image...
          image = images[0]

          if (images.length > 1) {
            // ... or default.jpg (png) if there is one with that name
            images.forEach(checkForDefaultImage)
          }

          word_image_LUT[word] = image
        }
      }

      function checkForDefaultImage(URL) {
        if (regex.test(URL)) {
          image = URL
          return false
        }

        return true
      }

      media.getNameFor = function getNameFor(number) {
        // TODO: Decide about одна|одно|одни and две
        return this.numbers[number].name.match(/[^|]+/)[0]
      }

      media.getWordFor = function getWordFor(number) {
        return this.number_word_LUT[number]
      }

      media.getImageFor = function getImageFor(word, allOrRandom) {
        // TODO: create image_word_LUT to use with allOrRandom
        return this.word_image_LUT[word]
      }

      media.getAudioFor = function getAudioFor(type, ref, allOrRandom) {
        // TODO: create image_word_LUT to use with allOrRandom
        var audio

        switch (type) {
          case "number":
            audio = media.numbers[ref].audio
          break
          case "word":
            let number = media.word_number_LUT[ref]
            audio = media.numbers[number].words[ref].audio
          break
          case "consonant":
            audio = media.consonants.audio[ref]
          break
        }

        switch (allOrRandom) {
          default:
            audio = audio[0]
          break

          case "all":
          break
          case "random":
            audio = audio[Math.floor(Math.random() * audio.length)]
          break
        }
        
        return audio
      }

      // log("number_word_LUT", number_word_LUT)
      // log("word_image_LUT", word_image_LUT)

      // No further need for this in RAM
      monika.processor = null
    }

  , initialize: function initialize() {
      if (monika.media) {
        this.run(monika.media)
      }

      return this
    }

  }).initialize()

})(window.monika)