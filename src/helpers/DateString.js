export default class DateString {
  #currentDate = new Date();
  #nextWeekDateFromCurrnet = new Date(
    this.#currentDate.getFullYear(),
    this.#currentDate.getMonth(),
    this.#currentDate.getDate() + 7
  );

  get current() {
    const day = this.convertDayTostring(this.#currentDate);
    const month = this.convertMonthTostring(this.#currentDate);
    const year = this.#currentDate.getFullYear();

    return `${year}-${month}-${day}`;
  }

  get nextWeekFromCurrent() {
    const day = this.convertDayTostring(this.#nextWeekDateFromCurrnet);
    const month = this.convertMonthTostring(this.#nextWeekDateFromCurrnet);
    const year = this.#nextWeekDateFromCurrnet.getFullYear();

    return `${year}-${month}-${day}`;
  }

  convertDayTostring(date) {
    return date.getDate().toString().length > 1
      ? date.getDate()
      : "0" + date.getDate();
  }

  convertMonthTostring(date) {
    return (date.getMonth() + 1).toString().length > 1
      ? date.getMonth() + 1
      : "0" + date.getMonth() + 1;
  }
}
