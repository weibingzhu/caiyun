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
/******/ 	return __webpack_require__(__webpack_require__.s = 64);
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

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/signin/index.vue?vue&type=template&id=3d155c96&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "e-signin" },
    [
      _c(
        "el-form",
        {
          ref: "form",
          attrs: { model: _vm.form },
          nativeOn: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.handleSubmit($event)
            }
          }
        },
        [
          !_vm.$slots.title
            ? _c("legend", [_vm._v(_vm._s(_vm.title))])
            : _vm._t("title"),
          _vm._t("prepend", null, null, { form: _vm.form }),
          _c(
            "el-form-item",
            {
              attrs: {
                prop: "account",
                rules: [{ required: true, message: _vm.placeholder }]
              }
            },
            [
              _c(
                "el-input",
                _vm._b(
                  {
                    attrs: { placeholder: _vm.placeholder },
                    on: { change: _vm.handleChange },
                    model: {
                      value: _vm.form.account,
                      callback: function($$v) {
                        _vm.$set(
                          _vm.form,
                          "account",
                          typeof $$v === "string" ? $$v.trim() : $$v
                        )
                      },
                      expression: "form.account"
                    }
                  },
                  "el-input",
                  _vm.accountProps,
                  false
                ),
                [
                  _vm.accountType.length == 1 &&
                  _vm.accountType.indexOf("email") > -1
                    ? _c(
                        "e-icon",
                        {
                          staticClass: "el-input__icon",
                          attrs: { slot: "prefix" },
                          slot: "prefix"
                        },
                        [_vm._v("")]
                      )
                    : _vm.accountType.length == 1 &&
                      _vm.accountType.indexOf("mobile") > -1
                    ? _c(
                        "e-icon",
                        {
                          staticClass: "el-input__icon",
                          attrs: { slot: "prefix" },
                          slot: "prefix"
                        },
                        [_vm._v("")]
                      )
                    : _c(
                        "e-icon",
                        {
                          staticClass: "el-input__icon",
                          attrs: { slot: "prefix" },
                          slot: "prefix"
                        },
                        [_vm._v("")]
                      )
                ],
                1
              )
            ],
            1
          ),
          _vm.passwordProps
            ? _c(
                "el-form-item",
                {
                  attrs: {
                    prop: "password",
                    rules: [
                      { required: true, message: _vm.passwordProps.placeholder }
                    ]
                  }
                },
                [
                  _c(
                    "e-password",
                    _vm._b(
                      {
                        on: { change: _vm.handleChange },
                        model: {
                          value: _vm.form.password,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.form,
                              "password",
                              typeof $$v === "string" ? $$v.trim() : $$v
                            )
                          },
                          expression: "form.password"
                        }
                      },
                      "e-password",
                      _vm.passwordProps,
                      false
                    )
                  )
                ],
                1
              )
            : _vm._e(),
          _vm.smsCodeProps
            ? _c(
                "el-form-item",
                {
                  attrs: {
                    prop: "smsCode",
                    rules: [
                      { required: true, message: _vm.smsCodeProps.placeholder }
                    ]
                  }
                },
                [
                  _c(
                    "e-sms-code",
                    _vm._b(
                      {
                        attrs: { to: _vm.form.account },
                        model: {
                          value: _vm.form.smsCode,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.form,
                              "smsCode",
                              typeof $$v === "string" ? $$v.trim() : $$v
                            )
                          },
                          expression: "form.smsCode"
                        }
                      },
                      "e-sms-code",
                      _vm.smsCodeProps,
                      false
                    )
                  )
                ],
                1
              )
            : _vm._e(),
          _vm.codeProps
            ? _c(
                "el-form-item",
                {
                  attrs: {
                    prop: "code",
                    rules: [
                      { required: true, message: _vm.codeProps.placeholder }
                    ]
                  }
                },
                [
                  _c(
                    "e-img-code",
                    _vm._b(
                      {
                        ref: "imgCode",
                        model: {
                          value: _vm.form.code,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.form,
                              "code",
                              typeof $$v === "string" ? $$v.trim() : $$v
                            )
                          },
                          expression: "form.code"
                        }
                      },
                      "e-img-code",
                      _vm.codeProps,
                      false
                    )
                  )
                ],
                1
              )
            : _vm._e(),
          _vm.errorMessage
            ? _c(
                "div",
                { staticClass: "el-form-item__error e-signin-error" },
                [
                  _c("el-alert", {
                    attrs: {
                      title: _vm.errorMessage,
                      type: "error",
                      "show-icon": ""
                    }
                  })
                ],
                1
              )
            : _vm._e(),
          _vm.$slots.argument
            ? _c(
                "el-form-item",
                { staticClass: "is-argument", attrs: { prop: "argument" } },
                [
                  _c(
                    "el-checkbox",
                    {
                      model: {
                        value: _vm.form.argument,
                        callback: function($$v) {
                          _vm.$set(_vm.form, "argument", $$v)
                        },
                        expression: "form.argument"
                      }
                    },
                    [_c("small", [_vm._v(_vm._s(_vm.accpetText))])]
                  ),
                  _vm._t("argument")
                ],
                2
              )
            : _vm._e(),
          _vm._t("append", null, null, { form: _vm.form }),
          _c(
            "el-button",
            {
              attrs: {
                type: "primary",
                disabled: !_vm.form.argument,
                loading: _vm.loading,
                "native-type": "submit"
              }
            },
            [_vm._v(_vm._s(_vm.submitText))]
          )
        ],
        2
      ),
      _vm.$slots.links
        ? _c("div", { staticClass: "e-signin-links" }, [_vm._t("links")], 2)
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/components/signin/index.vue?vue&type=template&id=3d155c96&

// EXTERNAL MODULE: external "babel-runtime/core-js/json/stringify"
var stringify_ = __webpack_require__(4);
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify_);

// EXTERNAL MODULE: external "babel-runtime/helpers/extends"
var extends_ = __webpack_require__(1);
var extends_default = /*#__PURE__*/__webpack_require__.n(extends_);

// EXTERNAL MODULE: ./src/mixins/form.js + 1 modules
var mixins_form = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/_babel-loader@7.1.5@babel-loader/lib!./node_modules/_vue-loader@15.7.2@vue-loader/lib??vue-loader-options!./src/components/signin/index.vue?vue&type=script&lang=js&


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


/* harmony default export */ var signinvue_type_script_lang_js_ = ({
  mixins: [mixins_form["default"]],
  props: {
    title: {
      type: String,
      default: '用户登录'
    },
    accountType: {
      type: Array,
      default: function _default() {
        return ['mobile', 'email'];
      }
    },
    accountProps: {
      type: Object
    },
    passwordProps: {
      type: Object,
      default: function _default() {
        return {
          placeholder: '请输入密码'
        };
      }
    },
    codeProps: {
      type: Object,
      default: function _default() {
        return {
          placeholder: '请输入验证码'
        };
      }
    },
    smsCodeProps: {
      type: Object
    },
    submitText: {
      type: String,
      default: '立即登录'
    },
    action: {
      type: String
    },
    customForm: {
      type: Object
    },
    onSubmit: {
      type: Function
    },
    accpetText: {
      type: String,
      default: '我已阅读并接受'
    }
  },
  data: function data() {
    return {
      loading: false,
      errorMessage: '',
      form: extends_default()({}, this.customForm, {
        account: '',
        password: '',
        code: '',
        smsCode: '',
        argument: true
      })
    };
  },

  computed: {
    placeholder: function placeholder() {
      if (this.accountProps && this.accountProps.placeholder) {
        return this.accountProps.placeholder;
      }
      var tmp = {
        mobile: '手机号',
        email: '邮箱'
      };
      var names = this.accountType.map(function (item) {
        return tmp[item];
      });
      return '\u8BF7\u8F93\u5165' + names.join('/');
    }
  },
  methods: {
    handleChange: function handleChange() {
      this.errorMessage = '';
    },
    submit: function submit() {
      var _this = this;

      if (this.action) {
        this.loading = true;
        this.$axios({
          url: this.action,
          method: 'POST',
          data: JSON.parse(stringify_default()(this.form))
        }).then(function (res) {
          _this.loading = false;
          _this.$emit('success', res);
        }).catch(function (res) {
          _this.loading = false;
          _this.$emit('error', res);
          _this.errorMessage = res.msg;
          _this.$refs.imgCode && _this.$refs.imgCode.refresh();
        });
      } else if (this.onSubmit) {
        this.loading = true;
        this.onSubmit(JSON.parse(stringify_default()(this.form)), this).then(function (res) {
          _this.loading = false;
          _this.$emit('success', res);
        }).catch(function (res) {
          _this.loading = false;
          _this.$emit('error', res);
          _this.errorMessage = res.msg;
          _this.$refs.imgCode && _this.$refs.imgCode.refresh();
        });
      } else {
        this.$emit('success');
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/signin/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_signinvue_type_script_lang_js_ = (signinvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.7.2@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/signin/index.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_signinvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/signin/index.vue"
/* harmony default export */ var signin = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "babel-runtime/core-js/json/stringify"
var stringify_ = __webpack_require__(4);
var stringify_default = /*#__PURE__*/__webpack_require__.n(stringify_);

// EXTERNAL MODULE: external "babel-runtime/core-js/object/assign"
var assign_ = __webpack_require__(2);
var assign_default = /*#__PURE__*/__webpack_require__.n(assign_);

// CONCATENATED MODULE: ./src/utils/validator.js
var pattern = {
  email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  mobile: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
  phone: /^0\d{2,3}-?\d{7,8}$/, // 座机
  password: /^[A-Za-z0-9]{8,20}$/,
  gt0: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/, // 大于0
  money: /^[0-9]+(\.[0-9]{1,2})?$/,
  ID: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
};

/* harmony default export */ var validator = ({
  pattern: pattern,
  rule: {
    email: {
      pattern: pattern.email,
      message: '邮箱格式不正确'
    },
    phone: {
      pattern: pattern.phone,
      message: '电话号码格式不正确'
    },
    mobile: {
      pattern: pattern.mobile,
      message: '手机号码格式不正确'
    },
    gt0: {
      pattern: pattern.gt0,
      message: '请输入大于0的数字'
    },
    money: {
      pattern: pattern.money,
      message: '请输入有效的金额数字'
    },
    ID: {
      pattern: pattern.ID,
      message: '请输入有效的身份证号码'
    },
    password: {
      pattern: pattern.password,
      message: '密码格式不正确'
    }
  }
});
// CONCATENATED MODULE: ./src/mixins/form.js




/* harmony default export */ var mixins_form = __webpack_exports__["default"] = ({
  data: function data() {
    return {
      loading: false,
      validator: validator
    };
  },

  methods: {
    getFormProps: function getFormProps(props) {
      // 获取el-form表单props
      return assign_default()({
        ref: 'form',
        model: this.form,
        labelWidth: '6.66rem',
        novalidate: 'novalidate',
        class: 'form-default',
        size: 'small'
      }, props);
    },
    validate: function validate(cb) {
      var _this = this;

      // 表单校验
      if (this.$refs.form && this.$refs.form.validate) {
        this.$refs.form.validate(function (valid) {
          if (valid) {
            if (cb) {
              cb();
            } else {
              _this.beforeSubmit && _this.beforeSubmit();
            }
          } else {
            _this.validateFail();
            return false;
          }
        });
      }
    },
    beforeSubmit: function beforeSubmit() {
      var _this2 = this;

      if (this.promiseSubmit) {
        var promise = this.promiseSubmit(JSON.parse(stringify_default()(this.form)));
        if (promise && promise.then) {
          this.loading = true;
          promise.then(function () {
            _this2.loading = false;
            _this2.afterSubmit && _this2.afterSubmit();
          }).catch(function () {
            _this2.loading = false;
          });
        }
      } else if (this.submit) {
        var _promise = this.submit();
        if (_promise && _promise.then) {
          this.loading = true;
          _promise.then(function () {
            _this2.loading = false;
            _this2.afterSubmit && _this2.afterSubmit();
          }).catch(function () {
            _this2.loading = false;
          });
        }
      }
    },
    validateFail: function validateFail() {
      var _this3 = this;

      // 出现错误滚动到首个错误输入框并聚焦
      this.$nextTick(function () {
        var node = _this3.$el.querySelector('.is-error');
        if (node) {
          if (node.scrollIntoView) {
            var rect = node.getBoundingClientRect();
            if (rect.top < 0) {
              node.scrollIntoView(true);
            }
          }
          var inputs = node.querySelectorAll('input,textarea');
          inputs && inputs.length === 1 && inputs[0].focus();
        }
      });
    },
    submit: function submit() {// 提交数据
    },
    handleSubmit: function handleSubmit() {
      // 提交表单事件
      this.validate();
    },
    handleReset: function handleReset() {
      this.resetForm();
    },
    resetForm: function resetForm() {
      // 重置表单
      this.$refs.form && this.$refs.form.resetFields();
    },
    handleDateRangeInput: function handleDateRangeInput(value) {
      var _this4 = this;

      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['start_time', 'end_time'];

      if (value && value[0]) {
        this.form[keys[0]] = value[0];
        this.form[keys[1]] = value[1];
      } else {
        keys.forEach(function (item) {
          _this4.form[item] = null;
        });
      }
    }
  }
});

/***/ })

/******/ });