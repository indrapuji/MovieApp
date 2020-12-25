export function year(date) {
  let newDate = "";
  for (let i = 0; i < 4; i++) {
    newDate += date[i];
  }
  return newDate;
}
