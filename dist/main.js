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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tests.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/tests.js":
/*!**********************!*\
  !*** ./src/tests.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function(){\n\n  /*\n   * TEST OF MAPBOX GL AND WEBSOCKET: one by one\n   * based on https://github.com/mapbox/mapbox-gl-supported/blob/gh-pages/index.js \n   */\n\n  var elTests = document.getElementById(\"tests\");\n  var wsUri = \"wss://echo.websocket.org/\";\n  var wspingCount = 5;\n  var elWsRes = document.createElement(\"span\");\n  var ulWs = document.createElement(\"ul\");\n\n\n  var tests = {\n    browser: !!isBrowser(),\n    array: !!isArraySupported(),\n    function: !!isFunctionSupported(),\n    object: !!isObjectSupported(),\n    json: !!isJSONSupported(),\n    worker: !!isWorkerSupported(),\n    uint8ClampedArray: !!isUint8ClampedArraySupported(),\n    arrayBuffer: !!isArrayBufferSupported(),\n    webgl: !!isWebGLSupported(),\n    websocket: isWebsocketSupported()\n  };\n\n  for (var t in tests) {\n    var el = document.createElement(\"p\");\n    var test = tests[t];\n    if(test instanceof Node){\n      el.innerText = t + \"=\" ;\n      el.appendChild(test);\n    }else{\n      el.innerText = t + \"=\" + test;\n    }\n    elTests.appendChild(el);\n  }\n\n  function isBrowser() {\n    return typeof window !== 'undefined' && typeof document !== 'undefined';\n  }\n\n  function isArraySupported() {\n    return (\n      Array.prototype &&\n      Array.prototype.every &&\n      Array.prototype.filter &&\n      Array.prototype.forEach &&\n      Array.prototype.indexOf &&\n      Array.prototype.lastIndexOf &&\n      Array.prototype.map &&\n      Array.prototype.some &&\n      Array.prototype.reduce &&\n      Array.prototype.reduceRight &&\n      Array.isArray\n    );\n  }\n\n  function isFunctionSupported() {\n    return Function.prototype && Function.prototype.bind;\n  }\n\n  function isObjectSupported() {\n    return (\n      Object.keys &&\n      Object.create &&\n      Object.getPrototypeOf &&\n      Object.getOwnPropertyNames &&\n      Object.isSealed &&\n      Object.isFrozen &&\n      Object.isExtensible &&\n      Object.getOwnPropertyDescriptor &&\n      Object.defineProperty &&\n      Object.defineProperties &&\n      Object.seal &&\n      Object.freeze &&\n      Object.preventExtensions\n    );\n  }\n\n  function isJSONSupported() {\n    return 'JSON' in window && 'parse' in JSON && 'stringify' in JSON;\n  }\n\n  function isWorkerSupported() {\n    if (!('Worker' in window && 'Blob' in window && 'URL' in window)) {\n      return false;\n    }\n\n    var blob = new Blob([''], {\n      type: 'text/javascript'\n    });\n    var workerURL = URL.createObjectURL(blob);\n    var supported;\n    var worker;\n\n    try {\n      worker = new Worker(workerURL);\n      supported = true;\n    } catch (e) {\n      supported = false;\n    }\n\n    if (worker) {\n      worker.terminate();\n    }\n    URL.revokeObjectURL(workerURL);\n\n    return supported;\n  }\n\n  // IE11 only supports `Uint8ClampedArray` as of version\n  // [KB2929437](https://support.microsoft.com/en-us/kb/2929437)\n  function isUint8ClampedArraySupported() {\n    return 'Uint8ClampedArray' in window;\n  }\n\n  // https://github.com/mapbox/mapbox-gl-supported/issues/19\n  function isArrayBufferSupported() {\n    return ArrayBuffer.isView;\n  }\n\n\n  function isWebGLSupported() {\n\n    var canvas = document.createElement('canvas');\n    var attributes = {\n      antialias: false,\n      alpha: true,\n      stencil: true,\n      depth: true\n    };\n    if (canvas.probablySupportsContext) {\n      return (\n        canvas.probablySupportsContext('webgl', attributes) ||\n        canvas.probablySupportsContext('experimental-webgl', attributes)\n      );\n\n    } else if (canvas.supportsContext) {\n      return (\n        canvas.supportsContext('webgl', attributes) ||\n        canvas.supportsContext('experimental-webgl', attributes)\n      );\n\n    } else {\n      return (\n        canvas.getContext('webgl', attributes) ||\n        canvas.getContext('experimental-webgl', attributes)\n      );\n    }\n  }\n  /**\n   * websocket\n   */\n  var wsresult = {\n    open:\"waiting...\",\n    close:\"waiting...\",\n    message:\"sending \" + wspingCount + \" messages; waiting echos...\",\n    error:\"none\"\n  };\n\n  var wserror = false;\n  for( var r in wsresult){\n    var liWs = document.createElement(\"li\");\n    liWs.classList.add(\"ws-\"+r);\n    var spanWs = document.createElement(\"span\");\n    spanWs.id=\"ws-\"+r;\n    spanWs.innerText = wsresult[r];\n    liWs.innerText= r + \"=\";\n    liWs.appendChild(spanWs);\n    ulWs.appendChild(liWs);\n  }\n\n  function isWebsocketSupported(){\n    elWsRes.appendChild(ulWs);\n    testWebsocket();\n    return elWsRes;\n  }\n  function testWebsocket() {\n    try{\n      websocket = new WebSocket(wsUri);\n      websocket.onopen = function(evt) { onOpen(evt); };\n      websocket.onclose = function(evt) { onClose(evt); }; \n      websocket.onmessage = function(evt) { onMessage(evt); };\n      websocket.onerror = function(evt) { onError(evt); }; \n    }\n    catch(err){\n      onError(err); \n    }\n  }\n  function onOpen(evt) {\n    document.getElementById(\"ws-open\").innerText = true;\n\n    // Sending \"ping\" messages\n    var elMsg = document.querySelector('.ws-message');\n    var elUl = document.createElement('ul');\n    elMsg.appendChild(elUl);\n    var pingui = 1;\n    var ping = function() {\n      var message = {\n        id: pingui,\n        content: 'ping item ' + pingui,\n      };\n      var elLi = document.createElement('li');\n      elLi.innerHTML = 'sending message: \"' + message.content + '\" <span class=\"response-item-' + pingui + '\">...<span>';\n      elUl.appendChild(elLi);\n      websocket.send(JSON.stringify(message));\n      if (pingui >= wspingCount) {\n        clearInterval(si);\n      }\n      pingui++;\n    };\n    ping();\n    var si = setInterval(ping, 2000);\n  }\n  function onClose(evt) {\n    document.getElementById(\"ws-close\").innerText = true;\n  } \n  function onMessage(evt) { \n    var message = JSON.parse(evt.data);\n    document.querySelector('.response-item-' + message.id).innerText = '; echoed: \"' + message.content + '\"';\n    if (message.id >= wspingCount) {\n      websocket.close();\n      document.getElementById(\"ws-message\").innerText = 'done';\n    }\n  } \n  function onError(evt) { \n    document.getElementById(\"ws-error\").innerText = true;\n    console.log(evt);\n  } \n\n})();\n\n\n\n//# sourceURL=webpack:///./src/tests.js?");

/***/ })

/******/ });