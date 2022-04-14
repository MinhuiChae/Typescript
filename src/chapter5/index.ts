import {Customer, MovieType, DiscountConditionType} from "../chapter4";
import {DiscountPolicy, Money} from "../chapter2/index";

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

class DiscountCondition{
  private type: DiscountConditionType | null = null;
  private sequence: number = 0;
  private dayOfWeek: string = "";
  private startTime: number = 0;

  isSatisfiedBy(screeing: Screening): boolean {
    if(this.type == DiscountConditionType.PERIOD) {
      return this.isSatisfiedByPeriod(screeing);
    }

    return this.isSatiesfiedBySequence(screeing);
  }

  isSatisfiedByPeriod(screeing: Screening): boolean {
    return (this.dayOfWeek == screeing.getWhenScreenedDate() && screeing.getWhenScreenedTime() >= this.startTime)
  }

  isSatiesfiedBySequence(screeing: Screening): boolean {
    return this.sequence == screeing.getSequence();
  }
}

class Movie {
  private title: string = "";
  private runningTime: number = 0;
  private fee: Money  = new Money(0);
  private discountCondition: DiscountCondition[] | null = null;

  constructor(title: string, runningTime: number, fee: Money, discountCondition: DiscountCondition[]) {
    this.title = title;
    this.runningTime = runningTime;
    this.fee = fee;
    this.discountCondition = discountCondition;
  }

  movieType: MovieType | null = null;
  discountAmount: Money = new Money(0);
  discountPercent: number = 0;

  calculateMovieFee(screening: Screening): Money {
   if(this.isDiscountable(screening)) {
     return this.fee.minus(this.calculateDiscountAmount());
   }
   return this.fee;
  }

  private isDiscountable(screeing: Screening): boolean {
     if(this.discountCondition?.map((condition) => condition.isSatisfiedBy(screeing))) {
       return true;
     } return false;
  }

  private calculateDiscountAmount(): Money {
    switch(this.movieType) {
      case MovieType.AMOUNT_DISCOUNT:
        return this.calculateAmountDiscountAmount();
      case MovieType.PERCENT_DISCOUNT:
        return this.calculatePercentDiscountAmount();
      case MovieType.NONE_DISCOUNT:
        return this.calculateNoneDiscountAmount();
    } return new Money(0);
  }

  private calculateAmountDiscountAmount() {
    return this.discountAmount;
  }

  private calculatePercentDiscountAmount() {
    return this.fee.times(this.discountPercent);
  }

  private calculateNoneDiscountAmount() {
    return new Money(0);
  }

}
