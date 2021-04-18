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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/input-number-range/index.vue?vue&type=template&id=12e9406f&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "e-input-number-range" },
    [
      _c(
        "el-input-number",
        _vm._b(
          {
            attrs: {
              controls: false,
              noZero: _vm.myNoZero,
              value: _vm.myValue[0]
            },
            on: {
              change: function($event) {
                return _vm.handleChange(0, $event)
              }
            }
          },
          "el-input-number",
          _vm.$props,
          false
        )
      ),
      _c("span", { staticClass: "e-input-number-range-join" }, [_vm._v("~")]),
      _c(
        "el-input-number",
        _vm._b(
          {
            attrs: {
              controls: false,
              noZero: _vm.myNoZero,
              value: _vm.myValue[1]
            },
            on: {
              change: function($event) {
                return _vm.handleChange(1, $event)
              }
            }
          },
          "el-input-number",
          _vm.$props,
          false
        )
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/input-number-range/index.vue?vue&type=template&id=12e9406f&

// EXTERNAL MODULE: external "babel-runtime/helpers/toConsumableArray"
var toConsumableArray_ = __webpack_require__(34);
var toConsumableArray_default = /*#__PURE__*/__webpack_require__.n(toConsumableArray_);

// EXTERNAL MODULE: external "babel-runtime/helpers/extends"
var extends_ = __webpack_require__(1);
var extends_default = /*#__PURE__*/__webpack_require__.n(extends_);

// EXTERNAL MODULE: external "element-ui"
var external_element_ui_ = __webpack_require__(3);

// CONCATENATED MODULE: ./src/utils/emitter.js
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
/* harmony default export */ var emitter = ({
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.5@babel-loader/lib!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/input-number-range/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//



/* harmony default export */ var input_number_rangevue_type_script_lang_js_ = ({
  componentName: 'EInputNumberRange',
  mixins: [emitter],
  props: extends_default()({}, external_element_ui_["InputNumber"].props, { // 继承Input的所有属性
    value: {
      type: Array,
      default: function _default() {
        return [0, 0];
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  }),
  computed: {
    myNoZero: function myNoZero() {
      if (this.value[0] !== 0 || this.value[1] !== 0) {
        return false;
      }
      return this.noZero;
    }
  },
  data: function data() {
    var myValue = this.limitComputed(this.value);
    return {
      myValue: myValue
    };
  },

  watch: {
    value: function value(_value) {
      this.myValue = _value;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$el.addEventListener('focusin', function () {
      _this.$$timer && clearTimeout(_this.$$timer);
      _this.$el.classList.add('is-focus');
    }, false);
    this.$el.addEventListener('focusout', function () {
      _this.$$timer && clearTimeout(_this.$$timer);
      _this.$$timer = setTimeout(function () {
        _this.$el.classList.remove('is-focus');
      }, 100);
    }, false);
  },

  methods: {
    limitComputed: function limitComputed(value) {
      if (value[0] > value[1]) {
        value[0] = value[1];
      }
      if (this.min) {
        value[0] < this.min && (value[0] = this.min);
        value[1] < this.min && (value[1] = this.min);
      }
      if (this.max) {
        value[0] > this.max && (value[0] = this.max);
        value[1] > this.max && (value[1] = this.max);
      }
      return value;
    },
    handleChange: function handleChange(index, value) {
      var myValue = [].concat(toConsumableArray_default()(this.value));
      myValue[index] = value;
      if (index === 0 && myValue[0] > myValue[1]) {
        myValue[1] = value;
      }
      if (index === 1 && myValue[0] > myValue[1]) {
        myValue[0] = value;
      }
      myValue = this.limitComputed(myValue);
      this.$emit('change', myValue).$emit('input', myValue);
      if (this.validateEvent) {
        // 触发表单校验
        this.dispatch('ElFormItem', 'el.form.change', [myValue]);
        this.dispatch('ElFormItem', 'el.form.blur', [myValue]);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/input-number-range/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_input_number_rangevue_type_script_lang_js_ = (input_number_rangevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/input-number-range/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_input_number_rangevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/input-number-range/index.vue"
/* harmony default export */ var input_number_range = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("element-ui");

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ })

/******/ });