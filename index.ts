import {Invitation, Ticket, Bag, Audience,TicketOffice, TicketSeller, Theater} from './src/chapter1/final';

const a = new TicketOffice();
const b = new Invitation();
const c = new Ticket();
const d = new Bag({amount:10000});
const d2 = new Bag({amount: 10000, invitation: b});
const d3 = new Bag({invitation: b});
const e = new Audience(d);
const e2 = new Audience(d2);
const e3 = new Audience(d3);
const f = new TicketSeller(a);

c.fee = 1000;
b.when = 11;

const s = new Array(c); //[c]

for(let i=1; i<10; i++) {
  s.push(c);
}

a.TicketOffice(0, s); 

f.sellTo(e);
f.sellTo(e2);
f.sellTo(e3);
console.log(a);
console.log(e);
console.log(e2);
console.log(e3);
