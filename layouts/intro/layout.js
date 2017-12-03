;(function levelLoaded(monika){
  // monika = { map: { <name>: <object>, ... }, name: <string> }
  
  function Level() {
    this.name = "Intro"

    console.log(this.name + " is instantiated")
  }

  Level.prototype.initialize = function initialize() {
    console.log(this.name + " is being initialized")

    //div.addEventListener("transitionend", levelComplete, false)


    function levelComplete(event) {
      monika.completed(monika.level)
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
})(window.monika) // <HARD-CODED global object>