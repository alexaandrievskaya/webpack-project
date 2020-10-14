/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!***********************!*\
  !*** ./statistics.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("//отслеживаем клики на глобальном документа\r\nfunction createStatistics() {\r\n    let counter = 0;\r\n    let isDestroyed = false;\r\n    const listener = () => counter++;\r\n\r\n    document.addEventListener('click', listener);\r\n\r\n    return {\r\n        destroy() {\r\n            document.removeEventListener('click', listener);\r\n            isDestroyed = true;\r\n        },\r\n\r\n        getClicks() {\r\n            if(isDestroyed) return 'Statistics is destroyed!';\r\n            return counter;\r\n        },\r\n    }\r\n}\r\n\r\nwindow.stat = createStatistics();\n\n//# sourceURL=webpack:///./statistics.js?");
/******/ })()
;