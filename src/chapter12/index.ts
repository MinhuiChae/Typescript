import { floor } from "lodash";

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

  // evaluate(): string {
  //   return ("Pass: " + this.passCount() + "Fail: " + this.failCount());
  // }

  passCount(): number | undefined {
    let arr = this.scores.find((a: number) => a >= this.pass);
    if(arr)
    return arr;
  }
}

export {Lecture};