import {Money } from "../chapter10";
import Call from '../chapter10/call';
import Phone from './phone';

interface RatePolicy {
  calculateFee(phone: Phone): Money;
}

export {RatePolicy, Call, Money, Phone};