module.exports.randomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

module.exports.randomNumberWith12Chars = () => {
  return Math.floor(1000000000000 + Math.random() * 9000000000000);
};
