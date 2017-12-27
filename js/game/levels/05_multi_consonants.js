"use strict"



;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }

  if (!monika.classes) {
    monika.classes = {}
    monika.levels = {}
  }

  class MultiConsonants extends monika.layouts.Digits {    

    // this.answersPerChallenge is ignored
    // 
    // this.allRequiredConsonantLIs
    // this.answersExpected

    initialize() {
      super.initialize()
      monika.support.pause()

      this.answersExpected = 0
      var total = this.queue.length
      for ( let ii = 0; ii < total; ii += 1 ) {
        let cue = this.queue[ii]
        this.addToAnswerCount(cue)
      }
     
      this.answered = {
        consonants: 0
      , names: 0
      , numbers: 0
      }
      
      return this
    }


    addToAnswerCount(cue) {
      let consonants = monika.media.consonants.map[cue]
      this.answersExpected += (2 + consonants.length)
      log(this.answersExpected)
    }


    showConsonants () {
      this.allRequiredConsonantLIs = []

      var list = this.section.querySelectorAll("ul.consonants li")
      var total = list.length    
      var child

      var cueArray = this.getCueArray(total, "dontAddAnswer") // We wont' use them all

      var consonants = monika.media.consonants.map[this.number].split("")
      var map = {
        // consonant: number
      }
      var cue
        , consonant

      consonants.forEach((consonant) => {
        map[consonant] = this.number
      })

      for (let ii = consonants.length ; ii < total ; ii += 1) {
        // Add the key consonant for the next decoy
        cue = cueArray.pop()
        consonant = monika.media.consonants.map[cue][0]
        consonants.push(consonant)
        map[consonant] = cue
      }

      this.shuffle(consonants)

      // let delays = [ "delay7", "delay5", "delay3" ]
      let delays = [ "delay3", "delay3", "delay3" ]
 
      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        consonant = consonants.pop()
        cue = map[consonant]

        li.className = ""
        li.number = cue
        li.src = monika.media.getAudioFor("consonant", consonant)

        if (cue === this.number) {
          li.innerHTML = "<span>" + consonant + "</span>"
          li.classList.add("white", delays.pop())
          this.allRequiredConsonantLIs.push(li)
          this.supportElements["consonants"] = li

        } else {
          li.innerHTML = consonant       
          li.classList.add("decoy")
        }
      }
    }


    newChallenge() {
      super.newChallenge()
      this.remaining = 2 + this.allRequiredConsonantLIs.length
    }


    treatWrongAnswer(target) {
      let wrongNumber = target.number
      let wrongInRange = this.numberIsInRange(wrongNumber)

      // Only add this cue number once per error
      if (!this.errorInChallenge) {
        this.queue.recycle(this.number)
        // Use the exact number of answers expected
        this.addToAnswerCount(this.number)
        this.errorInChallenge = true
      }

      // TODO: Remember this as an number to be revised everywhere

      if (wrongInRange) {
        this.queue.recycle(wrongNumber)
        this.addToAnswerCount(wrongNumber)
      }

      
      this.lastErrorClass = this.getListClass(target)

      target.classList.add("disabled")
    } 


    performCustomAction (target) {
      let className = target.parentNode.className
      // "consonants", "names", "numbers"

      if (!target.classList.contains("decoy")) {
        // This was a correct answer
        this.answered[className] += 1

        if (className === "consonants") {
          // Don't let this consonant change to orange later
          target.classList.add("stay-white")

        } else if ( this.answered.names && this.answered.numbers ) { 
          // Fade in the colour of any unfound consonants
          this.allRequiredConsonantLIs.forEach( LI => {
            LI.classList.remove("white")
            // If "stay-white" is on the same <li> element, its colour
            // won't change
          })
        }
      }
    }


    updateTimer() {
      // Variable number of answers per challenge: use answersExpected
      // instead
      let soFar = this.correctAnswers / this.answersExpected

      monika.timer.addWayPoint(soFar)
    }
 

    cleanUp() {
      super.cleanUp()
      monika.support.resume()
    }
  }


  monika.classes["MultiConsonants"] = MultiConsonants


})(window.monika)