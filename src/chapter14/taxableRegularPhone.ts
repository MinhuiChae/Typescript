import {RatePolicy, Money} from './interface';
import RegularPhone from './regularPhone';

class TaxableRegularPhone extends RegularPhone {
  private taxRate: number = 0;

  constructor(amount: Money, seconds: number, taxRate: number, ratePolicy: RatePolicy) {
    super(amount, seconds, ratePolicy);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}

export default TaxableRegularPhone;