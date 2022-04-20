import {RatePolicy, Money, Phone} from "./interface";

abstract class AdditionalRatePolicy implements RatePolicy {
  private next: RatePolicy | null = null;

  constructor(next: RatePolicy) {
    this.next = next;
  }

  calculateFee(phone: Phone): Money {
    if(this.next) {
      let fee = this.next.calculateFee(phone);
      return this.afterCalculated(fee);
    } return new Money(0);
  }

  abstract afterCalculated(fee: Money): Money;
}

export default AdditionalRatePolicy;