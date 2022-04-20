import Call from "./src/chapter10/call";
import DateTimeInterval from "./src/chapter14/dateTimeInterval";



const date = new Date(2021,0,1,10);
const date3 = new Date(2021,0,5,10);

const year = date.getFullYear();
const month = date.getMonth();
const day = date. getDate();


const date2 = new Date(year, month, day);




console.log(date3.getDate() - date.getDate()-1);





