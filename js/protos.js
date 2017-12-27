String.prototype.replaceAt=function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index+1);
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Object.defineProperty(Array.prototype, "max", {
  enumerable: false
})

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

Object.defineProperty(Array.prototype, "min", {
  enumerable: false
})


// https://stackoverflow.com/a/1848489/1927589

HTMLElement.prototype.cloneWithStyle = function cloneWithStyle() {
  let clone = this.cloneNode(true)
  copyComputedStyle(this, clone)
  return clone

  function realStyle(_elem, _style) {
    var computedStyle;
    if ( typeof _elem.currentStyle != 'undefined' ) {
        computedStyle = _elem.currentStyle;
    } else {
        computedStyle = document.defaultView.getComputedStyle(_elem, null);
    }

    return _style ? computedStyle[_style] : computedStyle;
  }

  function copyComputedStyle(src, dest) {
    var s = realStyle(src);
    for ( var i in s ) {
      // Do not use `hasOwnProperty`, nothing will get copied
      if ( typeof i == "string" && i != "cssText" && !/\d/.test(i) ) {
        // The try is for setter only properties
        try {
          dest.style[i] = s[i];
          // `fontSize` comes before `font` If `font` is empty, `fontSize` gets
          // overwritten.  So make sure to reset this property. (hackyhackhack)
          // Other properties may need similar treatment
          if ( i == "font" ) {
              dest.style.fontSize = s.fontSize;
          }
        } catch (e) {}
      }
    }
  }
}


//   new Clone()
// var element = document.getElementById('origin');
// var copy = element.cloneNode(true);
// var destination = document.getElementById('destination');
// destination.appendChild(copy);
// copyComputedStyle(element, copy);








function log () {
  let message = ""

  for (let ii=arguments.length; ii--; ) {
    let value = arguments[ii]

    if (typeof value === "object") {
      message = JSON.stringify(value) + " " + message
    } else {
      message = value + " " + message
    }
  }

  // let pre = document.querySelector("pre")
  // pre.textContent += '\n' + message
  // pre.scrollTop = 9999

  if (window._debug) {
     alert(message)
  } else {
    console.log(message)
  }
}



window.addEventListener(
  "resize"
, function () {
    window.scroll(0, 0) // 999)
  }
, false)