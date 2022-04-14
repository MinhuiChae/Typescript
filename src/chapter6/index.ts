class Invitation {
  when: number = 0;
  constructor(when: number) {
    this.when = when;
  }
}

class Ticket {
  fee: number = 0;

  constructor(fee: number) {
    this.fee = fee;
  }
  
  getFee():number {
    return this.fee;
  }
}

interface IBag {
  amount?: number,
  invitation?: Invitation
}

class Bag {
  amount?: number = 0;
  invitation?: Invitation | null = null;
  ticket: Ticket | null = null;

  constructor(attr: IBag) { 
    this.amount = attr.amount ?? 0;
    this.invitation = attr.invitation;
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
    if(this.amount != null) {
      this.amount -= amount;
    }
  }

  plusAmount(amount: number) {
    if(this.amount != null) {
      this.amount += amount;
    }
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

  setTicket(ticket: Ticket): number {
    if(this.bag.hasInvitation()) {
      this.bag.setTicket(ticket);
      return 0;
    } else {
      this.bag.setTicket(ticket);
      this.bag.minusAmount(ticket.getFee());
      return ticket.getFee();
    }
  }
}


class TicketOffice {
  sellTotalPrice: number | null = null;
  tickets: Ticket[] = new Array();

  constructor(sellTotalPrice: number, ticket: Ticket[]) {
    this.sellTotalPrice = sellTotalPrice;
    this.tickets = ticket;
  }

  plusAmount(price: number) {
    if (this.sellTotalPrice != null) {
      this.sellTotalPrice += price;
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
  private msg: string = "";

  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  sellTo(audience: Audience): boolean {
    if(this.isEmptyTicket()) {
      this.msg = "티켓이 없습니다.";
      return false;
    }else if(this.isRightAudience(audience) == false) {
      this.msg = "돈이 없습니다."
      return false;
    }else {
      this.ticketOffice.sellTicketTo(audience);
      this.msg = "구매가 완료되었습니다"
      return true;
    }
  }
  
  getMsg(): string{
    return this.msg;
  }

  isEmptyTicket(): boolean {
    return this.ticketOffice.tickets.length === 0;
  }

  getFeeTicket(): number {
    return this.ticketOffice.tickets[0]?.getFee();
  }
  
  isRightAudience(audience: Audience): boolean {
    return this.getFeeTicket() < (audience.bag.amount ?? 0) || audience.bag.hasInvitation();
  }

  setTicket(audience: Audience): void {
    let office = this.ticketOffice.getTicket();
    if(office)
    this.ticketOffice.plusAmount(audience.setTicket(office));
  }
}

class Theater {
  ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  public enter(audience: Audience): void {
    this.ticketSeller.setTicket(audience);
  }
}

export {Invitation, Ticket, Bag, Audience, TicketOffice, TicketSeller, Theater}; 

