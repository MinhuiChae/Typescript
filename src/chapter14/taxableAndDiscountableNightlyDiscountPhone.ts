import {RatePolicy, Money} from "./interface";
import TaxableNightlyDiscountPhone from './taxableNightlyDiscountPhone';

class TaxableAndDiscountableNightlyDiscountPhone extends TaxableNightlyDiscountPhone {
  private discountAmount: Money = new Money(0);

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, taxRate: number, discountAmount: Money, ratePolicy: RatePolicy) {
    super(nightlyAmount, regularAmount, seconds, taxRate, ratePolicy);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return super.afterCalculated(fee).minus(this.discountAmount);
  }
}

export default TaxableAndDiscountableNightlyDiscountPhone;