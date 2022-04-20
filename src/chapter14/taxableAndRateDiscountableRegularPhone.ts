import {RatePolicy, Money} from "./interface";
import TaxableRegularPhone from './taxableRegularPhone';

class TaxableAndRateDiscountableRegularPhone extends TaxableRegularPhone {
  private discountAmount: Money = new Money(0);

  constructor(amount: Money, seconds: number, taxRate: number, discountAmount: Money, ratePolicy: RatePolicy) {
    super(amount, seconds, taxRate, ratePolicy);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return super.afterCalculated(fee).minus(this.discountAmount);
  }
}

export default TaxableAndRateDiscountableRegularPhone;