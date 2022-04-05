//Bag이 아직 자율적이지 못하다. Audience 처럼 스스로 책임지지 않고 Audience에 의해 끌려다니는 수동적인 존재.
//자율적으로 바꿔보자. Bag의 내부에 접근하는 모든 로직을 Bag 안으로 캡슐화해서 결합도를 낮춘다.
//Bag 에 hold 메소드를 추가하자 이제 Bag은 관련된 상태와 행위를 함께 가지는 응집도 높은 클래스가 되었다.


class Bag2 {
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

//Bag을 캡슐화 시켰으니 Audience를 Bag의 구현이 아닌 인터페이스에만 의존하도록 하자

class Audience3 {
  bag: Bag2;

  constructor(bag: Bag2) {
    this.bag = bag;
  }

  buy(ticket: Ticket) {
    return this.bag.hold(ticket);
  }
}

//TicketSeller 역시 TicketOffice의 자율권을 침해. 마음대로 티켓을 꺼내어 관객에게 팔고 또 돈을 마음대로 TicketOffice에 넣어버림
//sellTo(audience: Audience) {
//   this.ticketOffice.plusAmount(audience.buy(this.ticketOffice.getTicket()));
// }
//TicketOffice 에 sellTicketTo 메서드를 추가하고 TicketSeller 의 sellTo 메서드의 내부코드를 이 메서드로 옮기자.
interface IAmount {
  amount: number;
}
class TicketOffice2 {
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

//이제 TicketSeller 가 TicketOffice의 구현이 아닌 인터페이스에만 의존할 수 있게 되었다

class TicketSeller5 {
  private ticketOffice: TicketOffice2;

  constructor(ticketOffice: TicketOffice2) {
    this.ticketOffice = ticketOffice;
  }

  sellTo(audience: Audience) {
    this.ticketOffice.sellTicketTo(audience);
  }
}
