import {BasicRatePolicy, Call, Money } from './basicRatePolicy';

class RegularPolicy extends BasicRatePolicy {
  private amount: Money = new Money(0);
  private seconds: number = 0;

  constructor(amount: Money, seconds: number) {
    super();
    this.amount = amount;
    this.seconds = seconds;
  }

  calculateCallFee(call: Call): Money {
    return this.amount.times(call.getDuration() / this.seconds);
  }
}

export default RegularPolicy;