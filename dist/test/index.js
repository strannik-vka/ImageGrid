/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ImageGrid = /*#__PURE__*/function () {
  function ImageGrid(obj) {
    var _this = this;

    _classCallCheck(this, ImageGrid);

    this.styles();
    this.dimensions = {};
    this.container = obj.container;
    this.breakpoints = obj.breakpoints;
    this.margin = typeof obj.margin !== 'undefined' ? obj.margin : 0;
    this.setBreakpoint();
    this.each();
    window.addEventListener('resize', function () {
      _this.setBreakpoint();

      _this.each();
    }, true);
  }

  _createClass(ImageGrid, [{
    key: "setBreakpoint",
    value: function setBreakpoint() {
      var _this2 = this;

      if (_typeof(this.breakpoints) === 'object' && this.breakpoints != null) {
        var keys = Object.keys(this.breakpoints);
        keys.forEach(function (key) {
          if (window.screen.width >= key) {
            var breakpointKeys = Object.keys(_this2.breakpoints[key]);
            breakpointKeys.forEach(function (breakpointKey) {
              _this2[breakpointKey] = _this2.breakpoints[key][breakpointKey];
            });
          }
        });
      }
    }
  }, {
    key: "styles",
    value: function styles() {
      document.querySelector('head').innerHTML += '<style>.image-grid-parent {position: relative;}.image-grid-item {position: absolute;}</style>';
    }
  }, {
    key: "each",
    value: function each() {
      var _this3 = this;

      var parents = document.querySelectorAll(this.container);
      parents.forEach(function (parent) {
        parent.classList.add('image-grid-parent');

        var imgs = parent.querySelectorAll('img'),
            parentWidth = _this3.getElemWidth(parent);

        _this3.getDimensionsAll(imgs, function (dimensions) {
          var heightAll = 0;

          for (var i = 0; i < imgs.length; i++) {
            imgs[i].classList.add('image-grid-item');
            var isEven = i % 2;

            if (!isEven) {
              var calc = _this3.calcDimensions(dimensions[i], dimensions[i + 1], parentWidth);

              if (_typeof(calc) === 'object' && calc != null) {
                imgs[i].style.width = calc.width1 + 'px';
                imgs[i + 1].style.width = calc.width2 + 'px';
                _this3.dimensions[i].width = calc.width1;
                _this3.dimensions[i].height = calc.height;
                _this3.dimensions[i + 1].width = calc.width2;
                _this3.dimensions[i + 1].height = calc.height;
              }

              var calcPosition1 = _this3.calcLeftPosition(i),
                  calcPosition2 = _this3.calcLeftPosition(i + 1);

              imgs[i].style.top = heightAll + 'px';
              imgs[i].style.left = calcPosition1 + 'px';
              imgs[i + 1].style.top = heightAll + 'px';
              imgs[i + 1].style.left = calcPosition2 + 'px';
              heightAll += _this3.dimensions[i].height + _this3.margin;
            }
          }

          parent.style.height = heightAll + 'px';
          parent.style.opacity = '1';
        });
      });
    }
  }, {
    key: "calcLeftPosition",
    value: function calcLeftPosition(i) {
      return i % 2 ? this.dimensions[i - 1].width + this.margin : 0;
    }
  }, {
    key: "calcDimensions",
    value: function calcDimensions(dimension1, dimension2, container_width) {
      container_width = container_width - this.margin; // 1. действие: выровнять картинки

      if (dimension1.height != dimension2.height) {
        // Новая ширина для большой картинки
        var new_width = dimension1.height > dimension2.height ? dimension2.height * dimension1.width / dimension1.height : dimension1.height * dimension2.width / dimension2.height;
        var images_width = new_width + (dimension1.height > dimension2.height ? dimension2.width : dimension1.width);
      } else {
        var new_width = dimension1.width,
            images_width = dimension2.width + dimension1.width;
      } // 2. действие: найти на сколько % измениить картинки, чтобы поместить в контейнер


      if (images_width != container_width) {
        var percent_new_width = 100 / (images_width / new_width),
            width_new_width = container_width / 100 * percent_new_width,
            new_height = dimension1.height * (dimension1.height > dimension2.height ? width_new_width : container_width - width_new_width) / dimension1.width;

        if (dimension1.height > dimension2.height) {
          return {
            width1: width_new_width,
            width2: container_width - width_new_width,
            height: new_height
          };
        } else {
          return {
            width1: container_width - width_new_width,
            width2: width_new_width,
            height: new_height
          };
        }
      }

      return false;
    }
  }, {
    key: "getElemWidth",
    value: function getElemWidth(elem) {
      var computedStyle = getComputedStyle(elem, null);
      return parseInt(computedStyle.getPropertyValue('width'));
    }
  }, {
    key: "getDimensionsAll",
    value: function getDimensionsAll(imgs, callback) {
      var _this4 = this;

      var dimensions = {};
      imgs.forEach(function (img, i) {
        // img.onload = () => {
        dimensions[i] = _this4.getDimensions(img);

        if (Object.keys(dimensions).length == imgs.length) {
          _this4.dimensions = dimensions;
          callback(dimensions);
        } // }

      });
    }
  }, {
    key: "getDimensions",
    value: function getDimensions(img) {
      if (img.naturalWidth) {
        var width = img.naturalWidth,
            height = img.naturalHeight;
      } else {
        var helpImg = new Image();
        helpImg.src = img.src;
        var width = helpImg.width,
            height = helpImg.height;
      }

      return {
        width: width,
        height: height
      };
    }
  }, {
    key: "getOrientation",
    value: function getOrientation(img, getDimensions) {
      if (!getDimensions && !getDimensions.real_width) {
        getDimensions = this.getDimensions(img);
      }

      return getDimensions.width / getDimensions.height > 1 ? 'landscape' : 'portrait';
    }
  }]);

  return ImageGrid;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageGrid);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./test/index.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImageGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ImageGrid */ "./src/index.js");

new _ImageGrid__WEBPACK_IMPORTED_MODULE_0__["default"]({
  selector: '#photos'
});
})();

/******/ })()
;