"use strict";
exports.__esModule = true;
exports.TicketOffice = exports.Audience = exports.Bag = exports.Ticket = exports.Invitation = void 0;
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
    function Bag() {
        this.amount = 0;
        this.invitation = true;
        this.ticket = 0;
    }
    Bag.prototype.hasInvitation = function () {
        return true;
    };
    Bag.prototype.hasTicket = function () {
        return true;
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
    Bag.prototype.Bag = function (amount, invitation) {
        this.invitation = invitation;
        this.amount = amount;
    };
    return Bag;
}());
exports.Bag = Bag;
var Audience = /** @class */ (function () {
    function Audience() {
    }
    Audience.prototype.Audience = function (bag) {
        this.bag = bag;
    };
    Audience.prototype.getBag = function () {
        return this.bag;
    };
    return Audience;
}());
exports.Audience = Audience;
var TicketOffice = /** @class */ (function () {
    function TicketOffice() {
        this.amount = 0;
        this.ticket = [];
    }
    TicketOffice.prototype.TicketOffice = function (amount, ticket) {
        this.amount = amount;
        this.ticket = ticket;
    };
    return TicketOffice;
}());
exports.TicketOffice = TicketOffice;
