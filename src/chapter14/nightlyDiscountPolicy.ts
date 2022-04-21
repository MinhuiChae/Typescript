import {BasicRatePolicy, Call, Money } from './basicRatePolicy';

class NightlyDiscountPolicy extends BasicRatePolicy {
  private static LATE_NIGHT_HOUR: number = 22;

  private nightlyAmount: Money = new Money(0);
  private regularAmount: Money = new Money(0);
  private seconds: number = 0;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number){
    super();
    this.nightlyAmount = nightlyAmount;
    this.regularAmount = regularAmount;
    this.seconds = seconds;
  }

  calculateCallFee(call: Call): Money {
    if(call.getFrom().getHours() >= NightlyDiscountPolicy.LATE_NIGHT_HOUR) {
      return this.nightlyAmount.times(Math.ceil(call.getDuration() / this.seconds))
    }
    return this.regularAmount.times(Math.ceil(call.getDuration() / this.seconds));
  }
}

export default NightlyDiscountPolicy;