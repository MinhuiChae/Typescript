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

  static fromMidnight(from: Date, to: Date): DateTimeInterval {
    return new DateTimeInterval(from, to);
  }

  static during(from: Date, to: Date): DateTimeInterval {
    return new DateTimeInterval(from, to);
  }
}

export default DateTimeInterval;