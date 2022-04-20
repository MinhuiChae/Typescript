import {RatePolicy, Money} from "./interface";
import AdditionalRatePolicy from './additionalRatePolicy';

class RateDiscountablePolicy extends AdditionalRatePolicy {
  private discoutAmount: Money = new Money(0);

  constructor(discountAmount: Money, next: RatePolicy) {
    super(next);
    this.discoutAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return fee.minus(this.discoutAmount);
  }
}

export default RateDiscountablePolicy;