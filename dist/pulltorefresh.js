(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () {

var config = {};

config.distTreshold = 90;
config.distMax = 120;
config.resistanceFunction = function ( t ) { return Math.min(1, t / 2.5); };

var body = document.querySelector('#main');

var pullStartY = null;
var pullMoveY = null;
var dist = 0;
var distResisted = 0;

window.addEventListener('touchstart', function (e) {
  if (!window.scrollY) {
    pullStartY = e.touches[0].screenY;
  }
});

window.addEventListener('touchmove', function (e) {
  if (!pullStartY) {
    if (!window.scrollY) {
      pullStartY = e.touches[0].screenY;
    }
  } else {
    pullMoveY = e.touches[0].screenY;
  }

  console.log('PULL');

  if (pullStartY && pullMoveY) {
    dist = pullMoveY - pullStartY;
  }

  if (dist > 0) {
    e.preventDefault();
    body.style.transform = body.style.webkitTransform = "translate3d(0," + distResisted + "px,0)";
    distResisted = config.resistanceFunction(dist / config.distTreshold)
      * Math.min(config.distMax, dist);

    if (distResisted > config.distTreshold) {
      console.log('RELEASE');
    }
  }
});

window.addEventListener('touchend', function () {
  if (distResisted > config.distTreshold) {
    console.log('GO');
  }

  body.style.transform = 'translate3d(0,0,0)';
  pullStartY = pullMoveY = null;
  dist = distResisted = 0;
});

})));
