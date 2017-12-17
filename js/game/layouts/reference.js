"use strict"



;(function layoutLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }


  if (!monika.layouts) {
    monika.layouts = {}
  }


  class Reference extends monika.Game {

    constructor (layout, options) {
      super(layout, options)

      this.toggle = this.article.querySelector(".toggle")
    }

    initialize () {
      super.initialize()
     
      let toggleType = this.toggleType.bind(this)
      this.toggle.onmousedown = this.toggle.ontouchstart = toggleType
      
      return this
    }

    toggleType(event) {
      monika.menu.displayRef(this.options.toggle)
    }


    audioDone() {
      var total = this.list.length      
      for (let ii = 0; ii < total; ii += 1) {
        this.list[ii].classList.remove("touched")
      }
    }
    

    setHeader () {}
    renewQueue () {}
    newChallenge () {}

    setDecoys () {}
    setNames () {}
    setWords () {}
    setImages () {}

    showNumbers () {}
    showNames () {}
    showWords () {}
    showImages () {}
    showConsonants () {}

    setCue () {}

    tapEnd() {}
    treatLongTap() {}
    treatCorrectAnswer() {}

  }


  monika.layouts["Reference"] = Reference


})(window.monika)