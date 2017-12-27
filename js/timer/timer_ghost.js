;(function (monika){

  monika.TimerGhost = class TimerGhost extends monika.TimerProgress {
    constructor() {
      super("ghost")

      this.defaultOpacity = getComputedStyle(this.progressBar).opacity

      this.targetTime = 0
      this.levelTimes = {}
      this.wayPoints = []

      this.useWayPoints = false

      this.defeated = false
      this.resigned = false
    }


    reset() {
      super.reset()
      this.progressBar.style.opacity = this.defaultOpacity
    }


    setTarget(targetTime, levelTimes) {
      this.targetTime = targetTime || 999999
      this.levelTimes = levelTimes
      this.wayPoints = Object.keys(levelTimes).sort(ascending)

      this.useWayPoints = !!this.wayPoints.length

      this.reset()

      console.log(this.wayPoints)

      function ascending(a, b) {
        return a - b
      }
    }


    showProgress(value) {
      if (value > 1.0) {
        if (!this.defeated) {
          this.defeated = true
          value = 1.0
          // Make super work one last time

        } else if (this.resigned) {
          // The ghost has already faded away
          return

        } else {
          let opacity

          if (value > 2.0)  {
            opacity = "0"
            this.resigned = true
          } else {
            opacity = 2.0 - value
            opacity = opacity * opacity * opacity * opacity
            opacity = "" + (opacity * opacity)
          }

          this.progressBar.style.opacity = opacity

          // Don't update super no more
          return
        }
      }

      super.showProgress(value)
    }


    update(milliseconds, stop, reset) {
      if (stop) {
        if (reset) {
          this.reset()
        }

        return
      }

      let progress = milliseconds / this.targetTime

      if (this.useWayPoints) {
        while (this.wayPoints[0] < milliseconds) {
          progress = this.wayPoints.shift()
        }

        progress = this.levelTimes[progress]
      }

      this.showProgress(progress)
    }
  }

})(window.monika)