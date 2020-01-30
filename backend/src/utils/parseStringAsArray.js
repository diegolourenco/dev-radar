module.exports = arrayAsString => {
  return arrayAsString.split(",").map(item => item.trim());
};
