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

  calculateMovieFee(screening: Screening): Money | undefined{
    const discountScreening = this.discountPolicy.calculateDiscountAmount(screening);
    if(this.fee) {
      if(discountScreening)
      return this.fee.minus(discountScreening);
    }
  }
}

interface DiscountCondition{
  isSatisfiedBy(screeing: Screening): boolean;
}

abstract class DiscountPolicy {
  conditions: DiscountCondition[] = new Array();
  msg: string = "";
  constructor(conditions: DiscountCondition[]) {
    this.conditions = conditions;
  }

  calculateDiscountAmount(screening: Screening): Money | undefined {
   let cal: Money | null = null;

    this.conditions.map((a) => {
      if(a.isSatisfiedBy(screening)) {
        cal =  this.getDiscountAmount(screening);
      }else {
        cal = new Money(0);
      }
    })
    if(cal) {
      return cal;
    } return undefined;
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
  day: string
}

interface LocalTime {
  startTime: number,
  endTime: number
}

class PeriodCondition implements DiscountCondition {
  dayOfWeek: string | null = null;
  startTime: number = 0;
  endTime: number = 0;

  constructor(day: DayOfWeek, time:LocalTime) {
    this.dayOfWeek = day.day;
    this.startTime = time.startTime;
    this.endTime = time.endTime;
  }

  isEqualScreeningTime(screeing: Screening): boolean {
    if(screeing.getStartTime() >= this.startTime && screeing.getStartTime() <= this.endTime) {
      return true;
    }else {
      return false;
    }
  }

  isEqualDayOfWeek(screeing: Screening): boolean {
    if(this.dayOfWeek === screeing.getDayOfWeek()) {
      return true;
    }else {
      return false;
    }
  }

  isEqualAll(screeing: Screening): boolean {
    if(this.isEqualDayOfWeek(screeing) && this.isEqualScreeningTime(screeing)) {
      return true;
    }else {
      return false;
    }
  }

  isSatisfiedBy(screeing: Screening): boolean {
    return this.isEqualAll(screeing);
  }

} 

class AmountDiscountPolicy extends DiscountPolicy {
  discountAmount: Money | null = null;

  constructor(discountAmount: Money, conditions: DiscountCondition[]) {
    super(conditions);
    this.discountAmount = discountAmount;
  }
  
  getDiscountAmount(screening: Screening): Money {
    if(this.discountAmount) {
      return this.discountAmount;
    }
    return new Money (0);
  }
}

class PercenDiscountPolicy extends DiscountPolicy {
  percent: number = 0;

  constructor(percent: number, conditions: DiscountCondition[]) {
    super(conditions);
    this.percent = percent;
  }

  getDiscountAmount(screening: Screening): Money {
    const movieFee = screening.getMovieFee();
    if(movieFee) {
      return movieFee.times(this.percent);
    }
    return new Money(0);
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
    return new Money(percent *  this.amount);
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
  whenScreenedDate: string = "";

  constructor(movie: Movie, sequence: number, whenScreenedTime: number, whenScreenedDate: string) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreenedTime = whenScreenedTime;
    this.whenScreenedDate = whenScreenedDate;
  }

  getStartTime(): number {
    return this.whenScreenedTime;
  }

  getDayOfWeek(): string {
    return this.whenScreenedDate;
  }

  isSequence(sequence: number): boolean {
    return this.sequence == sequence;
  }

  getMovieFee(): Money | null {
    if(this.movie) {
      return this.movie.getFee();
    } else {
      return null;
    }
  }

  reserve(customer: Customer, audienceCount: number): Reservation | undefined {
    const calculateFees = this.calculateFee(audienceCount);
    if(calculateFees) {
      return new Reservation(customer, this, calculateFees, audienceCount);
    }
    return undefined;
  }

  calculateFee(audienceCount: number): Money | undefined {
    if(this.movie) {
      const movieCalculateFee = this.movie.calculateMovieFee(this);
      if(movieCalculateFee) {
        return movieCalculateFee.times(audienceCount);
      }
    }
    return undefined;
  }
}

export {Movie, Screening, SequenceCondition, DiscountPolicy, DiscountCondition, Money, PeriodCondition, PercenDiscountPolicy, AmountDiscountPolicy, Customer, Reservation};