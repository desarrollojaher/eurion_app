export const formatCurrency = (value: number) => {
  if (value !== undefined && value !== null) {
    return `$ ${value.toFixed(2)}`;
  } else {
    return `$ 0.00`;
  }
};
