/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Audience": () => (/* binding */ Audience),
/* harmony export */   "Bag": () => (/* binding */ Bag),
/* harmony export */   "Invitation": () => (/* binding */ Invitation),
/* harmony export */   "Theater": () => (/* binding */ Theater),
/* harmony export */   "Ticket": () => (/* binding */ Ticket),
/* harmony export */   "TicketOffice": () => (/* binding */ TicketOffice),
/* harmony export */   "TicketSeller": () => (/* binding */ TicketSeller)
/* harmony export */ });
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Invitation = /** @class */ (function () {
    function Invitation() {
    }
    return Invitation;
}());
var Ticket = /** @class */ (function () {
    function Ticket() {
    }
    Ticket.prototype.getFee = function () {
        return this.fee;
    };
    return Ticket;
}());
var Bag = /** @class */ (function () {
    function Bag() {
    }
    Bag.prototype.hasInvitation = function () {
        return this.invitation !== undefined;
    };
    Bag.prototype.hasTicket = function () {
        return this.ticket !== undefined;
    };
    Bag.prototype.setTicket = function (ticket) {
        this.ticket = ticket;
    };
    Bag.prototype.minusAmount = function (amount) {
        this.amount.amount -= amount;
    };
    Bag.prototype.plusAmount = function (amount) {
        this.amount.amount += amount;
    };
    Bag.prototype.hold = function (ticket) {
        if (this.hasInvitation()) {
            this.setTicket(ticket);
            return 0;
        }
        this.setTicket(ticket);
        this.minusAmount(ticket.getFee());
        return ticket.getFee();
    };
    return Bag;
}());
var Audience = /** @class */ (function () {
    function Audience(bag) {
        this.bag = bag;
    }
    Audience.prototype.buy = function (ticket) {
        return this.bag.hold(ticket);
    };
    return Audience;
}());
var TicketOffice = /** @class */ (function () {
    function TicketOffice() {
        this.tickets = new Array();
    }
    TicketOffice.prototype.plusAmount = function (amount) {
        this.amount.amount += amount;
    };
    TicketOffice.prototype.TicketOffice = function (amount) {
        var ticket = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ticket[_i - 1] = arguments[_i];
        }
        this.amount = amount;
        this.tickets = Array.from(new (Set.bind.apply(Set, __spreadArray([void 0], ticket, false)))()).map(function (a) { return a; });
    };
    TicketOffice.prototype.getTicket = function () {
        return this.tickets.shift();
    };
    TicketOffice.prototype.sellTicketTo = function (audience) {
        this.plusAmount(audience.buy(this.getTicket()));
    };
    return TicketOffice;
}());
var TicketSeller = /** @class */ (function () {
    function TicketSeller(ticketOffice) {
        this.ticketOffice = ticketOffice;
    }
    TicketSeller.prototype.sellTo = function (audience) {
        this.ticketOffice.sellTicketTo(audience);
    };
    return TicketSeller;
}());
var Theater = /** @class */ (function () {
    function Theater(ticketSeller) {
        this.ticketSeller = ticketSeller;
    }
    Theater.prototype.enter = function (audience) {
        this.ticketSeller.sellTo(audience);
    };
    return Theater;
}());



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_chapter1_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

var a = new _src_chapter1_index__WEBPACK_IMPORTED_MODULE_0__.TicketOffice();
var b = new _src_chapter1_index__WEBPACK_IMPORTED_MODULE_0__.Invitation();
var c = new _src_chapter1_index__WEBPACK_IMPORTED_MODULE_0__.Ticket();
var d = new _src_chapter1_index__WEBPACK_IMPORTED_MODULE_0__.Bag();
var e = new _src_chapter1_index__WEBPACK_IMPORTED_MODULE_0__.Audience(d);
var f = new _src_chapter1_index__WEBPACK_IMPORTED_MODULE_0__.TicketSeller(a);
var g = new _src_chapter1_index__WEBPACK_IMPORTED_MODULE_0__.Theater(f);
a.TicketOffice({ amount: 6 }, [1, 2, 3, 4]);
a.getTicket();
a.plusAmount(4);
a.sellTicketTo(e);
console.log(5);

})();

/******/ })()
;