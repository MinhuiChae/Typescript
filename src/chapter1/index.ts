//원래버전
class Invitation {
  when: number;
}

class Ticket {
  fee: number;

  getFee(): number {
    return this.fee;
  }
}

class Bag {
  amount: number;
  invitation: Invitation;
  ticket: Ticket;

  constructor(invitation?: Invitation, amount?: number) {
    this.invitation = invitation;
    this.amount = amount;
  }

  hasInvitation(): boolean {
    return this.invitation != undefined;
  }

  hasTicket() {
    return this.ticket!= undefined;
  }

  setTicket(ticket: Ticket) {
    this.ticket = ticket;
  }

  minusAmount(amount: number) {
    this.amount -= amount;
  }

  plusAmount(amount: number) {
    this.amount += amount;
  }
}

class Audience {
  bag: Bag;

  constructor(bag: Bag) {
    this.bag = bag;
  }

  getBag(): Bag {
    return this.bag;
  }
}

class  TicketOffice {
  amount: number;

  tickets: Ticket[] = new Array();

  TicketOffice(amount: any, ...ticket: any[]) {
    this.amount = amount;
    this.tickets = Array.from(new Set(...ticket)).map((a: Ticket) =>a);
  }

  plusAmount(amount: number) {
    this.amount += amount;
  }

  minusAmount(amount: number) {
    this.amount -= amount;
  }
  

  getTicket(): Ticket {
    return this.tickets.shift();
  }
}

class TicketSeller {
  private ticketOffice: TicketOffice;

    constructor(ticketOffice: TicketOffice) {
      this.ticketOffice = ticketOffice;
    }
  
    getTicketOffice(): TicketOffice {
      return this.ticketOffice;
    }
}


class Theater {
  private ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  enter(audience: Audience) {
    if(audience.getBag().hasInvitation()) {
      const ticket: Ticket = this.ticketSeller.getTicketOffice().getTicket();
      audience.getBag().setTicket(ticket);
    } else {
      const ticket: Ticket = this.ticketSeller.getTicketOffice().getTicket();
      audience.getBag().minusAmount(ticket.getFee());
      this.ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
      audience.getBag().setTicket(ticket);
    }
  }

}






// interface IAmount {
//   amount: number;
// }

// class Invitation {
//   when: number;
// }

// class Ticket{
//   fee: number;
  
//   getFee():number {
//     return this.fee;
//   }
// }

// class Bag {
//   amount: IAmount;
//   invitation: Invitation;
//   ticket: Ticket;

//   a(av: any) {
//     this.amount = av;
//   }

//   hasInvitation(): boolean {
//     return this.invitation !== undefined;
//   }

//   hasTicket(): boolean {
//     return this.ticket !== undefined;
//   }

//   setTicket(ticket: Ticket) {
//     this.ticket = ticket;
//   }

//   minusAmount(amount: number) {
//     this.amount.amount -= amount;
//   }

//   plusAmount(amount: number) {
//     this.amount.amount += amount;
//   }

//   hold(ticket: Ticket): number {
//     if (this.hasInvitation()) {
//       this.setTicket(ticket);
//       return 0;
//     }
//     this.setTicket(ticket);
//     this.minusAmount(ticket.getFee());
//     return ticket.getFee();
//   }
// }

// class Audience {
//   bag: Bag;

//   constructor(bag: Bag) {
//     this.bag = bag;
//   }

//   buy(ticket: Ticket) {
//     return this.bag.hold(ticket);
//   }
// }


// class TicketOffice {
//   amount: IAmount;
//   tickets: Ticket[] = new Array();

//   TicketOffice(amount: any, ...ticket: any[]) {
//     this.amount = amount;
//     this.tickets = Array.from(new Set(...ticket)).map((a: Ticket) =>a);
//   }

//   plusAmount(amount: number) {
//     this.amount.amount += amount;
//   }
  

//   getTicket(): Ticket {
//     return this.tickets.shift();
//   }

//   sellTicketTo(audience: Audience) {
//     this.plusAmount(audience.buy(this.getTicket()));
//   }

// }

// class TicketSeller {
//   private ticketOffice: TicketOffice;

//   constructor(ticketOffice: TicketOffice) {
//     this.ticketOffice = ticketOffice;
//   }

//   sellTo(audience: Audience) {
//     this.ticketOffice.sellTicketTo(audience);
//   }
// }

// class Theater {
//   ticketSeller: TicketSeller;

//   constructor(ticketSeller: TicketSeller) {
//     this.ticketSeller = ticketSeller;
//   }

//   public enter(audience: Audience): void {
//     this.ticketSeller.sellTo(audience);
//   }
// }



  export {Invitation, Ticket, Bag, Audience, TicketOffice, TicketSeller, Theater}; 

