"use strict"



;(function layoutLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }


  if (!monika.layouts) {
    monika.layouts = {}
  }


  class Images extends monika.Game {

    /**
     * @param {object}  options  { className: <string>
     *                           , name:  <string>
     *                           , range: {start: <integer>
     *                                       end: <integer>}
     *                                    OR
     *                                    [ <integer>, ... ]
     *                           , sortBy: <string>
     *                           }
     */
    constructor (options) {
      options.cue_range   = options.cue_range   || { start: 0, end: 9 }
      options.repeat      = options.repeat      || 2
      options.consecutive = options.consecutive || false
      options.decoy_range = options.decoy_range || { start: 0, end: 9 }
      options.sortBy      = options.sortBy      || ""

      super("images", options) // class for <article> element
    }


    provideSupport(support) {
      let htmlElement
        , string
      let instructions = {
        forget:  2
      }

      monika.support.execute(instructions)

      if (this.errorClass === "numbers") {
        this.supportElement = this.supportElements["numbers"]
        string = this.names[this.number]
      } else {
        this.supportElement = this.supportElements["images"]
        string = this.words[this.number]
      }

      let options = {
        htmlElement: this.supportElement.cloneWithStyle()
      , string:      string
      , callback:    this.callbackFromSupport.bind(this)
      }

      monika.customKeyboard.setInputCue(options)
    }
  }


  monika.layouts["Images"] = Images


})(window.monika)