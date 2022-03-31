/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/study/index.ts":
/*!****************************!*\
  !*** ./src/study/index.ts ***!
  \****************************/
/***/ (function() {

eval("var __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar Shape = /** @class */ (function () {\r\n    function Shape(info) {\r\n        this.width = info.width;\r\n        this.height = info.height;\r\n    }\r\n    return Shape;\r\n}());\r\nvar Circle = /** @class */ (function (_super) {\r\n    __extends(Circle, _super);\r\n    function Circle(info) {\r\n        return _super.call(this, info) || this;\r\n    }\r\n    Circle.prototype.getWeight = function () {\r\n        return this.width * 3.14;\r\n    };\r\n    return Circle;\r\n}(Shape));\r\nvar Triangle = /** @class */ (function (_super) {\r\n    __extends(Triangle, _super);\r\n    function Triangle(info) {\r\n        return _super.call(this, info) || this;\r\n    }\r\n    Triangle.prototype.getWeight = function () {\r\n        return this.width * this.height / 2;\r\n    };\r\n    return Triangle;\r\n}(Shape));\r\nvar Square = /** @class */ (function (_super) {\r\n    __extends(Square, _super);\r\n    function Square(info) {\r\n        return _super.call(this, info) || this;\r\n    }\r\n    Square.prototype.getWeight = function () {\r\n        return this.width * this.height;\r\n    };\r\n    return Square;\r\n}(Shape));\r\nvar ShapeFactory = /** @class */ (function () {\r\n    function ShapeFactory(info) {\r\n        if (info.shape == 'circle') {\r\n            this.shapeInstance = new Circle(info);\r\n        }\r\n        else if (info.shape == 'triangle') {\r\n            this.shapeInstance = new Triangle(info);\r\n        }\r\n        else if (info.shape == 'square') {\r\n            this.shapeInstance = new Square(info);\r\n        }\r\n    }\r\n    ShapeFactory.prototype.getWeight = function () {\r\n        return this.shapeInstance.getWeight();\r\n    };\r\n    return ShapeFactory;\r\n}());\r\n(function (w) {\r\n    var shapeModuleController = {\r\n        getWeight: function (info) {\r\n            return new ShapeFactory(info).getWeight();\r\n        }\r\n    };\r\n    w.shapeModule = shapeModuleController;\r\n})(window);\r\n// import {Invitation,Ticket,Bag,Audience,TicketOffice} from '../chapter1';\r\n// const a = new Invitation(); \r\n// const b = new Ticket();\r\n// const c = new Bag();\r\n// const d = new Audience();\r\n// const e = new TicketOffice();\r\n\n\n//# sourceURL=webpack:///./src/study/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/study/index.ts"]();
/******/ 	
/******/ })()
;