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
  buy(arg0: Ticket): number {
    throw new Error("Method not implemented.");
  }
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


//여기서 문제 Theater이 너무 많은 정보를 가지고 있다. 위의 프로그래밍은 지극히 절자척인 방식으로 Theater이 너무 많은 관여를 하고있다. 
//또한 Theater 속 enter 메소드를 이해하기 위해서 Audience가 Bag을 가지고 있고, Bag안에는 현금이 들어가있으며 TicketSeller가 TicketOffice에서 티켓을 판매하고,
//TicketOffice안에 돈과 티켓이 보관돼 있다는 모든 사실을 동시에 기억하고 있어야 한다. 하나의 클래스에 너무 많은 세부사항을 다루고 있다.
//또한 Audience와 TicketSeller를 변경할 경우 Theater도 함께 변경해야 하는 취약점을 가지고 있다.
