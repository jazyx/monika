;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  function Audio() {
    this.audioElement = document.querySelector("audio")
    let audio = this.audioPreloader = document.createElement("audio")

    this.queue = []
    this.loaded = []
    this.url = ""
    this.delay = 2000
    this.timeout = 0
    this.canPlay = ""

    this.debug = true

    let audioTypes = {
      ".mp3":  "audio/mpeg"
    , ".ogg":  "audio/ogg"
    , ".mp4":  "audio/mp4"
    , ".aac":  "audio/aac"
    , ".aacp": "audio/aacp"
    , ".webm": "audio/webm"
    , ".webm": "audio/webm"
    , ".flac": "audio/flac"
    , ".wav":  "audio/wav"
    }
    if (this.audioPreloader.canPlayType) {
      for (let type in audioTypes) {
        let audioType = audioTypes[type]
        let canPlay = audio.canPlayType(audioType).replace(/no/, '')

        if (canPlay) {
          this.canPlay = type
          break
        }
      }
    }
  }

  Audio.prototype.play = function play(src) {
    const playNow = (event) => {
      let src = event.target.src

      if (event.type === "error") {
        return notFoundAlert(src, "play")
      }

      this.fileIsLoaded(src)
      this._playAudio()
      this.audioElement.oncanplaythrough = null
    }

    if (this.src === src) {
      if (this.timeout) {
        // Allow a delay before repeating a sound
        return
      }
    } else {
      this.audioElement.src = src + this.canPlay
      this.src = src
    }


    if (this.loaded.indexOf(src) < 0) {
      this.audioElement.oncanplaythrough = playNow
      this.audioElement.onerror = playNow
    } else {
      this._playAudio();
    }
  }

  Audio.prototype._playAudio = function _playAudio() {
    this.audioElement.play()

    // Create a timeout so that the same file is not replayed
    // immediately, if the user is tapping fast
    // 
    const timeup = () => {
      this.timeout = 0
    }

    this.timeout = setTimeout(timeup, this.delay)
  }

  Audio.prototype.preload = function preload(srcArray, callback) {
    // Adds urls in srcArray in reverse order, so that the first src
    // in srcArray will be the first to be popped. If any urls are
    // already in the array, they will be re-orderd in a priority
    // position.
    
    // TODO? Apply callback to each batch, so that the app knows when
    // all requested files have become available

    _startPreload = () => {
      this.audioPreloader.oncanplaythrough = _loadNext
      this.audioPreloader.onerror = _loadNext

      this.audioPreloader.src = this.queue.pop()
    }

    _loadNext = (event) => {  
      let src = event.target.src

      if (event.type === "error") {
        return this.notFoundAlert(src, "preload")
      }

      this.fileIsLoaded(src)

      src = this.queue.pop()

      if (src) {
        this.audioPreloader.src = src
      } else {
        this.audioPreloader.oncanplaythrough = null
        this.audioPreloader.onerror = null
      }
    }
    
    let ii = srcArray.length

    while (ii--) {
      let src = srcArray[ii]

      if (this.loaded.indexOf(src) < 0 ) {
        src += this.canPlay
        let index = this.queue.indexOf(src)

        if (index < 0) {
        } else if (index = this.queue.length - 1) {
          continue
        } else {
          // Move this src to the (current) head of the queue
          this.queue.splice(index, 1)
        }

        this.queue.push(src)
      }
    }

    if (!this.audioPreloader.oncanplaythrough) {
      _startPreload()
    }
  }

  Audio.prototype.fileIsLoaded = function fileIsLoaded(src) {
    // Trim domain and extension
    src = decodeURIComponent(src)
    src = src.match(/\/media\/.*$/)[0]
    src = src.substring(0, src.lastIndexOf("."))

    this.loaded.push(src)
  }

  Audio.prototype.notFoundAlert = function notFoundAlert(src, type) {
    if (this.debug) {
       alert("ERROR "+type+": '"+src+"' not found")
    } else {
      console.log("ERROR "+type+": '"+src+"' not found")
    }
  }

  monika.audio = new Audio()

})(window.monika)