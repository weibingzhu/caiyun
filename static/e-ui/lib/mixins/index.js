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
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),

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

/***/ }),

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
    query: { // 表单弹框时的参数传值
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
      // 关闭前一个弹框后进到当前弹框被触发
      console.log('handleBackIn');
    },
    toggleLoading: function toggleLoading(value) {
      var drawerNode = this.$el.closest('.e-drawer');
      if (drawerNode) {
        if (value) {
          this.$loadingInstance = this.$loading({ // 实例化loading对象
            target: drawerNode,
            fullscreen: false
          });
        } else {
          if (this.$loadingInstance) {
            // 结束loading效果
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

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);
/* harmony import */ var babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    history: { // 列表分页是否产生历史记录
      type: Boolean,
      default: true
    },
    loadingText: {
      type: String,
      default: '努力加载中'
    },
    defaultQuery: {
      type: [Object]
    }
  },
  data: function data() {
    return {
      searchMode: 'default',
      highVisible: false,
      multipleSelectionAll: [], // 全部选中的数据
      multipleSelection: [], // 当前页选中的数据
      pageData: {
        data: [],
        count: 0
      },
      tableBodyHeight: 200
    };
  },

  watch: {
    pageData: function pageData(value) {
      var _this = this;

      // 监听pageData更新列表选中的数据
      if (this.multipleSelectionProp && value && value.data && value.data.filter) {
        var multipleSelectionId = this.multipleSelectionAll.map(function (item) {
          return item[_this.multipleSelectionProp];
        });
        var multipleSelection = value.data.filter(function (item) {
          return multipleSelectionId.indexOf(item[_this.multipleSelectionProp]) > -1;
        });
        this.$$disabledSelectionChange = true;
        this.$nextTick(function () {
          multipleSelection.forEach(function (item) {
            _this.$refs.table && _this.$refs.table.toggleRowSelection(item, true);
          });
        });
        setTimeout(function () {
          _this.$$disabledSelectionChange = false;
        }, 500);
      }
    }
  },
  mounted: function mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize, false);
    !this.history && this.closeDrawerLoading();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    handleHighToggle: function handleHighToggle(visible) {
      this.highVisible = typeof visible === 'boolean' ? visible : !this.highVisible;
    },
    handleTab: function handleTab() {
      var query = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()(this.query, { page: 1 });
      this.$router.replace({
        path: this.$route.path,
        query: query
      });
    },
    handleDateRangeInput: function handleDateRangeInput(value) {
      var _this2 = this;

      var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['start_time', 'end_time'];
      var queryKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'query';

      if (value && value[0]) {
        this[queryKey][keys[0]] = value[0];
        this[queryKey][keys[1]] = value[1];
      } else {
        keys.forEach(function (item) {
          _this2[queryKey][item] = null;
        });
      }
    },
    getIndexColumnProps: function getIndexColumnProps() {
      return {
        label: '序号',
        type: 'index',
        className: 'el-table-column--index',
        index: this.indexMethod
      };
    },
    indexMethod: function indexMethod(index) {
      var result = (Number(this.query.page) - 1) * Number(this.query.rows) + (index + 1);
      if (result > 999) {
        return '999+';
      }
      return result;
    },
    handleClearSelection: function handleClearSelection() {
      this.$refs.table && this.$refs.table.clearSelection && this.$refs.table.clearSelection();
      this.multipleSelection = this.multipleSelectionAll = [];
    },
    handleResize: function handleResize() {
      var _this3 = this;

      this.$nextTick(function () {
        var node = _this3.$el.querySelector('.e-page-list-layout--table');
        node && (_this3.tableBodyHeight = node.offsetHeight + '');
      });
    },
    initial: function initial() {
      var _this4 = this;

      // 初始化
      this.$paginationProps = {}; // 分页props
      this.$nextTick(function () {
        _this4.beforeFetch(_this4.searchMode === 'high' ? _this4.highQuery : _this4.query); // 第二个表示是初始时调用
      });
    },
    getQuery: function getQuery(query) {
      var _this5 = this;

      // 获取请求参数
      if (this.defaultQuery && !this.popupName) {
        babel_runtime_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default()(this.defaultQuery).forEach(function (key) {
          if (!query[key]) {
            query[key] = _this5.defaultQuery[key];
          }
        });
      }
      if (!this.$initQuery && query) {
        // 保存初始化查询对象
        this.$initQuery = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, query);
      }
      return babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({ page: 1, rows: 20 }, this.$route.query, query);
    },
    getHighQuery: function getHighQuery(query) {
      if (!this.$initHighQuery && query) {
        // 保存初始化查询对象
        this.$initHighQuery = babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, query);
      }
      return babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({ page: 1, rows: 20 }, query);
    },
    getPaginationProps: function getPaginationProps() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 获取分页默认props
      if (data.count !== undefined) {
        data.total = data.count;
      }
      if (data && data.total && this.query) {
        var query = this.query;
        var rows = query.rows ? Number(query.rows) : 20;
        var page = query.page ? Number(query.page) : 1;
        var layout = 'total, prev, pager, next, sizes, jumper';
        var pagerCount = 7;
        if (process.browser && this.$store && this.$store.state && this.$store.state.isMobile) {
          layout = 'total, pager, sizes, jumper';
          pagerCount = 5;
        }
        this.$paginationProps = {
          pagerCount: pagerCount,
          layout: layout,
          background: true,
          pageSize: rows,
          currentPage: page,
          total: data.total,
          pageSizes: [10, 15, 20, 30, 40, 50, 100]
        };
        return this.$paginationProps;
      } else {
        return babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({}, this.$paginationProps, {
          style: {
            display: 'none'
          }
        });
      }
    },
    getTableProps: function getTableProps(props) {
      // 获取表格默认props
      return babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({
        ref: 'table',
        class: 'table-primary',
        height: this.tableBodyHeight,
        size: 'small'
      }, props);
    },
    getTableListeners: function getTableListeners() {
      return {
        'sort-change': this.handleSortChange,
        'selection-change': this.handleSelectionChange
      };
    },
    handleCurrentChange: function handleCurrentChange(value) {
      // 修改页数事件
      if (value != this.query.page && !this.$sizeChangeTimer) {
        //eslint-disable-line
        var query = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, this.query, { page: value });
        this.updateRoute && this.updateRoute(query);
        var node = this.$el.querySelector('.el-pagination');
        if (node) {
          // 阻止频繁点击
          node.style.pointerEvents = 'none';
          setTimeout(function () {
            node.style.pointerEvents = '';
          }, 1000);
        }
      }
    },
    handleSizeChange: function handleSizeChange(value) {
      var _this6 = this;

      // 修改分页条数事件
      this.$sizeChangeTimer = true; // 避免页数修改后当前页Change事件重复触发
      setTimeout(function () {
        _this6.$sizeChangeTimer = false;
      }, 500);
      var query = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, this.searchMode === 'high' ? this.highQuery : this.query, { page: 1, rows: value });
      this.updateRoute && this.updateRoute(query);
    },
    updateRoute: function updateRoute(query) {
      // 更新URL地址
      if (this.history) {
        /*
        for (let name in _query) { // 清除 值为null|undefined
          if (_query[name] === null || _query[name] === undefined || _query[name] === '') {
            delete _query[name]
          }
        }
        */
        this.$router.push({ path: this.$route.path, query: query });
      } else {
        if (this.searchMode === 'high') {
          this.highQuery = query;
        } else {
          this.query = query;
        }
        this.beforeFetch(query);
      }
    },
    handleSubmit: function handleSubmit() {
      var _this7 = this;

      // 表单提交事件
      this.$refs.queryForm.validate(function (valid) {
        if (valid) {
          _this7.query.page = 1;
          _this7.updateRoute(_this7.query);
        }
      });
    },
    handleHighSubmit: function handleHighSubmit() {
      var _this8 = this;

      this.$refs.highQueryForm.validate(function (valid) {
        if (valid) {
          _this8.searchMode = 'high';
          _this8.handleHighToggle();
          _this8.highQuery.page = 1;
          _this8.updateRoute(_this8.highQuery);
        }
      });
    },
    closeDrawerLoading: function closeDrawerLoading() {
      var mask = this.$el.closest('.e-drawer').querySelector('.e-drawer--mask');
      mask.style.opacity = 0;
      setTimeout(function () {
        mask.style.display = 'none';
      }, 310);
    },
    openLoading: function openLoading() {
      // 开启加载效果
      if (!this.history) {
        var node = this.$el.querySelector('.e-page-list-layout--table');
        if (node) {
          this.closeLoading();
          node.style.position = 'relative';
          this.$loadingInstance = this.$loading({ // 实例化loading对象
            target: node,
            fullscreen: false,
            text: this.loadingText
          });
        }
      }
    },
    closeLoading: function closeLoading() {
      // 结束加载效果
      if (!this.history && this.$loadingInstance) {
        // 结束loading效果
        this.$loadingInstance.close();
        this.$loadingInstance = null;
      }
    },
    getFormProps: function getFormProps(props) {
      // 获取默认表单props
      return babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({
        class: 'form-search',
        novalidate: 'novalidate',
        inline: true,
        size: 'small',
        ref: 'queryForm',
        model: this.query
      }, props);
    },
    getHighFormProps: function getHighFormProps(props) {
      // 获取默认表单props
      return babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({
        novalidate: 'novalidate',
        size: 'small',
        ref: 'highQueryForm',
        model: this.highQuery,
        labelWidth: '7rem'
      }, props);
    },
    getColProps: function getColProps(props) {
      return babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1___default()({
        xl: 4,
        lg: 6,
        md: 8,
        sm: 12
      }, props);
    },
    handleReset: function handleReset() {
      this.query = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({ page: 1, rows: 20 }, this.$initQuery);
      this.$refs.queryForm && this.$refs.queryForm.resetFields && this.$refs.queryForm.resetFields();
    },
    handleHighReset: function handleHighReset() {
      this.highQuery = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({ page: 1, rows: 20 }, this.$initHighQuery);
      this.$refs.highQueryForm && this.$refs.highQueryForm.resetFields && this.$refs.highQueryForm.resetFields();
    },
    handleHighCancel: function handleHighCancel() {
      this.searchMode = 'default';
      this.highVisible = false;
    },
    beforeFetch: function beforeFetch(query) {
      // 获取数据前
      this.$toFetch = true; // 是否去获取数据行为
      if (this.fetch) {
        var promise = this.fetch(query);
        if (promise && !this.history) {
          this.$nextTick(this.openLoading);
          promise.then(this.closeLoading).catch(this.closeLoading);
        }
      }
    },
    handleSortChange: function handleSortChange() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log(args);
    },
    handleSelectionChange: function handleSelectionChange(value) {
      var _this9 = this;

      var oldValue = JSON.parse(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(this.multipleSelection));
      if (this.multipleSelectionProp && !this.$$disabledSelectionChange) {
        var multipleSelectionAll = JSON.parse(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(this.multipleSelectionAll));
        var multipleSelectionId = multipleSelectionAll.map(function (item) {
          return item[_this9.multipleSelectionProp];
        });
        if (value.length > oldValue.length) {
          value.forEach(function (item) {
            if (multipleSelectionId.indexOf(item[_this9.multipleSelectionProp]) === -1) {
              multipleSelectionAll.push(item);
            }
          });
          this.multipleSelectionAll = multipleSelectionAll;
        } else if (value.length < oldValue.length) {
          var valueId = value.map(function (item) {
            return item[_this9.multipleSelectionProp];
          });
          var deleteId = [];
          oldValue.forEach(function (item) {
            var prop = item[_this9.multipleSelectionProp];
            if (valueId.indexOf(prop) === -1) {
              deleteId.push(prop);
            }
          });
          this.multipleSelectionAll = this.multipleSelectionAll.filter(function (item) {
            return deleteId.indexOf(item[_this9.multipleSelectionProp]) === -1;
          });
        }
      }
      this.multipleSelection = value;
    },
    fetch: function fetch(query) {} // 需要被重写， 初始化会执行，路由参数变化也会执行

  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    var _this10 = this;

    // 监听route地址变化
    if (to.path === from.path) {
      if (this.searchMode === 'high') {
        this.highQuery = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, this.highQuery, to.query, { page: to.query.page || 1, rows: to.query.rows || 20 });
      } else {
        this.query = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, this.$initQuery, to.query, { page: to.query.page || 1, rows: to.query.rows || 20 });
      }
      this.$routeUpdateTimer && clearTimeout(this.$routeUpdateTimer);
      this.$routeUpdateTimer = setTimeout(function () {
        _this10.beforeFetch(_this10.searchMode === 'high' ? _this10.highQuery : _this10.query);
      }, 100);
    }
    next();
  },
  beforeMount: function beforeMount() {
    this.initial();
  },
  updated: function updated() {
    this.handleResize();
    if (!this.history) {
      this.$beforeUpdateTimer = null;
    }
    if (this.$toFetch && this.$store && this.$store.state && !this.$store.state.loading) {
      this.$toFetch = false;
      var node = this.$el.querySelector('.el-table__body-wrapper') || this.$el.querySelector('.scroller');
      node && (node.scrollTop = 0);
    }
    var position = this.$el.querySelector('.page-list-refresh-position');
    if (position) {
      if (position.getBoundingClientRect().top < 0) {
        position.scrollIntoView && position.scrollIntoView();
      }
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(42)))

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 44:
/***/ (function(module, exports) {

module.exports = require("babel-helper-vue-jsx-merge-props");

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "babel-runtime/helpers/extends"
var extends_ = __webpack_require__(1);
var extends_default = /*#__PURE__*/__webpack_require__.n(extends_);

// EXTERNAL MODULE: external "babel-helper-vue-jsx-merge-props"
var external_babel_helper_vue_jsx_merge_props_ = __webpack_require__(44);
var external_babel_helper_vue_jsx_merge_props_default = /*#__PURE__*/__webpack_require__.n(external_babel_helper_vue_jsx_merge_props_);

// EXTERNAL MODULE: external "babel-runtime/core-js/promise"
var promise_ = __webpack_require__(33);
var promise_default = /*#__PURE__*/__webpack_require__.n(promise_);

// EXTERNAL MODULE: ./src/mixins/form.js + 1 modules
var mixins_form = __webpack_require__(7);

// EXTERNAL MODULE: ./src/mixins/popup-manager.js
var popup_manager = __webpack_require__(36);

// CONCATENATED MODULE: ./src/mixins/popup-form.js
/* harmony default export */ var popup_form = ({
  props: {
    promiseSubmit: { // 外部提交数据
      type: Function
    }
  },
  watch: {
    loading: function loading(value) {
      this.toggleLoading(value);
    }
  },
  mounted: function mounted() {
    this.createSubmitButton();
  },

  methods: {
    createSubmitButton: function createSubmitButton() {
      var form = this.$el.querySelector('form');
      if (!form && /form/i.test(this.$el.nodeName)) {
        form = this.$el;
      }
      if (form && !form.querySelector('button[type="submit"]')) {
        var button = document.createElement('button');
        button.type = 'submit';
        button.style.display = 'none';
        form.appendChild(button);
      }
    },
    afterSubmit: function afterSubmit() {
      var _this = this;

      !this.query && this.resetForm();
      this.$nextTick(function () {
        _this.$emit('success').$emit('close');
      });
    }
  }
});
// EXTERNAL MODULE: ./src/mixins/popup.js
var popup = __webpack_require__(37);

// EXTERNAL MODULE: ./src/mixins/pageList.js
var pageList = __webpack_require__(39);

// CONCATENATED MODULE: ./src/mixins/index.js









popup_manager["default"].$ = function (name, importFunction, _render) {
  var AsyncComponent = function AsyncComponent() {
    return {
      component: new promise_default.a(function (resolve, reject) {
        importFunction().then(function (res) {
          var isForm = false;
          if (res.default) {
            if (!res.default.mixins) {
              res.default.mixins = [];
            }
            if (res.default.mixins.some(function (item) {
              return item.props.history;
            })) {
              res.default.mixins.push({
                props: {
                  popupName: {
                    type: String
                  },
                  popupManager: {
                    type: [Object]
                  },
                  history: { // 列表分页是否产生历史记录
                    type: Boolean,
                    default: false
                  },
                  defaultQuery: {
                    type: [Object]
                  }
                }
              });
            } else {
              res.default.mixins.push(popup["default"]);
              if (res.default.methods && res.default.methods.submit) {
                res.default.mixins.push(mixins_form["default"]);
                res.default.mixins.push(popup_form);
                isForm = true;
              }
            }
          }
          var ImportComponent = res.default;
          resolve({
            functional: true,
            render: function render(createElement, context) {
              var h = arguments[0];
              var parent = context.parent,
                  props = context.props,
                  listeners = context.listeners;

              var handleSubmit = function handleSubmit(e) {
                var $form = parent.$refs['import-component-' + name];
                $form && $form.handleSubmit && $form.handleSubmit();
              };
              var handleReset = function handleReset(e) {
                var $form = parent.$refs['import-component-' + name];
                $form && $form.handleSubmit && $form.handleReset();
              };
              var handleCancel = function handleCancel() {
                var $drawer = parent.$refs['drawer-' + name];
                $drawer && $drawer.closeDrawer && $drawer.closeDrawer();
              };
              var handleSuccess = function handleSuccess() {
                if (!listeners.success) {
                  if (parent.popupOpen instanceof Array) {
                    if (parent.popupOpen && parent.popupOpen.length < 2) {
                      parent.fetch && parent.fetch(parent.query);
                    }
                  } else {
                    parent.fetch && parent.fetch(parent.query);
                  }
                }
              };
              var handleMounted = function handleMounted(el) {
                var modelNode = el.closest('.el-drawer__container');
                if (modelNode) {
                  modelNode.title = '双击可以快速关闭弹框';
                  modelNode.querySelector('.e-drawer').title = '';
                  modelNode.ondblclick = function (event) {
                    if (modelNode === event.target) {
                      handleCancel();
                    }
                  };
                }
              };
              return h(
                'div',
                { 'class': 'e-drawer--layout' },
                [h(
                  'div',
                  { 'class': 'e-drawer--body scroller' },
                  [h(ImportComponent, external_babel_helper_vue_jsx_merge_props_default()([{
                    ref: 'import-component-' + name,
                    attrs: { popupManager: parent,
                      popupName: name
                    }
                  }, { attrs: props }, {
                    attrs: {
                      defaultQuery: props.query
                    },
                    on: {
                      'success': handleSuccess,
                      'close': handleCancel,
                      'mounted': handleMounted
                    }
                  }]))]
                ), _render && _render.footer && _render.footer ? h(
                  'div',
                  { 'class': 'e-drawer--footer' },
                  [_render.footer(createElement, context)]
                ) : isForm && h(
                  'div',
                  { 'class': 'e-drawer--footer' },
                  [h(
                    'el-button',
                    {
                      attrs: {
                        type: 'primary',
                        size: 'small',
                        nativeType: 'button'
                      },
                      on: {
                        'click': handleSubmit
                      }
                    },
                    [props.confirmText || '确定']
                  ), h(
                    'el-button',
                    {
                      attrs: {
                        size: 'small',
                        nativeType: 'button'
                      },
                      on: {
                        'click': handleReset
                      }
                    },
                    [props.resetText || '重置']
                  ), h(
                    'el-button',
                    {
                      attrs: {
                        size: 'small',
                        nativeType: 'button'
                      },
                      on: {
                        'click': handleCancel
                      }
                    },
                    [props.cancelText || '取消']
                  )]
                )]
              );
            }
          });
        }).catch(function () {
          resolve({
            functional: true,
            template: '\n            <div class="e-drawer--error">\n              <i class="el-icon-circle-close"></i>\n              <br />\n              \u52A0\u8F7D\u5931\u8D25\n            </div>\n          '
          });
        });
      })
    };
  };
  return {
    functional: true,
    render: function render(createElement, context) {
      var h = arguments[0];
      var parent = context.parent,
          props = context.props;

      if (parent.popups && parent.popups.indexOf(name) > -1) {
        var drawer = props.drawer,
            resize = props.resize,
            title = props.title,
            size = props.size;

        var _drawer = extends_default()({
          title: title,
          appendToBody: false,
          size: size || 'default',
          destroyOnClose: name !== 'create',
          wrapperClosable: false
        }, drawer);
        var visible = parent.popupOpen.indexOf(name) > -1;
        var classnames = ['e-drawer'];
        var sizes = ['mini', 'small', 'default', 'large'];
        if (_drawer.size && sizes.indexOf(_drawer.size) > -1) {
          classnames.push('e-drawer--' + _drawer.size);
        }
        _drawer.customClass && classnames.push(_drawer.customClass);
        var _resize = resize || resize === undefined;
        var handleMouseDown = function handleMouseDown(event) {
          event.preventDefault();
          var pageX = event.pageX;
          var node = event.target.closest('.e-drawer');
          var width = node.offsetWidth;
          document.onmousemove = function (e) {
            e.preventDefault();
            node.style.width = width + (pageX - e.pageX) + 'px';
          };
          document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
          };
        };
        return h(
          'div',
          {
            directives: [{
              name: 'dom-portal',
              value: true
            }]
          },
          [h(
            'el-drawer',
            external_babel_helper_vue_jsx_merge_props_default()([{
              attrs: {
                vLoading: true,
                visible: visible
              },
              ref: 'drawer-' + name,
              on: {
                'close': parent.popClose
              }
            }, { attrs: _drawer }, {
              attrs: {
                customClass: classnames.join(' ') }
            }]),
            [_render && _render.title && h(
              'template',
              { slot: 'title' },
              [_render.title(createElement, context)]
            ), h(AsyncComponent, {
              attrs: {
                query: parent.popupsQuery[name],
                promiseSubmit: props.promiseSubmit
              }
            }), h(
              'div',
              { 'class': 'el-loading-mask e-drawer--mask' },
              [h(
                'div',
                { 'class': 'el-loading-spinner' },
                [h(
                  'svg',
                  {
                    attrs: { viewBox: '25 25 50 50' },
                    'class': 'circular' },
                  [h('circle', {
                    attrs: { cx: '50', cy: '50', r: '20', fill: 'none' },
                    'class': 'path' })]
                )]
              )]
            ), _resize && h('div', { 'class': 'e-drawer--resize', on: {
                'mousedown': handleMouseDown
              }
            })]
          )]
        );
      } else {
        return h('div', { style: 'display:none' });
      }
    }
  };
};
/* harmony default export */ var mixins = __webpack_exports__["default"] = ({
  form: mixins_form["default"],
  popupManager: popup_manager["default"],
  popup: popup["default"],
  pageList: pageList["default"]
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
