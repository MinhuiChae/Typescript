import { Money } from './src/chapter2';
import{ReservationAgency, Customer, Screening, DiscountCondition, Movie, MovieType, DiscountConditionType} from './src/chapter4/index';

const money = new Money(10000);
const reservation = new ReservationAgency();
const customer = new Customer("채민희", "alsgml");

const discountCondition = new DiscountCondition();



const movie = new Movie("타이타닉", 120, money, [discountCondition]);
movie.movieType = MovieType.AMOUNT_DISCOUNT;
movie.discountAmount = new Money(2000);
movie.discountPercent = 0.3;

discountCondition.setType(DiscountConditionType.PERIOD);
discountCondition.setSequence(5);
discountCondition.setDayOfWeek("목요일");
discountCondition.setStartTime(1);
const screening = new Screening(movie, 10, 5, "일요일");
const a = reservation.reserve(screening, customer, 2);

// console.log(a);
// console.log(discountCondition.getType());