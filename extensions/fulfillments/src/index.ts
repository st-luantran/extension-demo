import { InputQuery, FunctionResult } from "../generated/api";

const NO_CHANGES: FunctionResult = {
  operations: [],
};

type Configuration = {};

export default (input: InputQuery): FunctionResult => {
  const configuration: Configuration = JSON.parse(
    input?.fulfillmentConstraintRule?.metafield?.value ?? "{}"
  );
  return NO_CHANGES;
};
