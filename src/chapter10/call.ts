import DateTimeInterval from "../chapter14/dateTimeInterval";

class Call {
  private interval: DateTimeInterval | null = null;

  constructor(from: Date, to: Date) {
    this.interval = DateTimeInterval.of(from, to);
  }

  getDuration(): number {
    if(this.interval) {
      0
    } return 0;
  }

  getFrom(): Date {
    if(this.interval) {
      return this.interval.getFrom();
    } return new Date(0);
  }

  getTo(): Date {
    if(this.interval) {
      return this.interval?.getTo();
    } return new Date(0);
  }

  getInterval(): DateTimeInterval | undefined {
    if(this.interval) {
      return this.interval;
    }
  }
}

export default Call;