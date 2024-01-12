import { describe, it, expect, test, beforeEach, vi } from "vitest";
import DateString from "../src/helpers/DateString";

describe("DateString class", () => {
  beforeEach(() => {
    const date = new Date(2023, 0, 12);
    vi.useFakeTimers();
    vi.setSystemTime(date);
  });

  it("어제를 기준으로 일주일 후의 날짜 반환", () => {
    // AAA 참고
    const date = new DateString();

    const dateFromYesterdayToOneWeekAfter = date.afterAWeekFromYesterday;

    expect(dateFromYesterdayToOneWeekAfter).toBe("2023-01-18");
    vi.useRealTimers();
  });

  test("어제 날짜 반환", () => {
    const date = new DateString();

    const yesterdayDate = date.yesterday;

    expect(yesterdayDate).toBe("2023-01-11");
    vi.useRealTimers();
  });
});
