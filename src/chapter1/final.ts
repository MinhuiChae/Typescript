class Invitation {
  when: number = 0;
}

class Ticket {
  fee: number = 0;
  
  getFee():number {
    return this.fee;
  }
}

class Bag {
  amount: number = 0;
  invitation: Invitation | null = null;
  ticket: Ticket | null = null;

  constructor(invitation: Invitation, amount: number) {
    this.invitation = invitation;
    this.amount = amount;
  }

  a(av: number) {
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
    this.amount -= amount;
  }

  plusAmount(amount: number) {
    this.amount += amount;
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
  amount: number | null = null;
  tickets: Ticket[] = new Array();

  TicketOffice(amount: number, ticket: Ticket[]) {
    this.amount = amount;
    this.tickets = ticket;
  }

  plusAmount(amount: number) {
    if (this.amount) {
      this.amount += amount;
    }
  }  

  getTicket(): Ticket | undefined {
    return this.tickets.shift();
  }

  sellTicketTo(audience: Audience) {
    const ticket = this.getTicket();
    if (ticket) {
      this.plusAmount(audience.buy(ticket));
    }
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

