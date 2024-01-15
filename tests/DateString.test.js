import { describe, it, expect, test, vi, afterAll, beforeAll } from "vitest";
import DateString from "../src/helpers/DateString";

describe("DateString class", () => {
  function setTempDate(year, month, day) {
    const tempDate = new Date(year, month, day);
    vi.setSystemTime(tempDate);
  }

  function getDateAfterAWeekFromYesterday() {
    return new DateString().afterAWeekFromYesterday;
  }

  function getYesterdayDate() {
    return new DateString().yesterday;
  }

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("어제를 기준으로 일주일 후의 날짜 반환 - format(xxxx-0x-xx)", () => {
    setTempDate(2023, 0, 12);

    const dateFromYesterdayToOneWeekAfter = getDateAfterAWeekFromYesterday();

    expect(dateFromYesterdayToOneWeekAfter).toBe("2023-01-18");
  });

  it("어제를 기준으로 일주일 후의 날짜 반환 - format(xxxx-xx-0x)", () => {
    setTempDate(2023, 0, 2);

    const dateFromYesterdayToOneWeekAfter = getDateAfterAWeekFromYesterday();

    expect(dateFromYesterdayToOneWeekAfter).toBe("2023-01-08");
  });

  it("어제를 기준으로 일주일 후의 날짜 반환 - format(xxxx-xx-xx)", () => {
    setTempDate(2023, 10, 2);

    const dateFromYesterdayToOneWeekAfter = getDateAfterAWeekFromYesterday();

    expect(dateFromYesterdayToOneWeekAfter).toBe("2023-11-08");
  });

  test("어제 날짜 반환 - format(xxxx-0x-xx)", () => {
    setTempDate(2023, 0, 12);

    const yesterdayDate = getYesterdayDate();

    expect(yesterdayDate).toBe("2023-01-11");
  });

  test("어제 날짜 반환 - format(xxxx-xx-0x)", () => {
    setTempDate(2023, 0, 3);

    const yesterdayDate = getYesterdayDate();

    expect(yesterdayDate).toBe("2023-01-02");
  });

  test("어제 날짜 반환 - format(xxxx-xx-xx)", () => {
    setTempDate(2023, 10, 3);

    const yesterdayDate = getYesterdayDate();

    expect(yesterdayDate).toBe("2023-11-02");
  });
});
