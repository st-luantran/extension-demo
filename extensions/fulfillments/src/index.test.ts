import { describe, it, expect } from 'vitest';
import fulfillmentConstraintRule from './index';
import { FunctionResult } from '../generated/api';

describe('fulfillment constraint rule function', () => {
  it('returns no operations without configuration', () => {
    const result = fulfillmentConstraintRule({
      cart: {
        deliverableLines: [
          {
            id: "gid://shopify/DeliverableCartLine/1"
          },
          {
            id: "gid://shopify/DeliverableCartLine/2"
          }
        ]
      },
      fulfillmentConstraintRule: {
        metafield: null
      }
    });
    const expected: FunctionResult = { operations: [] };

    expect(result).toEqual(expected);
  });
});