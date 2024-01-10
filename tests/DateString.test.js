import { describe, it, expect, test } from "vitest";
import DateString from "../src/helpers/DateString";

describe("DateString class", () => {
  it("어제를 기준으로 일주일 후의 날짜 반환 ", () => {
    // AAA 참고
    const date = new DateString();

    const dateFromYesterdayToOneWeek = date.afterAWeekFromYesterday;

    expect(dateFromYesterdayToOneWeek).toBe("2024-01-05");
  });

  test("어제 날짜 반환", () => {
    const date = new DateString();

    const yesterdayDate = date.yesterday;

    expect(yesterdayDate).toBe("2023-12-29");
  });
});

// coverage 분석하는 법 확인하기
// toBe 부분 좀더 꼼꼼히 알아서 string 예상 값 만들게
// branch나눠서 test부분!
