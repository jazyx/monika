;(function (monika){

  class Timer {
    constructor() {
      this.current = new monika.TimerCurrent()
      this.ghost = new monika.TimerGhost()
      this.svg = new monika.TimerSVG()

      this.levelName = ""
      this.targetTime = 0
      this.levelTimes = {}
      this.bestTime = 0
      this.startTime = 0
      this.interval = 0
      this.wayPoints = {}
      this.elapsed = 0

      let windowResize = this._windowResize.bind(this)
      window.addEventListener("resize", windowResize, false)
    }


    _windowResize() {
      this.current.refresh()
      this.ghost.refresh()
    }


    _updateTimer(stop, reset) {
      let elapsed = new Date().getTime() - this.startTime
      stop = !!stop

      this.svg.update(elapsed, stop, reset)
      this.ghost.update(elapsed, stop, reset)
    }


    // PUBLIC METHODS //

    prepareLevel(levelOptions) {
      this.levelName = levelOptions.name
      this.targetTime = levelOptions.targetTime

      // Get a cloned or empty object with the format
      // { <milliseconds>: <value from 0.0 - 1.0>, ... }
      this.levelTimes = monika.menu.getLevelTimes(this.levelName)
      let times = Object.keys(this.levelTimes)
      this.firstTime = !times.length
      let bestTime = times.length
                   ? Math.max.apply(null, times)
                   : 0
      this.bestTime = bestTime
                   || levelOptions.firstTime
                   || 180000 // 3 minutes

      this.svg.setTimeToBeat(this.bestTime)
      this.svg.setTarget(this.targetTime)

      this.ghost.setTarget(this.bestTime, this.levelTimes)
      this.current.reset()
    }


    start() {
      let updateTimer = this._updateTimer.bind(this)
      this.startTime  = new Date().getTime()
      this.interval   = setInterval(updateTimer, 100)

      this.wayPoints  = {}

      return true
    }


    addWayPoint(soFar) {
      this.elapsed = new Date().getTime() - this.startTime
      this.current.showProgress(soFar)
      this.wayPoints[this.elapsed] = soFar
    }


    getReward() {
      log ("getReward")
      this.stop()

      let reward

      if (this.elapsed < this.bestTime) {
        if (this.bestTime < this.targetTime) {
          reward = "record"
        } else if (this.firstTime) {
          // No previous track record
          reward = "goodStart"
        } else {
          reward = "bestYet"
        }

        monika.menu.setLevelTimes(this.levelName, this.wayPoints)

      } else if (this.elapsed < this.targetTime) {
        reward = "target"

      } else {
        reward = "complete"
      }

      log(reward)

      return reward
    }


    stop(reset) {
      clearInterval(this.interval)
      this.interval = 0

      this._updateTimer("stop", reset)
    }
  }

  monika.timer = new Timer()

})(window.monika)