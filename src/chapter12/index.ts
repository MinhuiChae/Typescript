
class Lecture {
  private pass: number = 0;
  private title: String = "";
  private scores: number[] = new Array ();

  constructor(title: String, pass: number, scores: number[]) {
    this.pass = pass;
    this.title = title;
    this.scores = scores;
  }

  average(): number {
    let average: number = 0;
    this.scores.map((a: number) => average = Math.ceil((average + a) / this.scores.length));
    return average;
  }

  getScores(): number[] {
    return this.scores;
  }

  evaluate(): string {
    return ("Pass:" + this.passCount() + " Fail:" + this.failCount());
  }

  passCount(): number | undefined {
    let cnt: number = 0;
    let arr = this.scores.map((a: number) => a >= this.pass);
    arr.filter((a) => {
      if(a === true) {
        cnt++;
      }
    })
    return cnt;
  }

  failCount(): number | undefined {
    let passCount = this.passCount();
    if(passCount) {
      return this.scores.length - passCount;
    }
  }
}

class GradeLecture extends Lecture {
  private grades: Grade[] | null = null;

  constructor(name: string, pass: number, grades: Grade[], scores: number[]) {
    super(name, pass, scores);
    this.grades = grades;
  }
}

class Grade {
  private name: string = "";
  private upper: number = 0;
  private lower: number = 0;

  constructor(name: string, upper: number, lower: number) {
    this.name = name;
    this.upper = upper;
    this.lower = lower;
  }

  getName(): string {
    return this.name;
  }

  isName(name: string): boolean {
    return this.name == name;
  }

  include(score: number): boolean {
    return score >= this.lower && score<= this.upper;
  }
}


export {Lecture};