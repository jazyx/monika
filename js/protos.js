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