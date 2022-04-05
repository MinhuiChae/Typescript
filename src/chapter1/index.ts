interface IAmount {
  amount: number;
}

class Invitation {
  when: number;
}

class Ticket{
  fee: number;
  
  getFee():number {
    return this.fee;
  }
}

class Bag {
  amount: IAmount;
  invitation: Invitation;
  ticket: Ticket;

  a(av: any) {
    this.amount = av;
  }

  hasInvitation(): boolean {
    return this.invitation !== undefined;
  }

  hasTicket(): boolean {
    return this.ticket !== undefined;
  }

  setTicket(ticket: Ticket) {
    this.ticket = ticket;
  }

  minusAmount(amount: number) {
    this.amount.amount -= amount;
  }

  plusAmount(amount: number) {
    this.amount.amount += amount;
  }

  hold(ticket: Ticket): number {
    if (this.hasInvitation()) {
      this.setTicket(ticket);
      return 0;
    }
    this.setTicket(ticket);
    this.minusAmount(ticket.getFee());
    return ticket.getFee();
  }
}

class Audience {
  bag: Bag;

  constructor(bag: Bag) {
    this.bag = bag;
  }

  buy(ticket: Ticket) {
    return this.bag.hold(ticket);
  }
}


class TicketOffice {
  amount: IAmount;
  tickets: Ticket[] = new Array();

  TicketOffice(amount: any, ...ticket: any[]) {
    this.amount = amount;
    this.tickets = Array.from(new Set(...ticket)).map((a: Ticket) =>a);
  }

  plusAmount(amount: number) {
    this.amount.amount += amount;
  }
  

  getTicket(): Ticket {
    return this.tickets.shift();
  }

   sellTicketTo(audience: Audience) {
    this.plusAmount(audience.buy(this.getTicket()));
  }

}

class TicketSeller {
  private ticketOffice: TicketOffice;

  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  sellTo(audience: Audience) {
    this.ticketOffice.sellTicketTo(audience);
  }
}

class Theater {
  ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  public enter(audience: Audience): void {
    this.ticketSeller.sellTo(audience);
  }
}



  export {Invitation, Ticket, Bag, Audience, TicketOffice, TicketSeller, Theater}; 

