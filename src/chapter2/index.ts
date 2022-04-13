class Movie {
  title: string = "";
  runningTime: number = 0;
  fee: Money =  new Money(0);
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

class TicketOffice {
  amount: Money = new Money(0);

  constructor(amount: Money) {
    this.amount = amount;
  }
}

interface DiscountCondition{
  isSatisfiedBy(screeing: Screening): boolean;
}

abstract class DiscountPolicy {
  duplicate: boolean = true;
  conditions: DiscountCondition[] = new Array();

  constructor(conditions: DiscountCondition[], duplicate: boolean) {
    this.conditions = conditions;
    this.duplicate = duplicate;
  }

  calculateDuplicate(screening: Screening): Money {
    let cal: Money = new Money(0);
    this.conditions.map((condition) => { 
      if(condition.isSatisfiedBy(screening)) {
        const a = this.getDiscountAmount(screening);
        cal.plusMoney(a);
      }
    });

    return cal;
  }

  calculateSingle(screening: Screening): Money {
    let cal: Money = new Money(0);
    if(this.conditions.find((condition) => condition.isSatisfiedBy(screening))) {
      cal = this.getDiscountAmount(screening);
    }

    return cal;
  }

  calculateDiscountAmount(screening: Screening): Money {
    let cal: Money = new Money(0);

    if(this.duplicate) {
      cal = this.calculateDuplicate(screening);
    }else {
      cal = this.calculateSingle(screening);
    }

   return cal;
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

  constructor(discountAmount: Money, conditions: DiscountCondition[], duplicate: boolean) {
    super(conditions, duplicate);
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

  constructor(percent: number, conditions: DiscountCondition[], duplicate: boolean) {
    super(conditions, duplicate);
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

  mtimes(money: Money): Money {
    return new Money(this.amount * money.amount);
  }

  isLessThan(other: Money): boolean {
    return this.amount / (other.amount) < 0;
  }

  isGreaterThanOrEqual(other: Money): boolean {
    return this.amount / (other.amount) >= 0;
  }
  
  plusMoney(money: Money) {
    this.amount  +=  money.amount;
  }
}

class Customer {
  fee: Money = new Money(0);
}

class Reservation {
  customer: Customer | null = null;
  screening: Screening | null = null;
  fee: Money = new Money(0);
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
  calFee: Money = new Money(0);

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

  reserve(customer: Customer, audienceCount: number, ticketOffice: TicketOffice): Reservation | undefined {
    const calculateFees = this.calculateFee(audienceCount);
    if(calculateFees) {
      customer.fee = calculateFees;
      ticketOffice.amount.plusMoney(customer.fee);
      return new Reservation(customer, this, calculateFees, audienceCount);
    }
    return undefined;
  }

  calculateFee(audienceCount: number): Money | undefined {
    if(this.movie) {
      const movieCalculateFee = this.movie.calculateMovieFee(this);
      if(movieCalculateFee) {
        this.calFee = movieCalculateFee.times(audienceCount)
        return this.calFee;
      }
    }
    return undefined;
  }
}

export {Movie, Screening, SequenceCondition, TicketOffice, DiscountPolicy, DiscountCondition, Money, PeriodCondition, PercenDiscountPolicy, AmountDiscountPolicy, Customer, Reservation};