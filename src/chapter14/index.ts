import { Call, Money } from "../chapter10";

 class Phone {
  private ratePolicy: RatePolicy | null = null;
  calls: Call[] = new Array();

  constructor(ratePolicy: RatePolicy) {
    this.ratePolicy = ratePolicy;
  }

  calculateFee(): Money | undefined {
    return this.ratePolicy?.calculateFee(this);
  }
}

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

class NightlyDiscountPhone extends Phone {
  private static LATE_NIGHT_HOUR: number = 22;

  private nightlyAmount: Money = new Money(0);
  private regularAmount: Money = new Money(0);
  private seconds: number = 0;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, ratePolicy: RatePolicy) {
    super(ratePolicy);
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

  constructor(amount: Money, seconds: number, taxRate: number, ratePolicy: RatePolicy) {
    super(amount, seconds, ratePolicy);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}

class TaxableNightlyDiscountPhone extends NightlyDiscountPhone {
  private taxRate: number = 0;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, taxRate: number, ratePolicy: RatePolicy) {
    super(nightlyAmount, regularAmount, seconds, ratePolicy);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return fee.plus(fee.times(this.taxRate));
  }
}

class RateDiscountableRegularPhone extends RegularPhone {
  private discountAmount: Money = new Money(0);

  constructor(amount: Money, seconds: number, discountAmount: Money, ratePolicy: RatePolicy) {
    super(amount, seconds, ratePolicy);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount)
  }
}

class RateDiscountableNightlyDiscountPhone extends NightlyDiscountPhone {
  private discountAmount: Money = new Money(0);

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, discountAmount: Money, ratePolicy: RatePolicy) {
    super(nightlyAmount, regularAmount, seconds, ratePolicy);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return fee.minus(this.discountAmount);
  }
}

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

class RateDiscountableAndTaxableRegularPhone extends RateDiscountableRegularPhone {
  private taxRate: number = 0;

  constructor(amount: Money, seconds: number, discountAmount: Money, taxRate: number, ratePolicy: RatePolicy) {
    super(amount, seconds, discountAmount, ratePolicy);
    this.taxRate = taxRate;
  }

  afterCalculated(fee: Money): Money {
    return super.afterCalculated(fee).plus(fee.times(this.taxRate));
  }
}

class TaxableAndDiscountableNightlyDiscountPhone extends TaxableNightlyDiscountPhone {
  private discountAmount: Money = new Money(0);

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, taxRate: number, discountAmount: Money, ratePolicy: RatePolicy) {
    super(nightlyAmount, regularAmount, seconds, taxRate, ratePolicy);
    this.discountAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return super.afterCalculated(fee).minus(this.discountAmount);
  }
}

class RateDiscountableAndTaxableNightlyDiscountPhone extends RateDiscountableNightlyDiscountPhone {
  private taxRate: number = 0;

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number, taxRate: number, discountAmount: Money, ratePolicy: RatePolicy) {
    super(nightlyAmount, regularAmount, seconds, discountAmount, ratePolicy);
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

class RateDiscountablePolicy extends AdditionalRatePolicy {
  private discoutAmount: Money = new Money(0);

  constructor(discountAmount: Money, next: RatePolicy) {
    super(next);
    this.discoutAmount = discountAmount;
  }

  afterCalculated(fee: Money): Money {
    return fee.minus(this.discoutAmount);
  }
}

//추가시작

class  FixedFeePolicy extends BasicRatePolicy {
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

class DateTimeInterval {
  private from: Date | null = null;
  private to: Date | null = null;

  constructor(from: Date, to: Date) {
    this.from = from;
    this.to = to;
  }

  static of(from: Date, to: Date): DateTimeInterval {
    return new DateTimeInterval(from, to);
  }
  
  static toMidnight(from: Date): DateTimeInterval {
    return new DateTimeInterval(from, new Date(23, 59, 59, 999_999_999));
  }

  static fromMidnight(from: Date, to: Date): DateTimeInterval {
    return new DateTimeInterval(from, to);
  }

  static during(from: Date, to: Date): DateTimeInterval {
    return new DateTimeInterval(from, to);
  }
}

export {Phone, RegularPhone, NightlyDiscountPhone, RateDiscountablePolicy, TaxableRegularPhone, TaxableNightlyDiscountPhone, RateDiscountableRegularPhone, RateDiscountableNightlyDiscountPhone, TaxableAndRateDiscountableRegularPhone, RateDiscountableAndTaxableRegularPhone, TaxableAndDiscountableNightlyDiscountPhone, RateDiscountableAndTaxableNightlyDiscountPhone, RegularPolicy, NightlyDiscountPolicy};

