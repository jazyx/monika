;(function levelLoaded(level){
  // level = { map: { <name>: <object>, ... }, name: <string> }
  
  function Level() {
    this.name = "Consonants"

    console.log(this.name + " is instantiated")
  }

  Level.prototype.initialize = function initialize() {
    console.log(this.name + " is being initialized")

    //div.addEventListener("transitionend", levelComplete, false)


    function levelComplete(event) {
      level.completed(level.name)
    }
  }

  Level.prototype.kill = function kill() {
    // Clean up when level is about to be replaced
  }

  if (typeof level.name === "string") {
    if (typeof level.map === "object") {
      var object = level.map[level.name] = new Level()
    }
  }
})(window.level) // <HARD-CODED global object>