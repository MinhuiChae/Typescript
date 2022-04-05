import {Invitation, Ticket, Bag, Audience,TicketOffice, TicketSeller, Theater} from './src/chapter1/final';

const a = new TicketOffice();
const b = new Invitation();
const c = new Ticket();
const d = new Bag();
const e = new Audience(d);
const f = new TicketSeller(a);
const g = new Theater(f);
const t1 = new Ticket();

a.TicketOffice(6, [t1]);
a.getTicket();
a.plusAmount(4);
c.getFee();
d.a({amount: 5});
d.minusAmount(2)

console.log(d.amount);
