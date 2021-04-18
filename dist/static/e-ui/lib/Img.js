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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxNDA0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIj4KIDxkZWZzPgogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyIvPgogPC9kZWZzPgogPGc+CiAgPHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIxNDA2IiB3aWR0aD0iMTAyNiIgeT0iLTEiIHg9Ii0xIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBmaWxsPSIjQjNCM0IzIiBkPSJtNzc2LDMyOG0tNzIsMGE3Miw3MiAwIDEgMCAxNDQsMGE3Miw3MiAwIDEgMCAtMTQ0LDB6Ii8+CiAgPHBhdGggZmlsbD0iI0IzQjNCMyIgZD0ibTk5OS45MDQsMTE2LjYwOGEzMiwzMiAwIDAgMCAtMjEuOTUyLC0xMC45MTJsLTQ1Ni4xOTIsLTMxLjkwNGEzMS41NTIsMzEuNTUyIDAgMCAwIC0yNy4yLDExLjkwNGwtOTIuMTkyLDExNC44NDhhMzIsMzIgMCAwIDAgMC42NzIsNDAuODk2bDE0Ni4xNDQsMTY5Ljk1MmwtMTQ3LjQ1NiwxOTQuNjU2bDM2LjQ4LC0xNzMuMzc2YTMyLDMyIDAgMCAwIC0xMS4xMzYsLTMxLjQyNGwtMTkxLjQ1NiwtMTU1Ljc0NGw3OS42MTYsLTEyNS42OTZhMzIsMzIgMCAwIDAgLTI5LjI4LC00OS4wMjRsLTI0MC4xOTIsMTYuNzY4YTMyLDMyIDAgMCAwIC0yOS42OTYsMzQuMTc2bDU1LjgwOCw3OTguMDE2YTMyLjA2NCwzMi4wNjQgMCAwIDAgMzQuMzA0LDI5LjY5NmwxNzYuNTEyLC0xMy4xODRjMTcuNjMyLC0xLjMxMiAzMC44NDgsLTE2LjY3MiAyOS41MDQsLTM0LjI3MnMtMTYuNTc2LC0zMS4wNCAtMzQuMzA0LC0yOS41MzZsLTE0NC40NDgsMTAuNzg0bC02LjQzMiwtOTIuNTEybDEyNS4zMTIsLTEyLjU3NmEzMiwzMiAwIDAgMCAyOC42NzIsLTM1LjA0YTMyLjE2LDMyLjE2IDAgMCAwIC0zNS4wNCwtMjguNjcybC0xMjMuMzkyLDEyLjQxNmwtNDAuNDE2LC01NzcuNjY0bDE0NS4xNTIsLTEwLjE0NGwtNjAuOTYsOTYuMjI0YTMyLDMyIDAgMCAwIDYuODQ4LDQxLjk1MmwxOTguNCwxNjEuMzQ0bC01OC43NTIsMjc5LjI5NmEzMC45MTIsMzAuOTEyIDAgMCAwIDAuNzM2LDE0Ljc1MmEzMS42OCwzMS42OCAwIDAgMCAxLjQwOCwxMS4wNGw1MS41MiwxNTQuNTZhMzEuOTY4LDMxLjk2OCAwIDAgMCAyNy40NTYsMjEuNzZsNTIzLjEwNCw0Ny41NTJhMzIuMDY0LDMyLjA2NCAwIDAgMCAzNC44NDgsLTI5LjYzMmw1NS43NzYsLTc5OC4wNDhhMzIuMDY0LDMyLjA2NCAwIDAgMCAtNy43NzYsLTIzLjIzMnptLTk4LjkxMiw2MzAuODQ4bC00MTIuNTc2LC0zOS42NDhhMzEuNTIsMzEuNTIgMCAwIDAgLTM0LjkxMiwyOC43NjhhMzIsMzIgMCAwIDAgMjguOCwzNC45MTJsNDE0LjI0LDM5LjgwOGwtNi4yNzIsODkuNTM2bC00NjkuNzI4LC00Mi43MmwtMzkuNTg0LC0xMTguNzJsMjM0LjgxNiwtMzEwLjAxNmEzMS45MzYsMzEuOTM2IDAgMCAwIC0xLjI0OCwtNDAuMTkybC0xNDUuNjMyLC0xNjkuMzQ0bDY1LjA4OCwtODEuMDU2bDQwNy41ODQsMjguNDhsLTQwLjU3Niw1ODAuMTkyeiIvPgogIDx0ZXh0IHhtbDpzcGFjZT0icHJlc2VydmUiIHRleHQtYW5jaG9yPSJzdGFydCIgZm9udC1zaXplPSIyNTAiIHk9IjEzMzguNDIxODc1IiB4PSIxMi45NTMxMjUiIGZpbGw9IiNCM0IzQjMiPuWKoOi9veWksei0pTwvdGV4dD4KIDwvZz4KPC9zdmc+"

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxNDA0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIj4KIDxkZWZzPgogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyIvPgogPC9kZWZzPgogPGc+CiAgPHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIxNDA2IiB3aWR0aD0iMTAyNiIgeT0iLTEiIHg9Ii0xIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBmaWxsPSIjQjNCM0IzIiBkPSJtNjkxLjgsNDgzLjljNzUuMiwwIDEzNi40LC02MS4yIDEzNi40LC0xMzYuNHMtNjEuMiwtMTM2LjQgLTEzNi40LC0xMzYuNHMtMTM2LjQsNjEuMiAtMTM2LjQsMTM2LjRzNjEuMiwxMzYuNCAxMzYuNCwxMzYuNHptMCwtMjIxLjZjNDcsMCA4NS4yLDM4LjIgODUuMiw4NS4ycy0zOC4yLDg1LjIgLTg1LjIsODUuMnMtODUuMiwtMzguMiAtODUuMiwtODUuMnMzOC4zLC04NS4yIDg1LjIsLTg1LjJ6Ii8+CiAgPHBhdGggZmlsbD0iI0IzQjNCMyIgZD0ibTg4Ny43LDYxLjhsLTc1MS4yLDBjLTc1LjIsMCAtMTM2LjQsNjEuMiAtMTM2LjQsMTM2LjRsMCw2MjcuOGMwLDc1LjIgNjEuMiwxMzYuNCAxMzYuNCwxMzYuNGw3NTEuMiwwYzcyLjQsMCAxMzEuNywtNTYuOCAxMzYsLTEyOC4xbDAuNCwwLjRsMCwtNjM2LjVjMCwtNzUuMiAtNjEuMiwtMTM2LjQgLTEzNi40LC0xMzYuNHptLTgzNi40LDEzNi40YzAsLTQ3IDM4LjIsLTg1LjIgODUuMiwtODUuMmw3NTEuMiwwYzQ3LDAgODUuMiwzOC4yIDg1LjIsODUuMmwwLDUxMi45bC03Ni44LC03Ni44bC0yMjguNiwyMTYuNGwtMjQuMSwtMjQuM2wtNDA2LjUsLTQxNC40bC0xODUuNiwxODUuNmwwLC0zOTkuNHptMCw2MjcuOGwwLC0xNTEuOWwxODUuNCwtMTg1LjRsMzY5LjksMzczLjJsMjMuNCwyMy45bC0wLjIsMC4ybDE4LjYsMTguNmw2LjYsNi43bC01MTguNSwwYy00NywtMC4xIC04NS4yLC0zOC4zIC04NS4yLC04NS4zem05MjEuNiwwYzAsNDcgLTM4LjIsODUuMiAtODUuMiw4NS4ybC0xNjAuMSwwbC0yMy44LC0yNGwxOTEuMiwtMTc3LjZsNzgsNzhsMCwzOC40bC0wLjEsMHoiLz4KICA8dGV4dCB4bWw6c3BhY2U9InByZXNlcnZlIiB0ZXh0LWFuY2hvcj0ic3RhcnQiIGZvbnQtc2l6ZT0iMjUwIiB5PSIxMzM5LjQyMTg3NSIgeD0iMTIiIGZpbGw9IiNCM0IzQjMiPuaaguaXoOWbvueJhzwvdGV4dD4KIDwvZz4KPC9zdmc+"

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxNDA0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIj4KIDxkZWZzPgogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyIvPgogPC9kZWZzPgogPGc+CiAgPHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIxNDA2IiB3aWR0aD0iMTAyNiIgeT0iLTEiIHg9Ii0xIi8+CiA8L2c+CiA8Zz4KICA8cGF0aCBmaWxsPSIjQjNCM0IzIiBkPSJtNjkxLjgsNDgzLjljNzUuMiwwIDEzNi40LC02MS4yIDEzNi40LC0xMzYuNHMtNjEuMiwtMTM2LjQgLTEzNi40LC0xMzYuNHMtMTM2LjQsNjEuMiAtMTM2LjQsMTM2LjRzNjEuMiwxMzYuNCAxMzYuNCwxMzYuNHptMCwtMjIxLjZjNDcsMCA4NS4yLDM4LjIgODUuMiw4NS4ycy0zOC4yLDg1LjIgLTg1LjIsODUuMnMtODUuMiwtMzguMiAtODUuMiwtODUuMnMzOC4zLC04NS4yIDg1LjIsLTg1LjJ6Ii8+CiAgPHBhdGggZmlsbD0iI0IzQjNCMyIgZD0ibTg4Ny43LDYxLjhsLTc1MS4yLDBjLTc1LjIsMCAtMTM2LjQsNjEuMiAtMTM2LjQsMTM2LjRsMCw2MjcuOGMwLDc1LjIgNjEuMiwxMzYuNCAxMzYuNCwxMzYuNGw3NTEuMiwwYzcyLjQsMCAxMzEuNywtNTYuOCAxMzYsLTEyOC4xbDAuNCwwLjRsMCwtNjM2LjVjMCwtNzUuMiAtNjEuMiwtMTM2LjQgLTEzNi40LC0xMzYuNHptLTgzNi40LDEzNi40YzAsLTQ3IDM4LjIsLTg1LjIgODUuMiwtODUuMmw3NTEuMiwwYzQ3LDAgODUuMiwzOC4yIDg1LjIsODUuMmwwLDUxMi45bC03Ni44LC03Ni44bC0yMjguNiwyMTYuNGwtMjQuMSwtMjQuM2wtNDA2LjUsLTQxNC40bC0xODUuNiwxODUuNmwwLC0zOTkuNHptMCw2MjcuOGwwLC0xNTEuOWwxODUuNCwtMTg1LjRsMzY5LjksMzczLjJsMjMuNCwyMy45bC0wLjIsMC4ybDE4LjYsMTguNmw2LjYsNi43bC01MTguNSwwYy00NywtMC4xIC04NS4yLC0zOC4zIC04NS4yLC04NS4zem05MjEuNiwwYzAsNDcgLTM4LjIsODUuMiAtODUuMiw4NS4ybC0xNjAuMSwwbC0yMy44LC0yNGwxOTEuMiwtMTc3LjZsNzgsNzhsMCwzOC40bC0wLjEsMHoiLz4KICA8dGV4dCB4bWw6c3BhY2U9InByZXNlcnZlIiB0ZXh0LWFuY2hvcj0ic3RhcnQiIGZvbnQtc2l6ZT0iMjUwIiBpZD0ic3ZnXzMiIHk9IjEzNTEuMjE4NzUiIHg9IjEzOC45NjA5MzgiIGZpbGw9IiNCM0IzQjMiPuWKoOi9veS4rTwvdGV4dD4KIDwvZz4KPC9zdmc+"

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/img/index.vue?vue&type=template&id=505afca6&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("img", _vm._g(_vm._b({}, "img", _vm.$attrs, false), _vm.$listeners))
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/img/index.vue?vue&type=template&id=505afca6&

// EXTERNAL MODULE: ./src/components/img/error.svg
var error = __webpack_require__(18);
var error_default = /*#__PURE__*/__webpack_require__.n(error);

// EXTERNAL MODULE: ./src/components/img/placeholder.svg
var placeholder = __webpack_require__(19);
var placeholder_default = /*#__PURE__*/__webpack_require__.n(placeholder);

// EXTERNAL MODULE: ./src/components/img/loading.svg
var img_loading = __webpack_require__(20);
var loading_default = /*#__PURE__*/__webpack_require__.n(img_loading);

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.5@babel-loader/lib!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/img/index.vue?vue&type=script&lang=js&
//
//
//
//




var transparent = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
/* harmony default export */ var imgvue_type_script_lang_js_ = ({
  componentName: 'EImg',
  props: {
    src: {
      type: String
    }
  },
  watch: {
    src: function src() {
      this.$nextTick(this.loading);
    }
  },
  mounted: function mounted() {
    this.loading();
  },

  methods: {
    loading: function loading() {
      var _this = this;

      if (this.src) {
        this.$el.src = transparent;
        this.setBackground(loading_default.a);
        var image = new Image();
        image.onload = function () {
          _this.$el.src = _this.src;
          _this.$el.style.background = '';
        };
        image.onerror = function () {
          _this.$el.src = transparent;
          _this.setBackground(error_default.a);
        };
        image.src = this.src;
      } else {
        this.$el.src = transparent;
        this.setBackground(placeholder_default.a);
      }
    },
    setBackground: function setBackground(type) {
      var size = Math.min(this.$el.offsetWidth, this.$el.offsetHeight) > 40 ? '40px' : 'contain';
      this.$el.style.background = 'url(' + type + ') no-repeat center';
      this.$el.style.backgroundSize = size;
    }
  }
});
// CONCATENATED MODULE: ./src/components/img/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_imgvue_type_script_lang_js_ = (imgvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/img/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_imgvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/img/index.vue"
/* harmony default export */ var img = __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });