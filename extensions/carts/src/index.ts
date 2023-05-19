import {
  InputQuery,
  FunctionResult,
  FunctionError,
} from "../generated/api";

export default (input: InputQuery): FunctionResult => {
  const errors: FunctionError[] = input.cart.lines
    .filter(({ quantity }) => quantity > 1)
    .map(() => ({
      localizedMessage: "Not possible to order more than one of each",
      target: "cart",
    }));

  return {
    errors
  }
};