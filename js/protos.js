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
