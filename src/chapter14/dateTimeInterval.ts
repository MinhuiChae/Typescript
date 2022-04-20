class DateTimeInterval {
  private from: Date | null = null;
  private to: Date | null = null;

  constructor(from: Date, to: Date) {
    this.from = from;
    this.to = to;
  }

  static of(from: Date, to: Date): DateTimeInterval {
    return new DateTimeInterval(from, to);
  }
  
  static toMidnight(from: Date): DateTimeInterval {
    return new DateTimeInterval(from, new Date(23, 59, 59, 999_999_999));
  }

  static during(from: Date, to: Date): DateTimeInterval {
    return new DateTimeInterval(from, to);
  }

  duration(): number {
    let toMinute = this.to?.getTime();
    let fromMinute = this.from?.getTime();

    if(toMinute && fromMinute) {
      return (toMinute - fromMinute)/1000;
    }
    return 0;
  }

  getFrom(): Date {
    if(this.from) {
      return this.from;
    } return new Date(0);
  }

  getTo(): Date {
    if(this.to) {
      return this.to;
    } return new Date(0);
  }
}

export default DateTimeInterval;