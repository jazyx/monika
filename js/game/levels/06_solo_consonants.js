"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class SoloConsonants extends monika.layouts.Digits {
    constructor (options) {
      // options.cue_range   = options.cue_range   || { start: 0, end: 9 }
      // options.repeat      = options.repeat      || 2
      // options.consecutive = options.consecutive || false
      options.decoy_range = options.decoy_range || { start: 0, end: 9 }
      options.sortBy      = options.sortBy      || ""

      super(options)
    }


    initialize() {
      this.stock = {
        1: ["р", "ц", "ц", "ц"]
      , 2: ["д", "т", "т", "т"]
      , 3: ["к", "г", "г", "х", "х"]
      , 4: ["ч", "ж", "ж", "ж"]
      , 5: ["п", "б", "б", "б"]
      , 6: ["ш", "щ", "щ", "л", "л"]
      , 7: ["с", "з", "з", "з"] 
      , 8: ["в", "ф", "ф", "ф"]

      , 0: ["н"]
      , 9: ["м"]
      }

      this.pile = JSON.parse(JSON.stringify(this.stock))

      super.initialize()
    }


    refresh(number) {
      this.pile[number] = [].concat(this.stock[number])
    }


    renewQueue() {
      let queue = this.queue
      queue.length = 0

      for (let number in this.stock) { // number is a string
        let array = this.stock[number]
        let ii = array.length

        number = parseInt(number, 10)
        for ( ; ii-- ; ) {
          queue.push(number)
        }
      }

      // Shuffle
      let ii = queue.length
      while (ii--) {
        let random = Math.floor(Math.random() * ii)
        let temp = queue[random]
        queue[random] = queue[ii]
        queue[ii] = temp
      }
    }

    getConsonant (cue) {
      let consonants = this.pile[cue]
      let count = consonants.length

      if (!count) {
        refresh(cue)
        return this.getConsonant(cue)
      }

      let random = Math.floor(Math.random() * count)

      return consonants[random]
    } 

   showNames() {
      var list = this.section.querySelectorAll("ul.names li")
      var total = list.length
      var cueArray = this.getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li     = list[ii]
        let cue    = cueArray[ii]
        let name   = this.names[cue]

        // // DON'T colour the consonants
        // let mapped = monika.media.consonants.map[cue]
        // let regex  = new RegExp ("[" + mapped + "]")
        // let match  = name.match(regex)

        // if (match) {
        //   name = name.replaceAt(match.index, "<span>" + match[0] + "</span>")
        // }

        li.innerHTML = "<p>" + name + "</p>"
        li.className = ""

        li.src = monika.media.getAudioFor("number", cue)

        if (cue !== this.number) {
          li.classList.add("decoy")
        }
      }
    }


    showConsonants () {
      var list = this.section.querySelectorAll("ul.consonants li")
      var total = list.length    
      var cueArray = this.getCueArray(total)
      var cueLi

      var total = list.length    
      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]
        let consonant = this.getConsonant(cue)

        li.className = ""
        li.src = monika.media.getAudioFor("consonant", consonant)


        // DELAY BEFORE COLOURING THE CONSONANTS
        if (cue === this.number) {
          li.innerHTML = "<span>" + consonant + "</span>"
          // li.innerHTML = consonant
          li.classList.add("delay", "white")    

          cueLi = li

        } else {
          li.innerHTML = consonant       
          li.classList.add("decoy")
        }
      }

      setTimeout(function startTransition () {
        cueLi.classList.remove("white")
      }, 1)
    }
  }

  monika.classes["SoloConsonants"] = SoloConsonants


})(window.monika)