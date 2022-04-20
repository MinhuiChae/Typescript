import {RatePolicy, Money} from "./interface";
import NightlyDiscountPhone from './nightlyDiscountPhone';

class RateDiscountableNightlyDiscountPhone extends NightlyDiscountPhone {
  private discountAmount: Money = new Money(0);

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, discountAmount: Money, ratePolicy: RatePolicy) {
    super(nightlyAmount, regularAmount, seconds, ratePolicy);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount);
  }
}

export default RateDiscountableNightlyDiscountPhone;