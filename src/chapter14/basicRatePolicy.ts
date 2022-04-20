import {RatePolicy, Call, Money, Phone} from "./interface";

abstract class BasicRatePolicy implements RatePolicy {
  calculateFee(phone: Phone): Money {
    let result = new Money(0);
    let call: Call[] = phone.calls;

    call.map((call: Call) => result.plus(this.calculateCallFee(call)));

    return result;
  }

  abstract calculateCallFee(call: Call): Money;
}

export {BasicRatePolicy, RatePolicy, Call, Money, Phone };