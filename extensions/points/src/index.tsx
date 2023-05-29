import React, { useEffect } from "react";
import {
  useExtensionApi,
  render,
  Banner,
  useTranslate,
  useApplyDiscountCodeChange,
  Checkbox,
  useAppliedGiftCards,
  useApplyGiftCardChange,
  useApplyAttributeChange,
  useTarget,
  TextField,
} from "@shopify/checkout-ui-extensions-react";
// render('Checkout::Dynamic::Render', () => <App />);
render("Checkout::Reductions::RenderBefore", () => <App />);
render("Checkout::Dynamic::Render", () => <App />);

function App() {
  const data = useExtensionApi();
  // const targets = useTarget();
  const translate = useTranslate();
  const applyAttributeChange = useApplyGiftCardChange();

  useEffect(() => {
    async function queryApi() {
      // Request a new (or cached) session token from Shopify
      const token = await data.sessionToken.get();
      console.log("sessionToken.get()", token);

      const apiResponse = await fetchWithToken(token);
      // Use your response
      console.log("API response", apiResponse);
    }

    function fetchWithToken(token: string) {
      const result = fetch("https://myapp.com/api/session-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result;
    }

    queryApi();
  }, [data.sessionToken]);

  async function onCheckboxChange(v: string) {
    const result = await applyAttributeChange({
      type: "addGiftCard",
      code: v,
    });
    console.log("applyAttributeChange result", result);
  }

  console.log(data, data.sessionToken.get(), "extension api");

  // console.log(targets, "targets");
  return (
    <Banner>
      Checkout Points User .
      <TextField
        label="Discount"
        onChange={(e: string) => onCheckboxChange(e)}
      />
    </Banner>
  );
}
