import {RatePolicy, Money} from "./interface";
import AdditionalRatePolicy from './additionalRatePolicy';

class TaxablePolicy extends AdditionalRatePolicy {
  private taxRatio: number = 0;

  constructor(taxRatio: number, next: RatePolicy) {
    super(next);
    this.taxRatio = taxRatio;
  }

  afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRatio));
  }
}

export default TaxablePolicy;