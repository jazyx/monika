;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  class Pass {
    constructor() {
      this.article   = document.querySelector("article#pass")
      this.header    = this.article.querySelector("h1")
      this.text      = this.article.querySelector("p")
      this.progress  = this.article.querySelector("button.progress")
      this.repeat    = this.article.querySelector("button.repeat")
      this.nextLevel = this.article.querySelector("button.nextLevel")

      this.texts = monika.media.pass
      // { rewards: {
      //     header:    "Congratulations!"
      //   , target:    "You've beaten the target time!"
      //   , bestYet:   "You've beaten your personal best!"
      //   , goodStart: "You're off to a good start!"
      //   , complete:  'You completed level <span class="level">1</span>!'
      //   , gameOver:  "You've reached the end of the game."
      //   }
      //   , buttons{
      //     progress:  "See your progress"
      //   , repeat:    "Repeat this level"
      //   , nextLevel: "Continue"
      //   }
      // }

      this.header.innerText    = this.texts.rewards.header
      this.progress.innerText  = this.texts.buttons.progress
      this.repeat.innerText    = this.texts.buttons.repeat
      this.nextLevel.innerText = this.texts.buttons.nextLevel
   
      this.progress.onmousedown  = this.showProgress.bind(this)
      this.repeat.onmousedown    = this.completeLevel.bind(this)
      this.nextLevel.onmousedown = this.openLevel.bind(this)
    }


    show(reward) {
      log ("show(" + reward + ") in pass")
      this.text.innerHTML = this.texts.rewards[reward]

      // << CAUTION HARD-CODED 
      if (reward === "complete") {
        let level = monika.menu.level
        let span = this.text.querySelector("span")
        span.innerText = level
      }

      this.article.classList.add("active")
    }


    hide() {
      this.article.classList.remove("active")
    }


    openLevel(event) {
      this.completeLevel(event, 1)
    }


    completeLevel(event, deltaLevel = 0) {
      monika.menu.completeLevel(deltaLevel)

      this.hide()
    }


    showProgress(event) {
      alert("TODO:\n"
          + "* Create object to record progress\n"
          + "* Create article to show progress")
    }
  }

  monika.pass = new Pass()

})(window.monika)



    // <div class="outer-frame">
    //   <div class="inner-frame">
    //     <h1></h1>
    //     <p></p>
    //     <div class="buttons">
    //       <button type="button" class="progress" disabled></button>
    //       <button type="button" class="repeat"></button>
    //       <button type="button" class="nextLevel"></button>
    //     </div>
    //   </div>
    // </div>

    // <section class="progress">
    //   <div>
    //     Information about progress will go here.
    //     <button type="button" class="close">&#10006;</button>
    //   </div>
    // </section>