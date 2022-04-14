import { Money } from '../chapter2';
import{ReservationAgency, Customer, Screening, DiscountCondition, Movie, MovieType, DiscountConditionType} from './index';

const money = new Money(10000);
const reservation = new ReservationAgency();
const customer = new Customer("채민희", "alsgml");

const discountCondition = new DiscountCondition();
const discountCondition2 = new DiscountCondition();



const movie = new Movie("타이타닉", 120, money, [discountCondition, discountCondition2]);
movie.movieType = MovieType.PERCENT_DISCOUNT;
movie.discountAmount = new Money(1000);
movie.discountPercent = 0.3;

discountCondition.setType(DiscountConditionType.PERIOD);
discountCondition2.setType(DiscountConditionType.SEQUENCE);
discountCondition.setSequence(5);
discountCondition.setDayOfWeek("목요일");
discountCondition.setStartTime(10);
discountCondition2.setSequence(15);
discountCondition2.setDayOfWeek("목요일");
discountCondition2.setStartTime(1);
const screening = new Screening(movie, 5, 1, "목요일");
const reserve = reservation.reserve(screening, customer, 2);


console.log(reserve);