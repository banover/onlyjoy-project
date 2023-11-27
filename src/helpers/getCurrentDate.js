export default function getCurrentDate() {
  const date = new Date();
  let day =
    date.getDate().toString().length > 1
      ? date.getDate()
      : "0" + date.getDate();
  let month =
    (date.getMonth() + 1).toString().length > 1
      ? date.getMonth() + 1
      : "0" + date.getMonth() + 1;
  let year = date.getFullYear();

  //   return { day, month, year };
  return `${year}-${month}-${day}`;
}
