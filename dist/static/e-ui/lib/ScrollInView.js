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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/scroll-in-view/index.vue?vue&type=template&id=3a42fba0&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "e-scroll-in-view--wrapper" }, [
    _c(
      "div",
      {
        class: [
          "e-scroll-in-view",
          "e-scroll-in-view--effect-" + _vm.effect,
          "to-direction-" + _vm.direction,
          { "is-active": _vm.inView }
        ],
        style: "transition: " + _vm.transition
      },
      [_vm._t("default", null, null, { inView: _vm.inView })],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/scroll-in-view/index.vue?vue&type=template&id=3a42fba0&

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.5@babel-loader/lib!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/scroll-in-view/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var scroll_in_viewvue_type_script_lang_js_ = ({
  componentName: 'EScrollInView',
  props: {
    disabled: {
      type: Boolean
    },
    effect: {
      type: String,
      default: 'fadein'
    },
    duration: {
      type: String,
      default: '1.3s'
    },
    delay: {
      type: String,
      default: '0.2s'
    },
    direction: {
      type: String,
      default: 'top'
    },
    isWindowScroll: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      inView: false
    };
  },

  computed: {
    transition: function transition() {
      if (this.effect === 'fadein') {
        return 'transform ' + this.duration + ' ease ' + this.delay + ', opacity ' + this.duration + ' ease ' + this.delay;
      }
      return 'transform ' + this.duration + ' ease ' + this.delay + ', opacity ' + this.duration + ' ease ' + this.delay;
    }
  },
  mounted: function mounted() {
    if (!this.disabled) {
      if (this.inViewPort()) {
        this.inView = true;
      } else if (this.isWindowScroll) {
        this.$$scrollNode = window;
        if (this.$$scrollNode) {
          this.$$scrollNode.addEventListener('scroll', this.handleScroll);
        }
      } else if (this.$el.offsetParent) {
        this.$$scrollNode = this.getScrollNode(this.$el.offsetParent);
        if (this.$$scrollNode) {
          this.$$scrollNode.addEventListener('scroll', this.handleScroll);
        }
      }
    }
  },

  methods: {
    handleScroll: function handleScroll() {
      var _this = this;

      this.$$timer && clearTimeout(this.$$timer);
      this.$$timer = setTimeout(function () {
        if (_this.inViewPort()) {
          _this.inView = true;
          _this.$$scrollNode.removeEventListener('scroll', _this.handleScroll);
        }
      }, 32);
    },
    inViewPort: function inViewPort() {
      if (this.$el.offsetWidth === 0 && this.$el.offsetHeight === 0) {
        return false;
      }
      var rect = this.$el.getBoundingClientRect();
      return rect.top < window.innerHeight;
    },
    getScrollNode: function getScrollNode(node) {
      var n = node;
      var closest = function closest() {
        var styleObject = window.getComputedStyle(n);
        if (!(['scroll', 'auto'].indexOf(styleObject['overflow']) > -1 || ['scroll', 'auto'].indexOf(styleObject['overflow-y']) > -1 || styleObject['-webkit-overflow-scrolling'] === 'touch' || styleObject['overflow-scrolling'] === 'touch')) {
          n = n.offsetParent;
          if (n === document.body) {
            n = window;
          } else {
            n && closest();
          }
        }
      };
      if (document.body === n) {
        n = window;
      } else {
        closest();
      }
      return n;
    }
  }
});
// CONCATENATED MODULE: ./src/components/scroll-in-view/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_scroll_in_viewvue_type_script_lang_js_ = (scroll_in_viewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/scroll-in-view/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_scroll_in_viewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/scroll-in-view/index.vue"
/* harmony default export */ var scroll_in_view = __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });