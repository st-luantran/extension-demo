import {
  InputQuery,
  FunctionResult,
  DiscountApplicationStrategy,
} from "../generated/api";

const EMPTY_DISCOUNT: FunctionResult = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

type Configuration = {};

export default (input: InputQuery): FunctionResult => {
  const configuration: Configuration = JSON.parse(
    input?.discountNode?.metafield?.value ?? "{}"
  );
  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [
      {
        value: {
          percentage: {
            value: 10,
          },
        },
        targets: [
          {
            orderSubtotal: {
              excludedVariantIds: "",
            },
          },
        ],
        message: "10% off",
      },
    ],
  };
};
