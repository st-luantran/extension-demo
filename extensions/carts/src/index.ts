import { InputQuery, FunctionResult, FunctionError } from "../generated/api";

export default (input: InputQuery): FunctionResult => {
  const error = {
    localizedMessage:
      "There is an order maximum of $1,000 for customers without established order history",
    target: "cart",
  };

  const errorVN = {
    localizedMessage: "Viet Nam Not Order",
    target: "cart",
  };

  // Parse the decimal (serialized as a string) into a float.
  const orderSubtotal = parseFloat(input.cart.cost.subtotalAmount.amount);
  const errors: any = [];

  // Orders with subtotals greater than $1,000 are available only to established customers.
  console.log(orderSubtotal, "total cost");

  const country = input.localization.country.isoCode;

  if (orderSubtotal > 1000.0) {
    if (input.cart.buyerIdentity && input.cart.buyerIdentity.customer) {
      // If the customer has ordered less than 5 times in the past,
      // then treat them as a new customer.
      if (input.cart.buyerIdentity.customer.numberOfOrders < 5) {
        errors.push(error);
      }
    } else {
      errors.push(error);
    }
  }

  if (country == "VN" && !errors[0]) {
    errors.push(errorVN);
  }

  return { errors: [] };
};
