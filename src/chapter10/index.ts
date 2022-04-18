import { Money } from "../chapter2";

class Call {
  private from: Date | null = null; //통화 시작 시간
  private to: Date | null = null; //통화 종료 시간

  constructor(from: Date, to: Date) {
    this.from = from;
    this.to = to;
  }

  getDuration(): number {
    let toMinute = this.to?.getTime();
    let fromMinute = this.from?.getTime();

    if(toMinute && fromMinute) {
      return (toMinute - fromMinute)/1000;
    }
    return 0;
  }

  getForm(): Date {
    if(this.from) {
      return this.from;
    } return new Date(0);
  } 

}

abstract class AbstractPhone {
  calls: Call[] = new Array();

  calculateFee(): Money {
    let result: Money = new Money(0);

    if(this.calls?.map((call:Call) => result.plus(this.calculateCallFee(call)))) {
      return result;
    } return new Money(0);
  }

  abstract calculateCallFee(call: Call): Money;
}

class Phone extends AbstractPhone {
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

class NightlyDiscountPhone extends AbstractPhone {
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

    if(call.getForm().getHours()>= NightlyDiscountPhone.LATE_NIGHT_HOUR) {
      return this.nightlyAmount.times(call.getDuration()/this.seconds)
    } else {
      return this.regularAmount.times(call.getDuration()/this.seconds)
    }
  }
}



export {Call, Phone, Money, NightlyDiscountPhone};