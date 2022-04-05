//1.자율성을 높이자 (Audience)
//TiekcetSeller은 Audience의 getBag 메서드를 호출해서 Audience 내부의 Bag 인스턴스에 직접 접근함.
//Bag 인스턴스에 접근하는 객체가 Theater 에서 TicketSeller로 바뀌었을 뿐 Audience는 여전히 자율적인 존재가 아님.
//Audience에 buy 메서드를 추가하고, TicketSeller의 SellTo 메서드에서 getBag 메서드에 접근하는 부분을 buy 메서드로 옮기자

class TicketSeller3 {
  private ticketOffice: TicketOffice;

    constructor(ticketOffice: TicketOffice) {
      this.ticketOffice = ticketOffice;
    }
    sellTo(audience: Audience) {
      // if(audience.getBag().hasInvitation()) {
      //   const ticket: Ticket = this.ticketOffice.getTicket();
      //   audience.getBag().setTicket(ticket);
      // } else {
      //   const ticket: Ticket = this.ticketOffice.getTicket();
      //   audience.getBag().minusAmount(ticket.getFee());
      //   this.ticketOffice.plusAmount(ticket.getFee());
      //   audience.getBag().setTicket(ticket);
      // }
    }
}

class Audience2 {
  bag: Bag;

  constructor(bag: Bag) {
    this.bag = bag;
  }

  //제거
  // getBag(): Bag {
  //   return this.bag;
  // } Audience는 자신의 가방 안의 초대장을 스스로 확인하기 때문에 외부에서 Audience가 Bag을 소유하고 있다는 사실을 알 필요 없음

  buy(ticket: Ticket) {
    if(this.bag.hasInvitation()) {
      this.bag.setTicket(ticket);
      } else {
        this.bag.minusAmount(ticket.getFee());
        return ticket.getFee();
      }
  }
}