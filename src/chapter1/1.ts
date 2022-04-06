//1.자율성을 높이자 (TicketOffice)

//위의 코드는 TicketOffice 에서 ticket을 가져가는 건 seller 이 아닌 Theater 이고, audience 의 bag 에 접근하는 것 역시 Theater 이다. 수동적이 강한 코드에 자율성을 넣어보자
//TicketSeller 가 직접 TicketOffice를 처리하는 자율적인 존재가 되도록 설계를 변경해본다.
//Theater의 eneter 메서드에서 TicketOffice에 접근하는 모든 코드를 TicketSeller 내부로 숨긴다. 또, TicketSeller에 SellTo 메서드를 추가하여 Theater에 있던 로직을 이 메서드로 옮긴다.

//수정 전
class Theater2 {
  private ticketSeller: TicketSeller2;

  constructor(ticketSeller: TicketSeller2) {
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

class TicketSellers {
  private ticketOffice: TicketOffice;

    constructor(ticketOffice: TicketOffice) {
      this.ticketOffice = ticketOffice;
    }
  
    getTicketOffice(): TicketOffice {
      return this.ticketOffice;
    }
}

//수정

class TicketSeller2 {
  private ticketOffice: TicketOffice;

    constructor(ticketOffice: TicketOffice) {
      this.ticketOffice = ticketOffice;
    }
    
    // 제거시작
    getTicketOffice(): TicketOffice {
      return this.ticketOffice;
    } //제거 끝 ticketOffice의 가시성이 private 이고 접근 가능한 퍼블릭 메서드가 더 이상 존재하지 않기 때문에 ticketOffice에 대한 접근은 오직 TicketSeller에서만 가능

    //추가시작
    sellTo(audience: Audience) {
      if(audience.getBag().hasInvitation()) {
        const ticket: Ticket| undefined  = this.ticketOffice.getTicket();
        if(ticket) {
          audience.getBag().setTicket(ticket);
        }
      } else {
        const ticket: Ticket| undefined  = this.ticketOffice.getTicket();
        if(ticket){
          audience.getBag().minusAmount(ticket.getFee());
          this.ticketOffice.plusAmount(ticket.getFee());
          audience.getBag().setTicket(ticket);
        }
      }
    }
    //추가 끝
}

// 이제 Theater의 enter 메서드를 sellTo를 호출하는 메서드로 바꾼다.

class Theater3 {
  private ticketSeller: TicketSeller2;

  constructor(ticketSeller: TicketSeller2) {
    this.ticketSeller = ticketSeller;
  }

  enter(audience: Audience) {
    this.ticketSeller.sellTo(audience);
  }

}

//이렇게 되면 Theater 어디서도 ticketOffice에 접근하지 않는다. 단지 ticketSeller 가 sellTo 메시지를 이해하고 응답할 수 있다는 사실만 알고 있을 뿐임.


//수정 후

class Theater4 {
  private ticketSeller: TicketSeller2;

  constructor(ticketSeller: TicketSeller2) {
    this.ticketSeller = ticketSeller;
  }

  enter(audience: Audience) {
    this.ticketSeller.sellTo(audience);
  }

}

class TicketSeller3 {
  private ticketOffice: TicketOffice;

    constructor(ticketOffice: TicketOffice) {
      this.ticketOffice = ticketOffice;
    }
   
    sellTo(audience: Audience) {
      if(audience.getBag().hasInvitation()) {
        const ticket: Ticket| undefined  = this.ticketOffice.getTicket();
        if(ticket) {
          audience.getBag().setTicket(ticket);
        }
      } else {
        const ticket: Ticket| undefined  = this.ticketOffice.getTicket();
        if(ticket){
          audience.getBag().minusAmount(ticket.getFee());
          this.ticketOffice.plusAmount(ticket.getFee());
          audience.getBag().setTicket(ticket);
        }
      }
    }
}
