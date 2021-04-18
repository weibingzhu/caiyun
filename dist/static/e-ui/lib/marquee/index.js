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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/marquee/Marquee.vue?vue&type=template&id=00835a96&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "e-marquee", style: { height: _vm.height + "px" } },
    [
      _c(
        "ul",
        {
          ref: "box",
          staticClass: "e-marquee-box",
          style: {
            transform: "translate3d(0," + _vm.currenTranslateY + "px,0)",
            transition: "transform " + (_vm.noAnimate ? 0 : _vm.duration) + "ms"
          }
        },
        [_vm._t("default")],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/marquee/Marquee.vue?vue&type=template&id=00835a96&

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.5@babel-loader/lib!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/marquee/Marquee.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//

/* harmony default export */ var Marqueevue_type_script_lang_js_ = ({
  componentName: 'EMarquee',
  props: {
    interval: {
      type: Number,
      default: 2000
    },
    duration: {
      type: Number,
      default: 300
    },
    direction: {
      type: String,
      default: 'up'
    },
    itemHeight: Number
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  },
  data: function data() {
    return {
      currenTranslateY: 0,
      height: '',
      length: 0,
      currentIndex: 0,
      noAnimate: false
    };
  },

  methods: {
    destroy: function destroy() {
      this.timer && clearInterval(this.timer);
    },
    init: function init() {
      this.destroy();
      if (this.cloneNode) {
        this.$refs.box.removeChild(this.cloneNode);
      }
      this.cloneNode = null;
      var firstItem = this.$refs.box.firstElementChild;
      if (!firstItem) {
        return false;
      }
      this.length = this.$refs.box.children.length;
      this.height = this.itemHeight || firstItem.offsetHeight;
      if (this.direction === 'up') {
        this.cloneNode = firstItem.cloneNode(true);
        this.$refs.box.appendChild(this.cloneNode);
      } else {
        this.cloneNode = this.$refs.box.lastElementChild.cloneNode(true);
        this.$refs.box.insertBefore(this.cloneNode, firstItem);
      }
      return true;
    },
    start: function start() {
      var _this = this;

      if (this.direction === 'down') this.go(false);
      this.timer = setInterval(function () {
        if (_this.direction === 'up') {
          _this.currentIndex += 1;
          _this.currenTranslateY = -_this.currentIndex * _this.height;
        } else {
          _this.currentIndex -= 1;
          _this.currenTranslateY = -(_this.currentIndex + 1) * _this.height;
        }
        if (_this.currentIndex === _this.length) {
          setTimeout(function () {
            _this.go(true);
          }, _this.duration);
        } else if (_this.currentIndex === -1) {
          setTimeout(function () {
            _this.go(false);
          }, _this.duration);
        } else {
          _this.noAnimate = false;
        }
      }, this.interval + this.duration);
    },
    go: function go(toFirst) {
      this.noAnimate = true;
      if (toFirst) {
        this.currentIndex = 0;
        this.currenTranslateY = 0;
      } else {
        this.currentIndex = this.length - 1;
        this.currenTranslateY = -(this.currentIndex + 1) * this.height;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/marquee/Marquee.vue?vue&type=script&lang=js&
 /* harmony default export */ var marquee_Marqueevue_type_script_lang_js_ = (Marqueevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/marquee/Marquee.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  marquee_Marqueevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/marquee/Marquee.vue"
/* harmony default export */ var Marquee = (component.exports);
// CONCATENATED MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/marquee/MarqueeItem.vue?vue&type=template&id=232dcc30&
var MarqueeItemvue_type_template_id_232dcc30_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "e-marquee-item" }, [_vm._t("default")], 2)
}
var MarqueeItemvue_type_template_id_232dcc30_staticRenderFns = []
MarqueeItemvue_type_template_id_232dcc30_render._withStripped = true


// CONCATENATED MODULE: ./src/components/marquee/MarqueeItem.vue?vue&type=template&id=232dcc30&

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.5@babel-loader/lib!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/marquee/MarqueeItem.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var MarqueeItemvue_type_script_lang_js_ = ({
  componentName: 'EMarqueeItem',
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.$parent.destroy();
      _this.$parent.init();
      _this.$parent.start();
    });
  }
});
// CONCATENATED MODULE: ./src/components/marquee/MarqueeItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var marquee_MarqueeItemvue_type_script_lang_js_ = (MarqueeItemvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/marquee/MarqueeItem.vue





/* normalize component */

var MarqueeItem_component = Object(componentNormalizer["a" /* default */])(
  marquee_MarqueeItemvue_type_script_lang_js_,
  MarqueeItemvue_type_template_id_232dcc30_render,
  MarqueeItemvue_type_template_id_232dcc30_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var MarqueeItem_api; }
MarqueeItem_component.options.__file = "src/components/marquee/MarqueeItem.vue"
/* harmony default export */ var MarqueeItem = (MarqueeItem_component.exports);
// CONCATENATED MODULE: ./src/components/marquee/index.js
/* concated harmony reexport Marquee */__webpack_require__.d(__webpack_exports__, "Marquee", function() { return Marquee; });
/* concated harmony reexport MarqueeItem */__webpack_require__.d(__webpack_exports__, "MarqueeItem", function() { return MarqueeItem; });





/***/ })

/******/ });