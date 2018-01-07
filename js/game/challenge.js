;(function challengeLoaded (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  class Challenge {
    constructor(challengeFolderName, levelCallback) {
      this.levelCallback = levelCallback

      this.wrongDelay = 1000
      this.rightDelay = 1500

      this.challenges = monika.media.challenges
        // { root: "media/ru/challenges/"
        // , remember: "я запомню"
        // , contents: {
        //     make_words: {
        //       "москва": {
        //         question:  "Какова длина реки Москва?"
        //       , translations: {
        //           en: "How long is the Moskva River?"
        //         , fr: "Quelle est la longueur de la rivière Moskva?"
        //         }
        //       , answer:    "502"
        //       , units:     "км"
        //       , clue:      "панда"
        //       , qImage:    "Moskva_river.png"
        //       , clueImage: "panda.jpg"
        //       }
        //     , "иртыш": {
        //         question:  "Какова длина реки Иртыш?"
        //       , translations: {
        //           en: "How long is the Irtysh River?"
        //         , fr: "Quelle est la longueur de la rivière Irtysh?"
        //         }
        //       , answer:    "5410"
        //       , units:     "км"
        //       , clue:      "поларная|балерина"
        //       , qImage:    "irtysh.jpg"
        //       , clueImage: "ballerina.jpg"
        //       }
        //     }
        //   }
        // }

      this.challengeFolderName = challengeFolderName
      this.recycleChallenges = false

      let section = this.section = document.querySelector("section.challenge")
      section.classList.remove("show-pad")

      this.elements = {
        question:  section.querySelector   ("div.question p")
      , answers:   section.querySelectorAll("div.answer span.number")
      , units:     section.querySelectorAll("div.answer span.units")
      , words:     section.querySelector   ("div.words p")
      , qImage:    section.querySelector   ("div.images div.question img")
      , clueImage: section.querySelector   ("div.images div.clue img")
 
      , buttons:   section.querySelectorAll("button.continue")
      , wordHint:  section.querySelector   ("div.word.clue input")
      , imageHint: section.querySelector   ("div.images div.clue input")
      , translate: section.querySelector   ("div.question button.translate")
      , tooltip:   section.querySelector   ("div.question p.tooltip")
      , padParent: section.querySelector("div.number-pad-parent")
      }

      this.path = this.challenges.root + challengeFolderName

      this.dialled = ""
    }


    initialize() {
      this.challengeData = this._getChallenge(this.challengeFolderName)

      if (!this.challengeData) {
        log("No challenges found for '" +this.challengeFolderName+ "'")
        return false
      }

      this.answer = this.challengeData.answer
       // TODO: provide correct path to audio
      this.src = "&lt; Audio for " + this.answer + "&gt;"

      this._prepareNumberPad()
      this._populateFields()
      this._displayClueText()
      this._initializeButtons()
      this._prepareTranslations()

      return true
    }


    _getChallenge(challenge) {
      let random

      let challenges = this.challenges.contents[challenge]

      // { " москва": {
      //     question:  "Какова длина реки Москва?"
      //   , translations: {
      //       en: "How long is the Moskva River?"
      //     , fr: "Quelle est la longueur de la rivière Moskva?"
      //     }
      //   , answer:    "502"
      //   , units:     "км"
      //   , clue:      "панда"
      //   , qImage:    "Moskva_river.png"
      //   , clueImage: "panda.jpg"
      //   }
      // , "иртыш": {
      //     question:  "Какова длина реки Иртыш?"
      //   , translations: {
      //       en: "How long is the Irtysh River?"
      //     , fr: "Quelle est la longueur de la rivière Irtysh?"
      //     }
      //   , answer:    "5410"
      //   , units:     "км"
      //   , clue:      "поларная|балерина"
      //   , qImage:    "irtysh.jpg"
      //   , clueImage: "ballerina.jpg"
      //   }
      // }
      
      if (!challenges) {
        return
      }

      let challengeNames = Object.keys(challenges)
      let recentChallenges = monika.menu.getChallenges(challenge)
      // [ "москва", ... ]

      let length = recentChallenges.length
      this.recycleChallenges = (length === challengeNames.length)

      if (this.recycleChallenges) {
        // Recycle a challenge not seen so recently
        this.recycleChallenges = true
        random = Math.random()
        random = Math.floor(random * random * length)
        random = recentChallenges[random]


      } else {
        // Choose a challenge that hasn't been shown yet
        challengeNames.every(challengeName => {
          if (recentChallenges.indexOf(challengeName) < 0) {
            random = challengeName
            return false
          }

          return true
        })
      }

      monika.menu.updateChallenge(this.challengeFolderName, random)

      this.path += "/" + random + "/"

      return challenges[random]
    }


    _prepareNumberPad() {
     let padOptions = {
        parentNode: this.elements.padParent
      , tapNumberCallback: this.tapNumber.bind(this)
      , tapDeleteCallback: this.clearNumber.bind(this)
      , tapHashCallback:   this.playNumber.bind(this)
      }

      this.pad = monika.numberPad.initialize(padOptions)
    }


    _populateFields() {
      let data = this.challengeData
      this.elements.question.innerText = data.question

      this.elements.qImage.src = this.path + data.qImage
      this.elements.clueImage.src = this.path + data.clueImage

      this._populate(this.elements.answers, data.answer)
      this._populate(this.elements.units, data.units)

      this._populate(this.elements.buttons, this.challenges.remember)

      function populate(elements, value) {
        var total = elements.length
        for ( let ii = 0; ii < total; ii += 1 ) {
          elements[ii].innerText = value
        }
      }
    }


    _populate(elements, value) {
      var total = elements.length
      for ( let ii = 0; ii < total; ii += 1 ) {
        elements[ii].innerText = value
      }
    }


    _displayClueText() {
      let clueText = this.challengeData.clue
      // "word"         - single image
      // "word1 word2"  - multiple words combined in a single image
      // "word1|word2" - multiple words, each with its own image
      
      let consonants = "бвгджзклмнпрстфхцчшщ"
      let isConsonant = false
      let innerHTML = ""

      var total = clueText.length
      for ( let ii = 0; ii < total; ii += 1 ) {
        let char = clueText[ii]
        if (char === " " || char === "|") {
          innerHTML += "<br />"
          continue
        }

        let isVowel = consonants.indexOf(char) < 0

        if (isConsonant === isVowel) {
          // A span is ending or beginning
          if (isConsonant) {
            innerHTML += "</span>"
          } else {
            innerHTML += "<span>"
          }

          isConsonant = !isVowel
        }

        innerHTML += char
      }

      this.elements.words.innerHTML = innerHTML
    }


    _initializeButtons() {
      let buttons   = this.elements.buttons
      let imageHint = this.elements.imageHint
      let translate = this.elements.translate

      let playLevel = this.playLevel.bind(this)
      buttons[0].onmouseup = buttons[1].onmouseup = playLevel
  
      imageHint.onmouseup = this.enableWordHint.bind(this)

      translate.onmouseup = this.toggleTranslationTooltip.bind(this)
    }


    _prepareTranslations() {
      let lang = monika.l10n ? monika.l10n.lang : "en"
      let translations = this.challengeData.translations
      let translation = translations[lang]

      this.elements.tooltip.innerText = translation
      this.elements.translate.classList.remove("active")
    }


    enableWordHint(event) {
      this.elements.wordHint.disabled = false
    }


    playLevel(event) {
      this.levelCallback(this.testRecall.bind(this))
    }


    // showTranslationTooltip(event) {
    //   event.preventDefault()

    //   let tooltip =  this.elements.tooltip
    //   tooltip.classList.add("active")

    //   document.body.addEventListener("mouseup", closeTooltip, false)
    //   document.body.addEventListener("touchstart", closeTooltip, false)

    //   function closeTooltip() {
    //     tooltip.classList.remove("active")
    //     document.body.removeEventListener("mouseup", closeTooltip, false)
    //     document.body.removeEventListener("touchstart", closeTooltip, false)
    //   }

    //   return false
    // }


    toggleTranslationTooltip(event) {
      let button =  this.elements.translate
      let active = button.classList.contains("active")

      if (active) {
        button.classList.remove("active")
      } else {
        button.classList.add("active")
      }
    }


    testRecall(reward) {
      this.reward = reward
      this.section.classList.add("show-pad")
      this._populate(this.elements.answers, "")
      this.reward = reward
    }


    playNumber() {
      monika.audio.play(this.src)
    }


    clearNumber() {
      this.elements.answers[0].innerHTML
      = this.elements.answers[1].innerHTML
      = this.dialled
      = ""
    }


    tapNumber(number, target) {
     
      // PLAY TONE FOR NUMBER

      this.dialled += number
      this.elements.answers[0].innerHTML
      = this.elements.answers[1].innerHTML
      = this.dialled

      let result = (this.dialled === this.answer)

      if (result) {
        this.treatCorrectAnswer()

      } else if (this.dialled.length === this.answer.length) {
        this.treatWrongAnswer(target)
      }
    }


    treatWrongAnswer() {
      this.dialled = ""
      this.timeout = setTimeout(() => {
        this.clearNumber()
      }, this.wrongDelay)
    }


    treatCorrectAnswer() {
      monika.audio.play(this.src)

      this.tapHashCallback   = function () {}
      this.tapDeleteCallback = function () {}
      this.tapNumberCallback = function () {}

      this.timeout = setTimeout(() => {
        monika.pass.show(this.reward)
      }, this.rightDelay)
    }
  }

  monika.Challenge = Challenge

})(window.monika)


// Click on #translate link: open in new tab
// $('.mylink').click(function(event){
//     event.preventDefault();
// });