export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
  //if the price comes in cents - .format(number/100)
};

export const getUniqueValues = () => {};
