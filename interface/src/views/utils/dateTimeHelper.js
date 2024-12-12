export const formDateToInput = (date) => {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0')
  let yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

export const formDateTimeToInput = (date) => {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0')
  let yyyy = date.getFullYear();
  let h = String(date.getHours()).padStart(2, '0');
  let m = String(date.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}T${h}:${m}`;
}

export const formDateToDisplay = (date) => {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0')
  let yyyy = date.getFullYear();

  return `${dd}.${mm}.${yyyy}`;
}
export const formDateTimeToDisplay = (date) => {
  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0')
  let yyyy = date.getFullYear();
  let h = String(date.getHours()).padStart(2, '0');
  let m = String(date.getMinutes()).padStart(2, '0');

  return `${dd}.${mm}.${yyyy} ${h}:${m}`;
}

export const formISOStringDateToDisplay = (ISOStringDate) => {

  console.log("?????", ISOStringDate)

  let date = new Date(ISOStringDate);
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
}