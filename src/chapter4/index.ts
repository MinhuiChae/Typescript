import {Money} from "../chapter2/index";

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

  getMovieType(): MovieType | undefined {
    if(this.movieType) {
      return this.movieType;
    }
    return undefined;
  }

  setMovieType(movieType: MovieType): void {
    this.movieType = movieType;
  }

  getFee(): Money {
    return this.fee;
  }

  setFee(fee: Money): void {
    this.fee = fee;
  }

  getDiscountConditions(): DiscountCondition[] | undefined {
    if(this.discountCondition) {
      return this.discountCondition;
    }
    return undefined;
  }

  setDiscountConditions(discountCondition: DiscountCondition[]) {
    this.discountCondition = discountCondition;
  }

  getDiscountAmount(): Money {
    return this.discountAmount;
  }

  setDiscountAmount(discountAmount: Money): void {
    this.discountAmount = discountAmount;
  }

  getDiscountPercent(): number {
    return this.discountPercent;
  }

  setDiscountPersent(discountPercent: number) {
    this.discountPercent = discountPercent;
  }

  calculateAmountDiscountedFee(): Money {
    if(this.movieType == MovieType.AMOUNT_DISCOUNT) {
      return this.fee.minus(this.discountAmount);
    } return new Money(0);
  }

  calculatePercentDiscountedFee(): Money {
    if(this.movieType == MovieType.PERCENT_DISCOUNT) {
      return this.fee.minus(this.fee.times(this.discountPercent));
    } return new Money(0);
  }

  calculateNoneDiscountedFee(): Money {
    if(this.movieType == MovieType.NONE_DISCOUNT) {
      return this.fee;
    } return new Money(0);
  }

  isDiscountable(attr: IDiscountable): boolean {
    if(this.discountCondition?.find((condition) => condition.getType() == DiscountConditionType.PERIOD)) {
      if(this.discountCondition.find((condition)=> condition.isDiscountable({dayOfWeek: attr.dayOfWeek, time: attr.time}))) {
        return true;
      }
    } else {
      if(this.discountCondition?.find((condition) => condition.isDiscountable({sequence: attr.sequence}))) {
        return true;
      }
    }

    return false;
  }
}

enum MovieType {
  AMOUNT_DISCOUNT = "amountDiscount",
  PERCENT_DISCOUNT = "percentDiscount",
  NONE_DISCOUNT = "noneDiscount"
}

enum DiscountConditionType {
  SEQUENCE = "sequence",
  PERIOD = "period"
}

interface IDiscountable {
  dayOfWeek?: string,
  time?: number,
  sequence?: number
}

class DiscountCondition {
  private type: DiscountConditionType | null = null;
  private sequence: number = 0;
  private dayOfWeek: string = "";
  private startTime: number = 0;

  getType(): DiscountConditionType | undefined{
    if(this.type) {
      return this.type;
    } return undefined;
  }

  setType(type: DiscountConditionType): void {
      this.type = type;
  }
  
  getDayOfWeek(): string {
    return this.dayOfWeek;
  }

  setDayOfWeek(dayOfWeek: string): void {
    this.dayOfWeek = dayOfWeek;
  }

  getStartTime(): number {
    return this.startTime;
  }

  setStartTime(startTime: number): void {
    this.startTime = startTime;
  }

  getSequence(): number {
    return this.sequence;
  }

  setSequence(sequence: number): void {
    this.sequence = sequence;
  }

  isDiscountable(attr: IDiscountable): boolean {
    if(this.type == DiscountConditionType.PERIOD && attr.time) {
     return (this.dayOfWeek == attr.dayOfWeek) && (this.startTime >= attr.time);
    } else if(this.type == DiscountConditionType.SEQUENCE) {
      return this.sequence == attr.sequence;
    } else {
      return false;
    }
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

  calculateFee(audienceCount: number): Money | undefined{
    switch (this.movie?.getMovieType()) {
      case MovieType.AMOUNT_DISCOUNT:
        if(this.movie.isDiscountable({dayOfWeek: this.whenScreenedDate, time: this.whenScreenedTime, sequence: this.sequence})) {
          return this.movie.calculateAmountDiscountedFee().times(audienceCount);
        } break;
      case MovieType.PERCENT_DISCOUNT:
        if(this.movie.isDiscountable({dayOfWeek: this.whenScreenedDate, time: this.whenScreenedTime, sequence: this.sequence})) {
          return this.movie.calculatePercentDiscountedFee().times(audienceCount);
        } break;
      case MovieType.NONE_DISCOUNT:
        return this.movie.calculateNoneDiscountedFee().times(audienceCount);
    }

    return this.movie?.getFee().times(audienceCount);
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

  getCustomer(): Customer | undefined {
    if(this.customer) {
      return this.customer;
    } return undefined;
  }

  setCustomer(customer: Customer): void {
    this.customer = customer;
  }

  getScreening(): Screening | undefined {
    if(this.screening) {
      return this.screening;
    } return undefined;
  }

  setScreening(screening: Screening): void {
    this.screening = screening;
  }

  getFee(): Money | undefined {
    if(this.fee) {
      return this.fee;
    }return undefined;
  }

  setFee(fee: Money): void {
    this.fee = fee;
  }

  getAudienceCount(): number | undefined{
    if(this.audienceCount) {
      return this.audienceCount;
    }return undefined;
  }

  setAudienceCount(audienceCount: number): void {
    this.audienceCount = audienceCount;
  }
}

class Customer {
  name: string = "";
  id: string = "";

  constructor(name: string, id: string) {
    this.id = id;
    this.name = name;
  }
}

class ReservationAgency {
  reserve(screening: Screening, customer: Customer, audienceCount: number): Reservation | undefined {
    let fee = screening.calculateFee(audienceCount);
    if(fee)
    return new Reservation(customer, screening, fee, audienceCount);
  }
}

export {ReservationAgency, Customer, Screening, DiscountCondition, Movie, MovieType, DiscountConditionType};
