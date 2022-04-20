import Call from "../chapter10/call";
import { BasicRatePolicy, Money } from "./basicRatePolicy";

class TimeOfDayDiscountPolicy extends BasicRatePolicy {
  private starts: Date[] = new Array();
  private ends: Date[] = new Array();
  private durations: Date[] = new Array();
  private amounts: Money[] = new Array();

  calculateCallFee(call: Call): Money {
    let result = new Money(0);

    

    return result;
  }
}