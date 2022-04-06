import {Invitation, Ticket, Bag, Audience,TicketOffice, TicketSeller, Theater} from './src/chapter1/final';

const a = new TicketOffice();
const b = new Invitation();
const c = new Ticket();
const d = new Bag(5000);
const e = new Audience(d);
const f = new TicketSeller(a);
const g = new Theater(f);
c.fee = 1000;
b.when = 11;

const s = new Array(c);

for(let i=1; i<10; i++) {
  s.push(c);
}

a.TicketOffice(0, s); 

a.plusAmount(1000);

// f.sellTo(e);
console.log(a.amount);
console.log(d);
