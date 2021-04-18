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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ 39:
/***/ (function(module, exports) {

module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);
/* harmony import */ var babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var e_ui_lib_mixins_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var e_ui_lib_mixins_popup_child__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);






var createComponent = function createComponent(name, AsyncComponent) {
  return {
    functional: true,
    components: { AsyncComponent: AsyncComponent },
    render: function render(createElement, _ref) {
      var parent = _ref.parent,
          props = _ref.props,
          listeners = _ref.listeners;
      var h = arguments[0];

      var handleEnter = function handleEnter() {
        if (document.ontouchstart === undefined) {
          var node = document.querySelector('.e-popup-layout input');
          node && node.focus && node.focus();
        }
      };
      var query = parent.popupsQuery[name] || props.query;
      var key = query !== undefined ? (typeof query === 'undefined' ? 'undefined' : babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default()(query)) === 'object' ? babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default()(query) : query : undefined;
      return h(
        'transition',
        {
          attrs: { name: 'popup-slide-right' },
          on: {
            'afterEnter': handleEnter
          }
        },
        [parent.popups.includes(name) && h(AsyncComponent, babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default()([{
          attrs: {
            open: parent.popupOpen.indexOf(name) > -1,

            query: query,

            'data-name': name,
            promiseSubmit: props.promiseSubmit
          },
          directives: [{
            name: 'show',
            value: parent.popupOpen.indexOf(name) > -1
          }],
          key: key,
          ref: name, on: {
            'close': function close() {
              if (!listeners.close) {
                parent.popClose();
              }
            },
            'success': function success() {
              if (!listeners.success) {
                if (parent.popupOpen instanceof Array) {
                  if (parent.popupOpen && parent.popupOpen.length < 2) {
                    parent.fetch && parent.fetch(parent.query);
                  }
                } else {
                  parent.fetch && parent.fetch(parent.query);
                }
              }
            }
          }
        }, props, { on: listeners }]))]
      );
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (function (name, Component) {
  return createComponent(name, function () {
    return {
      loading: { template: '<e-popup-loading/>' },
      error: {
        template: '\n        <e-popup-layout type="detail">\n          <div style="line-height:2;font-size:1.4em;text-align: center;position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);color:#ccc">\n            <i class="el-icon-circle-close" style="font-size:3em"></i>\n            <br />\n            \u52A0\u8F7D\u5931\u8D25\n          </div>\n        </e-popup-layout>\n      '
      },
      component: Component().then(function (res) {
        if (res.default) {
          if (!res.default.mixins) {
            res.default.mixins = [];
          }
          if (res.default.__file.indexOf('Form.vue') > -1) {
            res.default.mixins.push(e_ui_lib_mixins_form__WEBPACK_IMPORTED_MODULE_3__["default"]);
          }
          if (res.default.__file.indexOf('Detail.vue') > -1) {
            res.default.mixins.push(e_ui_lib_mixins_popup_child__WEBPACK_IMPORTED_MODULE_4__["default"]);
          }
        }
        return res;
      })
    };
  });
});

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    query: { // 表单弹框时的参数传值
      type: [Number, Object, String, Array]
    },
    open: { // 当前表单是否在打开状态
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      fetching: false
    };
  },
  mounted: function mounted() {
    this.beforeFetch && this.beforeFetch();
  },

  methods: {
    handleBackIn: function handleBackIn() {
      // 关闭前一个弹框后进到当前弹框被触发
      console.log('handleBackIn');
    },
    beforeFetch: function beforeFetch() {
      var _this = this;

      if (this.open && this.fetch) {
        var promise = this.fetch();
        if (promise) {
          this.fetching = true;
          var loading = null;
          if (this.$loading) {
            loading = this.$loading({
              target: this.$el,
              lock: true
            });
          }
          var finish = function finish() {
            loading && loading.close && loading.close();
            _this.fetching = false;
          };
          promise.then(finish).catch(finish);
        }
      }
    },
    handleClose: function handleClose() {
      this.$emit('close');
    }
  }
});

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
// EXTERNAL MODULE: ./src/mixins/popup-child.js
var popup_child = __webpack_require__(5);

// CONCATENATED MODULE: ./src/mixins/form.js





/* harmony default export */ var mixins_form = __webpack_exports__["default"] = ({
  mixins: [popup_child["default"]],
  props: {
    promiseSubmit: { // 外部提交数据
      type: Function
    }
  },
  data: function data() {
    return {
      loading: false,
      validator: validator
    };
  },
  mounted: function mounted() {
    this.createSubmitButton();
  },

  methods: {
    createSubmitButton: function createSubmitButton() {
      var form = this.$el.querySelector('form');
      if (form && !form.querySelector('button[type="submit"]')) {
        var button = document.createElement('button');
        button.type = 'submit';
        button.style.display = 'none';
        form.appendChild(button);
      }
    },
    getFormProps: function getFormProps(props) {
      // 获取el-form表单props
      return assign_default()({
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
    afterSubmit: function afterSubmit() {
      var _this2 = this;

      !this.query && this.resetForm();
      this.$nextTick(function () {
        _this2.$emit('success').$emit('close');
      });
    },
    beforeSubmit: function beforeSubmit() {
      var _this3 = this;

      if (this.promiseSubmit) {
        var promise = this.promiseSubmit(JSON.parse(stringify_default()(this.form)));
        if (promise && promise.then) {
          this.loading = true;
          promise.then(function () {
            _this3.loading = false;
            _this3.afterSubmit();
          }).catch(function () {
            _this3.loading = false;
          });
        }
      } else if (this.submit) {
        var _promise = this.submit();
        if (_promise && _promise.then) {
          _promise.then(function () {
            _this3.afterSubmit();
          });
        }
      }
    },
    validateFail: function validateFail() {
      var _this4 = this;

      // 出现错误滚动到首个错误输入框并聚焦
      this.$nextTick(function () {
        var node = _this4.$el.querySelector('.is-error');
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
    resetForm: function resetForm() {
      // 重置表单
      this.$refs.form && this.$refs.form.resetFields();
    }
  }
});

/***/ })

/******/ });