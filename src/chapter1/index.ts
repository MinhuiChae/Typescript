class Invitation {
  private when: number = 0;
}

class Ticket{
  private fee: number =0;
  
  getFee():number {
    return this.fee;
  }
}

class Bag {
  private amount: number =0 ;
  private invitation: boolean = true;
  private ticket: number = 0;

  hasInvitation(): boolean {
    return true;
  }

  hasTicket(): boolean {
    return true;
  }

  setTicket(ticket: any): void {
    this.ticket = ticket;
  }

  minusAmount(amount: number): void {
    this.amount -= amount;
  }

  plusAmount(amount: number): void {
    this.amount += amount;
  }

  Bag(amount: number, invitation?: boolean) {
    this.invitation = invitation;
    this.amount = amount;
  }

}

class Audience {
  private bag: Bag;

  Audience(bag: Bag) {
    this.bag = bag;
  }

  getBag(): Bag {
    return this.bag;
  }
}


class TicketOffice {
  private amount: number = 0;
  private ticket: object[] = [];

  TicketOffice(amount: number, ticket: object[]) {
    this.amount = amount;
    this.ticket = ticket;
  }

  getTicket():any {
    return this.ticket.shift();
  }

  minusAmount(amount: number): void {
    this.amount -= amount;
  }

  plusAmount(amount: number): void{
    this.amount += amount;
  }
}

class TicketSeller {
  private ticketOffice: any;

  ticketSeller(ticketOffice: object) {
    this.ticketOffice = ticketOffice;
  }

  getTicketOffice() {
    return this.ticketOffice;
  }
  
  
}

class Theater {
  private ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  public enter(audience: Audience): void {
    if (audience.getBag().hasInvitation()) {
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


export {Invitation, Ticket, Bag, Audience,TicketOffice}; 

