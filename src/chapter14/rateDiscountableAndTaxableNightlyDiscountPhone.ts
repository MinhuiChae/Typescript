import {RatePolicy, Money} from "./interface";
import RateDiscountableNightlyDiscountPhone from './rateDiscountableNightlyDiscountPhone';

class RateDiscountableAndTaxableNightlyDiscountPhone extends RateDiscountableNightlyDiscountPhone {
  private taxRate: number = 0;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, taxRate: number, discountAmount: Money, ratePolicy: RatePolicy) {
    super(nightlyAmount, regularAmount, seconds, discountAmount, ratePolicy);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return super.afterCalculated(fee).plus(fee.times(this.taxRate));
  }
}

export default RateDiscountableAndTaxableNightlyDiscountPhone;
