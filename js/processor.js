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
        let name = this.numbers[number]
        if (name) {
          name = name.name.match(/[^|]+/)[0]
        }

        if (!name) {
          name = this.number_names_LUT[number]
        }

        return name
      }

      media.getWordFor = function getWordFor(number) {
        let word = this.number_word_LUT[number]

        if (!word) {
          word = "&lt;word for " + number + "&gt;"
        }

        return word
      }

      media.getImageFor = function getImageFor(word, allOrRandom) {
        var image
        var number

        switch (allOrRandom) {
          default:
            image = monika.menu.preferences.user_images[word]
                 || this.word_image_LUT[word]
          break
          case "all":
          case "random":
            number = word_number_LUT[word]
            image = this.numbers[number]
            if (image) {
              image = image.words[word]
              if (image) {
                image = image.images
              }
            }
        }

        if (!image) {
          image = "&lt;image for " + word + "&gt;"

          switch (allOrRandom) {
            case "all":
              image = [image]
            break
            case "random": 
              image = "&lt;random image for " + word + "&gt;"
            break
          }

        } else if (allOrRandom === "random") {
          let index = Math.floor(Math.random() * image.length)
          image = image[index]
        }

        return image
      }

      media.getAudioFor = function getAudioFor(type, ref, allOrRandom) {
        // TODO: create image_word_LUT to use with allOrRandom
        var audio

        switch (type) {
          case "alphabet":
            audio = [ "&lt;audio for " + ref + "&gt;" ]
          break

          case "number":
            let folder = media.numbers[ref]
            if (!folder) {
              folder = { audio: [ "&lt;audio for " + ref + "&gt;" ] }
            }
            audio = folder.audio

            if (!audio.length) {
              audio = [ "&lt;audio for " + ref + "&gt;" ]
            }
          break

          case "word":
            let number = media.word_number_LUT[ref]
            if (number !== undefined) {
              audio = media.numbers[number]
              if (audio) {
                audio = audio.words[ref].audio
              }
            } 
            
            if (!audio || !audio.length) {
              audio = [ "&lt;audio for " + ref + "&gt;" ]
            }
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

            if (audio[0] === "&") {
              audio = "&lt;random audio for " + ref + "&gt;"
            }
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