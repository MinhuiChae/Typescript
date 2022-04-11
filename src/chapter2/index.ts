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
  duplicate: boolean = true;
  conditions: DiscountCondition[] = new Array();
  discountPercent: number = 0;

  constructor(conditions: DiscountCondition[], duplicate: boolean, discountPercent: number) {
    this.conditions = conditions;
    this.duplicate = duplicate;
    this.discountPercent = discountPercent;
  }

  //중복일 때와 아닐때 cal 값을 구하고 cal을 리턴
  //중복일 때 = duplicate가 true 이면 discountcondition 조건에 맞는 할인값을 구하고  할인값을 true 수 만큼 더해준다. 그 할인값을 리턴해준다. 
  //중복이 아닐 때 = duplicate가 false 이면 discountcondition 조건에 맞는 할인값을 구하고  할인 값을 한 번만 리턴해준다.


  calculateDuplicate(screening: Screening): Money {
    let cal: Money = new Money(0);
    this.conditions.map((condition, i) => { 
      if(condition.isSatisfiedBy(screening)) {
        const a = this.getDiscountAmount(screening).timesMoney(this.discountPercent);
        console.log(a);
        cal.plusMoney(a); /// 
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

    // let sum: number = 0;
    // 1000 이중 한개라도 있으면  800 디스카운트 하면 된다.
    // let discountCondition: DiscountCondition | undefined =  this.conditions.find((condition) => condition.isSatisfiedBy(screening));
    // [true, false, true, false, true]; //2400

    if(this.duplicate) {
      cal = this.calculateDuplicate(screening);
    }else {
      cal = this.calculateSingle(screening);
    }

    // const condition = this.conditions.find((condition) => condition.isSatisfiedBy(screening));
    // if (condition) {
    //   cal.plusMoney(this.getDiscountAmount(screening)); 
    // }
     
   return cal;
  }

  isDuplicate():boolean {
    return this.duplicate;
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

  constructor(discountAmount: Money, conditions: DiscountCondition[], duplicate: boolean , discountPercent: number) {
    super(conditions, duplicate, discountPercent);
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

  constructor(percent: number, conditions: DiscountCondition[], duplicate: boolean, discountPercent: number) {
    super(conditions, duplicate, discountPercent);
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
  
  plusMoney(money: Money) {
    this.amount  +=  money.amount;
  }

  timesMoney(money: number): Money {
    this.amount = this.amount;

    return new Money(this.amount *= money);
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