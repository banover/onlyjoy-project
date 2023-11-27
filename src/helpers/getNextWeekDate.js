export default function getNextWeekDate() {
  const currentDate = new Date();
  const nextWeekDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 7
  );
  let day =
    nextWeekDate.getDate().toString.length > 1
      ? nextWeekDate.getDate()
      : "0" + nextWeekDate.getDate();
  let month =
    (nextWeekDate.getMonth() + 1).toString().length > 1
      ? nextWeekDate.getMonth() + 1
      : "0" + nextWeekDate.getMonth() + 1;
  let year = nextWeekDate.getFullYear();
  //   return { day, month, year };
  return `${year}-${month}-${day}`;
}
