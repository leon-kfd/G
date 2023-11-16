var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/rbush/rbush.js
var require_rbush = __commonJS({
  "node_modules/rbush/rbush.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = global2 || self, global2.RBush = factory());
    })(exports, function() {
      "use strict";
      function quickselect(arr, k, left, right, compare) {
        quickselectStep(arr, k, left || 0, right || arr.length - 1, compare || defaultCompare);
      }
      function quickselectStep(arr, k, left, right, compare) {
        while (right > left) {
          if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            quickselectStep(arr, k, newLeft, newRight, compare);
          }
          var t = arr[k];
          var i = left;
          var j = right;
          swap(arr, left, k);
          if (compare(arr[right], t) > 0) {
            swap(arr, left, right);
          }
          while (i < j) {
            swap(arr, i, j);
            i++;
            j--;
            while (compare(arr[i], t) < 0) {
              i++;
            }
            while (compare(arr[j], t) > 0) {
              j--;
            }
          }
          if (compare(arr[left], t) === 0) {
            swap(arr, left, j);
          } else {
            j++;
            swap(arr, j, right);
          }
          if (j <= k) {
            left = j + 1;
          }
          if (k <= j) {
            right = j - 1;
          }
        }
      }
      function swap(arr, i, j) {
        var tmp2 = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp2;
      }
      function defaultCompare(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
      }
      var RBush3 = function RBush4(maxEntries) {
        if (maxEntries === void 0)
          maxEntries = 9;
        this._maxEntries = Math.max(4, maxEntries);
        this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));
        this.clear();
      };
      RBush3.prototype.all = function all() {
        return this._all(this.data, []);
      };
      RBush3.prototype.search = function search(bbox) {
        var node = this.data;
        var result = [];
        if (!intersects(bbox, node)) {
          return result;
        }
        var toBBox = this.toBBox;
        var nodesToSearch = [];
        while (node) {
          for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            var childBBox = node.leaf ? toBBox(child) : child;
            if (intersects(bbox, childBBox)) {
              if (node.leaf) {
                result.push(child);
              } else if (contains(bbox, childBBox)) {
                this._all(child, result);
              } else {
                nodesToSearch.push(child);
              }
            }
          }
          node = nodesToSearch.pop();
        }
        return result;
      };
      RBush3.prototype.collides = function collides(bbox) {
        var node = this.data;
        if (!intersects(bbox, node)) {
          return false;
        }
        var nodesToSearch = [];
        while (node) {
          for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            var childBBox = node.leaf ? this.toBBox(child) : child;
            if (intersects(bbox, childBBox)) {
              if (node.leaf || contains(bbox, childBBox)) {
                return true;
              }
              nodesToSearch.push(child);
            }
          }
          node = nodesToSearch.pop();
        }
        return false;
      };
      RBush3.prototype.load = function load(data2) {
        if (!(data2 && data2.length)) {
          return this;
        }
        if (data2.length < this._minEntries) {
          for (var i = 0; i < data2.length; i++) {
            this.insert(data2[i]);
          }
          return this;
        }
        var node = this._build(data2.slice(), 0, data2.length - 1, 0);
        if (!this.data.children.length) {
          this.data = node;
        } else if (this.data.height === node.height) {
          this._splitRoot(this.data, node);
        } else {
          if (this.data.height < node.height) {
            var tmpNode = this.data;
            this.data = node;
            node = tmpNode;
          }
          this._insert(node, this.data.height - node.height - 1, true);
        }
        return this;
      };
      RBush3.prototype.insert = function insert(item) {
        if (item) {
          this._insert(item, this.data.height - 1);
        }
        return this;
      };
      RBush3.prototype.clear = function clear() {
        this.data = createNode([]);
        return this;
      };
      RBush3.prototype.remove = function remove(item, equalsFn) {
        if (!item) {
          return this;
        }
        var node = this.data;
        var bbox = this.toBBox(item);
        var path = [];
        var indexes = [];
        var i, parent, goingUp;
        while (node || path.length) {
          if (!node) {
            node = path.pop();
            parent = path[path.length - 1];
            i = indexes.pop();
            goingUp = true;
          }
          if (node.leaf) {
            var index = findItem(item, node.children, equalsFn);
            if (index !== -1) {
              node.children.splice(index, 1);
              path.push(node);
              this._condense(path);
              return this;
            }
          }
          if (!goingUp && !node.leaf && contains(node, bbox)) {
            path.push(node);
            indexes.push(i);
            i = 0;
            parent = node;
            node = node.children[0];
          } else if (parent) {
            i++;
            node = parent.children[i];
            goingUp = false;
          } else {
            node = null;
          }
        }
        return this;
      };
      RBush3.prototype.toBBox = function toBBox(item) {
        return item;
      };
      RBush3.prototype.compareMinX = function compareMinX(a, b) {
        return a.minX - b.minX;
      };
      RBush3.prototype.compareMinY = function compareMinY(a, b) {
        return a.minY - b.minY;
      };
      RBush3.prototype.toJSON = function toJSON() {
        return this.data;
      };
      RBush3.prototype.fromJSON = function fromJSON(data2) {
        this.data = data2;
        return this;
      };
      RBush3.prototype._all = function _all(node, result) {
        var nodesToSearch = [];
        while (node) {
          if (node.leaf) {
            result.push.apply(result, node.children);
          } else {
            nodesToSearch.push.apply(nodesToSearch, node.children);
          }
          node = nodesToSearch.pop();
        }
        return result;
      };
      RBush3.prototype._build = function _build(items, left, right, height) {
        var N = right - left + 1;
        var M = this._maxEntries;
        var node;
        if (N <= M) {
          node = createNode(items.slice(left, right + 1));
          calcBBox(node, this.toBBox);
          return node;
        }
        if (!height) {
          height = Math.ceil(Math.log(N) / Math.log(M));
          M = Math.ceil(N / Math.pow(M, height - 1));
        }
        node = createNode([]);
        node.leaf = false;
        node.height = height;
        var N2 = Math.ceil(N / M);
        var N1 = N2 * Math.ceil(Math.sqrt(M));
        multiSelect(items, left, right, N1, this.compareMinX);
        for (var i = left; i <= right; i += N1) {
          var right2 = Math.min(i + N1 - 1, right);
          multiSelect(items, i, right2, N2, this.compareMinY);
          for (var j = i; j <= right2; j += N2) {
            var right3 = Math.min(j + N2 - 1, right2);
            node.children.push(this._build(items, j, right3, height - 1));
          }
        }
        calcBBox(node, this.toBBox);
        return node;
      };
      RBush3.prototype._chooseSubtree = function _chooseSubtree(bbox, node, level, path) {
        while (true) {
          path.push(node);
          if (node.leaf || path.length - 1 === level) {
            break;
          }
          var minArea = Infinity;
          var minEnlargement = Infinity;
          var targetNode = void 0;
          for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            var area = bboxArea(child);
            var enlargement = enlargedArea(bbox, child) - area;
            if (enlargement < minEnlargement) {
              minEnlargement = enlargement;
              minArea = area < minArea ? area : minArea;
              targetNode = child;
            } else if (enlargement === minEnlargement) {
              if (area < minArea) {
                minArea = area;
                targetNode = child;
              }
            }
          }
          node = targetNode || node.children[0];
        }
        return node;
      };
      RBush3.prototype._insert = function _insert(item, level, isNode) {
        var bbox = isNode ? item : this.toBBox(item);
        var insertPath = [];
        var node = this._chooseSubtree(bbox, this.data, level, insertPath);
        node.children.push(item);
        extend2(node, bbox);
        while (level >= 0) {
          if (insertPath[level].children.length > this._maxEntries) {
            this._split(insertPath, level);
            level--;
          } else {
            break;
          }
        }
        this._adjustParentBBoxes(bbox, insertPath, level);
      };
      RBush3.prototype._split = function _split(insertPath, level) {
        var node = insertPath[level];
        var M = node.children.length;
        var m = this._minEntries;
        this._chooseSplitAxis(node, m, M);
        var splitIndex = this._chooseSplitIndex(node, m, M);
        var newNode = createNode(node.children.splice(splitIndex, node.children.length - splitIndex));
        newNode.height = node.height;
        newNode.leaf = node.leaf;
        calcBBox(node, this.toBBox);
        calcBBox(newNode, this.toBBox);
        if (level) {
          insertPath[level - 1].children.push(newNode);
        } else {
          this._splitRoot(node, newNode);
        }
      };
      RBush3.prototype._splitRoot = function _splitRoot(node, newNode) {
        this.data = createNode([node, newNode]);
        this.data.height = node.height + 1;
        this.data.leaf = false;
        calcBBox(this.data, this.toBBox);
      };
      RBush3.prototype._chooseSplitIndex = function _chooseSplitIndex(node, m, M) {
        var index;
        var minOverlap = Infinity;
        var minArea = Infinity;
        for (var i = m; i <= M - m; i++) {
          var bbox1 = distBBox(node, 0, i, this.toBBox);
          var bbox2 = distBBox(node, i, M, this.toBBox);
          var overlap = intersectionArea(bbox1, bbox2);
          var area = bboxArea(bbox1) + bboxArea(bbox2);
          if (overlap < minOverlap) {
            minOverlap = overlap;
            index = i;
            minArea = area < minArea ? area : minArea;
          } else if (overlap === minOverlap) {
            if (area < minArea) {
              minArea = area;
              index = i;
            }
          }
        }
        return index || M - m;
      };
      RBush3.prototype._chooseSplitAxis = function _chooseSplitAxis(node, m, M) {
        var compareMinX = node.leaf ? this.compareMinX : compareNodeMinX;
        var compareMinY = node.leaf ? this.compareMinY : compareNodeMinY;
        var xMargin = this._allDistMargin(node, m, M, compareMinX);
        var yMargin = this._allDistMargin(node, m, M, compareMinY);
        if (xMargin < yMargin) {
          node.children.sort(compareMinX);
        }
      };
      RBush3.prototype._allDistMargin = function _allDistMargin(node, m, M, compare) {
        node.children.sort(compare);
        var toBBox = this.toBBox;
        var leftBBox = distBBox(node, 0, m, toBBox);
        var rightBBox = distBBox(node, M - m, M, toBBox);
        var margin = bboxMargin(leftBBox) + bboxMargin(rightBBox);
        for (var i = m; i < M - m; i++) {
          var child = node.children[i];
          extend2(leftBBox, node.leaf ? toBBox(child) : child);
          margin += bboxMargin(leftBBox);
        }
        for (var i$1 = M - m - 1; i$1 >= m; i$1--) {
          var child$1 = node.children[i$1];
          extend2(rightBBox, node.leaf ? toBBox(child$1) : child$1);
          margin += bboxMargin(rightBBox);
        }
        return margin;
      };
      RBush3.prototype._adjustParentBBoxes = function _adjustParentBBoxes(bbox, path, level) {
        for (var i = level; i >= 0; i--) {
          extend2(path[i], bbox);
        }
      };
      RBush3.prototype._condense = function _condense(path) {
        for (var i = path.length - 1, siblings = void 0; i >= 0; i--) {
          if (path[i].children.length === 0) {
            if (i > 0) {
              siblings = path[i - 1].children;
              siblings.splice(siblings.indexOf(path[i]), 1);
            } else {
              this.clear();
            }
          } else {
            calcBBox(path[i], this.toBBox);
          }
        }
      };
      function findItem(item, items, equalsFn) {
        if (!equalsFn) {
          return items.indexOf(item);
        }
        for (var i = 0; i < items.length; i++) {
          if (equalsFn(item, items[i])) {
            return i;
          }
        }
        return -1;
      }
      function calcBBox(node, toBBox) {
        distBBox(node, 0, node.children.length, toBBox, node);
      }
      function distBBox(node, k, p, toBBox, destNode) {
        if (!destNode) {
          destNode = createNode(null);
        }
        destNode.minX = Infinity;
        destNode.minY = Infinity;
        destNode.maxX = -Infinity;
        destNode.maxY = -Infinity;
        for (var i = k; i < p; i++) {
          var child = node.children[i];
          extend2(destNode, node.leaf ? toBBox(child) : child);
        }
        return destNode;
      }
      function extend2(a, b) {
        a.minX = Math.min(a.minX, b.minX);
        a.minY = Math.min(a.minY, b.minY);
        a.maxX = Math.max(a.maxX, b.maxX);
        a.maxY = Math.max(a.maxY, b.maxY);
        return a;
      }
      function compareNodeMinX(a, b) {
        return a.minX - b.minX;
      }
      function compareNodeMinY(a, b) {
        return a.minY - b.minY;
      }
      function bboxArea(a) {
        return (a.maxX - a.minX) * (a.maxY - a.minY);
      }
      function bboxMargin(a) {
        return a.maxX - a.minX + (a.maxY - a.minY);
      }
      function enlargedArea(a, b) {
        return (Math.max(b.maxX, a.maxX) - Math.min(b.minX, a.minX)) * (Math.max(b.maxY, a.maxY) - Math.min(b.minY, a.minY));
      }
      function intersectionArea(a, b) {
        var minX = Math.max(a.minX, b.minX);
        var minY = Math.max(a.minY, b.minY);
        var maxX = Math.min(a.maxX, b.maxX);
        var maxY = Math.min(a.maxY, b.maxY);
        return Math.max(0, maxX - minX) * Math.max(0, maxY - minY);
      }
      function contains(a, b) {
        return a.minX <= b.minX && a.minY <= b.minY && b.maxX <= a.maxX && b.maxY <= a.maxY;
      }
      function intersects(a, b) {
        return b.minX <= a.maxX && b.minY <= a.maxY && b.maxX >= a.minX && b.maxY >= a.minY;
      }
      function createNode(children) {
        return {
          children,
          height: 1,
          leaf: true,
          minX: Infinity,
          minY: Infinity,
          maxX: -Infinity,
          maxY: -Infinity
        };
      }
      function multiSelect(arr, left, right, n, compare) {
        var stack = [left, right];
        while (stack.length) {
          right = stack.pop();
          left = stack.pop();
          if (right - left <= n) {
            continue;
          }
          var mid = left + Math.ceil((right - left) / n / 2) * n;
          quickselect(arr, mid, left, right, compare);
          stack.push(left, mid, mid, right);
        }
      }
      return RBush3;
    });
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len5 = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len5) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len5 - 1); i < len5; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length5 = listeners.length, j;
        for (i = 0; i < length5; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len5) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len5 - 1); j < len5; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length5 = listeners.length; i < length5; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// src/index.ts
var import_rbush2 = __toESM(require_rbush());

// src/types.ts
var Shape = /* @__PURE__ */ ((Shape2) => {
  Shape2["GROUP"] = "g";
  Shape2["CIRCLE"] = "circle";
  Shape2["ELLIPSE"] = "ellipse";
  Shape2["IMAGE"] = "image";
  Shape2["RECT"] = "rect";
  Shape2["LINE"] = "line";
  Shape2["POLYLINE"] = "polyline";
  Shape2["POLYGON"] = "polygon";
  Shape2["TEXT"] = "text";
  Shape2["PATH"] = "path";
  Shape2["HTML"] = "html";
  Shape2["MESH"] = "mesh";
  return Shape2;
})(Shape || {});
var ClipSpaceNearZ = /* @__PURE__ */ ((ClipSpaceNearZ2) => {
  ClipSpaceNearZ2[ClipSpaceNearZ2["ZERO"] = 0] = "ZERO";
  ClipSpaceNearZ2[ClipSpaceNearZ2["NEGATIVE_ONE"] = 1] = "NEGATIVE_ONE";
  return ClipSpaceNearZ2;
})(ClipSpaceNearZ || {});

// src/AbstractRenderer.ts
var AbstractRendererPlugin = class {
  constructor() {
    this.plugins = [];
  }
  addRenderingPlugin(plugin) {
    this.plugins.push(plugin);
    this.context.renderingPlugins.push(plugin);
  }
  removeAllRenderingPlugins() {
    this.plugins.forEach((plugin) => {
      const index = this.context.renderingPlugins.indexOf(plugin);
      if (index >= 0) {
        this.context.renderingPlugins.splice(index, 1);
      }
    });
  }
};
var AbstractRenderer = class {
  constructor(config) {
    this.clipSpaceNearZ = 1 /* NEGATIVE_ONE */;
    this.plugins = [];
    this.config = __spreadValues({
      /**
       * only dirty object will cause re-render
       */
      enableDirtyCheck: true,
      enableCulling: false,
      /**
       * enable auto rendering by default
       */
      enableAutoRendering: true,
      /**
       * enable dirty rectangle rendering by default
       */
      enableDirtyRectangleRendering: true,
      enableDirtyRectangleRenderingDebug: false
    }, config);
  }
  registerPlugin(plugin) {
    const index = this.plugins.findIndex((p) => p === plugin);
    if (index === -1) {
      this.plugins.push(plugin);
    }
  }
  unregisterPlugin(plugin) {
    const index = this.plugins.findIndex((p) => p === plugin);
    if (index > -1) {
      this.plugins.splice(index, 1);
    }
  }
  getPlugins() {
    return this.plugins;
  }
  getPlugin(name) {
    return this.plugins.find((plugin) => plugin.name === name);
  }
  getConfig() {
    return this.config;
  }
  setConfig(config) {
    Object.assign(this.config, config);
  }
};

// src/Canvas.ts
var import_rbush = __toESM(require_rbush());

// node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_index.default;

// node_modules/gl-matrix/esm/common.js
var EPSILON = 1e-6;
var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
var RANDOM = Math.random;
var degree = Math.PI / 180;
if (!Math.hypot)
  Math.hypot = function() {
    var y = 0, i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };

// node_modules/gl-matrix/esm/mat3.js
var mat3_exports = {};
__export(mat3_exports, {
  add: () => add,
  adjoint: () => adjoint,
  clone: () => clone,
  copy: () => copy,
  create: () => create,
  determinant: () => determinant,
  equals: () => equals,
  exactEquals: () => exactEquals,
  frob: () => frob,
  fromMat2d: () => fromMat2d,
  fromMat4: () => fromMat4,
  fromQuat: () => fromQuat,
  fromRotation: () => fromRotation,
  fromScaling: () => fromScaling,
  fromTranslation: () => fromTranslation,
  fromValues: () => fromValues,
  identity: () => identity,
  invert: () => invert,
  mul: () => mul,
  multiply: () => multiply,
  multiplyScalar: () => multiplyScalar,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd,
  normalFromMat4: () => normalFromMat4,
  projection: () => projection,
  rotate: () => rotate,
  scale: () => scale,
  set: () => set,
  str: () => str,
  sub: () => sub,
  subtract: () => subtract,
  translate: () => translate,
  transpose: () => transpose
});
function create() {
  var out = new ARRAY_TYPE(9);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }
  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
function fromMat4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
function clone(a) {
  var out = new ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
function identity(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function transpose(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }
  return out;
}
function invert(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20;
  var det = a00 * b01 + a01 * b11 + a02 * b21;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
function adjoint(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
function determinant(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
function multiply(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2];
  var a10 = a[3], a11 = a[4], a12 = a[5];
  var a20 = a[6], a21 = a[7], a22 = a[8];
  var b00 = b[0], b01 = b[1], b02 = b[2];
  var b10 = b[3], b11 = b[4], b12 = b[5];
  var b20 = b[6], b21 = b[7], b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
function translate(out, a, v) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
function rotate(out, a, rad) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
function scale(out, a, v) {
  var x = v[0], y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
function fromRotation(out, rad) {
  var s = Math.sin(rad), c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
function fromQuat(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
function normalFromMat4(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
function str(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
function subtract(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
function multiplyScalarAndAdd(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  out[2] = a[2] + b[2] * scale7;
  out[3] = a[3] + b[3] * scale7;
  out[4] = a[4] + b[4] * scale7;
  out[5] = a[5] + b[5] * scale7;
  out[6] = a[6] + b[6] * scale7;
  out[7] = a[7] + b[7] * scale7;
  out[8] = a[8] + b[8] * scale7;
  return out;
}
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
function equals(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
}
var mul = multiply;
var sub = subtract;

// node_modules/gl-matrix/esm/mat4.js
var mat4_exports = {};
__export(mat4_exports, {
  add: () => add2,
  adjoint: () => adjoint2,
  clone: () => clone2,
  copy: () => copy2,
  create: () => create2,
  determinant: () => determinant2,
  equals: () => equals2,
  exactEquals: () => exactEquals2,
  frob: () => frob2,
  fromQuat: () => fromQuat3,
  fromQuat2: () => fromQuat2,
  fromRotation: () => fromRotation2,
  fromRotationTranslation: () => fromRotationTranslation,
  fromRotationTranslationScale: () => fromRotationTranslationScale,
  fromRotationTranslationScaleOrigin: () => fromRotationTranslationScaleOrigin,
  fromScaling: () => fromScaling2,
  fromTranslation: () => fromTranslation2,
  fromValues: () => fromValues2,
  fromXRotation: () => fromXRotation,
  fromYRotation: () => fromYRotation,
  fromZRotation: () => fromZRotation,
  frustum: () => frustum,
  getRotation: () => getRotation,
  getScaling: () => getScaling,
  getTranslation: () => getTranslation,
  identity: () => identity2,
  invert: () => invert2,
  lookAt: () => lookAt,
  mul: () => mul2,
  multiply: () => multiply2,
  multiplyScalar: () => multiplyScalar2,
  multiplyScalarAndAdd: () => multiplyScalarAndAdd2,
  ortho: () => ortho,
  orthoNO: () => orthoNO,
  orthoZO: () => orthoZO,
  perspective: () => perspective,
  perspectiveFromFieldOfView: () => perspectiveFromFieldOfView,
  perspectiveNO: () => perspectiveNO,
  perspectiveZO: () => perspectiveZO,
  rotate: () => rotate2,
  rotateX: () => rotateX,
  rotateY: () => rotateY,
  rotateZ: () => rotateZ,
  scale: () => scale2,
  set: () => set2,
  str: () => str2,
  sub: () => sub2,
  subtract: () => subtract2,
  targetTo: () => targetTo,
  translate: () => translate2,
  transpose: () => transpose2
});
function create2() {
  var out = new ARRAY_TYPE(16);
  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
function clone2(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function copy2(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function fromValues2(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function set2(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
function identity2(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function transpose2(out, a) {
  if (out === a) {
    var a01 = a[1], a02 = a[2], a03 = a[3];
    var a12 = a[6], a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }
  return out;
}
function invert2(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) {
    return null;
  }
  det = 1 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
function adjoint2(out, a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
function determinant2(a) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32;
  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
function multiply2(out, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
function translate2(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }
  return out;
}
function scale2(out, a, v) {
  var x = v[0], y = v[1], z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
function rotate2(out, a, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len5 = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;
  if (len5 < EPSILON) {
    return null;
  }
  len5 = 1 / len5;
  x *= len5;
  y *= len5;
  z *= len5;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  if (a !== out) {
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}
function rotateX(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
function rotateY(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];
  if (a !== out) {
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
function rotateZ(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  if (a !== out) {
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
function fromTranslation2(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromScaling2(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotation2(out, rad, axis) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len5 = Math.hypot(x, y, z);
  var s, c, t;
  if (len5 < EPSILON) {
    return null;
  }
  len5 = 1 / len5;
  x *= len5;
  y *= len5;
  z *= len5;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function fromRotationTranslation(out, q, v) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromQuat2(out, a) {
  var translation = new ARRAY_TYPE(3);
  var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw;
  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }
  fromRotationTranslation(out, a, translation);
  return out;
}
function getTranslation(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;
  if (trace > 0) {
    S = Math.sqrt(trace + 1) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }
  return out;
}
function fromRotationTranslationScale(out, q, v, s) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
function fromQuat3(out, q) {
  var x = q[0], y = q[1], z = q[2], w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
function frustum(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
function perspectiveNO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}
var perspective = perspectiveNO;
function perspectiveZO(out, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = far * nf;
    out[14] = far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -near;
  }
  return out;
}
function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
  var xScale = 2 / (leftTan + rightTan);
  var yScale = 2 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = yScale;
  out[6] = 0;
  out[7] = 0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near / (near - far);
  out[15] = 0;
  return out;
}
function orthoNO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
var ortho = orthoNO;
function orthoZO(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = near * nf;
  out[15] = 1;
  return out;
}
function lookAt(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len5;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];
  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity2(out);
  }
  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len5 = 1 / Math.hypot(z0, z1, z2);
  z0 *= len5;
  z1 *= len5;
  z2 *= len5;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len5 = Math.hypot(x0, x1, x2);
  if (!len5) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len5 = 1 / len5;
    x0 *= len5;
    x1 *= len5;
    x2 *= len5;
  }
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len5 = Math.hypot(y0, y1, y2);
  if (!len5) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len5 = 1 / len5;
    y0 *= len5;
    y1 *= len5;
    y2 *= len5;
  }
  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
function targetTo(out, eye, target, up) {
  var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
  var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
  var len5 = z0 * z0 + z1 * z1 + z2 * z2;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
    z0 *= len5;
    z1 *= len5;
    z2 *= len5;
  }
  var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
  len5 = x0 * x0 + x1 * x1 + x2 * x2;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
    x0 *= len5;
    x1 *= len5;
    x2 *= len5;
  }
  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
function str2(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
function frob2(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
function add2(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
function subtract2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
function multiplyScalar2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
function multiplyScalarAndAdd2(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  out[2] = a[2] + b[2] * scale7;
  out[3] = a[3] + b[3] * scale7;
  out[4] = a[4] + b[4] * scale7;
  out[5] = a[5] + b[5] * scale7;
  out[6] = a[6] + b[6] * scale7;
  out[7] = a[7] + b[7] * scale7;
  out[8] = a[8] + b[8] * scale7;
  out[9] = a[9] + b[9] * scale7;
  out[10] = a[10] + b[10] * scale7;
  out[11] = a[11] + b[11] * scale7;
  out[12] = a[12] + b[12] * scale7;
  out[13] = a[13] + b[13] * scale7;
  out[14] = a[14] + b[14] * scale7;
  out[15] = a[15] + b[15] * scale7;
  return out;
}
function exactEquals2(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
function equals2(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
  var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
  var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
  var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
  var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
}
var mul2 = multiply2;
var sub2 = subtract2;

// node_modules/gl-matrix/esm/quat.js
var quat_exports = {};
__export(quat_exports, {
  add: () => add5,
  calculateW: () => calculateW,
  clone: () => clone5,
  conjugate: () => conjugate,
  copy: () => copy5,
  create: () => create5,
  dot: () => dot3,
  equals: () => equals5,
  exactEquals: () => exactEquals5,
  exp: () => exp,
  fromEuler: () => fromEuler,
  fromMat3: () => fromMat3,
  fromValues: () => fromValues5,
  getAngle: () => getAngle,
  getAxisAngle: () => getAxisAngle,
  identity: () => identity3,
  invert: () => invert3,
  len: () => len3,
  length: () => length3,
  lerp: () => lerp3,
  ln: () => ln,
  mul: () => mul5,
  multiply: () => multiply5,
  normalize: () => normalize3,
  pow: () => pow,
  random: () => random3,
  rotateX: () => rotateX3,
  rotateY: () => rotateY3,
  rotateZ: () => rotateZ3,
  rotationTo: () => rotationTo,
  scale: () => scale5,
  set: () => set5,
  setAxes: () => setAxes,
  setAxisAngle: () => setAxisAngle,
  slerp: () => slerp,
  sqlerp: () => sqlerp,
  sqrLen: () => sqrLen3,
  squaredLength: () => squaredLength3,
  str: () => str5
});

// node_modules/gl-matrix/esm/vec3.js
var vec3_exports = {};
__export(vec3_exports, {
  add: () => add3,
  angle: () => angle,
  bezier: () => bezier,
  ceil: () => ceil,
  clone: () => clone3,
  copy: () => copy3,
  create: () => create3,
  cross: () => cross,
  dist: () => dist,
  distance: () => distance,
  div: () => div,
  divide: () => divide,
  dot: () => dot,
  equals: () => equals3,
  exactEquals: () => exactEquals3,
  floor: () => floor,
  forEach: () => forEach,
  fromValues: () => fromValues3,
  hermite: () => hermite,
  inverse: () => inverse,
  len: () => len,
  length: () => length,
  lerp: () => lerp,
  max: () => max,
  min: () => min,
  mul: () => mul3,
  multiply: () => multiply3,
  negate: () => negate,
  normalize: () => normalize,
  random: () => random,
  rotateX: () => rotateX2,
  rotateY: () => rotateY2,
  rotateZ: () => rotateZ2,
  round: () => round,
  scale: () => scale3,
  scaleAndAdd: () => scaleAndAdd,
  set: () => set3,
  sqrDist: () => sqrDist,
  sqrLen: () => sqrLen,
  squaredDistance: () => squaredDistance,
  squaredLength: () => squaredLength,
  str: () => str3,
  sub: () => sub3,
  subtract: () => subtract3,
  transformMat3: () => transformMat3,
  transformMat4: () => transformMat4,
  transformQuat: () => transformQuat,
  zero: () => zero
});
function create3() {
  var out = new ARRAY_TYPE(3);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  return out;
}
function clone3(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function length(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
function fromValues3(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function copy3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
function set3(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function add3(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
function subtract3(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
function multiply3(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
function divide(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
function min(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
function max(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
function scale3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
function scaleAndAdd(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  out[2] = a[2] + b[2] * scale7;
  return out;
}
function distance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
function squaredDistance(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
function squaredLength(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
function negate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
function inverse(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  return out;
}
function normalize(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len5 = x * x + y * y + z * z;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
  }
  out[0] = a[0] * len5;
  out[1] = a[1] * len5;
  out[2] = a[2] * len5;
  return out;
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2];
  var bx = b[0], by = b[1], bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
function lerp(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
function random(out, scale7) {
  scale7 = scale7 || 1;
  var r = RANDOM() * 2 * Math.PI;
  var z = RANDOM() * 2 - 1;
  var zScale = Math.sqrt(1 - z * z) * scale7;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale7;
  return out;
}
function transformMat4(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
function transformMat3(out, a, m) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
function transformQuat(out, a, q) {
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var x = a[0], y = a[1], z = a[2];
  var uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
  var uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2;
  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2;
  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
function rotateX2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateY2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function rotateZ2(out, a, b, rad) {
  var p = [], r = [];
  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2];
  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2];
  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
function angle(a, b) {
  var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag1 = Math.sqrt(ax * ax + ay * ay + az * az), mag2 = Math.sqrt(bx * bx + by * by + bz * bz), mag = mag1 * mag2, cosine = mag && dot(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}
function str3(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
function exactEquals3(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
function equals3(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2];
  var b0 = b[0], b1 = b[1], b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
}
var sub3 = subtract3;
var mul3 = multiply3;
var div = divide;
var dist = distance;
var sqrDist = squaredDistance;
var len = length;
var sqrLen = squaredLength;
var forEach = function() {
  var vec = create3();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 3;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }
    return a;
  };
}();

// node_modules/gl-matrix/esm/vec4.js
var vec4_exports = {};
__export(vec4_exports, {
  add: () => add4,
  ceil: () => ceil2,
  clone: () => clone4,
  copy: () => copy4,
  create: () => create4,
  cross: () => cross2,
  dist: () => dist2,
  distance: () => distance2,
  div: () => div2,
  divide: () => divide2,
  dot: () => dot2,
  equals: () => equals4,
  exactEquals: () => exactEquals4,
  floor: () => floor2,
  forEach: () => forEach2,
  fromValues: () => fromValues4,
  inverse: () => inverse2,
  len: () => len2,
  length: () => length2,
  lerp: () => lerp2,
  max: () => max2,
  min: () => min2,
  mul: () => mul4,
  multiply: () => multiply4,
  negate: () => negate2,
  normalize: () => normalize2,
  random: () => random2,
  round: () => round2,
  scale: () => scale4,
  scaleAndAdd: () => scaleAndAdd2,
  set: () => set4,
  sqrDist: () => sqrDist2,
  sqrLen: () => sqrLen2,
  squaredDistance: () => squaredDistance2,
  squaredLength: () => squaredLength2,
  str: () => str4,
  sub: () => sub4,
  subtract: () => subtract4,
  transformMat4: () => transformMat42,
  transformQuat: () => transformQuat2,
  zero: () => zero2
});
function create4() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }
  return out;
}
function clone4(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function fromValues4(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function copy4(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
function set4(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
function add4(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
function subtract4(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
function multiply4(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
function divide2(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
function ceil2(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
function floor2(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
function min2(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
function max2(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
function round2(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
function scale4(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
function scaleAndAdd2(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  out[2] = a[2] + b[2] * scale7;
  out[3] = a[3] + b[3] * scale7;
  return out;
}
function distance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
function squaredDistance2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
function length2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
function squaredLength2(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
function negate2(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
function inverse2(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  out[2] = 1 / a[2];
  out[3] = 1 / a[3];
  return out;
}
function normalize2(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len5 = x * x + y * y + z * z + w * w;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
  }
  out[0] = x * len5;
  out[1] = y * len5;
  out[2] = z * len5;
  out[3] = w * len5;
  return out;
}
function dot2(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
function cross2(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
function lerp2(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
function random2(out, scale7) {
  scale7 = scale7 || 1;
  var v1, v2, v3, v4;
  var s1, s2;
  do {
    v1 = RANDOM() * 2 - 1;
    v2 = RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);
  do {
    v3 = RANDOM() * 2 - 1;
    v4 = RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);
  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale7 * v1;
  out[1] = scale7 * v2;
  out[2] = scale7 * v3 * d;
  out[3] = scale7 * v4 * d;
  return out;
}
function transformMat42(out, a, m) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
function transformQuat2(out, a, q) {
  var x = a[0], y = a[1], z = a[2];
  var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z;
  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
function zero2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}
function str4(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
function exactEquals4(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
function equals4(a, b) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
}
var sub4 = subtract4;
var mul4 = multiply4;
var div2 = divide2;
var dist2 = distance2;
var sqrDist2 = squaredDistance2;
var len2 = length2;
var sqrLen2 = squaredLength2;
var forEach2 = function() {
  var vec = create4();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 4;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }
    return a;
  };
}();

// node_modules/gl-matrix/esm/quat.js
function create5() {
  var out = new ARRAY_TYPE(4);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }
  out[3] = 1;
  return out;
}
function identity3(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2;
  var s = Math.sin(rad / 2);
  if (s > EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }
  return rad;
}
function getAngle(a, b) {
  var dotproduct = dot3(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
function multiply5(out, a, b) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
function rotateX3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
function rotateY3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var by = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
function rotateZ3(out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bz = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
function calculateW(out, a) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
  return out;
}
function exp(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
function ln(out, a) {
  var x = a[0], y = a[1], z = a[2], w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
function pow(out, a, b) {
  ln(out, a);
  scale5(out, out, b);
  exp(out, out);
  return out;
}
function slerp(out, a, b, t) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3];
  var bx = b[0], by = b[1], bz = b[2], bw = b[3];
  var omega, cosom, sinom, scale0, scale1;
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  if (cosom < 0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  if (1 - cosom > EPSILON) {
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    scale0 = 1 - t;
    scale1 = t;
  }
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
function random3(out) {
  var u1 = RANDOM();
  var u2 = RANDOM();
  var u3 = RANDOM();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
  return out;
}
function invert3(out, a) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
  var dot6 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot6 ? 1 / dot6 : 0;
  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
function fromMat3(out, m) {
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;
  if (fTrace > 0) {
    fRoot = Math.sqrt(fTrace + 1);
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    var i = 0;
    if (m[4] > m[0])
      i = 1;
    if (m[8] > m[i * 3 + i])
      i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }
  return out;
}
function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
function str5(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
var clone5 = clone4;
var fromValues5 = fromValues4;
var copy5 = copy4;
var set5 = set4;
var add5 = add4;
var mul5 = multiply5;
var scale5 = scale4;
var dot3 = dot2;
var lerp3 = lerp2;
var length3 = length2;
var len3 = length3;
var squaredLength3 = squaredLength2;
var sqrLen3 = squaredLength3;
var normalize3 = normalize2;
var exactEquals5 = exactEquals4;
var equals5 = equals4;
var rotationTo = function() {
  var tmpvec3 = create3();
  var xUnitVec3 = fromValues3(1, 0, 0);
  var yUnitVec3 = fromValues3(0, 1, 0);
  return function(out, a, b) {
    var dot6 = dot(a, b);
    if (dot6 < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len(tmpvec3) < 1e-6)
        cross(tmpvec3, yUnitVec3, a);
      normalize(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot6 > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot6;
      return normalize3(out, out);
    }
  };
}();
var sqlerp = function() {
  var temp1 = create5();
  var temp2 = create5();
  return function(out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
var setAxes = function() {
  var matr = create();
  return function(out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize3(out, fromMat3(out, matr));
  };
}();

// node_modules/gl-matrix/esm/vec2.js
var vec2_exports = {};
__export(vec2_exports, {
  add: () => add6,
  angle: () => angle2,
  ceil: () => ceil3,
  clone: () => clone6,
  copy: () => copy6,
  create: () => create6,
  cross: () => cross3,
  dist: () => dist3,
  distance: () => distance3,
  div: () => div3,
  divide: () => divide3,
  dot: () => dot4,
  equals: () => equals6,
  exactEquals: () => exactEquals6,
  floor: () => floor3,
  forEach: () => forEach3,
  fromValues: () => fromValues6,
  inverse: () => inverse3,
  len: () => len4,
  length: () => length4,
  lerp: () => lerp4,
  max: () => max3,
  min: () => min3,
  mul: () => mul6,
  multiply: () => multiply6,
  negate: () => negate3,
  normalize: () => normalize4,
  random: () => random4,
  rotate: () => rotate3,
  round: () => round3,
  scale: () => scale6,
  scaleAndAdd: () => scaleAndAdd3,
  set: () => set6,
  sqrDist: () => sqrDist3,
  sqrLen: () => sqrLen4,
  squaredDistance: () => squaredDistance3,
  squaredLength: () => squaredLength4,
  str: () => str6,
  sub: () => sub5,
  subtract: () => subtract5,
  transformMat2: () => transformMat2,
  transformMat2d: () => transformMat2d,
  transformMat3: () => transformMat32,
  transformMat4: () => transformMat43,
  zero: () => zero3
});
function create6() {
  var out = new ARRAY_TYPE(2);
  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }
  return out;
}
function clone6(a) {
  var out = new ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function fromValues6(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
function copy6(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
function set6(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
function add6(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
function subtract5(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
function multiply6(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
function divide3(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
function ceil3(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
function floor3(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
function min3(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
function max3(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
function round3(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
function scale6(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
function scaleAndAdd3(out, a, b, scale7) {
  out[0] = a[0] + b[0] * scale7;
  out[1] = a[1] + b[1] * scale7;
  return out;
}
function distance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return Math.hypot(x, y);
}
function squaredDistance3(a, b) {
  var x = b[0] - a[0], y = b[1] - a[1];
  return x * x + y * y;
}
function length4(a) {
  var x = a[0], y = a[1];
  return Math.hypot(x, y);
}
function squaredLength4(a) {
  var x = a[0], y = a[1];
  return x * x + y * y;
}
function negate3(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
function inverse3(out, a) {
  out[0] = 1 / a[0];
  out[1] = 1 / a[1];
  return out;
}
function normalize4(out, a) {
  var x = a[0], y = a[1];
  var len5 = x * x + y * y;
  if (len5 > 0) {
    len5 = 1 / Math.sqrt(len5);
  }
  out[0] = a[0] * len5;
  out[1] = a[1] * len5;
  return out;
}
function dot4(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
function cross3(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
function lerp4(out, a, b, t) {
  var ax = a[0], ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
function random4(out, scale7) {
  scale7 = scale7 || 1;
  var r = RANDOM() * 2 * Math.PI;
  out[0] = Math.cos(r) * scale7;
  out[1] = Math.sin(r) * scale7;
  return out;
}
function transformMat2(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
function transformMat2d(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
function transformMat32(out, a, m) {
  var x = a[0], y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
function transformMat43(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
function rotate3(out, a, b, rad) {
  var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
function angle2(a, b) {
  var x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1], mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2), cosine = mag && (x1 * x2 + y1 * y2) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
function zero3(out) {
  out[0] = 0;
  out[1] = 0;
  return out;
}
function str6(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
function exactEquals6(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
function equals6(a, b) {
  var a0 = a[0], a1 = a[1];
  var b0 = b[0], b1 = b[1];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
}
var len4 = length4;
var sub5 = subtract5;
var mul6 = multiply6;
var div3 = divide3;
var dist3 = distance3;
var sqrDist3 = squaredDistance3;
var sqrLen4 = squaredLength4;
var forEach3 = function() {
  var vec = create6();
  return function(a, stride, offset, count, fn, arg) {
    var i, l;
    if (!stride) {
      stride = 2;
    }
    if (!offset) {
      offset = 0;
    }
    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }
    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }
    return a;
  };
}();

// node_modules/@antv/util/esm/lodash/is-nil.js
var isNil = function(value) {
  return value === null || value === void 0;
};
var is_nil_default = isNil;

// node_modules/@antv/util/esm/lodash/is-type.js
var toString = {}.toString;
var isType = function(value, type) {
  return toString.call(value) === "[object " + type + "]";
};
var is_type_default = isType;

// node_modules/@antv/util/esm/lodash/is-array.js
var is_array_default = function(value) {
  return Array.isArray ? Array.isArray(value) : is_type_default(value, "Array");
};

// node_modules/@antv/util/esm/lodash/is-object.js
var is_object_default = function(value) {
  var type = typeof value;
  return value !== null && type === "object" || type === "function";
};

// node_modules/@antv/util/esm/lodash/max.js
var max_default = function(arr) {
  if (!is_array_default(arr)) {
    return void 0;
  }
  return arr.reduce(function(prev, curr) {
    return Math.max(prev, curr);
  }, arr[0]);
};

// node_modules/@antv/util/esm/lodash/min.js
var min_default = function(arr) {
  if (!is_array_default(arr)) {
    return void 0;
  }
  return arr.reduce(function(prev, curr) {
    return Math.min(prev, curr);
  }, arr[0]);
};

// node_modules/@antv/util/esm/lodash/is-string.js
var is_string_default = function(str7) {
  return is_type_default(str7, "String");
};

// node_modules/@antv/util/esm/lodash/clamp.js
var clamp = function(a, min4, max4) {
  if (a < min4) {
    return min4;
  } else if (a > max4) {
    return max4;
  }
  return a;
};
var clamp_default = clamp;

// node_modules/@antv/util/esm/lodash/is-number.js
var isNumber = function(value) {
  return is_type_default(value, "Number");
};
var is_number_default = isNumber;

// node_modules/@antv/util/esm/lodash/is-number-equal.js
var PRECISION = 1e-5;
function isNumberEqual(a, b, precision) {
  if (precision === void 0) {
    precision = PRECISION;
  }
  return Math.abs(a - b) < precision;
}

// node_modules/@antv/util/esm/lodash/mod.js
var mod = function(n, m) {
  return (n % m + m) % m;
};
var mod_default = mod;

// node_modules/@antv/util/esm/lodash/is-boolean.js
var isBoolean = function(value) {
  return is_type_default(value, "Boolean");
};
var is_boolean_default = isBoolean;

// node_modules/@antv/util/esm/lodash/is-undefined.js
var isUndefined = function(value) {
  return value === void 0;
};
var is_undefined_default = isUndefined;

// node_modules/tslib/tslib.es6.mjs
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// node_modules/@antv/util/esm/path/parser/params-parser.js
var paramsParser = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  x: 0,
  y: 0,
  qx: null,
  qy: null
};

// node_modules/@antv/util/esm/path/process/fix-arc.js
function fixArc(pathArray, allPathCommands, i) {
  if (pathArray[i].length > 7) {
    pathArray[i].shift();
    var pi = pathArray[i];
    var ni = i;
    while (pi.length) {
      allPathCommands[i] = "A";
      pathArray.splice(ni += 1, 0, ["C"].concat(pi.splice(0, 6)));
    }
    pathArray.splice(i, 1);
  }
}

// node_modules/@antv/util/esm/path/parser/params-count.js
var paramsCount = {
  a: 7,
  c: 6,
  h: 1,
  l: 2,
  m: 2,
  r: 4,
  q: 4,
  s: 4,
  t: 2,
  v: 1,
  z: 0
};

// node_modules/@antv/util/esm/path/util/is-path-array.js
function isPathArray(path) {
  return Array.isArray(path) && path.every(function(seg) {
    var lk = seg[0].toLowerCase();
    return paramsCount[lk] === seg.length - 1 && "achlmqstvz".includes(lk);
  });
}

// node_modules/@antv/util/esm/path/util/is-absolute-array.js
function isAbsoluteArray(path) {
  return isPathArray(path) && // @ts-ignore -- `isPathArray` also checks if it's `Array`
  path.every(function(_a) {
    var x = _a[0];
    return x === x.toUpperCase();
  });
}

// node_modules/@antv/util/esm/path/util/is-normalized-array.js
function isNormalizedArray(path) {
  return isAbsoluteArray(path) && path.every(function(_a) {
    var pc = _a[0];
    return "ACLMQZ".includes(pc);
  });
}

// node_modules/@antv/util/esm/path/parser/finalize-segment.js
function finalizeSegment(path) {
  var pathCommand = path.pathValue[path.segmentStart];
  var LK = pathCommand.toLowerCase();
  var data2 = path.data;
  while (data2.length >= paramsCount[LK]) {
    if (LK === "m" && data2.length > 2) {
      path.segments.push([pathCommand].concat(data2.splice(0, 2)));
      LK = "l";
      pathCommand = pathCommand === "m" ? "l" : "L";
    } else {
      path.segments.push([pathCommand].concat(data2.splice(0, paramsCount[LK])));
    }
    if (!paramsCount[LK]) {
      break;
    }
  }
}

// node_modules/@antv/util/esm/path/parser/scan-flag.js
function scanFlag(path) {
  var index = path.index, pathValue = path.pathValue;
  var code = pathValue.charCodeAt(index);
  if (code === 48) {
    path.param = 0;
    path.index += 1;
    return;
  }
  if (code === 49) {
    path.param = 1;
    path.index += 1;
    return;
  }
  path.err = '[path-util]: invalid Arc flag "' + pathValue[index] + '", expecting 0 or 1 at index ' + index;
}

// node_modules/@antv/util/esm/path/parser/is-digit-start.js
function isDigitStart(code) {
  return code >= 48 && code <= 57 || code === 43 || code === 45 || code === 46;
}
function isDigit(code) {
  return code >= 48 && code <= 57;
}

// node_modules/@antv/util/esm/path/parser/scan-param.js
function scanParam(path) {
  var max4 = path.max, pathValue = path.pathValue, start = path.index;
  var index = start;
  var zeroFirst = false;
  var hasCeiling = false;
  var hasDecimal = false;
  var hasDot = false;
  var ch;
  if (index >= max4) {
    path.err = "[path-util]: Invalid path value at index " + index + ', "pathValue" is missing param';
    return;
  }
  ch = pathValue.charCodeAt(index);
  if (ch === 43 || ch === 45) {
    index += 1;
    ch = pathValue.charCodeAt(index);
  }
  if (!isDigit(ch) && ch !== 46) {
    path.err = "[path-util]: Invalid path value at index " + index + ', "' + pathValue[index] + '" is not a number';
    return;
  }
  if (ch !== 46) {
    zeroFirst = ch === 48;
    index += 1;
    ch = pathValue.charCodeAt(index);
    if (zeroFirst && index < max4) {
      if (ch && isDigit(ch)) {
        path.err = "[path-util]: Invalid path value at index " + start + ', "' + pathValue[start] + '" illegal number';
        return;
      }
    }
    while (index < max4 && isDigit(pathValue.charCodeAt(index))) {
      index += 1;
      hasCeiling = true;
    }
    ch = pathValue.charCodeAt(index);
  }
  if (ch === 46) {
    hasDot = true;
    index += 1;
    while (isDigit(pathValue.charCodeAt(index))) {
      index += 1;
      hasDecimal = true;
    }
    ch = pathValue.charCodeAt(index);
  }
  if (ch === 101 || ch === 69) {
    if (hasDot && !hasCeiling && !hasDecimal) {
      path.err = "[path-util]: Invalid path value at index " + index + ', "' + pathValue[index] + '" invalid float exponent';
      return;
    }
    index += 1;
    ch = pathValue.charCodeAt(index);
    if (ch === 43 || ch === 45) {
      index += 1;
    }
    if (index < max4 && isDigit(pathValue.charCodeAt(index))) {
      while (index < max4 && isDigit(pathValue.charCodeAt(index))) {
        index += 1;
      }
    } else {
      path.err = "[path-util]: Invalid path value at index " + index + ', "' + pathValue[index] + '" invalid integer exponent';
      return;
    }
  }
  path.index = index;
  path.param = +path.pathValue.slice(start, index);
}

// node_modules/@antv/util/esm/path/parser/is-space.js
function isSpace(ch) {
  var specialSpaces = [
    5760,
    6158,
    8192,
    8193,
    8194,
    8195,
    8196,
    8197,
    8198,
    8199,
    8200,
    8201,
    8202,
    8239,
    8287,
    12288,
    65279
  ];
  return ch === 10 || ch === 13 || ch === 8232 || ch === 8233 || // Line terminators
  // White spaces
  ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch >= 5760 && specialSpaces.includes(ch);
}

// node_modules/@antv/util/esm/path/parser/skip-spaces.js
function skipSpaces(path) {
  var pathValue = path.pathValue, max4 = path.max;
  while (path.index < max4 && isSpace(pathValue.charCodeAt(path.index))) {
    path.index += 1;
  }
}

// node_modules/@antv/util/esm/path/parser/is-path-command.js
function isPathCommand(code) {
  switch (code | 32) {
    case 109:
    case 122:
    case 108:
    case 104:
    case 118:
    case 99:
    case 115:
    case 113:
    case 116:
    case 97:
      return true;
    default:
      return false;
  }
}

// node_modules/@antv/util/esm/path/parser/is-arc-command.js
function isArcCommand(code) {
  return (code | 32) === 97;
}

// node_modules/@antv/util/esm/path/parser/scan-segment.js
function scanSegment(path) {
  var max4 = path.max, pathValue = path.pathValue, index = path.index;
  var cmdCode = pathValue.charCodeAt(index);
  var reqParams = paramsCount[pathValue[index].toLowerCase()];
  path.segmentStart = index;
  if (!isPathCommand(cmdCode)) {
    path.err = '[path-util]: Invalid path value "' + pathValue[index] + '" is not a path command';
    return;
  }
  path.index += 1;
  skipSpaces(path);
  path.data = [];
  if (!reqParams) {
    finalizeSegment(path);
    return;
  }
  for (; ; ) {
    for (var i = reqParams; i > 0; i -= 1) {
      if (isArcCommand(cmdCode) && (i === 3 || i === 4))
        scanFlag(path);
      else
        scanParam(path);
      if (path.err.length) {
        return;
      }
      path.data.push(path.param);
      skipSpaces(path);
      if (path.index < max4 && pathValue.charCodeAt(path.index) === 44) {
        path.index += 1;
        skipSpaces(path);
      }
    }
    if (path.index >= path.max) {
      break;
    }
    if (!isDigitStart(pathValue.charCodeAt(path.index))) {
      break;
    }
  }
  finalizeSegment(path);
}

// node_modules/@antv/util/esm/path/parser/path-parser.js
var PathParser = (
  /** @class */
  function() {
    function PathParser2(pathString) {
      this.pathValue = pathString;
      this.segments = [];
      this.max = pathString.length;
      this.index = 0;
      this.param = 0;
      this.segmentStart = 0;
      this.data = [];
      this.err = "";
    }
    return PathParser2;
  }()
);

// node_modules/@antv/util/esm/path/parser/parse-path-string.js
function parsePathString(pathInput) {
  if (isPathArray(pathInput)) {
    return [].concat(pathInput);
  }
  var path = new PathParser(pathInput);
  skipSpaces(path);
  while (path.index < path.max && !path.err.length) {
    scanSegment(path);
  }
  return path.err ? path.err : path.segments;
}

// node_modules/@antv/util/esm/path/convert/path-2-absolute.js
function path2Absolute(pathInput) {
  if (isAbsoluteArray(pathInput)) {
    return [].concat(pathInput);
  }
  var path = parsePathString(pathInput);
  var x = 0;
  var y = 0;
  var mx = 0;
  var my = 0;
  return path.map(function(segment) {
    var values = segment.slice(1).map(Number);
    var pathCommand = segment[0];
    var absCommand = pathCommand.toUpperCase();
    if (pathCommand === "M") {
      x = values[0], y = values[1];
      mx = x;
      my = y;
      return ["M", x, y];
    }
    var absoluteSegment;
    if (pathCommand !== absCommand) {
      switch (absCommand) {
        case "A":
          absoluteSegment = [
            absCommand,
            values[0],
            values[1],
            values[2],
            values[3],
            values[4],
            values[5] + x,
            values[6] + y
          ];
          break;
        case "V":
          absoluteSegment = [absCommand, values[0] + y];
          break;
        case "H":
          absoluteSegment = [absCommand, values[0] + x];
          break;
        default: {
          var absValues = values.map(function(n, j) {
            return n + (j % 2 ? y : x);
          });
          absoluteSegment = [absCommand].concat(absValues);
        }
      }
    } else {
      absoluteSegment = [absCommand].concat(values);
    }
    var segLength = absoluteSegment.length;
    switch (absCommand) {
      case "Z":
        x = mx;
        y = my;
        break;
      case "H":
        x = absoluteSegment[1];
        break;
      case "V":
        y = absoluteSegment[1];
        break;
      default:
        x = absoluteSegment[segLength - 2];
        y = absoluteSegment[segLength - 1];
        if (absCommand === "M") {
          mx = x;
          my = y;
        }
    }
    return absoluteSegment;
  });
}

// node_modules/@antv/util/esm/path/process/normalize-segment.js
function normalizeSegment(segment, params) {
  var pathCommand = segment[0];
  var px1 = params.x1, py1 = params.y1, px2 = params.x2, py2 = params.y2;
  var values = segment.slice(1).map(Number);
  var result = segment;
  if (!"TQ".includes(pathCommand)) {
    params.qx = null;
    params.qy = null;
  }
  if (pathCommand === "H") {
    result = ["L", segment[1], py1];
  } else if (pathCommand === "V") {
    result = ["L", px1, segment[1]];
  } else if (pathCommand === "S") {
    var x1 = px1 * 2 - px2;
    var y1 = py1 * 2 - py2;
    params.x1 = x1;
    params.y1 = y1;
    result = ["C", x1, y1].concat(values);
  } else if (pathCommand === "T") {
    var qx = px1 * 2 - params.qx;
    var qy = py1 * 2 - params.qy;
    params.qx = qx;
    params.qy = qy;
    result = ["Q", qx, qy].concat(values);
  } else if (pathCommand === "Q") {
    var nqx = values[0], nqy = values[1];
    params.qx = nqx;
    params.qy = nqy;
  }
  return result;
}

// node_modules/@antv/util/esm/path/process/normalize-path.js
function normalizePath(pathInput) {
  if (isNormalizedArray(pathInput)) {
    return [].concat(pathInput);
  }
  var path = path2Absolute(pathInput);
  var params = __assign({}, paramsParser);
  for (var i = 0; i < path.length; i += 1) {
    path[i] = normalizeSegment(path[i], params);
    var segment = path[i];
    var seglen = segment.length;
    params.x1 = +segment[seglen - 2];
    params.y1 = +segment[seglen - 1];
    params.x2 = +segment[seglen - 4] || params.x1;
    params.y2 = +segment[seglen - 3] || params.y1;
  }
  return path;
}

// node_modules/@antv/util/esm/path/util/is-curve-array.js
function isCurveArray(path) {
  return isNormalizedArray(path) && path.every(function(_a) {
    var pc = _a[0];
    return "MC".includes(pc);
  });
}

// node_modules/@antv/util/esm/path/util/rotate-vector.js
function rotateVector(x, y, rad) {
  var X = x * Math.cos(rad) - y * Math.sin(rad);
  var Y = x * Math.sin(rad) + y * Math.cos(rad);
  return { x: X, y: Y };
}

// node_modules/@antv/util/esm/path/process/arc-2-cubic.js
function arcToCubic(X1, Y1, RX, RY, angle3, LAF, SF, X2, Y2, recursive) {
  var x1 = X1;
  var y1 = Y1;
  var rx = RX;
  var ry = RY;
  var x2 = X2;
  var y2 = Y2;
  var d120 = Math.PI * 120 / 180;
  var rad = Math.PI / 180 * (+angle3 || 0);
  var res = [];
  var xy;
  var f1;
  var f2;
  var cx;
  var cy;
  if (!recursive) {
    xy = rotateVector(x1, y1, -rad);
    x1 = xy.x;
    y1 = xy.y;
    xy = rotateVector(x2, y2, -rad);
    x2 = xy.x;
    y2 = xy.y;
    var x = (x1 - x2) / 2;
    var y = (y1 - y2) / 2;
    var h = x * x / (rx * rx) + y * y / (ry * ry);
    if (h > 1) {
      h = Math.sqrt(h);
      rx *= h;
      ry *= h;
    }
    var rx2 = rx * rx;
    var ry2 = ry * ry;
    var k = (LAF === SF ? -1 : 1) * Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
    cx = k * rx * y / ry + (x1 + x2) / 2;
    cy = k * -ry * x / rx + (y1 + y2) / 2;
    f1 = Math.asin(((y1 - cy) / ry * Math.pow(10, 9) >> 0) / Math.pow(10, 9));
    f2 = Math.asin(((y2 - cy) / ry * Math.pow(10, 9) >> 0) / Math.pow(10, 9));
    f1 = x1 < cx ? Math.PI - f1 : f1;
    f2 = x2 < cx ? Math.PI - f2 : f2;
    if (f1 < 0)
      f1 = Math.PI * 2 + f1;
    if (f2 < 0)
      f2 = Math.PI * 2 + f2;
    if (SF && f1 > f2) {
      f1 -= Math.PI * 2;
    }
    if (!SF && f2 > f1) {
      f2 -= Math.PI * 2;
    }
  } else {
    f1 = recursive[0], f2 = recursive[1], cx = recursive[2], cy = recursive[3];
  }
  var df = f2 - f1;
  if (Math.abs(df) > d120) {
    var f2old = f2;
    var x2old = x2;
    var y2old = y2;
    f2 = f1 + d120 * (SF && f2 > f1 ? 1 : -1);
    x2 = cx + rx * Math.cos(f2);
    y2 = cy + ry * Math.sin(f2);
    res = arcToCubic(x2, y2, rx, ry, angle3, 0, SF, x2old, y2old, [f2, f2old, cx, cy]);
  }
  df = f2 - f1;
  var c1 = Math.cos(f1);
  var s1 = Math.sin(f1);
  var c2 = Math.cos(f2);
  var s2 = Math.sin(f2);
  var t = Math.tan(df / 4);
  var hx = 4 / 3 * rx * t;
  var hy = 4 / 3 * ry * t;
  var m1 = [x1, y1];
  var m2 = [x1 + hx * s1, y1 - hy * c1];
  var m3 = [x2 + hx * s2, y2 - hy * c2];
  var m4 = [x2, y2];
  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];
  if (recursive) {
    return m2.concat(m3, m4, res);
  }
  res = m2.concat(m3, m4, res);
  var newres = [];
  for (var i = 0, ii = res.length; i < ii; i += 1) {
    newres[i] = i % 2 ? rotateVector(res[i - 1], res[i], rad).y : rotateVector(res[i], res[i + 1], rad).x;
  }
  return newres;
}

// node_modules/@antv/util/esm/path/process/quad-2-cubic.js
function quadToCubic(x1, y1, qx, qy, x2, y2) {
  var r13 = 1 / 3;
  var r23 = 2 / 3;
  return [
    r13 * x1 + r23 * qx,
    r13 * y1 + r23 * qy,
    r13 * x2 + r23 * qx,
    r13 * y2 + r23 * qy,
    x2,
    y2
    // x,y
  ];
}

// node_modules/@antv/util/esm/path/util/mid-point.js
function midPoint(a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var bx = b[0];
  var by = b[1];
  return [ax + (bx - ax) * t, ay + (by - ay) * t];
}

// node_modules/@antv/util/esm/path/process/line-2-cubic.js
var lineToCubic = function(x1, y1, x2, y2) {
  var t = 0.5;
  var mid = midPoint([x1, y1], [x2, y2], t);
  return __spreadArray(__spreadArray([], mid, true), [x2, y2, x2, y2], false);
};

// node_modules/@antv/util/esm/path/process/segment-2-cubic.js
function segmentToCubic(segment, params) {
  var pathCommand = segment[0];
  var values = segment.slice(1).map(Number);
  var x = values[0], y = values[1];
  var args;
  var px1 = params.x1, py1 = params.y1, px = params.x, py = params.y;
  if (!"TQ".includes(pathCommand)) {
    params.qx = null;
    params.qy = null;
  }
  switch (pathCommand) {
    case "M":
      params.x = x;
      params.y = y;
      return segment;
    case "A":
      args = [px1, py1].concat(values);
      return ["C"].concat(arcToCubic(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]));
    case "Q":
      params.qx = x;
      params.qy = y;
      args = [px1, py1].concat(values);
      return ["C"].concat(quadToCubic(args[0], args[1], args[2], args[3], args[4], args[5]));
    case "L":
      return ["C"].concat(lineToCubic(px1, py1, x, y));
    case "Z":
      if (px1 === px && py1 === py) {
        return ["C", px1, py1, px, py, px, py];
      }
      return ["C"].concat(lineToCubic(px1, py1, px, py));
    default:
  }
  return segment;
}

// node_modules/@antv/util/esm/path/convert/path-2-curve.js
function path2Curve(pathInput, needZCommandIndexes) {
  if (needZCommandIndexes === void 0) {
    needZCommandIndexes = false;
  }
  if (isCurveArray(pathInput)) {
    var cloned = [].concat(pathInput);
    if (needZCommandIndexes) {
      return [cloned, []];
    } else {
      return cloned;
    }
  }
  var path = normalizePath(pathInput);
  var params = __assign({}, paramsParser);
  var allPathCommands = [];
  var pathCommand = "";
  var ii = path.length;
  var segment;
  var seglen;
  var zCommandIndexes = [];
  for (var i = 0; i < ii; i += 1) {
    if (path[i])
      pathCommand = path[i][0];
    allPathCommands[i] = pathCommand;
    var curveSegment = segmentToCubic(path[i], params);
    path[i] = curveSegment;
    fixArc(path, allPathCommands, i);
    ii = path.length;
    if (pathCommand === "Z") {
      zCommandIndexes.push(i);
    }
    segment = path[i];
    seglen = segment.length;
    params.x1 = +segment[seglen - 2];
    params.y1 = +segment[seglen - 1];
    params.x2 = +segment[seglen - 4] || params.x1;
    params.y2 = +segment[seglen - 3] || params.y1;
  }
  if (needZCommandIndexes) {
    return [path, zCommandIndexes];
  } else {
    return path;
  }
}

// node_modules/@antv/util/esm/path/process/clone-path.js
function clonePath(path) {
  return path.map(function(x) {
    return Array.isArray(x) ? [].concat(x) : x;
  });
}

// node_modules/@antv/util/esm/path/process/reverse-curve.js
function reverseCurve(pathArray) {
  var rotatedCurve = pathArray.slice(1).map(function(x, i, curveOnly) {
    return !i ? pathArray[0].slice(1).concat(x.slice(1)) : curveOnly[i - 1].slice(-2).concat(x.slice(1));
  }).map(function(x) {
    return x.map(function(y, i) {
      return x[x.length - i - 2 * (1 - i % 2)];
    });
  }).reverse();
  return [["M"].concat(rotatedCurve[0].slice(0, 2))].concat(rotatedCurve.map(function(x) {
    return ["C"].concat(x.slice(2));
  }));
}

// node_modules/@antv/util/esm/path/util/distance-square-root.js
function distanceSquareRoot(a, b) {
  return Math.sqrt((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1]));
}

// node_modules/@antv/util/esm/path/util/segment-line-factory.js
function segmentLineFactory(x1, y1, x2, y2, distance5) {
  var length5 = distanceSquareRoot([x1, y1], [x2, y2]);
  var point = { x: 0, y: 0 };
  if (typeof distance5 === "number") {
    if (distance5 <= 0) {
      point = { x: x1, y: y1 };
    } else if (distance5 >= length5) {
      point = { x: x2, y: y2 };
    } else {
      var _a = midPoint([x1, y1], [x2, y2], distance5 / length5), x = _a[0], y = _a[1];
      point = { x, y };
    }
  }
  return {
    length: length5,
    point,
    min: {
      x: Math.min(x1, x2),
      y: Math.min(y1, y2)
    },
    max: {
      x: Math.max(x1, x2),
      y: Math.max(y1, y2)
    }
  };
}

// node_modules/@antv/util/esm/path/util/segment-arc-factory.js
function angleBetween(v0, v1) {
  var v0x = v0.x, v0y = v0.y;
  var v1x = v1.x, v1y = v1.y;
  var p = v0x * v1x + v0y * v1y;
  var n = Math.sqrt((Math.pow(v0x, 2) + Math.pow(v0y, 2)) * (Math.pow(v1x, 2) + Math.pow(v1y, 2)));
  var sign = v0x * v1y - v0y * v1x < 0 ? -1 : 1;
  var angle3 = sign * Math.acos(p / n);
  return angle3;
}
function getPointAtArcSegmentLength(x1, y1, RX, RY, angle3, LAF, SF, x, y, t) {
  var abs = Math.abs, sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, PI = Math.PI;
  var rx = abs(RX);
  var ry = abs(RY);
  var xRot = (angle3 % 360 + 360) % 360;
  var xRotRad = xRot * (PI / 180);
  if (x1 === x && y1 === y) {
    return { x: x1, y: y1 };
  }
  if (rx === 0 || ry === 0) {
    return segmentLineFactory(x1, y1, x, y, t).point;
  }
  var dx = (x1 - x) / 2;
  var dy = (y1 - y) / 2;
  var transformedPoint = {
    x: cos(xRotRad) * dx + sin(xRotRad) * dy,
    y: -sin(xRotRad) * dx + cos(xRotRad) * dy
  };
  var radiiCheck = Math.pow(transformedPoint.x, 2) / Math.pow(rx, 2) + Math.pow(transformedPoint.y, 2) / Math.pow(ry, 2);
  if (radiiCheck > 1) {
    rx *= sqrt(radiiCheck);
    ry *= sqrt(radiiCheck);
  }
  var cSquareNumerator = Math.pow(rx, 2) * Math.pow(ry, 2) - Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) - Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  var cSquareRootDenom = Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) + Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  var cRadicand = cSquareNumerator / cSquareRootDenom;
  cRadicand = cRadicand < 0 ? 0 : cRadicand;
  var cCoef = (LAF !== SF ? 1 : -1) * sqrt(cRadicand);
  var transformedCenter = {
    x: cCoef * (rx * transformedPoint.y / ry),
    y: cCoef * (-(ry * transformedPoint.x) / rx)
  };
  var center = {
    x: cos(xRotRad) * transformedCenter.x - sin(xRotRad) * transformedCenter.y + (x1 + x) / 2,
    y: sin(xRotRad) * transformedCenter.x + cos(xRotRad) * transformedCenter.y + (y1 + y) / 2
  };
  var startVector = {
    x: (transformedPoint.x - transformedCenter.x) / rx,
    y: (transformedPoint.y - transformedCenter.y) / ry
  };
  var startAngle = angleBetween({ x: 1, y: 0 }, startVector);
  var endVector = {
    x: (-transformedPoint.x - transformedCenter.x) / rx,
    y: (-transformedPoint.y - transformedCenter.y) / ry
  };
  var sweepAngle = angleBetween(startVector, endVector);
  if (!SF && sweepAngle > 0) {
    sweepAngle -= 2 * PI;
  } else if (SF && sweepAngle < 0) {
    sweepAngle += 2 * PI;
  }
  sweepAngle %= 2 * PI;
  var alpha = startAngle + sweepAngle * t;
  var ellipseComponentX = rx * cos(alpha);
  var ellipseComponentY = ry * sin(alpha);
  var point = {
    x: cos(xRotRad) * ellipseComponentX - sin(xRotRad) * ellipseComponentY + center.x,
    y: sin(xRotRad) * ellipseComponentX + cos(xRotRad) * ellipseComponentY + center.y
  };
  return point;
}
function segmentArcFactory(X1, Y1, RX, RY, angle3, LAF, SF, X2, Y2, distance5, options) {
  var _a;
  var _b = options.bbox, bbox = _b === void 0 ? true : _b, _c = options.length, length5 = _c === void 0 ? true : _c, _d = options.sampleSize, sampleSize = _d === void 0 ? 30 : _d;
  var distanceIsNumber = typeof distance5 === "number";
  var x = X1;
  var y = Y1;
  var LENGTH = 0;
  var prev = [x, y, LENGTH];
  var cur = [x, y];
  var t = 0;
  var POINT = { x: 0, y: 0 };
  var POINTS = [{ x, y }];
  if (distanceIsNumber && distance5 <= 0) {
    POINT = { x, y };
  }
  for (var j = 0; j <= sampleSize; j += 1) {
    t = j / sampleSize;
    _a = getPointAtArcSegmentLength(X1, Y1, RX, RY, angle3, LAF, SF, X2, Y2, t), x = _a.x, y = _a.y;
    if (bbox) {
      POINTS.push({ x, y });
    }
    if (length5) {
      LENGTH += distanceSquareRoot(cur, [x, y]);
    }
    cur = [x, y];
    if (distanceIsNumber && LENGTH >= distance5 && distance5 > prev[2]) {
      var dv = (LENGTH - distance5) / (LENGTH - prev[2]);
      POINT = {
        x: cur[0] * (1 - dv) + prev[0] * dv,
        y: cur[1] * (1 - dv) + prev[1] * dv
      };
    }
    prev = [x, y, LENGTH];
  }
  if (distanceIsNumber && distance5 >= LENGTH) {
    POINT = { x: X2, y: Y2 };
  }
  return {
    length: LENGTH,
    point: POINT,
    min: {
      x: Math.min.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.min.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    },
    max: {
      x: Math.max.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.max.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    }
  };
}

// node_modules/@antv/util/esm/path/util/segment-cubic-factory.js
function getPointAtCubicSegmentLength(x1, y1, c1x, c1y, c2x, c2y, x2, y2, t) {
  var t1 = 1 - t;
  return {
    x: Math.pow(t1, 3) * x1 + 3 * Math.pow(t1, 2) * t * c1x + 3 * t1 * Math.pow(t, 2) * c2x + Math.pow(t, 3) * x2,
    y: Math.pow(t1, 3) * y1 + 3 * Math.pow(t1, 2) * t * c1y + 3 * t1 * Math.pow(t, 2) * c2y + Math.pow(t, 3) * y2
  };
}
function segmentCubicFactory(x1, y1, c1x, c1y, c2x, c2y, x2, y2, distance5, options) {
  var _a;
  var _b = options.bbox, bbox = _b === void 0 ? true : _b, _c = options.length, length5 = _c === void 0 ? true : _c, _d = options.sampleSize, sampleSize = _d === void 0 ? 10 : _d;
  var distanceIsNumber = typeof distance5 === "number";
  var x = x1;
  var y = y1;
  var LENGTH = 0;
  var prev = [x, y, LENGTH];
  var cur = [x, y];
  var t = 0;
  var POINT = { x: 0, y: 0 };
  var POINTS = [{ x, y }];
  if (distanceIsNumber && distance5 <= 0) {
    POINT = { x, y };
  }
  for (var j = 0; j <= sampleSize; j += 1) {
    t = j / sampleSize;
    _a = getPointAtCubicSegmentLength(x1, y1, c1x, c1y, c2x, c2y, x2, y2, t), x = _a.x, y = _a.y;
    if (bbox) {
      POINTS.push({ x, y });
    }
    if (length5) {
      LENGTH += distanceSquareRoot(cur, [x, y]);
    }
    cur = [x, y];
    if (distanceIsNumber && LENGTH >= distance5 && distance5 > prev[2]) {
      var dv = (LENGTH - distance5) / (LENGTH - prev[2]);
      POINT = {
        x: cur[0] * (1 - dv) + prev[0] * dv,
        y: cur[1] * (1 - dv) + prev[1] * dv
      };
    }
    prev = [x, y, LENGTH];
  }
  if (distanceIsNumber && distance5 >= LENGTH) {
    POINT = { x: x2, y: y2 };
  }
  return {
    length: LENGTH,
    point: POINT,
    min: {
      x: Math.min.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.min.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    },
    max: {
      x: Math.max.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.max.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    }
  };
}

// node_modules/@antv/util/esm/path/util/segment-quad-factory.js
function getPointAtQuadSegmentLength(x1, y1, cx, cy, x2, y2, t) {
  var t1 = 1 - t;
  return {
    x: Math.pow(t1, 2) * x1 + 2 * t1 * t * cx + Math.pow(t, 2) * x2,
    y: Math.pow(t1, 2) * y1 + 2 * t1 * t * cy + Math.pow(t, 2) * y2
  };
}
function segmentQuadFactory(x1, y1, qx, qy, x2, y2, distance5, options) {
  var _a;
  var _b = options.bbox, bbox = _b === void 0 ? true : _b, _c = options.length, length5 = _c === void 0 ? true : _c, _d = options.sampleSize, sampleSize = _d === void 0 ? 10 : _d;
  var distanceIsNumber = typeof distance5 === "number";
  var x = x1;
  var y = y1;
  var LENGTH = 0;
  var prev = [x, y, LENGTH];
  var cur = [x, y];
  var t = 0;
  var POINT = { x: 0, y: 0 };
  var POINTS = [{ x, y }];
  if (distanceIsNumber && distance5 <= 0) {
    POINT = { x, y };
  }
  for (var j = 0; j <= sampleSize; j += 1) {
    t = j / sampleSize;
    _a = getPointAtQuadSegmentLength(x1, y1, qx, qy, x2, y2, t), x = _a.x, y = _a.y;
    if (bbox) {
      POINTS.push({ x, y });
    }
    if (length5) {
      LENGTH += distanceSquareRoot(cur, [x, y]);
    }
    cur = [x, y];
    if (distanceIsNumber && LENGTH >= distance5 && distance5 > prev[2]) {
      var dv = (LENGTH - distance5) / (LENGTH - prev[2]);
      POINT = {
        x: cur[0] * (1 - dv) + prev[0] * dv,
        y: cur[1] * (1 - dv) + prev[1] * dv
      };
    }
    prev = [x, y, LENGTH];
  }
  if (distanceIsNumber && distance5 >= LENGTH) {
    POINT = { x: x2, y: y2 };
  }
  return {
    length: LENGTH,
    point: POINT,
    min: {
      x: Math.min.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.min.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    },
    max: {
      x: Math.max.apply(null, POINTS.map(function(n) {
        return n.x;
      })),
      y: Math.max.apply(null, POINTS.map(function(n) {
        return n.y;
      }))
    }
  };
}

// node_modules/@antv/util/esm/path/util/path-length-factory.js
function pathLengthFactory(pathInput, distance5, options) {
  var _a, _b, _c, _d, _e, _f;
  var path = normalizePath(pathInput);
  var distanceIsNumber = typeof distance5 === "number";
  var isM;
  var data2 = [];
  var pathCommand;
  var x = 0;
  var y = 0;
  var mx = 0;
  var my = 0;
  var seg;
  var MIN = [];
  var MAX = [];
  var length5 = 0;
  var min4 = { x: 0, y: 0 };
  var max4 = min4;
  var point = min4;
  var POINT = min4;
  var LENGTH = 0;
  for (var i = 0, ll = path.length; i < ll; i += 1) {
    seg = path[i];
    pathCommand = seg[0];
    isM = pathCommand === "M";
    data2 = !isM ? [x, y].concat(seg.slice(1)) : data2;
    if (isM) {
      mx = seg[1], my = seg[2];
      min4 = { x: mx, y: my };
      max4 = min4;
      length5 = 0;
      if (distanceIsNumber && distance5 < 1e-3) {
        POINT = min4;
      }
    } else if (pathCommand === "L") {
      _a = segmentLineFactory(data2[0], data2[1], data2[2], data2[3], (distance5 || 0) - LENGTH), length5 = _a.length, min4 = _a.min, max4 = _a.max, point = _a.point;
    } else if (pathCommand === "A") {
      _b = segmentArcFactory(data2[0], data2[1], data2[2], data2[3], data2[4], data2[5], data2[6], data2[7], data2[8], (distance5 || 0) - LENGTH, options || {}), length5 = _b.length, min4 = _b.min, max4 = _b.max, point = _b.point;
    } else if (pathCommand === "C") {
      _c = segmentCubicFactory(data2[0], data2[1], data2[2], data2[3], data2[4], data2[5], data2[6], data2[7], (distance5 || 0) - LENGTH, options || {}), length5 = _c.length, min4 = _c.min, max4 = _c.max, point = _c.point;
    } else if (pathCommand === "Q") {
      _d = segmentQuadFactory(data2[0], data2[1], data2[2], data2[3], data2[4], data2[5], (distance5 || 0) - LENGTH, options || {}), length5 = _d.length, min4 = _d.min, max4 = _d.max, point = _d.point;
    } else if (pathCommand === "Z") {
      data2 = [x, y, mx, my];
      _e = segmentLineFactory(data2[0], data2[1], data2[2], data2[3], (distance5 || 0) - LENGTH), length5 = _e.length, min4 = _e.min, max4 = _e.max, point = _e.point;
    }
    if (distanceIsNumber && LENGTH < distance5 && LENGTH + length5 >= distance5) {
      POINT = point;
    }
    MAX.push(max4);
    MIN.push(min4);
    LENGTH += length5;
    _f = pathCommand !== "Z" ? seg.slice(-2) : [mx, my], x = _f[0], y = _f[1];
  }
  if (distanceIsNumber && distance5 >= LENGTH) {
    POINT = { x, y };
  }
  return {
    length: LENGTH,
    point: POINT,
    min: {
      x: Math.min.apply(null, MIN.map(function(n) {
        return n.x;
      })),
      y: Math.min.apply(null, MIN.map(function(n) {
        return n.y;
      }))
    },
    max: {
      x: Math.max.apply(null, MAX.map(function(n) {
        return n.x;
      })),
      y: Math.max.apply(null, MAX.map(function(n) {
        return n.y;
      }))
    }
  };
}

// node_modules/@antv/util/esm/path/util/get-total-length.js
function getTotalLength(pathInput, options) {
  return pathLengthFactory(pathInput, void 0, __assign(__assign({}, options), { bbox: false, length: true })).length;
}

// node_modules/@antv/util/esm/path/util/get-rotated-curve.js
function getRotations(a) {
  var segCount = a.length;
  var pointCount = segCount - 1;
  return a.map(function(f, idx) {
    return a.map(function(p, i) {
      var oldSegIdx = idx + i;
      var seg;
      if (i === 0 || a[oldSegIdx] && a[oldSegIdx][0] === "M") {
        seg = a[oldSegIdx];
        return ["M"].concat(seg.slice(-2));
      }
      if (oldSegIdx >= segCount)
        oldSegIdx -= pointCount;
      return a[oldSegIdx];
    });
  });
}
function getRotatedCurve(a, b) {
  var segCount = a.length - 1;
  var lineLengths = [];
  var computedIndex = 0;
  var sumLensSqrd = 0;
  var rotations = getRotations(a);
  rotations.forEach(function(r, i) {
    a.slice(1).forEach(function(s, j) {
      sumLensSqrd += distanceSquareRoot(a[(i + j) % segCount].slice(-2), b[j % segCount].slice(-2));
    });
    lineLengths[i] = sumLensSqrd;
    sumLensSqrd = 0;
  });
  computedIndex = lineLengths.indexOf(Math.min.apply(null, lineLengths));
  return rotations[computedIndex];
}

// node_modules/@antv/util/esm/path/util/get-path-area.js
function getCubicSegArea(x1, y1, c1x, c1y, c2x, c2y, x2, y2) {
  return 3 * ((y2 - y1) * (c1x + c2x) - (x2 - x1) * (c1y + c2y) + c1y * (x1 - c2x) - c1x * (y1 - c2y) + y2 * (c2x + x1 / 3) - x2 * (c2y + y1 / 3)) / 20;
}
function getPathArea(path) {
  var x = 0;
  var y = 0;
  var len5 = 0;
  return path2Curve(path).map(function(seg) {
    var _a;
    switch (seg[0]) {
      case "M":
        x = seg[1], y = seg[2];
        return 0;
      default:
        var _b = seg.slice(1), c1x = _b[0], c1y = _b[1], c2x = _b[2], c2y = _b[3], x2 = _b[4], y2 = _b[5];
        len5 = getCubicSegArea(x, y, c1x, c1y, c2x, c2y, x2, y2);
        _a = seg.slice(-2), x = _a[0], y = _a[1];
        return len5;
    }
  }).reduce(function(a, b) {
    return a + b;
  }, 0);
}

// node_modules/@antv/util/esm/path/util/get-draw-direction.js
function getDrawDirection(pathArray) {
  return getPathArea(pathArray) >= 0;
}

// node_modules/@antv/util/esm/path/util/get-point-at-length.js
function getPointAtLength(pathInput, distance5, options) {
  return pathLengthFactory(pathInput, distance5, __assign(__assign({}, options), { bbox: false, length: true })).point;
}

// node_modules/@antv/util/esm/path/util/equalize-segments.js
function splitCubic(pts, t) {
  if (t === void 0) {
    t = 0.5;
  }
  var p0 = pts.slice(0, 2);
  var p1 = pts.slice(2, 4);
  var p2 = pts.slice(4, 6);
  var p3 = pts.slice(6, 8);
  var p4 = midPoint(p0, p1, t);
  var p5 = midPoint(p1, p2, t);
  var p6 = midPoint(p2, p3, t);
  var p7 = midPoint(p4, p5, t);
  var p8 = midPoint(p5, p6, t);
  var p9 = midPoint(p7, p8, t);
  return [
    // @ts-ignore
    ["C"].concat(p4, p7, p9),
    // @ts-ignore
    ["C"].concat(p8, p6, p3)
  ];
}
function getCurveArray(segments) {
  return segments.map(function(segment, i, pathArray) {
    var segmentData = i && pathArray[i - 1].slice(-2).concat(segment.slice(1));
    var curveLength = i ? segmentCubicFactory(segmentData[0], segmentData[1], segmentData[2], segmentData[3], segmentData[4], segmentData[5], segmentData[6], segmentData[7], segmentData[8], { bbox: false }).length : 0;
    var subsegs;
    if (i) {
      subsegs = curveLength ? splitCubic(segmentData) : [segment, segment];
    } else {
      subsegs = [segment];
    }
    return {
      s: segment,
      ss: subsegs,
      l: curveLength
    };
  });
}
function equalizeSegments(path1, path2, TL) {
  var c1 = getCurveArray(path1);
  var c2 = getCurveArray(path2);
  var L1 = c1.length;
  var L2 = c2.length;
  var l1 = c1.filter(function(x) {
    return x.l;
  }).length;
  var l2 = c2.filter(function(x) {
    return x.l;
  }).length;
  var m1 = c1.filter(function(x) {
    return x.l;
  }).reduce(function(a, _a) {
    var l = _a.l;
    return a + l;
  }, 0) / l1 || 0;
  var m2 = c2.filter(function(x) {
    return x.l;
  }).reduce(function(a, _a) {
    var l = _a.l;
    return a + l;
  }, 0) / l2 || 0;
  var tl = TL || Math.max(L1, L2);
  var mm = [m1, m2];
  var dif = [tl - L1, tl - L2];
  var canSplit = 0;
  var result = [c1, c2].map(function(x, i) {
    return x.l === tl ? x.map(function(y) {
      return y.s;
    }) : x.map(function(y, j) {
      canSplit = j && dif[i] && y.l >= mm[i];
      dif[i] -= canSplit ? 1 : 0;
      return canSplit ? y.ss : [y.s];
    }).flat();
  });
  return result[0].length === result[1].length ? result : equalizeSegments(result[0], result[1], tl);
}

// src/utils/math.ts
function copyVec3(a, b) {
  a[0] = b[0];
  a[1] = b[1];
  a[2] = b[2];
  return a;
}
function subVec3(o, a, b) {
  o[0] = a[0] - b[0];
  o[1] = a[1] - b[1];
  o[2] = a[2] - b[2];
  return o;
}
function addVec3(o, a, b) {
  o[0] = a[0] + b[0];
  o[1] = a[1] + b[1];
  o[2] = a[2] + b[2];
  return o;
}
function scaleVec3(o, a, b) {
  o[0] = a[0] * b;
  o[1] = a[1] * b;
  o[2] = a[2] * b;
  return o;
}
function maxVec3(o, a, b) {
  o[0] = Math.max(a[0], b[0]);
  o[1] = Math.max(a[1], b[1]);
  o[2] = Math.max(a[2], b[2]);
  return o;
}
function minVec3(o, a, b) {
  o[0] = Math.min(a[0], b[0]);
  o[1] = Math.min(a[1], b[1]);
  o[2] = Math.min(a[2], b[2]);
  return o;
}
function getAngle2(angle3) {
  if (angle3 === void 0) {
    return 0;
  } else if (angle3 > 360 || angle3 < -360) {
    return angle3 % 360;
  }
  return angle3;
}
function createVec3(x, y = 0, z = 0) {
  if (Array.isArray(x) && x.length === 3) {
    return vec3_exports.clone(x);
  }
  if (is_number_default(x)) {
    return vec3_exports.fromValues(x, y, z);
  }
  return vec3_exports.fromValues(x[0], x[1] || y, x[2] || z);
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
function rad2deg(rad) {
  return rad * (180 / Math.PI);
}
function grad2deg(grads) {
  grads = grads % 400;
  if (grads < 0) {
    grads += 400;
  }
  return grads / 400 * 360;
}
function deg2turn(deg) {
  return deg / 360;
}
function turn2deg(turn) {
  return 360 * turn;
}
function getEulerFromQuat(out, quat2) {
  const x = quat2[0];
  const y = quat2[1];
  const z = quat2[2];
  const w = quat2[3];
  const x2 = x * x;
  const y2 = y * y;
  const z2 = z * z;
  const w2 = w * w;
  const unit = x2 + y2 + z2 + w2;
  const test = x * w - y * z;
  if (test > 0.499995 * unit) {
    out[0] = Math.PI / 2;
    out[1] = 2 * Math.atan2(y, x);
    out[2] = 0;
  } else if (test < -0.499995 * unit) {
    out[0] = -Math.PI / 2;
    out[1] = 2 * Math.atan2(y, x);
    out[2] = 0;
  } else {
    out[0] = Math.asin(2 * (x * z - w * y));
    out[1] = Math.atan2(2 * (x * w + y * z), 1 - 2 * (z2 + w2));
    out[2] = Math.atan2(2 * (x * y + z * w), 1 - 2 * (y2 + z2));
  }
  return out;
}
function getEulerFromMat4(out, m) {
  let x;
  let z;
  const halfPi = Math.PI * 0.5;
  const [sx, sy, sz] = mat4_exports.getScaling(vec3_exports.create(), m);
  const y = Math.asin(-m[2] / sx);
  if (y < halfPi) {
    if (y > -halfPi) {
      x = Math.atan2(m[6] / sy, m[10] / sz);
      z = Math.atan2(m[1] / sx, m[0] / sx);
    } else {
      z = 0;
      x = -Math.atan2(m[4] / sy, m[5] / sy);
    }
  } else {
    z = 0;
    x = Math.atan2(m[4] / sy, m[5] / sy);
  }
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
function getEuler(out, quat2) {
  if (quat2.length === 16) {
    return getEulerFromMat4(out, quat2);
  } else {
    return getEulerFromQuat(out, quat2);
  }
}
function fromRotationTranslationScale2(rotation, x, y, scaleX, scaleY) {
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  return mat3_exports.fromValues(
    scaleX * cos,
    scaleY * sin,
    0,
    -scaleX * sin,
    scaleY * cos,
    0,
    x,
    y,
    1
  );
}
function makePerspective(out, left, right, top, bottom, near, far, zero4 = false) {
  const x = 2 * near / (right - left);
  const y = 2 * near / (top - bottom);
  const a = (right + left) / (right - left);
  const b = (top + bottom) / (top - bottom);
  let c;
  let d;
  if (zero4) {
    c = -far / (far - near);
    d = -far * near / (far - near);
  } else {
    c = -(far + near) / (far - near);
    d = -2 * far * near / (far - near);
  }
  out[0] = x;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = y;
  out[6] = 0;
  out[7] = 0;
  out[8] = a;
  out[9] = b;
  out[10] = c;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = d;
  out[15] = 0;
  return out;
}
function decompose(mat) {
  let row0x = mat[0];
  let row0y = mat[1];
  let row1x = mat[3];
  let row1y = mat[4];
  let scalingX = Math.sqrt(row0x * row0x + row0y * row0y);
  let scalingY = Math.sqrt(row1x * row1x + row1y * row1y);
  const determinant3 = row0x * row1y - row0y * row1x;
  if (determinant3 < 0) {
    if (row0x < row1y) {
      scalingX = -scalingX;
    } else {
      scalingY = -scalingY;
    }
  }
  if (scalingX) {
    row0x *= 1 / scalingX;
    row0y *= 1 / scalingX;
  }
  if (scalingY) {
    row1x *= 1 / scalingY;
    row1y *= 1 / scalingY;
  }
  const rotation = Math.atan2(row0y, row0x);
  const angle3 = rad2deg(rotation);
  return [mat[6], mat[7], scalingX, scalingY, angle3];
}
var tmp = mat4_exports.create();
var perspectiveMatrix = mat4_exports.create();
var tmpVec4 = vec4_exports.create();
var row = [vec3_exports.create(), vec3_exports.create(), vec3_exports.create()];
var pdum3 = vec3_exports.create();
function decomposeMat4(matrix, translation, scale7, skew, perspective2, quaternion) {
  if (!normalize5(tmp, matrix))
    return false;
  mat4_exports.copy(perspectiveMatrix, tmp);
  perspectiveMatrix[3] = 0;
  perspectiveMatrix[7] = 0;
  perspectiveMatrix[11] = 0;
  perspectiveMatrix[15] = 1;
  if (Math.abs(mat4_exports.determinant(perspectiveMatrix)) < 1e-8)
    return false;
  const a03 = tmp[3], a13 = tmp[7], a23 = tmp[11], a30 = tmp[12], a31 = tmp[13], a32 = tmp[14], a33 = tmp[15];
  if (a03 !== 0 || a13 !== 0 || a23 !== 0) {
    tmpVec4[0] = a03;
    tmpVec4[1] = a13;
    tmpVec4[2] = a23;
    tmpVec4[3] = a33;
    const ret = mat4_exports.invert(perspectiveMatrix, perspectiveMatrix);
    if (!ret)
      return false;
    mat4_exports.transpose(perspectiveMatrix, perspectiveMatrix);
    vec4_exports.transformMat4(perspective2, tmpVec4, perspectiveMatrix);
  } else {
    perspective2[0] = perspective2[1] = perspective2[2] = 0;
    perspective2[3] = 1;
  }
  translation[0] = a30;
  translation[1] = a31;
  translation[2] = a32;
  mat3from4(row, tmp);
  scale7[0] = vec3_exports.length(row[0]);
  vec3_exports.normalize(row[0], row[0]);
  skew[0] = vec3_exports.dot(row[0], row[1]);
  combine(row[1], row[1], row[0], 1, -skew[0]);
  scale7[1] = vec3_exports.length(row[1]);
  vec3_exports.normalize(row[1], row[1]);
  skew[0] /= scale7[1];
  skew[1] = vec3_exports.dot(row[0], row[2]);
  combine(row[2], row[2], row[0], 1, -skew[1]);
  skew[2] = vec3_exports.dot(row[1], row[2]);
  combine(row[2], row[2], row[1], 1, -skew[2]);
  scale7[2] = vec3_exports.length(row[2]);
  vec3_exports.normalize(row[2], row[2]);
  skew[1] /= scale7[2];
  skew[2] /= scale7[2];
  vec3_exports.cross(pdum3, row[1], row[2]);
  if (vec3_exports.dot(row[0], pdum3) < 0) {
    for (let i = 0; i < 3; i++) {
      scale7[i] *= -1;
      row[i][0] *= -1;
      row[i][1] *= -1;
      row[i][2] *= -1;
    }
  }
  quaternion[0] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] - row[1][1] - row[2][2], 0));
  quaternion[1] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] + row[1][1] - row[2][2], 0));
  quaternion[2] = 0.5 * Math.sqrt(Math.max(1 - row[0][0] - row[1][1] + row[2][2], 0));
  quaternion[3] = 0.5 * Math.sqrt(Math.max(1 + row[0][0] + row[1][1] + row[2][2], 0));
  if (row[2][1] > row[1][2])
    quaternion[0] = -quaternion[0];
  if (row[0][2] > row[2][0])
    quaternion[1] = -quaternion[1];
  if (row[1][0] > row[0][1])
    quaternion[2] = -quaternion[2];
  return true;
}
function normalize5(out, mat) {
  const m44 = mat[15];
  if (m44 === 0)
    return false;
  const scale7 = 1 / m44;
  for (let i = 0; i < 16; i++)
    out[i] = mat[i] * scale7;
  return true;
}
function mat3from4(out, mat4x4) {
  out[0][0] = mat4x4[0];
  out[0][1] = mat4x4[1];
  out[0][2] = mat4x4[2];
  out[1][0] = mat4x4[4];
  out[1][1] = mat4x4[5];
  out[1][2] = mat4x4[6];
  out[2][0] = mat4x4[8];
  out[2][1] = mat4x4[9];
  out[2][2] = mat4x4[10];
}
function combine(out, a, b, scale1, scale22) {
  out[0] = a[0] * scale1 + b[0] * scale22;
  out[1] = a[1] * scale1 + b[1] * scale22;
  out[2] = a[2] * scale1 + b[2] * scale22;
}

// src/shapes/AABB.ts
var AABB = class _AABB {
  constructor() {
    this.center = [0, 0, 0];
    this.halfExtents = [0, 0, 0];
    this.min = [0, 0, 0];
    this.max = [0, 0, 0];
  }
  static isEmpty(aabb) {
    return !aabb || aabb.halfExtents[0] === 0 && aabb.halfExtents[1] === 0 && aabb.halfExtents[2] === 0;
  }
  // center: vec3 = vec3.create();
  // halfExtents: vec3 = vec3.create();
  // min: vec3 = vec3.create();
  // max: vec3 = vec3.create();
  update(center, halfExtents) {
    copyVec3(this.center, center);
    copyVec3(this.halfExtents, halfExtents);
    subVec3(this.min, this.center, this.halfExtents);
    addVec3(this.max, this.center, this.halfExtents);
  }
  setMinMax(min4, max4) {
    addVec3(this.center, max4, min4);
    scaleVec3(this.center, this.center, 0.5);
    subVec3(this.halfExtents, max4, min4);
    scaleVec3(this.halfExtents, this.halfExtents, 0.5);
    copyVec3(this.min, min4);
    copyVec3(this.max, max4);
  }
  getMin() {
    return this.min;
  }
  getMax() {
    return this.max;
  }
  add(aabb) {
    if (_AABB.isEmpty(aabb)) {
      return;
    }
    if (_AABB.isEmpty(this)) {
      this.setMinMax(aabb.getMin(), aabb.getMax());
      return;
    }
    const tc = this.center;
    const tcx = tc[0];
    const tcy = tc[1];
    const tcz = tc[2];
    const th = this.halfExtents;
    const thx = th[0];
    const thy = th[1];
    const thz = th[2];
    let tminx = tcx - thx;
    let tmaxx = tcx + thx;
    let tminy = tcy - thy;
    let tmaxy = tcy + thy;
    let tminz = tcz - thz;
    let tmaxz = tcz + thz;
    const oc = aabb.center;
    const ocx = oc[0];
    const ocy = oc[1];
    const ocz = oc[2];
    const oh = aabb.halfExtents;
    const ohx = oh[0];
    const ohy = oh[1];
    const ohz = oh[2];
    const ominx = ocx - ohx;
    const omaxx = ocx + ohx;
    const ominy = ocy - ohy;
    const omaxy = ocy + ohy;
    const ominz = ocz - ohz;
    const omaxz = ocz + ohz;
    if (ominx < tminx) {
      tminx = ominx;
    }
    if (omaxx > tmaxx) {
      tmaxx = omaxx;
    }
    if (ominy < tminy) {
      tminy = ominy;
    }
    if (omaxy > tmaxy) {
      tmaxy = omaxy;
    }
    if (ominz < tminz) {
      tminz = ominz;
    }
    if (omaxz > tmaxz) {
      tmaxz = omaxz;
    }
    tc[0] = (tminx + tmaxx) * 0.5;
    tc[1] = (tminy + tmaxy) * 0.5;
    tc[2] = (tminz + tmaxz) * 0.5;
    th[0] = (tmaxx - tminx) * 0.5;
    th[1] = (tmaxy - tminy) * 0.5;
    th[2] = (tmaxz - tminz) * 0.5;
    this.min[0] = tminx;
    this.min[1] = tminy;
    this.min[2] = tminz;
    this.max[0] = tmaxx;
    this.max[1] = tmaxy;
    this.max[2] = tmaxz;
  }
  setFromTransformedAABB(aabb, m) {
    const bc = this.center;
    const br = this.halfExtents;
    const ac = aabb.center;
    const ar = aabb.halfExtents;
    const mx0 = m[0];
    const mx1 = m[4];
    const mx2 = m[8];
    const my0 = m[1];
    const my1 = m[5];
    const my2 = m[9];
    const mz0 = m[2];
    const mz1 = m[6];
    const mz2 = m[10];
    const mx0a = Math.abs(mx0);
    const mx1a = Math.abs(mx1);
    const mx2a = Math.abs(mx2);
    const my0a = Math.abs(my0);
    const my1a = Math.abs(my1);
    const my2a = Math.abs(my2);
    const mz0a = Math.abs(mz0);
    const mz1a = Math.abs(mz1);
    const mz2a = Math.abs(mz2);
    bc[0] = m[12] + mx0 * ac[0] + mx1 * ac[1] + mx2 * ac[2];
    bc[1] = m[13] + my0 * ac[0] + my1 * ac[1] + my2 * ac[2];
    bc[2] = m[14] + mz0 * ac[0] + mz1 * ac[1] + mz2 * ac[2];
    br[0] = mx0a * ar[0] + mx1a * ar[1] + mx2a * ar[2];
    br[1] = my0a * ar[0] + my1a * ar[1] + my2a * ar[2];
    br[2] = mz0a * ar[0] + mz1a * ar[1] + mz2a * ar[2];
    subVec3(this.min, bc, br);
    addVec3(this.max, bc, br);
  }
  intersects(aabb) {
    const aMax = this.getMax();
    const aMin = this.getMin();
    const bMax = aabb.getMax();
    const bMin = aabb.getMin();
    return aMin[0] <= bMax[0] && aMax[0] >= bMin[0] && aMin[1] <= bMax[1] && aMax[1] >= bMin[1] && aMin[2] <= bMax[2] && aMax[2] >= bMin[2];
  }
  intersection(aabb) {
    if (!this.intersects(aabb)) {
      return null;
    }
    const intersection = new _AABB();
    const min4 = maxVec3([0, 0, 0], this.getMin(), aabb.getMin());
    const max4 = minVec3([0, 0, 0], this.getMax(), aabb.getMax());
    intersection.setMinMax(min4, max4);
    return intersection;
  }
  // containsPoint(point: vec3) {
  //   const min = this.getMin();
  //   const max = this.getMax();
  //   return !(
  //     point[0] < min[0] ||
  //     point[0] > max[0] ||
  //     point[1] < min[1] ||
  //     point[1] > max[1] ||
  //     point[2] < min[2] ||
  //     point[2] > max[2]
  //   );
  // }
  /**
   * get n-vertex
   * @param plane plane of CullingVolume
   */
  getNegativeFarPoint(plane) {
    if (plane.pnVertexFlag === 273) {
      return copyVec3([0, 0, 0], this.min);
    } else if (plane.pnVertexFlag === 272) {
      return [this.min[0], this.min[1], this.max[2]];
    } else if (plane.pnVertexFlag === 257) {
      return [this.min[0], this.max[1], this.min[2]];
    } else if (plane.pnVertexFlag === 256) {
      return [this.min[0], this.max[1], this.max[2]];
    } else if (plane.pnVertexFlag === 17) {
      return [this.max[0], this.min[1], this.min[2]];
    } else if (plane.pnVertexFlag === 16) {
      return [this.max[0], this.min[1], this.max[2]];
    } else if (plane.pnVertexFlag === 1) {
      return [this.max[0], this.max[1], this.min[2]];
    } else {
      return [this.max[0], this.max[1], this.max[2]];
    }
  }
  /**
   * get p-vertex
   * @param plane plane of CullingVolume
   */
  getPositiveFarPoint(plane) {
    if (plane.pnVertexFlag === 273) {
      return copyVec3([0, 0, 0], this.max);
    } else if (plane.pnVertexFlag === 272) {
      return [this.max[0], this.max[1], this.min[2]];
    } else if (plane.pnVertexFlag === 257) {
      return [this.max[0], this.min[1], this.max[2]];
    } else if (plane.pnVertexFlag === 256) {
      return [this.max[0], this.min[1], this.min[2]];
    } else if (plane.pnVertexFlag === 17) {
      return [this.min[0], this.max[1], this.max[2]];
    } else if (plane.pnVertexFlag === 16) {
      return [this.min[0], this.max[1], this.min[2]];
    } else if (plane.pnVertexFlag === 1) {
      return [this.min[0], this.min[1], this.max[2]];
    } else {
      return [this.min[0], this.min[1], this.min[2]];
    }
  }
};

// src/shapes/Plane.ts
var Plane = class {
  constructor(distance5, normal) {
    this.distance = distance5 || 0;
    this.normal = normal || vec3_exports.fromValues(0, 1, 0);
    this.updatePNVertexFlag();
  }
  updatePNVertexFlag() {
    this.pnVertexFlag = (Number(this.normal[0] >= 0) << 8) + (Number(this.normal[1] >= 0) << 4) + Number(this.normal[2] >= 0);
  }
  distanceToPoint(point) {
    return vec3_exports.dot(point, this.normal) - this.distance;
  }
  normalize() {
    const invLen = 1 / vec3_exports.len(this.normal);
    vec3_exports.scale(this.normal, this.normal, invLen);
    this.distance *= invLen;
  }
  intersectsLine(start, end, point) {
    const d0 = this.distanceToPoint(start);
    const d1 = this.distanceToPoint(end);
    const t = d0 / (d0 - d1);
    const intersects = t >= 0 && t <= 1;
    if (intersects && point) {
      vec3_exports.lerp(point, start, end, t);
    }
    return intersects;
  }
};

// src/shapes/Frustum.ts
var Mask = /* @__PURE__ */ ((Mask2) => {
  Mask2[Mask2["OUTSIDE"] = 4294967295] = "OUTSIDE";
  Mask2[Mask2["INSIDE"] = 0] = "INSIDE";
  Mask2[Mask2["INDETERMINATE"] = 2147483647] = "INDETERMINATE";
  return Mask2;
})(Mask || {});
var Frustum = class {
  constructor(planes) {
    this.planes = [];
    if (planes) {
      this.planes = planes;
    } else {
      for (let i = 0; i < 6; i++) {
        this.planes.push(new Plane());
      }
    }
  }
  /**
   * extract 6 planes from projectionMatrix
   * @see http://www8.cs.umu.se/kurser/5DV051/HT12/lab/plane_extraction.pdf
   */
  extractFromVPMatrix(projectionMatrix) {
    const [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15] = projectionMatrix;
    vec3_exports.set(this.planes[0].normal, m3 - m0, m7 - m4, m11 - m8);
    this.planes[0].distance = m15 - m12;
    vec3_exports.set(this.planes[1].normal, m3 + m0, m7 + m4, m11 + m8);
    this.planes[1].distance = m15 + m12;
    vec3_exports.set(this.planes[2].normal, m3 + m1, m7 + m5, m11 + m9);
    this.planes[2].distance = m15 + m13;
    vec3_exports.set(this.planes[3].normal, m3 - m1, m7 - m5, m11 - m9);
    this.planes[3].distance = m15 - m13;
    vec3_exports.set(this.planes[4].normal, m3 - m2, m7 - m6, m11 - m10);
    this.planes[4].distance = m15 - m14;
    vec3_exports.set(this.planes[5].normal, m3 + m2, m7 + m6, m11 + m10);
    this.planes[5].distance = m15 + m14;
    this.planes.forEach((plane) => {
      plane.normalize();
      plane.updatePNVertexFlag();
    });
  }
};

// src/shapes/Point.ts
var Point = class _Point {
  constructor(x = 0, y = 0) {
    this.x = 0;
    this.y = 0;
    this.x = x;
    this.y = y;
  }
  clone() {
    return new _Point(this.x, this.y);
  }
  copyFrom(p) {
    this.x = p.x;
    this.y = p.y;
  }
};

// src/shapes/Rectangle.ts
var Rectangle = class {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.left = x;
    this.right = x + width;
    this.top = y;
    this.bottom = y + height;
  }
  toJSON() {
  }
};

// src/utils/error.ts
var ERROR_MSG_METHOD_NOT_IMPLEMENTED = "Method not implemented.";
var ERROR_MSG_USE_DOCUMENT_ELEMENT = "Use document.documentElement instead.";
var ERROR_MSG_APPEND_DESTROYED_ELEMENT = "Cannot append a destroyed element.";

// src/camera/interfaces.ts
var CameraType = /* @__PURE__ */ ((CameraType2) => {
  CameraType2[CameraType2["ORBITING"] = 0] = "ORBITING";
  CameraType2[CameraType2["EXPLORING"] = 1] = "EXPLORING";
  CameraType2[CameraType2["TRACKING"] = 2] = "TRACKING";
  return CameraType2;
})(CameraType || {});
var CameraTrackingMode = /* @__PURE__ */ ((CameraTrackingMode2) => {
  CameraTrackingMode2[CameraTrackingMode2["DEFAULT"] = 0] = "DEFAULT";
  CameraTrackingMode2[CameraTrackingMode2["ROTATIONAL"] = 1] = "ROTATIONAL";
  CameraTrackingMode2[CameraTrackingMode2["TRANSLATIONAL"] = 2] = "TRANSLATIONAL";
  CameraTrackingMode2[CameraTrackingMode2["CINEMATIC"] = 3] = "CINEMATIC";
  return CameraTrackingMode2;
})(CameraTrackingMode || {});
var CameraProjectionMode = /* @__PURE__ */ ((CameraProjectionMode2) => {
  CameraProjectionMode2[CameraProjectionMode2["ORTHOGRAPHIC"] = 0] = "ORTHOGRAPHIC";
  CameraProjectionMode2[CameraProjectionMode2["PERSPECTIVE"] = 1] = "PERSPECTIVE";
  return CameraProjectionMode2;
})(CameraProjectionMode || {});
var CameraEvent = {
  UPDATED: "updated"
};

// src/camera/Camera.ts
var MIN_DISTANCE = 2e-4;
var Camera = class {
  constructor() {
    /**
     * Clip space near Z, default to range `[-1, 1]`
     */
    this.clipSpaceNearZ = 1 /* NEGATIVE_ONE */;
    this.eventEmitter = new eventemitter3_default();
    /**
     * Matrix of camera
     */
    this.matrix = mat4_exports.create();
    /**
     * u axis +X is right
     * @see http://learnwebgl.brown37.net/07_cameras/camera_introduction.html#a-camera-definition
     */
    this.right = vec3_exports.fromValues(1, 0, 0);
    /**
     * v axis +Y is up
     */
    this.up = vec3_exports.fromValues(0, 1, 0);
    /**
     * n axis +Z is inside
     */
    this.forward = vec3_exports.fromValues(0, 0, 1);
    /**
     * Position of camera.
     */
    this.position = vec3_exports.fromValues(0, 0, 1);
    /**
     * Position of focal point.
     */
    this.focalPoint = vec3_exports.fromValues(0, 0, 0);
    /**
     * vector from focalPoint to position
     */
    this.distanceVector = vec3_exports.fromValues(0, 0, -1);
    /**
     * length(focalPoint - position)
     */
    this.distance = 1;
    /**
     * @see https://en.wikipedia.org/wiki/Azimuth
     */
    this.azimuth = 0;
    this.elevation = 0;
    this.roll = 0;
    this.relAzimuth = 0;
    this.relElevation = 0;
    this.relRoll = 0;
    /**
     * 沿 n 轴移动时，保证移动速度从快到慢
     */
    this.dollyingStep = 0;
    this.maxDistance = Infinity;
    this.minDistance = -Infinity;
    /**
     * zoom factor of the camera, default is 1
     * eg. https://threejs.org/docs/#api/en/cameras/OrthographicCamera.zoom
     */
    this.zoom = 1;
    /**
     * invert the horizontal coordinate system HCS
     */
    this.rotateWorld = false;
    /**
     * 投影矩阵参数
     */
    /**
     * field of view [0-360]
     * @see http://en.wikipedia.org/wiki/Angle_of_view
     */
    this.fov = 30;
    this.near = 0.1;
    this.far = 1e3;
    this.aspect = 1;
    this.projectionMatrix = mat4_exports.create();
    this.projectionMatrixInverse = mat4_exports.create();
    this.jitteredProjectionMatrix = void 0;
    this.enableUpdate = true;
    // protected following = undefined;
    this.type = 1 /* EXPLORING */;
    this.trackingMode = 0 /* DEFAULT */;
    this.projectionMode = 1 /* PERSPECTIVE */;
    /**
     * for culling use
     */
    this.frustum = new Frustum();
    /**
     * ortho matrix for Canvas2D & SVG
     */
    this.orthoMatrix = mat4_exports.create();
  }
  // constructor(type = CameraType.EXPLORING, trackingMode = CameraTrackingMode.DEFAULT) {
  //   this.setType(type, trackingMode);
  // }
  isOrtho() {
    return this.projectionMode === 0 /* ORTHOGRAPHIC */;
  }
  getProjectionMode() {
    return this.projectionMode;
  }
  getPerspective() {
    return this.jitteredProjectionMatrix || this.projectionMatrix;
  }
  getPerspectiveInverse() {
    return this.projectionMatrixInverse;
  }
  getFrustum() {
    return this.frustum;
  }
  getPosition() {
    return this.position;
  }
  getFocalPoint() {
    return this.focalPoint;
  }
  getDollyingStep() {
    return this.dollyingStep;
  }
  getNear() {
    return this.near;
  }
  getFar() {
    return this.far;
  }
  getZoom() {
    return this.zoom;
  }
  getOrthoMatrix() {
    return this.orthoMatrix;
  }
  getView() {
    return this.view;
  }
  setEnableUpdate(enabled) {
    this.enableUpdate = enabled;
  }
  setType(type, trackingMode) {
    this.type = type;
    if (this.type === 1 /* EXPLORING */) {
      this.setWorldRotation(true);
    } else {
      this.setWorldRotation(false);
    }
    this._getAngles();
    if (this.type === 2 /* TRACKING */ && trackingMode !== void 0) {
      this.setTrackingMode(trackingMode);
    }
    return this;
  }
  setProjectionMode(projectionMode) {
    this.projectionMode = projectionMode;
    return this;
  }
  setTrackingMode(trackingMode) {
    if (this.type !== 2 /* TRACKING */) {
      throw new Error(
        "Impossible to set a tracking mode if the camera is not of tracking type"
      );
    }
    this.trackingMode = trackingMode;
    return this;
  }
  /**
   * If flag is true, it reverses the azimuth and elevation angles.
   * Subsequent calls to rotate, setAzimuth, setElevation,
   * changeAzimuth or changeElevation will cause the inverted effect.
   * setRoll or changeRoll is not affected by this method.
   *
   * This inversion is useful when one wants to simulate that the world
   * is moving, instead of the camera.
   *
   * By default the camera angles are not reversed.
   * @param {Boolean} flag the boolean flag to reverse the angles.
   */
  setWorldRotation(flag) {
    this.rotateWorld = flag;
    this._getAngles();
    return this;
  }
  /**
   * 计算 MV 矩阵，为相机矩阵的逆矩阵
   */
  getViewTransform() {
    return mat4_exports.invert(mat4_exports.create(), this.matrix);
  }
  getWorldTransform() {
    return this.matrix;
  }
  jitterProjectionMatrix(x, y) {
    const translation = mat4_exports.fromTranslation(mat4_exports.create(), [x, y, 0]);
    this.jitteredProjectionMatrix = mat4_exports.multiply(
      mat4_exports.create(),
      translation,
      this.projectionMatrix
    );
  }
  clearJitterProjectionMatrix() {
    this.jitteredProjectionMatrix = void 0;
  }
  /**
   * 设置相机矩阵
   */
  setMatrix(matrix) {
    this.matrix = matrix;
    this._update();
    return this;
  }
  setFov(fov) {
    this.setPerspective(this.near, this.far, fov, this.aspect);
    return this;
  }
  setAspect(aspect) {
    this.setPerspective(this.near, this.far, this.fov, aspect);
    return this;
  }
  setNear(near) {
    if (this.projectionMode === 1 /* PERSPECTIVE */) {
      this.setPerspective(near, this.far, this.fov, this.aspect);
    } else {
      this.setOrthographic(
        this.left,
        this.rright,
        this.top,
        this.bottom,
        near,
        this.far
      );
    }
    return this;
  }
  setFar(far) {
    if (this.projectionMode === 1 /* PERSPECTIVE */) {
      this.setPerspective(this.near, far, this.fov, this.aspect);
    } else {
      this.setOrthographic(
        this.left,
        this.rright,
        this.top,
        this.bottom,
        this.near,
        far
      );
    }
    return this;
  }
  /**
   * Sets an offset in a larger frustum, used in PixelPicking
   */
  setViewOffset(fullWidth, fullHeight, x, y, width, height) {
    this.aspect = fullWidth / fullHeight;
    if (this.view === void 0) {
      this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      };
    }
    this.view.enabled = true;
    this.view.fullWidth = fullWidth;
    this.view.fullHeight = fullHeight;
    this.view.offsetX = x;
    this.view.offsetY = y;
    this.view.width = width;
    this.view.height = height;
    if (this.projectionMode === 1 /* PERSPECTIVE */) {
      this.setPerspective(this.near, this.far, this.fov, this.aspect);
    } else {
      this.setOrthographic(
        this.left,
        this.rright,
        this.top,
        this.bottom,
        this.near,
        this.far
      );
    }
    return this;
  }
  clearViewOffset() {
    if (this.view !== void 0) {
      this.view.enabled = false;
    }
    if (this.projectionMode === 1 /* PERSPECTIVE */) {
      this.setPerspective(this.near, this.far, this.fov, this.aspect);
    } else {
      this.setOrthographic(
        this.left,
        this.rright,
        this.top,
        this.bottom,
        this.near,
        this.far
      );
    }
    return this;
  }
  setZoom(zoom) {
    this.zoom = zoom;
    if (this.projectionMode === 0 /* ORTHOGRAPHIC */) {
      this.setOrthographic(
        this.left,
        this.rright,
        this.top,
        this.bottom,
        this.near,
        this.far
      );
    } else if (this.projectionMode === 1 /* PERSPECTIVE */) {
      this.setPerspective(this.near, this.far, this.fov, this.aspect);
    }
    return this;
  }
  /**
   * Zoom by specified point in viewport coordinates.
   */
  setZoomByViewportPoint(zoom, viewportPoint) {
    const { x: ox, y: oy } = this.canvas.viewport2Canvas({
      x: viewportPoint[0],
      y: viewportPoint[1]
    });
    const roll = this.roll;
    this.rotate(0, 0, -roll);
    this.setPosition(ox, oy);
    this.setFocalPoint(ox, oy);
    this.setZoom(zoom);
    this.rotate(0, 0, roll);
    const { x: cx, y: cy } = this.canvas.viewport2Canvas({
      x: viewportPoint[0],
      y: viewportPoint[1]
    });
    const dvec = vec3_exports.fromValues(cx - ox, cy - oy, 0);
    const dx = vec3_exports.dot(dvec, this.right) / vec3_exports.length(this.right);
    const dy = vec3_exports.dot(dvec, this.up) / vec3_exports.length(this.up);
    this.pan(-dx, -dy);
    return this;
  }
  setPerspective(near, far, fov, aspect) {
    var _a;
    this.projectionMode = 1 /* PERSPECTIVE */;
    this.fov = fov;
    this.near = near;
    this.far = far;
    this.aspect = aspect;
    let top = this.near * Math.tan(deg2rad(0.5 * this.fov)) / this.zoom;
    let height = 2 * top;
    let width = this.aspect * height;
    let left = -0.5 * width;
    if ((_a = this.view) == null ? void 0 : _a.enabled) {
      const fullWidth = this.view.fullWidth;
      const fullHeight = this.view.fullHeight;
      left += this.view.offsetX * width / fullWidth;
      top -= this.view.offsetY * height / fullHeight;
      width *= this.view.width / fullWidth;
      height *= this.view.height / fullHeight;
    }
    makePerspective(
      this.projectionMatrix,
      left,
      left + width,
      top,
      top - height,
      near,
      this.far,
      this.clipSpaceNearZ === 0 /* ZERO */
    );
    mat4_exports.scale(
      this.projectionMatrix,
      this.projectionMatrix,
      vec3_exports.fromValues(1, -1, 1)
    );
    mat4_exports.invert(this.projectionMatrixInverse, this.projectionMatrix);
    this.triggerUpdate();
    return this;
  }
  setOrthographic(l, r, t, b, near, far) {
    var _a;
    this.projectionMode = 0 /* ORTHOGRAPHIC */;
    this.rright = r;
    this.left = l;
    this.top = t;
    this.bottom = b;
    this.near = near;
    this.far = far;
    const dx = (this.rright - this.left) / (2 * this.zoom);
    const dy = (this.top - this.bottom) / (2 * this.zoom);
    const cx = (this.rright + this.left) / 2;
    const cy = (this.top + this.bottom) / 2;
    let left = cx - dx;
    let right = cx + dx;
    let top = cy + dy;
    let bottom = cy - dy;
    if ((_a = this.view) == null ? void 0 : _a.enabled) {
      const scaleW = (this.rright - this.left) / this.view.fullWidth / this.zoom;
      const scaleH = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      left += scaleW * this.view.offsetX;
      right = left + scaleW * this.view.width;
      top -= scaleH * this.view.offsetY;
      bottom = top - scaleH * this.view.height;
    }
    if (this.clipSpaceNearZ === 1 /* NEGATIVE_ONE */) {
      mat4_exports.ortho(this.projectionMatrix, left, right, bottom, top, near, far);
    } else {
      mat4_exports.orthoZO(this.projectionMatrix, left, right, bottom, top, near, far);
    }
    mat4_exports.scale(
      this.projectionMatrix,
      this.projectionMatrix,
      vec3_exports.fromValues(1, -1, 1)
    );
    mat4_exports.invert(this.projectionMatrixInverse, this.projectionMatrix);
    this._getOrthoMatrix();
    this.triggerUpdate();
    return this;
  }
  /**
   * Move the camera in world coordinates.
   * It will keep looking at the current focal point.
   *
   * support scalars or vectors.
   * @example
   * setPosition(1, 2, 3);
   * setPosition([1, 2, 3]);
   */
  setPosition(x, y = this.position[1], z = this.position[2]) {
    const position = createVec3(x, y, z);
    this._setPosition(position);
    this.setFocalPoint(this.focalPoint);
    this.triggerUpdate();
    return this;
  }
  /**
   * Sets the focal point of this camera in world coordinates.
   *
   * support scalars or vectors.
   * @example
   * setFocalPoint(1, 2, 3);
   * setFocalPoint([1, 2, 3]);
   */
  setFocalPoint(x, y = this.focalPoint[1], z = this.focalPoint[2]) {
    let up = vec3_exports.fromValues(0, 1, 0);
    this.focalPoint = createVec3(x, y, z);
    if (this.trackingMode === 3 /* CINEMATIC */) {
      const d = vec3_exports.subtract(vec3_exports.create(), this.focalPoint, this.position);
      x = d[0];
      y = d[1];
      z = d[2];
      const r = vec3_exports.length(d);
      const el = rad2deg(Math.asin(y / r));
      const az = 90 + rad2deg(Math.atan2(z, x));
      const m = mat4_exports.create();
      mat4_exports.rotateY(m, m, deg2rad(az));
      mat4_exports.rotateX(m, m, deg2rad(el));
      up = vec3_exports.transformMat4(vec3_exports.create(), [0, 1, 0], m);
    }
    mat4_exports.invert(
      this.matrix,
      mat4_exports.lookAt(mat4_exports.create(), this.position, this.focalPoint, up)
    );
    this._getAxes();
    this._getDistance();
    this._getAngles();
    this.triggerUpdate();
    return this;
  }
  getDistance() {
    return this.distance;
  }
  getDistanceVector() {
    return this.distanceVector;
  }
  /**
   * Moves the camera towards/from the focal point.
   */
  setDistance(d) {
    if (this.distance === d || d < 0) {
      return this;
    }
    this.distance = d;
    if (this.distance < MIN_DISTANCE) {
      this.distance = MIN_DISTANCE;
    }
    this.dollyingStep = this.distance / 100;
    const pos = vec3_exports.create();
    d = this.distance;
    const n = this.forward;
    const f = this.focalPoint;
    pos[0] = d * n[0] + f[0];
    pos[1] = d * n[1] + f[1];
    pos[2] = d * n[2] + f[2];
    this._setPosition(pos);
    this.triggerUpdate();
    return this;
  }
  setMaxDistance(d) {
    this.maxDistance = d;
    return this;
  }
  setMinDistance(d) {
    this.minDistance = d;
    return this;
  }
  /**
   * 设置相机方位角，不同相机模式下需要重新计算相机位置或者是视点位置
   * the azimuth in degrees
   */
  setAzimuth(az) {
    this.azimuth = getAngle2(az);
    this.computeMatrix();
    this._getAxes();
    if (this.type === 0 /* ORBITING */ || this.type === 1 /* EXPLORING */) {
      this._getPosition();
    } else if (this.type === 2 /* TRACKING */) {
      this._getFocalPoint();
    }
    this.triggerUpdate();
    return this;
  }
  getAzimuth() {
    return this.azimuth;
  }
  /**
   * 设置相机方位角，不同相机模式下需要重新计算相机位置或者是视点位置
   */
  setElevation(el) {
    this.elevation = getAngle2(el);
    this.computeMatrix();
    this._getAxes();
    if (this.type === 0 /* ORBITING */ || this.type === 1 /* EXPLORING */) {
      this._getPosition();
    } else if (this.type === 2 /* TRACKING */) {
      this._getFocalPoint();
    }
    this.triggerUpdate();
    return this;
  }
  getElevation() {
    return this.elevation;
  }
  /**
   * 设置相机方位角，不同相机模式下需要重新计算相机位置或者是视点位置
   */
  setRoll(angle3) {
    this.roll = getAngle2(angle3);
    this.computeMatrix();
    this._getAxes();
    if (this.type === 0 /* ORBITING */ || this.type === 1 /* EXPLORING */) {
      this._getPosition();
    } else if (this.type === 2 /* TRACKING */) {
      this._getFocalPoint();
    }
    this.triggerUpdate();
    return this;
  }
  getRoll() {
    return this.roll;
  }
  /**
   * 根据相机矩阵重新计算各种相机参数
   */
  _update() {
    this._getAxes();
    this._getPosition();
    this._getDistance();
    this._getAngles();
    this._getOrthoMatrix();
    this.triggerUpdate();
  }
  /**
   * 计算相机矩阵
   */
  computeMatrix() {
    const rotZ = quat_exports.setAxisAngle(
      quat_exports.create(),
      [0, 0, 1],
      deg2rad(this.roll)
    );
    mat4_exports.identity(this.matrix);
    const rotX = quat_exports.setAxisAngle(
      quat_exports.create(),
      [1, 0, 0],
      deg2rad(
        (this.rotateWorld && this.type !== 2 /* TRACKING */ || this.type === 2 /* TRACKING */ ? 1 : -1) * this.elevation
      )
    );
    const rotY = quat_exports.setAxisAngle(
      quat_exports.create(),
      [0, 1, 0],
      deg2rad(
        (this.rotateWorld && this.type !== 2 /* TRACKING */ || this.type === 2 /* TRACKING */ ? 1 : -1) * this.azimuth
      )
    );
    let rotQ = quat_exports.multiply(quat_exports.create(), rotY, rotX);
    rotQ = quat_exports.multiply(quat_exports.create(), rotQ, rotZ);
    const rotMatrix = mat4_exports.fromQuat(mat4_exports.create(), rotQ);
    if (this.type === 0 /* ORBITING */ || this.type === 1 /* EXPLORING */) {
      mat4_exports.translate(this.matrix, this.matrix, this.focalPoint);
      mat4_exports.multiply(this.matrix, this.matrix, rotMatrix);
      mat4_exports.translate(this.matrix, this.matrix, [0, 0, this.distance]);
    } else if (this.type === 2 /* TRACKING */) {
      mat4_exports.translate(this.matrix, this.matrix, this.position);
      mat4_exports.multiply(this.matrix, this.matrix, rotMatrix);
    }
  }
  /**
   * Sets the camera position in the camera matrix
   */
  _setPosition(x, y, z) {
    this.position = createVec3(x, y, z);
    const m = this.matrix;
    m[12] = this.position[0];
    m[13] = this.position[1];
    m[14] = this.position[2];
    m[15] = 1;
    this._getOrthoMatrix();
  }
  /**
   * Recalculates axes based on the current matrix
   */
  _getAxes() {
    vec3_exports.copy(
      this.right,
      createVec3(vec4_exports.transformMat4(vec4_exports.create(), [1, 0, 0, 0], this.matrix))
    );
    vec3_exports.copy(
      this.up,
      createVec3(vec4_exports.transformMat4(vec4_exports.create(), [0, 1, 0, 0], this.matrix))
    );
    vec3_exports.copy(
      this.forward,
      createVec3(vec4_exports.transformMat4(vec4_exports.create(), [0, 0, 1, 0], this.matrix))
    );
    vec3_exports.normalize(this.right, this.right);
    vec3_exports.normalize(this.up, this.up);
    vec3_exports.normalize(this.forward, this.forward);
  }
  /**
   * Recalculates euler angles based on the current state
   */
  _getAngles() {
    const x = this.distanceVector[0];
    const y = this.distanceVector[1];
    const z = this.distanceVector[2];
    const r = vec3_exports.length(this.distanceVector);
    if (r === 0) {
      this.elevation = 0;
      this.azimuth = 0;
      return;
    }
    if (this.type === 2 /* TRACKING */) {
      this.elevation = rad2deg(Math.asin(y / r));
      this.azimuth = rad2deg(Math.atan2(-x, -z));
    } else {
      if (this.rotateWorld) {
        this.elevation = rad2deg(Math.asin(y / r));
        this.azimuth = rad2deg(Math.atan2(-x, -z));
      } else {
        this.elevation = -rad2deg(Math.asin(y / r));
        this.azimuth = -rad2deg(Math.atan2(-x, -z));
      }
    }
  }
  /**
   * 重新计算相机位置，只有 ORBITING 模式相机位置才会发生变化
   */
  _getPosition() {
    vec3_exports.copy(
      this.position,
      createVec3(vec4_exports.transformMat4(vec4_exports.create(), [0, 0, 0, 1], this.matrix))
    );
    this._getDistance();
  }
  /**
   * 重新计算视点，只有 TRACKING 模式视点才会发生变化
   */
  _getFocalPoint() {
    vec3_exports.transformMat3(
      this.distanceVector,
      [0, 0, -this.distance],
      mat3_exports.fromMat4(mat3_exports.create(), this.matrix)
    );
    vec3_exports.add(this.focalPoint, this.position, this.distanceVector);
    this._getDistance();
  }
  /**
   * 重新计算视距
   */
  _getDistance() {
    this.distanceVector = vec3_exports.subtract(
      vec3_exports.create(),
      this.focalPoint,
      this.position
    );
    this.distance = vec3_exports.length(this.distanceVector);
    this.dollyingStep = this.distance / 100;
  }
  _getOrthoMatrix() {
    if (this.projectionMode !== 0 /* ORTHOGRAPHIC */) {
      return;
    }
    const position = this.position;
    const rotZ = quat_exports.setAxisAngle(
      quat_exports.create(),
      [0, 0, 1],
      -this.roll * Math.PI / 180
    );
    mat4_exports.fromRotationTranslationScaleOrigin(
      this.orthoMatrix,
      rotZ,
      vec3_exports.fromValues(
        (this.rright - this.left) / 2 - position[0],
        (this.top - this.bottom) / 2 - position[1],
        0
      ),
      vec3_exports.fromValues(this.zoom, this.zoom, 1),
      position
    );
  }
  triggerUpdate() {
    if (this.enableUpdate) {
      const viewMatrix = this.getViewTransform();
      const vpMatrix = mat4_exports.multiply(
        mat4_exports.create(),
        this.getPerspective(),
        viewMatrix
      );
      this.getFrustum().extractFromVPMatrix(vpMatrix);
      this.eventEmitter.emit(CameraEvent.UPDATED);
    }
  }
  rotate(azimuth, elevation, roll) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  pan(tx, ty) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  dolly(value) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  createLandmark(name, params) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  gotoLandmark(name, options) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  cancelLandmarkAnimation() {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
};

// src/utils/memoize.ts
function memoize(func, resolver) {
  return func;
}
memoize.Cache = Map;

// src/css/cssom/types.ts
var UnitType = /* @__PURE__ */ ((UnitType2) => {
  UnitType2[UnitType2["kUnknown"] = 0] = "kUnknown";
  UnitType2[UnitType2["kNumber"] = 1] = "kNumber";
  UnitType2[UnitType2["kPercentage"] = 2] = "kPercentage";
  UnitType2[UnitType2["kEms"] = 3] = "kEms";
  UnitType2[UnitType2["kPixels"] = 4] = "kPixels";
  UnitType2[UnitType2["kRems"] = 5] = "kRems";
  UnitType2[UnitType2["kDegrees"] = 6] = "kDegrees";
  UnitType2[UnitType2["kRadians"] = 7] = "kRadians";
  UnitType2[UnitType2["kGradians"] = 8] = "kGradians";
  UnitType2[UnitType2["kTurns"] = 9] = "kTurns";
  UnitType2[UnitType2["kMilliseconds"] = 10] = "kMilliseconds";
  UnitType2[UnitType2["kSeconds"] = 11] = "kSeconds";
  UnitType2[UnitType2["kInteger"] = 12] = "kInteger";
  return UnitType2;
})(UnitType || {});

// src/css/cssom/CSSStyleValue.ts
var data = [
  {
    name: "em",
    unit_type: 3 /* kEms */
  },
  // {
  //   name: 'ex',
  //   unit_type: UnitType.kExs,
  // },
  {
    name: "px",
    unit_type: 4 /* kPixels */
  },
  // {
  //   name: "cm",
  //   unit_type: UnitType.kCentimeters,
  // },
  // {
  //   name: "mm",
  //   unit_type: UnitType.kMillimeters,
  // },
  // {
  //   name: "q",
  //   unit_type: UnitType.kQuarterMillimeters,
  // },
  // {
  //   name: "in",
  //   unit_type: UnitType.kInches,
  // },
  // {
  //   name: "pt",
  //   unit_type: UnitType.kPoints,
  // },
  // {
  //   name: "pc",
  //   unit_type: UnitType.kPicas,
  // },
  {
    name: "deg",
    unit_type: 6 /* kDegrees */
  },
  {
    name: "rad",
    unit_type: 7 /* kRadians */
  },
  {
    name: "grad",
    unit_type: 8 /* kGradians */
  },
  {
    name: "ms",
    unit_type: 10 /* kMilliseconds */
  },
  {
    name: "s",
    unit_type: 11 /* kSeconds */
  },
  // {
  //   name: "hz",
  //   unit_type: UnitType.kHertz,
  // },
  // {
  //   name: "khz",
  //   unit_type: UnitType.kKilohertz,
  // },
  // {
  //   name: "dpi",
  //   unit_type: "kDotsPerInch",
  // },
  // {
  //   name: "dpcm",
  //   unit_type: "kDotsPerCentimeter",
  // },
  // {
  //   name: "dppx",
  //   unit_type: "kDotsPerPixel",
  // },
  // {
  //   name: "x",
  //   unit_type: "kDotsPerPixel",
  // },
  // {
  //   name: "vw",
  //   unit_type: "kViewportWidth",
  // },
  // {
  //   name: "vh",
  //   unit_type: "kViewportHeight",
  // },
  // {
  //   name: "vi",
  //   unit_type: "kViewportInlineSize",
  // },
  // {
  //   name: "vb",
  //   unit_type: "kViewportBlockSize",
  // },
  // {
  //   name: "vmin",
  //   unit_type: UnitType.kViewportMin,
  // },
  // {
  //   name: "vmax",
  //   unit_type: UnitType.kViewportMax,
  // },
  // {
  //   name: "svw",
  //   unit_type: "kSmallViewportWidth",
  // },
  // {
  //   name: "svh",
  //   unit_type: "kSmallViewportHeight",
  // },
  // {
  //   name: "svi",
  //   unit_type: "kSmallViewportInlineSize",
  // },
  // {
  //   name: "svb",
  //   unit_type: "kSmallViewportBlockSize",
  // },
  // {
  //   name: "svmin",
  //   unit_type: "kSmallViewportMin",
  // },
  // {
  //   name: "svmax",
  //   unit_type: "kSmallViewportMax",
  // },
  // {
  //   name: "lvw",
  //   unit_type: "kLargeViewportWidth",
  // },
  // {
  //   name: "lvh",
  //   unit_type: "kLargeViewportHeight",
  // },
  // {
  //   name: "lvi",
  //   unit_type: "kLargeViewportInlineSize",
  // },
  // {
  //   name: "lvb",
  //   unit_type: "kLargeViewportBlockSize",
  // },
  // {
  //   name: "lvmin",
  //   unit_type: UnitType.kLargeViewportMin,
  // },
  // {
  //   name: "lvmax",
  //   unit_type: UnitType.kLargeViewportMax,
  // },
  // {
  //   name: "dvw",
  //   unit_type: UnitType.kDynamicViewportWidth,
  // },
  // {
  //   name: "dvh",
  //   unit_type: UnitType.kDynamicViewportHeight,
  // },
  // {
  //   name: "dvi",
  //   unit_type: UnitType.kDynamicViewportInlineSize,
  // },
  // {
  //   name: "dvb",
  //   unit_type: UnitType.kDynamicViewportBlockSize,
  // },
  // {
  //   name: "dvmin",
  //   unit_type: UnitType.kDynamicViewportMin,
  // },
  // {
  //   name: "dvmax",
  //   unit_type: UnitType.kDynamicViewportMax,
  // },
  // {
  //   name: "cqw",
  //   unit_type: UnitType.kContainerWidth,
  // },
  // {
  //   name: "cqh",
  //   unit_type: UnitType.kContainerHeight,
  // },
  // {
  //   name: "cqi",
  //   unit_type: UnitType.kContainerInlineSize,
  // },
  // {
  //   name: "cqb",
  //   unit_type: UnitType.kContainerBlockSize,
  // },
  // {
  //   name: "cqmin",
  //   unit_type: UnitType.kContainerMin,
  // },
  // {
  //   name: "cqmax",
  //   unit_type: UnitType.kContainerMax,
  // },
  {
    name: "rem",
    unit_type: 5 /* kRems */
  },
  // {
  //   name: 'fr',
  //   unit_type: UnitType.kFraction,
  // },
  {
    name: "turn",
    unit_type: 9 /* kTurns */
  }
  // {
  //   name: 'ch',
  //   unit_type: UnitType.kChs,
  // },
  // {
  //   name: '__qem',
  //   unit_type: UnitType.kQuirkyEms,
  // },
];
var stringToUnitType = (name) => {
  return data.find((item) => item.name === name).unit_type;
};
var unitFromName = (name) => {
  if (!name) {
    return 0 /* kUnknown */;
  }
  if (name === "number") {
    return 1 /* kNumber */;
  }
  if (name === "percent" || name === "%") {
    return 2 /* kPercentage */;
  }
  return stringToUnitType(name);
};
var unitTypeToUnitCategory = (type) => {
  switch (type) {
    case 1 /* kNumber */:
    case 12 /* kInteger */:
      return 0 /* kUNumber */;
    case 2 /* kPercentage */:
      return 1 /* kUPercent */;
    case 4 /* kPixels */:
      return 2 /* kULength */;
    case 10 /* kMilliseconds */:
    case 11 /* kSeconds */:
      return 4 /* kUTime */;
    case 6 /* kDegrees */:
    case 7 /* kRadians */:
    case 8 /* kGradians */:
    case 9 /* kTurns */:
      return 3 /* kUAngle */;
    default:
      return 5 /* kUOther */;
  }
};
var canonicalUnitTypeForCategory = (category) => {
  switch (category) {
    case 0 /* kUNumber */:
      return 1 /* kNumber */;
    case 2 /* kULength */:
      return 4 /* kPixels */;
    case 1 /* kUPercent */:
      return 2 /* kPercentage */;
    case 4 /* kUTime */:
      return 11 /* kSeconds */;
    case 3 /* kUAngle */:
      return 6 /* kDegrees */;
    default:
      return 0 /* kUnknown */;
  }
};
var conversionToCanonicalUnitsScaleFactor = (unit_type) => {
  let factor = 1;
  switch (unit_type) {
    case 4 /* kPixels */:
    case 6 /* kDegrees */:
    case 11 /* kSeconds */:
      break;
    case 10 /* kMilliseconds */:
      factor = 1e-3;
      break;
    case 7 /* kRadians */:
      factor = 180 / Math.PI;
      break;
    case 8 /* kGradians */:
      factor = 0.9;
      break;
    case 9 /* kTurns */:
      factor = 360;
      break;
    default:
      break;
  }
  return factor;
};
var unitTypeToString = (type) => {
  switch (type) {
    case 1 /* kNumber */:
    case 12 /* kInteger */:
      return "";
    case 2 /* kPercentage */:
      return "%";
    case 3 /* kEms */:
      return "em";
    case 5 /* kRems */:
      return "rem";
    case 4 /* kPixels */:
      return "px";
    case 6 /* kDegrees */:
      return "deg";
    case 7 /* kRadians */:
      return "rad";
    case 8 /* kGradians */:
      return "grad";
    case 10 /* kMilliseconds */:
      return "ms";
    case 11 /* kSeconds */:
      return "s";
    case 9 /* kTurns */:
      return "turn";
    default:
      break;
  }
  return "";
};
var CSSStyleValue = class {
  // static parse(propertyName: string, value: string): CSSStyleValue {
  //   return parseCSSStyleValue(propertyName, value)[0];
  // }
  // static parseAll(propertyName: string, value: string): CSSStyleValue[] {
  //   return parseCSSStyleValue(propertyName, value);
  // }
  static isAngle(unit) {
    return unit === 6 /* kDegrees */ || unit === 7 /* kRadians */ || unit === 8 /* kGradians */ || unit === 9 /* kTurns */;
  }
  // static isViewportPercentageLength(type: UnitType) {
  //   return type >= UnitType.kViewportWidth && type <= UnitType.kDynamicViewportMax;
  // }
  // static isContainerPercentageLength(type: UnitType) {
  //   return type >= UnitType.kContainerWidth && type <= UnitType.kContainerMax;
  // }
  static isLength(type) {
    return type >= 3 /* kEms */ && type < 6 /* kDegrees */;
  }
  static isRelativeUnit(type) {
    return type === 2 /* kPercentage */ || type === 3 /* kEms */ || // type === UnitType.kExs ||
    type === 5 /* kRems */;
  }
  static isTime(unit) {
    return unit === 11 /* kSeconds */ || unit === 10 /* kMilliseconds */;
  }
  // protected abstract toCSSValue(): CSSValue;
  toString() {
    return this.buildCSSText(1 /* kNo */, 1 /* kNo */, "");
  }
  isNumericValue() {
    return this.getType() >= 3 /* kUnitType */ && this.getType() <= 10 /* kClampType */;
  }
};

// src/css/cssom/CSSColorValue.ts
var CSSColorValue = class extends CSSStyleValue {
  constructor(colorSpace) {
    super();
    this.colorSpace = colorSpace;
  }
  getType() {
    return 14 /* kColorType */;
  }
  // buildCSSText(n: Nested, p: ParenLess, result: string): string {
  //   let text = '';
  //   if (this.colorSpace === 'rgb') {
  //     text = `rgba(${this.channels.join(',')},${this.alpha})`;
  //   }
  //   return (result += text);
  // }
  /**
   * @see https://drafts.css-houdini.org/css-typed-om-1/#dom-csscolorvalue-to
   */
  to(colorSpace) {
    return this;
  }
};

// src/css/cssom/CSSGradientValue.ts
var GradientType = /* @__PURE__ */ ((GradientType2) => {
  GradientType2[GradientType2["Constant"] = 0] = "Constant";
  GradientType2[GradientType2["LinearGradient"] = 1] = "LinearGradient";
  GradientType2[GradientType2["RadialGradient"] = 2] = "RadialGradient";
  return GradientType2;
})(GradientType || {});
var CSSGradientValue = class _CSSGradientValue extends CSSStyleValue {
  constructor(type, value) {
    super();
    this.type = type;
    this.value = value;
  }
  clone() {
    return new _CSSGradientValue(this.type, this.value);
  }
  buildCSSText(n, p, result) {
    return result;
  }
  getType() {
    return 14 /* kColorType */;
  }
};

// src/css/cssom/CSSKeywordValue.ts
var CSSKeywordValue = class _CSSKeywordValue extends CSSStyleValue {
  constructor(value) {
    super();
    this.value = value;
  }
  clone() {
    return new _CSSKeywordValue(this.value);
  }
  getType() {
    return 2 /* kKeywordType */;
  }
  buildCSSText(n, p, result) {
    return result + this.value;
  }
};

// src/utils/string.ts
var camelCase = memoize((str7 = "") => {
  return str7.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
});
var kebabize = (str7) => {
  return str7.split("").map((letter, idx) => {
    return letter.toUpperCase() === letter ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}` : letter;
  }).join("");
};

// src/utils/assert.ts
function DCHECK(bool) {
  if (!bool) {
    throw new Error();
  }
}
function isFunction(func) {
  return typeof func === "function";
}
function isSymbol(value) {
  return typeof value === "symbol";
}
var definedProps = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== void 0));
var FORMAT_ATTR_MAP = {
  d: {
    alias: "path"
  },
  strokeDasharray: {
    alias: "lineDash"
  },
  strokeWidth: {
    alias: "lineWidth"
  },
  textAnchor: {
    alias: "textAlign"
  },
  src: {
    alias: "img"
  }
};
var formatAttributeName = memoize((name) => {
  let attributeName = camelCase(name);
  const map = FORMAT_ATTR_MAP[attributeName];
  attributeName = (map == null ? void 0 : map.alias) || attributeName;
  return attributeName;
});

// src/css/cssom/CSSNumericValue.ts
var formatInfinityOrNaN = (number, suffix = "") => {
  let result = "";
  if (!Number.isFinite(number)) {
    if (number > 0)
      result = "infinity";
    else
      result = "-infinity";
  } else {
    DCHECK(Number.isNaN(number));
    result = "NaN";
  }
  return result += suffix;
};
var toCanonicalUnit = (unit) => {
  return canonicalUnitTypeForCategory(unitTypeToUnitCategory(unit));
};
var CSSUnitValue = class _CSSUnitValue extends CSSStyleValue {
  constructor(value, unitOrName = 1 /* kNumber */) {
    super();
    let unit;
    if (typeof unitOrName === "string") {
      unit = unitFromName(unitOrName);
    } else {
      unit = unitOrName;
    }
    this.unit = unit;
    this.value = value;
  }
  clone() {
    return new _CSSUnitValue(this.value, this.unit);
  }
  equals(other) {
    const other_unit_value = other;
    return this.value === other_unit_value.value && this.unit === other_unit_value.unit;
  }
  getType() {
    return 3 /* kUnitType */;
  }
  convertTo(target_unit) {
    if (this.unit === target_unit) {
      return new _CSSUnitValue(this.value, this.unit);
    }
    const canonical_unit = toCanonicalUnit(this.unit);
    if (canonical_unit !== toCanonicalUnit(target_unit) || canonical_unit === 0 /* kUnknown */) {
      return null;
    }
    const scale_factor = conversionToCanonicalUnitsScaleFactor(this.unit) / conversionToCanonicalUnitsScaleFactor(target_unit);
    return new _CSSUnitValue(this.value * scale_factor, target_unit);
  }
  buildCSSText(n, p, result) {
    let text;
    switch (this.unit) {
      case 0 /* kUnknown */:
        break;
      case 12 /* kInteger */:
        text = Number(this.value).toFixed(0);
        break;
      case 1 /* kNumber */:
      case 2 /* kPercentage */:
      case 3 /* kEms */:
      case 5 /* kRems */:
      case 4 /* kPixels */:
      case 6 /* kDegrees */:
      case 7 /* kRadians */:
      case 8 /* kGradians */:
      case 10 /* kMilliseconds */:
      case 11 /* kSeconds */:
      case 9 /* kTurns */: {
        const kMinInteger = -999999;
        const kMaxInteger = 999999;
        const value = this.value;
        const unit = unitTypeToString(this.unit);
        if (value < kMinInteger || value > kMaxInteger) {
          const unit2 = unitTypeToString(this.unit);
          if (!Number.isFinite(value) || Number.isNaN(value)) {
            text = formatInfinityOrNaN(value, unit2);
          } else {
            text = value + (unit2 || "");
          }
        } else {
          text = `${value}${unit}`;
        }
      }
    }
    result += text;
    return result;
  }
};
var Opx = new CSSUnitValue(0, "px");
var Lpx = new CSSUnitValue(1, "px");
var Odeg = new CSSUnitValue(0, "deg");

// src/css/cssom/CSSRGB.ts
var CSSRGB = class _CSSRGB extends CSSColorValue {
  constructor(r, g, b, alpha = 1, isNone = false) {
    super("rgb");
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;
    this.isNone = isNone;
  }
  clone() {
    return new _CSSRGB(this.r, this.g, this.b, this.alpha);
  }
  buildCSSText(n, p, result) {
    return result + `rgba(${this.r},${this.g},${this.b},${this.alpha})`;
  }
};

// src/css/CSSStyleValuePool.ts
var unsetKeywordValue = new CSSKeywordValue("unset");
var initialKeywordValue = new CSSKeywordValue("initial");
var inheritKeywordValue = new CSSKeywordValue("inherit");
var keywordCache = {
  "": unsetKeywordValue,
  unset: unsetKeywordValue,
  initial: initialKeywordValue,
  inherit: inheritKeywordValue
};
var getOrCreateKeyword = (name) => {
  if (!keywordCache[name]) {
    keywordCache[name] = new CSSKeywordValue(name);
  }
  return keywordCache[name];
};
var noneColor = new CSSRGB(0, 0, 0, 0, true);
var transparentColor = new CSSRGB(0, 0, 0, 0);
var getOrCreateRGBA = memoize(
  (r, g, b, a) => {
    return new CSSRGB(r, g, b, a);
  },
  (r, g, b, a) => {
    return `rgba(${r},${g},${b},${a})`;
  }
);
var getOrCreateUnitValue = (value, unitOrName = 1 /* kNumber */) => {
  return new CSSUnitValue(value, unitOrName);
};
var PECENTAGE_50 = new CSSUnitValue(50, "%");

// src/components/Cullable.ts
var Strategy = /* @__PURE__ */ ((Strategy2) => {
  Strategy2[Strategy2["Standard"] = 0] = "Standard";
  return Strategy2;
})(Strategy || {});

// src/components/Sortable.ts
var SortReason = /* @__PURE__ */ ((SortReason2) => {
  SortReason2[SortReason2["ADDED"] = 0] = "ADDED";
  SortReason2[SortReason2["REMOVED"] = 1] = "REMOVED";
  SortReason2[SortReason2["Z_INDEX_CHANGED"] = 2] = "Z_INDEX_CHANGED";
  return SortReason2;
})(SortReason || {});

// src/display-objects/constants.ts
var EMPTY_PARSED_PATH = {
  absolutePath: [],
  hasArc: false,
  segments: [],
  polygons: [],
  polylines: [],
  curve: null,
  totalLength: 0,
  rect: new Rectangle(0, 0, 0, 0)
};

// src/css/interfaces.ts
var PropertySyntax = /* @__PURE__ */ ((PropertySyntax2) => {
  PropertySyntax2["COORDINATE"] = "<coordinate>";
  PropertySyntax2["COLOR"] = "<color>";
  PropertySyntax2["PAINT"] = "<paint>";
  PropertySyntax2["NUMBER"] = "<number>";
  PropertySyntax2["ANGLE"] = "<angle>";
  PropertySyntax2["OPACITY_VALUE"] = "<opacity-value>";
  PropertySyntax2["SHADOW_BLUR"] = "<shadow-blur>";
  PropertySyntax2["LENGTH"] = "<length>";
  PropertySyntax2["PERCENTAGE"] = "<percentage>";
  PropertySyntax2["LENGTH_PERCENTAGE"] = "<length> | <percentage>";
  PropertySyntax2["LENGTH_PERCENTAGE_12"] = "[<length> | <percentage>]{1,2}";
  PropertySyntax2["LENGTH_PERCENTAGE_14"] = "[<length> | <percentage>]{1,4}";
  PropertySyntax2["LIST_OF_POINTS"] = "<list-of-points>";
  PropertySyntax2["PATH"] = "<path>";
  PropertySyntax2["FILTER"] = "<filter>";
  PropertySyntax2["Z_INDEX"] = "<z-index>";
  PropertySyntax2["OFFSET_DISTANCE"] = "<offset-distance>";
  PropertySyntax2["DEFINED_PATH"] = "<defined-path>";
  PropertySyntax2["MARKER"] = "<marker>";
  PropertySyntax2["TRANSFORM"] = "<transform>";
  PropertySyntax2["TRANSFORM_ORIGIN"] = "<transform-origin>";
  PropertySyntax2["TEXT"] = "<text>";
  PropertySyntax2["TEXT_TRANSFORM"] = "<text-transform>";
  return PropertySyntax2;
})(PropertySyntax || {});

// node_modules/d3-color/src/define.js
function define_default(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition)
    prototype[key] = definition[key];
  return prototype;
}

// node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$");
var reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$");
var reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$");
var reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$");
var reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$");
var reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0)
    r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0)
    h = s = l = NaN;
  else if (l <= 0 || l >= 1)
    h = s = NaN;
  else if (s <= 0)
    h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl)
    return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color))
    o = color(o);
  if (!o)
    return new Hsl();
  if (o instanceof Hsl)
    return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min4 = Math.min(r, g, b), max4 = Math.max(r, g, b), h = NaN, s = max4 - min4, l = (max4 + min4) / 2;
  if (s) {
    if (r === max4)
      h = (g - b) / s + (g < b) * 6;
    else if (g === max4)
      h = (b - r) / s + 2;
    else
      h = (r - g) / s + 4;
    s /= l < 0.5 ? max4 + min4 : 2 - max4 - min4;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// src/utils/gradient.ts
function colorStopToString(colorStop) {
  const { type, value } = colorStop;
  if (type === "hex") {
    return `#${value}`;
  } else if (type === "literal") {
    return value;
  } else if (type === "rgb") {
    return `rgb(${value.join(",")})`;
  } else {
    return `rgba(${value.join(",")})`;
  }
}
var parseGradient = function() {
  const tokens = {
    linearGradient: /^(linear\-gradient)/i,
    repeatingLinearGradient: /^(repeating\-linear\-gradient)/i,
    radialGradient: /^(radial\-gradient)/i,
    repeatingRadialGradient: /^(repeating\-radial\-gradient)/i,
    /**
     * @see https://projects.verou.me/conic-gradient/
     */
    conicGradient: /^(conic\-gradient)/i,
    sideOrCorner: /^to (left (top|bottom)|right (top|bottom)|top (left|right)|bottom (left|right)|left|right|top|bottom)/i,
    extentKeywords: /^(closest\-side|closest\-corner|farthest\-side|farthest\-corner|contain|cover)/,
    positionKeywords: /^(left|center|right|top|bottom)/i,
    pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
    percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))\%/,
    emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
    angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
    startCall: /^\(/,
    endCall: /^\)/,
    comma: /^,/,
    hexColor: /^\#([0-9a-fA-F]+)/,
    literalColor: /^([a-zA-Z]+)/,
    rgbColor: /^rgb/i,
    rgbaColor: /^rgba/i,
    number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/
  };
  let input = "";
  function error(msg) {
    throw new Error(input + ": " + msg);
  }
  function getAST() {
    const ast = matchListDefinitions();
    if (input.length > 0) {
      error("Invalid input not EOF");
    }
    return ast;
  }
  function matchListDefinitions() {
    return matchListing(matchDefinition);
  }
  function matchDefinition() {
    return matchGradient(
      "linear-gradient",
      tokens.linearGradient,
      matchLinearOrientation
    ) || matchGradient(
      "repeating-linear-gradient",
      tokens.repeatingLinearGradient,
      matchLinearOrientation
    ) || matchGradient(
      "radial-gradient",
      tokens.radialGradient,
      matchListRadialOrientations
    ) || matchGradient(
      "repeating-radial-gradient",
      tokens.repeatingRadialGradient,
      matchListRadialOrientations
    ) || matchGradient(
      "conic-gradient",
      tokens.conicGradient,
      matchListRadialOrientations
    );
  }
  function matchGradient(gradientType, pattern, orientationMatcher) {
    return matchCall(pattern, function(captures) {
      const orientation = orientationMatcher();
      if (orientation) {
        if (!scan(tokens.comma)) {
          error("Missing comma before color stops");
        }
      }
      return {
        type: gradientType,
        orientation,
        colorStops: matchListing(matchColorStop)
      };
    });
  }
  function matchCall(pattern, callback) {
    const captures = scan(pattern);
    if (captures) {
      if (!scan(tokens.startCall)) {
        error("Missing (");
      }
      const result = callback(captures);
      if (!scan(tokens.endCall)) {
        error("Missing )");
      }
      return result;
    }
  }
  function matchLinearOrientation() {
    return matchSideOrCorner() || matchAngle();
  }
  function matchSideOrCorner() {
    return match("directional", tokens.sideOrCorner, 1);
  }
  function matchAngle() {
    return match("angular", tokens.angleValue, 1);
  }
  function matchListRadialOrientations() {
    let radialOrientations, radialOrientation = matchRadialOrientation(), lookaheadCache;
    if (radialOrientation) {
      radialOrientations = [];
      radialOrientations.push(radialOrientation);
      lookaheadCache = input;
      if (scan(tokens.comma)) {
        radialOrientation = matchRadialOrientation();
        if (radialOrientation) {
          radialOrientations.push(radialOrientation);
        } else {
          input = lookaheadCache;
        }
      }
    }
    return radialOrientations;
  }
  function matchRadialOrientation() {
    let radialType = matchCircle() || matchEllipse();
    if (radialType) {
      radialType.at = matchAtPosition();
    } else {
      const extent = matchExtentKeyword();
      if (extent) {
        radialType = extent;
        const positionAt = matchAtPosition();
        if (positionAt) {
          radialType.at = positionAt;
        }
      } else {
        const defaultPosition = matchPositioning();
        if (defaultPosition) {
          radialType = {
            type: "default-radial",
            // @ts-ignore
            at: defaultPosition
          };
        }
      }
    }
    return radialType;
  }
  function matchCircle() {
    const circle = match("shape", /^(circle)/i, 0);
    if (circle) {
      circle.style = matchLength() || matchExtentKeyword();
    }
    return circle;
  }
  function matchEllipse() {
    const ellipse = match("shape", /^(ellipse)/i, 0);
    if (ellipse) {
      ellipse.style = matchDistance() || matchExtentKeyword();
    }
    return ellipse;
  }
  function matchExtentKeyword() {
    return match("extent-keyword", tokens.extentKeywords, 1);
  }
  function matchAtPosition() {
    if (match("position", /^at/, 0)) {
      const positioning = matchPositioning();
      if (!positioning) {
        error("Missing positioning value");
      }
      return positioning;
    }
  }
  function matchPositioning() {
    const location = matchCoordinates();
    if (location.x || location.y) {
      return {
        type: "position",
        value: location
      };
    }
  }
  function matchCoordinates() {
    return {
      x: matchDistance(),
      y: matchDistance()
    };
  }
  function matchListing(matcher) {
    let captures = matcher();
    const result = [];
    if (captures) {
      result.push(captures);
      while (scan(tokens.comma)) {
        captures = matcher();
        if (captures) {
          result.push(captures);
        } else {
          error("One extra comma");
        }
      }
    }
    return result;
  }
  function matchColorStop() {
    const color2 = matchColor();
    if (!color2) {
      error("Expected color definition");
    }
    color2.length = matchDistance();
    return color2;
  }
  function matchColor() {
    return matchHexColor() || matchRGBAColor() || matchRGBColor() || matchLiteralColor();
  }
  function matchLiteralColor() {
    return match("literal", tokens.literalColor, 0);
  }
  function matchHexColor() {
    return match("hex", tokens.hexColor, 1);
  }
  function matchRGBColor() {
    return matchCall(tokens.rgbColor, function() {
      return {
        type: "rgb",
        value: matchListing(matchNumber)
      };
    });
  }
  function matchRGBAColor() {
    return matchCall(tokens.rgbaColor, function() {
      return {
        type: "rgba",
        value: matchListing(matchNumber)
      };
    });
  }
  function matchNumber() {
    return scan(tokens.number)[1];
  }
  function matchDistance() {
    return match("%", tokens.percentageValue, 1) || matchPositionKeyword() || matchLength();
  }
  function matchPositionKeyword() {
    return match("position-keyword", tokens.positionKeywords, 1);
  }
  function matchLength() {
    return match("px", tokens.pixelValue, 1) || match("em", tokens.emValue, 1);
  }
  function match(type, pattern, captureIndex) {
    const captures = scan(pattern);
    if (captures) {
      return {
        type,
        value: captures[captureIndex]
      };
    }
  }
  function scan(regexp) {
    const blankCaptures = /^[\n\r\t\s]+/.exec(input);
    if (blankCaptures) {
      consume(blankCaptures[0].length);
    }
    const captures = regexp.exec(input);
    if (captures) {
      consume(captures[0].length);
    }
    return captures;
  }
  function consume(size) {
    input = input.substring(size);
  }
  return function(code) {
    input = code;
    return getAST();
  };
}();
function computeLinearGradient(width, height, angle3) {
  const rad = deg2rad(angle3.value);
  const rx = 0;
  const ry = 0;
  const rcx = rx + width / 2;
  const rcy = ry + height / 2;
  const length5 = Math.abs(width * Math.cos(rad)) + Math.abs(height * Math.sin(rad));
  const x1 = rcx - Math.cos(rad) * length5 / 2;
  const y1 = rcy - Math.sin(rad) * length5 / 2;
  const x2 = rcx + Math.cos(rad) * length5 / 2;
  const y2 = rcy + Math.sin(rad) * length5 / 2;
  return { x1, y1, x2, y2 };
}
function computeRadialGradient(width, height, cx, cy, size) {
  let x = cx.value;
  let y = cy.value;
  if (cx.unit === 2 /* kPercentage */) {
    x = cx.value / 100 * width;
  }
  if (cy.unit === 2 /* kPercentage */) {
    y = cy.value / 100 * height;
  }
  let r = Math.max(
    distanceSquareRoot([0, 0], [x, y]),
    distanceSquareRoot([0, height], [x, y]),
    distanceSquareRoot([width, height], [x, y]),
    distanceSquareRoot([width, 0], [x, y])
  );
  if (size) {
    if (size instanceof CSSUnitValue) {
      r = size.value;
    } else if (size instanceof CSSKeywordValue) {
      if (size.value === "closest-side") {
        r = Math.min(x, width - x, y, height - y);
      } else if (size.value === "farthest-side") {
        r = Math.max(x, width - x, y, height - y);
      } else if (size.value === "closest-corner") {
        r = Math.min(
          distanceSquareRoot([0, 0], [x, y]),
          distanceSquareRoot([0, height], [x, y]),
          distanceSquareRoot([width, height], [x, y]),
          distanceSquareRoot([width, 0], [x, y])
        );
      }
    }
  }
  return { x, y, r };
}

// src/css/parser/gradient.ts
var regexLG = /^l\s*\(\s*([\d.]+)\s*\)\s*(.*)/i;
var regexRG = /^r\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)\s*(.*)/i;
var regexPR = /^p\s*\(\s*([axyn])\s*\)\s*(.*)/i;
var regexColorStop = /[\d.]+:(#[^\s]+|[^\)]+\))/gi;
function spaceColorStops(colorStops) {
  var _a, _b, _c;
  const length5 = colorStops.length;
  colorStops[length5 - 1].length = (_a = colorStops[length5 - 1].length) != null ? _a : {
    type: "%",
    value: "100"
  };
  if (length5 > 1) {
    colorStops[0].length = (_b = colorStops[0].length) != null ? _b : {
      type: "%",
      value: "0"
    };
  }
  let previousIndex = 0;
  let previousOffset = Number(colorStops[0].length.value);
  for (let i = 1; i < length5; i++) {
    const offset = (_c = colorStops[i].length) == null ? void 0 : _c.value;
    if (!is_nil_default(offset) && !is_nil_default(previousOffset)) {
      for (let j = 1; j < i - previousIndex; j++)
        colorStops[previousIndex + j].length = {
          type: "%",
          value: `${previousOffset + (Number(offset) - previousOffset) * j / (i - previousIndex)}`
        };
      previousIndex = i;
      previousOffset = Number(offset);
    }
  }
}
var SideOrCornerToDegMap = {
  left: 270 - 90,
  top: 0 - 90,
  bottom: 180 - 90,
  right: 90 - 90,
  "left top": 315 - 90,
  "top left": 315 - 90,
  "left bottom": 225 - 90,
  "bottom left": 225 - 90,
  "right top": 45 - 90,
  "top right": 45 - 90,
  "right bottom": 135 - 90,
  "bottom right": 135 - 90
};
var angleToDeg = memoize((orientation) => {
  let angle3;
  if (orientation.type === "angular") {
    angle3 = Number(orientation.value);
  } else {
    angle3 = SideOrCornerToDegMap[orientation.value] || 0;
  }
  return getOrCreateUnitValue(angle3, "deg");
});
var positonToCSSUnitValue = memoize((position) => {
  let cx = 50;
  let cy = 50;
  let unitX = "%";
  let unitY = "%";
  if ((position == null ? void 0 : position.type) === "position") {
    const { x, y } = position.value;
    if ((x == null ? void 0 : x.type) === "position-keyword") {
      if (x.value === "left") {
        cx = 0;
      } else if (x.value === "center") {
        cx = 50;
      } else if (x.value === "right") {
        cx = 100;
      } else if (x.value === "top") {
        cy = 0;
      } else if (x.value === "bottom") {
        cy = 100;
      }
    }
    if ((y == null ? void 0 : y.type) === "position-keyword") {
      if (y.value === "left") {
        cx = 0;
      } else if (y.value === "center") {
        cy = 50;
      } else if (y.value === "right") {
        cx = 100;
      } else if (y.value === "top") {
        cy = 0;
      } else if (y.value === "bottom") {
        cy = 100;
      }
    }
    if ((x == null ? void 0 : x.type) === "px" || (x == null ? void 0 : x.type) === "%" || (x == null ? void 0 : x.type) === "em") {
      unitX = x == null ? void 0 : x.type;
      cx = Number(x.value);
    }
    if ((y == null ? void 0 : y.type) === "px" || (y == null ? void 0 : y.type) === "%" || (y == null ? void 0 : y.type) === "em") {
      unitY = y == null ? void 0 : y.type;
      cy = Number(y.value);
    }
  }
  return {
    cx: getOrCreateUnitValue(cx, unitX),
    cy: getOrCreateUnitValue(cy, unitY)
  };
});
var parseGradient2 = memoize((colorStr) => {
  var _a;
  if (colorStr.indexOf("linear") > -1 || colorStr.indexOf("radial") > -1) {
    const ast = parseGradient(colorStr);
    return ast.map(({ type: type2, orientation, colorStops }) => {
      spaceColorStops(colorStops);
      const steps = colorStops.map((colorStop) => {
        return {
          offset: getOrCreateUnitValue(Number(colorStop.length.value), "%"),
          color: colorStopToString(colorStop)
        };
      });
      if (type2 === "linear-gradient") {
        return new CSSGradientValue(1 /* LinearGradient */, {
          angle: orientation ? angleToDeg(orientation) : Odeg,
          steps
        });
      } else if (type2 === "radial-gradient") {
        if (!orientation) {
          orientation = [
            {
              type: "shape",
              value: "circle"
            }
          ];
        }
        if (orientation[0].type === "shape" && orientation[0].value === "circle") {
          const { cx, cy } = positonToCSSUnitValue(orientation[0].at);
          let size;
          if (orientation[0].style) {
            const { type: type3, value } = orientation[0].style;
            if (type3 === "extent-keyword") {
              size = getOrCreateKeyword(value);
            } else {
              size = getOrCreateUnitValue(value, type3);
            }
          }
          return new CSSGradientValue(2 /* RadialGradient */, {
            cx,
            cy,
            size,
            steps
          });
        }
      }
    });
  }
  const type = colorStr[0];
  if (colorStr[1] === "(" || colorStr[2] === "(") {
    if (type === "l") {
      const arr = regexLG.exec(colorStr);
      if (arr) {
        const steps = ((_a = arr[2].match(regexColorStop)) == null ? void 0 : _a.map((stop) => stop.split(":"))) || [];
        return [
          new CSSGradientValue(1 /* LinearGradient */, {
            angle: getOrCreateUnitValue(parseFloat(arr[1]), "deg"),
            steps: steps.map(([offset, color2]) => ({
              offset: getOrCreateUnitValue(Number(offset) * 100, "%"),
              color: color2
            }))
          })
        ];
      }
    } else if (type === "r") {
      const parsedRadialGradient = parseRadialGradient(colorStr);
      if (parsedRadialGradient) {
        if (is_string_default(parsedRadialGradient)) {
          colorStr = parsedRadialGradient;
        } else {
          return [
            new CSSGradientValue(
              2 /* RadialGradient */,
              parsedRadialGradient
            )
          ];
        }
      }
    } else if (type === "p") {
      return parsePattern(colorStr);
    }
  }
});
function parseRadialGradient(gradientStr) {
  var _a;
  const arr = regexRG.exec(gradientStr);
  if (arr) {
    const steps = ((_a = arr[4].match(regexColorStop)) == null ? void 0 : _a.map((stop) => stop.split(":"))) || [];
    return {
      cx: getOrCreateUnitValue(50, "%"),
      cy: getOrCreateUnitValue(50, "%"),
      steps: steps.map(([offset, color2]) => ({
        offset: getOrCreateUnitValue(Number(offset) * 100, "%"),
        color: color2
      }))
    };
  }
  return null;
}
function parsePattern(patternStr) {
  const arr = regexPR.exec(patternStr);
  if (arr) {
    let repetition = arr[1];
    const src = arr[2];
    switch (repetition) {
      case "a":
        repetition = "repeat";
        break;
      case "x":
        repetition = "repeat-x";
        break;
      case "y":
        repetition = "repeat-y";
        break;
      case "n":
        repetition = "no-repeat";
        break;
      default:
        repetition = "no-repeat";
    }
    return {
      image: src,
      // @ts-ignore
      repetition
    };
  }
  return null;
}

// src/css/parser/color.ts
function isCSSGradientValue(object) {
  return !!object.type && !!object.value;
}
function isPattern(object) {
  return object && !!object.image;
}
function isCSSRGB(object) {
  return object && !is_nil_default(object.r) && !is_nil_default(object.g) && !is_nil_default(object.b);
}
var parseColor = memoize(
  (colorStr) => {
    if (isPattern(colorStr)) {
      return __spreadValues({
        repetition: "repeat"
      }, colorStr);
    }
    if (is_nil_default(colorStr)) {
      colorStr = "";
    }
    if (colorStr === "transparent") {
      return transparentColor;
    } else if (colorStr === "currentColor") {
      colorStr = "black";
    }
    const g = parseGradient2(colorStr);
    if (g) {
      return g;
    }
    const color2 = color(colorStr);
    const rgba2 = [0, 0, 0, 0];
    if (color2 !== null) {
      rgba2[0] = color2.r || 0;
      rgba2[1] = color2.g || 0;
      rgba2[2] = color2.b || 0;
      rgba2[3] = color2.opacity;
    }
    return getOrCreateRGBA(...rgba2);
  }
);
function mergeColors(left, right) {
  if (!isCSSRGB(left) || !isCSSRGB(right)) {
    return;
  }
  return [
    [Number(left.r), Number(left.g), Number(left.b), Number(left.alpha)],
    [Number(right.r), Number(right.g), Number(right.b), Number(right.alpha)],
    (color2) => {
      const rgba2 = color2.slice();
      if (rgba2[3]) {
        for (let i = 0; i < 3; i++)
          rgba2[i] = Math.round(clamp_default(rgba2[i], 0, 255));
      }
      rgba2[3] = clamp_default(rgba2[3], 0, 1);
      return `rgba(${rgba2.join(",")})`;
    }
  ];
}

// src/css/parser/dimension.ts
function parseDimension(unitRegExp, string) {
  if (is_nil_default(string)) {
    return getOrCreateUnitValue(0, "px");
  }
  string = `${string}`.trim().toLowerCase();
  if (isFinite(Number(string))) {
    if ("px".search(unitRegExp) >= 0) {
      return getOrCreateUnitValue(Number(string), "px");
    } else if ("deg".search(unitRegExp) >= 0) {
      return getOrCreateUnitValue(Number(string), "deg");
    }
  }
  const matchedUnits = [];
  string = string.replace(unitRegExp, (match) => {
    matchedUnits.push(match);
    return "U" + match;
  });
  const taggedUnitRegExp = "U(" + unitRegExp.source + ")";
  return matchedUnits.map(
    (unit) => getOrCreateUnitValue(
      Number(
        string.replace(new RegExp("U" + unit, "g"), "").replace(new RegExp(taggedUnitRegExp, "g"), "*0")
      ),
      unit
    )
  )[0];
}
var parseLength = memoize((css) => {
  return parseDimension(new RegExp("px", "g"), css);
});
var parserPercentage = memoize((css) => {
  return parseDimension(new RegExp("%", "g"), css);
});
var parseLengthOrPercentage = (css) => {
  if (is_number_default(css) || isFinite(Number(css))) {
    return getOrCreateUnitValue(Number(css) || 0, "px");
  }
  return parseDimension(new RegExp("px|%|em|rem", "g"), css);
};
var parseAngle = memoize((css) => {
  return parseDimension(
    new RegExp("deg|rad|grad|turn", "g"),
    css
  );
});
function mergeDimensions(left, right, target, nonNegative, index = 0) {
  let unit = "";
  let leftValue = left.value || 0;
  let rightValue = right.value || 0;
  const canonicalUnit = toCanonicalUnit(left.unit);
  const leftCanonicalUnitValue = left.convertTo(canonicalUnit);
  const rightCanonicalUnitValue = right.convertTo(canonicalUnit);
  if (leftCanonicalUnitValue && rightCanonicalUnitValue) {
    leftValue = leftCanonicalUnitValue.value;
    rightValue = rightCanonicalUnitValue.value;
    unit = unitTypeToString(left.unit);
  } else {
    if (CSSUnitValue.isLength(left.unit) || CSSUnitValue.isLength(right.unit)) {
      leftValue = convertPercentUnit(left, index, target);
      rightValue = convertPercentUnit(right, index, target);
      unit = "px";
    }
  }
  return [
    leftValue,
    rightValue,
    (value) => {
      if (nonNegative) {
        value = Math.max(value, 0);
      }
      return value + unit;
    }
  ];
}
function convertAngleUnit(value) {
  let deg = 0;
  if (value.unit === 6 /* kDegrees */) {
    deg = value.value;
  } else if (value.unit === 7 /* kRadians */) {
    deg = rad2deg(Number(value.value));
  } else if (value.unit === 9 /* kTurns */) {
    deg = turn2deg(Number(value.value));
  }
  return deg;
}
function parseDimensionArrayFormat(string, size) {
  let parsed;
  if (Array.isArray(string)) {
    parsed = string.map((segment) => Number(segment));
  } else if (is_string_default(string)) {
    parsed = string.split(" ").map((segment) => Number(segment));
  } else if (is_number_default(string)) {
    parsed = [string];
  }
  if (size === 2) {
    if (parsed.length === 1) {
      return [parsed[0], parsed[0]];
    } else {
      return [parsed[0], parsed[1]];
    }
  } else {
    if (parsed.length === 1) {
      return [parsed[0], parsed[0], parsed[0], parsed[0]];
    } else if (parsed.length === 2) {
      return [parsed[0], parsed[1], parsed[0], parsed[1]];
    } else if (parsed.length === 3) {
      return [parsed[0], parsed[1], parsed[2], parsed[1]];
    } else {
      return [parsed[0], parsed[1], parsed[2], parsed[3]];
    }
  }
}
function parseDimensionArray(string) {
  if (is_string_default(string)) {
    return string.split(" ").map((segment) => parseLengthOrPercentage(segment));
  } else {
    return string.map((segment) => parseLengthOrPercentage(segment.toString()));
  }
}
function convertPercentUnit(valueWithUnit, vec3Index, target) {
  if (valueWithUnit.value === 0) {
    return 0;
  }
  if (valueWithUnit.unit === 4 /* kPixels */) {
    return Number(valueWithUnit.value);
  } else if (valueWithUnit.unit === 2 /* kPercentage */ && target) {
    const bounds = target.nodeName === "g" /* GROUP */ ? target.getLocalBounds() : (
      // : target.getGeometryBounds();
      target.geometry.contentBounds
    );
    return valueWithUnit.value / 100 * bounds.halfExtents[vec3Index] * 2;
  }
  return 0;
}

// src/css/parser/filter.ts
var parseParam = (css) => parseDimension(/deg|rad|grad|turn|px|%/g, css);
var supportedFilters = [
  "blur",
  "brightness",
  "drop-shadow",
  "contrast",
  "grayscale",
  "sepia",
  "saturate",
  "hue-rotate",
  "invert"
];
function parseFilter(filterStr = "") {
  filterStr = filterStr.toLowerCase().trim();
  if (filterStr === "none") {
    return [];
  }
  const filterRegExp = /\s*([\w-]+)\(([^)]*)\)/g;
  const result = [];
  let match;
  let prevLastIndex = 0;
  while (match = filterRegExp.exec(filterStr)) {
    if (match.index !== prevLastIndex) {
      return [];
    }
    prevLastIndex = match.index + match[0].length;
    if (supportedFilters.indexOf(match[1]) > -1) {
      result.push({
        name: match[1],
        params: match[2].split(" ").map((p) => parseParam(p) || parseColor(p))
      });
    }
    if (filterRegExp.lastIndex === filterStr.length) {
      return result;
    }
  }
  return [];
}

// src/css/parser/numeric.ts
function numberToString(x) {
  return x.toString();
}
var parseNumber = memoize((string) => {
  if (typeof string === "number") {
    return getOrCreateUnitValue(string);
  }
  if (/^\s*[-+]?(\d*\.)?\d+\s*$/.test(string)) {
    return getOrCreateUnitValue(Number(string));
  } else {
    return getOrCreateUnitValue(0);
  }
});
var parseNumberList = memoize(
  (string) => {
    if (is_string_default(string)) {
      return string.split(" ").map(parseNumber);
    } else {
      return string.map(parseNumber);
    }
  }
);
function mergeNumbers(left, right) {
  return [left, right, numberToString];
}
function clampedMergeNumbers(min4, max4) {
  return (left, right) => [
    left,
    right,
    (x) => numberToString(clamp_default(x, min4, max4))
  ];
}
function mergeNumberLists(left, right) {
  if (left.length !== right.length) {
    return;
  }
  return [
    left,
    right,
    (numberList) => {
      return numberList;
    }
  ];
}

// node_modules/@antv/g-math/dist/index.esm.js
function distance4(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}
function getBBoxByArray(xArr, yArr) {
  var minX = Math.min.apply(Math, __spreadArray([], __read(xArr), false));
  var minY = Math.min.apply(Math, __spreadArray([], __read(yArr), false));
  var maxX = Math.max.apply(Math, __spreadArray([], __read(xArr), false));
  var maxY = Math.max.apply(Math, __spreadArray([], __read(yArr), false));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function xExtrema(rx, ry, xRotation) {
  return Math.atan(-ry / rx * Math.tan(xRotation));
}
function yExtrema(rx, ry, xRotation) {
  return Math.atan(ry / (rx * Math.tan(xRotation)));
}
function xAt(cx, cy, rx, ry, xRotation, angle3) {
  return rx * Math.cos(xRotation) * Math.cos(angle3) - ry * Math.sin(xRotation) * Math.sin(angle3) + cx;
}
function yAt(cx, cy, rx, ry, xRotation, angle3) {
  return rx * Math.sin(xRotation) * Math.cos(angle3) + ry * Math.cos(xRotation) * Math.sin(angle3) + cy;
}
function box$5(cx, cy, rx, ry, xRotation, startAngle, endAngle) {
  var xDim = xExtrema(rx, ry, xRotation);
  var minX = Infinity;
  var maxX = -Infinity;
  var xs = [startAngle, endAngle];
  for (var i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
    var xAngle = xDim + i;
    if (startAngle < endAngle) {
      if (startAngle < xAngle && xAngle < endAngle) {
        xs.push(xAngle);
      }
    } else {
      if (endAngle < xAngle && xAngle < startAngle) {
        xs.push(xAngle);
      }
    }
  }
  for (var i = 0; i < xs.length; i++) {
    var x = xAt(cx, cy, rx, ry, xRotation, xs[i]);
    if (x < minX) {
      minX = x;
    }
    if (x > maxX) {
      maxX = x;
    }
  }
  var yDim = yExtrema(rx, ry, xRotation);
  var minY = Infinity;
  var maxY = -Infinity;
  var ys = [startAngle, endAngle];
  for (var i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
    var yAngle = yDim + i;
    if (startAngle < endAngle) {
      if (startAngle < yAngle && yAngle < endAngle) {
        ys.push(yAngle);
      }
    } else {
      if (endAngle < yAngle && yAngle < startAngle) {
        ys.push(yAngle);
      }
    }
  }
  for (var i = 0; i < ys.length; i++) {
    var y = yAt(cx, cy, rx, ry, xRotation, ys[i]);
    if (y < minY) {
      minY = y;
    }
    if (y > maxY) {
      maxY = y;
    }
  }
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function length$4(x1, y1, x2, y2) {
  return distance4(x1, y1, x2, y2);
}
function pointAt$3(x1, y1, x2, y2, t) {
  return {
    x: (1 - t) * x1 + t * x2,
    y: (1 - t) * y1 + t * y2
  };
}
function cubicAt(p0, p1, p2, p3, t) {
  var onet = 1 - t;
  return onet * onet * onet * p0 + 3 * p1 * t * onet * onet + 3 * p2 * t * t * onet + p3 * t * t * t;
}
function extrema$1(p0, p1, p2, p3) {
  var a = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3;
  var b = 6 * p0 - 12 * p1 + 6 * p2;
  var c = 3 * p1 - 3 * p0;
  var extremas = [];
  var t1;
  var t2;
  var discSqrt;
  if (isNumberEqual(a, 0)) {
    if (!isNumberEqual(b, 0)) {
      t1 = -c / b;
      if (t1 >= 0 && t1 <= 1) {
        extremas.push(t1);
      }
    }
  } else {
    var disc = b * b - 4 * a * c;
    if (isNumberEqual(disc, 0)) {
      extremas.push(-b / (2 * a));
    } else if (disc > 0) {
      discSqrt = Math.sqrt(disc);
      t1 = (-b + discSqrt) / (2 * a);
      t2 = (-b - discSqrt) / (2 * a);
      if (t1 >= 0 && t1 <= 1) {
        extremas.push(t1);
      }
      if (t2 >= 0 && t2 <= 1) {
        extremas.push(t2);
      }
    }
  }
  return extremas;
}
function box$3(x1, y1, x2, y2, x3, y3, x4, y4) {
  var xArr = [x1, x4];
  var yArr = [y1, y4];
  var xExtrema2 = extrema$1(x1, x2, x3, x4);
  var yExtrema2 = extrema$1(y1, y2, y3, y4);
  for (var i = 0; i < xExtrema2.length; i++) {
    xArr.push(cubicAt(x1, x2, x3, x4, xExtrema2[i]));
  }
  for (var i = 0; i < yExtrema2.length; i++) {
    yArr.push(cubicAt(y1, y2, y3, y4, yExtrema2[i]));
  }
  return getBBoxByArray(xArr, yArr);
}
function lengthOfSegment(points) {
  if (points.length < 2) {
    return 0;
  }
  var totalLength = 0;
  for (var i = 0; i < points.length - 1; i++) {
    var from = points[i];
    var to = points[i + 1];
    totalLength += distance4(from[0], from[1], to[0], to[1]);
  }
  return totalLength;
}
function length$2(points) {
  return lengthOfSegment(points);
}
function quadraticAt(p0, p1, p2, t) {
  var onet = 1 - t;
  return onet * onet * p0 + 2 * t * onet * p1 + t * t * p2;
}
function extrema(p0, p1, p2) {
  var a = p0 + p2 - 2 * p1;
  if (isNumberEqual(a, 0)) {
    return [0.5];
  }
  var rst = (p0 - p1) / a;
  if (rst <= 1 && rst >= 0) {
    return [rst];
  }
  return [];
}
function box(x1, y1, x2, y2, x3, y3) {
  var xExtrema2 = extrema(x1, x2, x3)[0];
  var yExtrema2 = extrema(y1, y2, y3)[0];
  var xArr = [x1, x3];
  var yArr = [y1, y3];
  if (xExtrema2 !== void 0) {
    xArr.push(quadraticAt(x1, x2, x3, xExtrema2));
  }
  if (yExtrema2 !== void 0) {
    yArr.push(quadraticAt(y1, y2, y3, yExtrema2));
  }
  return getBBoxByArray(xArr, yArr);
}

// src/utils/path.ts
function getOrCalculatePathTotalLength(path) {
  if (path.parsedStyle.path.totalLength === 0) {
    path.parsedStyle.path.totalLength = getTotalLength(
      path.parsedStyle.path.absolutePath
    );
  }
  return path.parsedStyle.path.totalLength;
}
function removeRedundantMCommand(path) {
  for (let i = 0; i < path.length; i++) {
    const prevSegment = path[i - 1];
    const segment = path[i];
    const cmd = segment[0];
    if (cmd === "M") {
      if (prevSegment) {
        const prevCmd = prevSegment[0];
        const srcPoint = [segment[1], segment[2]];
        let destPoint;
        if (prevCmd === "L" || prevCmd === "M") {
          destPoint = [prevSegment[1], prevSegment[2]];
        } else if (prevCmd === "C" || prevCmd === "A" || prevCmd === "Q") {
          destPoint = [
            prevSegment[prevSegment.length - 2],
            prevSegment[prevSegment.length - 1]
          ];
        }
        if (destPoint && isSamePoint(srcPoint, destPoint)) {
          path.splice(i, 1);
          i--;
        }
      }
    }
  }
}
function hasArcOrBezier(path) {
  let hasArc = false;
  const count = path.length;
  for (let i = 0; i < count; i++) {
    const params = path[i];
    const cmd = params[0];
    if (cmd === "C" || cmd === "A" || cmd === "Q") {
      hasArc = true;
      break;
    }
  }
  return hasArc;
}
function extractPolygons(pathArray) {
  const polygons = [];
  const polylines = [];
  let points = [];
  for (let i = 0; i < pathArray.length; i++) {
    const params = pathArray[i];
    const cmd = params[0];
    if (cmd === "M") {
      if (points.length) {
        polylines.push(points);
        points = [];
      }
      points.push([params[1], params[2]]);
    } else if (cmd === "Z") {
      if (points.length) {
        polygons.push(points);
        points = [];
      }
    } else {
      points.push([params[1], params[2]]);
    }
  }
  if (points.length > 0) {
    polylines.push(points);
  }
  return {
    polygons,
    polylines
  };
}
function isSamePoint(point1, point2) {
  return point1[0] === point2[0] && point1[1] === point2[1];
}
function getPathBBox(segments, lineWidth) {
  let xArr = [];
  let yArr = [];
  const segmentsWithAngle = [];
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const { currentPoint, params, prePoint } = segment;
    let box2;
    switch (segment.command) {
      case "Q":
        box2 = box(
          prePoint[0],
          prePoint[1],
          params[1],
          params[2],
          params[3],
          params[4]
        );
        break;
      case "C":
        box2 = box$3(
          prePoint[0],
          prePoint[1],
          params[1],
          params[2],
          params[3],
          params[4],
          params[5],
          params[6]
        );
        break;
      case "A":
        const arcParams = segment.arcParams;
        box2 = box$5(
          arcParams.cx,
          arcParams.cy,
          arcParams.rx,
          arcParams.ry,
          arcParams.xRotation,
          arcParams.startAngle,
          arcParams.endAngle
        );
        break;
      default:
        xArr.push(currentPoint[0]);
        yArr.push(currentPoint[1]);
        break;
    }
    if (box2) {
      segment.box = box2;
      xArr.push(box2.x, box2.x + box2.width);
      yArr.push(box2.y, box2.y + box2.height);
    }
    if (lineWidth && (segment.command === "L" || segment.command === "M") && segment.prePoint && segment.nextPoint) {
      segmentsWithAngle.push(segment);
    }
  }
  xArr = xArr.filter(
    (item) => !Number.isNaN(item) && item !== Infinity && item !== -Infinity
  );
  yArr = yArr.filter(
    (item) => !Number.isNaN(item) && item !== Infinity && item !== -Infinity
  );
  let minX = min_default(xArr);
  let minY = min_default(yArr);
  let maxX = max_default(xArr);
  let maxY = max_default(yArr);
  if (segmentsWithAngle.length === 0) {
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  for (let i = 0; i < segmentsWithAngle.length; i++) {
    const segment = segmentsWithAngle[i];
    const { currentPoint } = segment;
    let extra;
    if (currentPoint[0] === minX) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      minX = minX - extra.xExtra;
    } else if (currentPoint[0] === maxX) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      maxX = maxX + extra.xExtra;
    }
    if (currentPoint[1] === minY) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      minY = minY - extra.yExtra;
    } else if (currentPoint[1] === maxY) {
      extra = getExtraFromSegmentWithAngle(segment, lineWidth);
      maxY = maxY + extra.yExtra;
    }
  }
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getExtraFromSegmentWithAngle(segment, lineWidth) {
  const { prePoint, currentPoint, nextPoint } = segment;
  const currentAndPre = Math.pow(currentPoint[0] - prePoint[0], 2) + Math.pow(currentPoint[1] - prePoint[1], 2);
  const currentAndNext = Math.pow(currentPoint[0] - nextPoint[0], 2) + Math.pow(currentPoint[1] - nextPoint[1], 2);
  const preAndNext = Math.pow(prePoint[0] - nextPoint[0], 2) + Math.pow(prePoint[1] - nextPoint[1], 2);
  const currentAngle = Math.acos(
    (currentAndPre + currentAndNext - preAndNext) / (2 * Math.sqrt(currentAndPre) * Math.sqrt(currentAndNext))
  );
  if (!currentAngle || Math.sin(currentAngle) === 0 || isNumberEqual(currentAngle, 0)) {
    return {
      xExtra: 0,
      yExtra: 0
    };
  }
  let xAngle = Math.abs(
    Math.atan2(nextPoint[1] - currentPoint[1], nextPoint[0] - currentPoint[0])
  );
  let yAngle = Math.abs(
    Math.atan2(nextPoint[0] - currentPoint[0], nextPoint[1] - currentPoint[1])
  );
  xAngle = xAngle > Math.PI / 2 ? Math.PI - xAngle : xAngle;
  yAngle = yAngle > Math.PI / 2 ? Math.PI - yAngle : yAngle;
  const extra = {
    // 水平方向投影
    xExtra: Math.cos(currentAngle / 2 - xAngle) * (lineWidth / 2 * (1 / Math.sin(currentAngle / 2))) - lineWidth / 2 || 0,
    // 垂直方向投影
    yExtra: Math.cos(yAngle - currentAngle / 2) * (lineWidth / 2 * (1 / Math.sin(currentAngle / 2))) - lineWidth / 2 || 0
  };
  return extra;
}
function toSymmetry(point, center) {
  return [
    center[0] + (center[0] - point[0]),
    center[1] + (center[1] - point[1])
  ];
}
var angleBetween2 = (v0, v1) => {
  const p = v0.x * v1.x + v0.y * v1.y;
  const n = Math.sqrt(
    (Math.pow(v0.x, 2) + Math.pow(v0.y, 2)) * (Math.pow(v1.x, 2) + Math.pow(v1.y, 2))
  );
  const sign = v0.x * v1.y - v0.y * v1.x < 0 ? -1 : 1;
  const angle3 = sign * Math.acos(p / n);
  return angle3;
};
var pointOnEllipticalArc = (p0, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, p1, t) => {
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  xAxisRotation = mod_default(xAxisRotation, 360);
  const xAxisRotationRadians = deg2rad(xAxisRotation);
  if (p0.x === p1.x && p0.y === p1.y) {
    return { x: p0.x, y: p0.y, ellipticalArcAngle: 0 };
  }
  if (rx === 0 || ry === 0) {
    return { x: 0, y: 0, ellipticalArcAngle: 0 };
  }
  const dx = (p0.x - p1.x) / 2;
  const dy = (p0.y - p1.y) / 2;
  const transformedPoint = {
    x: Math.cos(xAxisRotationRadians) * dx + Math.sin(xAxisRotationRadians) * dy,
    y: -Math.sin(xAxisRotationRadians) * dx + Math.cos(xAxisRotationRadians) * dy
  };
  const radiiCheck = Math.pow(transformedPoint.x, 2) / Math.pow(rx, 2) + Math.pow(transformedPoint.y, 2) / Math.pow(ry, 2);
  if (radiiCheck > 1) {
    rx = Math.sqrt(radiiCheck) * rx;
    ry = Math.sqrt(radiiCheck) * ry;
  }
  const cSquareNumerator = Math.pow(rx, 2) * Math.pow(ry, 2) - Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) - Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  const cSquareRootDenom = Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) + Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  let cRadicand = cSquareNumerator / cSquareRootDenom;
  cRadicand = cRadicand < 0 ? 0 : cRadicand;
  const cCoef = (largeArcFlag !== sweepFlag ? 1 : -1) * Math.sqrt(cRadicand);
  const transformedCenter = {
    x: cCoef * (rx * transformedPoint.y / ry),
    y: cCoef * (-(ry * transformedPoint.x) / rx)
  };
  const center = {
    x: Math.cos(xAxisRotationRadians) * transformedCenter.x - Math.sin(xAxisRotationRadians) * transformedCenter.y + (p0.x + p1.x) / 2,
    y: Math.sin(xAxisRotationRadians) * transformedCenter.x + Math.cos(xAxisRotationRadians) * transformedCenter.y + (p0.y + p1.y) / 2
  };
  const startVector = {
    x: (transformedPoint.x - transformedCenter.x) / rx,
    y: (transformedPoint.y - transformedCenter.y) / ry
  };
  const startAngle = angleBetween2(
    {
      x: 1,
      y: 0
    },
    startVector
  );
  const endVector = {
    x: (-transformedPoint.x - transformedCenter.x) / rx,
    y: (-transformedPoint.y - transformedCenter.y) / ry
  };
  let sweepAngle = angleBetween2(startVector, endVector);
  if (!sweepFlag && sweepAngle > 0) {
    sweepAngle -= 2 * Math.PI;
  } else if (sweepFlag && sweepAngle < 0) {
    sweepAngle += 2 * Math.PI;
  }
  sweepAngle %= 2 * Math.PI;
  const angle3 = startAngle + sweepAngle * t;
  const ellipseComponentX = rx * Math.cos(angle3);
  const ellipseComponentY = ry * Math.sin(angle3);
  const point = {
    x: Math.cos(xAxisRotationRadians) * ellipseComponentX - Math.sin(xAxisRotationRadians) * ellipseComponentY + center.x,
    y: Math.sin(xAxisRotationRadians) * ellipseComponentX + Math.cos(xAxisRotationRadians) * ellipseComponentY + center.y,
    ellipticalArcStartAngle: startAngle,
    ellipticalArcEndAngle: startAngle + sweepAngle,
    ellipticalArcAngle: angle3,
    ellipticalArcCenter: center,
    resultantRx: rx,
    resultantRy: ry
  };
  return point;
};
function path2Segments(path) {
  const segments = [];
  let currentPoint = null;
  let nextParams = null;
  let startMovePoint = null;
  let lastStartMovePointIndex = 0;
  const count = path.length;
  for (let i = 0; i < count; i++) {
    const params = path[i];
    nextParams = path[i + 1];
    const command = params[0];
    const segment = {
      command,
      prePoint: currentPoint,
      params,
      startTangent: null,
      endTangent: null,
      currentPoint: null,
      nextPoint: null,
      arcParams: null,
      box: null,
      cubicParams: null
    };
    switch (command) {
      case "M":
        startMovePoint = [params[1], params[2]];
        lastStartMovePointIndex = i;
        break;
      case "A":
        const arcParams = getArcParams(currentPoint, params);
        segment.arcParams = arcParams;
        break;
      default:
        break;
    }
    if (command === "Z") {
      currentPoint = startMovePoint;
      nextParams = path[lastStartMovePointIndex + 1];
    } else {
      const len5 = params.length;
      currentPoint = [params[len5 - 2], params[len5 - 1]];
    }
    if (nextParams && nextParams[0] === "Z") {
      nextParams = path[lastStartMovePointIndex];
      if (segments[lastStartMovePointIndex]) {
        segments[lastStartMovePointIndex].prePoint = currentPoint;
      }
    }
    segment.currentPoint = currentPoint;
    if (segments[lastStartMovePointIndex] && isSamePoint(currentPoint, segments[lastStartMovePointIndex].currentPoint)) {
      segments[lastStartMovePointIndex].prePoint = segment.prePoint;
    }
    const nextPoint = nextParams ? [nextParams[nextParams.length - 2], nextParams[nextParams.length - 1]] : null;
    segment.nextPoint = nextPoint;
    const { prePoint } = segment;
    if (["L", "H", "V"].includes(command)) {
      segment.startTangent = [
        prePoint[0] - currentPoint[0],
        prePoint[1] - currentPoint[1]
      ];
      segment.endTangent = [
        currentPoint[0] - prePoint[0],
        currentPoint[1] - prePoint[1]
      ];
    } else if (command === "Q") {
      const cp = [params[1], params[2]];
      segment.startTangent = [prePoint[0] - cp[0], prePoint[1] - cp[1]];
      segment.endTangent = [currentPoint[0] - cp[0], currentPoint[1] - cp[1]];
    } else if (command === "T") {
      const preSegment = segments[i - 1];
      const cp = toSymmetry(preSegment.currentPoint, prePoint);
      if (preSegment.command === "Q") {
        segment.command = "Q";
        segment.startTangent = [prePoint[0] - cp[0], prePoint[1] - cp[1]];
        segment.endTangent = [currentPoint[0] - cp[0], currentPoint[1] - cp[1]];
      } else {
        segment.command = "TL";
        segment.startTangent = [
          prePoint[0] - currentPoint[0],
          prePoint[1] - currentPoint[1]
        ];
        segment.endTangent = [
          currentPoint[0] - prePoint[0],
          currentPoint[1] - prePoint[1]
        ];
      }
    } else if (command === "C") {
      const cp1 = [params[1], params[2]];
      const cp2 = [params[3], params[4]];
      segment.startTangent = [prePoint[0] - cp1[0], prePoint[1] - cp1[1]];
      segment.endTangent = [currentPoint[0] - cp2[0], currentPoint[1] - cp2[1]];
      if (segment.startTangent[0] === 0 && segment.startTangent[1] === 0) {
        segment.startTangent = [cp1[0] - cp2[0], cp1[1] - cp2[1]];
      }
      if (segment.endTangent[0] === 0 && segment.endTangent[1] === 0) {
        segment.endTangent = [cp2[0] - cp1[0], cp2[1] - cp1[1]];
      }
    } else if (command === "S") {
      const preSegment = segments[i - 1];
      const cp1 = toSymmetry(preSegment.currentPoint, prePoint);
      const cp2 = [params[1], params[2]];
      if (preSegment.command === "C") {
        segment.command = "C";
        segment.startTangent = [prePoint[0] - cp1[0], prePoint[1] - cp1[1]];
        segment.endTangent = [
          currentPoint[0] - cp2[0],
          currentPoint[1] - cp2[1]
        ];
      } else {
        segment.command = "SQ";
        segment.startTangent = [prePoint[0] - cp2[0], prePoint[1] - cp2[1]];
        segment.endTangent = [
          currentPoint[0] - cp2[0],
          currentPoint[1] - cp2[1]
        ];
      }
    } else if (command === "A") {
      const { x: dx1, y: dy1 } = getTangentAtRatio(segment, 0);
      const { x: dx2, y: dy2 } = getTangentAtRatio(segment, 1, false);
      segment.startTangent = [dx1, dy1];
      segment.endTangent = [dx2, dy2];
    }
    segments.push(segment);
  }
  return segments;
}
function getTangentAtRatio(segment, ratio, sign = true) {
  const { rx = 0, ry = 0, xRotation, arcFlag, sweepFlag } = segment.arcParams;
  const p1 = pointOnEllipticalArc(
    { x: segment.prePoint[0], y: segment.prePoint[1] },
    rx,
    ry,
    xRotation,
    !!arcFlag,
    !!sweepFlag,
    { x: segment.currentPoint[0], y: segment.currentPoint[1] },
    ratio
  );
  const p2 = pointOnEllipticalArc(
    { x: segment.prePoint[0], y: segment.prePoint[1] },
    rx,
    ry,
    xRotation,
    !!arcFlag,
    !!sweepFlag,
    { x: segment.currentPoint[0], y: segment.currentPoint[1] },
    sign ? ratio + 5e-3 : ratio - 5e-3
  );
  const xDist = p2.x - p1.x;
  const yDist = p2.y - p1.y;
  const dist4 = Math.sqrt(xDist * xDist + yDist * yDist);
  return { x: -xDist / dist4, y: -yDist / dist4 };
}
function vMag(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}
function vRatio(u, v) {
  return vMag(u) * vMag(v) ? (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v)) : 1;
}
function vAngle(u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
}
function getArcParams(startPoint, params) {
  let rx = params[1];
  let ry = params[2];
  const xRotation = mod_default(deg2rad(params[3]), Math.PI * 2);
  const arcFlag = params[4];
  const sweepFlag = params[5];
  const x1 = startPoint[0];
  const y1 = startPoint[1];
  const x2 = params[6];
  const y2 = params[7];
  const xp = Math.cos(xRotation) * (x1 - x2) / 2 + Math.sin(xRotation) * (y1 - y2) / 2;
  const yp = -1 * Math.sin(xRotation) * (x1 - x2) / 2 + Math.cos(xRotation) * (y1 - y2) / 2;
  const lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
  if (lambda > 1) {
    rx *= Math.sqrt(lambda);
    ry *= Math.sqrt(lambda);
  }
  const diff = rx * rx * (yp * yp) + ry * ry * (xp * xp);
  let f = diff ? Math.sqrt((rx * rx * (ry * ry) - diff) / diff) : 1;
  if (arcFlag === sweepFlag) {
    f *= -1;
  }
  if (isNaN(f)) {
    f = 0;
  }
  const cxp = ry ? f * rx * yp / ry : 0;
  const cyp = rx ? f * -ry * xp / rx : 0;
  const cx = (x1 + x2) / 2 + Math.cos(xRotation) * cxp - Math.sin(xRotation) * cyp;
  const cy = (y1 + y2) / 2 + Math.sin(xRotation) * cxp + Math.cos(xRotation) * cyp;
  const u = [(xp - cxp) / rx, (yp - cyp) / ry];
  const v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
  const theta = vAngle([1, 0], u);
  let dTheta = vAngle(u, v);
  if (vRatio(u, v) <= -1) {
    dTheta = Math.PI;
  }
  if (vRatio(u, v) >= 1) {
    dTheta = 0;
  }
  if (sweepFlag === 0 && dTheta > 0) {
    dTheta = dTheta - 2 * Math.PI;
  }
  if (sweepFlag === 1 && dTheta < 0) {
    dTheta = dTheta + 2 * Math.PI;
  }
  return {
    cx,
    cy,
    // 弧形的起点和终点相同时，长轴和短轴的长度按 0 处理
    rx: isSamePoint(startPoint, [x2, y2]) ? 0 : rx,
    ry: isSamePoint(startPoint, [x2, y2]) ? 0 : ry,
    startAngle: theta,
    endAngle: theta + dTheta,
    xRotation,
    arcFlag,
    sweepFlag
  };
}
function commandsToPathString(commands, object, transform) {
  const { defX = 0, defY = 0 } = object.parsedStyle;
  return commands.reduce((prev, cur) => {
    let path = "";
    if (cur[0] === "M" || cur[0] === "L") {
      const p = vec3_exports.fromValues(cur[1] - defX, cur[2] - defY, 0);
      if (transform) {
        vec3_exports.transformMat4(p, p, transform);
      }
      path = `${cur[0]}${p[0]},${p[1]}`;
    } else if (cur[0] === "Z") {
      path = cur[0];
    } else if (cur[0] === "C") {
      const p1 = vec3_exports.fromValues(cur[1] - defX, cur[2] - defY, 0);
      const p2 = vec3_exports.fromValues(cur[3] - defX, cur[4] - defY, 0);
      const p3 = vec3_exports.fromValues(cur[5] - defX, cur[6] - defY, 0);
      if (transform) {
        vec3_exports.transformMat4(p1, p1, transform);
        vec3_exports.transformMat4(p2, p2, transform);
        vec3_exports.transformMat4(p3, p3, transform);
      }
      path = `${cur[0]}${p1[0]},${p1[1]},${p2[0]},${p2[1]},${p3[0]},${p3[1]}`;
    } else if (cur[0] === "A") {
      const c = vec3_exports.fromValues(cur[6] - defX, cur[7] - defY, 0);
      if (transform) {
        vec3_exports.transformMat4(c, c, transform);
      }
      path = `${cur[0]}${cur[1]},${cur[2]},${cur[3]},${cur[4]},${cur[5]},${c[0]},${c[1]}`;
    } else if (cur[0] === "Q") {
      const p1 = vec3_exports.fromValues(cur[1] - defX, cur[2] - defY, 0);
      const p2 = vec3_exports.fromValues(cur[3] - defX, cur[4] - defY, 0);
      if (transform) {
        vec3_exports.transformMat4(p1, p1, transform);
        vec3_exports.transformMat4(p2, p2, transform);
      }
      path = `${cur[0]}${cur[1]},${cur[2]},${cur[3]},${cur[4]}}`;
    }
    return prev += path;
  }, "");
}
function lineToCommands(x1, y1, x2, y2) {
  return [
    ["M", x1, y1],
    ["L", x2, y2]
  ];
}
function ellipseToCommands(rx, ry, cx, cy) {
  const factor = (-1 + Math.sqrt(2)) / 3 * 4;
  const dx = rx * factor;
  const dy = ry * factor;
  const left = cx - rx;
  const right = cx + rx;
  const top = cy - ry;
  const bottom = cy + ry;
  return [
    ["M", left, cy],
    ["C", left, cy - dy, cx - dx, top, cx, top],
    ["C", cx + dx, top, right, cy - dy, right, cy],
    ["C", right, cy + dy, cx + dx, bottom, cx, bottom],
    ["C", cx - dx, bottom, left, cy + dy, left, cy],
    ["Z"]
  ];
}
function polygonToCommands(points, closed) {
  const result = points.map((point, i) => {
    return [i === 0 ? "M" : "L", point[0], point[1]];
  });
  if (closed) {
    result.push(["Z"]);
  }
  return result;
}
function rectToCommands(width, height, x, y, radius) {
  if (radius) {
    const [tlr, trr, brr, blr] = radius;
    const signX = width > 0 ? 1 : -1;
    const signY = height > 0 ? 1 : -1;
    const sweepFlag = signX + signY !== 0 ? 1 : 0;
    return [
      ["M", signX * tlr + x, y],
      ["L", width - signX * trr + x, y],
      trr ? ["A", trr, trr, 0, 0, sweepFlag, width + x, signY * trr + y] : null,
      ["L", width + x, height - signY * brr + y],
      brr ? ["A", brr, brr, 0, 0, sweepFlag, width + x - signX * brr, height + y] : null,
      ["L", x + signX * blr, height + y],
      blr ? ["A", blr, blr, 0, 0, sweepFlag, x, height + y - signY * blr] : null,
      ["L", x, signY * tlr + y],
      tlr ? ["A", tlr, tlr, 0, 0, sweepFlag, signX * tlr + x, y] : null,
      ["Z"]
    ].filter((command) => command);
  }
  return [
    ["M", x, y],
    ["L", x + width, y],
    ["L", x + width, y + height],
    ["L", x, y + height],
    ["Z"]
  ];
}
function convertToPath(object, transform = object.getLocalTransform()) {
  let commands = [];
  switch (object.nodeName) {
    case "line" /* LINE */:
      const { x1 = 0, y1 = 0, x2 = 0, y2 = 0 } = object.parsedStyle;
      commands = lineToCommands(x1, y1, x2, y2);
      break;
    case "circle" /* CIRCLE */: {
      const { r = 0, cx = 0, cy = 0 } = object.parsedStyle;
      commands = ellipseToCommands(r, r, cx, cy);
      break;
    }
    case "ellipse" /* ELLIPSE */: {
      const {
        rx = 0,
        ry = 0,
        cx = 0,
        cy = 0
      } = object.parsedStyle;
      commands = ellipseToCommands(rx, ry, cx, cy);
      break;
    }
    case "polyline" /* POLYLINE */:
    case "polygon" /* POLYGON */:
      const { points } = object.parsedStyle;
      commands = polygonToCommands(
        points.points,
        object.nodeName === "polygon" /* POLYGON */
      );
      break;
    case "rect" /* RECT */:
      const {
        width = 0,
        height = 0,
        x = 0,
        y = 0,
        radius
      } = object.parsedStyle;
      const hasRadius = radius && radius.some((r) => r !== 0);
      commands = rectToCommands(
        width,
        height,
        x,
        y,
        hasRadius && radius.map(
          (r) => clamp_default(r, 0, Math.min(Math.abs(width) / 2, Math.abs(height) / 2))
        )
      );
      break;
    case "path" /* PATH */:
      const { absolutePath } = object.parsedStyle.path;
      commands = [...absolutePath];
      break;
  }
  if (commands.length) {
    return commandsToPathString(commands, object, transform);
  }
}
function translatePathToString(absolutePath, defX, defY, startOffsetX = 0, startOffsetY = 0, endOffsetX = 0, endOffsetY = 0) {
  const newValue = absolutePath.map((params, i) => {
    const command = params[0];
    const nextSegment = absolutePath[i + 1];
    const useStartOffset = i === 0 && (startOffsetX !== 0 || startOffsetY !== 0);
    const useEndOffset = (i === absolutePath.length - 1 || nextSegment && (nextSegment[0] === "M" || nextSegment[0] === "Z")) && endOffsetX !== 0 && endOffsetY !== 0;
    switch (command) {
      case "M":
        if (useStartOffset) {
          return `M ${params[1] - defX + startOffsetX},${params[2] - defY + startOffsetY} L ${params[1] - defX},${params[2] - defY}`;
        } else {
          return `M ${params[1] - defX},${params[2] - defY}`;
        }
      case "L":
        return `L ${params[1] - defX + (useEndOffset ? endOffsetX : 0)},${params[2] - defY + (useEndOffset ? endOffsetY : 0)}`;
      case "Q":
        return `Q ${params[1] - defX} ${params[2] - defY},${params[3] - defX} ${params[4] - defY}` + (useEndOffset ? ` L ${params[3] - defX + endOffsetX},${params[4] - defY + endOffsetY}` : "");
      case "C":
        return `C ${params[1] - defX} ${params[2] - defY},${params[3] - defX} ${params[4] - defY},${params[5] - defX} ${params[6] - defY}` + (useEndOffset ? ` L ${params[5] - defX + endOffsetX},${params[6] - defY + endOffsetY}` : "");
      case "A":
        return `A ${params[1]} ${params[2]} ${params[3]} ${params[4]} ${params[5]} ${params[6] - defX} ${params[7] - defY}` + (useEndOffset ? ` L ${params[6] - defX + endOffsetX},${params[7] - defY + endOffsetY}` : "");
      case "Z":
        return "Z";
      default:
        break;
    }
  }).join(" ");
  if (~newValue.indexOf("NaN")) {
    return "";
  }
  return newValue;
}

// src/css/parser/path.ts
var internalParsePath = (path) => {
  if (path === "" || Array.isArray(path) && path.length === 0) {
    return {
      absolutePath: [],
      hasArc: false,
      segments: [],
      polygons: [],
      polylines: [],
      curve: null,
      totalLength: 0,
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
    };
  }
  let absolutePath;
  try {
    absolutePath = normalizePath(path);
  } catch (e) {
    absolutePath = normalizePath("");
    console.error(`[g]: Invalid SVG Path definition: ${path}`);
  }
  removeRedundantMCommand(absolutePath);
  const hasArc = hasArcOrBezier(absolutePath);
  const { polygons, polylines } = extractPolygons(absolutePath);
  const segments = path2Segments(absolutePath);
  const { x, y, width, height } = getPathBBox(segments, 0);
  return {
    absolutePath,
    hasArc,
    segments,
    polygons,
    polylines,
    // curve,
    // Delay the calculation of length.
    totalLength: 0,
    rect: {
      x: Number.isFinite(x) ? x : 0,
      y: Number.isFinite(y) ? y : 0,
      width: Number.isFinite(width) ? width : 0,
      height: Number.isFinite(height) ? height : 0
    }
  };
};
var memoizedParsePath = memoize(internalParsePath);
function parsePath(path) {
  return is_string_default(path) ? memoizedParsePath(path) : internalParsePath(path);
}
function mergePaths(left, right, object) {
  let curve1 = left.curve;
  let curve2 = right.curve;
  if (!curve1 || curve1.length === 0) {
    curve1 = path2Curve(left.absolutePath, false);
    left.curve = curve1;
  }
  if (!curve2 || curve2.length === 0) {
    curve2 = path2Curve(right.absolutePath, false);
    right.curve = curve2;
  }
  let curves = [curve1, curve2];
  if (curve1.length !== curve2.length) {
    curves = equalizeSegments(curve1, curve2);
  }
  const curve0 = getDrawDirection(curves[0]) !== getDrawDirection(curves[1]) ? reverseCurve(curves[0]) : clonePath(curves[0]);
  return [
    curve0,
    getRotatedCurve(curves[1], curve0),
    (pathArray) => {
      return pathArray;
    }
  ];
}

// src/css/parser/points.ts
function parsePoints(pointsOrStr, object) {
  let points;
  if (is_string_default(pointsOrStr)) {
    points = pointsOrStr.split(" ").map((pointStr) => {
      const [x, y] = pointStr.split(",");
      return [Number(x), Number(y)];
    });
  } else {
    points = pointsOrStr;
  }
  const segments = [];
  let tempLength = 0;
  let segmentT;
  let segmentL;
  const totalLength = length$2(points);
  points.forEach((p, i) => {
    if (points[i + 1]) {
      segmentT = [0, 0];
      segmentT[0] = tempLength / totalLength;
      segmentL = length$4(p[0], p[1], points[i + 1][0], points[i + 1][1]);
      tempLength += segmentL;
      segmentT[1] = tempLength / totalLength;
      segments.push(segmentT);
    }
  });
  const minX = Math.min(...points.map((point) => point[0]));
  const minY = Math.min(...points.map((point) => point[1]));
  if (object) {
    object.parsedStyle.defX = minX;
    object.parsedStyle.defY = minY;
  }
  return {
    points,
    totalLength,
    segments
  };
}
function mergePoints(left, right) {
  return [
    left.points,
    right.points,
    (points) => {
      return points;
    }
  ];
}

// src/css/parser/transform.ts
var _ = null;
function cast(pattern) {
  return function(contents) {
    let i = 0;
    return pattern.map((x) => {
      return x === _ ? contents[i++] : x;
    });
  };
}
function id(x) {
  return x;
}
var transformFunctions = {
  // @ts-ignore
  matrix: ["NNNNNN", [_, _, 0, 0, _, _, 0, 0, 0, 0, 1, 0, _, _, 0, 1], id],
  matrix3d: ["NNNNNNNNNNNNNNNN", id],
  rotate: ["A"],
  rotatex: ["A"],
  rotatey: ["A"],
  rotatez: ["A"],
  rotate3d: ["NNNA"],
  perspective: ["L"],
  scale: ["Nn", cast([_, _, new CSSUnitValue(1)]), id],
  scalex: [
    "N",
    cast([_, new CSSUnitValue(1), new CSSUnitValue(1)]),
    cast([_, new CSSUnitValue(1)])
  ],
  scaley: [
    "N",
    cast([new CSSUnitValue(1), _, new CSSUnitValue(1)]),
    cast([new CSSUnitValue(1), _])
  ],
  scalez: ["N", cast([new CSSUnitValue(1), new CSSUnitValue(1), _])],
  scale3d: ["NNN", id],
  skew: ["Aa", null, id],
  skewx: ["A", null, cast([_, Odeg])],
  skewy: ["A", null, cast([Odeg, _])],
  translate: ["Tt", cast([_, _, Opx]), id],
  translatex: ["T", cast([_, Opx, Opx]), cast([_, Opx])],
  translatey: ["T", cast([Opx, _, Opx]), cast([Opx, _])],
  translatez: ["L", cast([Opx, Opx, _])],
  translate3d: ["TTL", id]
};
function parseTransform(string) {
  string = (string || "none").toLowerCase().trim();
  if (string === "none") {
    return [];
  }
  const transformRegExp = /\s*(\w+)\(([^)]*)\)/g;
  const result = [];
  let match;
  let prevLastIndex = 0;
  while (match = transformRegExp.exec(string)) {
    if (match.index !== prevLastIndex) {
      return [];
    }
    prevLastIndex = match.index + match[0].length;
    const functionName = match[1];
    const functionData = transformFunctions[functionName];
    if (!functionData) {
      return [];
    }
    const args = match[2].split(",");
    const argTypes = functionData[0];
    if (argTypes.length < args.length) {
      return [];
    }
    const parsedArgs = [];
    for (let i = 0; i < argTypes.length; i++) {
      const arg = args[i];
      const type = argTypes[i];
      let parsedArg;
      if (!arg) {
        parsedArg = {
          a: Odeg,
          n: parsedArgs[0],
          t: Opx
        }[type];
      } else {
        parsedArg = {
          A: (s) => {
            return s.trim() === "0" ? Odeg : parseAngle(s);
          },
          N: parseNumber,
          T: parseLengthOrPercentage,
          L: parseLength
        }[type.toUpperCase()](arg);
      }
      if (parsedArg === void 0) {
        return [];
      }
      parsedArgs.push(parsedArg);
    }
    result.push({ t: functionName, d: parsedArgs });
    if (transformRegExp.lastIndex === string.length) {
      return result;
    }
  }
  return [];
}
function convertItemToMatrix(item) {
  let x;
  let y;
  let z;
  let angle3;
  switch (item.t) {
    case "rotatex":
      angle3 = deg2rad(convertAngleUnit(item.d[0]));
      return [
        1,
        0,
        0,
        0,
        0,
        Math.cos(angle3),
        Math.sin(angle3),
        0,
        0,
        -Math.sin(angle3),
        Math.cos(angle3),
        0,
        0,
        0,
        0,
        1
      ];
    case "rotatey":
      angle3 = deg2rad(convertAngleUnit(item.d[0]));
      return [
        Math.cos(angle3),
        0,
        -Math.sin(angle3),
        0,
        0,
        1,
        0,
        0,
        Math.sin(angle3),
        0,
        Math.cos(angle3),
        0,
        0,
        0,
        0,
        1
      ];
    case "rotate":
    case "rotatez":
      angle3 = deg2rad(convertAngleUnit(item.d[0]));
      return [
        Math.cos(angle3),
        Math.sin(angle3),
        0,
        0,
        -Math.sin(angle3),
        Math.cos(angle3),
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
    case "rotate3d":
      x = item.d[0].value;
      y = item.d[1].value;
      z = item.d[2].value;
      angle3 = deg2rad(convertAngleUnit(item.d[3]));
      const sqrLength = x * x + y * y + z * z;
      if (sqrLength === 0) {
        x = 1;
        y = 0;
        z = 0;
      } else if (sqrLength !== 1) {
        const length5 = Math.sqrt(sqrLength);
        x /= length5;
        y /= length5;
        z /= length5;
      }
      const s = Math.sin(angle3 / 2);
      const sc = s * Math.cos(angle3 / 2);
      const sq = s * s;
      return [
        1 - 2 * (y * y + z * z) * sq,
        2 * (x * y * sq + z * sc),
        2 * (x * z * sq - y * sc),
        0,
        2 * (x * y * sq - z * sc),
        1 - 2 * (x * x + z * z) * sq,
        2 * (y * z * sq + x * sc),
        0,
        2 * (x * z * sq + y * sc),
        2 * (y * z * sq - x * sc),
        1 - 2 * (x * x + y * y) * sq,
        0,
        0,
        0,
        0,
        1
      ];
    case "scale":
      return [
        item.d[0].value,
        0,
        0,
        0,
        0,
        item.d[1].value,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
    case "scalex":
      return [item.d[0].value, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case "scaley":
      return [1, 0, 0, 0, 0, item.d[0].value, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case "scalez":
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, item.d[0].value, 0, 0, 0, 0, 1];
    case "scale3d":
      return [
        item.d[0].value,
        0,
        0,
        0,
        0,
        item.d[1].value,
        0,
        0,
        0,
        0,
        item.d[2].value,
        0,
        0,
        0,
        0,
        1
      ];
    case "skew":
      const xAngle = deg2rad(convertAngleUnit(item.d[0]));
      const yAngle = deg2rad(convertAngleUnit(item.d[1]));
      return [
        1,
        Math.tan(yAngle),
        0,
        0,
        Math.tan(xAngle),
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ];
    case "skewx":
      angle3 = deg2rad(convertAngleUnit(item.d[0]));
      return [1, 0, 0, 0, Math.tan(angle3), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case "skewy":
      angle3 = deg2rad(convertAngleUnit(item.d[0]));
      return [1, Math.tan(angle3), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    case "translate":
      x = convertPercentUnit(item.d[0], 0, null) || 0;
      y = convertPercentUnit(item.d[1], 0, null) || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, 0, 1];
    case "translatex":
      x = convertPercentUnit(item.d[0], 0, null) || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, 0, 0, 1];
    case "translatey":
      y = convertPercentUnit(item.d[0], 0, null) || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, y, 0, 1];
    case "translatez":
      z = convertPercentUnit(item.d[0], 0, null) || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, z, 1];
    case "translate3d":
      x = convertPercentUnit(item.d[0], 0, null) || 0;
      y = convertPercentUnit(item.d[1], 0, null) || 0;
      z = convertPercentUnit(item.d[2], 0, null) || 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
    case "perspective":
      const t = convertPercentUnit(item.d[0], 0, null) || 0;
      const p = t ? -1 / t : 0;
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, p, 0, 0, 0, 1];
    case "matrix":
      return [
        item.d[0].value,
        item.d[1].value,
        0,
        0,
        item.d[2].value,
        item.d[3].value,
        0,
        0,
        0,
        0,
        1,
        0,
        item.d[4].value,
        item.d[5].value,
        0,
        1
      ];
    case "matrix3d":
      return item.d.map((d) => d.value);
    default:
  }
}
function multiplyMatrices(a, b) {
  return [
    a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
    a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
    a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
    a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
    a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
    a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
    a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
    a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
    a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
    a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
    a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
    a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
    a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
    a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
    a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
    a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
  ];
}
function convertToMatrix(transformList) {
  if (transformList.length === 0) {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }
  return transformList.map(convertItemToMatrix).reduce(multiplyMatrices);
}
function makeMatrixDecomposition(transformList) {
  const translate3 = [0, 0, 0];
  const scale7 = [1, 1, 1];
  const skew = [0, 0, 0];
  const perspective2 = [0, 0, 0, 1];
  const quaternion = [0, 0, 0, 1];
  decomposeMat4(
    // @ts-ignore
    convertToMatrix(transformList),
    translate3,
    scale7,
    skew,
    perspective2,
    quaternion
  );
  return [[translate3, scale7, skew, quaternion, perspective2]];
}
var composeMatrix = function() {
  function multiply7(a, b) {
    const result = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 4; k++) {
          result[i][j] += b[i][k] * a[k][j];
        }
      }
    }
    return result;
  }
  function is2D(m) {
    return m[0][2] == 0 && m[0][3] == 0 && m[1][2] == 0 && m[1][3] == 0 && m[2][0] == 0 && m[2][1] == 0 && m[2][2] == 1 && m[2][3] == 0 && m[3][2] == 0 && m[3][3] == 1;
  }
  function composeMatrix2(translate3, scale7, skew, quat2, perspective2) {
    let matrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    for (let i = 0; i < 4; i++) {
      matrix[i][3] = perspective2[i];
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        matrix[3][i] += translate3[j] * matrix[j][i];
      }
    }
    const x = quat2[0], y = quat2[1], z = quat2[2], w = quat2[3];
    const rotMatrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    rotMatrix[0][0] = 1 - 2 * (y * y + z * z);
    rotMatrix[0][1] = 2 * (x * y - z * w);
    rotMatrix[0][2] = 2 * (x * z + y * w);
    rotMatrix[1][0] = 2 * (x * y + z * w);
    rotMatrix[1][1] = 1 - 2 * (x * x + z * z);
    rotMatrix[1][2] = 2 * (y * z - x * w);
    rotMatrix[2][0] = 2 * (x * z - y * w);
    rotMatrix[2][1] = 2 * (y * z + x * w);
    rotMatrix[2][2] = 1 - 2 * (x * x + y * y);
    matrix = multiply7(matrix, rotMatrix);
    const temp = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    if (skew[2]) {
      temp[2][1] = skew[2];
      matrix = multiply7(matrix, temp);
    }
    if (skew[1]) {
      temp[2][1] = 0;
      temp[2][0] = skew[0];
      matrix = multiply7(matrix, temp);
    }
    if (skew[0]) {
      temp[2][0] = 0;
      temp[1][0] = skew[0];
      matrix = multiply7(matrix, temp);
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        matrix[i][j] *= scale7[i];
      }
    }
    if (is2D(matrix)) {
      return [
        matrix[0][0],
        matrix[0][1],
        matrix[1][0],
        matrix[1][1],
        matrix[3][0],
        matrix[3][1]
      ];
    }
    return matrix[0].concat(matrix[1], matrix[2], matrix[3]);
  }
  return composeMatrix2;
}();
function numberToLongString(x) {
  return x.toFixed(6).replace(".000000", "");
}
function mergeMatrices(left, right) {
  let leftArgs;
  let rightArgs;
  if (left.decompositionPair !== right) {
    left.decompositionPair = right;
    leftArgs = makeMatrixDecomposition(left);
  }
  if (right.decompositionPair !== left) {
    right.decompositionPair = left;
    rightArgs = makeMatrixDecomposition(right);
  }
  if (leftArgs[0] === null || rightArgs[0] === null)
    return [
      // @ts-ignore
      [false],
      // @ts-ignore
      [true],
      // @ts-ignore
      (x) => {
        return x ? right[0].d : left[0].d;
      }
    ];
  leftArgs[0].push(0);
  rightArgs[0].push(1);
  return [
    leftArgs,
    rightArgs,
    // @ts-ignore
    (list) => {
      const q = quat(leftArgs[0][3], rightArgs[0][3], list[5]);
      const mat = composeMatrix(list[0], list[1], list[2], q, list[4]);
      const stringifiedArgs = mat.map(numberToLongString).join(",");
      return stringifiedArgs;
    }
  ];
}
function dot5(v1, v2) {
  let result = 0;
  for (let i = 0; i < v1.length; i++) {
    result += v1[i] * v2[i];
  }
  return result;
}
function quat(fromQ, toQ, f) {
  let product = dot5(fromQ, toQ);
  product = clamp_default(product, -1, 1);
  let quat2 = [];
  if (product === 1) {
    quat2 = fromQ;
  } else {
    const theta = Math.acos(product);
    const w = Math.sin(f * theta) * 1 / Math.sqrt(1 - product * product);
    for (let i = 0; i < 4; i++) {
      quat2.push(fromQ[i] * (Math.cos(f * theta) - product * w) + toQ[i] * w);
    }
  }
  return quat2;
}
function typeTo2D(type) {
  return type.replace(/[xy]/, "");
}
function typeTo3D(type) {
  return type.replace(/(x|y|z|3d)?$/, "3d");
}
var isMatrixOrPerspective = function(lt, rt) {
  return lt === "perspective" && rt === "perspective" || (lt === "matrix" || lt === "matrix3d") && (rt === "matrix" || rt === "matrix3d");
};
function mergeTransforms(left, right, target) {
  let flipResults = false;
  if (!left.length || !right.length) {
    if (!left.length) {
      flipResults = true;
      left = right;
      right = [];
    }
    for (let i = 0; i < left.length; i++) {
      const { t: type, d: args } = left[i];
      const defaultValue = type.substring(0, 5) === "scale" ? 1 : 0;
      right.push({
        t: type,
        d: args.map((arg) => {
          if (typeof arg === "number") {
            return getOrCreateUnitValue(defaultValue);
          }
          return getOrCreateUnitValue(defaultValue, arg.unit);
        })
      });
    }
  }
  let leftResult = [];
  let rightResult = [];
  let types = [];
  if (left.length !== right.length) {
    const merged = mergeMatrices(left, right);
    leftResult = [merged[0]];
    rightResult = [merged[1]];
    types = [["matrix", [merged[2]]]];
  } else {
    for (let i = 0; i < left.length; i++) {
      const leftType = left[i].t;
      const rightType = right[i].t;
      let leftArgs = left[i].d;
      let rightArgs = right[i].d;
      const leftFunctionData = transformFunctions[leftType];
      const rightFunctionData = transformFunctions[rightType];
      let type;
      if (isMatrixOrPerspective(leftType, rightType)) {
        const merged = mergeMatrices([left[i]], [right[i]]);
        leftResult.push(merged[0]);
        rightResult.push(merged[1]);
        types.push(["matrix", [merged[2]]]);
        continue;
      } else if (leftType === rightType) {
        type = leftType;
      } else if (leftFunctionData[2] && rightFunctionData[2] && typeTo2D(leftType) === typeTo2D(rightType)) {
        type = typeTo2D(leftType);
        leftArgs = leftFunctionData[2](leftArgs);
        rightArgs = rightFunctionData[2](rightArgs);
      } else if (leftFunctionData[1] && rightFunctionData[1] && typeTo3D(leftType) === typeTo3D(rightType)) {
        type = typeTo3D(leftType);
        leftArgs = leftFunctionData[1](leftArgs);
        rightArgs = rightFunctionData[1](rightArgs);
      } else {
        const merged = mergeMatrices(left, right);
        leftResult = [merged[0]];
        rightResult = [merged[1]];
        types = [["matrix", [merged[2]]]];
        break;
      }
      const leftArgsCopy = [];
      const rightArgsCopy = [];
      const stringConversions = [];
      for (let j = 0; j < leftArgs.length; j++) {
        const merged = mergeDimensions(
          leftArgs[j],
          rightArgs[j],
          target,
          false,
          j
        );
        leftArgsCopy[j] = merged[0];
        rightArgsCopy[j] = merged[1];
        stringConversions.push(merged[2]);
      }
      leftResult.push(leftArgsCopy);
      rightResult.push(rightArgsCopy);
      types.push([type, stringConversions]);
    }
  }
  if (flipResults) {
    const tmp2 = leftResult;
    leftResult = rightResult;
    rightResult = tmp2;
  }
  return [
    leftResult,
    rightResult,
    (list) => {
      return list.map((args, i) => {
        const stringifiedArgs = args.map((arg, j) => {
          return types[i][1][j](arg);
        }).join(",");
        if (types[i][0] === "matrix" && stringifiedArgs.split(",").length === 16) {
          types[i][0] = "matrix3d";
        }
        if (types[i][0] === "matrix3d" && stringifiedArgs.split(",").length === 6) {
          types[i][0] = "matrix";
        }
        return types[i][0] + "(" + stringifiedArgs + ")";
      }).join(" ");
    }
  ];
}

// src/css/parser/transform-origin.ts
var parseTransformOrigin = memoize(
  (value) => {
    if (is_string_default(value)) {
      if (value === "text-anchor") {
        return [getOrCreateUnitValue(0, "px"), getOrCreateUnitValue(0, "px")];
      }
      const values = value.split(" ");
      if (values.length === 1) {
        if (values[0] === "top" || values[0] === "bottom") {
          values[1] = values[0];
          values[0] = "center";
        } else {
          values[1] = "center";
        }
      }
      if (values.length !== 2) {
        return null;
      }
      return [
        parseLengthOrPercentage(
          convertKeyword2Percent(values[0])
        ),
        parseLengthOrPercentage(
          convertKeyword2Percent(values[1])
        )
      ];
    } else {
      return [
        getOrCreateUnitValue(value[0] || 0, "px"),
        getOrCreateUnitValue(value[1] || 0, "px")
      ];
    }
  }
);
function convertKeyword2Percent(keyword) {
  if (keyword === "center") {
    return "50%";
  } else if (keyword === "left" || keyword === "top") {
    return "0";
  } else if (keyword === "right" || keyword === "bottom") {
    return "100%";
  }
  return keyword;
}

// src/css/StyleValueRegistry.ts
var BUILT_IN_PROPERTIES = [
  {
    /**
     * used in CSS Layout API
     * eg. `display: 'flex'`
     */
    n: "display",
    k: ["none"]
  },
  {
    /**
     * range [0.0, 1.0]
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
     */
    n: "opacity",
    int: true,
    inh: true,
    d: "1",
    syntax: "<opacity-value>" /* OPACITY_VALUE */
  },
  {
    /**
     * inheritable, range [0.0, 1.0]
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-opacity
     * @see https://svgwg.org/svg2-draft/painting.html#FillOpacity
     */
    n: "fillOpacity",
    int: true,
    inh: true,
    d: "1",
    syntax: "<opacity-value>" /* OPACITY_VALUE */
  },
  {
    /**
     * inheritable, range [0.0, 1.0]
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-opacity
     * @see https://svgwg.org/svg2-draft/painting.html#StrokeOpacity
     */
    n: "strokeOpacity",
    int: true,
    inh: true,
    d: "1",
    syntax: "<opacity-value>" /* OPACITY_VALUE */
  },
  {
    /**
     * background-color is not inheritable
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes
     */
    n: "fill",
    int: true,
    k: ["none"],
    d: "none",
    syntax: "<paint>" /* PAINT */
  },
  {
    n: "fillRule",
    k: ["nonzero", "evenodd"],
    d: "nonzero"
  },
  /**
   * default to none
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke#usage_notes
   */
  {
    n: "stroke",
    int: true,
    k: ["none"],
    d: "none",
    syntax: "<paint>" /* PAINT */,
    /**
     * Stroke 'none' won't affect geometry but others will.
     */
    l: true
  },
  {
    n: "shadowType",
    k: ["inner", "outer", "both"],
    d: "outer",
    l: true
  },
  {
    n: "shadowColor",
    int: true,
    syntax: "<color>" /* COLOR */
  },
  {
    n: "shadowOffsetX",
    int: true,
    l: true,
    d: "0",
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "shadowOffsetY",
    int: true,
    l: true,
    d: "0",
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "shadowBlur",
    int: true,
    l: true,
    d: "0",
    syntax: "<shadow-blur>" /* SHADOW_BLUR */
  },
  {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width
     */
    n: "lineWidth",
    int: true,
    inh: true,
    d: "1",
    l: true,
    a: ["strokeWidth"],
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "increasedLineWidthForHitTesting",
    inh: true,
    d: "0",
    l: true,
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "lineJoin",
    inh: true,
    l: true,
    a: ["strokeLinejoin"],
    k: ["miter", "bevel", "round"],
    d: "miter"
  },
  {
    n: "lineCap",
    inh: true,
    l: true,
    a: ["strokeLinecap"],
    k: ["butt", "round", "square"],
    d: "butt"
  },
  {
    n: "lineDash",
    int: true,
    inh: true,
    k: ["none"],
    a: ["strokeDasharray"],
    syntax: "[<length> | <percentage>]{1,2}" /* LENGTH_PERCENTAGE_12 */
  },
  {
    n: "lineDashOffset",
    int: true,
    inh: true,
    d: "0",
    a: ["strokeDashoffset"],
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "offsetPath",
    syntax: "<defined-path>" /* DEFINED_PATH */
  },
  {
    n: "offsetDistance",
    int: true,
    syntax: "<offset-distance>" /* OFFSET_DISTANCE */
  },
  {
    n: "dx",
    int: true,
    l: true,
    d: "0",
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "dy",
    int: true,
    l: true,
    d: "0",
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "zIndex",
    ind: true,
    int: true,
    d: "0",
    k: ["auto"],
    syntax: "<z-index>" /* Z_INDEX */
  },
  {
    n: "visibility",
    k: ["visible", "hidden"],
    ind: true,
    inh: true,
    /**
     * support interpolation
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/visibility#interpolation
     */
    int: true,
    d: "visible"
  },
  {
    n: "pointerEvents",
    inh: true,
    k: [
      "none",
      "auto",
      "stroke",
      "fill",
      "painted",
      "visible",
      "visiblestroke",
      "visiblefill",
      "visiblepainted",
      // 'bounding-box',
      "all"
    ],
    d: "auto"
  },
  {
    n: "filter",
    ind: true,
    l: true,
    k: ["none"],
    d: "none",
    syntax: "<filter>" /* FILTER */
  },
  {
    n: "clipPath",
    syntax: "<defined-path>" /* DEFINED_PATH */
  },
  {
    n: "textPath",
    syntax: "<defined-path>" /* DEFINED_PATH */
  },
  {
    n: "textPathSide",
    k: ["left", "right"],
    d: "left"
  },
  {
    n: "textPathStartOffset",
    l: true,
    d: "0",
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "transform",
    p: 100,
    int: true,
    k: ["none"],
    d: "none",
    syntax: "<transform>" /* TRANSFORM */
  },
  {
    n: "transformOrigin",
    p: 100,
    // int: true,
    d: (nodeName) => {
      if (nodeName === "circle" /* CIRCLE */ || nodeName === "ellipse" /* ELLIPSE */) {
        return "center";
      }
      if (nodeName === "text" /* TEXT */) {
        return "text-anchor";
      }
      return "left top";
    },
    l: true,
    syntax: "<transform-origin>" /* TRANSFORM_ORIGIN */
  },
  {
    n: "anchor",
    p: 99,
    d: (nodeName) => {
      if (nodeName === "circle" /* CIRCLE */ || nodeName === "ellipse" /* ELLIPSE */) {
        return "0.5 0.5";
      }
      return "0 0";
    },
    l: true,
    syntax: "[<length> | <percentage>]{1,2}" /* LENGTH_PERCENTAGE_12 */
  },
  // <circle> & <ellipse>
  {
    n: "cx",
    int: true,
    d: "0",
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    n: "cy",
    int: true,
    d: "0",
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    n: "cz",
    int: true,
    d: "0",
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    n: "r",
    int: true,
    l: true,
    d: "0",
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "rx",
    int: true,
    l: true,
    d: "0",
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "ry",
    int: true,
    l: true,
    d: "0",
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  // Rect Image Group
  {
    // x in local space
    n: "x",
    int: true,
    d: "0",
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    // y in local space
    n: "y",
    int: true,
    d: "0",
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    // z in local space
    n: "z",
    int: true,
    d: "0",
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    n: "width",
    int: true,
    l: true,
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/width
     */
    k: ["auto", "fit-content", "min-content", "max-content"],
    d: "0",
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "height",
    int: true,
    l: true,
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/height
     */
    k: ["auto", "fit-content", "min-content", "max-content"],
    d: "0",
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "radius",
    int: true,
    l: true,
    d: "0",
    syntax: "[<length> | <percentage>]{1,4}" /* LENGTH_PERCENTAGE_14 */
  },
  // Line
  {
    n: "x1",
    int: true,
    l: true,
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    n: "y1",
    int: true,
    l: true,
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    n: "z1",
    int: true,
    l: true,
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    n: "x2",
    int: true,
    l: true,
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    n: "y2",
    int: true,
    l: true,
    syntax: "<coordinate>" /* COORDINATE */
  },
  {
    n: "z2",
    int: true,
    l: true,
    syntax: "<coordinate>" /* COORDINATE */
  },
  // Path
  {
    n: "path",
    int: true,
    l: true,
    d: "",
    a: ["d"],
    syntax: "<path>" /* PATH */,
    p: 50
  },
  // Polyline & Polygon
  {
    n: "points",
    /**
     * support interpolation
     */
    int: true,
    l: true,
    syntax: "<list-of-points>" /* LIST_OF_POINTS */,
    p: 50
  },
  // Text
  {
    n: "text",
    l: true,
    d: "",
    syntax: "<text>" /* TEXT */,
    p: 50
  },
  {
    n: "textTransform",
    l: true,
    inh: true,
    k: ["capitalize", "uppercase", "lowercase", "none"],
    d: "none",
    syntax: "<text-transform>" /* TEXT_TRANSFORM */,
    p: 51
    // it must get parsed after text
  },
  {
    n: "font",
    l: true
  },
  {
    n: "fontSize",
    int: true,
    inh: true,
    /**
     * @see https://www.w3schools.com/css/css_font_size.asp
     */
    d: "16px",
    l: true,
    syntax: "<length> | <percentage>" /* LENGTH_PERCENTAGE */
  },
  {
    n: "fontFamily",
    l: true,
    inh: true,
    d: "sans-serif"
  },
  {
    n: "fontStyle",
    l: true,
    inh: true,
    k: ["normal", "italic", "oblique"],
    d: "normal"
  },
  {
    n: "fontWeight",
    l: true,
    inh: true,
    k: ["normal", "bold", "bolder", "lighter"],
    d: "normal"
  },
  {
    n: "fontVariant",
    l: true,
    inh: true,
    k: ["normal", "small-caps"],
    d: "normal"
  },
  {
    n: "lineHeight",
    l: true,
    syntax: "<length>" /* LENGTH */,
    int: true,
    d: "0"
  },
  {
    n: "letterSpacing",
    l: true,
    syntax: "<length>" /* LENGTH */,
    int: true,
    d: "0"
  },
  {
    n: "miterLimit",
    l: true,
    syntax: "<number>" /* NUMBER */,
    d: (nodeName) => {
      if (nodeName === "path" /* PATH */ || nodeName === "polygon" /* POLYGON */ || nodeName === "polyline" /* POLYLINE */) {
        return "4";
      }
      return "10";
    }
  },
  {
    n: "wordWrap",
    l: true
  },
  {
    n: "wordWrapWidth",
    l: true
  },
  {
    n: "maxLines",
    l: true
  },
  {
    n: "textOverflow",
    l: true,
    d: "clip"
  },
  {
    n: "leading",
    l: true
  },
  {
    n: "textBaseline",
    l: true,
    inh: true,
    k: ["top", "hanging", "middle", "alphabetic", "ideographic", "bottom"],
    d: "alphabetic"
  },
  {
    n: "textAlign",
    l: true,
    inh: true,
    k: ["start", "center", "middle", "end", "left", "right"],
    d: "start"
  },
  // {
  //   n: 'whiteSpace',
  //   l: true,
  // },
  {
    n: "markerStart",
    syntax: "<marker>" /* MARKER */
  },
  {
    n: "markerEnd",
    syntax: "<marker>" /* MARKER */
  },
  {
    n: "markerMid",
    syntax: "<marker>" /* MARKER */
  },
  {
    n: "markerStartOffset",
    syntax: "<length>" /* LENGTH */,
    l: true,
    int: true,
    d: "0"
  },
  {
    n: "markerEndOffset",
    syntax: "<length>" /* LENGTH */,
    l: true,
    int: true,
    d: "0"
  }
];
var GEOMETRY_ATTRIBUTE_NAMES = BUILT_IN_PROPERTIES.filter((n) => !!n.l).map(
  (n) => n.n
);
var propertyMetadataCache = {};
var unresolvedProperties = /* @__PURE__ */ new WeakMap();
var isPropertyResolved = (object, name) => {
  const properties = unresolvedProperties.get(object);
  if (!properties || properties.length === 0) {
    return true;
  }
  return properties.includes(name);
};
var DefaultStyleValueRegistry = class {
  /**
   * need recalc later
   */
  // dirty = false;
  constructor(runtime2) {
    this.runtime = runtime2;
    BUILT_IN_PROPERTIES.forEach((property) => {
      this.registerMetadata(property);
    });
  }
  registerMetadata(metadata) {
    [metadata.n, ...metadata.a || []].forEach((name) => {
      propertyMetadataCache[name] = metadata;
    });
  }
  unregisterMetadata(name) {
    delete propertyMetadataCache[name];
  }
  getPropertySyntax(syntax) {
    return this.runtime.CSSPropertySyntaxFactory[syntax];
  }
  /**
   * * parse value, eg.
   * fill: 'red' => CSSRGB
   * translateX: '10px' => CSSUnitValue { unit: 'px', value: 10 }
   * fontSize: '2em' => { unit: 'px', value: 32 }
   *
   * * calculate used value
   * * post process
   */
  processProperties(object, attributes, options = {
    skipUpdateAttribute: false,
    skipParse: false,
    forceUpdateGeometry: false,
    usedAttributes: []
  }) {
    if (!this.runtime.enableCSSParsing) {
      Object.assign(object.attributes, attributes);
      const attributeNames2 = Object.keys(attributes);
      const oldClipPath = object.parsedStyle.clipPath;
      const oldOffsetPath = object.parsedStyle.offsetPath;
      object.parsedStyle = Object.assign(object.parsedStyle, attributes);
      let needUpdateGeometry2 = !!options.forceUpdateGeometry;
      if (!needUpdateGeometry2) {
        for (let i = 0; i < GEOMETRY_ATTRIBUTE_NAMES.length; i++) {
          if (GEOMETRY_ATTRIBUTE_NAMES[i] in attributes) {
            needUpdateGeometry2 = true;
            break;
          }
        }
      }
      if (attributes.fill) {
        object.parsedStyle.fill = parseColor(attributes.fill);
      }
      if (attributes.stroke) {
        object.parsedStyle.stroke = parseColor(attributes.stroke);
      }
      if (attributes.shadowColor) {
        object.parsedStyle.shadowColor = parseColor(attributes.shadowColor);
      }
      if (attributes.filter) {
        object.parsedStyle.filter = parseFilter(attributes.filter);
      }
      if (!is_nil_default(attributes.radius)) {
        object.parsedStyle.radius = parseDimensionArrayFormat(
          // @ts-ignore
          attributes.radius,
          4
        );
      }
      if (!is_nil_default(attributes.lineDash)) {
        object.parsedStyle.lineDash = parseDimensionArrayFormat(
          attributes.lineDash,
          2
        );
      }
      if (attributes.points) {
        object.parsedStyle.points = parsePoints(attributes.points, object);
      }
      if (attributes.path === "") {
        object.parsedStyle.path = __spreadValues({}, EMPTY_PARSED_PATH);
      }
      if (attributes.path) {
        object.parsedStyle.path = parsePath(
          // @ts-ignore
          attributes.path
        );
        object.parsedStyle.defX = object.parsedStyle.path.rect.x;
        object.parsedStyle.defY = object.parsedStyle.path.rect.y;
      }
      if (attributes.textTransform) {
        this.runtime.CSSPropertySyntaxFactory["<text-transform>"].calculator(
          null,
          null,
          { value: attributes.textTransform },
          object,
          null
        );
      }
      if (attributes.clipPath) {
        this.runtime.CSSPropertySyntaxFactory["<defined-path>"].calculator(
          "clipPath",
          oldClipPath,
          attributes.clipPath,
          object,
          this.runtime
        );
      }
      if (attributes.offsetPath) {
        this.runtime.CSSPropertySyntaxFactory["<defined-path>"].calculator(
          "offsetPath",
          oldOffsetPath,
          attributes.offsetPath,
          object,
          this.runtime
        );
      }
      if (attributes.anchor) {
        object.parsedStyle.anchor = parseDimensionArrayFormat(
          // @ts-ignorex
          attributes.anchor,
          2
        );
      }
      if (attributes.transform) {
        object.parsedStyle.transform = parseTransform(attributes.transform);
      }
      if (attributes.transformOrigin) {
        object.parsedStyle.transformOrigin = parseTransformOrigin(
          attributes.transformOrigin
        );
      }
      if (attributes.markerStart) {
        object.parsedStyle.markerStart = this.runtime.CSSPropertySyntaxFactory["<marker>"].calculator(
          null,
          // @ts-ignore
          attributes.markerStart,
          // @ts-ignore
          attributes.markerStart,
          null,
          null
        );
      }
      if (attributes.markerEnd) {
        object.parsedStyle.markerEnd = this.runtime.CSSPropertySyntaxFactory["<marker>"].calculator(
          null,
          // @ts-ignore
          attributes.markerEnd,
          // @ts-ignore
          attributes.markerEnd,
          null,
          null
        );
      }
      if (attributes.markerMid) {
        object.parsedStyle.markerMid = this.runtime.CSSPropertySyntaxFactory["<marker>"].calculator(
          "",
          // @ts-ignore
          attributes.markerMid,
          // @ts-ignore
          attributes.markerMid,
          null,
          null
        );
      }
      if (
        // Circle & Ellipse
        (object.nodeName === "circle" /* CIRCLE */ || object.nodeName === "ellipse" /* ELLIPSE */) && // @ts-ignore
        (!is_nil_default(attributes.cx) || // @ts-ignore
        !is_nil_default(attributes.cy)) || (object.nodeName === "rect" /* RECT */ || object.nodeName === "image" /* IMAGE */ || object.nodeName === "g" /* GROUP */ || object.nodeName === "html" /* HTML */ || object.nodeName === "text" /* TEXT */ || object.nodeName === "mesh" /* MESH */) && // @ts-ignore
        (!is_nil_default(attributes.x) || // @ts-ignore
        !is_nil_default(attributes.y) || // @ts-ignore
        !is_nil_default(attributes.z)) || // Line
        object.nodeName === "line" /* LINE */ && // @ts-ignore
        (!is_nil_default(attributes.x1) || // @ts-ignore
        !is_nil_default(attributes.y1) || // @ts-ignore
        !is_nil_default(attributes.z1) || // @ts-ignore
        !is_nil_default(attributes.x2) || // @ts-ignore
        !is_nil_default(attributes.y2) || // @ts-ignore
        !is_nil_default(attributes.z2))
      ) {
        this.runtime.CSSPropertySyntaxFactory["<coordinate>"].postProcessor(
          object,
          attributeNames2
        );
      }
      if (!is_nil_default(attributes.zIndex)) {
        this.runtime.CSSPropertySyntaxFactory["<z-index>"].postProcessor(
          object,
          attributeNames2
        );
      }
      if (attributes.path) {
        this.runtime.CSSPropertySyntaxFactory["<path>"].postProcessor(
          object,
          attributeNames2
        );
      }
      if (attributes.points) {
        this.runtime.CSSPropertySyntaxFactory["<list-of-points>"].postProcessor(
          object,
          attributeNames2
        );
      }
      if (!is_nil_default(attributes.offsetDistance)) {
        this.runtime.CSSPropertySyntaxFactory["<offset-distance>"].postProcessor(object, attributeNames2);
      }
      if (attributes.transform) {
        this.runtime.CSSPropertySyntaxFactory["<transform>"].postProcessor(
          object,
          attributeNames2
        );
      }
      if (needUpdateGeometry2) {
        this.updateGeometry(object);
      }
      return;
    }
    const {
      skipUpdateAttribute,
      skipParse,
      forceUpdateGeometry,
      usedAttributes
    } = options;
    let needUpdateGeometry = forceUpdateGeometry;
    let attributeNames = Object.keys(attributes);
    attributeNames.forEach((attributeName) => {
      var _a;
      if (!skipUpdateAttribute) {
        object.attributes[attributeName] = attributes[attributeName];
      }
      if (!needUpdateGeometry && ((_a = propertyMetadataCache[attributeName]) == null ? void 0 : _a.l)) {
        needUpdateGeometry = true;
      }
    });
    if (!skipParse) {
      attributeNames.forEach((name) => {
        object.computedStyle[name] = this.parseProperty(
          name,
          object.attributes[name],
          object
        );
      });
    }
    if (usedAttributes == null ? void 0 : usedAttributes.length) {
      attributeNames = Array.from(
        new Set(attributeNames.concat(usedAttributes))
      );
    }
    attributeNames.forEach((name) => {
      if (name in object.computedStyle) {
        object.parsedStyle[name] = this.computeProperty(
          name,
          object.computedStyle[name],
          object
        );
      }
    });
    if (needUpdateGeometry) {
      this.updateGeometry(object);
    }
    attributeNames.forEach((name) => {
      if (name in object.parsedStyle) {
        this.postProcessProperty(name, object, attributeNames);
      }
    });
    if (this.runtime.enableCSSParsing && object.children.length) {
      attributeNames.forEach((name) => {
        if (name in object.parsedStyle && this.isPropertyInheritable(name)) {
          object.children.forEach((child) => {
            child.internalSetAttribute(name, null, {
              skipUpdateAttribute: true,
              skipParse: true
            });
          });
        }
      });
    }
  }
  /**
   * string -> parsed value
   */
  parseProperty(name, value, object) {
    const metadata = propertyMetadataCache[name];
    let computed = value;
    if (value === "" || is_nil_default(value)) {
      value = "unset";
    }
    if (value === "unset" || value === "initial" || value === "inherit") {
      computed = getOrCreateKeyword(value);
    } else {
      if (metadata) {
        const { k: keywords, syntax } = metadata;
        const handler = syntax && this.getPropertySyntax(syntax);
        if (keywords && keywords.indexOf(value) > -1) {
          computed = getOrCreateKeyword(value);
        } else if (handler && handler.parser) {
          computed = handler.parser(value, object);
        }
      }
    }
    return computed;
  }
  /**
   * computed value -> used value
   */
  computeProperty(name, computed, object) {
    const metadata = propertyMetadataCache[name];
    const isDocumentElement = object.id === "g-root";
    let used = computed;
    if (metadata) {
      const { syntax, inh: inherited, d: defaultValue } = metadata;
      if (computed instanceof CSSKeywordValue) {
        let value = computed.value;
        if (value === "unset") {
          if (inherited && !isDocumentElement) {
            value = "inherit";
          } else {
            value = "initial";
          }
        }
        if (value === "initial") {
          if (!is_nil_default(defaultValue)) {
            computed = this.parseProperty(
              name,
              isFunction(defaultValue) ? defaultValue(object.nodeName) : defaultValue,
              object
            );
          }
        } else if (value === "inherit") {
          const resolved = this.tryToResolveProperty(object, name, {
            inherited: true
          });
          if (!is_nil_default(resolved)) {
            return resolved;
          } else {
            this.addUnresolveProperty(object, name);
            return;
          }
        }
      }
      const handler = syntax && this.getPropertySyntax(syntax);
      if (handler && handler.calculator) {
        const oldParsedValue = object.parsedStyle[name];
        used = handler.calculator(
          name,
          oldParsedValue,
          computed,
          object,
          this.runtime
        );
      } else if (computed instanceof CSSKeywordValue) {
        used = computed.value;
      } else {
        used = computed;
      }
    }
    return used;
  }
  postProcessProperty(name, object, attributes) {
    const metadata = propertyMetadataCache[name];
    if (metadata && metadata.syntax) {
      const handler = metadata.syntax && this.getPropertySyntax(metadata.syntax);
      const propertyHandler = handler;
      if (propertyHandler && propertyHandler.postProcessor) {
        propertyHandler.postProcessor(object, attributes);
      }
    }
  }
  /**
   * resolve later
   */
  addUnresolveProperty(object, name) {
    let properties = unresolvedProperties.get(object);
    if (!properties) {
      unresolvedProperties.set(object, []);
      properties = unresolvedProperties.get(object);
    }
    if (properties.indexOf(name) === -1) {
      properties.push(name);
    }
  }
  tryToResolveProperty(object, name, options = {}) {
    const { inherited } = options;
    if (inherited) {
      if (object.parentElement && isPropertyResolved(object.parentElement, name)) {
        const usedValue = object.parentElement.parsedStyle[name];
        if (
          // usedValue instanceof CSSKeywordValue &&
          usedValue === "unset" || usedValue === "initial" || usedValue === "inherit"
        ) {
          return;
        }
        return usedValue;
      }
    }
    return;
  }
  recalc(object) {
    const properties = unresolvedProperties.get(object);
    if (properties && properties.length) {
      const attributes = {};
      properties.forEach((property) => {
        attributes[property] = object.attributes[property];
      });
      this.processProperties(object, attributes);
      unresolvedProperties.delete(object);
    }
  }
  /**
   * update geometry when relative props changed,
   * eg. r of Circle, width/height of Rect
   */
  updateGeometry(object) {
    const { nodeName } = object;
    const geometryUpdater = this.runtime.geometryUpdaterFactory[nodeName];
    if (geometryUpdater) {
      const geometry = object.geometry;
      if (!geometry.contentBounds) {
        geometry.contentBounds = new AABB();
      }
      if (!geometry.renderBounds) {
        geometry.renderBounds = new AABB();
      }
      const parsedStyle = object.parsedStyle;
      const {
        width,
        height,
        depth = 0,
        offsetX = 0,
        offsetY = 0,
        offsetZ = 0
      } = geometryUpdater.update(parsedStyle, object);
      const halfExtents = [
        Math.abs(width) / 2,
        Math.abs(height) / 2,
        depth / 2
      ];
      const {
        stroke,
        lineWidth,
        // lineCap,
        // lineJoin,
        // miterLimit,
        increasedLineWidthForHitTesting,
        shadowType,
        shadowColor,
        filter = [],
        transformOrigin
      } = parsedStyle;
      let anchor = parsedStyle.anchor;
      if (nodeName === "text" /* TEXT */) {
        delete parsedStyle.anchor;
      } else if (nodeName === "mesh" /* MESH */) {
        parsedStyle.anchor[2] = 0.5;
      }
      const center = [
        (1 - (anchor && anchor[0] || 0) * 2) * width / 2 + offsetX,
        (1 - (anchor && anchor[1] || 0) * 2) * height / 2 + offsetY,
        (1 - (anchor && anchor[2] || 0) * 2) * halfExtents[2] + offsetZ
      ];
      geometry.contentBounds.update(center, halfExtents);
      const expansion = nodeName === "polyline" /* POLYLINE */ || nodeName === "polygon" /* POLYGON */ || nodeName === "path" /* PATH */ ? Math.SQRT2 : 0.5;
      const hasStroke = stroke && !stroke.isNone;
      if (hasStroke) {
        const halfLineWidth = ((lineWidth || 0) + (increasedLineWidthForHitTesting || 0)) * expansion;
        halfExtents[0] += halfLineWidth;
        halfExtents[1] += halfLineWidth;
      }
      geometry.renderBounds.update(center, halfExtents);
      if (shadowColor && shadowType && shadowType !== "inner") {
        const { min: min4, max: max4 } = geometry.renderBounds;
        const { shadowBlur, shadowOffsetX, shadowOffsetY } = parsedStyle;
        const shadowBlurInPixels = shadowBlur || 0;
        const shadowOffsetXInPixels = shadowOffsetX || 0;
        const shadowOffsetYInPixels = shadowOffsetY || 0;
        const shadowLeft = min4[0] - shadowBlurInPixels + shadowOffsetXInPixels;
        const shadowRight = max4[0] + shadowBlurInPixels + shadowOffsetXInPixels;
        const shadowTop = min4[1] - shadowBlurInPixels + shadowOffsetYInPixels;
        const shadowBottom = max4[1] + shadowBlurInPixels + shadowOffsetYInPixels;
        min4[0] = Math.min(min4[0], shadowLeft);
        max4[0] = Math.max(max4[0], shadowRight);
        min4[1] = Math.min(min4[1], shadowTop);
        max4[1] = Math.max(max4[1], shadowBottom);
        geometry.renderBounds.setMinMax(min4, max4);
      }
      filter.forEach(({ name, params }) => {
        if (name === "blur") {
          const blurRadius = params[0].value;
          geometry.renderBounds.update(
            geometry.renderBounds.center,
            addVec3(
              geometry.renderBounds.halfExtents,
              geometry.renderBounds.halfExtents,
              [blurRadius, blurRadius, 0]
            )
            // vec3.add(
            //   geometry.renderBounds.halfExtents,
            //   geometry.renderBounds.halfExtents,
            //   vec3.fromValues(blurRadius, blurRadius, 0),
            // ),
          );
        } else if (name === "drop-shadow") {
          const shadowOffsetX = params[0].value;
          const shadowOffsetY = params[1].value;
          const shadowBlur = params[2].value;
          const { min: min4, max: max4 } = geometry.renderBounds;
          const shadowLeft = min4[0] - shadowBlur + shadowOffsetX;
          const shadowRight = max4[0] + shadowBlur + shadowOffsetX;
          const shadowTop = min4[1] - shadowBlur + shadowOffsetY;
          const shadowBottom = max4[1] + shadowBlur + shadowOffsetY;
          min4[0] = Math.min(min4[0], shadowLeft);
          max4[0] = Math.max(max4[0], shadowRight);
          min4[1] = Math.min(min4[1], shadowTop);
          max4[1] = Math.max(max4[1], shadowBottom);
          geometry.renderBounds.setMinMax(min4, max4);
        }
      });
      anchor = parsedStyle.anchor;
      const flipY = width < 0;
      const flipX = height < 0;
      let usedOriginXValue = (flipY ? -1 : 1) * (transformOrigin ? convertPercentUnit(transformOrigin[0], 0, object) : 0);
      let usedOriginYValue = (flipX ? -1 : 1) * (transformOrigin ? convertPercentUnit(transformOrigin[1], 1, object) : 0);
      usedOriginXValue = usedOriginXValue - (flipY ? -1 : 1) * (anchor && anchor[0] || 0) * geometry.contentBounds.halfExtents[0] * 2;
      usedOriginYValue = usedOriginYValue - (flipX ? -1 : 1) * (anchor && anchor[1] || 0) * geometry.contentBounds.halfExtents[1] * 2;
      object.setOrigin(usedOriginXValue, usedOriginYValue);
      this.runtime.sceneGraphService.dirtifyToRoot(object);
    }
  }
  isPropertyInheritable(name) {
    const metadata = propertyMetadataCache[name];
    if (!metadata) {
      return false;
    }
    return metadata.inh;
  }
};

// src/css/properties/CSSPropertyAngle.ts
var CSSPropertyAngle = class {
  constructor() {
    this.parser = parseAngle;
    this.parserWithCSSDisabled = null;
    this.mixer = mergeNumbers;
  }
  calculator(name, oldParsed, parsed, object) {
    return convertAngleUnit(parsed);
  }
};

// src/css/properties/CSSPropertyClipPath.ts
var CSSPropertyClipPath = class {
  calculator(name, oldPath, newPath, object, runtime2) {
    if (newPath instanceof CSSKeywordValue) {
      newPath = null;
    }
    runtime2.sceneGraphService.updateDisplayObjectDependency(
      name,
      oldPath,
      newPath,
      object
    );
    if (name === "clipPath") {
      object.forEach((leaf) => {
        if (leaf.childNodes.length === 0) {
          runtime2.sceneGraphService.dirtifyToRoot(leaf);
        }
      });
    }
    return newPath;
  }
};

// src/css/properties/CSSPropertyColor.ts
var CSSPropertyColor = class {
  constructor() {
    this.parser = parseColor;
    this.parserWithCSSDisabled = parseColor;
    this.mixer = mergeColors;
  }
  calculator(name, oldParsed, parsed, object) {
    if (parsed instanceof CSSKeywordValue) {
      return parsed.value === "none" ? noneColor : transparentColor;
    }
    return parsed;
  }
};

// src/css/properties/CSSPropertyFilter.ts
var CSSPropertyFilter = class {
  constructor() {
    this.parser = parseFilter;
  }
  calculator(name, oldParsed, parsed) {
    if (parsed instanceof CSSKeywordValue) {
      return [];
    }
    return parsed;
  }
};

// src/css/properties/CSSPropertyLengthOrPercentage.ts
function getFontSize(object) {
  const { fontSize } = object.parsedStyle;
  return is_nil_default(fontSize) ? null : fontSize;
}
var CSSPropertyLengthOrPercentage = class {
  constructor() {
    this.parser = parseLengthOrPercentage;
    this.parserWithCSSDisabled = null;
    this.mixer = mergeNumbers;
  }
  /**
   * according to parent's bounds
   *
   * @example
   * CSS.percent(50) -> CSS.px(0.5 * parent.width)
   */
  calculator(name, oldParsed, computed, object, runtime2) {
    var _a;
    if (is_number_default(computed)) {
      return computed;
    }
    if (CSSUnitValue.isRelativeUnit(computed.unit)) {
      const registry = runtime2.styleValueRegistry;
      if (computed.unit === 2 /* kPercentage */) {
        return 0;
      } else if (computed.unit === 3 /* kEms */) {
        if (object.parentNode) {
          let fontSize = getFontSize(object.parentNode);
          if (fontSize) {
            fontSize *= computed.value;
            return fontSize;
          } else {
            registry.addUnresolveProperty(object, name);
          }
        } else {
          registry.addUnresolveProperty(object, name);
        }
        return 0;
      } else if (computed.unit === 5 /* kRems */) {
        if ((_a = object == null ? void 0 : object.ownerDocument) == null ? void 0 : _a.documentElement) {
          let fontSize = getFontSize(
            object.ownerDocument.documentElement
          );
          if (fontSize) {
            fontSize *= computed.value;
            return fontSize;
          } else {
            registry.addUnresolveProperty(object, name);
          }
        } else {
          registry.addUnresolveProperty(object, name);
        }
        return 0;
      }
    } else {
      return computed.value;
    }
  }
};

// src/css/properties/CSSPropertyLengthOrPercentage12.ts
var CSSPropertyLengthOrPercentage12 = class {
  constructor() {
    this.mixer = mergeNumberLists;
  }
  parser(radius) {
    const parsed = parseDimensionArray(is_number_default(radius) ? [radius] : radius);
    let formatted;
    if (parsed.length === 1) {
      formatted = [parsed[0], parsed[0]];
    } else {
      formatted = [parsed[0], parsed[1]];
    }
    return formatted;
  }
  calculator(name, oldParsed, computed) {
    return computed.map((c) => c.value);
  }
};

// src/css/properties/CSSPropertyLengthOrPercentage14.ts
var CSSPropertyLengthOrPercentage14 = class {
  constructor() {
    this.mixer = mergeNumberLists;
  }
  parser(radius) {
    const parsed = parseDimensionArray(is_number_default(radius) ? [radius] : radius);
    let formatted;
    if (parsed.length === 1) {
      formatted = [parsed[0], parsed[0], parsed[0], parsed[0]];
    } else if (parsed.length === 2) {
      formatted = [parsed[0], parsed[1], parsed[0], parsed[1]];
    } else if (parsed.length === 3) {
      formatted = [parsed[0], parsed[1], parsed[2], parsed[1]];
    } else {
      formatted = [parsed[0], parsed[1], parsed[2], parsed[3]];
    }
    return formatted;
  }
  calculator(name, oldParsed, computed) {
    return computed.map((c) => c.value);
  }
};

// src/utils/transform-mat4.ts
var tmpMat4 = mat4_exports.create();
function parsedTransformToMat4(transform, object) {
  const defX = object.parsedStyle.defX || 0;
  const defY = object.parsedStyle.defY || 0;
  object.resetLocalTransform();
  object.setLocalPosition(defX, defY);
  transform.forEach((parsed) => {
    const { t, d } = parsed;
    if (t === "scale") {
      const newScale = (d == null ? void 0 : d.map((s) => s.value)) || [1, 1];
      object.scaleLocal(newScale[0], newScale[1], 1);
    } else if (t === "scalex") {
      const newScale = (d == null ? void 0 : d.map((s) => s.value)) || [1];
      object.scaleLocal(newScale[0], 1, 1);
    } else if (t === "scaley") {
      const newScale = (d == null ? void 0 : d.map((s) => s.value)) || [1];
      object.scaleLocal(1, newScale[0], 1);
    } else if (t === "scalez") {
      const newScale = (d == null ? void 0 : d.map((s) => s.value)) || [1];
      object.scaleLocal(1, 1, newScale[0]);
    } else if (t === "scale3d") {
      const newScale = (d == null ? void 0 : d.map((s) => s.value)) || [1, 1, 1];
      object.scaleLocal(newScale[0], newScale[1], newScale[2]);
    } else if (t === "translate") {
      const newTranslation = d || [Opx, Opx];
      object.translateLocal(
        newTranslation[0].value,
        newTranslation[1].value,
        0
      );
    } else if (t === "translatex") {
      const newTranslation = d || [Opx];
      object.translateLocal(newTranslation[0].value, 0, 0);
    } else if (t === "translatey") {
      const newTranslation = d || [Opx];
      object.translateLocal(0, newTranslation[0].value, 0);
    } else if (t === "translatez") {
      const newTranslation = d || [Opx];
      object.translateLocal(0, 0, newTranslation[0].value);
    } else if (t === "translate3d") {
      const newTranslation = d || [Opx, Opx, Opx];
      object.translateLocal(
        newTranslation[0].value,
        newTranslation[1].value,
        newTranslation[2].value
      );
    } else if (t === "rotate") {
      const newAngles = d || [Odeg];
      object.rotateLocal(0, 0, convertAngleUnit(newAngles[0]));
    } else if (t === "rotatex") {
      const newAngles = d || [Odeg];
      object.rotateLocal(convertAngleUnit(newAngles[0]), 0, 0);
    } else if (t === "rotatey") {
      const newAngles = d || [Odeg];
      object.rotateLocal(0, convertAngleUnit(newAngles[0]), 0);
    } else if (t === "rotatez") {
      const newAngles = d || [Odeg];
      object.rotateLocal(0, 0, convertAngleUnit(newAngles[0]));
    } else if (t === "rotate3d") {
    } else if (t === "skew") {
      const newSkew = (d == null ? void 0 : d.map((s) => s.value)) || [0, 0];
      object.setLocalSkew(deg2rad(newSkew[0]), deg2rad(newSkew[1]));
    } else if (t === "skewx") {
      const newSkew = (d == null ? void 0 : d.map((s) => s.value)) || [0];
      object.setLocalSkew(deg2rad(newSkew[0]), object.getLocalSkew()[1]);
    } else if (t === "skewy") {
      const newSkew = (d == null ? void 0 : d.map((s) => s.value)) || [0];
      object.setLocalSkew(object.getLocalSkew()[0], deg2rad(newSkew[0]));
    } else if (t === "matrix") {
      const [a, b, c, dd, tx, ty] = d.map((s) => s.value);
      object.setLocalTransform(
        mat4_exports.set(
          tmpMat4,
          a,
          b,
          0,
          0,
          c,
          dd,
          0,
          0,
          0,
          0,
          1,
          0,
          tx + defX,
          ty + defY,
          0,
          1
        )
      );
    } else if (t === "matrix3d") {
      mat4_exports.set(tmpMat4, ...d.map((s) => s.value));
      tmpMat4[12] += defX;
      tmpMat4[13] += defY;
      object.setLocalTransform(tmpMat4);
    }
  });
  return object.getLocalTransform();
}

// src/css/properties/CSSPropertyLocalPosition.ts
var CSSPropertyLocalPosition = class extends CSSPropertyLengthOrPercentage {
  /**
   * update local position
   */
  postProcessor(object, attributes) {
    let x;
    let y;
    let z;
    switch (object.nodeName) {
      case "circle" /* CIRCLE */:
      case "ellipse" /* ELLIPSE */:
        const { cx, cy, cz } = object.parsedStyle;
        if (!is_nil_default(cx)) {
          x = cx;
        }
        if (!is_nil_default(cy)) {
          y = cy;
        }
        if (!is_nil_default(cz)) {
          z = cz;
        }
        break;
      case "line" /* LINE */:
        const { x1, x2, y1, y2 } = object.parsedStyle;
        const minX = Math.min(x1, x2);
        const minY = Math.min(y1, y2);
        x = minX;
        y = minY;
        z = 0;
        break;
      case "rect" /* RECT */:
      case "image" /* IMAGE */:
      case "g" /* GROUP */:
      case "html" /* HTML */:
      case "text" /* TEXT */:
      case "mesh" /* MESH */:
        if (!is_nil_default(object.parsedStyle.x)) {
          x = object.parsedStyle.x;
        }
        if (!is_nil_default(object.parsedStyle.y)) {
          y = object.parsedStyle.y;
        }
        if (!is_nil_default(object.parsedStyle.z)) {
          z = object.parsedStyle.z;
        }
        break;
      default:
        break;
    }
    if (object.nodeName !== "path" /* PATH */ && object.nodeName !== "polyline" /* POLYLINE */ && object.nodeName !== "polygon" /* POLYGON */) {
      object.parsedStyle.defX = x || 0;
      object.parsedStyle.defY = y || 0;
    }
    const needResetLocalPosition = !is_nil_default(x) || !is_nil_default(y) || !is_nil_default(z);
    if (needResetLocalPosition && attributes.indexOf("transform") === -1) {
      const { transform } = object.parsedStyle;
      if (transform && transform.length) {
        parsedTransformToMat4(transform, object);
      } else {
        const [ox, oy, oz] = object.getLocalPosition();
        object.setLocalPosition(
          is_nil_default(x) ? ox : x,
          is_nil_default(y) ? oy : y,
          is_nil_default(z) ? oz : z
        );
      }
    }
  }
};

// src/css/properties/CSSPropertyMarker.ts
var CSSPropertyMarker = class {
  calculator(name, oldMarker, newMarker, object) {
    if (newMarker instanceof CSSKeywordValue) {
      newMarker = null;
    }
    const cloned = newMarker == null ? void 0 : newMarker.cloneNode(true);
    if (cloned) {
      cloned.style.isMarker = true;
    }
    return cloned;
  }
};

// src/css/properties/CSSPropertyNumber.ts
var CSSPropertyNumber = class {
  constructor() {
    this.mixer = mergeNumbers;
    this.parser = parseNumber;
    this.parserWithCSSDisabled = null;
  }
  calculator(name, oldParsed, computed) {
    return computed.value;
  }
};

// src/css/properties/CSSPropertyOffsetDistance.ts
var CSSPropertyOffsetDistance = class {
  constructor() {
    this.parser = parseNumber;
    this.parserWithCSSDisabled = null;
    this.mixer = clampedMergeNumbers(0, 1);
  }
  calculator(name, oldParsed, computed) {
    return computed.value;
  }
  postProcessor(object) {
    const { offsetPath, offsetDistance } = object.parsedStyle;
    if (!offsetPath) {
      return;
    }
    const { nodeName } = offsetPath;
    if (nodeName === "line" /* LINE */ || nodeName === "path" /* PATH */ || nodeName === "polyline" /* POLYLINE */) {
      const point = offsetPath.getPoint(offsetDistance);
      if (point) {
        object.parsedStyle.defX = point.x;
        object.parsedStyle.defY = point.y;
        object.setLocalPosition(point.x, point.y);
      }
    }
  }
};

// src/css/properties/CSSPropertyOpacity.ts
var CSSPropertyOpacity = class {
  constructor() {
    this.parser = parseNumber;
    this.parserWithCSSDisabled = null;
    this.mixer = clampedMergeNumbers(0, 1);
  }
  calculator(name, oldParsed, computed) {
    return computed.value;
  }
};

// src/css/properties/CSSPropertyPath.ts
var CSSPropertyPath = class {
  constructor() {
    /**
     * path2Curve
     */
    this.parser = parsePath;
    this.parserWithCSSDisabled = parsePath;
    this.mixer = mergePaths;
  }
  calculator(name, oldParsed, parsed) {
    if (parsed instanceof CSSKeywordValue && parsed.value === "unset") {
      return {
        absolutePath: [],
        hasArc: false,
        segments: [],
        polygons: [],
        polylines: [],
        curve: null,
        totalLength: 0,
        rect: new Rectangle(0, 0, 0, 0)
      };
    }
    return parsed;
  }
  /**
   * update local position
   */
  postProcessor(object, attributes) {
    object.parsedStyle.defX = object.parsedStyle.path.rect.x;
    object.parsedStyle.defY = object.parsedStyle.path.rect.y;
    if (object.nodeName === "path" /* PATH */ && attributes.indexOf("transform") === -1) {
      const { defX = 0, defY = 0 } = object.parsedStyle;
      object.setLocalPosition(defX, defY);
    }
  }
};

// src/css/properties/CSSPropertyPoints.ts
var CSSPropertyPoints = class {
  constructor() {
    this.parser = parsePoints;
    this.mixer = mergePoints;
  }
  /**
   * update local position
   */
  postProcessor(object, attributes) {
    if ((object.nodeName === "polygon" /* POLYGON */ || object.nodeName === "polyline" /* POLYLINE */) && attributes.indexOf("transform") === -1) {
      const { defX, defY } = object.parsedStyle;
      object.setLocalPosition(defX, defY);
    }
  }
};

// src/css/properties/CSSPropertyShadowBlur.ts
var CSSPropertyShadowBlur = class extends CSSPropertyLengthOrPercentage {
  constructor() {
    super(...arguments);
    this.mixer = clampedMergeNumbers(0, Infinity);
  }
};

// src/css/properties/CSSPropertyText.ts
var CSSPropertyText = class {
  calculator(name, oldParsed, parsed, object) {
    if (parsed instanceof CSSKeywordValue) {
      if (parsed.value === "unset") {
        return "";
      } else {
        return parsed.value;
      }
    }
    return `${parsed}`;
  }
  postProcessor(object) {
    object.nodeValue = `${object.parsedStyle.text}` || "";
  }
};

// src/css/properties/CSSPropertyTextTransform.ts
var CSSPropertyTextTransform = class {
  calculator(name, oldParsed, parsed, object) {
    const rawText = object.getAttribute("text");
    if (rawText) {
      let transformedText = rawText;
      if (parsed.value === "capitalize") {
        transformedText = rawText.charAt(0).toUpperCase() + rawText.slice(1);
      } else if (parsed.value === "lowercase") {
        transformedText = rawText.toLowerCase();
      } else if (parsed.value === "uppercase") {
        transformedText = rawText.toUpperCase();
      }
      object.parsedStyle.text = transformedText;
    }
    return parsed.value;
  }
};

// src/utils/canvas.ts
var canvasMap = {};
var defaultCanvasIdCounter = 0;
function cleanExistedCanvas(container, canvas) {
  if (container) {
    const id2 = typeof container === "string" ? container : container.id || defaultCanvasIdCounter++;
    if (canvasMap[id2]) {
      canvasMap[id2].destroy();
    }
    canvasMap[id2] = canvas;
  }
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

// src/utils/dom.ts
function isElement(target) {
  return !!target.getAttribute;
}
function sortedIndex(array, value) {
  let low = 0;
  let high = array.length;
  while (low < high) {
    const mid = low + high >>> 1;
    if (sortByZIndex(array[mid], value) < 0) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function sortByZIndex(o1, o2) {
  const zIndex1 = Number(o1.parsedStyle.zIndex);
  const zIndex2 = Number(o2.parsedStyle.zIndex);
  if (zIndex1 === zIndex2) {
    const parent = o1.parentNode;
    if (parent) {
      const children = parent.childNodes || [];
      return children.indexOf(o1) - children.indexOf(o2);
    }
  }
  return zIndex1 - zIndex2;
}
function findClosestClipPathTarget(object) {
  var _a;
  let el = object;
  do {
    const clipPath = (_a = el.parsedStyle) == null ? void 0 : _a.clipPath;
    if (clipPath)
      return el;
    el = el.parentElement;
  } while (el !== null);
  return null;
}
var PX_SUFFIX = "px";
function setDOMSize($el, width, height) {
  if (isBrowser && $el.style) {
    $el.style.width = width + PX_SUFFIX;
    $el.style.height = height + PX_SUFFIX;
  }
}
function getStyle($el, property) {
  if (isBrowser) {
    return document.defaultView.getComputedStyle($el, null).getPropertyValue(property);
  }
}
function getWidth($el) {
  const width = getStyle($el, "width");
  if (width === "auto") {
    return $el.offsetWidth;
  }
  return parseFloat(width);
}
function getHeight($el) {
  const height = getStyle($el, "height");
  if (height === "auto") {
    return $el.offsetHeight;
  }
  return parseFloat(height);
}

// src/utils/event.ts
var MOUSE_POINTER_ID = 1;
var TOUCH_TO_POINTER = {
  touchstart: "pointerdown",
  touchend: "pointerup",
  touchendoutside: "pointerupoutside",
  touchmove: "pointermove",
  touchcancel: "pointercancel"
};
var clock = typeof performance === "object" && performance.now ? performance : Date;

// src/utils/pointer-events.ts
function isFillOrStrokeAffected(pointerEvents, fill, stroke) {
  let hasFill = false;
  let hasStroke = false;
  const isFillOtherThanNone = !!fill && !fill.isNone;
  const isStrokeOtherThanNone = !!stroke && !stroke.isNone;
  if (pointerEvents === "visiblepainted" || pointerEvents === "painted" || pointerEvents === "auto") {
    hasFill = isFillOtherThanNone;
    hasStroke = isStrokeOtherThanNone;
  } else if (pointerEvents === "visiblefill" || pointerEvents === "fill") {
    hasFill = true;
  } else if (pointerEvents === "visiblestroke" || pointerEvents === "stroke") {
    hasStroke = true;
  } else if (pointerEvents === "visible" || pointerEvents === "all") {
    hasFill = true;
    hasStroke = true;
  }
  return [hasFill, hasStroke];
}

// src/utils/raf.ts
var uId = 1;
var uniqueId = () => uId++;
var root = typeof self === "object" && self.self == self ? self : (
  // @ts-ignore
  typeof global === "object" && global.global == global ? (
    // @ts-ignore
    global
  ) : {}
);
var nowOffset = Date.now();
var pnow = () => {
  if (root.performance && typeof root.performance.now === "function") {
    return root.performance.now();
  }
  return Date.now() - nowOffset;
};
var reservedCBs = {};
var lastTime = Date.now();
var polyfillRaf = (callback) => {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const currentTime = Date.now();
  const gap = currentTime - lastTime;
  const delay = gap > 16 ? 0 : 16 - gap;
  const id2 = uniqueId();
  reservedCBs[id2] = callback;
  if (Object.keys(reservedCBs).length > 1)
    return id2;
  setTimeout(() => {
    lastTime = currentTime;
    const copied = reservedCBs;
    reservedCBs = {};
    Object.keys(copied).forEach((key) => copied[key](pnow()));
  }, delay);
  return id2;
};
var polyfillCaf = (id2) => {
  delete reservedCBs[id2];
};
var vendorPrefixes = ["", "webkit", "moz", "ms", "o"];
var getRequestAnimationFrame = (vp2) => {
  if (typeof vp2 !== "string")
    return polyfillRaf;
  if (vp2 === "")
    return root["requestAnimationFrame"];
  return root[vp2 + "RequestAnimationFrame"];
};
var getCancelAnimationFrame = (vp2) => {
  if (typeof vp2 !== "string")
    return polyfillCaf;
  if (vp2 === "")
    return root["cancelAnimationFrame"];
  return root[vp2 + "CancelAnimationFrame"] || root[vp2 + "CancelRequestAnimationFrame"];
};
var find = (arr, predicate) => {
  let i = 0;
  while (arr[i] !== void 0) {
    if (predicate(arr[i]))
      return arr[i];
    i = i + 1;
  }
};
var vp = find(vendorPrefixes, (vp2) => !!getRequestAnimationFrame(vp2));
var raf = getRequestAnimationFrame(vp);
var caf = getCancelAnimationFrame(vp);
root.requestAnimationFrame = raf;
root.cancelAnimationFrame = caf;

// src/utils/tapable/AsyncParallelHook.ts
var AsyncParallelHook = class {
  constructor() {
    this.callbacks = [];
  }
  getCallbacksNum() {
    return this.callbacks.length;
  }
  tapPromise(options, fn) {
    this.callbacks.push(fn);
  }
  promise(...args) {
    return Promise.all(
      this.callbacks.map((callback) => {
        return callback(...args);
      })
    );
  }
};

// src/utils/tapable/AsyncSeriesWaterfallHook.ts
var AsyncSeriesWaterfallHook = class {
  constructor() {
    this.callbacks = [];
  }
  tapPromise(options, fn) {
    this.callbacks.push(fn);
  }
  promise(...args) {
    return __async(this, null, function* () {
      if (this.callbacks.length) {
        let result = yield this.callbacks[0](...args);
        for (let i = 0; i < this.callbacks.length - 1; i++) {
          const callback = this.callbacks[i];
          result = yield callback(result);
        }
        return result;
      }
      return null;
    });
  }
};

// src/utils/tapable/SyncHook.ts
var SyncHook = class {
  constructor() {
    this.callbacks = [];
  }
  tap(options, fn) {
    this.callbacks.push(fn);
  }
  call(...args) {
    const argsArr = arguments;
    this.callbacks.forEach(function(callback) {
      callback.apply(void 0, argsArr);
    });
  }
};

// src/utils/tapable/SyncWaterfallHook.ts
var SyncWaterfallHook = class {
  constructor() {
    this.callbacks = [];
  }
  tap(options, fn) {
    this.callbacks.push(fn);
  }
  call(...args) {
    if (this.callbacks.length) {
      const argsArr = arguments;
      let result = this.callbacks[0].apply(void 0, argsArr);
      for (let i = 0; i < this.callbacks.length - 1; i++) {
        const callback = this.callbacks[i];
        result = callback(result);
      }
      return result;
    }
    return null;
  }
};

// src/utils/text.ts
var genericFontFamilies = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
];
var stringRegExp = /([\"\'])[^\'\"]+\1/;
function toFontString(attributes) {
  const { fontSize, fontFamily, fontStyle, fontVariant, fontWeight } = attributes;
  const fontSizeString = is_number_default(fontSize) && `${fontSize}px` || "16px";
  const fontFamilies = fontFamily.split(",");
  for (let i = fontFamilies.length - 1; i >= 0; i--) {
    let fontFamily2 = fontFamilies[i].trim();
    if (!stringRegExp.test(fontFamily2) && genericFontFamilies.indexOf(fontFamily2) < 0) {
      fontFamily2 = `"${fontFamily2}"`;
    }
    fontFamilies[i] = fontFamily2;
  }
  return `${fontStyle} ${fontVariant} ${fontWeight} ${fontSizeString} ${fontFamilies.join(",")}`;
}

// src/css/properties/CSSPropertyTransform.ts
var CSSPropertyTransform = class {
  constructor() {
    this.parser = parseTransform;
    this.parserWithCSSDisabled = parseTransform;
    this.mixer = mergeTransforms;
  }
  calculator(name, oldParsed, parsed, object) {
    if (parsed instanceof CSSKeywordValue) {
      return [];
    }
    return parsed;
  }
  postProcessor(object) {
    const { transform } = object.parsedStyle;
    parsedTransformToMat4(transform, object);
  }
};

// src/css/properties/CSSPropertyTransformOrigin.ts
var CSSPropertyTransformOrigin = class {
  constructor() {
    this.parser = parseTransformOrigin;
  }
  // calculator(
  //   name: string,
  //   oldParsed: [CSSUnitValue, CSSUnitValue],
  //   parsed: [CSSUnitValue, CSSUnitValue],
  //   object: DisplayObject,
  // ): [number, number] {
  //   console.log(object, parsed);
  //   return [parsed[0].value, parsed[1].value];
  //   // return [convertPercentUnit(parsed[0], 0, object), convertPercentUnit(parsed[1], 1, object)];
  // }
};

// src/css/properties/CSSPropertyZIndex.ts
var CSSPropertyZIndex = class {
  constructor() {
    this.parser = parseNumber;
  }
  calculator(name, oldParsed, computed, object) {
    return computed.value;
  }
  postProcessor(object) {
    if (object.parentNode) {
      const parentEntity = object.parentNode;
      const parentRenderable = parentEntity.renderable;
      const parentSortable = parentEntity.sortable;
      if (parentRenderable) {
        parentRenderable.dirty = true;
      }
      if (parentSortable) {
        parentSortable.dirty = true;
        parentSortable.dirtyReason = 2 /* Z_INDEX_CHANGED */;
      }
    }
  }
};

// src/services/aabb/CircleUpdater.ts
var CircleUpdater = class {
  update(parsedStyle, object) {
    const { r } = parsedStyle;
    const width = r * 2;
    const height = r * 2;
    return {
      width,
      height
    };
  }
};

// src/services/aabb/EllipseUpdater.ts
var EllipseUpdater = class {
  update(parsedStyle, object) {
    const { rx, ry } = parsedStyle;
    const width = rx * 2;
    const height = ry * 2;
    return {
      width,
      height
    };
  }
};

// src/services/aabb/LineUpdater.ts
var LineUpdater = class {
  update(parsedStyle) {
    const { x1, y1, x2, y2 } = parsedStyle;
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    const width = maxX - minX;
    const height = maxY - minY;
    return {
      width,
      height
    };
  }
};

// src/services/aabb/PathUpdater.ts
var PathUpdater = class {
  update(parsedStyle) {
    const { path } = parsedStyle;
    const { width, height } = path.rect;
    return {
      width,
      height
    };
  }
};

// src/services/aabb/PolylineUpdater.ts
var PolylineUpdater = class {
  update(parsedStyle) {
    if (parsedStyle.points && is_array_default(parsedStyle.points.points)) {
      const { points } = parsedStyle.points;
      const minX = Math.min(...points.map((point) => point[0]));
      const maxX = Math.max(...points.map((point) => point[0]));
      const minY = Math.min(...points.map((point) => point[1]));
      const maxY = Math.max(...points.map((point) => point[1]));
      const width = maxX - minX;
      const height = maxY - minY;
      return {
        width,
        height
      };
    }
    return {
      width: 0,
      height: 0
    };
  }
};

// src/services/aabb/RectUpdater.ts
var RectUpdater = class {
  update(parsedStyle, object) {
    const { img, width = 0, height = 0 } = parsedStyle;
    let contentWidth = width;
    let contentHeight = height;
    if (img && !is_string_default(img)) {
      if (!contentWidth) {
        contentWidth = img.width;
        parsedStyle.width = contentWidth;
      }
      if (!contentHeight) {
        contentHeight = img.height;
        parsedStyle.height = contentHeight;
      }
    }
    return {
      width: contentWidth,
      height: contentHeight
    };
  }
};

// src/services/aabb/TextUpdater.ts
var TextUpdater = class {
  constructor(globalRuntime) {
    this.globalRuntime = globalRuntime;
  }
  isReadyToMeasure(parsedStyle, object) {
    const {
      text,
      textAlign,
      textBaseline,
      fontSize,
      fontStyle,
      fontWeight,
      fontVariant,
      lineWidth
    } = parsedStyle;
    return text && fontSize && fontStyle && fontWeight && fontVariant && textAlign && textBaseline && !is_nil_default(lineWidth);
  }
  update(parsedStyle, object) {
    var _a, _b;
    const { text, textAlign, lineWidth, textBaseline, dx, dy } = parsedStyle;
    if (!this.isReadyToMeasure(parsedStyle, object)) {
      parsedStyle.metrics = {
        font: "",
        width: 0,
        height: 0,
        lines: [],
        lineWidths: [],
        lineHeight: 0,
        maxLineWidth: 0,
        fontProperties: {
          ascent: 0,
          descent: 0,
          fontSize: 0
        },
        lineMetrics: []
      };
      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        offsetX: 0,
        offsetY: 0
      };
    }
    const { offscreenCanvas } = ((_b = (_a = object == null ? void 0 : object.ownerDocument) == null ? void 0 : _a.defaultView) == null ? void 0 : _b.getConfig()) || {};
    const metrics = this.globalRuntime.textService.measureText(
      text,
      parsedStyle,
      offscreenCanvas
    );
    parsedStyle.metrics = metrics;
    const { width, height, lineHeight, fontProperties } = metrics;
    const halfExtents = [width / 2, height / 2, 0];
    let anchor = [0, 1];
    let lineXOffset = 0;
    if (textAlign === "center" || textAlign === "middle") {
      lineXOffset = lineWidth / 2;
      anchor = [0.5, 1];
    } else if (textAlign === "right" || textAlign === "end") {
      lineXOffset = lineWidth;
      anchor = [1, 1];
    }
    let lineYOffset = 0;
    if (textBaseline === "middle") {
      lineYOffset = halfExtents[1];
    } else if (textBaseline === "top" || textBaseline === "hanging") {
      lineYOffset = halfExtents[1] * 2;
    } else if (textBaseline === "alphabetic") {
      lineYOffset = this.globalRuntime.enableCSSParsing ? lineHeight - fontProperties.ascent : 0;
    } else if (textBaseline === "bottom" || textBaseline === "ideographic") {
      lineYOffset = 0;
    }
    if (dx) {
      lineXOffset += dx;
    }
    if (dy) {
      lineYOffset += dy;
    }
    parsedStyle.anchor = [anchor[0], anchor[1], 0];
    return {
      width: halfExtents[0] * 2,
      height: halfExtents[1] * 2,
      offsetX: lineXOffset,
      offsetY: lineYOffset
    };
  }
};

// src/dom/FederatedEvent.ts
function isFederatedEvent(value) {
  return !!value.type;
}
var FederatedEvent = class _FederatedEvent {
  /**
   * The event boundary which manages this event. Propagation can only occur
   *  within the boundary's jurisdiction.
   */
  constructor(manager) {
    /**
     * The propagation phase.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase
     */
    this.eventPhase = _FederatedEvent.prototype.NONE;
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/bubbles
     */
    this.bubbles = true;
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/cancelBubble
     */
    this.cancelBubble = true;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable
     */
    this.cancelable = false;
    /** Flags whether the default response of the user agent was prevent through this event. */
    this.defaultPrevented = false;
    /** Flags whether propagation was stopped. */
    this.propagationStopped = false;
    /** Flags whether propagation was immediately stopped. */
    this.propagationImmediatelyStopped = false;
    /**
     * The coordinates of the evnet relative to the nearest DOM layer.
     * This is a non-standard property.
     */
    this.layer = new Point();
    /**
     * The coordinates of the event relative to the DOM document.
     * This is a non-standard property.
     * relative to the DOM document.
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageX
     */
    this.page = new Point();
    /**
     * relative to Canvas, origin is left-top
     */
    this.canvas = new Point();
    /**
     * relative to Viewport, account for Camera
     */
    this.viewport = new Point();
    this.composed = false;
    this.NONE = 0;
    this.CAPTURING_PHASE = 1;
    this.AT_TARGET = 2;
    this.BUBBLING_PHASE = 3;
    this.manager = manager;
  }
  /**
   * @deprecated
   */
  get name() {
    return this.type;
  }
  get layerX() {
    return this.layer.x;
  }
  get layerY() {
    return this.layer.y;
  }
  get pageX() {
    return this.page.x;
  }
  get pageY() {
    return this.page.y;
  }
  get x() {
    return this.canvas.x;
  }
  get y() {
    return this.canvas.y;
  }
  get canvasX() {
    return this.canvas.x;
  }
  get canvasY() {
    return this.canvas.y;
  }
  get viewportX() {
    return this.viewport.x;
  }
  get viewportY() {
    return this.viewport.y;
  }
  /**
   * The propagation path for this event
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/composedPath
   *
   * So composedPath()[0] represents the original target.
   * @see https://polymer-library.polymer-project.org/3.0/docs/devguide/events#retargeting
   */
  composedPath() {
    if (this.manager && (!this.path || this.path[0] !== this.target)) {
      this.path = this.target ? this.manager.propagationPath(this.target) : [];
    }
    return this.path;
  }
  /**
   * @deprecated
   */
  get propagationPath() {
    return this.composedPath();
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault
   */
  preventDefault() {
    if (this.nativeEvent instanceof Event && this.nativeEvent.cancelable) {
      this.nativeEvent.preventDefault();
    }
    this.defaultPrevented = true;
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation
   */
  stopImmediatePropagation() {
    this.propagationImmediatelyStopped = true;
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation
   */
  stopPropagation() {
    this.propagationStopped = true;
  }
  /**
   * added for compatibility with DOM Event,
   * deprecated props and methods
   */
  initEvent() {
  }
  initUIEvent() {
  }
  clone() {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
};

// src/dom/FederatedMouseEvent.ts
var FederatedMouseEvent = class extends FederatedEvent {
  constructor() {
    super(...arguments);
    /**
     * The coordinates of the mouse event relative to the canvas.
     */
    this.client = new Point();
    /**
     * The movement in this pointer relative to the last `mousemove` event.
     */
    this.movement = new Point();
    /**
     * The offset of the pointer coordinates w.r.t. target DisplayObject in world space. This is
     * not supported at the moment.
     */
    this.offset = new Point();
    /**
     * The pointer coordinates in world space.
     */
    this.global = new Point();
    /**
     * The pointer coordinates in sceen space.
     */
    this.screen = new Point();
  }
  get clientX() {
    return this.client.x;
  }
  get clientY() {
    return this.client.y;
  }
  get movementX() {
    return this.movement.x;
  }
  get movementY() {
    return this.movement.y;
  }
  get offsetX() {
    return this.offset.x;
  }
  get offsetY() {
    return this.offset.y;
  }
  get globalX() {
    return this.global.x;
  }
  get globalY() {
    return this.global.y;
  }
  get screenX() {
    return this.screen.x;
  }
  get screenY() {
    return this.screen.y;
  }
  getModifierState(key) {
    return "getModifierState" in this.nativeEvent && this.nativeEvent.getModifierState(key);
  }
  initMouseEvent() {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
};

// src/dom/FederatedPointerEvent.ts
var FederatedPointerEvent = class extends FederatedMouseEvent {
  constructor() {
    super(...arguments);
    /**
     * The width of the pointer's contact along the x-axis, measured in CSS pixels.
     * radiusX of TouchEvents will be represented by this value.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/width
     */
    this.width = 0;
    /**
     * The height of the pointer's contact along the y-axis, measured in CSS pixels.
     * radiusY of TouchEvents will be represented by this value.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/height
     */
    this.height = 0;
    /**
     * Indicates whether or not the pointer device that created the event is the primary pointer.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/isPrimary
     */
    this.isPrimary = false;
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getCoalescedEvents
   */
  getCoalescedEvents() {
    if (this.type === "pointermove" || this.type === "mousemove" || this.type === "touchmove") {
      return [this];
    }
    return [];
  }
  /**
   * @see https://chromestatus.com/feature/5765569655603200
   */
  getPredictedEvents() {
    throw new Error("getPredictedEvents is not supported!");
  }
  /**
   * @see https://github.com/antvis/G/issues/1115
   * We currently reuses event objects in the event system,
   * avoiding the creation of a large number of event objects.
   * Reused objects are only used to carry different data,
   * such as coordinate information, native event objects,
   * and therefore the lifecycle is limited to the event handler,
   * which can lead to unintended consequences if an attempt is made to cache the entire event object.
   *
   * Therefore, while keeping the above performance considerations in mind, it is possible to provide a clone method that creates a new object when the user really wants to cache it, e.g.
   */
  clone() {
    return this.manager.clonePointerEvent(this);
  }
};

// src/dom/FederatedWheelEvent.ts
var FederatedWheelEvent = class extends FederatedMouseEvent {
  clone() {
    return this.manager.cloneWheelEvent(this);
  }
};

// src/dom/CustomEvent.ts
var CustomEvent = class extends FederatedEvent {
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(eventName, object) {
    super(null);
    this.type = eventName;
    this.detail = object;
    Object.assign(this, object);
  }
};

// src/dom/EventTarget.ts
var DELEGATION_SPLITTER = ":";
var EventTarget = class {
  constructor() {
    /**
     * event emitter
     */
    this.emitter = new eventemitter3_default();
  }
  /**
   * @deprecated
   * @alias addEventListener
   */
  on(type, listener, options) {
    this.addEventListener(type, listener, options);
    return this;
  }
  /**
   * support `capture` & `once` in options
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
   */
  addEventListener(type, listener, options) {
    const capture = is_boolean_default(options) && options || is_object_default(options) && options.capture;
    const once = is_object_default(options) && options.once;
    const context = isFunction(listener) ? void 0 : listener;
    let useDelegatedName = false;
    let delegatedName = "";
    if (type.indexOf(DELEGATION_SPLITTER) > -1) {
      const [name, eventType] = type.split(DELEGATION_SPLITTER);
      type = eventType;
      delegatedName = name;
      useDelegatedName = true;
    }
    type = capture ? `${type}capture` : type;
    listener = isFunction(listener) ? listener : listener.handleEvent;
    if (useDelegatedName) {
      const originListener = listener;
      listener = (...args) => {
        var _a;
        if (((_a = args[0].target) == null ? void 0 : _a.name) !== delegatedName) {
          return;
        }
        originListener(...args);
      };
    }
    if (once) {
      this.emitter.once(type, listener, context);
    } else {
      this.emitter.on(type, listener, context);
    }
    return this;
  }
  /**
   * @deprecated
   * @alias removeEventListener
   */
  off(type, listener, options) {
    if (type) {
      this.removeEventListener(type, listener, options);
    } else {
      this.removeAllEventListeners();
    }
    return this;
  }
  removeAllEventListeners() {
    this.emitter.removeAllListeners();
  }
  removeEventListener(type, listener, options) {
    const capture = is_boolean_default(options) && options || is_object_default(options) && options.capture;
    const context = isFunction(listener) ? void 0 : listener;
    type = capture ? `${type}capture` : type;
    listener = isFunction(listener) ? listener : listener == null ? void 0 : listener.handleEvent;
    this.emitter.off(type, listener, context);
    return this;
  }
  /**
   * @deprecated
   * @alias dispatchEvent
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  emit(eventName, object) {
    this.dispatchEvent(new CustomEvent(eventName, object));
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
   */
  dispatchEvent(e, skipPropagate = false) {
    var _a, _b;
    if (!isFederatedEvent(e)) {
      throw new Error(
        "DisplayObject cannot propagate events outside of the Federated Events API"
      );
    }
    let canvas;
    if (this.document) {
      canvas = this;
    } else if (this.defaultView) {
      canvas = this.defaultView;
    } else {
      canvas = (_a = this.ownerDocument) == null ? void 0 : _a.defaultView;
    }
    if (canvas) {
      e.manager = canvas.getEventService() || null;
      if (!e.manager) {
        return false;
      }
      e.defaultPrevented = false;
      e.path = [];
      if (!skipPropagate) {
        e.target = this;
      }
      (_b = e.manager) == null ? void 0 : _b.dispatchEvent(e, e.type, skipPropagate);
    }
    return !e.defaultPrevented;
  }
};

// src/dom/Node.ts
var _Node = class _Node extends EventTarget {
  constructor() {
    super(...arguments);
    this.shadow = false;
    /**
     * points to canvas.document
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument
     */
    this.ownerDocument = null;
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isConnected
     * @example
        circle.isConnected; // false
        canvas.appendChild(circle);
        circle.isConnected; // true
     */
    this.isConnected = false;
    /**
     * Returns node's node document's document base URL.
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Node
     */
    this.baseURI = "";
    /**
     * Returns the children.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
     */
    this.childNodes = [];
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
     */
    this.nodeType = 0;
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeName
     */
    this.nodeName = "";
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeValue
     */
    this.nodeValue = null;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/ParentNode
     */
    this.parentNode = null;
  }
  static isNode(target) {
    return !!target.childNodes;
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent
   */
  get textContent() {
    let out = "";
    if (this.nodeName === "text" /* TEXT */) {
      out += this.style.text;
    }
    for (const child of this.childNodes) {
      if (child.nodeName === "text" /* TEXT */) {
        out += child.nodeValue;
      } else {
        out += child.textContent;
      }
    }
    return out;
  }
  set textContent(content) {
    this.childNodes.slice().forEach((child) => {
      this.removeChild(child);
    });
    if (this.nodeName === "text" /* TEXT */) {
      this.style.text = `${content}`;
    } else {
    }
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Node/getRootNode
   */
  getRootNode(opts = {}) {
    if (this.parentNode) {
      return this.parentNode.getRootNode(opts);
    }
    if (opts.composed && this.host) {
      return this.host.getRootNode(opts);
    }
    return this;
  }
  hasChildNodes() {
    return this.childNodes.length > 0;
  }
  isDefaultNamespace(namespace) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  lookupNamespaceURI(prefix) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  lookupPrefix(namespace) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  normalize() {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Node/isEqualNode
   */
  isEqualNode(otherNode) {
    return this === otherNode;
  }
  isSameNode(otherNode) {
    return this.isEqualNode(otherNode);
  }
  /**
   * @deprecated
   * @alias parentNode
   */
  get parent() {
    return this.parentNode;
  }
  get parentElement() {
    return null;
  }
  get nextSibling() {
    return null;
  }
  get previousSibling() {
    return null;
  }
  get firstChild() {
    return this.childNodes.length > 0 ? this.childNodes[0] : null;
  }
  get lastChild() {
    return this.childNodes.length > 0 ? this.childNodes[this.childNodes.length - 1] : null;
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
   * @see https://github.com/b-fuze/deno-dom/blob/master/src/dom/node.ts#L338
   */
  compareDocumentPosition(other) {
    var _a;
    if (other === this) {
      return 0;
    }
    let node1Root = other;
    let node2Root = this;
    const node1Hierarchy = [node1Root];
    const node2Hierarchy = [node2Root];
    while ((_a = node1Root.parentNode) != null ? _a : node2Root.parentNode) {
      node1Root = node1Root.parentNode ? (node1Hierarchy.push(node1Root.parentNode), node1Root.parentNode) : node1Root;
      node2Root = node2Root.parentNode ? (node2Hierarchy.push(node2Root.parentNode), node2Root.parentNode) : node2Root;
    }
    if (node1Root !== node2Root) {
      return _Node.DOCUMENT_POSITION_DISCONNECTED | _Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC | _Node.DOCUMENT_POSITION_PRECEDING;
    }
    const longerHierarchy = node1Hierarchy.length > node2Hierarchy.length ? node1Hierarchy : node2Hierarchy;
    const shorterHierarchy = longerHierarchy === node1Hierarchy ? node2Hierarchy : node1Hierarchy;
    if (longerHierarchy[longerHierarchy.length - shorterHierarchy.length] === shorterHierarchy[0]) {
      return longerHierarchy === node1Hierarchy ? (
        // other is a child of this
        _Node.DOCUMENT_POSITION_CONTAINED_BY | _Node.DOCUMENT_POSITION_FOLLOWING
      ) : (
        // this is a child of other
        _Node.DOCUMENT_POSITION_CONTAINS | _Node.DOCUMENT_POSITION_PRECEDING
      );
    }
    const longerStart = longerHierarchy.length - shorterHierarchy.length;
    for (let i = shorterHierarchy.length - 1; i >= 0; i--) {
      const shorterHierarchyNode = shorterHierarchy[i];
      const longerHierarchyNode = longerHierarchy[longerStart + i];
      if (longerHierarchyNode !== shorterHierarchyNode) {
        const siblings = shorterHierarchyNode.parentNode.childNodes;
        if (siblings.indexOf(shorterHierarchyNode) < siblings.indexOf(longerHierarchyNode)) {
          if (shorterHierarchy === node1Hierarchy) {
            return _Node.DOCUMENT_POSITION_PRECEDING;
          } else {
            return _Node.DOCUMENT_POSITION_FOLLOWING;
          }
        } else {
          if (longerHierarchy === node1Hierarchy) {
            return _Node.DOCUMENT_POSITION_PRECEDING;
          } else {
            return _Node.DOCUMENT_POSITION_FOLLOWING;
          }
        }
      }
    }
    return _Node.DOCUMENT_POSITION_FOLLOWING;
  }
  /**
   * @deprecated
   * @alias contains
   */
  contain(other) {
    return this.contains(other);
  }
  contains(other) {
    let tmp2 = other;
    while (tmp2 && this !== tmp2) {
      tmp2 = tmp2.parentNode;
    }
    return !!tmp2;
  }
  getAncestor(n) {
    let temp = this;
    while (n > 0 && temp) {
      temp = temp.parentNode;
      n--;
    }
    return temp;
  }
  forEach(callback, assigned = false) {
    if (!callback(this)) {
      (assigned ? this.childNodes.slice() : this.childNodes).forEach(
        (child) => {
          child.forEach(callback);
        }
      );
    }
  }
};
/**
 * Both nodes are in different documents or different trees in the same document.
 */
_Node.DOCUMENT_POSITION_DISCONNECTED = 1;
/**
 * otherNode precedes the node in either a pre-order depth-first traversal
 * of a tree containing both (e.g., as an ancestor or previous sibling or a descendant of a previous sibling or previous sibling of an ancestor) or (if they are disconnected) in an arbitrary but consistent ordering.
 */
_Node.DOCUMENT_POSITION_PRECEDING = 2;
/**
 * otherNode follows the node in either a pre-order depth-first traversal of a tree containing both (e.g., as a descendant or following sibling or a descendant of a following sibling or following sibling of an ancestor) or (if they are disconnected) in an arbitrary but consistent ordering.
 */
_Node.DOCUMENT_POSITION_FOLLOWING = 4;
/**
 * otherNode is an ancestor of the node.
 */
_Node.DOCUMENT_POSITION_CONTAINS = 8;
/**
 * otherNode is a descendant of the node.
 */
_Node.DOCUMENT_POSITION_CONTAINED_BY = 16;
/**
 * The result relies upon arbitrary and/or implementation-specific behavior and is not guaranteed to be portable.
 */
_Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
var Node = _Node;

// src/services/EventService.ts
var PROPAGATION_LIMIT = 2048;
var EventService = class {
  constructor(globalRuntime, context) {
    this.globalRuntime = globalRuntime;
    this.context = context;
    this.emitter = new eventemitter3_default();
    this.cursor = "default";
    this.mappingTable = {};
    this.mappingState = {
      trackingData: {}
    };
    this.eventPool = /* @__PURE__ */ new Map();
    this.tmpMatrix = mat4_exports.create();
    this.tmpVec3 = vec3_exports.create();
    this.onPointerDown = (from) => {
      const e = this.createPointerEvent(from);
      this.dispatchEvent(e, "pointerdown");
      if (e.pointerType === "touch") {
        this.dispatchEvent(e, "touchstart");
      } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
        const isRightButton = e.button === 2;
        this.dispatchEvent(e, isRightButton ? "rightdown" : "mousedown");
      }
      const trackingData = this.trackingData(from.pointerId);
      trackingData.pressTargetsByButton[from.button] = e.composedPath();
      this.freeEvent(e);
    };
    this.onPointerUp = (from) => {
      var _a;
      const now = clock.now();
      const e = this.createPointerEvent(
        from,
        void 0,
        void 0,
        this.context.config.alwaysTriggerPointerEventOnCanvas ? this.rootTarget : void 0
      );
      this.dispatchEvent(e, "pointerup");
      if (e.pointerType === "touch") {
        this.dispatchEvent(e, "touchend");
      } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
        const isRightButton = e.button === 2;
        this.dispatchEvent(e, isRightButton ? "rightup" : "mouseup");
      }
      const trackingData = this.trackingData(from.pointerId);
      const pressTarget = this.findMountedTarget(
        trackingData.pressTargetsByButton[from.button]
      );
      let clickTarget = pressTarget;
      if (pressTarget && !e.composedPath().includes(pressTarget)) {
        let currentTarget = pressTarget;
        while (currentTarget && !e.composedPath().includes(currentTarget)) {
          e.currentTarget = currentTarget;
          this.notifyTarget(e, "pointerupoutside");
          if (e.pointerType === "touch") {
            this.notifyTarget(e, "touchendoutside");
          } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
            const isRightButton = e.button === 2;
            this.notifyTarget(
              e,
              isRightButton ? "rightupoutside" : "mouseupoutside"
            );
          }
          if (Node.isNode(currentTarget)) {
            currentTarget = currentTarget.parentNode;
          }
        }
        delete trackingData.pressTargetsByButton[from.button];
        clickTarget = currentTarget;
      }
      if (clickTarget) {
        const clickEvent = this.clonePointerEvent(e, "click");
        clickEvent.target = clickTarget;
        clickEvent.path = [];
        if (!trackingData.clicksByButton[from.button]) {
          trackingData.clicksByButton[from.button] = {
            clickCount: 0,
            target: clickEvent.target,
            timeStamp: now
          };
        }
        const clickHistory = trackingData.clicksByButton[from.button];
        if (clickHistory.target === clickEvent.target && now - clickHistory.timeStamp < 200) {
          ++clickHistory.clickCount;
        } else {
          clickHistory.clickCount = 1;
        }
        clickHistory.target = clickEvent.target;
        clickHistory.timeStamp = now;
        clickEvent.detail = clickHistory.clickCount;
        if (!((_a = e.detail) == null ? void 0 : _a.preventClick)) {
          if (!this.context.config.useNativeClickEvent && (clickEvent.pointerType === "mouse" || clickEvent.pointerType === "touch")) {
            this.dispatchEvent(clickEvent, "click");
          }
          this.dispatchEvent(clickEvent, "pointertap");
        }
        this.freeEvent(clickEvent);
      }
      this.freeEvent(e);
    };
    this.onPointerMove = (from) => {
      const e = this.createPointerEvent(
        from,
        void 0,
        void 0,
        this.context.config.alwaysTriggerPointerEventOnCanvas ? this.rootTarget : void 0
      );
      const isMouse = e.pointerType === "mouse" || e.pointerType === "pen";
      const trackingData = this.trackingData(from.pointerId);
      const outTarget = this.findMountedTarget(trackingData.overTargets);
      if (trackingData.overTargets && outTarget !== e.target) {
        const outType = from.type === "mousemove" ? "mouseout" : "pointerout";
        const outEvent = this.createPointerEvent(
          from,
          outType,
          outTarget || void 0
        );
        this.dispatchEvent(outEvent, "pointerout");
        if (isMouse)
          this.dispatchEvent(outEvent, "mouseout");
        if (!e.composedPath().includes(outTarget)) {
          const leaveEvent = this.createPointerEvent(
            from,
            "pointerleave",
            outTarget || void 0
          );
          leaveEvent.eventPhase = leaveEvent.AT_TARGET;
          while (leaveEvent.target && !e.composedPath().includes(leaveEvent.target)) {
            leaveEvent.currentTarget = leaveEvent.target;
            this.notifyTarget(leaveEvent);
            if (isMouse) {
              this.notifyTarget(leaveEvent, "mouseleave");
            }
            if (Node.isNode(leaveEvent.target)) {
              leaveEvent.target = leaveEvent.target.parentNode;
            }
          }
          this.freeEvent(leaveEvent);
        }
        this.freeEvent(outEvent);
      }
      if (outTarget !== e.target) {
        const overType = from.type === "mousemove" ? "mouseover" : "pointerover";
        const overEvent = this.clonePointerEvent(e, overType);
        this.dispatchEvent(overEvent, "pointerover");
        if (isMouse)
          this.dispatchEvent(overEvent, "mouseover");
        let overTargetAncestor = outTarget && Node.isNode(outTarget) && outTarget.parentNode;
        while (overTargetAncestor && overTargetAncestor !== (Node.isNode(this.rootTarget) && this.rootTarget.parentNode)) {
          if (overTargetAncestor === e.target)
            break;
          overTargetAncestor = overTargetAncestor.parentNode;
        }
        const didPointerEnter = !overTargetAncestor || overTargetAncestor === (Node.isNode(this.rootTarget) && this.rootTarget.parentNode);
        if (didPointerEnter) {
          const enterEvent = this.clonePointerEvent(e, "pointerenter");
          enterEvent.eventPhase = enterEvent.AT_TARGET;
          while (enterEvent.target && enterEvent.target !== outTarget && enterEvent.target !== (Node.isNode(this.rootTarget) && this.rootTarget.parentNode)) {
            enterEvent.currentTarget = enterEvent.target;
            this.notifyTarget(enterEvent);
            if (isMouse)
              this.notifyTarget(enterEvent, "mouseenter");
            if (Node.isNode(enterEvent.target)) {
              enterEvent.target = enterEvent.target.parentNode;
            }
          }
          this.freeEvent(enterEvent);
        }
        this.freeEvent(overEvent);
      }
      this.dispatchEvent(e, "pointermove");
      if (e.pointerType === "touch")
        this.dispatchEvent(e, "touchmove");
      if (isMouse) {
        this.dispatchEvent(e, "mousemove");
        this.cursor = this.getCursor(e.target);
      }
      trackingData.overTargets = e.composedPath();
      this.freeEvent(e);
    };
    this.onPointerOut = (from) => {
      const trackingData = this.trackingData(from.pointerId);
      if (trackingData.overTargets) {
        const isMouse = from.pointerType === "mouse" || from.pointerType === "pen";
        const outTarget = this.findMountedTarget(trackingData.overTargets);
        const outEvent = this.createPointerEvent(
          from,
          "pointerout",
          outTarget || void 0
        );
        this.dispatchEvent(outEvent);
        if (isMouse)
          this.dispatchEvent(outEvent, "mouseout");
        const leaveEvent = this.createPointerEvent(
          from,
          "pointerleave",
          outTarget || void 0
        );
        leaveEvent.eventPhase = leaveEvent.AT_TARGET;
        while (leaveEvent.target && leaveEvent.target !== (Node.isNode(this.rootTarget) && this.rootTarget.parentNode)) {
          leaveEvent.currentTarget = leaveEvent.target;
          this.notifyTarget(leaveEvent);
          if (isMouse) {
            this.notifyTarget(leaveEvent, "mouseleave");
          }
          if (Node.isNode(leaveEvent.target)) {
            leaveEvent.target = leaveEvent.target.parentNode;
          }
        }
        trackingData.overTargets = null;
        this.freeEvent(outEvent);
        this.freeEvent(leaveEvent);
      }
      this.cursor = null;
    };
    this.onPointerOver = (from) => {
      const trackingData = this.trackingData(from.pointerId);
      const e = this.createPointerEvent(from);
      const isMouse = e.pointerType === "mouse" || e.pointerType === "pen";
      this.dispatchEvent(e, "pointerover");
      if (isMouse)
        this.dispatchEvent(e, "mouseover");
      if (e.pointerType === "mouse")
        this.cursor = this.getCursor(e.target);
      const enterEvent = this.clonePointerEvent(e, "pointerenter");
      enterEvent.eventPhase = enterEvent.AT_TARGET;
      while (enterEvent.target && enterEvent.target !== (Node.isNode(this.rootTarget) && this.rootTarget.parentNode)) {
        enterEvent.currentTarget = enterEvent.target;
        this.notifyTarget(enterEvent);
        if (isMouse) {
          this.notifyTarget(enterEvent, "mouseenter");
        }
        if (Node.isNode(enterEvent.target)) {
          enterEvent.target = enterEvent.target.parentNode;
        }
      }
      trackingData.overTargets = e.composedPath();
      this.freeEvent(e);
      this.freeEvent(enterEvent);
    };
    this.onPointerUpOutside = (from) => {
      const trackingData = this.trackingData(from.pointerId);
      const pressTarget = this.findMountedTarget(
        trackingData.pressTargetsByButton[from.button]
      );
      const e = this.createPointerEvent(from);
      if (pressTarget) {
        let currentTarget = pressTarget;
        while (currentTarget) {
          e.currentTarget = currentTarget;
          this.notifyTarget(e, "pointerupoutside");
          if (e.pointerType === "touch") {
          } else if (e.pointerType === "mouse" || e.pointerType === "pen") {
            this.notifyTarget(
              e,
              e.button === 2 ? "rightupoutside" : "mouseupoutside"
            );
          }
          if (Node.isNode(currentTarget)) {
            currentTarget = currentTarget.parentNode;
          }
        }
        delete trackingData.pressTargetsByButton[from.button];
      }
      this.freeEvent(e);
    };
    this.onWheel = (from) => {
      const wheelEvent = this.createWheelEvent(from);
      this.dispatchEvent(wheelEvent);
      this.freeEvent(wheelEvent);
    };
    this.onClick = (from) => {
      if (this.context.config.useNativeClickEvent) {
        const e = this.createPointerEvent(from);
        this.dispatchEvent(e);
        this.freeEvent(e);
      }
    };
    this.onPointerCancel = (from) => {
      const e = this.createPointerEvent(
        from,
        void 0,
        void 0,
        this.context.config.alwaysTriggerPointerEventOnCanvas ? this.rootTarget : void 0
      );
      this.dispatchEvent(e);
      this.freeEvent(e);
    };
  }
  init() {
    this.rootTarget = this.context.renderingContext.root.parentNode;
    this.addEventMapping("pointerdown", this.onPointerDown);
    this.addEventMapping("pointerup", this.onPointerUp);
    this.addEventMapping("pointermove", this.onPointerMove);
    this.addEventMapping("pointerout", this.onPointerOut);
    this.addEventMapping("pointerleave", this.onPointerOut);
    this.addEventMapping("pointercancel", this.onPointerCancel);
    this.addEventMapping("pointerover", this.onPointerOver);
    this.addEventMapping("pointerupoutside", this.onPointerUpOutside);
    this.addEventMapping("wheel", this.onWheel);
    this.addEventMapping("click", this.onClick);
  }
  destroy() {
    this.emitter.removeAllListeners();
    this.mappingTable = {};
    this.mappingState = {};
    this.eventPool.clear();
  }
  client2Viewport(client) {
    const bbox = this.context.contextService.getBoundingClientRect();
    return new Point(client.x - ((bbox == null ? void 0 : bbox.left) || 0), client.y - ((bbox == null ? void 0 : bbox.top) || 0));
  }
  viewport2Client(canvas) {
    const bbox = this.context.contextService.getBoundingClientRect();
    return new Point(canvas.x + ((bbox == null ? void 0 : bbox.left) || 0), canvas.y + ((bbox == null ? void 0 : bbox.top) || 0));
  }
  viewport2Canvas({ x, y }) {
    const canvas = this.rootTarget.defaultView;
    const camera = canvas.getCamera();
    const { width, height } = this.context.config;
    const projectionMatrixInverse = camera.getPerspectiveInverse();
    const worldMatrix = camera.getWorldTransform();
    const vpMatrix = mat4_exports.multiply(
      this.tmpMatrix,
      worldMatrix,
      projectionMatrixInverse
    );
    const viewport = vec3_exports.set(
      this.tmpVec3,
      x / width * 2 - 1,
      (1 - y / height) * 2 - 1,
      0
    );
    vec3_exports.transformMat4(viewport, viewport, vpMatrix);
    return new Point(viewport[0], viewport[1]);
  }
  canvas2Viewport(canvasP) {
    const canvas = this.rootTarget.defaultView;
    const camera = canvas.getCamera();
    const projectionMatrix = camera.getPerspective();
    const viewMatrix = camera.getViewTransform();
    const vpMatrix = mat4_exports.multiply(
      this.tmpMatrix,
      projectionMatrix,
      viewMatrix
    );
    const clip = vec3_exports.set(this.tmpVec3, canvasP.x, canvasP.y, 0);
    vec3_exports.transformMat4(this.tmpVec3, this.tmpVec3, vpMatrix);
    const { width, height } = this.context.config;
    return new Point(
      (clip[0] + 1) / 2 * width,
      (1 - (clip[1] + 1) / 2) * height
    );
  }
  setPickHandler(pickHandler) {
    this.pickHandler = pickHandler;
  }
  addEventMapping(type, fn) {
    if (!this.mappingTable[type]) {
      this.mappingTable[type] = [];
    }
    this.mappingTable[type].push({
      fn,
      priority: 0
    });
    this.mappingTable[type].sort((a, b) => a.priority - b.priority);
  }
  mapEvent(e) {
    if (!this.rootTarget) {
      return;
    }
    const mappers = this.mappingTable[e.type];
    if (mappers) {
      for (let i = 0, j = mappers.length; i < j; i++) {
        mappers[i].fn(e);
      }
    } else {
      console.warn(`[EventService]: Event mapping not defined for ${e.type}`);
    }
  }
  dispatchEvent(e, type, skipPropagate) {
    if (!skipPropagate) {
      e.propagationStopped = false;
      e.propagationImmediatelyStopped = false;
      this.propagate(e, type);
    } else {
      e.eventPhase = e.AT_TARGET;
      const canvas = this.rootTarget.defaultView || null;
      e.currentTarget = canvas;
      this.notifyListeners(e, type);
    }
    this.emitter.emit(type || e.type, e);
  }
  propagate(e, type) {
    if (!e.target) {
      return;
    }
    const composedPath = e.composedPath();
    e.eventPhase = e.CAPTURING_PHASE;
    for (let i = composedPath.length - 1; i >= 1; i--) {
      e.currentTarget = composedPath[i];
      this.notifyTarget(e, type);
      if (e.propagationStopped || e.propagationImmediatelyStopped)
        return;
    }
    e.eventPhase = e.AT_TARGET;
    e.currentTarget = e.target;
    this.notifyTarget(e, type);
    if (e.propagationStopped || e.propagationImmediatelyStopped)
      return;
    const index = composedPath.indexOf(e.currentTarget);
    e.eventPhase = e.BUBBLING_PHASE;
    for (let i = index + 1; i < composedPath.length; i++) {
      e.currentTarget = composedPath[i];
      this.notifyTarget(e, type);
      if (e.propagationStopped || e.propagationImmediatelyStopped)
        return;
    }
  }
  propagationPath(target) {
    const propagationPath = [target];
    const canvas = this.rootTarget.defaultView || null;
    if (canvas && canvas === target) {
      propagationPath.unshift(canvas.document);
      return propagationPath;
    }
    for (let i = 0; i < PROPAGATION_LIMIT && target !== this.rootTarget; i++) {
      if (Node.isNode(target) && target.parentNode) {
        propagationPath.push(target.parentNode);
        target = target.parentNode;
      }
    }
    if (canvas) {
      propagationPath.push(canvas);
    }
    return propagationPath;
  }
  hitTest(position) {
    const { viewportX, viewportY } = position;
    const { width, height, disableHitTesting } = this.context.config;
    if (viewportX < 0 || viewportY < 0 || viewportX > width || viewportY > height) {
      return null;
    }
    return !disableHitTesting && this.pickHandler(position) || this.rootTarget || // return Document
    null;
  }
  /**
   * whether the native event trigger came from Canvas,
   * should account for HTML shape
   */
  isNativeEventFromCanvas(event) {
    var _a;
    const $el = this.context.contextService.getDomElement();
    const target = (_a = event.nativeEvent) == null ? void 0 : _a.target;
    if (target) {
      if (target === $el) {
        return true;
      }
      if ($el && $el.contains) {
        return $el.contains(target);
      }
    }
    if (event.nativeEvent.composedPath) {
      return event.nativeEvent.composedPath().indexOf($el) > -1;
    }
    return false;
  }
  /**
   * Find HTML from composed path in native UI event.
   */
  getExistedHTML(event) {
    if (event.nativeEvent.composedPath) {
      for (const eventTarget of event.nativeEvent.composedPath()) {
        const existed = this.globalRuntime.nativeHTMLMap.get(eventTarget);
        if (existed) {
          return existed;
        }
      }
    }
    return null;
  }
  pickTarget(event) {
    return this.hitTest({
      clientX: event.clientX,
      clientY: event.clientY,
      viewportX: event.viewportX,
      viewportY: event.viewportY,
      x: event.canvasX,
      y: event.canvasY
    });
  }
  createPointerEvent(from, type, target, fallbackTarget) {
    const event = this.allocateEvent(FederatedPointerEvent);
    this.copyPointerData(from, event);
    this.copyMouseData(from, event);
    this.copyData(from, event);
    event.nativeEvent = from.nativeEvent;
    event.originalEvent = from;
    const existedHTML = this.getExistedHTML(event);
    event.target = target != null ? target : existedHTML || this.isNativeEventFromCanvas(event) && this.pickTarget(event) || fallbackTarget;
    if (typeof type === "string") {
      event.type = type;
    }
    return event;
  }
  createWheelEvent(from) {
    const event = this.allocateEvent(FederatedWheelEvent);
    this.copyWheelData(from, event);
    this.copyMouseData(from, event);
    this.copyData(from, event);
    event.nativeEvent = from.nativeEvent;
    event.originalEvent = from;
    const existedHTML = this.getExistedHTML(event);
    event.target = existedHTML || this.isNativeEventFromCanvas(event) && this.pickTarget(event);
    return event;
  }
  trackingData(id2) {
    if (!this.mappingState.trackingData[id2]) {
      this.mappingState.trackingData[id2] = {
        pressTargetsByButton: {},
        clicksByButton: {},
        overTarget: null
      };
    }
    return this.mappingState.trackingData[id2];
  }
  cloneWheelEvent(from) {
    const event = this.allocateEvent(FederatedWheelEvent);
    event.nativeEvent = from.nativeEvent;
    event.originalEvent = from.originalEvent;
    this.copyWheelData(from, event);
    this.copyMouseData(from, event);
    this.copyData(from, event);
    event.target = from.target;
    event.path = from.composedPath().slice();
    event.type = from.type;
    return event;
  }
  clonePointerEvent(from, type) {
    const event = this.allocateEvent(FederatedPointerEvent);
    event.nativeEvent = from.nativeEvent;
    event.originalEvent = from.originalEvent;
    this.copyPointerData(from, event);
    this.copyMouseData(from, event);
    this.copyData(from, event);
    event.target = from.target;
    event.path = from.composedPath().slice();
    event.type = type != null ? type : event.type;
    return event;
  }
  copyPointerData(from, to) {
    to.pointerId = from.pointerId;
    to.width = from.width;
    to.height = from.height;
    to.isPrimary = from.isPrimary;
    to.pointerType = from.pointerType;
    to.pressure = from.pressure;
    to.tangentialPressure = from.tangentialPressure;
    to.tiltX = from.tiltX;
    to.tiltY = from.tiltY;
    to.twist = from.twist;
  }
  copyMouseData(from, to) {
    to.altKey = from.altKey;
    to.button = from.button;
    to.buttons = from.buttons;
    to.ctrlKey = from.ctrlKey;
    to.metaKey = from.metaKey;
    to.shiftKey = from.shiftKey;
    to.client.copyFrom(from.client);
    to.movement.copyFrom(from.movement);
    to.canvas.copyFrom(from.canvas);
    to.screen.copyFrom(from.screen);
    to.global.copyFrom(from.global);
    to.offset.copyFrom(from.offset);
  }
  copyWheelData(from, to) {
    to.deltaMode = from.deltaMode;
    to.deltaX = from.deltaX;
    to.deltaY = from.deltaY;
    to.deltaZ = from.deltaZ;
  }
  copyData(from, to) {
    to.isTrusted = from.isTrusted;
    to.timeStamp = clock.now();
    to.type = from.type;
    to.detail = from.detail;
    to.view = from.view;
    to.page.copyFrom(from.page);
    to.viewport.copyFrom(from.viewport);
  }
  allocateEvent(constructor) {
    if (!this.eventPool.has(constructor)) {
      this.eventPool.set(constructor, []);
    }
    const event = this.eventPool.get(constructor).pop() || new constructor(this);
    event.eventPhase = event.NONE;
    event.currentTarget = null;
    event.path = [];
    event.target = null;
    return event;
  }
  freeEvent(event) {
    if (event.manager !== this)
      throw new Error(
        "It is illegal to free an event not managed by this EventBoundary!"
      );
    const { constructor } = event;
    if (!this.eventPool.has(constructor)) {
      this.eventPool.set(constructor, []);
    }
    this.eventPool.get(constructor).push(event);
  }
  notifyTarget(e, type) {
    type = type != null ? type : e.type;
    const key = e.eventPhase === e.CAPTURING_PHASE || e.eventPhase === e.AT_TARGET ? `${type}capture` : type;
    this.notifyListeners(e, key);
    if (e.eventPhase === e.AT_TARGET) {
      this.notifyListeners(e, type);
    }
  }
  notifyListeners(e, type) {
    const emitter = e.currentTarget.emitter;
    const listeners = emitter._events[type];
    if (!listeners)
      return;
    if ("fn" in listeners) {
      if (listeners.once) {
        emitter.removeListener(type, listeners.fn, void 0, true);
      }
      listeners.fn.call(e.currentTarget || listeners.context, e);
    } else {
      for (let i = 0; i < listeners.length && !e.propagationImmediatelyStopped; i++) {
        if (listeners[i].once) {
          emitter.removeListener(type, listeners[i].fn, void 0, true);
        }
        listeners[i].fn.call(e.currentTarget || listeners[i].context, e);
      }
    }
  }
  /**
   * some detached nodes may exist in propagation path, need to skip them
   */
  findMountedTarget(propagationPath) {
    if (!propagationPath) {
      return null;
    }
    let currentTarget = propagationPath[propagationPath.length - 1];
    for (let i = propagationPath.length - 2; i >= 0; i--) {
      const target = propagationPath[i];
      if (target === this.rootTarget || Node.isNode(target) && target.parentNode === currentTarget) {
        currentTarget = propagationPath[i];
      } else {
        break;
      }
    }
    return currentTarget;
  }
  getCursor(target) {
    let tmp2 = target;
    while (tmp2) {
      const cursor = isElement(tmp2) && tmp2.getAttribute("cursor");
      if (cursor) {
        return cursor;
      }
      tmp2 = Node.isNode(tmp2) && tmp2.parentNode;
    }
  }
};

// src/services/OffscreenCanvasCreator.ts
var OffscreenCanvasCreator = class {
  getOrCreateCanvas(offscreenCanvas, contextAttributes) {
    if (this.canvas) {
      return this.canvas;
    }
    if (offscreenCanvas || runtime.offscreenCanvas) {
      this.canvas = offscreenCanvas || runtime.offscreenCanvas;
      this.context = this.canvas.getContext("2d", contextAttributes);
    } else {
      try {
        this.canvas = new window.OffscreenCanvas(0, 0);
        this.context = this.canvas.getContext("2d", contextAttributes);
        if (!this.context || !this.context.measureText) {
          this.canvas = document.createElement("canvas");
          this.context = this.canvas.getContext("2d");
        }
      } catch (ex) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d", contextAttributes);
      }
    }
    this.canvas.width = 10;
    this.canvas.height = 10;
    return this.canvas;
  }
  getOrCreateContext(offscreenCanvas, contextAttributes) {
    if (this.context) {
      return this.context;
    }
    this.getOrCreateCanvas(offscreenCanvas, contextAttributes);
    return this.context;
  }
};

// src/services/RenderingContext.ts
var RenderReason = /* @__PURE__ */ ((RenderReason2) => {
  RenderReason2[RenderReason2["CAMERA_CHANGED"] = 0] = "CAMERA_CHANGED";
  RenderReason2[RenderReason2["DISPLAY_OBJECT_CHANGED"] = 1] = "DISPLAY_OBJECT_CHANGED";
  RenderReason2[RenderReason2["NONE"] = 2] = "NONE";
  return RenderReason2;
})(RenderReason || {});

// src/services/RenderingService.ts
var RenderingService = class {
  constructor(globalRuntime, context) {
    this.globalRuntime = globalRuntime;
    this.context = context;
    this.inited = false;
    this.stats = {
      /**
       * total display objects in scenegraph
       */
      total: 0,
      /**
       * number of display objects need to render in current frame
       */
      rendered: 0
    };
    this.zIndexCounter = 0;
    this.hooks = {
      /**
       * called before any frame rendered
       */
      init: new SyncHook(),
      initAsync: new AsyncParallelHook(),
      /**
       * only dirty object which has sth changed will be rendered
       */
      dirtycheck: new SyncWaterfallHook(),
      /**
       * do culling
       */
      cull: new SyncWaterfallHook(),
      /**
       * called at beginning of each frame, won't get called if nothing to re-render
       */
      beginFrame: new SyncHook(),
      /**
       * called before every dirty object get rendered
       */
      beforeRender: new SyncHook(),
      /**
       * called when every dirty object rendering even it's culled
       */
      render: new SyncHook(),
      /**
       * called after every dirty object get rendered
       */
      afterRender: new SyncHook(),
      endFrame: new SyncHook(),
      destroy: new SyncHook(),
      /**
       * use async but faster method such as GPU-based picking in `g-plugin-device-renderer`
       */
      pick: new AsyncSeriesWaterfallHook(),
      /**
       * Unsafe but sync version of pick.
       */
      pickSync: new SyncWaterfallHook(),
      /**
       * used in event system
       */
      pointerDown: new SyncHook(),
      pointerUp: new SyncHook(),
      pointerMove: new SyncHook(),
      pointerOut: new SyncHook(),
      pointerOver: new SyncHook(),
      pointerWheel: new SyncHook(),
      pointerCancel: new SyncHook(),
      click: new SyncHook()
    };
  }
  init(callback) {
    const context = __spreadValues(__spreadValues({}, this.globalRuntime), this.context);
    this.context.renderingPlugins.forEach((plugin) => {
      plugin.apply(context, this.globalRuntime);
    });
    this.hooks.init.call();
    if (this.hooks.initAsync.getCallbacksNum() === 0) {
      this.inited = true;
      callback();
    } else {
      this.hooks.initAsync.promise().then(() => {
        this.inited = true;
        callback();
      });
    }
  }
  getStats() {
    return this.stats;
  }
  /**
   * Meet the following conditions:
   * * disable DirtyRectangleRendering
   * * camera changed
   */
  disableDirtyRectangleRendering() {
    const { renderer } = this.context.config;
    const { enableDirtyRectangleRendering } = renderer.getConfig();
    return !enableDirtyRectangleRendering || this.context.renderingContext.renderReasons.has(
      0 /* CAMERA_CHANGED */
    );
  }
  render(canvasConfig, rerenderCallback) {
    this.stats.total = 0;
    this.stats.rendered = 0;
    this.zIndexCounter = 0;
    const { renderingContext } = this.context;
    this.globalRuntime.sceneGraphService.syncHierarchy(renderingContext.root);
    this.globalRuntime.sceneGraphService.triggerPendingEvents();
    if (renderingContext.renderReasons.size && this.inited) {
      renderingContext.dirtyRectangleRenderingDisabled = this.disableDirtyRectangleRendering();
      const onlyCameraChanged = renderingContext.renderReasons.size === 1 && renderingContext.renderReasons.has(0 /* CAMERA_CHANGED */);
      const shouldTriggerRenderHooks = !canvasConfig.disableRenderHooks || !(canvasConfig.disableRenderHooks && onlyCameraChanged);
      if (shouldTriggerRenderHooks) {
        this.renderDisplayObject(
          renderingContext.root,
          canvasConfig,
          renderingContext
        );
      }
      this.hooks.beginFrame.call();
      if (shouldTriggerRenderHooks) {
        renderingContext.renderListCurrentFrame.forEach((object) => {
          this.hooks.beforeRender.call(object);
          this.hooks.render.call(object);
          this.hooks.afterRender.call(object);
        });
      }
      this.hooks.endFrame.call();
      renderingContext.renderListCurrentFrame = [];
      renderingContext.renderReasons.clear();
      rerenderCallback();
    }
  }
  renderDisplayObject(displayObject, canvasConfig, renderingContext) {
    const { enableDirtyCheck, enableCulling } = canvasConfig.renderer.getConfig();
    if (this.globalRuntime.enableCSSParsing) {
      this.globalRuntime.styleValueRegistry.recalc(displayObject);
    }
    const renderable = displayObject.renderable;
    const objectChanged = enableDirtyCheck ? (
      // @ts-ignore
      renderable.dirty || renderingContext.dirtyRectangleRenderingDisabled ? displayObject : null
    ) : displayObject;
    if (objectChanged) {
      const objectToRender = enableCulling ? this.hooks.cull.call(objectChanged, this.context.camera) : objectChanged;
      if (objectToRender) {
        this.stats.rendered++;
        renderingContext.renderListCurrentFrame.push(objectToRender);
      }
    }
    displayObject.renderable.dirty = false;
    displayObject.sortable.renderOrder = this.zIndexCounter++;
    this.stats.total++;
    const sortable = displayObject.sortable;
    if (sortable.dirty) {
      this.sort(displayObject, sortable);
      sortable.dirty = false;
      sortable.dirtyChildren = [];
      sortable.dirtyReason = void 0;
    }
    (sortable.sorted || displayObject.childNodes).forEach(
      (child) => {
        this.renderDisplayObject(child, canvasConfig, renderingContext);
      }
    );
  }
  sort(displayObject, sortable) {
    if (sortable.sorted && sortable.dirtyReason !== 2 /* Z_INDEX_CHANGED */) {
      sortable.dirtyChildren.forEach((child) => {
        const index = displayObject.childNodes.indexOf(child);
        if (index === -1) {
          const index2 = sortable.sorted.indexOf(child);
          if (index2 >= 0) {
            sortable.sorted.splice(index2, 1);
          }
        } else {
          if (sortable.sorted.length === 0) {
            sortable.sorted.push(child);
          } else {
            const index2 = sortedIndex(
              sortable.sorted,
              child
            );
            sortable.sorted.splice(index2, 0, child);
          }
        }
      });
    } else {
      sortable.sorted = displayObject.childNodes.slice().sort(sortByZIndex);
    }
  }
  destroy() {
    this.inited = false;
    this.hooks.destroy.call();
    this.globalRuntime.sceneGraphService.clearPendingEvents();
  }
  dirtify() {
    this.context.renderingContext.renderReasons.add(
      1 /* DISPLAY_OBJECT_CHANGED */
    );
  }
};

// src/services/SceneGraphSelector.ts
var ATTRIBUTE_REGEXP = /\[\s*(.*)=(.*)\s*\]/;
var DefaultSceneGraphSelector = class {
  selectOne(query, root2) {
    if (query.startsWith(".")) {
      return root2.find((node) => {
        return ((node == null ? void 0 : node.classList) || []).indexOf(this.getIdOrClassname(query)) > -1;
      });
    } else if (query.startsWith("#")) {
      return root2.find((node) => {
        return node.id === this.getIdOrClassname(query);
      });
    } else if (query.startsWith("[")) {
      const { name, value } = this.getAttribute(query);
      if (name) {
        return root2.find(
          (node) => root2 !== node && (name === "name" ? node.name === value : this.attributeToString(node, name) === value)
        );
      } else {
        return null;
      }
    } else {
      return root2.find(
        (node) => root2 !== node && node.nodeName === query
      );
    }
  }
  selectAll(query, root2) {
    if (query.startsWith(".")) {
      return root2.findAll(
        (node) => root2 !== node && ((node == null ? void 0 : node.classList) || []).indexOf(this.getIdOrClassname(query)) > -1
      );
    } else if (query.startsWith("#")) {
      return root2.findAll(
        (node) => root2 !== node && node.id === this.getIdOrClassname(query)
      );
    } else if (query.startsWith("[")) {
      const { name, value } = this.getAttribute(query);
      if (name) {
        return root2.findAll(
          (node) => root2 !== node && (name === "name" ? node.name === value : this.attributeToString(node, name) === value)
        );
      } else {
        return [];
      }
    } else {
      return root2.findAll(
        (node) => root2 !== node && node.nodeName === query
      );
    }
  }
  is(query, node) {
    if (query.startsWith(".")) {
      return node.className === this.getIdOrClassname(query);
    } else if (query.startsWith("#")) {
      return node.id === this.getIdOrClassname(query);
    } else if (query.startsWith("[")) {
      const { name, value } = this.getAttribute(query);
      return name === "name" ? node.name === value : this.attributeToString(node, name) === value;
    } else {
      return node.nodeName === query;
    }
  }
  getIdOrClassname(query) {
    return query.substring(1);
  }
  getAttribute(query) {
    const matches = query.match(ATTRIBUTE_REGEXP);
    let name = "";
    let value = "";
    if (matches && matches.length > 2) {
      name = matches[1].replace(/"/g, "");
      value = matches[2].replace(/"/g, "");
    }
    return { name, value };
  }
  attributeToString(node, name) {
    if (!node.getAttribute) {
      return "";
    }
    const value = node.getAttribute(name);
    if (is_nil_default(value)) {
      return "";
    }
    if (value.toString) {
      return value.toString();
    }
    return "";
  }
};

// src/dom/MutationEvent.ts
var MutationEvent = class extends FederatedEvent {
  constructor(typeArg, relatedNode, prevValue, newValue, attrName, attrChange, prevParsedValue, newParsedValue) {
    super(null);
    this.relatedNode = relatedNode;
    this.prevValue = prevValue;
    this.newValue = newValue;
    this.attrName = attrName;
    this.attrChange = attrChange;
    this.prevParsedValue = prevParsedValue;
    this.newParsedValue = newParsedValue;
    this.type = typeArg;
  }
};
MutationEvent.ADDITION = 2;
MutationEvent.MODIFICATION = 1;
MutationEvent.REMOVAL = 3;

// src/dom/interfaces.ts
var ElementEvent = /* @__PURE__ */ ((ElementEvent2) => {
  ElementEvent2["REPARENT"] = "reparent";
  ElementEvent2["DESTROY"] = "destroy";
  ElementEvent2["ATTR_MODIFIED"] = "DOMAttrModified";
  ElementEvent2["INSERTED"] = "DOMNodeInserted";
  ElementEvent2["REMOVED"] = "removed";
  ElementEvent2["MOUNTED"] = "DOMNodeInsertedIntoDocument";
  ElementEvent2["UNMOUNTED"] = "DOMNodeRemovedFromDocument";
  ElementEvent2["BOUNDS_CHANGED"] = "bounds-changed";
  ElementEvent2["CULLED"] = "culled";
  return ElementEvent2;
})(ElementEvent || {});

// src/services/SceneGraphService.ts
function markRenderableDirty(e) {
  const renderable = e.renderable;
  if (renderable) {
    renderable.renderBoundsDirty = true;
    renderable.boundsDirty = true;
  }
}
var reparentEvent = new MutationEvent(
  "reparent" /* REPARENT */,
  null,
  "",
  "",
  "",
  0,
  "",
  ""
);
var DefaultSceneGraphService = class {
  constructor(runtime2) {
    this.runtime = runtime2;
    this.pendingEvents = [];
    this.boundsChangedEvent = new CustomEvent("bounds-changed" /* BOUNDS_CHANGED */);
    /**
     * rotate in world space
     */
    this.rotate = (() => {
      const parentInvertRotation = quat_exports.create();
      return (element, degrees, y = 0, z = 0) => {
        if (typeof degrees === "number") {
          degrees = vec3_exports.fromValues(degrees, y, z);
        }
        const transform = element.transformable;
        if (element.parentNode === null || !element.parentNode.transformable) {
          this.rotateLocal(element, degrees);
        } else {
          const rotation = quat_exports.create();
          quat_exports.fromEuler(rotation, degrees[0], degrees[1], degrees[2]);
          const rot = this.getRotation(element);
          const parentRot = this.getRotation(element.parentNode);
          quat_exports.copy(parentInvertRotation, parentRot);
          quat_exports.invert(parentInvertRotation, parentInvertRotation);
          quat_exports.multiply(rotation, parentInvertRotation, rotation);
          quat_exports.multiply(transform.localRotation, rotation, rot);
          quat_exports.normalize(transform.localRotation, transform.localRotation);
          this.dirtifyLocal(element, transform);
        }
      };
    })();
    /**
     * rotate in local space
     * @see @see https://docs.microsoft.com/en-us/windows/win32/api/directxmath/nf-directxmath-xmquaternionrotationrollpitchyaw
     */
    this.rotateLocal = (() => {
      const rotation = quat_exports.create();
      return (element, degrees, y = 0, z = 0) => {
        if (typeof degrees === "number") {
          degrees = vec3_exports.fromValues(degrees, y, z);
        }
        const transform = element.transformable;
        quat_exports.fromEuler(rotation, degrees[0], degrees[1], degrees[2]);
        quat_exports.mul(transform.localRotation, transform.localRotation, rotation);
        this.dirtifyLocal(element, transform);
      };
    })();
    /**
     * set euler angles(degrees) in world space
     */
    this.setEulerAngles = (() => {
      const invParentRot = quat_exports.create();
      return (element, degrees, y = 0, z = 0) => {
        if (typeof degrees === "number") {
          degrees = vec3_exports.fromValues(degrees, y, z);
        }
        const transform = element.transformable;
        if (element.parentNode === null || !element.parentNode.transformable) {
          this.setLocalEulerAngles(element, degrees);
        } else {
          quat_exports.fromEuler(
            transform.localRotation,
            degrees[0],
            degrees[1],
            degrees[2]
          );
          const parentRotation = this.getRotation(element.parentNode);
          quat_exports.copy(invParentRot, quat_exports.invert(quat_exports.create(), parentRotation));
          quat_exports.mul(
            transform.localRotation,
            transform.localRotation,
            invParentRot
          );
          this.dirtifyLocal(element, transform);
        }
      };
    })();
    /**
     * translate in local space
     *
     * @example
     * ```
     * translateLocal(x, y, z)
     * translateLocal(vec3(x, y, z))
     * ```
     */
    this.translateLocal = (() => {
      return (element, translation, y = 0, z = 0) => {
        if (typeof translation === "number") {
          translation = vec3_exports.fromValues(translation, y, z);
        }
        const transform = element.transformable;
        if (vec3_exports.equals(translation, vec3_exports.create())) {
          return;
        }
        vec3_exports.transformQuat(translation, translation, transform.localRotation);
        vec3_exports.add(transform.localPosition, transform.localPosition, translation);
        this.dirtifyLocal(element, transform);
      };
    })();
    /**
     * move to position in world space
     *
     * 对应 g 原版的 move/moveTo
     * @see https://github.com/antvis/g/blob/master/packages/g-base/src/abstract/element.ts#L684-L689
     */
    this.setPosition = (() => {
      const parentInvertMatrix = mat4_exports.create();
      const tmpPosition = vec3_exports.create();
      return (element, position) => {
        const transform = element.transformable;
        tmpPosition[0] = position[0];
        tmpPosition[1] = position[1];
        tmpPosition[2] = position[2] || 0;
        if (vec3_exports.equals(this.getPosition(element), tmpPosition)) {
          return;
        }
        vec3_exports.copy(transform.position, tmpPosition);
        if (element.parentNode === null || !element.parentNode.transformable) {
          vec3_exports.copy(transform.localPosition, tmpPosition);
        } else {
          const parentTransform = element.parentNode.transformable;
          mat4_exports.copy(parentInvertMatrix, parentTransform.worldTransform);
          mat4_exports.invert(parentInvertMatrix, parentInvertMatrix);
          vec3_exports.transformMat4(
            transform.localPosition,
            tmpPosition,
            parentInvertMatrix
          );
        }
        this.dirtifyLocal(element, transform);
      };
    })();
    /**
     * move to position in local space
     */
    this.setLocalPosition = (() => {
      const tmpPosition = vec3_exports.create();
      return (element, position) => {
        const transform = element.transformable;
        tmpPosition[0] = position[0];
        tmpPosition[1] = position[1];
        tmpPosition[2] = position[2] || 0;
        if (vec3_exports.equals(transform.localPosition, tmpPosition)) {
          return;
        }
        vec3_exports.copy(transform.localPosition, tmpPosition);
        this.dirtifyLocal(element, transform);
      };
    })();
    /**
     * translate in world space
     *
     * @example
     * ```
     * translate(x, y, z)
     * translate(vec3(x, y, z))
     * ```
     *
     * 对应 g 原版的 translate 2D
     * @see https://github.com/antvis/g/blob/master/packages/g-base/src/abstract/element.ts#L665-L676
     */
    this.translate = (() => {
      const zeroVec3 = vec3_exports.create();
      const tmpVec3 = vec3_exports.create();
      const tr = vec3_exports.create();
      return (element, translation, y = 0, z = 0) => {
        if (typeof translation === "number") {
          translation = vec3_exports.set(tmpVec3, translation, y, z);
        }
        if (vec3_exports.equals(translation, zeroVec3)) {
          return;
        }
        vec3_exports.add(tr, this.getPosition(element), translation);
        this.setPosition(element, tr);
      };
    })();
    this.setRotation = () => {
      const parentInvertRotation = quat_exports.create();
      return (element, rotation, y, z, w) => {
        const transform = element.transformable;
        if (typeof rotation === "number") {
          rotation = quat_exports.fromValues(rotation, y, z, w);
        }
        if (element.parentNode === null || !element.parentNode.transformable) {
          this.setLocalRotation(element, rotation);
        } else {
          const parentRot = this.getRotation(element.parentNode);
          quat_exports.copy(parentInvertRotation, parentRot);
          quat_exports.invert(parentInvertRotation, parentInvertRotation);
          quat_exports.multiply(transform.localRotation, parentInvertRotation, rotation);
          quat_exports.normalize(transform.localRotation, transform.localRotation);
          this.dirtifyLocal(element, transform);
        }
      };
    };
    this.displayObjectDependencyMap = /* @__PURE__ */ new WeakMap();
    this.calcLocalTransform = (() => {
      const tmpMat = mat4_exports.create();
      const tmpPosition = vec3_exports.create();
      const tmpQuat = quat_exports.fromValues(0, 0, 0, 1);
      return (transform) => {
        const hasSkew = transform.localSkew[0] !== 0 || transform.localSkew[1] !== 0;
        if (hasSkew) {
          mat4_exports.fromRotationTranslationScaleOrigin(
            transform.localTransform,
            transform.localRotation,
            transform.localPosition,
            vec3_exports.fromValues(1, 1, 1),
            transform.origin
          );
          if (transform.localSkew[0] !== 0 || transform.localSkew[1] !== 0) {
            const tmpMat42 = mat4_exports.identity(tmpMat);
            tmpMat42[4] = Math.tan(transform.localSkew[0]);
            tmpMat42[1] = Math.tan(transform.localSkew[1]);
            mat4_exports.multiply(
              transform.localTransform,
              transform.localTransform,
              tmpMat42
            );
          }
          const scaling = mat4_exports.fromRotationTranslationScaleOrigin(
            tmpMat,
            tmpQuat,
            tmpPosition,
            transform.localScale,
            transform.origin
          );
          mat4_exports.multiply(
            transform.localTransform,
            transform.localTransform,
            scaling
          );
        } else {
          mat4_exports.fromRotationTranslationScaleOrigin(
            transform.localTransform,
            transform.localRotation,
            transform.localPosition,
            transform.localScale,
            transform.origin
          );
        }
      };
    })();
  }
  matches(query, root2) {
    return this.runtime.sceneGraphSelector.is(query, root2);
  }
  querySelector(query, root2) {
    return this.runtime.sceneGraphSelector.selectOne(query, root2);
  }
  querySelectorAll(query, root2) {
    return this.runtime.sceneGraphSelector.selectAll(query, root2);
  }
  attach(child, parent, index) {
    var _a, _b;
    let detached = false;
    if (child.parentNode) {
      detached = child.parentNode !== parent;
      this.detach(child);
    }
    child.parentNode = parent;
    if (!is_nil_default(index)) {
      child.parentNode.childNodes.splice(
        index,
        0,
        child
      );
    } else {
      child.parentNode.childNodes.push(child);
    }
    const sortable = parent.sortable;
    if (((_a = sortable == null ? void 0 : sortable.sorted) == null ? void 0 : _a.length) || ((_b = child.style) == null ? void 0 : _b.zIndex)) {
      if (sortable.dirtyChildren.indexOf(child) === -1) {
        sortable.dirtyChildren.push(child);
      }
      sortable.dirty = true;
      sortable.dirtyReason = 0 /* ADDED */;
    }
    const transform = child.transformable;
    if (transform) {
      this.dirtifyWorld(child, transform);
    }
    if (transform.frozen) {
      this.unfreezeParentToRoot(child);
    }
    if (detached) {
      child.dispatchEvent(reparentEvent);
    }
  }
  detach(child) {
    var _a, _b;
    if (child.parentNode) {
      const transform = child.transformable;
      const sortable = child.parentNode.sortable;
      if (((_a = sortable == null ? void 0 : sortable.sorted) == null ? void 0 : _a.length) || ((_b = child.style) == null ? void 0 : _b.zIndex)) {
        if (sortable.dirtyChildren.indexOf(child) === -1) {
          sortable.dirtyChildren.push(child);
        }
        sortable.dirty = true;
        sortable.dirtyReason = 1 /* REMOVED */;
      }
      const index = child.parentNode.childNodes.indexOf(
        child
      );
      if (index > -1) {
        child.parentNode.childNodes.splice(index, 1);
      }
      if (transform) {
        this.dirtifyWorld(child, transform);
      }
      child.parentNode = null;
    }
  }
  getOrigin(element) {
    return element.transformable.origin;
  }
  /**
   * same as pivot in Pixi.js
   *
   * @see https://stackoverflow.com/questions/40748452/how-to-change-css-transform-origin-but-preserve-transformation
   */
  setOrigin(element, origin, y = 0, z = 0) {
    if (typeof origin === "number") {
      origin = [origin, y, z];
    }
    const transform = element.transformable;
    if (origin[0] === transform.origin[0] && origin[1] === transform.origin[1] && origin[2] === transform.origin[2]) {
      return;
    }
    const originVec = transform.origin;
    originVec[0] = origin[0];
    originVec[1] = origin[1];
    originVec[2] = origin[2] || 0;
    this.dirtifyLocal(element, transform);
  }
  /**
   * set euler angles(degrees) in local space
   */
  setLocalEulerAngles(element, degrees, y = 0, z = 0) {
    if (typeof degrees === "number") {
      degrees = vec3_exports.fromValues(degrees, y, z);
    }
    const transform = element.transformable;
    quat_exports.fromEuler(transform.localRotation, degrees[0], degrees[1], degrees[2]);
    this.dirtifyLocal(element, transform);
  }
  /**
   * scale in local space
   */
  scaleLocal(element, scaling) {
    const transform = element.transformable;
    vec3_exports.multiply(
      transform.localScale,
      transform.localScale,
      vec3_exports.fromValues(scaling[0], scaling[1], scaling[2] || 1)
    );
    this.dirtifyLocal(element, transform);
  }
  setLocalScale(element, scaling) {
    const transform = element.transformable;
    const updatedScaling = vec3_exports.fromValues(
      scaling[0],
      scaling[1],
      scaling[2] || transform.localScale[2]
    );
    if (vec3_exports.equals(updatedScaling, transform.localScale)) {
      return;
    }
    vec3_exports.copy(transform.localScale, updatedScaling);
    this.dirtifyLocal(element, transform);
  }
  setLocalRotation(element, rotation, y, z, w) {
    if (typeof rotation === "number") {
      rotation = quat_exports.fromValues(rotation, y, z, w);
    }
    const transform = element.transformable;
    quat_exports.copy(transform.localRotation, rotation);
    this.dirtifyLocal(element, transform);
  }
  setLocalSkew(element, skew, y) {
    if (typeof skew === "number") {
      skew = vec2_exports.fromValues(skew, y);
    }
    const transform = element.transformable;
    vec2_exports.copy(transform.localSkew, skew);
    this.dirtifyLocal(element, transform);
  }
  dirtifyLocal(element, transform) {
    if (!transform.localDirtyFlag) {
      transform.localDirtyFlag = true;
      if (!transform.dirtyFlag) {
        this.dirtifyWorld(element, transform);
      }
    }
  }
  dirtifyWorld(element, transform) {
    if (!transform.dirtyFlag) {
      this.unfreezeParentToRoot(element);
    }
    this.dirtifyWorldInternal(element, transform);
    this.dirtifyToRoot(element, true);
  }
  triggerPendingEvents() {
    const set7 = /* @__PURE__ */ new Set();
    const trigger = (element, detail) => {
      if (element.isConnected && !set7.has(element.entity)) {
        this.boundsChangedEvent.detail = detail;
        this.boundsChangedEvent.target = element;
        if (element.isMutationObserved) {
          element.dispatchEvent(this.boundsChangedEvent);
        } else {
          element.ownerDocument.defaultView.dispatchEvent(
            this.boundsChangedEvent,
            true
          );
        }
        set7.add(element.entity);
      }
    };
    this.pendingEvents.forEach(([element, detail]) => {
      if (detail.affectChildren) {
        element.forEach((e) => {
          trigger(e, detail);
        });
      } else {
        trigger(element, detail);
      }
    });
    this.clearPendingEvents();
    set7.clear();
  }
  clearPendingEvents() {
    this.pendingEvents = [];
  }
  dirtifyToRoot(element, affectChildren = false) {
    let p = element;
    if (p.renderable) {
      p.renderable.dirty = true;
    }
    while (p) {
      markRenderableDirty(p);
      p = p.parentNode;
    }
    if (affectChildren) {
      element.forEach((e) => {
        markRenderableDirty(e);
      });
    }
    this.informDependentDisplayObjects(element);
    this.pendingEvents.push([element, { affectChildren }]);
  }
  updateDisplayObjectDependency(name, oldPath, newPath, object) {
    if (oldPath && oldPath !== newPath) {
      const oldDependencyMap = this.displayObjectDependencyMap.get(oldPath);
      if (oldDependencyMap && oldDependencyMap[name]) {
        const index = oldDependencyMap[name].indexOf(object);
        oldDependencyMap[name].splice(index, 1);
      }
    }
    if (newPath) {
      let newDependencyMap = this.displayObjectDependencyMap.get(newPath);
      if (!newDependencyMap) {
        this.displayObjectDependencyMap.set(newPath, {});
        newDependencyMap = this.displayObjectDependencyMap.get(newPath);
      }
      if (!newDependencyMap[name]) {
        newDependencyMap[name] = [];
      }
      newDependencyMap[name].push(object);
    }
  }
  informDependentDisplayObjects(object) {
    const dependencyMap = this.displayObjectDependencyMap.get(object);
    if (dependencyMap) {
      Object.keys(dependencyMap).forEach((name) => {
        dependencyMap[name].forEach((target) => {
          this.dirtifyToRoot(target, true);
          target.dispatchEvent(
            new MutationEvent(
              "DOMAttrModified" /* ATTR_MODIFIED */,
              target,
              this,
              this,
              name,
              MutationEvent.MODIFICATION,
              this,
              this
            )
          );
          if (target.isCustomElement && target.isConnected) {
            if (target.attributeChangedCallback) {
              target.attributeChangedCallback(
                name,
                this,
                this
              );
            }
          }
        });
      });
    }
  }
  getPosition(element) {
    const transform = element.transformable;
    return mat4_exports.getTranslation(
      transform.position,
      this.getWorldTransform(element, transform)
    );
  }
  getRotation(element) {
    const transform = element.transformable;
    return mat4_exports.getRotation(
      transform.rotation,
      this.getWorldTransform(element, transform)
    );
  }
  getScale(element) {
    const transform = element.transformable;
    return mat4_exports.getScaling(
      transform.scaling,
      this.getWorldTransform(element, transform)
    );
  }
  getWorldTransform(element, transform = element.transformable) {
    if (!transform.localDirtyFlag && !transform.dirtyFlag) {
      return transform.worldTransform;
    }
    if (element.parentNode && element.parentNode.transformable) {
      this.getWorldTransform(element.parentNode);
    }
    this.sync(element, transform);
    return transform.worldTransform;
  }
  getLocalPosition(element) {
    return element.transformable.localPosition;
  }
  getLocalRotation(element) {
    return element.transformable.localRotation;
  }
  getLocalScale(element) {
    return element.transformable.localScale;
  }
  getLocalSkew(element) {
    return element.transformable.localSkew;
  }
  getLocalTransform(element) {
    const transform = element.transformable;
    if (transform.localDirtyFlag) {
      this.calcLocalTransform(transform);
      transform.localDirtyFlag = false;
    }
    return transform.localTransform;
  }
  setLocalTransform(element, transform) {
    const t = mat4_exports.getTranslation(vec3_exports.create(), transform);
    const r = mat4_exports.getRotation(quat_exports.create(), transform);
    const s = mat4_exports.getScaling(vec3_exports.create(), transform);
    this.setLocalScale(element, s);
    this.setLocalPosition(element, t);
    this.setLocalRotation(element, r);
  }
  resetLocalTransform(element) {
    this.setLocalScale(element, [1, 1, 1]);
    this.setLocalPosition(element, [0, 0, 0]);
    this.setLocalEulerAngles(element, [0, 0, 0]);
    this.setLocalSkew(element, [0, 0]);
  }
  getTransformedGeometryBounds(element, render = false, existedAABB) {
    const bounds = this.getGeometryBounds(element, render);
    if (!AABB.isEmpty(bounds)) {
      const aabb = existedAABB || new AABB();
      aabb.setFromTransformedAABB(bounds, this.getWorldTransform(element));
      return aabb;
    } else {
      return null;
    }
  }
  /**
   * won't account for children
   */
  getGeometryBounds(element, render = false) {
    const geometry = element.geometry;
    const bounds = render ? geometry.renderBounds : geometry.contentBounds || null;
    return bounds || new AABB();
  }
  /**
   * account for children in world space
   */
  getBounds(element, render = false) {
    const renderable = element.renderable;
    if (!renderable.boundsDirty && !render && renderable.bounds) {
      return renderable.bounds;
    }
    if (!renderable.renderBoundsDirty && render && renderable.renderBounds) {
      return renderable.renderBounds;
    }
    const existedAABB = render ? renderable.renderBounds : renderable.bounds;
    let aabb = this.getTransformedGeometryBounds(
      element,
      render,
      existedAABB
    );
    const children = element.childNodes;
    children.forEach((child) => {
      const childBounds = this.getBounds(child, render);
      if (childBounds) {
        if (!aabb) {
          aabb = existedAABB || new AABB();
          aabb.update(childBounds.center, childBounds.halfExtents);
        } else {
          aabb.add(childBounds);
        }
      }
    });
    if (render) {
      const clipped = findClosestClipPathTarget(element);
      if (clipped) {
        const clipPathBounds = clipped.parsedStyle.clipPath.getBounds(render);
        if (!aabb) {
          aabb = clipPathBounds;
        } else if (clipPathBounds) {
          aabb = clipPathBounds.intersection(aabb);
        }
      }
    }
    if (!aabb) {
      aabb = new AABB();
    }
    if (aabb) {
      if (render) {
        renderable.renderBounds = aabb;
      } else {
        renderable.bounds = aabb;
      }
    }
    if (render) {
      renderable.renderBoundsDirty = false;
    } else {
      renderable.boundsDirty = false;
    }
    return aabb;
  }
  /**
   * account for children in local space
   */
  getLocalBounds(element) {
    if (element.parentNode) {
      let parentInvert = mat4_exports.create();
      if (element.parentNode.transformable) {
        parentInvert = mat4_exports.invert(
          mat4_exports.create(),
          this.getWorldTransform(element.parentNode)
        );
      }
      const bounds = this.getBounds(element);
      if (!AABB.isEmpty(bounds)) {
        const localBounds = new AABB();
        localBounds.setFromTransformedAABB(bounds, parentInvert);
        return localBounds;
      }
    }
    return this.getBounds(element);
  }
  getBoundingClientRect(element) {
    var _a, _b;
    let aabb;
    const bounds = this.getGeometryBounds(element);
    if (!AABB.isEmpty(bounds)) {
      aabb = new AABB();
      aabb.setFromTransformedAABB(bounds, this.getWorldTransform(element));
    }
    const bbox = (_b = (_a = element.ownerDocument) == null ? void 0 : _a.defaultView) == null ? void 0 : _b.getContextService().getBoundingClientRect();
    if (aabb) {
      const [left, top] = aabb.getMin();
      const [right, bottom] = aabb.getMax();
      return new Rectangle(
        left + ((bbox == null ? void 0 : bbox.left) || 0),
        top + ((bbox == null ? void 0 : bbox.top) || 0),
        right - left,
        bottom - top
      );
    }
    return new Rectangle((bbox == null ? void 0 : bbox.left) || 0, (bbox == null ? void 0 : bbox.top) || 0, 0, 0);
  }
  dirtifyWorldInternal(element, transform) {
    if (!transform.dirtyFlag) {
      transform.dirtyFlag = true;
      transform.frozen = false;
      element.childNodes.forEach((child) => {
        const childTransform = child.transformable;
        if (!childTransform.dirtyFlag) {
          this.dirtifyWorldInternal(child, childTransform);
        }
      });
      const renderable = element.renderable;
      if (renderable) {
        renderable.renderBoundsDirty = true;
        renderable.boundsDirty = true;
        renderable.dirty = true;
      }
    }
  }
  syncHierarchy(element) {
    const transform = element.transformable;
    if (transform.frozen) {
      return;
    }
    transform.frozen = true;
    if (transform.localDirtyFlag || transform.dirtyFlag) {
      this.sync(element, transform);
    }
    const children = element.childNodes;
    for (let i = 0; i < children.length; i++) {
      this.syncHierarchy(children[i]);
    }
  }
  sync(element, transform) {
    if (transform.localDirtyFlag) {
      this.calcLocalTransform(transform);
      transform.localDirtyFlag = false;
    }
    if (transform.dirtyFlag) {
      const parent = element.parentNode;
      const parentTransform = parent && parent.transformable;
      if (parent === null || !parentTransform) {
        mat4_exports.copy(transform.worldTransform, transform.localTransform);
      } else {
        mat4_exports.multiply(
          transform.worldTransform,
          parentTransform.worldTransform,
          transform.localTransform
        );
      }
      transform.dirtyFlag = false;
    }
  }
  unfreezeParentToRoot(child) {
    let p = child.parentNode;
    while (p) {
      const transform = p.transformable;
      if (transform) {
        transform.frozen = false;
      }
      p = p.parentNode;
    }
  }
};

// src/services/TextService.ts
var TEXT_METRICS = {
  MetricsString: "|\xC9q\xC5",
  BaselineSymbol: "M",
  BaselineMultiplier: 1.4,
  HeightMultiplier: 2,
  Newlines: [
    10,
    // line feed
    13
    // carriage return
  ],
  BreakingSpaces: [
    9,
    // character tabulation
    32,
    // space
    8192,
    // en quad
    8193,
    // em quad
    8194,
    // en space
    8195,
    // em space
    8196,
    // three-per-em space
    8197,
    // four-per-em space
    8198,
    // six-per-em space
    8200,
    // punctuation space
    8201,
    // thin space
    8202,
    // hair space
    8287,
    // medium mathematical space
    12288
    // ideographic space
  ]
};
var LATIN_REGEX = /[a-zA-Z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff!"#$%&'()*+,-./:;]/;
var regexCannotStartZhCn = /[!%),.:;?\]}¢°·'""†‡›℃∶、。〃〆〕〗〞﹚﹜！＂％＇），．：；？！］｝～]/;
var regexCannotEndZhCn = /[$(£¥·'"〈《「『【〔〖〝﹙﹛＄（．［｛￡￥]/;
var regexCannotStartZhTw = /[!),.:;?\]}¢·–—'"•"、。〆〞〕〉》」︰︱︲︳﹐﹑﹒﹓﹔﹕﹖﹘﹚﹜！），．：；？︶︸︺︼︾﹀﹂﹗］｜｝､]/;
var regexCannotEndZhTw = /[([{£¥'"‵〈《「『〔〝︴﹙﹛（｛︵︷︹︻︽︿﹁﹃﹏]/;
var regexCannotStartJaJp = /[)\]｝〕〉》」』】〙〗〟'"｠»ヽヾーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿ々〻‐゠–〜?!‼⁇⁈⁉・、:;,。.]/;
var regexCannotEndJaJp = /[([｛〔〈《「『【〘〖〝'"｟«—...‥〳〴〵]/;
var regexCannotStartKoKr = /[!%),.:;?\]}¢°'"†‡℃〆〈《「『〕！％），．：；？］｝]/;
var regexCannotEndKoKr = /[$([{£¥'"々〇〉》」〔＄（［｛｠￥￦#]/;
var regexCannotStart = new RegExp(
  `${regexCannotStartZhCn.source}|${regexCannotStartZhTw.source}|${regexCannotStartJaJp.source}|${regexCannotStartKoKr.source}`
);
var regexCannotEnd = new RegExp(
  `${regexCannotEndZhCn.source}|${regexCannotEndZhTw.source}|${regexCannotEndJaJp.source}|${regexCannotEndKoKr.source}`
);
var TextService = class {
  constructor(runtime2) {
    this.runtime = runtime2;
    /**
     * font metrics cache
     */
    this.fontMetricsCache = {};
    this.shouldBreakByKinsokuShorui = (char, nextChar) => {
      if (this.isBreakingSpace(nextChar))
        return false;
      if (char) {
        if (regexCannotEnd.exec(nextChar) || regexCannotStart.exec(char)) {
          return true;
        }
      }
      return false;
    };
    this.trimByKinsokuShorui = (prev) => {
      const next = [...prev];
      const prevLine = next[next.length - 2];
      if (!prevLine) {
        return prev;
      }
      const lastChar = prevLine[prevLine.length - 1];
      next[next.length - 2] = prevLine.slice(0, -1);
      next[next.length - 1] = lastChar + next[next.length - 1];
      return next;
    };
  }
  /**
   * Calculates the ascent, descent and fontSize of a given font-style.
   */
  measureFont(font, offscreenCanvas) {
    if (this.fontMetricsCache[font]) {
      return this.fontMetricsCache[font];
    }
    const properties = {
      ascent: 0,
      descent: 0,
      fontSize: 0
    };
    const canvas = this.runtime.offscreenCanvasCreator.getOrCreateCanvas(offscreenCanvas);
    const context = this.runtime.offscreenCanvasCreator.getOrCreateContext(
      offscreenCanvas,
      {
        willReadFrequently: true
      }
    );
    context.font = font;
    const metricsString = TEXT_METRICS.MetricsString + TEXT_METRICS.BaselineSymbol;
    const width = Math.ceil(context.measureText(metricsString).width);
    let baseline = Math.ceil(
      context.measureText(TEXT_METRICS.BaselineSymbol).width
    );
    const height = TEXT_METRICS.HeightMultiplier * baseline;
    baseline = baseline * TEXT_METRICS.BaselineMultiplier | 0;
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = "#f00";
    context.fillRect(0, 0, width, height);
    context.font = font;
    context.textBaseline = "alphabetic";
    context.fillStyle = "#000";
    context.fillText(metricsString, 0, baseline);
    const imagedata = context.getImageData(0, 0, width || 1, height || 1).data;
    const pixels = imagedata.length;
    const line = width * 4;
    let i = 0;
    let idx = 0;
    let stop = false;
    for (i = 0; i < baseline; ++i) {
      for (let j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true;
          break;
        }
      }
      if (!stop) {
        idx += line;
      } else {
        break;
      }
    }
    properties.ascent = baseline - i;
    idx = pixels - line;
    stop = false;
    for (i = height; i > baseline; --i) {
      for (let j = 0; j < line; j += 4) {
        if (imagedata[idx + j] !== 255) {
          stop = true;
          break;
        }
      }
      if (!stop) {
        idx -= line;
      } else {
        break;
      }
    }
    properties.descent = i - baseline;
    properties.fontSize = properties.ascent + properties.descent;
    this.fontMetricsCache[font] = properties;
    return properties;
  }
  measureText(text, parsedStyle, offscreenCanvas) {
    const {
      fontSize,
      wordWrap,
      lineHeight: strokeHeight,
      lineWidth,
      textBaseline,
      textAlign,
      letterSpacing,
      textPath,
      textPathSide,
      textPathStartOffset,
      // dropShadow = 0,
      // dropShadowDistance = 0,
      leading = 0
    } = parsedStyle;
    const font = toFontString(parsedStyle);
    const fontProperties = this.measureFont(font, offscreenCanvas);
    if (fontProperties.fontSize === 0) {
      fontProperties.fontSize = fontSize;
      fontProperties.ascent = fontSize;
    }
    const context = this.runtime.offscreenCanvasCreator.getOrCreateContext(offscreenCanvas);
    context.font = font;
    parsedStyle.isOverflowing = false;
    const outputText = wordWrap ? this.wordWrap(text, parsedStyle, offscreenCanvas) : text;
    const lines = outputText.split(/(?:\r\n|\r|\n)/);
    const lineWidths = new Array(lines.length);
    let maxLineWidth = 0;
    if (textPath) {
      const totalPathLength = textPath.getTotalLength();
      for (let i = 0; i < lines.length; i++) {
        let positionInPath;
        const width = context.measureText(lines[i]).width + (lines[i].length - 1) * letterSpacing;
        const reverse = textPathSide === "right";
        switch (textAlign) {
          case "left":
          case "start":
            positionInPath = reverse ? totalPathLength - width : 0;
            break;
          case "center":
          case "middle":
            positionInPath = (totalPathLength - width) / 2;
            break;
          case "right":
          case "end":
            positionInPath = reverse ? 0 : totalPathLength - width;
            break;
        }
        positionInPath += textPathStartOffset * (reverse ? -1 : 1);
      }
    } else {
      for (let i = 0; i < lines.length; i++) {
        const lineWidth2 = context.measureText(lines[i]).width + (lines[i].length - 1) * letterSpacing;
        lineWidths[i] = lineWidth2;
        maxLineWidth = Math.max(maxLineWidth, lineWidth2);
      }
      const width = maxLineWidth + lineWidth;
      let lineHeight = strokeHeight || fontProperties.fontSize + lineWidth;
      const height = Math.max(lineHeight, fontProperties.fontSize + lineWidth) + (lines.length - 1) * (lineHeight + leading);
      lineHeight += leading;
      let offsetY = 0;
      if (textBaseline === "middle") {
        offsetY = -height / 2;
      } else if (textBaseline === "bottom" || textBaseline === "alphabetic" || textBaseline === "ideographic") {
        offsetY = -height;
      } else if (textBaseline === "top" || textBaseline === "hanging") {
        offsetY = 0;
      }
      return {
        font,
        width,
        height,
        lines,
        lineWidths,
        lineHeight,
        maxLineWidth,
        fontProperties,
        lineMetrics: lineWidths.map((width2, i) => {
          let offsetX = 0;
          if (textAlign === "center" || textAlign === "middle") {
            offsetX -= width2 / 2;
          } else if (textAlign === "right" || textAlign === "end") {
            offsetX -= width2;
          }
          return new Rectangle(
            offsetX - lineWidth / 2,
            offsetY + i * lineHeight,
            width2 + lineWidth,
            lineHeight
          );
        })
      };
    }
  }
  setGraphemeOnPath() {
  }
  wordWrap(text, parsedStyle, offscreenCanvas) {
    const {
      wordWrapWidth = 0,
      letterSpacing,
      maxLines = Infinity,
      textOverflow
    } = parsedStyle;
    const context = this.runtime.offscreenCanvasCreator.getOrCreateContext(offscreenCanvas);
    const maxWidth = wordWrapWidth + letterSpacing;
    let ellipsis = "";
    if (textOverflow === "ellipsis") {
      ellipsis = "...";
    } else if (textOverflow && textOverflow !== "clip") {
      ellipsis = textOverflow;
    }
    let lines = [];
    let currentIndex = 0;
    let currentWidth = 0;
    const cache = {};
    const calcWidth = (char) => {
      return this.getFromCache(
        char,
        letterSpacing,
        cache,
        context
      );
    };
    const ellipsisWidth = Array.from(ellipsis).reduce((prev, cur) => {
      return prev + calcWidth(cur);
    }, 0);
    const chars = Array.from(text);
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const prevChar = text[i - 1];
      const nextChar = text[i + 1];
      const charWidth = calcWidth(char);
      if (this.isNewline(char)) {
        currentIndex++;
        if (currentIndex >= maxLines) {
          parsedStyle.isOverflowing = true;
          break;
        }
        currentWidth = 0;
        lines[currentIndex] = "";
        continue;
      }
      if (currentWidth > 0 && currentWidth + charWidth > maxWidth) {
        if (currentIndex + 1 >= maxLines) {
          parsedStyle.isOverflowing = true;
          if (ellipsisWidth > 0 && ellipsisWidth <= maxWidth) {
            const currentLineLength = lines[currentIndex].length;
            let lastLineWidth = 0;
            let lastLineIndex = currentLineLength;
            for (let i2 = 0; i2 < currentLineLength; i2++) {
              const width = calcWidth(lines[currentIndex][i2]);
              if (lastLineWidth + width + ellipsisWidth > maxWidth) {
                lastLineIndex = i2;
                break;
              }
              lastLineWidth += width;
            }
            lines[currentIndex] = (lines[currentIndex] || "").slice(0, lastLineIndex) + ellipsis;
          }
          break;
        }
        currentIndex++;
        currentWidth = 0;
        lines[currentIndex] = "";
        if (this.isBreakingSpace(char)) {
          continue;
        }
        if (!this.canBreakInLastChar(char)) {
          lines = this.trimToBreakable(lines);
          currentWidth = this.sumTextWidthByCache(
            lines[currentIndex] || "",
            cache
          );
        }
        if (this.shouldBreakByKinsokuShorui(char, nextChar)) {
          lines = this.trimByKinsokuShorui(lines);
          currentWidth += calcWidth(prevChar || "");
        }
      }
      currentWidth += charWidth;
      lines[currentIndex] = (lines[currentIndex] || "") + char;
    }
    return lines.join("\n");
  }
  isBreakingSpace(char) {
    if (typeof char !== "string") {
      return false;
    }
    return TEXT_METRICS.BreakingSpaces.indexOf(char.charCodeAt(0)) >= 0;
  }
  isNewline(char) {
    if (typeof char !== "string") {
      return false;
    }
    return TEXT_METRICS.Newlines.indexOf(char.charCodeAt(0)) >= 0;
  }
  trimToBreakable(prev) {
    const next = [...prev];
    const prevLine = next[next.length - 2];
    const index = this.findBreakableIndex(prevLine);
    if (index === -1 || !prevLine)
      return next;
    const trimmedChar = prevLine.slice(index, index + 1);
    const isTrimmedWithSpace = this.isBreakingSpace(trimmedChar);
    const trimFrom = index + 1;
    const trimTo = index + (isTrimmedWithSpace ? 0 : 1);
    next[next.length - 1] += prevLine.slice(trimFrom, prevLine.length);
    next[next.length - 2] = prevLine.slice(0, trimTo);
    return next;
  }
  canBreakInLastChar(char) {
    if (char && LATIN_REGEX.test(char))
      return false;
    return true;
  }
  sumTextWidthByCache(text, cache) {
    return text.split("").reduce((sum, c) => {
      if (!cache[c])
        throw Error("cannot count the word without cache");
      return sum + cache[c];
    }, 0);
  }
  findBreakableIndex(line) {
    for (let i = line.length - 1; i >= 0; i--) {
      if (!LATIN_REGEX.test(line[i]))
        return i;
    }
    return -1;
  }
  getFromCache(key, letterSpacing, cache, context) {
    let width = cache[key];
    if (typeof width !== "number") {
      const spacing = key.length * letterSpacing;
      width = context.measureText(key).width + spacing;
      cache[key] = width;
    }
    return width;
  }
};

// src/global-runtime.ts
var runtime = {};
var geometryUpdaterFactory = (() => {
  const rectUpdater = new RectUpdater();
  const polylineUpdater = new PolylineUpdater();
  return {
    ["circle" /* CIRCLE */]: new CircleUpdater(),
    ["ellipse" /* ELLIPSE */]: new EllipseUpdater(),
    ["rect" /* RECT */]: rectUpdater,
    ["image" /* IMAGE */]: rectUpdater,
    ["g" /* GROUP */]: rectUpdater,
    ["line" /* LINE */]: new LineUpdater(),
    ["text" /* TEXT */]: new TextUpdater(runtime),
    ["polyline" /* POLYLINE */]: polylineUpdater,
    ["polygon" /* POLYGON */]: polylineUpdater,
    ["path" /* PATH */]: new PathUpdater(),
    ["html" /* HTML */]: null,
    ["mesh" /* MESH */]: null
  };
})();
var CSSPropertySyntaxFactory = (() => {
  const color2 = new CSSPropertyColor();
  const length5 = new CSSPropertyLengthOrPercentage();
  return {
    ["<percentage>" /* PERCENTAGE */]: null,
    ["<number>" /* NUMBER */]: new CSSPropertyNumber(),
    ["<angle>" /* ANGLE */]: new CSSPropertyAngle(),
    ["<defined-path>" /* DEFINED_PATH */]: new CSSPropertyClipPath(),
    ["<paint>" /* PAINT */]: color2,
    ["<color>" /* COLOR */]: color2,
    ["<filter>" /* FILTER */]: new CSSPropertyFilter(),
    ["<length>" /* LENGTH */]: length5,
    ["<length> | <percentage>" /* LENGTH_PERCENTAGE */]: length5,
    ["[<length> | <percentage>]{1,2}" /* LENGTH_PERCENTAGE_12 */]: new CSSPropertyLengthOrPercentage12(),
    ["[<length> | <percentage>]{1,4}" /* LENGTH_PERCENTAGE_14 */]: new CSSPropertyLengthOrPercentage14(),
    ["<coordinate>" /* COORDINATE */]: new CSSPropertyLocalPosition(),
    ["<offset-distance>" /* OFFSET_DISTANCE */]: new CSSPropertyOffsetDistance(),
    ["<opacity-value>" /* OPACITY_VALUE */]: new CSSPropertyOpacity(),
    ["<path>" /* PATH */]: new CSSPropertyPath(),
    ["<list-of-points>" /* LIST_OF_POINTS */]: new CSSPropertyPoints(),
    ["<shadow-blur>" /* SHADOW_BLUR */]: new CSSPropertyShadowBlur(),
    ["<text>" /* TEXT */]: new CSSPropertyText(),
    ["<text-transform>" /* TEXT_TRANSFORM */]: new CSSPropertyTextTransform(),
    ["<transform>" /* TRANSFORM */]: new CSSPropertyTransform(),
    ["<transform-origin>" /* TRANSFORM_ORIGIN */]: new CSSPropertyTransformOrigin(),
    ["<z-index>" /* Z_INDEX */]: new CSSPropertyZIndex(),
    ["<marker>" /* MARKER */]: new CSSPropertyMarker()
  };
})();
var getGlobalThis = () => {
  if (typeof globalThis !== "undefined")
    return globalThis;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  if (typeof global !== "undefined")
    return global;
  return {};
};
runtime.CameraContribution = Camera;
runtime.AnimationTimeline = null;
runtime.EasingFunction = null;
runtime.offscreenCanvasCreator = new OffscreenCanvasCreator();
runtime.nativeHTMLMap = /* @__PURE__ */ new WeakMap();
runtime.sceneGraphSelector = new DefaultSceneGraphSelector();
runtime.sceneGraphService = new DefaultSceneGraphService(runtime);
runtime.textService = new TextService(runtime);
runtime.geometryUpdaterFactory = geometryUpdaterFactory;
runtime.CSSPropertySyntaxFactory = CSSPropertySyntaxFactory;
runtime.styleValueRegistry = new DefaultStyleValueRegistry(runtime);
runtime.layoutRegistry = null;
runtime.globalThis = getGlobalThis();
runtime.enableCSSParsing = true;
runtime.enableDataset = false;
runtime.enableStyleSyntax = true;

// src/dom/Element.ts
var entityCounter = 0;
function resetEntityCounter() {
  entityCounter = 0;
}
var insertedEvent = new MutationEvent(
  "DOMNodeInserted" /* INSERTED */,
  null,
  "",
  "",
  "",
  0,
  "",
  ""
);
var removedEvent = new MutationEvent(
  "removed" /* REMOVED */,
  null,
  "",
  "",
  "",
  0,
  "",
  ""
);
var destroyEvent = new CustomEvent("destroy" /* DESTROY */);
var Element = class extends Node {
  constructor() {
    super(...arguments);
    /**
     * Unique id.
     */
    this.entity = entityCounter++;
    this.renderable = {
      bounds: void 0,
      boundsDirty: true,
      renderBounds: void 0,
      renderBoundsDirty: true,
      dirtyRenderBounds: void 0,
      dirty: false
    };
    this.cullable = {
      strategy: 0 /* Standard */,
      visibilityPlaneMask: -1,
      visible: true,
      enable: true
    };
    this.transformable = {
      dirtyFlag: false,
      localDirtyFlag: false,
      frozen: false,
      localPosition: [0, 0, 0],
      localRotation: [0, 0, 0, 1],
      localScale: [1, 1, 1],
      localTransform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      localSkew: [0, 0],
      position: [0, 0, 0],
      rotation: [0, 0, 0, 1],
      scaling: [1, 1, 1],
      worldTransform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      origin: [0, 0, 0]
    };
    this.sortable = {
      dirty: false,
      sorted: void 0,
      renderOrder: 0,
      dirtyChildren: [],
      dirtyReason: void 0
    };
    this.geometry = {
      contentBounds: void 0,
      renderBounds: void 0
    };
    this.rBushNode = {
      aabb: void 0
    };
    /**
     * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/namespaceURI
     */
    this.namespaceURI = "g";
    this.scrollLeft = 0;
    this.scrollTop = 0;
    /**
     * We don't support border now
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/clientTop
     */
    this.clientTop = 0;
    this.clientLeft = 0;
    /**
     * is destroyed or not
     */
    this.destroyed = false;
    /**
     * compatible with `style`
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
     */
    this.style = {};
    this.computedStyle = runtime.enableCSSParsing ? {
      anchor: unsetKeywordValue,
      opacity: unsetKeywordValue,
      fillOpacity: unsetKeywordValue,
      strokeOpacity: unsetKeywordValue,
      fill: unsetKeywordValue,
      stroke: unsetKeywordValue,
      transform: unsetKeywordValue,
      transformOrigin: unsetKeywordValue,
      visibility: unsetKeywordValue,
      pointerEvents: unsetKeywordValue,
      lineWidth: unsetKeywordValue,
      lineCap: unsetKeywordValue,
      lineJoin: unsetKeywordValue,
      increasedLineWidthForHitTesting: unsetKeywordValue,
      fontSize: unsetKeywordValue,
      fontFamily: unsetKeywordValue,
      fontStyle: unsetKeywordValue,
      fontWeight: unsetKeywordValue,
      fontVariant: unsetKeywordValue,
      textAlign: unsetKeywordValue,
      textBaseline: unsetKeywordValue,
      textTransform: unsetKeywordValue,
      zIndex: unsetKeywordValue,
      filter: unsetKeywordValue,
      shadowType: unsetKeywordValue
    } : null;
    /**
     * Renderers will use these used values.
     */
    this.parsedStyle = {
      // opacity: '',
      // fillOpacity: '',
      // strokeOpacity: '',
      // transformOrigin: '',
      // visibility: '',
      // pointerEvents: '',
      // lineWidth: '',
      // lineCap: '',
      // lineJoin: '',
      // increasedLineWidthForHitTesting: '',
      // fontSize: '',
      // fontFamily: '',
      // fontStyle: '',
      // fontWeight: '',
      // fontVariant: '',
      // textAlign: '',
      // textBaseline: '',
      // textTransform: '',
    };
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
     */
    this.attributes = {};
  }
  /**
   * used in `getElementsByClassName`
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
   */
  get className() {
    return this.getAttribute("class") || "";
  }
  set className(className) {
    this.setAttribute("class", className);
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
   */
  get classList() {
    return this.className.split(" ").filter((c) => c !== "");
  }
  get tagName() {
    return this.nodeName;
  }
  get children() {
    return this.childNodes;
  }
  get childElementCount() {
    return this.childNodes.length;
  }
  get firstElementChild() {
    return this.firstChild;
  }
  get lastElementChild() {
    return this.lastChild;
  }
  get parentElement() {
    return this.parentNode;
  }
  get nextSibling() {
    if (this.parentNode) {
      const index = this.parentNode.childNodes.indexOf(this);
      return this.parentNode.childNodes[index + 1] || null;
    }
    return null;
  }
  get previousSibling() {
    if (this.parentNode) {
      const index = this.parentNode.childNodes.indexOf(this);
      return this.parentNode.childNodes[index - 1] || null;
    }
    return null;
  }
  cloneNode(deep) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  appendChild(child, index) {
    var _a;
    if (child.destroyed) {
      throw new Error(ERROR_MSG_APPEND_DESTROYED_ELEMENT);
    }
    runtime.sceneGraphService.attach(child, this, index);
    if ((_a = this.ownerDocument) == null ? void 0 : _a.defaultView) {
      this.ownerDocument.defaultView.mountChildren(child);
    }
    insertedEvent.relatedNode = this;
    child.dispatchEvent(insertedEvent);
    return child;
  }
  insertBefore(newChild, refChild) {
    if (!refChild) {
      this.appendChild(newChild);
    } else {
      if (newChild.parentElement) {
        newChild.parentElement.removeChild(newChild);
      }
      const index = this.childNodes.indexOf(refChild);
      if (index === -1) {
        this.appendChild(newChild);
      } else {
        this.appendChild(newChild, index);
      }
    }
    return newChild;
  }
  replaceChild(newChild, oldChild) {
    const index = this.childNodes.indexOf(oldChild);
    this.removeChild(oldChild);
    this.appendChild(newChild, index);
    return oldChild;
  }
  removeChild(child) {
    var _a;
    removedEvent.relatedNode = this;
    child.dispatchEvent(removedEvent);
    if ((_a = child.ownerDocument) == null ? void 0 : _a.defaultView) {
      child.ownerDocument.defaultView.unmountChildren(child);
    }
    runtime.sceneGraphService.detach(child);
    return child;
  }
  /**
   * Remove all children which can be appended to its original parent later again.
   */
  removeChildren() {
    for (let i = this.childNodes.length - 1; i >= 0; i--) {
      const child = this.childNodes[i];
      this.removeChild(child);
    }
  }
  /**
   * Recursively destroy all children which can not be appended to its original parent later again.
   */
  destroyChildren() {
    for (let i = this.childNodes.length - 1; i >= 0; i--) {
      const child = this.childNodes[i];
      if (child.childNodes.length) {
        child.destroyChildren();
      }
      child.destroy();
    }
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
   */
  matches(selector) {
    return runtime.sceneGraphService.matches(selector, this);
  }
  getElementById(id2) {
    return runtime.sceneGraphService.querySelector(
      `#${id2}`,
      this
    );
  }
  getElementsByName(name) {
    return runtime.sceneGraphService.querySelectorAll(
      `[name="${name}"]`,
      this
    );
  }
  getElementsByClassName(className) {
    return runtime.sceneGraphService.querySelectorAll(
      `.${className}`,
      this
    );
  }
  getElementsByTagName(tagName) {
    return runtime.sceneGraphService.querySelectorAll(
      tagName,
      this
    );
  }
  querySelector(selectors) {
    return runtime.sceneGraphService.querySelector(
      selectors,
      this
    );
  }
  querySelectorAll(selectors) {
    return runtime.sceneGraphService.querySelectorAll(
      selectors,
      this
    );
  }
  /**
   * should traverses the element and its parents (heading toward the document root)
   * until it finds a node that matches the specified CSS selector.
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/closest
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#polyfill
   */
  closest(selectors) {
    let el = this;
    do {
      if (runtime.sceneGraphService.matches(selectors, el))
        return el;
      el = el.parentElement;
    } while (el !== null);
    return null;
  }
  /**
   * search in scene group, but should not include itself
   */
  find(filter) {
    let target = null;
    this.forEach((object) => {
      if (object !== this && filter(object)) {
        target = object;
        return true;
      }
      return false;
    });
    return target;
  }
  findAll(filter) {
    const objects = [];
    this.forEach((object) => {
      if (object !== this && filter(object)) {
        objects.push(object);
      }
    });
    return objects;
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/after
   */
  after(...nodes) {
    if (this.parentNode) {
      const index = this.parentNode.childNodes.indexOf(this);
      nodes.forEach(
        (node, i) => {
          var _a;
          return (_a = this.parentNode) == null ? void 0 : _a.appendChild(node, index + i + 1);
        }
      );
    }
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/before
   */
  before(...nodes) {
    if (this.parentNode) {
      const index = this.parentNode.childNodes.indexOf(this);
      const [first, ...rest] = nodes;
      this.parentNode.appendChild(first, index);
      first.after(...rest);
    }
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/replaceWith
   */
  replaceWith(...nodes) {
    this.after(...nodes);
    this.remove();
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/append
   */
  append(...nodes) {
    nodes.forEach((node) => this.appendChild(node));
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/prepend
   */
  prepend(...nodes) {
    nodes.forEach((node, i) => this.appendChild(node, i));
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/replaceChildren
   */
  replaceChildren(...nodes) {
    while (this.childNodes.length && this.firstChild) {
      this.removeChild(this.firstChild);
    }
    this.append(...nodes);
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/remove
   */
  remove() {
    if (this.parentNode) {
      return this.parentNode.removeChild(this);
    }
    return this;
  }
  destroy() {
    this.dispatchEvent(destroyEvent);
    this.remove();
    this.emitter.removeAllListeners();
    this.destroyed = true;
  }
  getGeometryBounds() {
    return runtime.sceneGraphService.getGeometryBounds(this);
  }
  getRenderBounds() {
    return runtime.sceneGraphService.getBounds(this, true);
  }
  /**
   * get bounds in world space, account for children
   */
  getBounds() {
    return runtime.sceneGraphService.getBounds(this);
  }
  /**
   * get bounds in local space, account for children
   */
  getLocalBounds() {
    return runtime.sceneGraphService.getLocalBounds(this);
  }
  /**
   * account for context's bounds in client space,
   * but not accounting for children
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
   */
  getBoundingClientRect() {
    return runtime.sceneGraphService.getBoundingClientRect(this);
  }
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getClientRects
   */
  getClientRects() {
    return [this.getBoundingClientRect()];
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/computedStyleMap
   * eg. circle.computedStyleMap().get('fill');
   */
  computedStyleMap() {
    return new Map(Object.entries(this.computedStyle));
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNames
   */
  getAttributeNames() {
    return Object.keys(this.attributes);
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
   */
  getAttribute(name) {
    if (isSymbol(name)) {
      return runtime.enableCSSParsing ? null : void 0;
    }
    let value = this.attributes[name];
    if (value === void 0) {
      const attributeName = formatAttributeName(name);
      value = this.attributes[attributeName];
      return runtime.enableCSSParsing ? is_nil_default(value) ? null : value : value;
    } else {
      return value;
    }
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute
   */
  hasAttribute(qualifiedName) {
    return this.getAttributeNames().includes(qualifiedName);
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttributes
   */
  hasAttributes() {
    return !!this.getAttributeNames().length;
  }
  /**
   * should use removeAttribute() instead of setting the attribute value to null either directly or using setAttribute(). Many attributes will not behave as expected if you set them to null.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute
   */
  removeAttribute(attributeName) {
    this.setAttribute(attributeName, null);
    delete this.attributes[attributeName];
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
   */
  setAttribute(attributeName, value, force = false) {
    this.attributes[attributeName] = value;
  }
  getAttributeNS(namespace, localName) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  getAttributeNode(qualifiedName) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  getAttributeNodeNS(namespace, localName) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  hasAttributeNS(namespace, localName) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  removeAttributeNS(namespace, localName) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  removeAttributeNode(attr) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  setAttributeNS(namespace, qualifiedName, value) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  setAttributeNode(attr) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  setAttributeNodeNS(attr) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  toggleAttribute(qualifiedName, force) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
};

// src/display-objects/DisplayObject.ts
function isDisplayObject(value) {
  return !!(value == null ? void 0 : value.nodeName);
}
var mutationEvent = new MutationEvent(
  "DOMAttrModified" /* ATTR_MODIFIED */,
  null,
  null,
  null,
  null,
  MutationEvent.MODIFICATION,
  null,
  null
);
var DEFAULT_STYLE_PROPS = {
  anchor: "",
  opacity: "",
  fillOpacity: "",
  strokeOpacity: "",
  fill: "",
  stroke: "",
  transform: "",
  transformOrigin: "",
  visibility: "",
  pointerEvents: "",
  lineWidth: "",
  lineCap: "",
  lineJoin: "",
  increasedLineWidthForHitTesting: "",
  fontSize: "",
  fontFamily: "",
  fontStyle: "",
  fontWeight: "",
  fontVariant: "",
  textAlign: "",
  textBaseline: "",
  textTransform: "",
  zIndex: "",
  filter: "",
  shadowType: ""
};
var DEFAULT_PARSED_STYLE_PROPS = {
  anchor: [0, 0],
  fill: noneColor,
  stroke: noneColor,
  transform: [],
  zIndex: 0,
  filter: [],
  shadowType: "outer",
  miterLimit: 10
};
var DEFAULT_PARSED_STYLE_PROPS_CSS_DISABLED = __spreadProps(__spreadValues({}, DEFAULT_PARSED_STYLE_PROPS), {
  opacity: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  visibility: "visible",
  pointerEvents: "auto",
  lineWidth: 1,
  lineCap: "butt",
  lineJoin: "miter",
  increasedLineWidthForHitTesting: 0,
  fillRule: "nonzero"
  // TODO: transformOrigin
});
var INHERITABLE_BASE_STYLE_PROPS = [
  "opacity",
  "fillOpacity",
  "strokeOpacity",
  "transformOrigin",
  "visibility",
  "pointerEvents",
  "lineWidth",
  "lineCap",
  "lineJoin",
  "increasedLineWidthForHitTesting"
];
var INHERITABLE_STYLE_PROPS = [
  ...INHERITABLE_BASE_STYLE_PROPS,
  "fontSize",
  "fontFamily",
  "fontStyle",
  "fontWeight",
  "fontVariant",
  "textAlign",
  "textBaseline",
  "textTransform"
];
var DATASET_PREFIX = "data-";
var DisplayObject = class extends Element {
  constructor(config) {
    var _a;
    super();
    this.isCustomElement = false;
    this.isMutationObserved = false;
    /**
     * push to active animations after calling `animate()`
     */
    this.activeAnimations = [];
    /**
     * Use `this.style.clipPath` instead.
     * @deprecated
     */
    this.getClip = function() {
      return this.style.clipPath || null;
    };
    this.config = config;
    this.config.interactive = (_a = this.config.capture) != null ? _a : this.config.interactive;
    this.id = this.config.id || "";
    this.name = this.config.name || "";
    if (this.config.className || this.config.class) {
      this.className = this.config.className || this.config.class;
    }
    this.nodeName = this.config.type || "g" /* GROUP */;
    this.config.style = this.config.style || this.config.attrs || {};
    Object.assign(this.config.style, this.config.attrs);
    if (this.config.visible != null) {
      this.config.style.visibility = this.config.visible === false ? "hidden" : "visible";
    }
    if (this.config.interactive != null) {
      this.config.style.pointerEvents = this.config.interactive === false ? "none" : "auto";
    }
    Object.assign(
      this.parsedStyle,
      runtime.enableCSSParsing ? DEFAULT_PARSED_STYLE_PROPS : DEFAULT_PARSED_STYLE_PROPS_CSS_DISABLED,
      this.config.initialParsedStyle
    );
    if (runtime.enableCSSParsing) {
      Object.assign(this.attributes, DEFAULT_STYLE_PROPS);
    }
    this.initAttributes(this.config.style);
    const Proxy2 = runtime.globalThis.Proxy ? runtime.globalThis.Proxy : function() {
    };
    if (runtime.enableDataset) {
      this.dataset = new Proxy2(
        {},
        {
          get: (target, name) => {
            const formattedName = `${DATASET_PREFIX}${kebabize(name)}`;
            if (target[formattedName] !== void 0) {
              return target[formattedName];
            }
            return this.getAttribute(formattedName);
          },
          set: (_2, prop, value) => {
            this.setAttribute(
              `${DATASET_PREFIX}${kebabize(
                prop
              )}`,
              value
            );
            return true;
          }
        }
      );
    }
    if (runtime.enableStyleSyntax) {
      this.style = new Proxy2(
        // @ts-ignore
        {
          // ...this.attributes,
          setProperty: (propertyName, value) => {
            this.setAttribute(propertyName, value);
          },
          getPropertyValue: (propertyName) => {
            return this.getAttribute(propertyName);
          },
          removeProperty: (propertyName) => {
            this.removeAttribute(propertyName);
          },
          item: () => {
            return "";
          }
        },
        {
          get: (target, name) => {
            if (target[name] !== void 0) {
              return target[name];
            }
            return this.getAttribute(name);
          },
          set: (_2, prop, value) => {
            this.setAttribute(prop, value);
            return true;
          }
        }
      );
    }
  }
  destroy() {
    super.destroy();
    this.getAnimations().forEach((animation) => {
      animation.cancel();
    });
  }
  cloneNode(deep, customCloneFunc) {
    const clonedStyle = __spreadValues({}, this.attributes);
    for (const attributeName in clonedStyle) {
      const attribute = clonedStyle[attributeName];
      if (isDisplayObject(attribute) && // share the same clipPath if possible
      attributeName !== "clipPath" && attributeName !== "offsetPath" && attributeName !== "textPath") {
        clonedStyle[attributeName] = attribute.cloneNode(deep);
      }
      if (customCloneFunc) {
        clonedStyle[attributeName] = customCloneFunc(attributeName, attribute);
      }
    }
    const cloned = new this.constructor({
      // copy id & name
      // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode#notes
      id: this.id,
      name: this.name,
      className: this.name,
      interactive: this.interactive,
      style: clonedStyle
    });
    cloned.setLocalTransform(this.getLocalTransform());
    if (deep) {
      this.children.forEach((child) => {
        if (!child.style.isMarker) {
          const clonedChild = child.cloneNode(deep);
          cloned.appendChild(clonedChild);
        }
      });
    }
    return cloned;
  }
  initAttributes(attributes = {}) {
    const renderable = this.renderable;
    const options = {
      forceUpdateGeometry: true
      // usedAttributes:
      //   // only Group / Text should account for text relative props
      //   this.tagName === Shape.GROUP || this.tagName === Shape.TEXT
      //     ? INHERITABLE_STYLE_PROPS
      //     : INHERITABLE_BASE_STYLE_PROPS,
    };
    if (runtime.enableCSSParsing) {
      options.usedAttributes = INHERITABLE_STYLE_PROPS;
    }
    const formattedAttributes = {};
    for (const name in attributes) {
      const attributeName = formatAttributeName(name);
      formattedAttributes[attributeName] = attributes[name];
    }
    runtime.styleValueRegistry.processProperties(
      this,
      formattedAttributes,
      options
    );
    renderable.dirty = true;
  }
  setAttribute(name, value, force = false) {
    const attributeName = formatAttributeName(name);
    if (is_undefined_default(value)) {
      return;
    }
    if (force || value !== this.attributes[attributeName]) {
      this.internalSetAttribute(attributeName, value);
      super.setAttribute(attributeName, value);
    }
  }
  /**
   * called when attributes get changed or initialized
   */
  internalSetAttribute(name, value, parseOptions = {}) {
    const renderable = this.renderable;
    const oldValue = this.attributes[name];
    const oldParsedValue = this.parsedStyle[name];
    runtime.styleValueRegistry.processProperties(
      this,
      {
        [name]: value
      },
      parseOptions
    );
    renderable.dirty = true;
    const newParsedValue = this.parsedStyle[name];
    if (this.isConnected) {
      mutationEvent.relatedNode = this;
      mutationEvent.prevValue = oldValue;
      mutationEvent.newValue = value;
      mutationEvent.attrName = name;
      mutationEvent.prevParsedValue = oldParsedValue;
      mutationEvent.newParsedValue = newParsedValue;
      if (this.isMutationObserved) {
        this.dispatchEvent(mutationEvent);
      } else {
        mutationEvent.target = this;
        this.ownerDocument.defaultView.dispatchEvent(mutationEvent, true);
      }
    }
    if ((this.isCustomElement && this.isConnected || !this.isCustomElement) && this.attributeChangedCallback) {
      this.attributeChangedCallback(
        name,
        oldValue,
        value,
        oldParsedValue,
        newParsedValue
      );
    }
  }
  // #region transformable
  /**
   * returns different values than getBoundingClientRect(), as the latter returns value relative to the viewport
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox
   *
   * FIXME: It is worth noting that getBBox responds to original untransformed values of a drawn object.
   * @see https://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html#getBBox
   */
  getBBox() {
    const aabb = this.getBounds();
    const [left, top] = aabb.getMin();
    const [right, bottom] = aabb.getMax();
    return new Rectangle(left, top, right - left, bottom - top);
  }
  setOrigin(position, y = 0, z = 0) {
    runtime.sceneGraphService.setOrigin(this, createVec3(position, y, z));
    return this;
  }
  getOrigin() {
    return runtime.sceneGraphService.getOrigin(this);
  }
  /**
   * set position in world space
   */
  setPosition(position, y = 0, z = 0) {
    runtime.sceneGraphService.setPosition(this, createVec3(position, y, z));
    return this;
  }
  /**
   * set position in local space
   */
  setLocalPosition(position, y = 0, z = 0) {
    runtime.sceneGraphService.setLocalPosition(
      this,
      createVec3(position, y, z)
    );
    return this;
  }
  /**
   * translate in world space
   */
  translate(position, y = 0, z = 0) {
    runtime.sceneGraphService.translate(this, createVec3(position, y, z));
    return this;
  }
  /**
   * translate in local space
   */
  translateLocal(position, y = 0, z = 0) {
    runtime.sceneGraphService.translateLocal(this, createVec3(position, y, z));
    return this;
  }
  getPosition() {
    return runtime.sceneGraphService.getPosition(this);
  }
  getLocalPosition() {
    return runtime.sceneGraphService.getLocalPosition(this);
  }
  /**
   * compatible with G 3.0
   *
   * scaling in local space
   * scale(10) = scale(10, 10, 10)
   *
   * we can't set scale in world space
   */
  scale(scaling, y, z) {
    return this.scaleLocal(scaling, y, z);
  }
  scaleLocal(scaling, y, z) {
    if (typeof scaling === "number") {
      y = y || scaling;
      z = z || scaling;
      scaling = createVec3(scaling, y, z);
    }
    runtime.sceneGraphService.scaleLocal(this, scaling);
    return this;
  }
  /**
   * set scaling in local space
   */
  setLocalScale(scaling, y, z) {
    if (typeof scaling === "number") {
      y = y || scaling;
      z = z || scaling;
      scaling = createVec3(scaling, y, z);
    }
    runtime.sceneGraphService.setLocalScale(this, scaling);
    return this;
  }
  /**
   * get scaling in local space
   */
  getLocalScale() {
    return runtime.sceneGraphService.getLocalScale(this);
  }
  /**
   * get scaling in world space
   */
  getScale() {
    return runtime.sceneGraphService.getScale(this);
  }
  /**
   * only return degrees of Z axis in world space
   */
  getEulerAngles() {
    const [, , ez] = getEuler(
      vec3_exports.create(),
      runtime.sceneGraphService.getWorldTransform(this)
    );
    return rad2deg(ez);
  }
  /**
   * only return degrees of Z axis in local space
   */
  getLocalEulerAngles() {
    const [, , ez] = getEuler(
      vec3_exports.create(),
      runtime.sceneGraphService.getLocalRotation(this)
    );
    return rad2deg(ez);
  }
  /**
   * set euler angles(degrees) in world space
   */
  setEulerAngles(z) {
    runtime.sceneGraphService.setEulerAngles(this, 0, 0, z);
    return this;
  }
  /**
   * set euler angles(degrees) in local space
   */
  setLocalEulerAngles(z) {
    runtime.sceneGraphService.setLocalEulerAngles(this, 0, 0, z);
    return this;
  }
  rotateLocal(x, y, z) {
    if (is_nil_default(y) && is_nil_default(z)) {
      runtime.sceneGraphService.rotateLocal(this, 0, 0, x);
    } else {
      runtime.sceneGraphService.rotateLocal(this, x, y, z);
    }
    return this;
  }
  rotate(x, y, z) {
    if (is_nil_default(y) && is_nil_default(z)) {
      runtime.sceneGraphService.rotate(this, 0, 0, x);
    } else {
      runtime.sceneGraphService.rotate(this, x, y, z);
    }
    return this;
  }
  setRotation(rotation, y, z, w) {
    runtime.sceneGraphService.setRotation(this, rotation, y, z, w);
    return this;
  }
  setLocalRotation(rotation, y, z, w) {
    runtime.sceneGraphService.setLocalRotation(this, rotation, y, z, w);
    return this;
  }
  setLocalSkew(skew, y) {
    runtime.sceneGraphService.setLocalSkew(this, skew, y);
    return this;
  }
  getRotation() {
    return runtime.sceneGraphService.getRotation(this);
  }
  getLocalRotation() {
    return runtime.sceneGraphService.getLocalRotation(this);
  }
  getLocalSkew() {
    return runtime.sceneGraphService.getLocalSkew(this);
  }
  getLocalTransform() {
    return runtime.sceneGraphService.getLocalTransform(this);
  }
  getWorldTransform() {
    return runtime.sceneGraphService.getWorldTransform(this);
  }
  setLocalTransform(transform) {
    runtime.sceneGraphService.setLocalTransform(this, transform);
    return this;
  }
  resetLocalTransform() {
    runtime.sceneGraphService.resetLocalTransform(this);
  }
  // #endregion transformable
  // #region animatable
  /**
   * returns an array of all Animation objects affecting this element
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getAnimations
   */
  getAnimations() {
    return this.activeAnimations;
  }
  /**
   * create an animation with WAAPI
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/animate
   */
  animate(keyframes, options) {
    var _a;
    const timeline = (_a = this.ownerDocument) == null ? void 0 : _a.timeline;
    if (timeline) {
      return timeline.play(this, keyframes, options);
    }
    return null;
  }
  // #endregion animatable
  // #region visible
  /**
   * shortcut for Used value of `visibility`
   */
  isVisible() {
    var _a;
    return ((_a = this.parsedStyle) == null ? void 0 : _a.visibility) === "visible";
  }
  get interactive() {
    return this.isInteractive();
  }
  set interactive(b) {
    this.style.pointerEvents = b ? "auto" : "none";
  }
  isInteractive() {
    var _a;
    return ((_a = this.parsedStyle) == null ? void 0 : _a.pointerEvents) !== "none";
  }
  isCulled() {
    return !!(this.cullable && this.cullable.enable && !this.cullable.visible);
  }
  /**
   * bring to front in current group
   */
  toFront() {
    if (this.parentNode) {
      this.style.zIndex = Math.max(
        ...this.parentNode.children.map(
          (child) => Number(child.style.zIndex)
        )
      ) + 1;
    }
    return this;
  }
  /**
   * send to back in current group
   */
  toBack() {
    if (this.parentNode) {
      this.style.zIndex = Math.min(
        ...this.parentNode.children.map(
          (child) => Number(child.style.zIndex)
        )
      ) - 1;
    }
    return this;
  }
  // #endregion visible
  // #region deprecated
  /**
   * compatible with G 3.0
   * @alias object.config
   * @deprecated
   */
  getConfig() {
    return this.config;
  }
  attr(...args) {
    const [name, value] = args;
    if (!name) {
      return this.attributes;
    }
    if (is_object_default(name)) {
      Object.keys(name).forEach((key) => {
        this.setAttribute(
          key,
          name[key]
        );
      });
      return this;
    }
    if (args.length === 2) {
      this.setAttribute(name, value);
      return this;
    }
    return this.attributes[name];
  }
  /**
   * return 3x3 matrix in world space
   * @deprecated
   */
  getMatrix(transformMat44) {
    const transform = transformMat44 || this.getWorldTransform();
    const [tx, ty] = mat4_exports.getTranslation(vec3_exports.create(), transform);
    const [sx, sy] = mat4_exports.getScaling(vec3_exports.create(), transform);
    const rotation = mat4_exports.getRotation(quat_exports.create(), transform);
    const [eux, , euz] = getEuler(vec3_exports.create(), rotation);
    return fromRotationTranslationScale2(eux || euz, tx, ty, sx, sy);
  }
  /**
   * return 3x3 matrix in local space
   * @deprecated
   */
  getLocalMatrix() {
    return this.getMatrix(this.getLocalTransform());
  }
  /**
   * set 3x3 matrix in world space
   * @deprecated
   */
  setMatrix(mat) {
    const [tx, ty, scalingX, scalingY, angle3] = decompose(mat);
    this.setEulerAngles(angle3).setPosition(tx, ty).setLocalScale(scalingX, scalingY);
  }
  /**
   * set 3x3 matrix in local space
   * @deprecated
   */
  setLocalMatrix(mat) {
    const [tx, ty, scalingX, scalingY, angle3] = decompose(mat);
    this.setLocalEulerAngles(angle3).setLocalPosition(tx, ty).setLocalScale(scalingX, scalingY);
  }
  /**
   * Use `visibility: visible` instead.
   * @deprecated
   */
  show() {
    if (runtime.enableCSSParsing) {
      this.style.visibility = "visible";
    } else {
      this.forEach((object) => {
        object.style.visibility = "visible";
      });
    }
  }
  /**
   * Use `visibility: hidden` instead.
   * @deprecated
   */
  hide() {
    if (runtime.enableCSSParsing) {
      this.style.visibility = "hidden";
    } else {
      this.forEach((object) => {
        object.style.visibility = "hidden";
      });
    }
  }
  /**
   * Use `childElementCount` instead.
   * @deprecated
   */
  getCount() {
    return this.childElementCount;
  }
  /**
   * Use `parentElement` instead.
   * @deprecated
   */
  getParent() {
    return this.parentElement;
  }
  /**
   * Use `children` instead.
   * @deprecated
   */
  getChildren() {
    return this.children;
  }
  /**
   * Use `firstElementChild` instead.
   * @deprecated
   */
  getFirst() {
    return this.firstElementChild;
  }
  /**
   * Use `lastElementChild` instead.
   * @deprecated
   */
  getLast() {
    return this.lastElementChild;
  }
  /**
   * Use `this.children[index]` instead.
   * @deprecated
   */
  getChildByIndex(index) {
    return this.children[index] || null;
  }
  /**
   * Use `appendChild` instead.
   * @deprecated
   */
  add(child, index) {
    return this.appendChild(child, index);
  }
  /**
   * Use `this.style.clipPath` instead.
   * @deprecated
   */
  setClip(clipPath) {
    this.style.clipPath = clipPath;
  }
  /**
   * @deprecated
   */
  set(name, value) {
    this.config[name] = value;
  }
  /**
   * @deprecated
   */
  get(name) {
    return this.config[name];
  }
  /**
   * Use `setPosition` instead.
   * @deprecated
   */
  moveTo(position, y = 0, z = 0) {
    this.setPosition(position, y, z);
    return this;
  }
  /**
   * Use `setPosition` instead.
   * @deprecated
   */
  move(position, y = 0, z = 0) {
    this.setPosition(position, y, z);
    return this;
  }
  /**
   * Use `this.style.zIndex` instead.
   * @deprecated
   */
  setZIndex(zIndex) {
    this.style.zIndex = zIndex;
    return this;
  }
  // #endregion deprecated
};

// src/css/CSS.ts
var CSS = {
  /**
   * <number>
   * @see https://drafts.csswg.org/css-values-4/#number-value
   */
  number: (n) => {
    return new CSSUnitValue(n);
  },
  /**
   * <percentage>
   * @see https://drafts.csswg.org/css-values-4/#percentage-value
   */
  percent: (n) => {
    return new CSSUnitValue(n, "%");
  },
  /**
   * <length>
   */
  px: (n) => {
    return new CSSUnitValue(n, "px");
  },
  /**
   * <length>
   */
  em: (n) => {
    return new CSSUnitValue(n, "em");
  },
  rem: (n) => {
    return new CSSUnitValue(n, "rem");
  },
  /**
   * <angle>
   */
  deg: (n) => {
    return new CSSUnitValue(n, "deg");
  },
  /**
   * <angle>
   */
  grad: (n) => {
    return new CSSUnitValue(n, "grad");
  },
  /**
   * <angle>
   */
  rad: (n) => {
    return new CSSUnitValue(n, "rad");
  },
  /**
   * <angle>
   */
  turn: (n) => {
    return new CSSUnitValue(n, "turn");
  },
  /**
   * <time>
   */
  s: (n) => {
    return new CSSUnitValue(n, "s");
  },
  /**
   * <time>
   */
  ms: (n) => {
    return new CSSUnitValue(n, "ms");
  },
  /**
   * CSS Properties & Values API
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS_Properties_and_Values_API
   * @see https://drafts.css-houdini.org/css-properties-values-api/#registering-custom-properties
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS/RegisterProperty
   */
  registerProperty: (definition) => {
    const { name, inherits, interpolable, initialValue, syntax } = definition;
    runtime.styleValueRegistry.registerMetadata({
      n: name,
      inh: inherits,
      int: interpolable,
      d: initialValue,
      syntax
    });
  },
  /**
   * CSS Layout API
   * register layout
   *
   * @see https://github.com/w3c/css-houdini-drafts/blob/main/css-layout-api/EXPLAINER.md
   * @see https://developer.mozilla.org/en-US/docs/Web/Guide/Houdini#css_layout_api
   */
  registerLayout: (name, clazz) => {
    runtime.layoutRegistry.registerLayout(name, clazz);
  }
};

// src/display-objects/Circle.ts
var Circle = class extends DisplayObject {
  constructor(_a = {}) {
    var _b = _a, { style } = _b, rest = __objRest(_b, ["style"]);
    super(__spreadValues({
      type: "circle" /* CIRCLE */,
      style: runtime.enableCSSParsing ? __spreadValues({
        cx: "",
        cy: "",
        r: ""
      }, style) : __spreadValues({}, style),
      initialParsedStyle: {
        anchor: [0.5, 0.5],
        transformOrigin: runtime.enableCSSParsing ? null : [PECENTAGE_50, PECENTAGE_50]
      }
    }, rest));
  }
};

// src/display-objects/CustomElement.ts
var CustomElement = class extends DisplayObject {
  // private shadowNodes: DisplayObject[] = [];
  constructor(_a = {}) {
    var _b = _a, {
      style
    } = _b, rest = __objRest(_b, [
      "style"
    ]);
    super(__spreadValues({
      style: runtime.enableCSSParsing ? __spreadValues({
        x: "",
        y: ""
      }, style) : __spreadValues({}, style)
    }, rest));
    // static get observedAttributes(): string[] {
    //   return [];
    // }
    this.isCustomElement = true;
  }
  // private handleMounted = (e: FederatedEvent) => {
  //   if (e.target === this) {
  //     // this.shadowNodes.forEach((node) => {
  //     //   // every child and its children should turn into a shadow node
  //     //   // a shadow node doesn't mean to be unrenderable, it's just unsearchable in scenegraph
  //     //   node.shadow = true;
  //     // });
  //     if (this.connectedCallback) {
  //       this.connectedCallback();
  //     }
  //   }
  // };
  // private handleUnmounted = (e: FederatedEvent) => {
  //   if (e.target === this) {
  //   }
  // };
  // private handleChildInserted = (e: FederatedEvent) => {
  //   (e.target as DisplayObject).forEach((node) => {
  //     // append children like other shapes after mounted
  //     if (!this.isConnected) {
  //       this.shadowNodes.push(node as DisplayObject);
  //     }
  //   });
  // };
  // private handleChildRemoved = (e: FederatedEvent) => {
  //   (e.target as DisplayObject).forEach((node) => {
  //     node.shadow = false;
  //   });
  // };
  // private handleAttributeChanged = <Key extends keyof CustomElementStyleProps>(
  //   e: MutationEvent,
  // ) => {
  //   // only listen itself
  //   // RangeError: Maximum call stack size exceeded
  //   if (e.target !== this) {
  //     return;
  //   }
  //   const { attrName, prevValue, newValue } = e;
  //   if (this.attributeChangedCallback) {
  //     this.attributeChangedCallback(attrName as Key, prevValue, newValue);
  //   }
  // };
};

// src/display-objects/Ellipse.ts
var Ellipse = class extends DisplayObject {
  constructor(_a = {}) {
    var _b = _a, { style } = _b, rest = __objRest(_b, ["style"]);
    super(__spreadValues({
      type: "ellipse" /* ELLIPSE */,
      style: runtime.enableCSSParsing ? __spreadValues({
        cx: "",
        cy: "",
        rx: "",
        ry: ""
      }, style) : __spreadValues({}, style),
      initialParsedStyle: {
        anchor: [0.5, 0.5],
        transformOrigin: runtime.enableCSSParsing ? null : [PECENTAGE_50, PECENTAGE_50]
      }
    }, rest));
  }
};

// src/display-objects/Group.ts
var Group = class extends DisplayObject {
  constructor(_a = {}) {
    var _b = _a, { style } = _b, rest = __objRest(_b, ["style"]);
    super(__spreadValues({
      type: "g" /* GROUP */,
      style: runtime.enableCSSParsing ? __spreadValues({
        x: "",
        y: "",
        width: "",
        height: ""
      }, style) : __spreadValues({}, style)
    }, rest));
  }
};

// src/display-objects/HTML.ts
var HTML = class extends DisplayObject {
  constructor(_a = {}) {
    var _b = _a, { style } = _b, rest = __objRest(_b, ["style"]);
    super(__spreadValues({
      type: "html" /* HTML */,
      style: runtime.enableCSSParsing ? __spreadValues({
        x: "",
        y: "",
        width: "auto",
        height: "auto",
        innerHTML: ""
      }, style) : __spreadValues({}, style)
    }, rest));
    this.cullable.enable = false;
  }
  /**
   * return wrapper HTMLElement
   * * <div> in g-webgl/canvas
   * * <foreignObject> in g-svg
   */
  getDomElement() {
    return this.parsedStyle.$el;
  }
  /**
   * override with $el.getBoundingClientRect
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
   */
  getBoundingClientRect() {
    if (this.parsedStyle.$el) {
      return this.parsedStyle.$el.getBoundingClientRect();
    } else {
      const { x, y, width, height } = this.parsedStyle;
      return new Rectangle(x, y, width, height);
    }
  }
  getClientRects() {
    return [this.getBoundingClientRect()];
  }
  getBounds() {
    var _a, _b;
    const clientRect = this.getBoundingClientRect();
    const canvasRect = (_b = (_a = this.ownerDocument) == null ? void 0 : _a.defaultView) == null ? void 0 : _b.getContextService().getBoundingClientRect();
    const aabb = new AABB();
    const minX = clientRect.left - ((canvasRect == null ? void 0 : canvasRect.left) || 0);
    const minY = clientRect.top - ((canvasRect == null ? void 0 : canvasRect.top) || 0);
    aabb.setMinMax(
      [minX, minY, 0],
      [minX + clientRect.width, minY + clientRect.height, 0]
    );
    return aabb;
  }
  getLocalBounds() {
    if (this.parentNode) {
      const parentInvert = mat4_exports.invert(
        mat4_exports.create(),
        this.parentNode.getWorldTransform()
      );
      const bounds = this.getBounds();
      if (!AABB.isEmpty(bounds)) {
        const localBounds = new AABB();
        localBounds.setFromTransformedAABB(bounds, parentInvert);
        return localBounds;
      }
    }
    return this.getBounds();
  }
};

// src/display-objects/Image.ts
var Image = class extends DisplayObject {
  constructor(_a = {}) {
    var _b = _a, { style } = _b, rest = __objRest(_b, ["style"]);
    super(__spreadValues({
      type: "image" /* IMAGE */,
      style: runtime.enableCSSParsing ? __spreadValues({
        x: "",
        y: "",
        img: "",
        width: "",
        height: ""
      }, style) : __spreadValues({}, style)
    }, rest));
  }
};

// src/display-objects/Line.ts
var Line = class extends DisplayObject {
  constructor(_a = {}) {
    var _b = _a, { style } = _b, rest = __objRest(_b, ["style"]);
    super(__spreadValues({
      type: "line" /* LINE */,
      style: __spreadValues({
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        z1: 0,
        z2: 0,
        isBillboard: false
      }, style)
    }, rest));
    this.markerStartAngle = 0;
    this.markerEndAngle = 0;
    const { markerStart, markerEnd } = this.parsedStyle;
    if (markerStart && isDisplayObject(markerStart)) {
      this.markerStartAngle = markerStart.getLocalEulerAngles();
      this.appendChild(markerStart);
    }
    if (markerEnd && isDisplayObject(markerEnd)) {
      this.markerEndAngle = markerEnd.getLocalEulerAngles();
      this.appendChild(markerEnd);
    }
    this.transformMarker(true);
    this.transformMarker(false);
  }
  attributeChangedCallback(attrName, oldValue, newValue, prevParsedValue, newParsedValue) {
    if (attrName === "x1" || attrName === "y1" || attrName === "x2" || attrName === "y2" || attrName === "markerStartOffset" || attrName === "markerEndOffset") {
      this.transformMarker(true);
      this.transformMarker(false);
    } else if (attrName === "markerStart") {
      if (prevParsedValue && isDisplayObject(prevParsedValue)) {
        this.markerStartAngle = 0;
        prevParsedValue.remove();
      }
      if (newParsedValue && isDisplayObject(newParsedValue)) {
        this.markerStartAngle = newParsedValue.getLocalEulerAngles();
        this.appendChild(newParsedValue);
        this.transformMarker(true);
      }
    } else if (attrName === "markerEnd") {
      if (prevParsedValue && isDisplayObject(prevParsedValue)) {
        this.markerEndAngle = 0;
        prevParsedValue.remove();
      }
      if (newParsedValue && isDisplayObject(newParsedValue)) {
        this.markerEndAngle = newParsedValue.getLocalEulerAngles();
        this.appendChild(newParsedValue);
        this.transformMarker(false);
      }
    }
  }
  transformMarker(isStart) {
    const {
      markerStart,
      markerEnd,
      markerStartOffset,
      markerEndOffset,
      x1,
      x2,
      y1,
      y2,
      defX,
      defY
    } = this.parsedStyle;
    const marker = isStart ? markerStart : markerEnd;
    if (!marker || !isDisplayObject(marker)) {
      return;
    }
    let rad = 0;
    let x;
    let y;
    let ox;
    let oy;
    let offset;
    let originalAngle;
    if (isStart) {
      ox = x1 - defX;
      oy = y1 - defY;
      x = x2 - x1;
      y = y2 - y1;
      offset = markerStartOffset || 0;
      originalAngle = this.markerStartAngle;
    } else {
      ox = x2 - defX;
      oy = y2 - defY;
      x = x1 - x2;
      y = y1 - y2;
      offset = markerEndOffset || 0;
      originalAngle = this.markerEndAngle;
    }
    rad = Math.atan2(y, x);
    marker.setLocalEulerAngles(rad * 180 / Math.PI + originalAngle);
    marker.setLocalPosition(
      ox + Math.cos(rad) * offset,
      oy + Math.sin(rad) * offset
    );
  }
  getPoint(ratio, inWorldSpace = false) {
    const { x1, y1, x2, y2, defX, defY } = this.parsedStyle;
    const { x, y } = pointAt$3(x1, y1, x2, y2, ratio);
    const transformed = vec3_exports.transformMat4(
      vec3_exports.create(),
      vec3_exports.fromValues(x - defX, y - defY, 0),
      inWorldSpace ? this.getWorldTransform() : this.getLocalTransform()
    );
    return new Point(transformed[0], transformed[1]);
  }
  getPointAtLength(distance5, inWorldSpace = false) {
    return this.getPoint(distance5 / this.getTotalLength(), inWorldSpace);
  }
  getTotalLength() {
    const { x1, y1, x2, y2 } = this.parsedStyle;
    return length$4(x1, y1, x2, y2);
  }
};

// src/display-objects/Path.ts
var Path = class extends DisplayObject {
  constructor(_a = {}) {
    var _b = _a, { style } = _b, rest = __objRest(_b, ["style"]);
    super(__spreadValues({
      type: "path" /* PATH */,
      style: runtime.enableCSSParsing ? __spreadValues({
        path: "",
        miterLimit: ""
      }, style) : __spreadValues({}, style),
      initialParsedStyle: runtime.enableCSSParsing ? null : {
        miterLimit: 4,
        path: __spreadValues({}, EMPTY_PARSED_PATH)
      }
    }, rest));
    this.markerStartAngle = 0;
    this.markerEndAngle = 0;
    /**
     * markers placed at the mid
     */
    this.markerMidList = [];
    const { markerStart, markerEnd, markerMid } = this.parsedStyle;
    if (markerStart && isDisplayObject(markerStart)) {
      this.markerStartAngle = markerStart.getLocalEulerAngles();
      this.appendChild(markerStart);
    }
    if (markerMid && isDisplayObject(markerMid)) {
      this.placeMarkerMid(markerMid);
    }
    if (markerEnd && isDisplayObject(markerEnd)) {
      this.markerEndAngle = markerEnd.getLocalEulerAngles();
      this.appendChild(markerEnd);
    }
    this.transformMarker(true);
    this.transformMarker(false);
  }
  attributeChangedCallback(attrName, oldValue, newValue, prevParsedValue, newParsedValue) {
    if (attrName === "path") {
      this.transformMarker(true);
      this.transformMarker(false);
      this.placeMarkerMid(this.parsedStyle.markerMid);
    } else if (attrName === "markerStartOffset" || attrName === "markerEndOffset") {
      this.transformMarker(true);
      this.transformMarker(false);
    } else if (attrName === "markerStart") {
      if (prevParsedValue && isDisplayObject(prevParsedValue)) {
        this.markerStartAngle = 0;
        prevParsedValue.remove();
      }
      if (newParsedValue && isDisplayObject(newParsedValue)) {
        this.markerStartAngle = newParsedValue.getLocalEulerAngles();
        this.appendChild(newParsedValue);
        this.transformMarker(true);
      }
    } else if (attrName === "markerEnd") {
      if (prevParsedValue && isDisplayObject(prevParsedValue)) {
        this.markerEndAngle = 0;
        prevParsedValue.remove();
      }
      if (newParsedValue && isDisplayObject(newParsedValue)) {
        this.markerEndAngle = newParsedValue.getLocalEulerAngles();
        this.appendChild(newParsedValue);
        this.transformMarker(false);
      }
    } else if (attrName === "markerMid") {
      this.placeMarkerMid(newParsedValue);
    }
  }
  transformMarker(isStart) {
    const {
      markerStart,
      markerEnd,
      markerStartOffset,
      markerEndOffset,
      defX,
      defY
    } = this.parsedStyle;
    const marker = isStart ? markerStart : markerEnd;
    if (!marker || !isDisplayObject(marker)) {
      return;
    }
    let rad = 0;
    let x;
    let y;
    let ox;
    let oy;
    let offset;
    let originalAngle;
    if (isStart) {
      const [p1, p2] = this.getStartTangent();
      ox = p2[0] - defX;
      oy = p2[1] - defY;
      x = p1[0] - p2[0];
      y = p1[1] - p2[1];
      offset = markerStartOffset || 0;
      originalAngle = this.markerStartAngle;
    } else {
      const [p1, p2] = this.getEndTangent();
      ox = p2[0] - defX;
      oy = p2[1] - defY;
      x = p1[0] - p2[0];
      y = p1[1] - p2[1];
      offset = markerEndOffset || 0;
      originalAngle = this.markerEndAngle;
    }
    rad = Math.atan2(y, x);
    marker.setLocalEulerAngles(rad * 180 / Math.PI + originalAngle);
    marker.setLocalPosition(
      ox + Math.cos(rad) * offset,
      oy + Math.sin(rad) * offset
    );
  }
  placeMarkerMid(marker) {
    const {
      path: { segments },
      defX,
      defY
    } = this.parsedStyle;
    this.markerMidList.forEach((marker2) => {
      marker2.remove();
    });
    if (marker && isDisplayObject(marker)) {
      for (let i = 1; i < segments.length - 1; i++) {
        const [ox, oy] = segments[i].currentPoint;
        const cloned = i === 1 ? marker : marker.cloneNode(true);
        this.markerMidList.push(cloned);
        this.appendChild(cloned);
        cloned.setLocalPosition(ox - defX, oy - defY);
      }
    }
  }
  /**
   * Returns the total length of the path.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getTotalLength
   */
  getTotalLength() {
    return getOrCalculatePathTotalLength(this);
  }
  /**
   * Returns the point at a given distance along the path.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getPointAtLength
   */
  getPointAtLength(distance5, inWorldSpace = false) {
    const {
      defX,
      defY,
      path: { absolutePath }
    } = this.parsedStyle;
    const { x, y } = getPointAtLength(absolutePath, distance5);
    const transformed = vec3_exports.transformMat4(
      vec3_exports.create(),
      vec3_exports.fromValues(x - defX, y - defY, 0),
      inWorldSpace ? this.getWorldTransform() : this.getLocalTransform()
    );
    return new Point(transformed[0], transformed[1]);
  }
  /**
   * Returns the point at a given ratio of the total length in path.
   */
  getPoint(ratio, inWorldSpace = false) {
    return this.getPointAtLength(
      ratio * getOrCalculatePathTotalLength(this),
      inWorldSpace
    );
  }
  /**
   * Get start tangent vector
   */
  getStartTangent() {
    const segments = this.parsedStyle.path.segments;
    let result = [];
    if (segments.length > 1) {
      const startPoint = segments[0].currentPoint;
      const endPoint = segments[1].currentPoint;
      const tangent = segments[1].startTangent;
      result = [];
      if (tangent) {
        result.push([startPoint[0] - tangent[0], startPoint[1] - tangent[1]]);
        result.push([startPoint[0], startPoint[1]]);
      } else {
        result.push([endPoint[0], endPoint[1]]);
        result.push([startPoint[0], startPoint[1]]);
      }
    }
    return result;
  }
  /**
   * Get end tangent vector
   */
  getEndTangent() {
    const segments = this.parsedStyle.path.segments;
    const length5 = segments.length;
    let result = [];
    if (length5 > 1) {
      const startPoint = segments[length5 - 2].currentPoint;
      const endPoint = segments[length5 - 1].currentPoint;
      const tangent = segments[length5 - 1].endTangent;
      result = [];
      if (tangent) {
        result.push([endPoint[0] - tangent[0], endPoint[1] - tangent[1]]);
        result.push([endPoint[0], endPoint[1]]);
      } else {
        result.push([startPoint[0], startPoint[1]]);
        result.push([endPoint[0], endPoint[1]]);
      }
    }
    return result;
  }
};

// src/display-objects/Polygon.ts
var Polygon = class extends DisplayObject {
  constructor(_a = {}) {
    var _b = _a, { style } = _b, rest = __objRest(_b, ["style"]);
    super(__spreadValues({
      type: "polygon" /* POLYGON */,
      style: runtime.enableCSSParsing ? __spreadValues({
        points: "",
        miterLimit: "",
        isClosed: true
      }, style) : __spreadValues({}, style),
      initialParsedStyle: runtime.enableCSSParsing ? null : {
        points: {
          points: [],
          totalLength: 0,
          segments: []
        },
        miterLimit: 4,
        isClosed: true
      }
    }, rest));
    this.markerStartAngle = 0;
    this.markerEndAngle = 0;
    /**
     * markers placed at the mid
     */
    this.markerMidList = [];
    const { markerStart, markerEnd, markerMid } = this.parsedStyle;
    if (markerStart && isDisplayObject(markerStart)) {
      this.markerStartAngle = markerStart.getLocalEulerAngles();
      this.appendChild(markerStart);
    }
    if (markerMid && isDisplayObject(markerMid)) {
      this.placeMarkerMid(markerMid);
    }
    if (markerEnd && isDisplayObject(markerEnd)) {
      this.markerEndAngle = markerEnd.getLocalEulerAngles();
      this.appendChild(markerEnd);
    }
    this.transformMarker(true);
    this.transformMarker(false);
  }
  attributeChangedCallback(attrName, oldValue, newValue, prevParsedValue, newParsedValue) {
    if (attrName === "points") {
      this.transformMarker(true);
      this.transformMarker(false);
      this.placeMarkerMid(this.parsedStyle.markerMid);
    } else if (attrName === "markerStartOffset" || attrName === "markerEndOffset") {
      this.transformMarker(true);
      this.transformMarker(false);
    } else if (attrName === "markerStart") {
      if (prevParsedValue && isDisplayObject(prevParsedValue)) {
        this.markerStartAngle = 0;
        prevParsedValue.remove();
      }
      if (newParsedValue && isDisplayObject(newParsedValue)) {
        this.markerStartAngle = newParsedValue.getLocalEulerAngles();
        this.appendChild(newParsedValue);
        this.transformMarker(true);
      }
    } else if (attrName === "markerEnd") {
      if (prevParsedValue && isDisplayObject(prevParsedValue)) {
        this.markerEndAngle = 0;
        prevParsedValue.remove();
      }
      if (newParsedValue && isDisplayObject(newParsedValue)) {
        this.markerEndAngle = newParsedValue.getLocalEulerAngles();
        this.appendChild(newParsedValue);
        this.transformMarker(false);
      }
    } else if (attrName === "markerMid") {
      this.placeMarkerMid(newParsedValue);
    }
  }
  transformMarker(isStart) {
    const {
      markerStart,
      markerEnd,
      markerStartOffset,
      markerEndOffset,
      points: P,
      defX,
      defY
    } = this.parsedStyle;
    const { points } = P || {};
    const marker = isStart ? markerStart : markerEnd;
    if (!marker || !isDisplayObject(marker) || !points) {
      return;
    }
    let rad = 0;
    let x;
    let y;
    let ox;
    let oy;
    let offset;
    let originalAngle;
    ox = points[0][0] - defX;
    oy = points[0][1] - defY;
    if (isStart) {
      x = points[1][0] - points[0][0];
      y = points[1][1] - points[0][1];
      offset = markerStartOffset || 0;
      originalAngle = this.markerStartAngle;
    } else {
      const { length: length5 } = points;
      if (!this.parsedStyle.isClosed) {
        ox = points[length5 - 1][0] - defX;
        oy = points[length5 - 1][1] - defY;
        x = points[length5 - 2][0] - points[length5 - 1][0];
        y = points[length5 - 2][1] - points[length5 - 1][1];
      } else {
        x = points[length5 - 1][0] - points[0][0];
        y = points[length5 - 1][1] - points[0][1];
      }
      offset = markerEndOffset || 0;
      originalAngle = this.markerEndAngle;
    }
    rad = Math.atan2(y, x);
    marker.setLocalEulerAngles(rad * 180 / Math.PI + originalAngle);
    marker.setLocalPosition(
      ox + Math.cos(rad) * offset,
      oy + Math.sin(rad) * offset
    );
  }
  placeMarkerMid(marker) {
    const { points: P, defX, defY } = this.parsedStyle;
    const { points } = P || {};
    this.markerMidList.forEach((marker2) => {
      marker2.remove();
    });
    this.markerMidList = [];
    if (marker && isDisplayObject(marker) && points) {
      for (let i = 1; i < (this.parsedStyle.isClosed ? points.length : points.length - 1); i++) {
        const ox = points[i][0] - defX;
        const oy = points[i][1] - defY;
        const cloned = i === 1 ? marker : marker.cloneNode(true);
        this.markerMidList.push(cloned);
        this.appendChild(cloned);
        cloned.setLocalPosition(ox, oy);
      }
    }
  }
};

// src/display-objects/Polyline.ts
var Polyline = class extends Polygon {
  constructor(_a = {}) {
    var _b = _a, {
      style
    } = _b, rest = __objRest(_b, [
      "style"
    ]);
    super(__spreadValues({
      type: "polyline" /* POLYLINE */,
      style: runtime.enableCSSParsing ? __spreadValues({
        points: "",
        miterLimit: "",
        isClosed: false
      }, style) : __spreadValues({}, style),
      initialParsedStyle: runtime.enableCSSParsing ? null : {
        points: {
          points: [],
          totalLength: 0,
          segments: []
        },
        miterLimit: 4,
        isClosed: false
      }
    }, rest));
  }
  getTotalLength() {
    return this.parsedStyle.points.totalLength;
  }
  getPointAtLength(distance5, inWorldSpace = false) {
    return this.getPoint(distance5 / this.getTotalLength(), inWorldSpace);
  }
  getPoint(ratio, inWorldSpace = false) {
    const {
      defX,
      defY,
      points: { points, segments }
    } = this.parsedStyle;
    let subt = 0;
    let index = 0;
    segments.forEach((v, i) => {
      if (ratio >= v[0] && ratio <= v[1]) {
        subt = (ratio - v[0]) / (v[1] - v[0]);
        index = i;
      }
    });
    const { x, y } = pointAt$3(
      points[index][0],
      points[index][1],
      points[index + 1][0],
      points[index + 1][1],
      subt
    );
    const transformed = vec3_exports.transformMat4(
      vec3_exports.create(),
      vec3_exports.fromValues(x - defX, y - defY, 0),
      inWorldSpace ? this.getWorldTransform() : this.getLocalTransform()
    );
    return new Point(transformed[0], transformed[1]);
  }
  getStartTangent() {
    const { points } = this.parsedStyle.points;
    const result = [];
    result.push([points[1][0], points[1][1]]);
    result.push([points[0][0], points[0][1]]);
    return result;
  }
  getEndTangent() {
    const { points } = this.parsedStyle.points;
    const l = points.length - 1;
    const result = [];
    result.push([points[l - 1][0], points[l - 1][1]]);
    result.push([points[l][0], points[l][1]]);
    return result;
  }
};

// src/display-objects/Rect.ts
var Rect = class extends DisplayObject {
  constructor(_a = {}) {
    var _b = _a, { style } = _b, rest = __objRest(_b, ["style"]);
    super(__spreadValues({
      type: "rect" /* RECT */,
      style: runtime.enableCSSParsing ? __spreadValues({
        x: "",
        y: "",
        width: "",
        height: "",
        radius: ""
      }, style) : __spreadValues({}, style)
    }, rest));
  }
};

// src/display-objects/Text.ts
var Text = class extends DisplayObject {
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGTextContentElement#constants
   */
  // LENGTHADJUST_SPACING: number = 1;
  // LENGTHADJUST_SPACINGANDGLYPHS: number = 2;
  // LENGTHADJUST_UNKNOWN: number = 0;
  constructor(_a = {}) {
    var _b = _a, { style } = _b, rest = __objRest(_b, ["style"]);
    super(__spreadValues({
      type: "text" /* TEXT */,
      style: runtime.enableCSSParsing ? __spreadValues({
        x: "",
        y: "",
        text: "",
        fontSize: "",
        fontFamily: "",
        fontStyle: "",
        fontWeight: "",
        fontVariant: "",
        textAlign: "",
        textBaseline: "",
        textTransform: "",
        fill: "black",
        letterSpacing: "",
        lineHeight: "",
        miterLimit: "",
        // whiteSpace: 'pre',
        wordWrap: false,
        wordWrapWidth: 0,
        leading: 0,
        dx: "",
        dy: ""
      }, style) : __spreadValues({
        fill: "black"
      }, style),
      initialParsedStyle: runtime.enableCSSParsing ? {} : {
        x: 0,
        y: 0,
        fontSize: 16,
        fontFamily: "sans-serif",
        fontStyle: "normal",
        fontWeight: "normal",
        fontVariant: "normal",
        lineHeight: 0,
        letterSpacing: 0,
        textBaseline: "alphabetic",
        textAlign: "start",
        wordWrap: false,
        wordWrapWidth: 0,
        leading: 0,
        dx: 0,
        dy: 0
      }
    }, rest));
  }
  // lengthAdjust: SVGAnimatedEnumeration;
  // textLength: SVGAnimatedLength;
  // getCharNumAtPosition(point?: DOMPointInit): number {
  //   throw new Error('Method not implemented.');
  // }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGTextContentElement
   */
  getComputedTextLength() {
    var _a;
    return ((_a = this.parsedStyle.metrics) == null ? void 0 : _a.maxLineWidth) || 0;
  }
  // getEndPositionOfChar(charnum: number): DOMPoint {
  //   throw new Error('Method not implemented.');
  // }
  // getExtentOfChar(charnum: number): DOMRect {
  //   throw new Error('Method not implemented.');
  // }
  // getNumberOfChars(): number {
  //   throw new Error('Method not implemented.');
  // }
  // getRotationOfChar(charnum: number): number {
  //   throw new Error('Method not implemented.');
  // }
  // getStartPositionOfChar(charnum: number): DOMPoint {
  //   throw new Error('Method not implemented.');
  // }
  // getSubStringLength(charnum: number, nchars: number): number {
  //   throw new Error('Method not implemented.');
  // }
  // selectSubString(charnum: number, nchars: number): void {
  //   throw new Error('Method not implemented.');
  // }
  getLineBoundingRects() {
    var _a;
    return ((_a = this.parsedStyle.metrics) == null ? void 0 : _a.lineMetrics) || [];
  }
  isOverflowing() {
    return !!this.parsedStyle.isOverflowing;
  }
};

// src/dom/CustomElementRegistry.ts
var CustomElementRegistry = class {
  constructor() {
    this.registry = {};
    this.define("circle" /* CIRCLE */, Circle);
    this.define("ellipse" /* ELLIPSE */, Ellipse);
    this.define("rect" /* RECT */, Rect);
    this.define("image" /* IMAGE */, Image);
    this.define("line" /* LINE */, Line);
    this.define("g" /* GROUP */, Group);
    this.define("path" /* PATH */, Path);
    this.define("polygon" /* POLYGON */, Polygon);
    this.define("polyline" /* POLYLINE */, Polyline);
    this.define("text" /* TEXT */, Text);
    this.define("html" /* HTML */, HTML);
  }
  define(name, constructor) {
    this.registry[name] = constructor;
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/get
   */
  get(name) {
    return this.registry[name];
  }
};

// src/dom/Document.ts
var Document = class extends Node {
  constructor() {
    super();
    /**
     * only document has defaultView, points to canvas,
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView
     */
    this.defaultView = null;
    this.ownerDocument = null;
    this.nodeName = "document";
    try {
      this.timeline = new runtime.AnimationTimeline(this);
    } catch (e) {
    }
    const initialStyle = {};
    BUILT_IN_PROPERTIES.forEach(({ n, inh, d }) => {
      if (inh && d) {
        initialStyle[n] = isFunction(d) ? d("g" /* GROUP */) : d;
      }
    });
    this.documentElement = new Group({
      id: "g-root",
      style: initialStyle
    });
    this.documentElement.ownerDocument = this;
    this.documentElement.parentNode = this;
    this.childNodes = [this.documentElement];
  }
  get children() {
    return this.childNodes;
  }
  get childElementCount() {
    return this.childNodes.length;
  }
  get firstElementChild() {
    return this.firstChild;
  }
  get lastElementChild() {
    return this.lastChild;
  }
  /**
   * @example const circle = document.createElement('circle', { style: { r: 10 } });
   */
  createElement(tagName, options) {
    if (tagName === "svg") {
      return this.documentElement;
    }
    let clazz = this.defaultView.customElements.get(tagName);
    if (!clazz) {
      console.warn("Unsupported tagName: ", tagName);
      clazz = tagName === "tspan" ? Text : Group;
    }
    const shape = new clazz(options);
    shape.ownerDocument = this;
    return shape;
  }
  createElementNS(namespaceURI, tagName, options) {
    return this.createElement(tagName, options);
  }
  cloneNode(deep) {
    throw new Error(ERROR_MSG_METHOD_NOT_IMPLEMENTED);
  }
  destroy() {
    try {
      this.documentElement.destroyChildren();
      this.timeline.destroy();
    } catch (e) {
    }
  }
  /**
   * Picking 2D graphics with RBush based on BBox, fast but inaccurate.
   */
  elementsFromBBox(minX, minY, maxX, maxY) {
    const rBush = this.defaultView.context.rBushRoot;
    const rBushNodes = rBush.search({ minX, minY, maxX, maxY });
    const hitTestList = [];
    rBushNodes.forEach(({ displayObject }) => {
      const { pointerEvents } = displayObject.parsedStyle;
      const isVisibilityAffected = [
        "auto",
        "visiblepainted",
        "visiblefill",
        "visiblestroke",
        "visible"
      ].includes(pointerEvents);
      if ((!isVisibilityAffected || isVisibilityAffected && displayObject.isVisible()) && !displayObject.isCulled() && displayObject.isInteractive()) {
        hitTestList.push(displayObject);
      }
    });
    hitTestList.sort((a, b) => b.sortable.renderOrder - a.sortable.renderOrder);
    return hitTestList;
  }
  elementFromPointSync(x, y) {
    const { x: viewportX, y: viewportY } = this.defaultView.canvas2Viewport({
      x,
      y
    });
    const { width, height } = this.defaultView.getConfig();
    if (viewportX < 0 || viewportY < 0 || viewportX > width || viewportY > height) {
      return null;
    }
    const { x: clientX, y: clientY } = this.defaultView.viewport2Client({
      x: viewportX,
      y: viewportY
    });
    const { picked } = this.defaultView.getRenderingService().hooks.pickSync.call({
      topmost: true,
      position: {
        x,
        y,
        viewportX,
        viewportY,
        clientX,
        clientY
      },
      picked: []
    });
    return picked && picked[0] || this.documentElement;
  }
  /**
   * Do picking with API instead of triggering interactive events.
   *
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementFromPoint
   */
  elementFromPoint(x, y) {
    return __async(this, null, function* () {
      const { x: viewportX, y: viewportY } = this.defaultView.canvas2Viewport({
        x,
        y
      });
      const { width, height } = this.defaultView.getConfig();
      if (viewportX < 0 || viewportY < 0 || viewportX > width || viewportY > height) {
        return null;
      }
      const { x: clientX, y: clientY } = this.defaultView.viewport2Client({
        x: viewportX,
        y: viewportY
      });
      const { picked } = yield this.defaultView.getRenderingService().hooks.pick.promise({
        topmost: true,
        position: {
          x,
          y,
          viewportX,
          viewportY,
          clientX,
          clientY
        },
        picked: []
      });
      return picked && picked[0] || this.documentElement;
    });
  }
  elementsFromPointSync(x, y) {
    const { x: viewportX, y: viewportY } = this.defaultView.canvas2Viewport({
      x,
      y
    });
    const { width, height } = this.defaultView.getConfig();
    if (viewportX < 0 || viewportY < 0 || viewportX > width || viewportY > height) {
      return [];
    }
    const { x: clientX, y: clientY } = this.defaultView.viewport2Client({
      x: viewportX,
      y: viewportY
    });
    const { picked } = this.defaultView.getRenderingService().hooks.pickSync.call({
      topmost: false,
      position: {
        x,
        y,
        viewportX,
        viewportY,
        clientX,
        clientY
      },
      picked: []
    });
    if (picked[picked.length - 1] !== this.documentElement) {
      picked.push(this.documentElement);
    }
    return picked;
  }
  /**
   * Do picking with API instead of triggering interactive events.
   *
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementsFromPoint
   */
  elementsFromPoint(x, y) {
    return __async(this, null, function* () {
      const { x: viewportX, y: viewportY } = this.defaultView.canvas2Viewport({
        x,
        y
      });
      const { width, height } = this.defaultView.getConfig();
      if (viewportX < 0 || viewportY < 0 || viewportX > width || viewportY > height) {
        return [];
      }
      const { x: clientX, y: clientY } = this.defaultView.viewport2Client({
        x: viewportX,
        y: viewportY
      });
      const { picked } = yield this.defaultView.getRenderingService().hooks.pick.promise({
        topmost: false,
        position: {
          x,
          y,
          viewportX,
          viewportY,
          clientX,
          clientY
        },
        picked: []
      });
      if (picked[picked.length - 1] !== this.documentElement) {
        picked.push(this.documentElement);
      }
      return picked;
    });
  }
  /**
   * eg. Uncaught DOMException: Failed to execute 'appendChild' on 'Node': Only one element on document allowed.
   */
  appendChild(newChild, index) {
    throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
  }
  insertBefore(newChild, refChild) {
    throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
  }
  removeChild(oldChild, destroy) {
    throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
  }
  replaceChild(newChild, oldChild, destroy) {
    throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
  }
  append(...nodes) {
    throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
  }
  prepend(...nodes) {
    throw new Error(ERROR_MSG_USE_DOCUMENT_ELEMENT);
  }
  /**
   * Execute query on documentElement.
   */
  getElementById(id2) {
    return this.documentElement.getElementById(id2);
  }
  getElementsByName(name) {
    return this.documentElement.getElementsByName(name);
  }
  getElementsByTagName(tagName) {
    return this.documentElement.getElementsByTagName(tagName);
  }
  getElementsByClassName(className) {
    return this.documentElement.getElementsByClassName(className);
  }
  querySelector(selectors) {
    return this.documentElement.querySelector(selectors);
  }
  querySelectorAll(selectors) {
    return this.documentElement.querySelectorAll(selectors);
  }
  find(filter) {
    return this.documentElement.find(filter);
  }
  findAll(filter) {
    return this.documentElement.findAll(filter);
  }
};

// src/plugins/CullingPlugin.ts
var _CullingPlugin = class _CullingPlugin {
  constructor(strategies) {
    this.strategies = strategies;
  }
  apply(context) {
    const { camera, renderingService, renderingContext } = context;
    const strategies = this.strategies;
    renderingService.hooks.cull.tap(_CullingPlugin.tag, (object) => {
      if (object) {
        const { cullable } = object;
        if (strategies.length === 0) {
          cullable.visible = renderingContext.unculledEntities.indexOf(object.entity) > -1;
        } else {
          cullable.visible = strategies.every((strategy) => strategy.isVisible(camera, object));
        }
        if (!object.isCulled() && object.isVisible()) {
          return object;
        } else {
          object.dispatchEvent(new CustomEvent("culled" /* CULLED */));
        }
        return null;
      }
      return object;
    });
    renderingService.hooks.afterRender.tap(_CullingPlugin.tag, (object) => {
      object.cullable.visibilityPlaneMask = -1;
    });
  }
};
_CullingPlugin.tag = "Culling";
var CullingPlugin = _CullingPlugin;

// src/plugins/EventPlugin.ts
var _EventPlugin = class _EventPlugin {
  constructor() {
    this.autoPreventDefault = false;
    this.rootPointerEvent = new FederatedPointerEvent(null);
    this.rootWheelEvent = new FederatedWheelEvent(null);
    this.onPointerMove = (nativeEvent) => {
      var _a, _b;
      const canvas = (_b = (_a = this.context.renderingContext.root) == null ? void 0 : _a.ownerDocument) == null ? void 0 : _b.defaultView;
      if (canvas.supportsTouchEvents && nativeEvent.pointerType === "touch")
        return;
      const normalizedEvents = this.normalizeToPointerEvent(nativeEvent, canvas);
      for (const normalizedEvent of normalizedEvents) {
        const event = this.bootstrapEvent(
          this.rootPointerEvent,
          normalizedEvent,
          canvas,
          nativeEvent
        );
        this.context.eventService.mapEvent(event);
      }
      this.setCursor(this.context.eventService.cursor);
    };
    this.onClick = (nativeEvent) => {
      var _a, _b;
      const canvas = (_b = (_a = this.context.renderingContext.root) == null ? void 0 : _a.ownerDocument) == null ? void 0 : _b.defaultView;
      const normalizedEvents = this.normalizeToPointerEvent(nativeEvent, canvas);
      for (const normalizedEvent of normalizedEvents) {
        const event = this.bootstrapEvent(
          this.rootPointerEvent,
          normalizedEvent,
          canvas,
          nativeEvent
        );
        this.context.eventService.mapEvent(event);
      }
      this.setCursor(this.context.eventService.cursor);
    };
  }
  apply(context) {
    this.context = context;
    const { renderingService } = context;
    const canvas = this.context.renderingContext.root.ownerDocument.defaultView;
    this.context.eventService.setPickHandler((position) => {
      const { picked } = this.context.renderingService.hooks.pickSync.call({
        position,
        picked: [],
        topmost: true
        // we only concern the topmost element
      });
      return picked[0] || null;
    });
    renderingService.hooks.pointerWheel.tap(
      _EventPlugin.tag,
      (nativeEvent) => {
        const wheelEvent = this.normalizeWheelEvent(nativeEvent);
        this.context.eventService.mapEvent(wheelEvent);
      }
    );
    renderingService.hooks.pointerDown.tap(
      _EventPlugin.tag,
      (nativeEvent) => {
        if (canvas.supportsTouchEvents && nativeEvent.pointerType === "touch")
          return;
        const events = this.normalizeToPointerEvent(nativeEvent, canvas);
        if (this.autoPreventDefault && events[0].isNormalized) {
          const cancelable = nativeEvent.cancelable || !("cancelable" in nativeEvent);
          if (cancelable) {
            nativeEvent.preventDefault();
          }
        }
        for (const event of events) {
          const federatedEvent = this.bootstrapEvent(
            this.rootPointerEvent,
            event,
            canvas,
            nativeEvent
          );
          this.context.eventService.mapEvent(federatedEvent);
        }
        this.setCursor(this.context.eventService.cursor);
      }
    );
    renderingService.hooks.pointerUp.tap(
      _EventPlugin.tag,
      (nativeEvent) => {
        if (canvas.supportsTouchEvents && nativeEvent.pointerType === "touch")
          return;
        const $element = this.context.contextService.getDomElement();
        let outside = "outside";
        try {
          outside = $element && nativeEvent.target && nativeEvent.target !== $element && $element.contains && !$element.contains(nativeEvent.target) ? "outside" : "";
        } catch (e) {
        }
        const normalizedEvents = this.normalizeToPointerEvent(
          nativeEvent,
          canvas
        );
        for (const normalizedEvent of normalizedEvents) {
          const event = this.bootstrapEvent(
            this.rootPointerEvent,
            normalizedEvent,
            canvas,
            nativeEvent
          );
          event.type += outside;
          this.context.eventService.mapEvent(event);
        }
        this.setCursor(this.context.eventService.cursor);
      }
    );
    renderingService.hooks.pointerMove.tap(_EventPlugin.tag, this.onPointerMove);
    renderingService.hooks.pointerOver.tap(_EventPlugin.tag, this.onPointerMove);
    renderingService.hooks.pointerOut.tap(_EventPlugin.tag, this.onPointerMove);
    renderingService.hooks.click.tap(_EventPlugin.tag, this.onClick);
    renderingService.hooks.pointerCancel.tap(
      _EventPlugin.tag,
      (nativeEvent) => {
        const normalizedEvents = this.normalizeToPointerEvent(
          nativeEvent,
          canvas
        );
        for (const normalizedEvent of normalizedEvents) {
          const event = this.bootstrapEvent(
            this.rootPointerEvent,
            normalizedEvent,
            canvas,
            nativeEvent
          );
          this.context.eventService.mapEvent(event);
        }
        this.setCursor(this.context.eventService.cursor);
      }
    );
  }
  getViewportXY(nativeEvent) {
    let x;
    let y;
    const { offsetX, offsetY, clientX, clientY } = nativeEvent;
    if (this.context.config.supportsCSSTransform && !is_nil_default(offsetX) && !is_nil_default(offsetY)) {
      x = offsetX;
      y = offsetY;
    } else {
      const point = this.context.eventService.client2Viewport(
        new Point(clientX, clientY)
      );
      x = point.x;
      y = point.y;
    }
    return { x, y };
  }
  bootstrapEvent(event, normalizedEvent, view, nativeEvent) {
    event.view = view;
    event.originalEvent = null;
    event.nativeEvent = nativeEvent;
    event.pointerId = normalizedEvent.pointerId;
    event.width = normalizedEvent.width;
    event.height = normalizedEvent.height;
    event.isPrimary = normalizedEvent.isPrimary;
    event.pointerType = normalizedEvent.pointerType;
    event.pressure = normalizedEvent.pressure;
    event.tangentialPressure = normalizedEvent.tangentialPressure;
    event.tiltX = normalizedEvent.tiltX;
    event.tiltY = normalizedEvent.tiltY;
    event.twist = normalizedEvent.twist;
    this.transferMouseData(event, normalizedEvent);
    const { x, y } = this.getViewportXY(normalizedEvent);
    event.viewport.x = x;
    event.viewport.y = y;
    const { x: canvasX, y: canvasY } = this.context.eventService.viewport2Canvas(event.viewport);
    event.canvas.x = canvasX;
    event.canvas.y = canvasY;
    event.global.copyFrom(event.canvas);
    event.offset.copyFrom(event.canvas);
    event.isTrusted = nativeEvent.isTrusted;
    if (event.type === "pointerleave") {
      event.type = "pointerout";
    }
    if (event.type.startsWith("mouse")) {
      event.type = event.type.replace("mouse", "pointer");
    }
    if (event.type.startsWith("touch")) {
      event.type = TOUCH_TO_POINTER[event.type] || event.type;
    }
    return event;
  }
  normalizeWheelEvent(nativeEvent) {
    const event = this.rootWheelEvent;
    this.transferMouseData(event, nativeEvent);
    event.deltaMode = nativeEvent.deltaMode;
    event.deltaX = nativeEvent.deltaX;
    event.deltaY = nativeEvent.deltaY;
    event.deltaZ = nativeEvent.deltaZ;
    const { x, y } = this.getViewportXY(nativeEvent);
    event.viewport.x = x;
    event.viewport.y = y;
    const { x: canvasX, y: canvasY } = this.context.eventService.viewport2Canvas(event.viewport);
    event.canvas.x = canvasX;
    event.canvas.y = canvasY;
    event.global.copyFrom(event.canvas);
    event.offset.copyFrom(event.canvas);
    event.nativeEvent = nativeEvent;
    event.type = nativeEvent.type;
    return event;
  }
  /**
   * Transfers base & mouse event data from the nativeEvent to the federated event.
   */
  transferMouseData(event, nativeEvent) {
    event.isTrusted = nativeEvent.isTrusted;
    event.srcElement = nativeEvent.srcElement;
    event.timeStamp = clock.now();
    event.type = nativeEvent.type;
    event.altKey = nativeEvent.altKey;
    event.metaKey = nativeEvent.metaKey;
    event.shiftKey = nativeEvent.shiftKey;
    event.ctrlKey = nativeEvent.ctrlKey;
    event.button = nativeEvent.button;
    event.buttons = nativeEvent.buttons;
    event.client.x = nativeEvent.clientX;
    event.client.y = nativeEvent.clientY;
    event.movement.x = nativeEvent.movementX;
    event.movement.y = nativeEvent.movementY;
    event.page.x = nativeEvent.pageX;
    event.page.y = nativeEvent.pageY;
    event.screen.x = nativeEvent.screenX;
    event.screen.y = nativeEvent.screenY;
    event.relatedTarget = null;
  }
  setCursor(cursor) {
    this.context.contextService.applyCursorStyle(
      cursor || this.context.config.cursor || "default"
    );
  }
  normalizeToPointerEvent(event, canvas) {
    const normalizedEvents = [];
    if (canvas.isTouchEvent(event)) {
      for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        if (is_undefined_default(touch.button))
          touch.button = 0;
        if (is_undefined_default(touch.buttons))
          touch.buttons = 1;
        if (is_undefined_default(touch.isPrimary)) {
          touch.isPrimary = event.touches.length === 1 && event.type === "touchstart";
        }
        if (is_undefined_default(touch.width))
          touch.width = touch.radiusX || 1;
        if (is_undefined_default(touch.height))
          touch.height = touch.radiusY || 1;
        if (is_undefined_default(touch.tiltX))
          touch.tiltX = 0;
        if (is_undefined_default(touch.tiltY))
          touch.tiltY = 0;
        if (is_undefined_default(touch.pointerType))
          touch.pointerType = "touch";
        if (is_undefined_default(touch.pointerId))
          touch.pointerId = touch.identifier || 0;
        if (is_undefined_default(touch.pressure))
          touch.pressure = touch.force || 0.5;
        if (is_undefined_default(touch.twist))
          touch.twist = 0;
        if (is_undefined_default(touch.tangentialPressure))
          touch.tangentialPressure = 0;
        touch.isNormalized = true;
        touch.type = event.type;
        normalizedEvents.push(touch);
      }
    } else if (canvas.isMouseEvent(event)) {
      const tempEvent = event;
      if (is_undefined_default(tempEvent.isPrimary))
        tempEvent.isPrimary = true;
      if (is_undefined_default(tempEvent.width))
        tempEvent.width = 1;
      if (is_undefined_default(tempEvent.height))
        tempEvent.height = 1;
      if (is_undefined_default(tempEvent.tiltX))
        tempEvent.tiltX = 0;
      if (is_undefined_default(tempEvent.tiltY))
        tempEvent.tiltY = 0;
      if (is_undefined_default(tempEvent.pointerType))
        tempEvent.pointerType = "mouse";
      if (is_undefined_default(tempEvent.pointerId))
        tempEvent.pointerId = MOUSE_POINTER_ID;
      if (is_undefined_default(tempEvent.pressure))
        tempEvent.pressure = 0.5;
      if (is_undefined_default(tempEvent.twist))
        tempEvent.twist = 0;
      if (is_undefined_default(tempEvent.tangentialPressure))
        tempEvent.tangentialPressure = 0;
      tempEvent.isNormalized = true;
      normalizedEvents.push(tempEvent);
    } else {
      normalizedEvents.push(event);
    }
    return normalizedEvents;
  }
};
_EventPlugin.tag = "Event";
var EventPlugin = _EventPlugin;

// src/plugins/FrustumCullingStrategy.ts
var shape2D = [
  "circle" /* CIRCLE */,
  "ellipse" /* ELLIPSE */,
  "image" /* IMAGE */,
  "rect" /* RECT */,
  "line" /* LINE */,
  "polyline" /* POLYLINE */,
  "polygon" /* POLYGON */,
  "text" /* TEXT */,
  "path" /* PATH */,
  "html" /* HTML */
];
var FrustumCullingStrategy = class {
  isVisible(camera, object) {
    var _a, _b;
    const cullable = object.cullable;
    if (!cullable.enable) {
      return true;
    }
    const renderBounds = object.getRenderBounds();
    if (AABB.isEmpty(renderBounds)) {
      return false;
    }
    const frustum2 = camera.getFrustum();
    const parentVisibilityPlaneMask = (_b = (_a = object.parentNode) == null ? void 0 : _a.cullable) == null ? void 0 : _b.visibilityPlaneMask;
    cullable.visibilityPlaneMask = this.computeVisibilityWithPlaneMask(
      object,
      renderBounds,
      parentVisibilityPlaneMask || 2147483647 /* INDETERMINATE */,
      frustum2.planes
    );
    cullable.visible = cullable.visibilityPlaneMask !== 4294967295 /* OUTSIDE */;
    return cullable.visible;
  }
  /**
   *
   * @see「Optimized View Frustum Culling Algorithms for Bounding Boxes」
   * @see https://github.com/antvis/GWebGPUEngine/issues/3
   *
   * * 基础相交测试 the basic intersection test
   * * 标记 masking @see https://cesium.com/blog/2015/08/04/fast-hierarchical-culling/
   * * TODO: 平面一致性测试 the plane-coherency test
   * * TODO: 支持 mesh 指定自身的剔除策略，参考 Babylon.js @see https://doc.babylonjs.com/how_to/optimizing_your_scene#changing-mesh-culling-strategy
   *
   * @param aabb aabb
   * @param parentPlaneMask mask of parent
   * @param planes planes of frustum
   */
  computeVisibilityWithPlaneMask(object, aabb, parentPlaneMask, planes) {
    if (parentPlaneMask === 4294967295 /* OUTSIDE */ || parentPlaneMask === 0 /* INSIDE */) {
      return parentPlaneMask;
    }
    let mask = 0 /* INSIDE */;
    const isShape2D = shape2D.indexOf(object.nodeName) > -1;
    for (let k = 0, len5 = planes.length; k < len5; ++k) {
      const flag = 1 << k;
      if ((parentPlaneMask & flag) === 0) {
        continue;
      }
      if (isShape2D && (k === 4 || k === 5)) {
        continue;
      }
      const { normal, distance: distance5 } = planes[k];
      if (vec3_exports.dot(normal, aabb.getPositiveFarPoint(planes[k])) + distance5 < 0) {
        return 4294967295 /* OUTSIDE */;
      }
      if (vec3_exports.dot(normal, aabb.getNegativeFarPoint(planes[k])) + distance5 < 0) {
        mask |= flag;
      }
    }
    return mask;
  }
};

// src/plugins/PrepareRendererPlugin.ts
var _PrepareRendererPlugin = class _PrepareRendererPlugin {
  constructor() {
    /**
     * sync to RBush later
     */
    this.toSync = /* @__PURE__ */ new Set();
  }
  // private isFirstTimeRendering = true;
  // private syncing = false;
  apply(context) {
    const { renderingService, renderingContext, rBushRoot } = context;
    const canvas = renderingContext.root.ownerDocument.defaultView;
    this.rBush = rBushRoot;
    const handleAttributeChanged = (e) => {
      const object = e.target;
      object.renderable.dirty = true;
      renderingService.dirtify();
    };
    const handleBoundsChanged = (e) => {
      const { affectChildren } = e.detail;
      const object = e.target;
      if (affectChildren) {
        object.forEach((node) => {
          this.toSync.add(node);
        });
      }
      let p = object;
      while (p) {
        if (p.renderable) {
          this.toSync.add(p);
        }
        p = p.parentElement;
      }
      renderingService.dirtify();
    };
    const handleMounted = (e) => {
      const object = e.target;
      if (runtime.enableCSSParsing) {
        runtime.styleValueRegistry.recalc(object);
      }
      runtime.sceneGraphService.dirtifyToRoot(object);
      renderingService.dirtify();
    };
    const handleUnmounted = (e) => {
      const object = e.target;
      const rBushNode = object.rBushNode;
      if (rBushNode.aabb) {
        this.rBush.remove(rBushNode.aabb);
      }
      this.toSync.delete(object);
      runtime.sceneGraphService.dirtifyToRoot(object);
      renderingService.dirtify();
    };
    renderingService.hooks.init.tap(_PrepareRendererPlugin.tag, () => {
      canvas.addEventListener("DOMNodeInsertedIntoDocument" /* MOUNTED */, handleMounted);
      canvas.addEventListener("DOMNodeRemovedFromDocument" /* UNMOUNTED */, handleUnmounted);
      canvas.addEventListener(
        "DOMAttrModified" /* ATTR_MODIFIED */,
        handleAttributeChanged
      );
      canvas.addEventListener("bounds-changed" /* BOUNDS_CHANGED */, handleBoundsChanged);
    });
    renderingService.hooks.destroy.tap(_PrepareRendererPlugin.tag, () => {
      canvas.removeEventListener("DOMNodeInsertedIntoDocument" /* MOUNTED */, handleMounted);
      canvas.removeEventListener("DOMNodeRemovedFromDocument" /* UNMOUNTED */, handleUnmounted);
      canvas.removeEventListener(
        "DOMAttrModified" /* ATTR_MODIFIED */,
        handleAttributeChanged
      );
      canvas.removeEventListener(
        "bounds-changed" /* BOUNDS_CHANGED */,
        handleBoundsChanged
      );
      this.toSync.clear();
    });
    renderingService.hooks.endFrame.tap(_PrepareRendererPlugin.tag, () => {
      this.syncRTree();
    });
  }
  syncRTree() {
    const bulk = [];
    Array.from(this.toSync).filter((object) => object.isConnected).forEach((node) => {
      const rBushNode = node.rBushNode;
      if (rBushNode && rBushNode.aabb) {
        this.rBush.remove(rBushNode.aabb);
      }
      const renderBounds = node.getRenderBounds();
      if (renderBounds) {
        const [minX, minY] = renderBounds.getMin();
        const [maxX, maxY] = renderBounds.getMax();
        if (!rBushNode.aabb) {
          rBushNode.aabb = {};
        }
        rBushNode.aabb.displayObject = node;
        rBushNode.aabb.minX = minX;
        rBushNode.aabb.minY = minY;
        rBushNode.aabb.maxX = maxX;
        rBushNode.aabb.maxY = maxY;
      }
      if (rBushNode.aabb) {
        if (!isNaN(rBushNode.aabb.maxX) && !isNaN(rBushNode.aabb.maxX) && !isNaN(rBushNode.aabb.minX) && !isNaN(rBushNode.aabb.minY)) {
          bulk.push(rBushNode.aabb);
        }
      }
    });
    this.rBush.load(bulk);
    bulk.length = 0;
    this.toSync.clear();
  }
};
_PrepareRendererPlugin.tag = "Prepare";
var PrepareRendererPlugin = _PrepareRendererPlugin;

// src/Canvas.ts
function isCanvas(value) {
  return !!value.document;
}
var CanvasEvent = /* @__PURE__ */ ((CanvasEvent2) => {
  CanvasEvent2["READY"] = "ready";
  CanvasEvent2["BEFORE_RENDER"] = "beforerender";
  CanvasEvent2["RERENDER"] = "rerender";
  CanvasEvent2["AFTER_RENDER"] = "afterrender";
  CanvasEvent2["BEFORE_DESTROY"] = "beforedestroy";
  CanvasEvent2["AFTER_DESTROY"] = "afterdestroy";
  CanvasEvent2["RESIZE"] = "resize";
  CanvasEvent2["DIRTY_RECTANGLE"] = "dirtyrectangle";
  CanvasEvent2["RENDERER_CHANGED"] = "rendererchanged";
  return CanvasEvent2;
})(CanvasEvent || {});
var DEFAULT_CAMERA_Z = 500;
var DEFAULT_CAMERA_NEAR = 0.1;
var DEFAULT_CAMERA_FAR = 1e3;
var mountedEvent = new CustomEvent("DOMNodeInsertedIntoDocument" /* MOUNTED */);
var unmountedEvent = new CustomEvent("DOMNodeRemovedFromDocument" /* UNMOUNTED */);
var beforeRenderEvent = new CustomEvent("beforerender" /* BEFORE_RENDER */);
var rerenderEvent = new CustomEvent("rerender" /* RERENDER */);
var afterRenderEvent = new CustomEvent("afterrender" /* AFTER_RENDER */);
var Canvas = class extends EventTarget {
  constructor(config) {
    super();
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
     */
    this.Element = DisplayObject;
    this.inited = false;
    this.context = {};
    this.document = new Document();
    this.document.defaultView = this;
    this.customElements = new CustomElementRegistry();
    const {
      container,
      canvas,
      offscreenCanvas,
      width,
      height,
      devicePixelRatio,
      renderer,
      background,
      cursor,
      document: document2,
      requestAnimationFrame,
      cancelAnimationFrame: cancelAnimationFrame2,
      createImage,
      supportsPointerEvents,
      supportsTouchEvents,
      supportsCSSTransform,
      supportsMutipleCanvasesInOneContainer,
      useNativeClickEvent,
      alwaysTriggerPointerEventOnCanvas,
      isTouchEvent,
      isMouseEvent
    } = config;
    if (!supportsMutipleCanvasesInOneContainer) {
      cleanExistedCanvas(container, this);
    }
    let canvasWidth = width;
    let canvasHeight = height;
    let dpr = devicePixelRatio;
    if (canvas) {
      dpr = devicePixelRatio || isBrowser && window.devicePixelRatio || 1;
      dpr = dpr >= 1 ? Math.ceil(dpr) : 1;
      canvasWidth = width || getWidth(canvas) || canvas.width / dpr;
      canvasHeight = height || getHeight(canvas) || canvas.height / dpr;
    }
    if (offscreenCanvas) {
      runtime.offscreenCanvas = offscreenCanvas;
    }
    this.devicePixelRatio = dpr;
    this.requestAnimationFrame = requestAnimationFrame != null ? requestAnimationFrame : raf.bind(runtime.globalThis);
    this.cancelAnimationFrame = cancelAnimationFrame2 != null ? cancelAnimationFrame2 : caf.bind(runtime.globalThis);
    this.supportsTouchEvents = supportsTouchEvents != null ? supportsTouchEvents : "ontouchstart" in runtime.globalThis;
    this.supportsPointerEvents = supportsPointerEvents != null ? supportsPointerEvents : !!runtime.globalThis.PointerEvent;
    this.isTouchEvent = isTouchEvent != null ? isTouchEvent : (event) => this.supportsTouchEvents && event instanceof runtime.globalThis.TouchEvent;
    this.isMouseEvent = isMouseEvent != null ? isMouseEvent : (event) => !runtime.globalThis.MouseEvent || event instanceof runtime.globalThis.MouseEvent && (!this.supportsPointerEvents || !(event instanceof runtime.globalThis.PointerEvent));
    this.initRenderingContext({
      container,
      canvas,
      width: canvasWidth,
      height: canvasHeight,
      renderer,
      offscreenCanvas,
      devicePixelRatio: dpr,
      cursor: cursor || "default",
      background: background || "transparent",
      createImage,
      document: document2,
      supportsCSSTransform,
      useNativeClickEvent,
      alwaysTriggerPointerEventOnCanvas
    });
    this.initDefaultCamera(canvasWidth, canvasHeight, renderer.clipSpaceNearZ);
    this.initRenderer(renderer, true);
  }
  initRenderingContext(mergedConfig) {
    this.context.config = mergedConfig;
    this.context.renderingContext = {
      /**
       * the root node in scene graph
       */
      root: this.document.documentElement,
      renderListCurrentFrame: [],
      unculledEntities: [],
      renderReasons: /* @__PURE__ */ new Set(),
      force: false,
      dirty: false
    };
  }
  initDefaultCamera(width, height, clipSpaceNearZ) {
    const camera = new runtime.CameraContribution();
    camera.clipSpaceNearZ = clipSpaceNearZ;
    camera.setType(1 /* EXPLORING */, 0 /* DEFAULT */).setPosition(width / 2, height / 2, DEFAULT_CAMERA_Z).setFocalPoint(width / 2, height / 2, 0).setOrthographic(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      DEFAULT_CAMERA_NEAR,
      DEFAULT_CAMERA_FAR
    );
    camera.canvas = this;
    camera.eventEmitter.on(CameraEvent.UPDATED, () => {
      this.context.renderingContext.renderReasons.add(
        0 /* CAMERA_CHANGED */
      );
    });
    this.context.camera = camera;
  }
  getConfig() {
    return this.context.config;
  }
  /**
   * get the root displayObject in scenegraph
   * @alias this.document.documentElement
   */
  getRoot() {
    return this.document.documentElement;
  }
  /**
   * get the camera of canvas
   */
  getCamera() {
    return this.context.camera;
  }
  getContextService() {
    return this.context.contextService;
  }
  getEventService() {
    return this.context.eventService;
  }
  getRenderingService() {
    return this.context.renderingService;
  }
  getRenderingContext() {
    return this.context.renderingContext;
  }
  getStats() {
    return this.getRenderingService().getStats();
  }
  // /**
  //  * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle
  //  */
  // getComputedStyle(node: DisplayObject) {
  //   return node.computedStyle;
  // }
  get ready() {
    if (!this.readyPromise) {
      this.readyPromise = new Promise((resolve) => {
        this.resolveReadyPromise = () => {
          resolve(this);
        };
      });
      if (this.inited) {
        this.resolveReadyPromise();
      }
    }
    return this.readyPromise;
  }
  /**
   * `cleanUp` means clean all the internal services of Canvas which happens when calling `canvas.destroy()`.
   */
  destroy(cleanUp = true, skipTriggerEvent = false) {
    if (!skipTriggerEvent) {
      this.dispatchEvent(new CustomEvent("beforedestroy" /* BEFORE_DESTROY */));
    }
    if (this.frameId) {
      const cancelRAF = this.getConfig().cancelAnimationFrame || cancelAnimationFrame;
      cancelRAF(this.frameId);
    }
    const root2 = this.getRoot();
    this.unmountChildren(root2);
    if (cleanUp) {
      this.document.destroy();
      this.getEventService().destroy();
    }
    this.getRenderingService().destroy();
    this.getContextService().destroy();
    if (cleanUp && this.context.rBushRoot) {
      this.context.rBushRoot.clear();
      this.context.rBushRoot = null;
      this.context.renderingContext.root = null;
    }
    if (!skipTriggerEvent) {
      this.dispatchEvent(new CustomEvent("afterdestroy" /* AFTER_DESTROY */));
    }
  }
  /**
   * compatible with G 3.0
   * @deprecated
   * @alias resize
   */
  changeSize(width, height) {
    this.resize(width, height);
  }
  resize(width, height) {
    const canvasConfig = this.context.config;
    canvasConfig.width = width;
    canvasConfig.height = height;
    this.getContextService().resize(width, height);
    const camera = this.context.camera;
    const projectionMode = camera.getProjectionMode();
    camera.setPosition(width / 2, height / 2, DEFAULT_CAMERA_Z).setFocalPoint(width / 2, height / 2, 0);
    if (projectionMode === 0 /* ORTHOGRAPHIC */) {
      camera.setOrthographic(
        width / -2,
        width / 2,
        height / 2,
        height / -2,
        camera.getNear(),
        camera.getFar()
      );
    } else {
      camera.setAspect(width / height);
    }
    this.dispatchEvent(new CustomEvent("resize" /* RESIZE */, { width, height }));
  }
  // proxy to document.documentElement
  appendChild(child, index) {
    return this.document.documentElement.appendChild(child, index);
  }
  insertBefore(newChild, refChild) {
    return this.document.documentElement.insertBefore(newChild, refChild);
  }
  removeChild(child) {
    return this.document.documentElement.removeChild(child);
  }
  /**
   * Remove all children which can be appended to its original parent later again.
   */
  removeChildren() {
    this.document.documentElement.removeChildren();
  }
  /**
   * Recursively destroy all children which can not be appended to its original parent later again.
   * But the canvas remains running which means display objects can be appended later.
   */
  destroyChildren() {
    this.document.documentElement.destroyChildren();
  }
  render() {
    this.dispatchEvent(beforeRenderEvent);
    const renderingService = this.getRenderingService();
    renderingService.render(this.getConfig(), () => {
      this.dispatchEvent(rerenderEvent);
    });
    this.dispatchEvent(afterRenderEvent);
  }
  run() {
    const tick = () => {
      this.render();
      this.frameId = this.requestAnimationFrame(tick);
    };
    tick();
  }
  initRenderer(renderer, firstContentfullPaint = false) {
    if (!renderer) {
      throw new Error("Renderer is required.");
    }
    this.inited = false;
    this.readyPromise = void 0;
    this.context.rBushRoot = new import_rbush.default();
    this.context.renderingPlugins = [];
    this.context.renderingPlugins.push(
      new EventPlugin(),
      new PrepareRendererPlugin(),
      // new DirtyCheckPlugin(),
      new CullingPlugin([new FrustumCullingStrategy()])
    );
    this.loadRendererContainerModule(renderer);
    this.context.contextService = new this.context.ContextService(__spreadValues(__spreadValues({}, runtime), this.context));
    this.context.renderingService = new RenderingService(runtime, this.context);
    this.context.eventService = new EventService(runtime, this.context);
    this.context.eventService.init();
    if (this.context.contextService.init) {
      this.context.contextService.init();
      this.initRenderingService(renderer, firstContentfullPaint, true);
    } else {
      this.context.contextService.initAsync().then(() => {
        this.initRenderingService(renderer, firstContentfullPaint);
      });
    }
  }
  initRenderingService(renderer, firstContentfullPaint = false, async = false) {
    this.context.renderingService.init(() => {
      this.inited = true;
      if (firstContentfullPaint) {
        if (async) {
          this.requestAnimationFrame(() => {
            this.dispatchEvent(new CustomEvent("ready" /* READY */));
          });
        } else {
          this.dispatchEvent(new CustomEvent("ready" /* READY */));
        }
        if (this.readyPromise) {
          this.resolveReadyPromise();
        }
      } else {
        this.dispatchEvent(new CustomEvent("rendererchanged" /* RENDERER_CHANGED */));
      }
      if (!firstContentfullPaint) {
        this.getRoot().forEach((node) => {
          const renderable = node.renderable;
          if (renderable) {
            renderable.renderBoundsDirty = true;
            renderable.boundsDirty = true;
            renderable.dirty = true;
          }
        });
      }
      this.mountChildren(this.getRoot());
      if (renderer.getConfig().enableAutoRendering) {
        this.run();
      }
    });
  }
  loadRendererContainerModule(renderer) {
    const plugins = renderer.getPlugins();
    plugins.forEach((plugin) => {
      plugin.context = this.context;
      plugin.init(runtime);
    });
  }
  setRenderer(renderer) {
    const canvasConfig = this.getConfig();
    if (canvasConfig.renderer === renderer) {
      return;
    }
    const oldRenderer = canvasConfig.renderer;
    canvasConfig.renderer = renderer;
    this.destroy(false, true);
    [...oldRenderer == null ? void 0 : oldRenderer.getPlugins()].reverse().forEach((plugin) => {
      plugin.destroy(runtime);
    });
    this.initRenderer(renderer);
  }
  setCursor(cursor) {
    const canvasConfig = this.getConfig();
    canvasConfig.cursor = cursor;
    this.getContextService().applyCursorStyle(cursor);
  }
  unmountChildren(parent) {
    parent.childNodes.forEach((child) => {
      this.unmountChildren(child);
    });
    if (this.inited) {
      if (parent.isMutationObserved) {
        parent.dispatchEvent(unmountedEvent);
      } else {
        unmountedEvent.target = parent;
        this.dispatchEvent(unmountedEvent, true);
      }
      if (parent !== this.document.documentElement) {
        parent.ownerDocument = null;
      }
      parent.isConnected = false;
    }
    if (parent.isCustomElement) {
      if (parent.disconnectedCallback) {
        parent.disconnectedCallback();
      }
    }
  }
  mountChildren(parent) {
    if (this.inited) {
      if (!parent.isConnected) {
        parent.ownerDocument = this.document;
        parent.isConnected = true;
        if (parent.isMutationObserved) {
          parent.dispatchEvent(mountedEvent);
        } else {
          mountedEvent.target = parent;
          this.dispatchEvent(mountedEvent, true);
        }
      }
    } else {
      console.warn(
        "[g]: You are trying to call `canvas.appendChild` before canvas' initialization finished. You can either await `canvas.ready` or listen to `CanvasEvent.READY` manually.",
        "appended child: ",
        parent.nodeName
      );
    }
    parent.childNodes.forEach((child) => {
      this.mountChildren(child);
    });
    if (parent.isCustomElement) {
      if (parent.connectedCallback) {
        parent.connectedCallback();
      }
    }
  }
  client2Viewport(client) {
    return this.getEventService().client2Viewport(client);
  }
  viewport2Client(canvas) {
    return this.getEventService().viewport2Client(canvas);
  }
  viewport2Canvas(viewport) {
    return this.getEventService().viewport2Canvas(viewport);
  }
  canvas2Viewport(canvas) {
    return this.getEventService().canvas2Viewport(canvas);
  }
  /**
   * @deprecated
   * @alias client2Viewport
   */
  getPointByClient(clientX, clientY) {
    return this.client2Viewport({ x: clientX, y: clientY });
  }
  /**
   * @deprecated
   * @alias viewport2Client
   */
  getClientByPoint(x, y) {
    return this.viewport2Client({ x, y });
  }
};
var export_RBush = import_rbush2.default;
export {
  AABB,
  AbstractRenderer,
  AbstractRendererPlugin,
  BUILT_IN_PROPERTIES,
  CSS,
  CSSGradientValue,
  CSSKeywordValue,
  CSSRGB,
  CSSStyleValue,
  CSSUnitValue,
  Camera,
  CameraEvent,
  CameraProjectionMode,
  CameraTrackingMode,
  CameraType,
  Canvas,
  CanvasEvent,
  Circle,
  CircleUpdater,
  ClipSpaceNearZ,
  CustomElement,
  CustomElementRegistry,
  CustomEvent,
  DefaultSceneGraphSelector,
  DefaultSceneGraphService,
  DisplayObject,
  Document,
  ERROR_MSG_METHOD_NOT_IMPLEMENTED,
  Element,
  ElementEvent,
  Ellipse,
  EllipseUpdater,
  EventService,
  EventTarget,
  FederatedEvent,
  FederatedMouseEvent,
  FederatedPointerEvent,
  FederatedWheelEvent,
  Frustum,
  GradientType,
  Group,
  HTML,
  Image,
  Line,
  LineUpdater,
  Mask,
  MutationEvent,
  Node,
  OffscreenCanvasCreator,
  Path,
  PathUpdater,
  Plane,
  Point,
  Polygon,
  Polyline,
  PolylineUpdater,
  PropertySyntax,
  export_RBush as RBush,
  Rect,
  RectUpdater,
  Rectangle,
  RenderReason,
  RenderingService,
  Shape,
  SortReason,
  Strategy,
  Text,
  TextService,
  TextUpdater,
  UnitType,
  computeLinearGradient,
  computeRadialGradient,
  convertToPath,
  createVec3,
  decompose,
  definedProps,
  deg2rad,
  deg2turn,
  findClosestClipPathTarget,
  fromRotationTranslationScale2 as fromRotationTranslationScale,
  getAngle2 as getAngle,
  getEuler,
  getOrCalculatePathTotalLength,
  grad2deg,
  isBrowser,
  isCSSGradientValue,
  isCSSRGB,
  isCanvas,
  isDisplayObject,
  isFederatedEvent,
  isFillOrStrokeAffected,
  isPattern,
  memoize,
  mergeColors,
  parseColor,
  parseLength,
  parsePath,
  parseTransform,
  parsedTransformToMat4,
  propertyMetadataCache,
  rad2deg,
  resetEntityCounter,
  runtime,
  setDOMSize,
  translatePathToString,
  turn2deg
};
