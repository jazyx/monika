    }

      /**
       * { item_description }
       * 
       * @param {string} number Value from "0" or "00" to "99"
       * @param {array} range undefined or [start, end]
       */
    , setCue: function setCue(number, range) {
      // x = {
      //   path:   <path to media folder>
      // , name:  "ноль"
      // , word:  "ирей"
      // , number: [<name of recording of number>, ...]
      // , audio:  [<name of recording of word>, ...]
      // , images: [<name of image>, ..., <name of counter image>]
      // }

      //   cue = {
      //     value:      number
      //   , name:       ""
      //   , number:     ""
      //   , word:       ""
      //   , images:     []
      //   , audio:      ""
      //   , consonants: ""
      //   , decoys = {
      //       numbers:    []
      //     , words:      []
      //     , images:     []
      //     , consonants: []
      //     }
      //   }

      //   return cue
      }
  }

})(window.monika)
