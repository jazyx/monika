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

      media.number_names_LUT = {  0: "нoль"
,  1: "один"
,  2: "два"
,  3: "три"
,  4: "четыре"
,  5: "пять"
,  6: "шесть"
,  7: "семь"
,  8: "восемь"
,  9: "девять"
, 10: "десять"
, 11: "одиннадцать"
, 12: "двенадцать"
, 13: "тринадцать"
, 14: "четырнадцать"
, 15: "пятнадцать"
, 16: "шестнадцать"
, 17: "семнадцать"
, 18: "восемнадцать"
, 19: "девятнадцать"
, 20: "двадцать"
, 21: "двадцать один"
, 22: "двадцать два"
, 23: "двадцать три"
, 24: "двадцать четыре"
, 25: "двадцать пять"
, 26: "двадцать шесть"
, 27: "двадцать семь"
, 28: "двадцать восемь"
, 29: "двадцать девять"
, 30: "тридцать"
, 31: "тридцать один"
, 32: "тридцать два"
, 33: "тридцать три"
, 34: "тридцать четыре"
, 35: "тридцать пять"
, 36: "тридцать шесть"
, 37: "тридцать семь"
, 38: "тридцать восемь"
, 39: "тридцать девять"
, 40: "сорок"
, 41: "сорок один"
, 42: "сорок два"
, 43: "сорок три"
, 44: "сорок четыре"
, 45: "сорок пять"
, 46: "сорок шесть"
, 47: "сорок семь"
, 48: "сорок восемь"
, 49: "сорок девять"
, 50: "пятьдесят"
, 51: "пятьдесят один"
, 52: "пятьдесят два"
, 53: "пятьдесят три"
, 54: "пятьдесят четыре"
, 55: "пятьдесят пять"
, 56: "пятьдесят шесть"
, 57: "пятьдесят семь"
, 58: "пятьдесят восемь"
, 59: "пятьдесят девять"
, 60: "шестьдесят"
, 61: "шестьдесят один"
, 62: "шестьдесят два"
, 63: "шестьдесят три"
, 64: "шестьдесят четыре"
, 65: "шестьдесят пять"
, 66: "шестьдесят шесть"
, 67: "шестьдесят семь"
, 68: "шестьдесят восемь"
, 69: "шестьдесят девять"
, 70: "семьдесят"
, 71: "семьдесят один"
, 72: "семьдесят два"
, 73: "семьдесят три"
, 74: "семьдесят четыре"
, 75: "семьдесят пять"
, 76: "семьдесят шесть"
, 77: "семьдесят семь"
, 78: "семьдесят восемь"
, 79: "семьдесят девять"
, 80: "восемьдесят"
, 81: "восемьдесят один"
, 82: "восемьдесят два"
, 83: "восемьдесят три"
, 84: "восемьдесят четыре"
, 85: "восемьдесят пять"
, 86: "восемьдесят шесть"
, 87: "восемьдесят семь"
, 88: "восемьдесят восемь"
, 89: "восемьдесят девять"
, 90: "девяносто"
, 91: "девяносто один"
, 92: "девяносто два"
, 93: "девяносто три"
, 94: "девяносто четыре"
, 95: "девяносто пять"
, 96: "девяносто шесть"
, 97: "девяносто семь"
, 98: "девяносто восемь"
, 99: "девяносто девять"
, 100: "сто"
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
          break

          case "word":
            let number = media.word_number_LUT[ref]
            if (number !== undefined) {
              audio = media.numbers[number]
              if (audio) {
                audio = audio.words[ref].audio
              }
            } 
            
            if (!audio) {
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