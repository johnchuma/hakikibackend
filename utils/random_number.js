module.exports.randomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

module.exports.randomNumberWith12Chars = () => {
  return Math.floor(Math.random() * 1000000000000)
    .toString()
    .padStart(12, "0");
};
