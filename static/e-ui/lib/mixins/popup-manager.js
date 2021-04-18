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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ({

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      popupOpen: [], // 当前打开的右侧弹框
      popups: [], // 存储加载的右侧弹框
      popupsQuery: {} // 用于传递右侧弹框表单参数对象集合（编辑表单）
    };
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    if (this.popupOpen) {
      this.popupOpen = [];
      this.$nextTick(next);
    } else {
      next();
    }
  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    if (this.popupOpen) {
      this.popupOpen = [];
      this.$nextTick(next);
    } else {
      next();
    }
  },

  methods: {
    handleClosePopup: function handleClosePopup() {
      this.popupOpen = [];
    },
    pushOpen: function pushOpen(name, query) {
      var _this = this;

      this.popups.indexOf(name) === -1 && this.popups.push(name);
      this.$nextTick(function () {
        _this.popupOpen.indexOf(name) === -1 && _this.popupOpen.push(name);
        if (query !== undefined) {
          _this.popupsQuery[name] = query;
        }
      });
    },
    pushReloadOpen: function pushReloadOpen(name, query) {
      this.pushOpen(name, query);
    },
    popClose: function popClose(name) {
      if (name) {
        if (this.popupOpen instanceof Array && this.popupOpen.length > 0) {
          this.popupOpen = this.popupOpen.filter(function (item) {
            return item !== name;
          });
        } else {
          this.popupOpen = [];
        }
      } else {
        if (this.popupOpen instanceof Array && this.popupOpen.length > 0) {
          this.popupOpen.pop();
          var currentPopupName = this.popupOpen[this.popupOpen.length - 1];
          var $vue = this.$refs['import-component-' + currentPopupName];
          $vue && $vue.handleBackIn && $vue.handleBackIn();
        } else {
          this.popupOpen = [];
        }
      }
    }
  }
});

/***/ })

/******/ });