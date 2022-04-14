import {Customer} from "../chapter4";
import {Money} from "../chapter2/index";

class Screening {
  private movie: Movie | null = null;
  private sequence: number = 0;
  private whenScreenedTime: number = 0;
  private whenScreenedDate: string = "";

  constructor(movie: Movie, sequence: number, whenScreenedTime: number, whenScreenedDate: string) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreenedTime = whenScreenedTime;
    this.whenScreenedDate = whenScreenedDate;
  }

  reserve(customer: Customer, audienceCount: number) {
    return new Reservation(customer, this, this.calculateFee(audienceCount), audienceCount);
  }

  getMovie(): Movie | undefined {
    if(this.movie) {
      return this.movie;
    }return undefined;
  }

  setMovie(movie: Movie): void {
    this.movie = movie;
  }

  getWhenScreenedTime(): number | 0 {
    if(this.movie) {
      return this.whenScreenedTime;
    }return 0;
  }

  setWhenScreenedTime(whenScreenedTime: number): void {
    this.whenScreenedTime = whenScreenedTime;
  }

  getWhenScreenedDate(): string | undefined {
    if(this.movie) {
      return this.whenScreenedDate;
    }return undefined;
  }

  setWhenScreenedDate(whenScreeneDate: string): void {
    this.whenScreenedDate = whenScreeneDate;
  }

  getSequence(): number | undefined {
    if(this.sequence) {
      return this.sequence;
    }return undefined;
  }

  setSequence(sequence: number): void {
    this.sequence = sequence;
  }

  private calculateFee( audienceCount: number): Money {
    if(this.movie) {
      return this.movie.calculateMovieFee(this).times(audienceCount);
    } return new Money(0);
  } 
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

interface DiscountCondition{
  isSatisfiedBy(screeing: Screening): boolean;
}

abstract class Movie {
  private title: string = "";
  private runningTime: number = 0;
  private fee: Money  = new Money(0);
  private discountCondition?: DiscountCondition[] | null = null;

  constructor(title: string, runningTime: number, fee: Money, discountCondition?: DiscountCondition[]) {
    this.title = title;
    this.runningTime = runningTime;
    this.fee = fee;
    this.discountCondition = discountCondition;
  }

  calculateMovieFee(screeing: Screening): Money {
    if(this.isDiscountable(screeing)) {
      return this.fee.minus(this.calculateDiscountAmount());
    }

    return this.fee;
  }

  isDiscountable(screeing: Screening): boolean {
    if(this.discountCondition?.find((condition) => condition.isSatisfiedBy(screeing))) {
      return true;
    } return false;
  }

  getFee(): Money {
    return this.fee;
  }

  abstract calculateDiscountAmount(): Money;
}

class PeriodCondition implements DiscountCondition {
  private dayOfWeek: string = "";
  private time: number = 0;

  constructor(dayOfWeek: string, time: number) {
    this.dayOfWeek = dayOfWeek;
    this.time = time;
  }

  isSatisfiedBy(screeing: Screening): boolean {
    return (this.dayOfWeek == screeing.getWhenScreenedDate() && screeing.getWhenScreenedTime() >= this.time)
  }
}

class SequenceCondition implements DiscountCondition {
  private sequence: number = 0;

  constructor(sequence: number) {
    this.sequence = sequence;
  }

  isSatisfiedBy(screeing: Screening): boolean {
    return this.sequence == screeing.getSequence();
  }
}

class AmountDiscountMovie extends Movie {
  discountAmount: Money = new Money(0);

  constructor(title: string, runningTime: number, fee: Money, discountAmount: Money, discountCondition: DiscountCondition[]) {
    super(title, runningTime, fee, discountCondition);
    this.discountAmount = discountAmount;
  }

  calculateDiscountAmount(): Money {
    return this.discountAmount;
  }
}

class PercentDiscountMovie extends Movie {
  private percent: number = 0;

  constructor(title: string, runningTime: number, fee: Money, percent: number, discountCondition: DiscountCondition[]) {
    super(title, runningTime, fee, discountCondition);
    this.percent = percent;
  }

  calculateDiscountAmount(): Money {
    return this.getFee().times(this.percent);
  }
}

class NoneDiscountMovie extends Movie {
  constructor(title: string, runningTime: number, fee: Money) {
    super(title, runningTime, fee);
  }

  calculateDiscountAmount(): Money {
    return new Money(0);
  }

}

export {Customer, Money, Screening, PeriodCondition, SequenceCondition, AmountDiscountMovie, PercentDiscountMovie, NoneDiscountMovie};