const getAmountInCLP = (amount, currency) => {
  if (currency === "USD") {
    return amount * 800;
  } else {
    return amount;
  }
};

const getAmountInUSD = (amount, currency) => {
  if (currency === "CLP") {
    return amount / 800;
  } else {
    return amount;
  }
};

export { getAmountInCLP, getAmountInUSD };
