export default class DateString {
  #currentDate = new Date();
  #yesterdayDate = new Date(
    this.#currentDate.setDate(this.#currentDate.getDate() - 1)
  );
  #nextWeekDateFromCurrnet = new Date(
    this.#currentDate.getFullYear(),
    this.#currentDate.getMonth(),
    this.#currentDate.getDate() + 7
  );

  get yesterday() {
    const day = this.convertDayTostring(this.#yesterdayDate);
    const month = this.convertMonthTostring(this.#yesterdayDate);
    const year = this.#yesterdayDate.getFullYear();
    console.log(day);
    return `${year}-${month}-${day}`;
  }

  get afterAWeekFromYesterday() {
    const day = this.convertDayTostring(this.#nextWeekDateFromCurrnet);
    const month = this.convertMonthTostring(this.#nextWeekDateFromCurrnet);
    const year = this.#nextWeekDateFromCurrnet.getFullYear();

    return `${year}-${month}-${day}`;
  }

  convertDayTostring(date) {
    return date.getDate().toString().length > 1
      ? date.getDate() - 1
      : "0" + (date.getDate() - 1);
  }

  convertMonthTostring(date) {
    return (date.getMonth() + 1).toString().length > 1
      ? date.getMonth() + 1
      : "0" + date.getMonth() + 1;
  }
}
