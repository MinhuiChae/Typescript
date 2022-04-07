class Movie {
  title: string = "";
  runningTime: number = 0;
  fee: Money | null = null;
  discountPolicy: DiscountPolicy;

  constructor(title: string, runningTime: number, fee: Money, discountPolicy: DiscountPolicy) {
    this.title = title;
    this.runningTime = runningTime;
    this.fee = fee;
    this.discountPolicy = discountPolicy;
  }

  getFee(): Money | null {
    if(this.fee) {
      return this.fee;
    }else {
      return null;
    }
  }

  calculateMovieFee(screening : Screening):Money | undefined{
    if(this.fee) {
      return this.fee.minus(this.discountPolicy.calculateDiscountAmount(screening));
    }
  }
}

interface DiscountCondition{
  isSatisfiedBy(screeing: Screening): boolean;
}

abstract class DiscountPolicy {
  conditions: DiscountCondition[] = new Array();

  constructor(conditions: DiscountCondition[]) {
    this.conditions = conditions;
  }

  calculateDiscountAmount(screening: Screening): Money {
    this.conditions.map((a) => {
      if(a.isSatisfiedBy(screening)) {
        return this.getDiscountAmount(screening);
      }else {
        return 0;
      }
    })
    return new Money(0) || Money;
  }

  abstract getDiscountAmount(screening: Screening): Money;
}

class SequenceCondition implements DiscountCondition {
 sequence: number = 0;

 constructor(sequence: number) {
   this.sequence = sequence;
 }

 isSatisfiedBy(screeing: Screening): boolean {
   return screeing.isSequence(this.sequence);
 }
}

interface DayOfWeek {

}

interface LocalTime {

}

class PeriodCondition implements DiscountCondition {
  dayOfWeek: DayOfWeek | null = null;
  startTime: LocalTime | null = null;
  endTime: LocalTime | null = null;

  constructor(dayOfWeek: DayOfWeek, startTime: LocalTime, endTime: LocalTime) {
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  isEqualStartTime(screeing: Screening): boolean {
    if(this.startTime && this.endTime) {
      this.startTime <= screeing.getStartTime() <= this.endTime
    }
    return true;
  }

  isSatisfiedBy(screeing: Screening): boolean {
    return (screeing.getDayOfWeek == this.dayOfWeek) && this.isEqualStartTime(screeing);
  }

} 

class AmountDiscountPolicy extends DiscountPolicy {
  discountAmount: Money | null = null;

  constructor(discountAmount: Money, conditions: DiscountCondition[]) {
    super(conditions);
    this.discountAmount = discountAmount;
  }
  
  protected getDiscountAmount(screening: Screening): Money | undefined{
    if(this.discountAmount) {
      return this.discountAmount;
    }
    
  }
}

class Money {
  amount: number = 0 ;

  constructor(amount: number) {
    this.amount = amount;
  }

  wons(amount: number): Money {
    return new Money(amount);
  }

  Money(amount: number) {
    this.amount == amount;
  }

  plus(amount: Money): Money {
    return new Money(this.amount += amount.amount);
  }

  minus(amount: Money): Money {
    return new Money(this.amount -= amount.amount);
  }

  times(percent: number): Money {
    return new Money(percent / this.amount);
  }

  isLessThan(other: Money): boolean {
    return this.amount / (other.amount) < 0;
  }

  isGreaterThanOrEqual(other: Money): boolean {
    return this.amount / (other.amount) >= 0;
  }

}

class Customer {

}

class Reservation {
  customer: Customer | null = null;
  screening: Screening | null = null;
  fee: Money | null = null;
  audienceCount: number = 0;

  constructor(customer: Customer, screening: Screening, fee: Money, audienceCount: number) {
    this.customer = customer;
    this.screening = screening;
    this.fee = fee;
    this.audienceCount = audienceCount;
  }

}




class Screening {
  movie: Movie | null = null;
  sequence: number= 0;
  whenScreenedTime: number= 0;
  whenScreenedDate: number= 0;


  constructor(movie: Movie, sequence: number, whenScreenedTime: number, whenScreenedDate: number) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreenedTime = whenScreenedTime;
    this.whenScreenedDate = whenScreenedDate;
  }

  getStartTime(): number {
    return this.whenScreenedTime;
  }

  getDayOfWeek(): number {
    return this.whenScreenedDate;
  }

  isSequence(sequence: number): boolean {
    return this.sequence == sequence;
  }

  getMovieFee(): Money | null {
    if(this.movie) {
      return this.movie.getFee();
    }
    return null;
  }

  // reserve(customer: CustomElementRegistry, audienceCount: number): Reservation {
  //   return new Reservation(customer, this, calculateFee(audienceCount), audienceCount);
  // }

  // calculateFee(audienceCount: number): Money | undefined {
  //   if(this.movie) {
  //     return this.movie.calculateMovieFee(this).times(audienceCount);
  //   }
  // }
}

export {Movie, Screening, SequenceCondition, DiscountPolicy, DiscountCondition, Money};