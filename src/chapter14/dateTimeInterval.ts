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
    const year = from.getFullYear();
    const month = from.getMonth();
    const day = from.getDate();
    return new DateTimeInterval(from, new Date(year, month, day, 23, 59, 59));
  }

  static fromMidnight(to: Date): DateTimeInterval {
    const year = to.getFullYear();
    const month = to.getMonth();
    const day = to.getDate();
    return new DateTimeInterval(new Date(year, month, day), to);
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