module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ({

/***/ 35:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),

/***/ 47:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/get");

/***/ }),

/***/ 49:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("vue-quill-editor");

/***/ }),

/***/ 50:
/***/ (function(module, exports) {

module.exports = require("quill-image-resize-module");

/***/ }),

/***/ 51:
/***/ (function(module, exports) {

module.exports = require("quill-image-drop-module");

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
/* harmony import */ var babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(45);
/* harmony import */ var babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
/* harmony import */ var babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47);
/* harmony import */ var babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
/* harmony import */ var babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(49);
/* harmony import */ var babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(54);
/* harmony import */ var quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_core_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(55);
/* harmony import */ var quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_snow_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var quill_dist_quill_bubble_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(56);
/* harmony import */ var quill_dist_quill_bubble_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(quill_dist_quill_bubble_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(35);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5);
/* harmony import */ var vue_quill_editor__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quillEditor", function() { return vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["quillEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Quill", function() { return vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"]; });

/* harmony import */ var quill_image_resize_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(50);
/* harmony import */ var quill_image_resize_module__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(quill_image_resize_module__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var quill_image_drop_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(51);
/* harmony import */ var quill_image_drop_module__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(quill_image_drop_module__WEBPACK_IMPORTED_MODULE_12__);














vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].register('modules/imageResize', quill_image_resize_module__WEBPACK_IMPORTED_MODULE_11___default.a);
vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].register('modules/ImageDrop', quill_image_drop_module__WEBPACK_IMPORTED_MODULE_12__["ImageDrop"]);

var BaseImageFormat = vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].import('formats/image');
var ImageFormatAttributesList = ['alt', 'height', 'width', 'style'];

var ImageFormat = function (_BaseImageFormat) {
  babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ImageFormat, _BaseImageFormat);

  function ImageFormat() {
    babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ImageFormat);

    return babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, (ImageFormat.__proto__ || babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default()(ImageFormat)).apply(this, arguments));
  }

  babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ImageFormat, [{
    key: 'format',
    value: function format(name, value) {
      if (ImageFormatAttributesList.indexOf(name) > -1) {
        if (value) {
          this.domNode.setAttribute(name, value);
        } else {
          this.domNode.removeAttribute(name);
        }
      } else {
        babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(ImageFormat.prototype.__proto__ || babel_runtime_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default()(ImageFormat.prototype), 'format', this).call(this, name, value);
      }
    }
  }], [{
    key: 'formats',
    value: function formats(domNode) {
      return ImageFormatAttributesList.reduce(function (formats, attribute) {
        if (domNode.hasAttribute(attribute)) {
          formats[attribute] = domNode.getAttribute(attribute);
        }
        return formats;
      }, {});
    }
  }]);

  return ImageFormat;
}(BaseImageFormat);

vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].register(ImageFormat, true);
var SizeStyle = vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].import('attributors/style/size');
SizeStyle.whitelist = ['small', false, 'large', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px'];
vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].register(SizeStyle, true);
var FontStyle = vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].import('attributors/style/font');
FontStyle.whitelist = ['微软雅黑', '宋体', '黑体', '楷体', '隶书', 'arial', 'impact'];
vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].register(FontStyle, true);
var AlignStyle = vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].import('attributors/style/align');
vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].register(AlignStyle, true);
var DirectionStyle = vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].import('attributors/style/direction');
vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["Quill"].register(DirectionStyle, true);
vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["quillEditor"].props.options = {
  type: Object,
  default: function _default() {
    return {
      placeholder: '请输入内容',
      modules: {
        imageResize: {
          // modules: ['Resize', 'DisplaySize']
        },
        toolbar: [['bold', 'italic', 'underline', 'strike'], ['blockquote', 'code-block'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], [{ 'script': 'sub' }, { 'script': 'super' }], [{ 'indent': '-1' }, { 'indent': '+1' }], [{ 'direction': 'rtl' }], [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'size': SizeStyle.whitelist }], [{ 'font': FontStyle.whitelist }], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], ['link', 'image', 'video']]
      }
    };
  }
};
if (!vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["quillEditor"].mixins) {
  vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["quillEditor"].mixins = [];
}
vue_quill_editor__WEBPACK_IMPORTED_MODULE_10__["quillEditor"].mixins.push({
  mounted: function mounted() {
    var _this2 = this;

    setTimeout(function () {
      var quill = _this2.quill;
      var el = _this2.$el.querySelector('.ql-image');
      new vue__WEBPACK_IMPORTED_MODULE_9___default.a({ // eslint-disable-line
        el: el,
        template: '\n          <el-upload\n            list-type="picture"\n            multiple\n            style="float:left;width:auto;height:auto;margin-right: 0;"\n            @change="handleChange($event)">\n            <button style="float:none" type="button" class="ql-image">\n              <svg viewBox="0 0 18 18">\n                <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>\n                <circle class="ql-fill" cx="6" cy="7" r="1"></circle>\n                <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>\n              </svg>\n            </button>\n          </el-upload>\n        ',
        methods: {
          handleChange: function handleChange(event) {
            quill.insertEmbed(quill.getSelection().index, 'image', event);
          }
        }
      });
    }, 1000);
  }
});


/***/ }),

/***/ 54:
/***/ (function(module, exports) {

module.exports = require("quill/dist/quill.core.css");

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

module.exports = require("quill/dist/quill.snow.css");

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

module.exports = require("quill/dist/quill.bubble.css");

/***/ })

/******/ });