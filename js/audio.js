;(function (monika){

  if (!monika) {
    monika = window.monika = {}
  }

  function Audio() {
    let audio = this.audioPreloader = document.createElement("audio")
    this.audioElement = document.querySelector("audio")
    this.audioElement.aaa = "aaa"
    this.audioElement.onended = (event) => {
      this._playNext(event)
    }

    // List of files to preload and that have been loaded
    this.queue   = []
    this.loaded  = []

    // Currently playing sound and status, and next to play
    this.src     = ""
    this.isBusy  = false
    this.nextUp  = { src: 0, callback: null }

    // File type to request from server
    this.ext = "" // will be set to .mp3 or .ogg

    this.debug = false

    let audioTypes = {
      ".mp3":  "audio/mpeg"
    , ".ogg":  "audio/ogg"
    // , ".mp4":  "audio/mp4"
    // , ".aac":  "audio/aac"
    // , ".aacp": "audio/aacp"
    // , ".webm": "audio/webm"
    // , ".webm": "audio/webm"
    // , ".flac": "audio/flac"
    // , ".wav":  "audio/wav"
    }

    if (this.audioPreloader.canPlayType) {
      for (let type in audioTypes) {
        let audioType = audioTypes[type]
        let canPlay = audio.canPlayType(audioType).replace(/no/, '')
              
        if (canPlay) {
          this.ext = type
          break
        }
      }
    } // else ?? there will be no sound at all. Warn?
  }



  /**
   * Sent by <level> at the beginning of a newChallenge()
   *         <level> from treatTap() each time the player taps a good
   *                 item.
   *                 
   * When sent by newChallenge() there should, by design, be no sound
   * currently playing. When sent by treatTap, the current sound may
   * not have finished, so the new sound must either be discarded or
   * delayed.
   * - If it is the same src, then it can be discarded.
   * - If it is a different src (number|consonant|word) then it should
   *   be played, unless the player is tapping really quickly, in
   *   which case it may be replaced by.
   * - If it is the last tap, callback will be a function. In this
   *   case, it must be played (with or without a delay), and the
   *   callback must be called when it is done. Otherwise, the next
   *   challenge will not be shown.
   * 
   * @param  {string}   src      relative url, with no extension
   * @param  {Function} callback null or a callback that will trigger
   *                             the next challenge
   */
  Audio.prototype.play = function play(src, callback) {
    this.nextUp.callback = callback

    if (this.isBusy) {
      if (callback || this.src !== src) {
        // Callback sound must be played. When it finishes, it will
        // trigger the next challenge. Different src may be played
        // if it isn't replaced.
        
        this.nextUp.src = src

      } // else just drop the duplicate sound

      return
    }

    // If we get here, then we want to play this sound ... but it
    // might not be loaded yet.

    this._prepareToPlay(src)
  }



  Audio.prototype._prepareToPlay = function _prepareToPlay(src) {
    const playNow = (event) => {
      let src = event.target.src

      if (event.type === "error") {
        return this.notFoundAlert(src, "play")
      }

      this.fileIsLoaded(src)
      this._playAudio()
    }

    this.src = src
    this.audioElement.src = src + this.ext

    if (this.loaded.indexOf(src) < 0) {
      // this.isBusy is currently false. Use this audio element to
      // load it. But if another request to _prepareToPlay is
      // received, the current src file will be replaced.
      
      this.audioElement.oncanplaythrough = playNow
      this.audioElement.onerror = playNow

    } else {
      // An already-loaded file has priority, even if there's one
      // just about to finish downloading.
      
      this._playAudio();
    }
  }



  Audio.prototype._playAudio = function _playAudio() {
    // Cancel any post-download call to _playAudio (which may have
    // just been made by the current src)
    
    this.audioElement.oncanplaythrough = null
    this.audioElement.play()
    this.isBusy = true

    // When the file has finished playing, it will call _playNext, to
    // see if anything has queued up in the meantime
  }



  Audio.prototype._playNext = function _playNext() {
    this.isBusy = false

    let src = this.nextUp.src
    let callback = this.nextUp.callback

    if (src) {
      this.nextUp.src = 0
      this._prepareToPlay(src)

    } else if (callback) {
      // this.isBusy will be false while the callback is executing
      callback()
      this.nextUp.callback = null
    }
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
        src += this.ext
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

    if (this.queue.length && !this.audioPreloader.oncanplaythrough) {
      _startPreload()
    }
  }



  Audio.prototype.fileIsLoaded = function fileIsLoaded(src) {
    // Trim domain and extension
    src = decodeURIComponent(src)
    src = src.match(/\/monika\/.*$/)[0]
    src = src.substring(0, src.lastIndexOf("."))

    this.loaded.push(src)
  }



  Audio.prototype.notFoundAlert = function notFoundAlert(src, type) {
    message = (type) ? "Error with " + src
                     : src + " ready to play"

    // document.querySelector("header").innerHTML = message

    if (this.debug) {
       alert(message)
    } else {
      console.log(message)
    }
  }



  monika.audio = new Audio()

})(window.monika)