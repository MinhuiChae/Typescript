import {Invitation, Ticket, Bag, Audience,TicketOffice, TicketSeller, Theater} from './src/chapter1/final';


const invitation = new Invitation(11);
const ticket1 = new Ticket(1000); // 라이언킹 
const ticket2 = new Ticket(2000); // 알라딘
const bag1 = new Bag({amount:10000});
const bag2 = new Bag({amount: 10000, invitation: invitation});
const bag3 = new Bag({invitation: invitation});

const bag4 = new Bag({amount:0});

const audience1 = new Audience(bag1);
const audience2 = new Audience(bag2);
const audience3 = new Audience(bag3);
const audience4 = new Audience(bag4);

const tickets = [ticket1, ticket1]; // 

const ticketOffice = new TicketOffice(0, tickets); // 라이언킹 100 , 알라딘 50

const ticketSeller = new TicketSeller(ticketOffice);
if(!ticketSeller.sellTo(audience4)) {
  console.log(ticketSeller.getMsg());
}
ticketSeller.sellTo(audience2);


// console.log('audience1 amount :', audience1.bag); // 10000 Ticket empty
// console.log('ticketSeller > ', ticketSeller);

ticketSeller.sellTo(audience4);
// console.log('audience1 amount :', audience1.bag); // 10000 Ticket empty
// console.log('ticketSeller > ', ticketSeller);
console.log('audience4 amount :', audience4.bag); // 10000 Ticket empty
console.log('ticketSeller > ', ticketSeller);




// 관중이 돈이 없는 경우
// ticket이 다 팔리고 없는 경우





// ticketSeller.sellTo(e2);
// ticketSeller.sellTo(e3);
// console.log(a);
// console.log(e);
// console.log(e2);
// console.log(e3);
