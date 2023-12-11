export default class DateString {
  #currentDate = new Date();
  #yesterdayDate = new Date(
    this.#currentDate.setDate(this.#currentDate.getDate() - 3)
  );
  //  위 -3을 -1로 바꿔야 하루 전이 됨 + magic Number를 피하자 config로..이동
  #nextWeekDateFromYesterday = new Date(
    this.#yesterdayDate.getFullYear(),
    this.#yesterdayDate.getMonth(),
    this.#yesterdayDate.getDate() + 7
  );

  get yesterday() {
    const day = this.#convertDayTostring(this.#yesterdayDate);
    const month = this.#convertMonthTostring(this.#yesterdayDate);
    const year = this.#yesterdayDate.getFullYear();
    return `${year}-${month}-${day}`;
  }

  get afterAWeekFromYesterday() {
    const day = this.#convertDayTostring(this.#nextWeekDateFromYesterday);
    const month = this.#convertMonthTostring(this.#nextWeekDateFromYesterday);
    const year = this.#nextWeekDateFromYesterday.getFullYear();
    return `${year}-${month}-${day}`;
  }

  #convertDayTostring(date) {
    return date.getDate().toString().length > 1
      ? date.getDate()
      : "0" + date.getDate();
  }

  #convertMonthTostring(date) {
    return (date.getMonth() + 1).toString().length > 1
      ? date.getMonth() + 1
      : "0" + date.getMonth() + 1;
  }
}
