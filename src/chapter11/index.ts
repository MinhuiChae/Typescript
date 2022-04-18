import { Call, Money } from "../chapter10";

abstract class Phone {
  calls: Call[] = new Array();

  calculateFee(): Money {
    let result: Money = new Money(0);

    if(this.calls?.map((call:Call) => result.plus(this.calculateCallFee(call)))) {
      return result;
    } else {
      return this.afterCalculated(result);
    }
  }

  abstract calculateCallFee(call: Call): Money;
  abstract afterCalculated(fee: Money): Money;
}

class RegularPhone extends Phone {
  private amount: Money = new Money(0);
  private seconds: number = 0;

  constructor(amount: Money, seconds: number) {
    super();
    this.amount = amount;
    this.seconds = seconds;
  }

  calculateCallFee(call: Call): Money {
    return this.amount.times(call.getDuration()/this.seconds);
  }

  afterCalculated(fee: Money): Money {
    return fee;
  }
}

class NightlyDiscountPhone extends Phone {
  private static LATE_NIGHT_HOUR: number = 22;

  private nightlyAmount: Money = new Money(0);
  private regularAmount: Money = new Money(0);
  private seconds: number = 0;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number) {
    super();
    this.nightlyAmount = nightlyAmount;
    this.regularAmount = regularAmount;
    this.seconds = seconds;
  }

  calculateCallFee(call: Call): Money {

    if(call.getFrom().getHours()>= NightlyDiscountPhone.LATE_NIGHT_HOUR) {
      return this.nightlyAmount.times(call.getDuration()/this.seconds)
    } else {
      return this.regularAmount.times(call.getDuration()/this.seconds)
    }
  }

  afterCalculated(fee: Money): Money {
    return fee;
  }
}

class TaxableRegularPhone extends RegularPhone {
  private taxRate: number = 0;

  constructor(amount: Money, seconds: number, taxRate: number) {
    super(amount, seconds);
    this.taxRate = taxRate;
  }

  calculateFee(): Money {
    let fee = super.calculateFee();
    return fee.plus(fee.times(this.taxRate));
  }
}
