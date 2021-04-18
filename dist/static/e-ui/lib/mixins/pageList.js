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
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
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
        _this4.openLoading();
      });
    },
    getQuery: function getQuery(query) {
      var _this5 = this;

      // 获取请求参数
      if (this.defaultQuery) {
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
        this.openLoading();
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
    openLoading: function openLoading() {
      // 开启加载效果
      if (!this.history && !this.$beforeUpdateTimer) {
        var node = this.$el.querySelector('.e-page-list-layout--table');
        if (node) {
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
      var _this9 = this;

      // 结束加载效果
      this.$beforeUpdateTimer && clearTimeout(this.$beforeUpdateTimer);
      this.$beforeUpdateTimer = setTimeout(function () {
        if (!_this9.history && _this9.$loadingInstance) {
          // 结束loading效果
          _this9.$loadingInstance.close();
          _this9.$loadingInstance = null;
        }
        _this9.$beforeUpdateTimer = null;
      }, 200);
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
    getHighColProps: function getHighColProps(props) {
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
      this.fetch && this.fetch(query);
    },
    handleSortChange: function handleSortChange() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log(args);
    },
    handleSelectionChange: function handleSelectionChange(value) {
      var _this10 = this;

      var oldValue = JSON.parse(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(this.multipleSelection));
      if (this.multipleSelectionProp && !this.$$disabledSelectionChange) {
        var multipleSelectionAll = JSON.parse(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(this.multipleSelectionAll));
        var multipleSelectionId = multipleSelectionAll.map(function (item) {
          return item[_this10.multipleSelectionProp];
        });
        if (value.length > oldValue.length) {
          value.forEach(function (item) {
            if (multipleSelectionId.indexOf(item[_this10.multipleSelectionProp]) === -1) {
              multipleSelectionAll.push(item);
            }
          });
          this.multipleSelectionAll = multipleSelectionAll;
        } else if (value.length < oldValue.length) {
          var valueId = value.map(function (item) {
            return item[_this10.multipleSelectionProp];
          });
          var deleteId = [];
          oldValue.forEach(function (item) {
            var prop = item[_this10.multipleSelectionProp];
            if (valueId.indexOf(prop) === -1) {
              deleteId.push(prop);
            }
          });
          this.multipleSelectionAll = this.multipleSelectionAll.filter(function (item) {
            return deleteId.indexOf(item[_this10.multipleSelectionProp]) === -1;
          });
        }
      }
      this.multipleSelection = value;
    },
    fetch: function fetch(query) {} // 需要被重写， 初始化会执行，路由参数变化也会执行

  },
  beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
    var _this11 = this;

    // 监听route地址变化
    if (to.path === from.path) {
      if (this.searchMode === 'high') {
        this.highQuery = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, this.highQuery, to.query, { page: to.query.page || 1, rows: to.query.rows || 20 });
      } else {
        this.query = babel_runtime_core_js_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, this.$initQuery, to.query, { page: to.query.page || 1, rows: to.query.rows || 20 });
      }
      this.$routeUpdateTimer && clearTimeout(this.$routeUpdateTimer);
      this.$routeUpdateTimer = setTimeout(function () {
        _this11.beforeFetch(_this11.searchMode === 'high' ? _this11.highQuery : _this11.query);
      }, 100);
    }
    next();
  },
  beforeMount: function beforeMount() {
    this.initial();
  },
  beforeUpdate: function beforeUpdate() {
    this.closeLoading();
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


/***/ })

/******/ });