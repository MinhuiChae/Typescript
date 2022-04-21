import {Money, Call } from "../chapter10";
import {Phone} from './phone';

interface RatePolicy {
  calculateFee(phone: Phone): Money;
}

export {RatePolicy, Call, Money, Phone};