"use strict"


;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }
  
  function Level() {
    this.name = "Intro"
    this.queue = []

    console.log(this.name + " is instantiated")
  }

  Level.prototype.initialize = function initialize() {
    console.log(this.name + " is being initialized")

    //div.addEventListener("transitionend", levelComplete, false)

    this.startGame()

    function levelComplete(event) {
      monika.completed(monika.level)
    }
  }

  Level.prototype.startGame = function startGame() {
    var self = this
    var section = document.querySelector("main section")
    var target

    monika.manager.setOptions({
      range: { start: 0, end: 9 }
    , repeats: 1
    , consecutive: true
    , audio: [ "numbers", "words" ]
    })
    this.queue = monika.manager.getQueue()

    // const startTap = (event) => {
    //   target = event.target

      let treatTap = (event) => {
        target = event.target

        while (target  && target.nodeName !== "LI") {
          target = target.parentNode
        }

        if (!target) {
          return
        } else if (target.classList.contains("touched")) {
          return
        }

        target.classList.add("touched")

        if (target.classList.contains("decoy")) {
          target.classList.add("disabled")

          // TODO: Remember this as an number to be revised
          this.queue.recycle(this.number)

        } else {
          if (--this.remaining) {
            monika.audio.play(this.audio)
          } else {
            setTimeout(next, 500)
          }
        }
      }

      let next = () => {
        self.newChallenge()
      }

      // let checkTap = (event) => {
      //   if (event.target === target) {
      //     treatTap()
      //   }

      //   target = 0
      //   document.body.onmouseup = document.body.ontouchend = null
      // }

    //   document.body.onmouseup = document.body.ontouchend = checkTap
    // }

    section.onmousedown = section.ontouchstart = treatTap // startTap
    this.newChallenge()
  }

  Level.prototype.newChallenge = function newChallenge() {
    const getNumber = () => {
      let number = this.queue.pop()

      if (number === this.number) {
        let canRecycle = this.queue.length
                       && (( this.queue.max() !== number
                          || this.queue.min() !== number))

        if ( canRecycle ) {
          this.queue.recycle(number)
          return getNumber()
        } else {
          // The rest of the queue is identical. Delete it
          this.queue.length = 0
          return
        }
      }

      this.number = number

      console.log(number, this.queue)

      return number
    }

    var number = getNumber()

    if (number === undefined) {
      alert("Time for a new level (when it's ready)")
      return this.startGame()
    }

    var cue = monika.manager.getCue(number)
    var decoys = cue.decoys
    var media  = cue.media
    var answer = cue.answer
    
    monika.audio.preload(media.audio)

    this.remaining = 3
    this.audio = answer.audio[0]

    drawDots()
    showNames()
    showNumbers()
    monika.audio.play(this.audio)

    function getCueArray(total) {
      total -= 1
      var cueArray = decoys.numbers.splice(0, total)
      cueArray.splice(random(total), 0, number)
      return cueArray
    }

    function random (max) {
      return Math.floor(Math.random() * max + 1)
    }

    function drawDots() {
      var section = document.querySelector("article main section")
      var list = section.querySelectorAll("ul.consonants li")
      var total = list.length    
      var child

      var cueArray = getCueArray(total)

      var total = list.length    
      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]
        let svg = getDotsSVG(cue)

        while (child = li.lastChild) {
          li.removeChild(child)
        }
        li.appendChild(svg)

        li.className = ""

        if (cue !== number) {
          li.classList.add("decoy")
        }
      }
    }

    function showNames() {    
      var section = document.querySelector("article main section")
      var list = section.querySelectorAll("ul.words li")
      var total = list.length    
      var child

      var cueArray = getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]
        let name = decoys.names[cue] || answer.name.match(/[^|]+/)[0]
        let consonants = media.consonants[cue]
        let regex = new RegExp ("[" + consonants + "]")
        let match = name.match(regex)

        if (match) {
          name = name.replaceAt(match.index, "<span>" + match[0] + "</span>")
        }

        li.innerHTML = "<p>" + name + "</p>"
        li.className = ""

        if (cue !== number) {
          li.classList.add("decoy")
        }
      }
    }

    function showNumbers() {    
      var section = document.querySelector("article main section")
      var list = section.querySelectorAll("ul.numbers li")
      var total = list.length    
      var child

      var cueArray = getCueArray(total)

      for (let ii = 0; ii < total; ii += 1) {
        let li = list[ii]
        let cue = cueArray[ii]

        li.innerHTML = cue
        li.className = ""

        if (cue !== number) {
          li.classList.add("decoy")
        }
      }
    }
  }

  Level.prototype.kill = function kill() {
    // Clean up when level is about to be replaced
  }

  if (typeof monika.level === "string") {
    if (typeof monika.map === "object") {
      var object = monika.map[monika.level] = new Level()
    }
  }


// << DOTS // DOTS // DOTS // DOTS // DOTS // DOTS // DOTS // DOTS //

  var radiusMap = []
  var centreMap = []
  var radius
    , a
    , b
    , c
    , d
    , h
    , r
    , s
    , centre

  if (!monika) {
    monika = window.monika = {}
  }

  for (let ii = 1; ii < 10; ii += 1) {
    radiusMap[ii] = Math.sqrt(0.5 / (ii * Math.PI))
  }

  // radiusMap = [
  //   0: undefined
  //   1: 0.3989422804014327,
  //   2: 0.28209479177387814,
  //   3: 0.23032943298089031,
  //   4: 0.19947114020071635,
  //   5: 0.1784124116152771,
  //   6: 0.16286750396764,
  //   7: 0.15078600877302686,
  //   8: 0.14104739588693907,
  //   9: 0.1329807601338109
  //  ]
  
  // No dots = one dot with no fill
  //radiusMap[0] = radiusMap[1]

  // One dot: centre is at 0.5, 0.5
  // centreMap[0] = 
  centreMap[1] = [ { x: 0.5, y: 0.5 } ]

  // Two dots: diagonal radii touch at 0.5, 0.5
  r = radiusMap[2]
  c = Math.sqrt((r * r) / 2)
  a = 0.5 - c
  b = 0.5 + c
  centreMap[2] = [ { x: a, y: a }, { x: b, y: b } ]

  // Three dots: centres are on equilateral triangle with side 2r
  // The centre of the triangle needs to be dropped by half the height
  // of the vertical white space, so that the figure appears centred.
  r = radiusMap[3]
  h = Math.sqrt(3) * r
  a = ((h * h) + (r * r)) / (2 * h)
  b = h - a
  c = (1 - (2 * r + h)) / 2 + 0.5
  centreMap[3] = [
    { x: 0.5, y: c - a }
  , { x: 0.5 - r, y: c + b }
  , { x: 0.5 + r, y: c + b }
  ]

  // Four dots in a square
  r = radiusMap[4]
  a = 0.5 - r
  b = 0.5 + r
  centreMap[4] = [
    { x: a, y: a }
  , { x: a, y: b }
  , { x: b, y: b }
  , { x: b, y: a }
  ]

  // Five dots in a cross
  r = radiusMap[5]
  c = r * Math.sqrt(2)
  a = 0.5 - c
  b = 0.5 + c
  centreMap[5] = [
    { x: a, y: a }
  , { x: a, y: b }
  , { x: 0.5, y: 0.5 }
  , { x: b, y: b }
  , { x: b, y: a }
  ]

  // Six dots in a hexagon without a centre
  r = radiusMap[6]
  s = 2 * Math.sin(Math.PI / 3)
  a = 0.5 - r
  b = 0.5 + r
  c = 0.5 - (r * s)
  d = 0.5 + (r * s)
  centreMap[6] = [
    { x: a, y: c }
  , { x: b, y: c }
  , { x: 0.5 - 2*r, y: 0.5 }

  , { x: 0.5 + 2*r, y: 0.5 }
  , { x: a, y: d }
  , { x: b, y: d }
  ]

  // Seven dots in a hexagon
  r = radiusMap[7]
  a = 0.5 - r
  b = 0.5 + r
  c = 0.5 - (r * s)
  d = 0.5 + (r * s)
  centreMap[7] = [
    { x: a, y: c }
  , { x: b, y: c }
  , { x: 0.5 - 2*r, y: 0.5 }
  , { x: 0.5, y: 0.5 }
  , { x: 0.5 + 2*r, y: 0.5 }
  , { x: a, y: d }
  , { x: b, y: d }
  ]

  // Eight dots in a square with an empty centre
  r = radiusMap[8]
  a = 0.5 - 2 * r
  b = 0.5
  c = 0.5 + 2 * r
  centreMap[8] = [
    { x: a, y: a }
  , { x: b, y: a }
  , { x: c, y: a }
  , { x: a, y: b }

  , { x: c, y: b }
  , { x: a, y: c }
  , { x: b, y: c }
  , { x: c, y: c }
  ]

  // Nine dots in a square
  r = radiusMap[9]
  a = 0.5 - 2 * r
  b = 0.5
  c = 0.5 + 2 * r
  centreMap[9] = [
    { x: a, y: a }
  , { x: b, y: a }
  , { x: c, y: a }
  , { x: a, y: b }
  , { x: b, y: b }
  , { x: c, y: b }
  , { x: a, y: c }
  , { x: b, y: c }
  , { x: c, y: c }
  ]

  function getDotsSVG(n) {
    var svgns = "http://www.w3.org/2000/svg"
    var svg = document.createElementNS(svgns, "svg")
    var centres = centreMap[n] || []
    var radius = radiusMap[n]
    var total = centres.length

    svg.setAttribute('viewBox', "0 0 1 1");
    svg.setAttribute("xmlns","http://www.w3.org/2000/svg");

    for (let ii = 0; ii < total; ii += 1) {
      let circle = document.createElementNS(svgns, "circle")
      circle.setAttribute("cx", "" + centres[ii].x);
      circle.setAttribute("cy", "" + centres[ii].y);
      circle.setAttribute("r",  "" + radius);

      if (n) {
        circle.setAttribute("stroke",  "none");    
      } else {
        circle.setAttribute("stroke-width", "0.01")
        circle.setAttribute("fill", "none")
        circle.setAttribute("opacity", "0.1")
      }

      svg.appendChild(circle)
    }

    return svg
  }
// DOTS // DOTS // DOTS // DOTS // DOTS // DOTS // DOTS // DOTS >> //

})(window.monika)