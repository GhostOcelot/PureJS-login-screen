/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "./router.js");


let username

;(0,_router__WEBPACK_IMPORTED_MODULE_0__.route)("/", "login", function () {
	this.where = "here"
	this.$on(".auth-form", "submit", e => {
		e.preventDefault()
		const usernameInput = document.querySelector(".auth-username")
		const passwordInput = document.querySelector(".auth-password")
		const warning = document.querySelector(".warning")
		if (usernameInput.value && passwordInput.value) {
			fetch("https://zwzt-zadanie.netlify.app/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value }),
			})
				.then(response => response.json())
				.then(data => {
					console.log(data)
					if (data.error) {
						warning.textContent = data.message
						warning.style.visibility = "visible"
					} else {
						warning.textContent = "."
						warning.style.visibility = "hidden"
						username = usernameInput.value
						window.location.href = "#/success"
					}
				})
		} else {
			warning.textContent = "Please fill username and password fields"
			warning.style.visibility = "visible"
		}
	})
})

;(0,_router__WEBPACK_IMPORTED_MODULE_0__.route)("/success", "success", function () {
	this.title = username ? `Welcome, ${username}!` : "Welcome!"
	this.$on(".home-btn", "click", () => (window.location.href = "#"))
})

;(0,_router__WEBPACK_IMPORTED_MODULE_0__.route)("*", "404", function () {
	this.$on(".home-btn", "click", () => (window.location.href = "#"))
})


/***/ }),

/***/ "./engine.js":
/*!*******************!*\
  !*** ./engine.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "engine": () => /* binding */ engine
/* harmony export */ });
// Simple JavaScript Templating
// John Resig - https://johnresig.com/ - MIT Licensed
const cache = {};

const engine = (str, data) => {
  // Figure out if we're getting a template, or if we need to
  // load the template - and be sure to cache the result.
  const fn = !/\W/.test(str) ? cache[str] = cache[str] || engine(document.getElementById(str).innerHTML) :
    // Generate a reusable function that will serve as a template
    // generator (and which will be cached).
    new Function("obj",
      "var p=[],print=function(){p.push.apply(p,arguments);};" +             
      // Introduce the data as local variables using with(){}
      "with(obj){p.push('" +
      // Convert the template into pure JavaScript
      str
        .replace(/[\r\t\n]/g, " ")
        .split("<%").join("\t")
        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
        .replace(/\t=(.*?)%>/g, "',$1,'")
        .split("\t").join("');")
        .split("%>").join("p.push('")
        .split("\r").join("\\'")
    + "');}return p.join('');");
   
  // Provide some basic currying to the user
  return data ? fn( data ) : fn;
};


/***/ }),

/***/ "./router.js":
/*!*******************!*\
  !*** ./router.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "route": () => /* binding */ route
/* harmony export */ });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ "./engine.js");
// JavaScript router in 20 lines
// Joakim Carlstein - https://joakim.beng.se/

let el = null;
let events = [];
const routes = {};

const route = (path, templateId, controller) => {
  const listeners = [];
  controller.prototype.$on = (selector, evt, handler) => events.push([selector, evt, handler]);
  controller.prototype.$refresh = () => listeners.forEach(fn => fn());
  routes[path] = {
    templateId: templateId,
    controller: controller,
    onRefresh: listeners.push.bind(listeners)
  };
};

const forEachEvent = fnName => {
  for (let i = 0; i < events.length; i++) {
    const els = el.querySelectorAll(events[i][0]);
    for (let j = 0; j < els.length; j++) {
      els[j][fnName].apply(els[j], events[i].slice(1));
    }
  }
};

const router = () => {
  // Lazy load view element:
  el = el || document.getElementById('app');
  // Remove current event listeners:
  forEachEvent('removeEventListener');
  // Clear events, to prepare for next render:
  events = [];
  // Current route url (getting rid of '#' in hash as well):
  const url = location.hash.slice(1) || '/';
  // Get route by url or fallback if it does not exist:
  const route = routes[url] || routes['*'];
  if (route && route.controller) {
    const ctrl = new route.controller();
    // Listen on route refreshes:
    route.onRefresh(() => {
      forEachEvent('removeEventListener');
      // Render route template with John Resig's template engine:
      el.innerHTML = (0,_engine__WEBPACK_IMPORTED_MODULE_0__.engine)(route.templateId, ctrl);
      forEachEvent('addEventListener');
    });
    // Trigger the first refresh:
    ctrl.$refresh();
  }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96YWRhbmllLy4vYXBwLmpzIiwid2VicGFjazovL3phZGFuaWUvLi9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vemFkYW5pZS8uL3JvdXRlci5qcyIsIndlYnBhY2s6Ly96YWRhbmllL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3phZGFuaWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3phZGFuaWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly96YWRhbmllL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vemFkYW5pZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQWdDOztBQUVoQzs7QUFFQSwrQ0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsMEJBQTBCLCtEQUErRDtBQUN6RixJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDOztBQUVELCtDQUFLO0FBQ0wscUNBQXFDLFNBQVM7QUFDOUM7QUFDQSxDQUFDOztBQUVELCtDQUFLO0FBQ0w7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM5Q0Q7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLDRCQUE0QjtBQUM3RDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBLFdBQVcsa0JBQWtCOztBQUU3QjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNrQztBQUNsQztBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0EsbUJBQW1CLGdCQUFnQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLCtDQUFNO0FBQzNCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7OztVQ3JEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcm91dGUgfSBmcm9tIFwiLi9yb3V0ZXJcIlxuXG5sZXQgdXNlcm5hbWVcblxucm91dGUoXCIvXCIsIFwibG9naW5cIiwgZnVuY3Rpb24gKCkge1xuXHR0aGlzLndoZXJlID0gXCJoZXJlXCJcblx0dGhpcy4kb24oXCIuYXV0aC1mb3JtXCIsIFwic3VibWl0XCIsIGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdGNvbnN0IHVzZXJuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF1dGgtdXNlcm5hbWVcIilcblx0XHRjb25zdCBwYXNzd29yZElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdXRoLXBhc3N3b3JkXCIpXG5cdFx0Y29uc3Qgd2FybmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2FybmluZ1wiKVxuXHRcdGlmICh1c2VybmFtZUlucHV0LnZhbHVlICYmIHBhc3N3b3JkSW5wdXQudmFsdWUpIHtcblx0XHRcdGZldGNoKFwiaHR0cHM6Ly96d3p0LXphZGFuaWUubmV0bGlmeS5hcHAvYXBpL2xvZ2luXCIsIHtcblx0XHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7IHVzZXJuYW1lOiB1c2VybmFtZUlucHV0LnZhbHVlLCBwYXNzd29yZDogcGFzc3dvcmRJbnB1dC52YWx1ZSB9KSxcblx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHRcdFx0LnRoZW4oZGF0YSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSlcblx0XHRcdFx0XHRpZiAoZGF0YS5lcnJvcikge1xuXHRcdFx0XHRcdFx0d2FybmluZy50ZXh0Q29udGVudCA9IGRhdGEubWVzc2FnZVxuXHRcdFx0XHRcdFx0d2FybmluZy5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCJcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0d2FybmluZy50ZXh0Q29udGVudCA9IFwiLlwiXG5cdFx0XHRcdFx0XHR3YXJuaW5nLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiXG5cdFx0XHRcdFx0XHR1c2VybmFtZSA9IHVzZXJuYW1lSW5wdXQudmFsdWVcblx0XHRcdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIjL3N1Y2Nlc3NcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2FybmluZy50ZXh0Q29udGVudCA9IFwiUGxlYXNlIGZpbGwgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIGZpZWxkc1wiXG5cdFx0XHR3YXJuaW5nLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIlxuXHRcdH1cblx0fSlcbn0pXG5cbnJvdXRlKFwiL3N1Y2Nlc3NcIiwgXCJzdWNjZXNzXCIsIGZ1bmN0aW9uICgpIHtcblx0dGhpcy50aXRsZSA9IHVzZXJuYW1lID8gYFdlbGNvbWUsICR7dXNlcm5hbWV9IWAgOiBcIldlbGNvbWUhXCJcblx0dGhpcy4kb24oXCIuaG9tZS1idG5cIiwgXCJjbGlja1wiLCAoKSA9PiAod2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiNcIikpXG59KVxuXG5yb3V0ZShcIipcIiwgXCI0MDRcIiwgZnVuY3Rpb24gKCkge1xuXHR0aGlzLiRvbihcIi5ob21lLWJ0blwiLCBcImNsaWNrXCIsICgpID0+ICh3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiI1wiKSlcbn0pXG4iLCIvLyBTaW1wbGUgSmF2YVNjcmlwdCBUZW1wbGF0aW5nXG4vLyBKb2huIFJlc2lnIC0gaHR0cHM6Ly9qb2hucmVzaWcuY29tLyAtIE1JVCBMaWNlbnNlZFxuY29uc3QgY2FjaGUgPSB7fTtcblxuZXhwb3J0IGNvbnN0IGVuZ2luZSA9IChzdHIsIGRhdGEpID0+IHtcbiAgLy8gRmlndXJlIG91dCBpZiB3ZSdyZSBnZXR0aW5nIGEgdGVtcGxhdGUsIG9yIGlmIHdlIG5lZWQgdG9cbiAgLy8gbG9hZCB0aGUgdGVtcGxhdGUgLSBhbmQgYmUgc3VyZSB0byBjYWNoZSB0aGUgcmVzdWx0LlxuICBjb25zdCBmbiA9ICEvXFxXLy50ZXN0KHN0cikgPyBjYWNoZVtzdHJdID0gY2FjaGVbc3RyXSB8fCBlbmdpbmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3RyKS5pbm5lckhUTUwpIDpcbiAgICAvLyBHZW5lcmF0ZSBhIHJldXNhYmxlIGZ1bmN0aW9uIHRoYXQgd2lsbCBzZXJ2ZSBhcyBhIHRlbXBsYXRlXG4gICAgLy8gZ2VuZXJhdG9yIChhbmQgd2hpY2ggd2lsbCBiZSBjYWNoZWQpLlxuICAgIG5ldyBGdW5jdGlvbihcIm9ialwiLFxuICAgICAgXCJ2YXIgcD1bXSxwcmludD1mdW5jdGlvbigpe3AucHVzaC5hcHBseShwLGFyZ3VtZW50cyk7fTtcIiArICAgICAgICAgICAgIFxuICAgICAgLy8gSW50cm9kdWNlIHRoZSBkYXRhIGFzIGxvY2FsIHZhcmlhYmxlcyB1c2luZyB3aXRoKCl7fVxuICAgICAgXCJ3aXRoKG9iail7cC5wdXNoKCdcIiArXG4gICAgICAvLyBDb252ZXJ0IHRoZSB0ZW1wbGF0ZSBpbnRvIHB1cmUgSmF2YVNjcmlwdFxuICAgICAgc3RyXG4gICAgICAgIC5yZXBsYWNlKC9bXFxyXFx0XFxuXS9nLCBcIiBcIilcbiAgICAgICAgLnNwbGl0KFwiPCVcIikuam9pbihcIlxcdFwiKVxuICAgICAgICAucmVwbGFjZSgvKChefCU+KVteXFx0XSopJy9nLCBcIiQxXFxyXCIpXG4gICAgICAgIC5yZXBsYWNlKC9cXHQ9KC4qPyklPi9nLCBcIicsJDEsJ1wiKVxuICAgICAgICAuc3BsaXQoXCJcXHRcIikuam9pbihcIicpO1wiKVxuICAgICAgICAuc3BsaXQoXCIlPlwiKS5qb2luKFwicC5wdXNoKCdcIilcbiAgICAgICAgLnNwbGl0KFwiXFxyXCIpLmpvaW4oXCJcXFxcJ1wiKVxuICAgICsgXCInKTt9cmV0dXJuIHAuam9pbignJyk7XCIpO1xuICAgXG4gIC8vIFByb3ZpZGUgc29tZSBiYXNpYyBjdXJyeWluZyB0byB0aGUgdXNlclxuICByZXR1cm4gZGF0YSA/IGZuKCBkYXRhICkgOiBmbjtcbn07XG4iLCIvLyBKYXZhU2NyaXB0IHJvdXRlciBpbiAyMCBsaW5lc1xuLy8gSm9ha2ltIENhcmxzdGVpbiAtIGh0dHBzOi8vam9ha2ltLmJlbmcuc2UvXG5pbXBvcnQgeyBlbmdpbmUgfSBmcm9tICcuL2VuZ2luZSc7XG5sZXQgZWwgPSBudWxsO1xubGV0IGV2ZW50cyA9IFtdO1xuY29uc3Qgcm91dGVzID0ge307XG5cbmV4cG9ydCBjb25zdCByb3V0ZSA9IChwYXRoLCB0ZW1wbGF0ZUlkLCBjb250cm9sbGVyKSA9PiB7XG4gIGNvbnN0IGxpc3RlbmVycyA9IFtdO1xuICBjb250cm9sbGVyLnByb3RvdHlwZS4kb24gPSAoc2VsZWN0b3IsIGV2dCwgaGFuZGxlcikgPT4gZXZlbnRzLnB1c2goW3NlbGVjdG9yLCBldnQsIGhhbmRsZXJdKTtcbiAgY29udHJvbGxlci5wcm90b3R5cGUuJHJlZnJlc2ggPSAoKSA9PiBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgcm91dGVzW3BhdGhdID0ge1xuICAgIHRlbXBsYXRlSWQ6IHRlbXBsYXRlSWQsXG4gICAgY29udHJvbGxlcjogY29udHJvbGxlcixcbiAgICBvblJlZnJlc2g6IGxpc3RlbmVycy5wdXNoLmJpbmQobGlzdGVuZXJzKVxuICB9O1xufTtcblxuY29uc3QgZm9yRWFjaEV2ZW50ID0gZm5OYW1lID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBlbHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKGV2ZW50c1tpXVswXSk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGVsc1tqXVtmbk5hbWVdLmFwcGx5KGVsc1tqXSwgZXZlbnRzW2ldLnNsaWNlKDEpKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHJvdXRlciA9ICgpID0+IHtcbiAgLy8gTGF6eSBsb2FkIHZpZXcgZWxlbWVudDpcbiAgZWwgPSBlbCB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG4gIC8vIFJlbW92ZSBjdXJyZW50IGV2ZW50IGxpc3RlbmVyczpcbiAgZm9yRWFjaEV2ZW50KCdyZW1vdmVFdmVudExpc3RlbmVyJyk7XG4gIC8vIENsZWFyIGV2ZW50cywgdG8gcHJlcGFyZSBmb3IgbmV4dCByZW5kZXI6XG4gIGV2ZW50cyA9IFtdO1xuICAvLyBDdXJyZW50IHJvdXRlIHVybCAoZ2V0dGluZyByaWQgb2YgJyMnIGluIGhhc2ggYXMgd2VsbCk6XG4gIGNvbnN0IHVybCA9IGxvY2F0aW9uLmhhc2guc2xpY2UoMSkgfHwgJy8nO1xuICAvLyBHZXQgcm91dGUgYnkgdXJsIG9yIGZhbGxiYWNrIGlmIGl0IGRvZXMgbm90IGV4aXN0OlxuICBjb25zdCByb3V0ZSA9IHJvdXRlc1t1cmxdIHx8IHJvdXRlc1snKiddO1xuICBpZiAocm91dGUgJiYgcm91dGUuY29udHJvbGxlcikge1xuICAgIGNvbnN0IGN0cmwgPSBuZXcgcm91dGUuY29udHJvbGxlcigpO1xuICAgIC8vIExpc3RlbiBvbiByb3V0ZSByZWZyZXNoZXM6XG4gICAgcm91dGUub25SZWZyZXNoKCgpID0+IHtcbiAgICAgIGZvckVhY2hFdmVudCgncmVtb3ZlRXZlbnRMaXN0ZW5lcicpO1xuICAgICAgLy8gUmVuZGVyIHJvdXRlIHRlbXBsYXRlIHdpdGggSm9obiBSZXNpZydzIHRlbXBsYXRlIGVuZ2luZTpcbiAgICAgIGVsLmlubmVySFRNTCA9IGVuZ2luZShyb3V0ZS50ZW1wbGF0ZUlkLCBjdHJsKTtcbiAgICAgIGZvckVhY2hFdmVudCgnYWRkRXZlbnRMaXN0ZW5lcicpO1xuICAgIH0pO1xuICAgIC8vIFRyaWdnZXIgdGhlIGZpcnN0IHJlZnJlc2g6XG4gICAgY3RybC4kcmVmcmVzaCgpO1xuICB9XG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHJvdXRlcik7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJvdXRlcik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9hcHAuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9