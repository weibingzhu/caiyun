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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
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
/******/ ]);