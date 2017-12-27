;(function (monika) {

  if (!monika) {
    monika = window.monika = {}
  }

  monika.TimerSVG = class TimerSVG {
    constructor() {
      this.circle = document.querySelector("svg#timer circle")
      this.timer  = document.querySelector("svg#timer path.timer")
      this.target = document.querySelector("svg#timer path.target")
      this.text   = document.querySelector("svg#timer text")

      // << HARD-CODED 
      this.textFill   = ["#339", "#fff"] // in time, out of time
      this.timerFills = ["#ccf", "#bbe"]
      this.targetFill = "#cfc"
      this.targetOpacity = 0.2
      this.targetMissed = false
      this.warnStart  = 0.75

      let radius  = this.radius = 100
      // HARD-CODED >>

      this.path1  = "M 0,-" + radius +" A "+radius+","+ radius + " 0 "
      this.path2  = " L 0 0 L 0 -" + radius
      this.x      = 0
      this.lastX  = -1
      this.timeToBeat = 60000
      this.timeUp     = false

      this.warnAt     = 0  // this.warnStart * this.timeToBeat
      this.interval   = 0  // incremented when startTimer is called
      this.start      = 0  // milliseconds
      this.circleFill = "" // "#ccf" | "#bbe"
      this.fills      = [] // this.timerFills, or in reverse order

      this._resetTimer()
    }


    _resetTimer() {
      this.text.innerHTML = ""

      this.lastX  = -1
      this.fills  = [].concat(this.timerFills)

      this.circleFill = this.fills[0]
      this.circle.setAttribute("fill", this.circleFill)
      this.fills.push(this.fills.shift())
      this.timer.setAttribute("fill", this.fills[0])

      let path = this._getSector(0, 1)
      this.timer.setAttribute("d", path)
    }


    _switchFills() {
      this.timer.setAttribute("fill", this.fills[0])
      this.fills.push(this.fills.shift())
      this.circle.setAttribute("fill", this.fills[0])      
    }


    _getSector(time, sweep) {
      let angle = time * (Math.PI * 2) / this.timeToBeat
      this.x = Math.sin(angle) * this.radius
      let y = -Math.cos(angle) * this.radius
      let end_point = this.x + "," + y
      let large_arc = (sweep == this.x > 0)
                    ? "0"
                    : "1"
      sweep = " " + sweep + " "

      let path = this.path1+large_arc+sweep+end_point+this.path2
     
      return path
    }


    _redrawTimer(ms) { 
      let path = this._getSector(ms, 1)
      this.timer.setAttribute("d", path)
    }


    _checkForOverTime(ms) {
      if (!this.targetMissed) {
        if (ms > this.targetTime) {
          this.target.setAttribute("opacity", 0)
          this.targetMissed = true
        }
      }

      if (!this.timeUp) {
        if (ms > this.timeToBeat) {
          this._missDeadline()

        } else if (ms > this.warnAt) {
          this._updateWarning(ms)
        }
      } else if (ms > this.timeToBeat * 2) {
        this._stopTrackingTime()
      } else {
        this._fadeOutTimer(ms)
      }

      if (this.lastX < 0 && !(this.x < 0)) {
        this._switchFills()
      }

      this.lastX = this.x
    }


    _updateWarning(ms) {
      let ratio = (ms - this.warnAt) / (this.timeToBeat - this.warnAt)

      // circleFill = #ccf > #f90 > #f00
      // Increase red to f and decrease blue to 6, then decrease
      // both green and blue to zero
      

      let fill = this._hexToRgb(this.circleFill)
      let midRed = 255
      let midBlue = 96
      let deltaRed
        , deltaBlue
      
      if (ratio < 0.5) {
        ratio *= 2
        deltaRed   = fill.red - midRed
        deltaBlue  = fill.blue - midBlue
        fill.red   = Math.round(midRed + (1 - ratio) * deltaRed)
        fill.green = fill.green
        fill.blue  = Math.round(midBlue + (1 - ratio) * deltaBlue)
      } else {
        ratio = Math.max(0, 1 - (ratio - 0.5) * 2)
        fill.red   = midRed
        fill.green = Math.round(fill.green * ratio)
        fill.blue  = Math.round(midBlue * ratio)
      }

      fill = this._rgbToHex(fill)

      this.circle.setAttribute("fill", fill)
    }


    _missDeadline() {
      this.circle.setAttribute("fill", this.circleFill)
      this.timeUp = true
    }


    _fadeOutTimer(ms) {
      let opacity = 1 - ((ms - this.timeToBeat) / this.timeToBeat)
      this.timer.style.opacity = opacity
    }


    _stopTrackingTime() {
      this._resetTimer()
      this._switchFills()
    }


    _stop(ms) {
      let seconds = Math.round(ms / 1000)
      this.text.innerHTML = seconds + "s"
      this.text.style.fill = this.textFill[this.timeUp + 0]
    }


    // UTILITIES

    _hexToRgb(hex) {
      let rgb = {
        red:   0
      , green: 0
      , blue:  0
      }
      let regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
      let scale = hex.length < 6
                ? 17
                : 1

      if (scale - 1) {
        regex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
      }

      let result = regex.exec(hex);

      if (result) {
        rgb.red   = parseInt(result[1], 16) * scale,
        rgb.green = parseInt(result[2], 16) * scale,
        rgb.blue  = parseInt(result[3], 16) * scale
      }

      return rgb
    }


    _rgbToHex(rgb) {
      let hex = "#"

      let red   = rgb.red.toString(16)
      let green = rgb.green.toString(16)
      let blue  = rgb.blue.toString(16)

      hex += (red.length === 1) 
           ? "0" + red
           : red
      hex += (green.length === 1) 
           ? "0" + green
           : green
      hex += (blue.length === 1) 
           ? "0" + blue
           : blue

      return hex
    }


    // PUBLIC METHODS

    setTarget(targetTime) {
      let path = this._getSector(targetTime, 1)
      this.targetMite = targetTime
      this.target.setAttribute("d", path)
      this.target.setAttribute("fill", this.targetFill)
      this.target.setAttribute("opacity", this.targetOpacity)
    }


   setTimeToBeat(timeToBeat) {
      this.timeToBeat = timeToBeat
      this.warnAt = timeToBeat * this.warnStart
      this._resetTimer()
    }


    update(ms, stop, reset) {
      this._redrawTimer(ms)
      this._checkForOverTime(ms)

      if (stop) {
        this._stop(ms)

        if (reset) {
          this._resetTimer()
        }
      }
    }

  }

})(window.monika)