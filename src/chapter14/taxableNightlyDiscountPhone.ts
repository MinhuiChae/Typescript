import {RatePolicy, Money} from './interface';
import NightlyDiscountPhone from './nightlyDiscountPhone';

class TaxableNightlyDiscountPhone extends NightlyDiscountPhone {
  private taxRate: number = 0;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, taxRate: number, ratePolicy: RatePolicy) {
    super(nightlyAmount, regularAmount, seconds, ratePolicy);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}

export default TaxableNightlyDiscountPhone;