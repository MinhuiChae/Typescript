class Invitation {
  private when: number = 0;
}

class Ticket{
  private fee: number =0;
  
  getFee():number {
    return this.fee;
  }
}

class Bag{
  private amount:number =0;
  private invitation:boolean=true;
  private ticket:number =0;

  hasInvitation():boolean {
    return true;
  }

  hasTicket():boolean {
    return true;
  }

  setTicket(ticket:number):void{
    this.ticket = ticket;
  }

  minusAmount(amount:number):void{
    this.amount-=amount;
  }

  plusAmount(amount:number):void{
    this.amount+=amount;
  }

  Bag(amount:number,invitation?:boolean){
    this.invitation = invitation;
    this.amount = amount;
  }

}

class Audience{
  private bag:object;

  Audience(bag:object){
    this.bag=bag;
  }

  getBag():object{
    return this.bag;
  }
}


class TicketOffice{
  private amount:number = 0;
  private ticket:object[]=[];

  TicketOffice(amount:number, ticket:object[]){
    this.amount=amount;
    this.ticket = ticket;
    
  }
}



export {Invitation, Ticket, Bag, Audience,TicketOffice}; 

