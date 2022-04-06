//원래버전
class Invitation {
  when: number = 0;
}

class Ticket {
  fee: number = 0;

  getFee(): number {
    return this.fee;
  }
}

interface IBag {
  invitation?: Invitation,
  amount?: number
}

class Bag {
  amount?: number = 0;
  invitation?: Invitation | null = null;
  ticket: Ticket | null = null;

  constructor(attr: IBag) {
    this.invitation = attr.invitation;
    this.amount = attr.amount;
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
    if(this.amount != null) {
      this.amount -= amount;
    }
  }

  plusAmount(amount: number) {
    if(this.amount != null) {
      this.amount += amount;
    }
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
  amount: number | null = null;
  tickets: Ticket[] = new Array();

  TicketOffice(amount: number, ticket: Ticket[]) {
    this.amount = amount;
    this.tickets = ticket;
  }


  plusAmount(amount: number) {
    if (this.amount != null) {
      this.amount += amount;
    }
  }  

  minusAmount(amount: number) {
    if (this.amount != null) {
      this.amount -= amount;
    }
  }
  
  getTicket(): Ticket | undefined {
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
      const ticket: Ticket | undefined = this.ticketSeller.getTicketOffice().getTicket();
      if(ticket) {
        audience.getBag().setTicket(ticket);
      }
    } else {
      const ticket: Ticket | undefined  = this.ticketSeller.getTicketOffice().getTicket();
      if(ticket) {
        audience.getBag().minusAmount(ticket.getFee());
        this.ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
        audience.getBag().setTicket(ticket);
      }
    }
  }

}


// //여기서 문제 Theater이 너무 많은 정보를 가지고 있다. 위의 프로그래밍은 지극히 절자척인 방식으로 Theater이 너무 많은 관여를 하고있다. 
// //또한 Theater 속 enter 메소드를 이해하기 위해서 Audience가 Bag을 가지고 있고, Bag안에는 현금이 들어가있으며 TicketSeller가 TicketOffice에서 티켓을 판매하고,
// //TicketOffice안에 돈과 티켓이 보관돼 있다는 모든 사실을 동시에 기억하고 있어야 한다. 하나의 클래스에 너무 많은 세부사항을 다루고 있다.
// //또한 Audience와 TicketSeller를 변경할 경우 Theater도 함께 변경해야 하는 취약점을 가지고 있다.
