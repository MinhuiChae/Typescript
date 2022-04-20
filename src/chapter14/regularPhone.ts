import {RatePolicy, Call, Money, Phone} from "./interface";

class RegularPhone extends Phone {
  private amount: Money = new Money(0);
  private seconds: number = 0;

  constructor(amount: Money, seconds: number, ratePolicy: RatePolicy) {
    super(ratePolicy);
    this.amount = amount;
    this.seconds = seconds;
  }

  calculateCallFee(call: Call): Money {
    return this.amount.times(call.getDuration()/this.seconds);
  }
}

export default RegularPhone;