"use strict"



;(function layoutLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }


  if (!monika.layouts) {
    monika.layouts = {}
  }


  class Reference extends monika.Game {

    constructor (layout, options) {
      super(layout, options)

      this.toggle = this.section.querySelector(".toggle")
    }

    initialize () {
      this.display() // super.initialize()
     
      let toggleType = this.toggleType.bind(this)
      this.toggle.onmouseup = this.toggle.ontouchend = toggleType
      
      return this
    }

    toggleType(event) {
      monika.menu.displayRef(this.options.toggle, "dontScroll")
    }


    audioDone() {
      var total = this.list.length      
      for (let ii = 0; ii < total; ii += 1) {
        this.list[ii].classList.remove("touched")
      }
    }
    
    // renewQueue () {}
    // newChallenge () {}

    // setDecoys () {}
    // setNames () {}
    // setWords () {}
    // setImages () {}

    // showNumbers () {}
    // showNames () {}
    // showWords () {}
    // showImages () {}
    // showConsonants () {}

    // setCue () {}

    // tapEnd() {}
    // treatLongTap() {}
    // treatCorrectAnswer() {}

  }


  monika.layouts["Reference"] = Reference


})(window.monika)