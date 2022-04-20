import {RatePolicy, Money} from "./interface";
import RateDiscountableRegularPhone from './rateDiscountableRegularPhone';

class RateDiscountableAndTaxableRegularPhone extends RateDiscountableRegularPhone {
  private taxRate: number = 0;

  constructor(amount: Money, seconds: number, discountAmount: Money, taxRate: number, ratePolicy: RatePolicy) {
    super(amount, seconds, discountAmount, ratePolicy);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return super.afterCalculated(fee).plus(fee.times(this.taxRate));
  }
}

export default RateDiscountableAndTaxableRegularPhone;