// modified original SetExtension functions for faster programming

Set.prototype.isSuperset = function (subset) {
  for (var elem of subset) {
    if (!this.has(elem)) {
      return false
    }
  }
  return true
}

Set.prototype.union = function (...sets) {
  var union = new Set(this)
  sets = flattenDeep(sets)
  for (var aSet of sets) {
    for (var elem of aSet) {
      union.add(elem)
    }
  }
  return union
}

Set.prototype.intersect = function (...sets) {
  var intersection = new Set(this)
  sets = flattenDeep(sets)
  for (var aSet of sets) {
    for (var elem of intersection) {
      if (!aSet.has(elem)) {
        intersection.delete(elem)
      }
    }
  }
  return intersection
}

Set.prototype.difference = function (...sets) {
  var difference = new Set(this)
  sets = flattenDeep(sets)
  for (var aSet of sets) {
    for (var elem of aSet) {
      difference.delete(elem)
    }
  }
  return difference
}

function flattenDeep(arr1) {
   return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
}
