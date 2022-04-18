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

class Phone {
  private amount: Money = new Money(0);
  private seconds: number = 0;
  private calls: Call[] = new Array();

  constructor(amount: Money, seconds: number) {
    this.amount = amount;
    this.seconds = seconds;
  }

  call(call: Call): void {
    if(this.calls) {
      this.calls.push(call);
    }
  }

  getCalls(): Call[] | undefined {
    if(this.calls)
    return this.calls;
  }

  getAmount(): Money {
    return this.amount;
  }

  getSeconds(): number {
    return this.seconds;
  }

  calculateFee(): Money {
    let result: Money = new Money(0);

    if(this.calls?.map((call:Call) => result.plus(this.calculateCallFee(call)))) {
      return result;
    } else {
      return new Money(0);
    }
  }

  calculateCallFee(call: Call): Money {
    return this.amount.times(call.getDuration()/this.seconds);
  }
}

class NightlyDiscountPhone {
  private static LATE_NIGHT_HOUR: number = 22;

  private nightlyAmount: Money = new Money(0);
  private regularAmount: Money = new Money(0);
  private seconds: number = 0;
  private calls: Call[] = new Array();

  constructor(nightlyAmount: Money, regularAmount: Money, seconds: number) {
    this.nightlyAmount = nightlyAmount;
    this.regularAmount = regularAmount;
    this.seconds = seconds;
  }

  calculateFee(): Money {
    let result: Money = new Money(0);

    if(this.calls?.map((call:Call) => result.plus(this.calculateCallFee(call)))) {
      return result;
    } return new Money(0);
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