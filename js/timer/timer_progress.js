;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  monika.TimerProgress = class TimerProgress {
    constructor(className) {
      this.feedback = document.getElementById("feedback")
      this.progressBar = document.querySelector("div#progress div."+className)
      this.vertical = +getComputedStyle(this.feedback).order
    }

    refresh() {
      let vertical = +getComputedStyle(this.feedback).order
      if (this.vertical === vertical) {
        // No change needed
      } else {
        this.vertical = vertical
        this.progressBar.removeAttribute("style")
        this.showProgress(this.value)
      }
    }


    reset() {
      this.showProgress(0)
    }


    showProgress(value) {
      let percent = (value * 100)
      let top = (100 - percent) + "%"
      percent = percent + "%"

      if (this.vertical) {
        this.progressBar.style.top = top
        this.progressBar.style.height = percent
      } else {
        this.progressBar.style.width = percent
      }

      this.value = value
    }

  }

})(window.monika)