import {Money} from "../chapter2/index";

class Movie {
  title: string = "";
  runningTime: number = 0;
  fee: Money  = new Money(0);
  discountCondition: DiscountCondition[] | null = null;

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

class DiscountCondition {
  type: DiscountConditionType | null = null;
  sequence: number = 0;
  dayOfWeek: string = "";
  startTime: number = 0;

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
  reserve(screening: Screening, customer: Customer, audienceCount: number): Reservation {
    let movie =  screening.getMovie();

    let discountable: boolean = false;

    let condition = movie?.getDiscountConditions();
    
    if(condition?.find((condition) => condition.getType() == DiscountConditionType.PERIOD)) {
      condition.find((condition) => {
        discountable = (screening.getWhenScreenedDate() == condition.getDayOfWeek() && (condition.getStartTime() <= screening.getWhenScreenedTime()));
      })
    } else {
      condition?.find((condition) => {
        discountable = (condition.getSequence() == screening.getSequence());
        console.log(discountable);
      })
    }
    
    let fee:Money = new Money(0);
    if(discountable) {
      let discountAmount: Money = new Money(0);
      switch(movie?.getMovieType()) {
        case MovieType.AMOUNT_DISCOUNT:
          discountAmount = movie.getDiscountAmount();
          break;
        case MovieType.PERCENT_DISCOUNT:
          discountAmount = movie.getFee().times(movie.getDiscountPercent());
          break;
        case MovieType.NONE_DISCOUNT:
          discountAmount = new Money(0);
          break;
      }
      if(movie) {
        fee = movie.getFee().minus(discountAmount);
      }
    } else {
      if(movie) {
        fee = movie?.getFee();
      }
    }

    return new Reservation(customer, screening, fee.times(audienceCount), audienceCount);
  }
}

export {ReservationAgency, Customer, Screening, DiscountCondition, Movie, MovieType, DiscountConditionType};

//--------------------------------------------------------------------------------------------------------------------------------------------

class Rectangle {
  private left: number = 0;
  private top: number = 0;
  private right: number = 0;
  private bottom: number = 0;

  constructor(left: number, top: number, right: number, bottom: number) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }

  getLeft(): number {
    return this.left;
  }

  setLeft(left: number): void {
    this.left = left;
  }

  getTop(): number {
    return this.top;
  }

  setTop(top: number): void {
    this.top = top;
  }

  getRight(): number {
    return this.right;
  }

  setRight(right: number): void {
    this.right = right;
  }

  getBottom(): number {
    return this.bottom;
  }

  setBottom(bottom: number): void {
    this.bottom = bottom;
  }

}