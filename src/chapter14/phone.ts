import {RatePolicy, Call, Money} from './interface';


class Phone {
  private ratePolicy: RatePolicy | null = null;
  calls: Call[] = new Array();

  constructor(ratePolicy: RatePolicy) {
    this.ratePolicy = ratePolicy;
  }

  calculateFee(): Money | undefined {
    return this.ratePolicy?.calculateFee(this);
  }
}

export default Phone;
