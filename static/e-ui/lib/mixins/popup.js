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
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ({

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    popupName: {
      type: String
    },
    popupManager: {
      type: [Object]
    },
    query: { // ??????????????????????????????
      type: [Number, Object, String, Array]
    }
  },
  data: function data() {
    return {
      fetching: false
    };
  },

  watch: {
    fetching: function fetching(value) {
      // this.toggleLoading(value)
    }
  },
  mounted: function mounted() {
    this.$emit('mounted', this.$el);
    this.beforeFetch && this.beforeFetch();
  },

  methods: {
    closeDrawerLoading: function closeDrawerLoading() {
      var mask = this.$el.closest('.e-drawer').querySelector('.e-drawer--mask');
      mask.style.opacity = 0;
      setTimeout(function () {
        mask.style.display = 'none';
      }, 310);
    },
    handleBackIn: function handleBackIn() {
      // ???????????????????????????????????????????????????
      console.log('handleBackIn');
    },
    toggleLoading: function toggleLoading(value) {
      var drawerNode = this.$el.closest('.e-drawer');
      if (drawerNode) {
        if (value) {
          this.$loadingInstance = this.$loading({ // ?????????loading??????
            target: drawerNode,
            fullscreen: false
          });
        } else {
          if (this.$loadingInstance) {
            // ??????loading??????
            this.$loadingInstance.close();
            this.$loadingInstance = null;
          }
        }
      }
    },
    beforeFetch: function beforeFetch() {
      var _this = this;

      if (this.fetch) {
        var promise = this.fetch();
        if (promise) {
          this.fetching = true;
          var finish = function finish() {
            _this.fetching = false;
            _this.closeDrawerLoading();
          };
          promise.then(finish).catch(finish);
        } else {
          this.closeDrawerLoading();
        }
      } else {
        this.closeDrawerLoading();
      }
    },
    handleClose: function handleClose() {
      this.$emit('close');
    }
  }
});

/***/ })

/******/ });