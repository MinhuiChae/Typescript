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

  getFee(): Money {
    if(this.fee) {
      return this.fee;
    }
    return 0;
  }

  calculateMovieFee(Screening : Screening):Money {
    return this.fee.minus(discountPolicy.calculateDiscountAmount(Screening));
  }

}

abstract class DiscountPolicy {

}

class Money {
  
}

class Screening {
  movie: Movie | null = null;
  sequence: number= 0;
  whenScreened: number= 0;

  constructor(movie: Movie, sequence: number, whenScreened: number) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreened = whenScreened;
  }

  getStartTime(): number {
    return this.whenScreened;
  }

  isSequence(sequence: number): boolean {
    return this.sequence == sequence;
  }

  getMovieFee(): Money {
    if(this.movie) {
      return this.movie.getFee();
    }
    return 0;
  }

  reserve(customer: CustomElementRegistry, audienceCount: number): Reservation {
    return new Reservation(customer, this, calculateFee(audienceCount), audienceCount);
  }

  calculateFee(audienceCount: number): Money | undefined {
    if(this.movie) {
      return this.movie.calculateMovieFee(this).times(audienceCount);
    }
  }
}

