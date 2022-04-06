/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Theater = exports.TicketSeller = exports.TicketOffice = exports.Audience = exports.Bag = exports.Ticket = exports.Invitation = void 0;
var Invitation = /** @class */ (function () {
    function Invitation() {
        this.when = 0;
    }
    return Invitation;
}());
exports.Invitation = Invitation;
var Ticket = /** @class */ (function () {
    function Ticket() {
        this.fee = 0;
    }
    Ticket.prototype.getFee = function () {
        return this.fee;
    };
    return Ticket;
}());
exports.Ticket = Ticket;
var Bag = /** @class */ (function () {
    function Bag(invitation, amount) {
        this.amount = 0;
        this.invitation = null;
        this.ticket = null;
        this.invitation = invitation;
        this.amount = amount;
    }
    Bag.prototype.a = function (av) {
        this.amount = av;
    };
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
        this.amount -= amount;
    };
    Bag.prototype.plusAmount = function (amount) {
        this.amount += amount;
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
exports.Bag = Bag;
var Audience = /** @class */ (function () {
    function Audience(bag) {
        this.bag = bag;
    }
    Audience.prototype.buy = function (ticket) {
        return this.bag.hold(ticket);
    };
    return Audience;
}());
exports.Audience = Audience;
var TicketOffice = /** @class */ (function () {
    function TicketOffice() {
        this.amount = null;
        this.tickets = new Array();
    }
    TicketOffice.prototype.TicketOffice = function (amount, ticket) {
        this.amount = amount;
        this.tickets = ticket;
    };
    TicketOffice.prototype.plusAmount = function (amount) {
        if (this.amount) {
            this.amount += amount;
        }
    };
    TicketOffice.prototype.getTicket = function () {
        return this.tickets.shift();
    };
    TicketOffice.prototype.sellTicketTo = function (audience) {
        var ticket = this.getTicket();
        if (ticket) {
            this.plusAmount(audience.buy(ticket));
        }
    };
    return TicketOffice;
}());
exports.TicketOffice = TicketOffice;
var TicketSeller = /** @class */ (function () {
    function TicketSeller(ticketOffice) {
        this.ticketOffice = ticketOffice;
    }
    TicketSeller.prototype.sellTo = function (audience) {
        this.ticketOffice.sellTicketTo(audience);
    };
    return TicketSeller;
}());
exports.TicketSeller = TicketSeller;
var Theater = /** @class */ (function () {
    function Theater(ticketSeller) {
        this.ticketSeller = ticketSeller;
    }
    Theater.prototype.enter = function (audience) {
        this.ticketSeller.sellTo(audience);
    };
    return Theater;
}());
exports.Theater = Theater;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
var final_1 = __webpack_require__(1);
var a = new final_1.TicketOffice();
var b = new final_1.Invitation();
var c = new final_1.Ticket();
var d = new final_1.Bag(b, 5000);
var e = new final_1.Audience(d);
var f = new final_1.TicketSeller(a);
var g = new final_1.Theater(f);
var t1 = new final_1.Ticket();
a.TicketOffice(0, [t1]); //
a.getTicket();
a.plusAmount(4);
c.getFee();
d.minusAmount(2);
console.log(d.amount);

})();

/******/ })()
;