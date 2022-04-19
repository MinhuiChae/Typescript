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

  afterCalculated(fee: Money) {
    return fee;
  }

  abstract calculateCallFee(call: Call): Money;
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
}

class TaxableRegularPhone extends RegularPhone {
  private taxRate: number = 0;

  constructor(amount: Money, seconds: number, taxRate: number) {
    super(amount, seconds);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}

class TaxableNightlyDiscountPhone extends NightlyDiscountPhone {
  private taxRate: number = 0;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, taxRate: number) {
    super(nightlyAmount, regularAmount, seconds);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}

class RateDiscountableRegularPhone extends RegularPhone {
  private discountAmount: Money = new Money(0);

  constructor(amount: Money, seconds: number, discountAmount: Money) {
    super(amount, seconds);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount)
  }
}

class RateDiscountableNightlyDiscountPhone extends NightlyDiscountPhone {
  private discountAmount: Money = new Money(0);

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, discountAmount: Money) {
    super(nightlyAmount, regularAmount, seconds);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount);
  }
}

class TaxableAndRateDiscountableRegularPhone extends TaxableRegularPhone {
  private discountAmount: Money = new Money(0);

  constructor(amount: Money, seconds: number, taxRate: number, discountAmount: Money) {
    super(amount, seconds, taxRate);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return super.afterCalculated(fee).minus(this.discountAmount);
  }
}

class RateDiscountableAndTaxableRegularPhone extends RateDiscountableRegularPhone {
  private taxRate: number = 0;

  constructor(amount: Money, seconds: number, discountAmount: Money, taxRate: number) {
    super(amount, seconds, discountAmount);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return super.afterCalculated(fee).plus(fee.times(this.taxRate));
  }
}

class TaxableAndDiscountableNightlyDiscountPhone extends TaxableNightlyDiscountPhone {
  private discountAmount: Money = new Money(0);

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, taxRate: number, discountAmount: Money) {
    super(nightlyAmount, regularAmount, seconds, taxRate);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return super.afterCalculated(fee).minus(this.discountAmount);
  }
}

class RateDiscountableAndTaxableNightlyDiscountPhone extends RateDiscountableNightlyDiscountPhone {
  private taxRate: number = 0;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, taxRate: number, discountAmount: Money) {
    super(nightlyAmount, regularAmount, seconds, discountAmount);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return super.afterCalculated(fee).plus(fee.times(this.taxRate));
  }
}

interface RatePolicy {
  calculateFee(phone: Phone): Money;
}

abstract class BasicRatePolicy implements RatePolicy {
  calculateFee(phone: Phone): Money {
    let result = new Money(0);
    let call: Call[] = phone.calls;

    call.map((call: Call) => result.plus(this.calculateCallFee(call)));

    return result;
  }

  abstract calculateCallFee(call: Call): Money;
}

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
      return this.nightlyAmount.times(call.getDuration() / this.seconds)
    }

    return this.regularAmount.times(call.getDuration() / this.seconds);
  }
}