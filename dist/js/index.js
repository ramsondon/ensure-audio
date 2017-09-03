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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EnsureAudio = exports.EnsureAudio = function () {
	function EnsureAudio() {
		_classCallCheck(this, EnsureAudio);

		this.factory = window.AudioContext || window.webkitAudioContext;
	}

	_createClass(EnsureAudio, [{
		key: 'isContextSupported',
		value: function isContextSupported() {
			return !!this.factory;
		}
	}, {
		key: 'createAudioContext',
		value: function createAudioContext() {
			var _this = this;

			return new Promise(function (resolve, reject) {
				if (!_this.isContextSupported()) {
					reject(new Error('AudioContext not available'));
				}
				var factory = _this.factory;
				resolve(new factory());
			});
		}
	}, {
		key: 'getUserMedia',
		value: function getUserMedia(constraints) {
			if (!navigator.mediaDevices) {
				// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
				// Poly fill for other browsers
				navigator.mediaDevices = {
					getUserMedia: function getUserMedia(constraints) {

						// First get ahold of the legacy getUserMedia, if present
						var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;

						// Some browsers just don't implement it - return a rejected promise with an error
						// to keep a consistent interface
						if (!getUserMedia) {
							return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
						}

						// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
						return new Promise(function (resolve, reject) {
							getUserMedia.call(navigator, constraints, resolve, reject);
						});
					}
				};
			}

			return navigator.mediaDevices.getUserMedia(constraints);
		}
	}]);

	return EnsureAudio;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map