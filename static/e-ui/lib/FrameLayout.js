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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
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

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/frame-layout/index.vue?vue&type=template&id=6957dd9d&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: ["e-frame-layout", "e-frame-layout--theme-" + _vm.theme],
      style: { backgroundColor: _vm.theme == "dark" ? _vm.backgroundColor : "" }
    },
    [
      _c(
        "div",
        {
          staticClass: "e-frame-layout--aside",
          class: { "is-collapse": _vm.isCollapse },
          style: _vm.asideStyle
        },
        [
          _vm.$slots["logo"] || _vm.$scopedSlots["logo"]
            ? _c(
                "div",
                {
                  staticClass: "e-frame-layout--logo",
                  style: _vm.logoStyle,
                  attrs: { title: "收起/展开左侧菜单" },
                  on: {
                    click: function($event) {
                      _vm.isCollapse = !_vm.isCollapse
                    }
                  }
                },
                [_vm._t("logo", null, null, { isCollapse: _vm.isCollapse })],
                2
              )
            : _vm._e(),
          _c(
            "div",
            { staticClass: "e-frame-layout--aside-inner scroller" },
            [
              _vm.$slots["aside"]
                ? _vm._t("aside", null, null, { isCollapse: _vm.isCollapse })
                : _vm._e(),
              _c(
                "el-menu",
                _vm._b(
                  {
                    staticClass: "e-frame-layout--menus",
                    attrs: {
                      collapse: _vm.isCollapse,
                      router: true,
                      "default-active": _vm.$route.path
                    }
                  },
                  "el-menu",
                  _vm._menuProps,
                  false
                ),
                [
                  _vm._l(_vm._menus, function(item, index) {
                    return [
                      item.options
                        ? _c(
                            "el-submenu",
                            {
                              key: index,
                              attrs: {
                                index: item.index || item.title,
                                "popper-class": "e-frame-layout--submenu"
                              }
                            },
                            [
                              _c(
                                "template",
                                { slot: "title" },
                                [
                                  item.icon
                                    ? [
                                        item.icon.indexOf("</i>") > -1
                                          ? _c("div", {
                                              staticStyle: {
                                                display: "inline"
                                              },
                                              domProps: {
                                                innerHTML: _vm._s(item.icon)
                                              }
                                            })
                                          : _c("i", {
                                              class: _vm.iconClass,
                                              domProps: {
                                                innerHTML: _vm._s(item.icon)
                                              }
                                            })
                                      ]
                                    : _c("i"),
                                  _c(
                                    "span",
                                    { attrs: { slot: "title" }, slot: "title" },
                                    [_vm._v(_vm._s(item.title))]
                                  )
                                ],
                                2
                              ),
                              _vm._l(item.options, function(child) {
                                return _c(
                                  "el-menu-item",
                                  {
                                    key: child.index,
                                    attrs: {
                                      route: child.route,
                                      index: child.index
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                " +
                                        _vm._s(child.title) +
                                        "\n            "
                                    )
                                  ]
                                )
                              })
                            ],
                            2
                          )
                        : _c(
                            "el-menu-item",
                            {
                              key: item.index,
                              staticClass: "el-submenu__title",
                              attrs: { route: item.route, index: item.index }
                            },
                            [
                              item.icon
                                ? [
                                    item.icon.indexOf("</i>") > -1
                                      ? _c("div", {
                                          staticStyle: { display: "inline" },
                                          domProps: {
                                            innerHTML: _vm._s(item.icon)
                                          }
                                        })
                                      : _c("i", {
                                          class: _vm.iconClass,
                                          domProps: {
                                            innerHTML: _vm._s(item.icon)
                                          }
                                        })
                                  ]
                                : _c("i"),
                              _c("span", [_vm._v(_vm._s(item.title))])
                            ],
                            2
                          )
                    ]
                  })
                ],
                2
              )
            ],
            2
          )
        ]
      ),
      _c(
        "div",
        { staticClass: "e-frame-layout--content" },
        [
          !_vm.$slots["header"]
            ? _c(
                "el-row",
                {
                  staticClass: "e-frame-layout--header",
                  style: _vm.headerStyle,
                  attrs: { type: "flex", align: "middle" }
                },
                [
                  _c(
                    "el-col",
                    [
                      _vm.$slots["title"]
                        ? _vm._t("title")
                        : _c("div", { staticClass: "e-frame-layout--title" }, [
                            _vm._v(_vm._s(_vm.title))
                          ]),
                      _vm.breadcrumb
                        ? _c("div", {
                            key: _vm.$route.path,
                            staticClass: "e-frame-layout--breadcrumb"
                          })
                        : _vm._e()
                    ],
                    2
                  ),
                  _vm._t("nav")
                ],
                2
              )
            : _c(
                "div",
                {
                  staticClass: "e-frame-layout--header",
                  style: _vm.headerStyle
                },
                [_vm._t("header")],
                2
              ),
          _c(
            "div",
            { staticClass: "e-frame-layout--body scroller" },
            [_vm._t("default")],
            2
          )
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/frame-layout/index.vue?vue&type=template&id=6957dd9d&

// EXTERNAL MODULE: external "babel-runtime/helpers/extends"
var extends_ = __webpack_require__(1);
var extends_default = /*#__PURE__*/__webpack_require__.n(extends_);

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.5@babel-loader/lib!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/frame-layout/index.vue?vue&type=script&lang=js&

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
//
//
//
//
//
//
//
//
//

/* harmony default export */ var frame_layoutvue_type_script_lang_js_ = ({
  componentName: 'EFrameLayout',
  props: {
    title: {
      type: String
    },
    menus: {
      type: Array
    },
    menuProps: {
      type: Object
    },
    iconClass: {
      default: 'iconfont'
    },
    theme: {
      type: String,
      default: 'default'
    },
    backgroundColor: {
      type: String
    },
    breadcrumb: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      isCollapse: document.ontouchstart !== undefined
    };
  },

  computed: {
    _menus: function _menus() {
      return this.menus.map(function (item) {
        if (item.route) {
          item.index = item.route.path ? item.route.path : item.route;
        }
        if (item.options) {
          item.options = item.options.map(function (item2) {
            if (item2.route) {
              item2.index = item2.route.path ? item2.route.path : item2.route;
            }
            return item2;
          });
        }
        return item;
      });
    },
    _menuProps: function _menuProps() {
      var result = this.menuProps || {};
      if (this.theme === 'dark') {
        result = extends_default()({
          textColor: '#f5f5f5',
          activeTextColor: '#fff'
        }, this.menuProps, {
          backgroundColor: this.backgroundColor
        });
      }
      return result;
    },
    logoStyle: function logoStyle() {
      if (this.theme === 'dark-header') {
        return this.headerStyle;
      }
      return {};
    },
    asideStyle: function asideStyle() {
      return {
        color: this._menuProps.textColor
      };
    },
    headerStyle: function headerStyle() {
      if (this.theme.indexOf('dark') > -1) {
        return {
          color: '#fff',
          backgroundColor: this.backgroundColor
        };
      }
      return {};
    }
  },
  mounted: function mounted() {
    if (window.top !== window) {
      document.body.classList.add('is-iframe');
    }
  }
});
// CONCATENATED MODULE: ./src/components/frame-layout/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_frame_layoutvue_type_script_lang_js_ = (frame_layoutvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/frame-layout/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_frame_layoutvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/frame-layout/index.vue"
/* harmony default export */ var frame_layout = __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });