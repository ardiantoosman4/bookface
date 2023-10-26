function formatDate(value) {
  let createDate = new Date(value);
  return createDate.toLocaleDateString("en-CA");
}
module.exports = formatDate;
