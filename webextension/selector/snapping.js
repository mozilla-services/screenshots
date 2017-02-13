/* exported snapping */
const snapping = (function () { // eslint-disable-line no-unused-vars
  let exports = {};

  let xSnaps = [];
  let ySnaps = [];

  // Calculate x/ySnaps:
  exports.init = function () {
    var xFound = {};
    var yFound = {};
    var scrollX = window.scrollX;
    var scrollY = window.scrollY;
    var allTags = document.getElementsByTagName("*");
    var allTagsLength = allTags.length;

    for (var i=0; i<allTagsLength; i++) {
      var tag = allTags[i];
      var rect = tag.getBoundingClientRect();
      if (rect.height === 0 && rect.width === 0) {
        // Probably not a visible element
        continue;
      }
      var top = Math.floor(rect.top + scrollY);
      var bottom = Math.floor(rect.bottom + scrollY);
      var left = Math.floor(rect.left + scrollX);
      var right = Math.floor(rect.right + scrollX);
      if (! yFound[top]) {
        ySnaps.push(top);
        yFound[top] = true;
      }
      if (! yFound[bottom]) {
        ySnaps.push(bottom);
        yFound[bottom] = true;
      }
      if (! xFound[left]) {
        xSnaps.push(left);
        xFound[left] = true;
      }
      if (! xFound[right]) {
        xSnaps.push(right);
        xFound[right] = true;
      }
    }
    // FIXME: should probably make sure all page edges are in the list
    xSnaps.sort(function (a, b) {
      if (a > b) {
        return 1;
      }
      return -1;
    });
    ySnaps.sort(function (a, b) {
      if (a > b) {
        return 1;
      }
      return -1;
    });
  };


  var _lastClosestX = {};
  exports.guessX = function (x) {
    return _guess(x, findClosest(x, xSnaps, xSnaps.length, _lastClosestX));
  };

  var _lastClosestY = {};
  exports.guessY = function (y) {
    return _guess(y, findClosest(y, ySnaps, ySnaps.length, _lastClosestY));
  };

  var MIN_SNAP = 15;

  function _guess(pos, range) {
    if (pos-range[0] < range[1]-pos &&
        pos-range[0] < MIN_SNAP) {
      return range[0];
    } else if (range[1]-pos < MIN_SNAP) {
      return range[1];
    }
    return pos;
  }

  function findClosest(pos, snaps, snapsLength, memo) {
    if (memo.last && pos >= memo.last[0] && pos <= memo.last[1]) {
      return memo.last;
    }
    if (pos > snaps[snapsLength-1] || pos < snaps[0]) {
      console.warn("Got out of range position for snapping:", pos, snaps[0], snaps[snapsLength-1]);
      return pos;
    }
    var index = Math.floor(snapsLength/2);
    var less = 0;
    var more = snapsLength;
    while (true) { // eslint-disable-line no-constant-condition
      if (snaps[index] <= pos && snaps[index+1] >= pos) {
        break;
      }
      if (snaps[index] > pos) {
        more = index;
      } else {
        less = index;
      }
      index = Math.floor((less + more) / 2);
    }
    var result = [snaps[index], snaps[index+1]];
    //memo.last = result;
    return result;
  }

  return exports;
})();
