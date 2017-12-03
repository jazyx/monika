// DO NOT EDIT THIS SCRIPT //
// 
// This script is created automatically by:
// 
//   node createMediaHierarchy.js ru
// 
// For a new language, create a new folder in the same folder as this
// script

;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  monika.media = {
    errorSound: "media/interface/error/not" // ogg, mp3

    // constants:
    // { // numbers folder contains sub-folders from 0/00 to 99
    //   // sub-folders contain one or more folders named by a word
    //   mediaPath:        "media/ru/numbers"
    // , audioFolder:      "audio"
    // , imageFolder:      "images"

    //   // folder contains sub-folders with name as lower-case consonant
    // , consonantPath:    "media/ru/consonants"

    //   // images can be jpg or png
    // , defaultImage:     "default" 
    // , counterImage:     "counter"

    //   // audio can be mp3 or ogg
    // , defaultNumber:    "n_default"
    // , defaultWord:      "w_default"
    // , defaultConsonant: "c_default"
    // }

  , consonants:
    { 0: "н"
    , 1: "р"
    , 2: "дт"
    , 3: "кгх"
    , 4: "чж"
    , 5: "пб"
    , 6: "шщл"
    , 7: "сз"
    , 8: "вф"
    , 9: "м"}

  , numbers:
    {
    //  "0": {
    //     name:        "ноль"
    //   , audio:       [<path to recording of number>, ...]
    //   , counter:     <path to counter image>
    //   , defaultWord: "иней"
    //   , words:  {
    //      "ирей": {}
    //       , audio:  [<path to recording of word>, ...]
    //       , images: [<path to image>, ...]
    //       }
    //     }
    //   }
    // , ...
    }

      /**
       * { item_description }
       * 
       * @param {string} number Value from "0" or "00" to "99"
       * @param {array} range undefined or [start, end]
       */
    , setCue: function setCue(number, range) {
      x = {
        path:   <path to media folder>
      , name:  "ноль"
      , word:  "ирей"
      , number: [<name of recording of number>, ...]
      , audio:  [<name of recording of word>, ...]
      , images: [<name of image>, ..., <name of counter image>]
      }

        cue = {
          value:      number
        , name:       ""
        , number:     ""
        , word:       ""
        , images:     []
        , audio:      ""
        , consonants: ""
        , decoys = {
            numbers:    []
          , words:      []
          , images:     []
          , consonants: []
          }
        }

        return cue
      }
  }

})(window.monika)