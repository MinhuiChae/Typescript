import {Lecture} from '../chapter12'

const lecter = new Lecture("d", 55, [70,75,50,65,10]);
console.log(lecter.evaluate());
console.log(lecter.passCount());