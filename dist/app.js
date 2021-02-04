/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ \"./router.js\");\n\n\nlet username\n\n;(0,_router__WEBPACK_IMPORTED_MODULE_0__.route)(\"/\", \"login\", function () {\n\tthis.where = \"here\"\n\tthis.$on(\".auth-form\", \"submit\", e => {\n\t\te.preventDefault()\n\t\tconst usernameInput = document.querySelector(\".auth-username\")\n\t\tconst passwordInput = document.querySelector(\".auth-password\")\n\t\tconst warning = document.querySelector(\".warning\")\n\t\tif (usernameInput.value && passwordInput.value) {\n\t\t\tfetch(\"https://zwzt-zadanie.netlify.app/api/login\", {\n\t\t\t\tmethod: \"POST\",\n\t\t\t\theaders: {\n\t\t\t\t\t\"Content-Type\": \"application/json\",\n\t\t\t\t},\n\t\t\t\tbody: JSON.stringify({ username: usernameInput.value, password: passwordInput.value }),\n\t\t\t})\n\t\t\t\t.then(response => response.json())\n\t\t\t\t.then(data => {\n\t\t\t\t\tconsole.log(data)\n\t\t\t\t\tif (data.error) {\n\t\t\t\t\t\twarning.textContent = data.message\n\t\t\t\t\t\twarning.style.visibility = \"visible\"\n\t\t\t\t\t} else {\n\t\t\t\t\t\twarning.textContent = \".\"\n\t\t\t\t\t\twarning.style.visibility = \"hidden\"\n\t\t\t\t\t\tusername = usernameInput.value\n\t\t\t\t\t\twindow.location.href = \"#/success\"\n\t\t\t\t\t}\n\t\t\t\t})\n\t\t} else {\n\t\t\twarning.textContent = \"Please fill username and password fields\"\n\t\t\twarning.style.visibility = \"visible\"\n\t\t}\n\t})\n})\n\n;(0,_router__WEBPACK_IMPORTED_MODULE_0__.route)(\"/success\", \"success\", function () {\n\tthis.title = username ? `Welcome, ${username}!` : \"Welcome!\"\n\tthis.$on(\".home-btn\", \"click\", () => (window.location.href = \"#\"))\n})\n\n;(0,_router__WEBPACK_IMPORTED_MODULE_0__.route)(\"*\", \"404\", function () {\n\tthis.$on(\".home-btn\", \"click\", () => (window.location.href = \"#\"))\n})\n\n\n//# sourceURL=webpack://zadanie/./app.js?");

/***/ }),

/***/ "./engine.js":
/*!*******************!*\
  !*** ./engine.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"engine\": () => /* binding */ engine\n/* harmony export */ });\n// Simple JavaScript Templating\n// John Resig - https://johnresig.com/ - MIT Licensed\nconst cache = {};\n\nconst engine = (str, data) => {\n  // Figure out if we're getting a template, or if we need to\n  // load the template - and be sure to cache the result.\n  const fn = !/\\W/.test(str) ? cache[str] = cache[str] || engine(document.getElementById(str).innerHTML) :\n    // Generate a reusable function that will serve as a template\n    // generator (and which will be cached).\n    new Function(\"obj\",\n      \"var p=[],print=function(){p.push.apply(p,arguments);};\" +             \n      // Introduce the data as local variables using with(){}\n      \"with(obj){p.push('\" +\n      // Convert the template into pure JavaScript\n      str\n        .replace(/[\\r\\t\\n]/g, \" \")\n        .split(\"<%\").join(\"\\t\")\n        .replace(/((^|%>)[^\\t]*)'/g, \"$1\\r\")\n        .replace(/\\t=(.*?)%>/g, \"',$1,'\")\n        .split(\"\\t\").join(\"');\")\n        .split(\"%>\").join(\"p.push('\")\n        .split(\"\\r\").join(\"\\\\'\")\n    + \"');}return p.join('');\");\n   \n  // Provide some basic currying to the user\n  return data ? fn( data ) : fn;\n};\n\n\n//# sourceURL=webpack://zadanie/./engine.js?");

/***/ }),

/***/ "./router.js":
/*!*******************!*\
  !*** ./router.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"route\": () => /* binding */ route\n/* harmony export */ });\n/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ \"./engine.js\");\n// JavaScript router in 20 lines\n// Joakim Carlstein - https://joakim.beng.se/\n\nlet el = null;\nlet events = [];\nconst routes = {};\n\nconst route = (path, templateId, controller) => {\n  const listeners = [];\n  controller.prototype.$on = (selector, evt, handler) => events.push([selector, evt, handler]);\n  controller.prototype.$refresh = () => listeners.forEach(fn => fn());\n  routes[path] = {\n    templateId: templateId,\n    controller: controller,\n    onRefresh: listeners.push.bind(listeners)\n  };\n};\n\nconst forEachEvent = fnName => {\n  for (let i = 0; i < events.length; i++) {\n    const els = el.querySelectorAll(events[i][0]);\n    for (let j = 0; j < els.length; j++) {\n      els[j][fnName].apply(els[j], events[i].slice(1));\n    }\n  }\n};\n\nconst router = () => {\n  // Lazy load view element:\n  el = el || document.getElementById('app');\n  // Remove current event listeners:\n  forEachEvent('removeEventListener');\n  // Clear events, to prepare for next render:\n  events = [];\n  // Current route url (getting rid of '#' in hash as well):\n  const url = location.hash.slice(1) || '/';\n  // Get route by url or fallback if it does not exist:\n  const route = routes[url] || routes['*'];\n  if (route && route.controller) {\n    const ctrl = new route.controller();\n    // Listen on route refreshes:\n    route.onRefresh(() => {\n      forEachEvent('removeEventListener');\n      // Render route template with John Resig's template engine:\n      el.innerHTML = (0,_engine__WEBPACK_IMPORTED_MODULE_0__.engine)(route.templateId, ctrl);\n      forEachEvent('addEventListener');\n    });\n    // Trigger the first refresh:\n    ctrl.$refresh();\n  }\n};\n\nwindow.addEventListener('hashchange', router);\nwindow.addEventListener('load', router);\n\n//# sourceURL=webpack://zadanie/./router.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;