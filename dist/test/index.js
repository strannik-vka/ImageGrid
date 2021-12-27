/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ (() => {

// Ширина элемента
window.elementWidth = function (element) {
  var computedStyle = getComputedStyle(element, null);
  return parseInt(computedStyle.getPropertyValue('width'));
};

/***/ }),

/***/ "./src/img.js":
/*!********************!*\
  !*** ./src/img.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Img = /*#__PURE__*/function () {
  function Img(obj) {
    _classCallCheck(this, Img);

    if (_typeof(obj) === 'object' && obj != null) {
      this.img = obj.img;
    }
  }

  _createClass(Img, [{
    key: "isLoaded",
    value: function isLoaded() {
      if (!this.img.complete) {
        return false;
      }

      if (typeof this.img.naturalWidth !== "undefined" && this.img.naturalWidth === 0) {
        return false;
      }

      return true;
    }
  }, {
    key: "getDimensionsAll",
    value: function getDimensionsAll(imgs, callback) {
      var _this = this;

      var dimensions = {};

      var getDimensionsCallback = function getDimensionsCallback(i, img) {
        _this.img = img;
        dimensions[i] = _this.getDimensions();

        if (Object.keys(dimensions).length == imgs.length) {
          callback(dimensions);
        }
      };

      imgs.forEach(function (img, i) {
        _this.img = img;

        if (_this.isLoaded()) {
          getDimensionsCallback(i, img);
        } else {
          img.onload = function () {
            getDimensionsCallback(i, img);
          };
        }
      });
    }
  }, {
    key: "getDimensions",
    value: function getDimensions() {
      if (this.img.naturalWidth) {
        var width = this.img.naturalWidth,
            height = this.img.naturalHeight;
      } else {
        var helpImg = new Image();
        helpImg.src = this.img.src;
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
    value: function getOrientation(dimensions) {
      if (!dimensions && !dimensions.real_width) {
        dimensions = this.getDimensions();
      }

      return dimensions.width / dimensions.height > 1 ? 'landscape' : 'portrait';
    }
  }]);

  return Img;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Img);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _img__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./img */ "./src/img.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

__webpack_require__(/*! ./helpers */ "./src/helpers.js");



var ImageGrid = /*#__PURE__*/function () {
  function ImageGrid(obj) {
    var _this = this;

    _classCallCheck(this, ImageGrid);

    this.styles();
    this.dimensions = {};
    this.container = obj.container;
    this.onInit = obj.onInit;
    this.breakpoints = obj.breakpoints;
    this.margin = typeof obj.margin !== 'undefined' ? obj.margin : 8;
    this.columns = typeof obj.columns !== 'undefined' ? obj.columns : 6;
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

      var parents = document.querySelectorAll(this.container),
          ImageClass = new _img__WEBPACK_IMPORTED_MODULE_0__["default"]();
      parents.forEach(function (parent) {
        parent.classList.add('image-grid-parent');
        var imgs = parent.querySelectorAll('img'),
            parentWidth = elementWidth(parent);
        ImageClass.getDimensionsAll(imgs, function (dimensions) {
          _this3.dimensions = dimensions;
          var heightAll = 0;

          for (var i = 0; i < imgs.length; i++) {
            imgs[i].classList.add('image-grid-item');
            var isFirst = (i + 1) % _this3.columns == 1;

            if (isFirst || _this3.columns == 1) {
              // Рамеры фотографий
              var imageSizes = _this3.calcRowSizes(i, parentWidth, _this3.columns),
                  rowImagesCount = Object.keys(imageSizes).length; // Позиции справа


              var rightPositions = _this3.calcRowPositions(imageSizes, rowImagesCount); // Вставка стилей


              for (var q = 0; q < rowImagesCount; q++) {
                imgs[i + q].style.top = heightAll + 'px';
                imgs[i + q].style.right = rightPositions[q + 1] + 'px';
                imgs[i + q].style.width = imageSizes[q + 1].width + 'px';
                imgs[i + q].style.height = imageSizes[q + 1].height + 'px';
              } // Общая высота


              heightAll += imageSizes[1].height + _this3.margin;
            }
          }

          heightAll = heightAll - _this3.margin;
          parent.style.height = heightAll + 'px';
          parent.style.opacity = '1';

          if (typeof _this3.onInit === 'function') {
            _this3.onInit();
          }
        });
      });
    }
  }, {
    key: "calcRowSizes",
    value: function calcRowSizes(index, container_width, columns) {
      var sizes = {};

      for (var i = 0; i < columns; i++) {
        if (typeof this.dimensions[index + i] !== 'undefined') {
          sizes[i + 1] = this.dimensions[index + i];
        }
      }

      var sizesCount = Object.keys(sizes).length;

      if (sizesCount == 1) {
        sizes[1] = {
          width: container_width,
          height: sizes[1].height * container_width / sizes[1].width
        };
      } else {
        container_width = container_width - this.margin * (sizesCount - 1);
        var images_width = sizes[1].width,
            new_widths = {
          1: sizes[1].width
        }; // 1. действие: выровнять картинки

        for (var i = 1; i < sizesCount; i++) {
          var number = i + 1;

          if (sizes[1].height != sizes[number].height) {
            var new_width = sizes[1].height * sizes[number].width / sizes[number].height;
            images_width += new_width;
            new_widths[number] = new_width;
          } else {
            images_width += sizes[number].width;
            new_widths[number] = sizes[number].width;
          }
        } // 2. действие: найти на сколько % измениить картинки, чтобы поместить в контейнер


        if (images_width != container_width) {
          for (var i = 0; i < sizesCount; i++) {
            var number = i + 1; // 1. На сколько процентов занимает ширина картинки

            var percentWidthImage = 100 / (images_width / new_widths[number]); // 2. Итоговая ширина картинки

            var finalWidthImage = container_width / 100 * percentWidthImage; // 3. Итоговая высота

            var finalHeightImage = sizes[number].height * finalWidthImage / sizes[number].width; // 4. Ставим размеры

            sizes[number] = {
              width: finalWidthImage,
              height: finalHeightImage
            };
          }
        }
      }

      return sizes;
    }
  }, {
    key: "calcRowPositions",
    value: function calcRowPositions(imageSizes, rowImagesCount) {
      var positions = {},
          startIndex = rowImagesCount - 1,
          widths = imageSizes[rowImagesCount].width;
      positions[rowImagesCount] = 0;

      for (var i = startIndex; i > 0; i--) {
        positions[i] = widths + this.margin;
        widths += imageSizes[i].width + this.margin;
      }

      return positions;
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./test/index.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImageGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ImageGrid */ "./src/index.js");

new _ImageGrid__WEBPACK_IMPORTED_MODULE_0__["default"]({
  container: '#photos',
  margin: 8,
  columns: 6
});
})();

/******/ })()
;