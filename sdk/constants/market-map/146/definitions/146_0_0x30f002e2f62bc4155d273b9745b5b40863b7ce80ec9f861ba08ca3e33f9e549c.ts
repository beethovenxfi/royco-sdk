import { defineMarket } from "@/sdk/constants";

export default defineMarket({
  id: `146_0_0x30f002e2f62bc4155d273b9745b5b40863b7ce80ec9f861ba08ca3e33f9e549c`,
  name: `Deposit wS to buy PT-stS`,
  description: `PT-stS enables investors to farm Sonic points, Gems, and Stable Jack Discount Tickets with leverage while maintaining long stS exposure.

In exchange, PT-stS holders pay a certain fee to YT-stS holders.`,
  is_verified: true,
  external_incentives: [
    {
      token_id: "146-0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db",
      label: "Discount Tickets",
      value: async ({ roycoClient, chainClient }) => {
        let value = "DT Multiplier";
        const treasury = "0x56B9681B78Cc43E564E14Ba215AA62F9370d3A59";
        const pt_address = "0xFCA91fEEe65DB34448A83a74f4f8970b5dddfa7c";
        const groupId =
          "0x331e33bebec5fe0378b995e9ef7355a166e1dbd4902181d4e149dec9671a68ee";

        try {
          const tvl_supply = await chainClient.readContract({
            address: treasury,
            abi: [
              {
                type: "function",
                name: "totalBaseToken",
                inputs: [{ name: "groupId", type: "bytes32" }],
                outputs: [{ name: "", type: "uint256" }],
                stateMutability: "view",
              },
            ],
            functionName: "totalBaseToken",
            args: [groupId],
          });

          const tvl_price = await chainClient.readContract({
            address: treasury,
            abi: [
              {
                type: "function",
                name: "currentBaseTokenPrice",
                inputs: [{ name: "groupId", type: "bytes32" }],
                outputs: [{ name: "", type: "uint256" }],
                stateMutability: "view",
              },
            ],
            functionName: "currentBaseTokenPrice",
            args: [groupId],
          });

          const tvl =
            (Number(tvl_supply ?? 0) * Number(tvl_price ?? 0)) / 10 ** 36;

          const pt_supply = await chainClient.readContract({
            address: pt_address,
            abi: [
              {
                inputs: [],
                name: "totalSupply",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "totalSupply",
            args: [],
          });

          const pt_price = await chainClient.readContract({
            address: pt_address,
            abi: [
              {
                inputs: [],
                name: "nav",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "nav",
            args: [],
          });

          const pt_market_cap =
            (Number(pt_supply ?? 0) * Number(pt_price ?? 0)) / 10 ** 36;
          const result = 80 * (tvl / pt_market_cap);
          value = result.toFixed() + "x Discount Tickets";
        } catch (error) {}
        return value;
      },
    },
    {
      token_id: "146-0xaa21e59bf97313b3b3850e9f878ffffc733a946a",
      label: "Sonic Points",
      value: async ({ roycoClient, chainClient }) => {
        let value = "Sonic Points Multiplier";
        const treasury = "0x56B9681B78Cc43E564E14Ba215AA62F9370d3A59";
        const pt_address = "0xFCA91fEEe65DB34448A83a74f4f8970b5dddfa7c";
        const groupId =
          "0x331e33bebec5fe0378b995e9ef7355a166e1dbd4902181d4e149dec9671a68ee";

        try {
          const tvl_supply = await chainClient.readContract({
            address: treasury,
            abi: [
              {
                type: "function",
                name: "totalBaseToken",
                inputs: [{ name: "groupId", type: "bytes32" }],
                outputs: [{ name: "", type: "uint256" }],
                stateMutability: "view",
              },
            ],
            functionName: "totalBaseToken",
            args: [groupId],
          });

          const tvl_price = await chainClient.readContract({
            address: treasury,
            abi: [
              {
                type: "function",
                name: "currentBaseTokenPrice",
                inputs: [{ name: "groupId", type: "bytes32" }],
                outputs: [{ name: "", type: "uint256" }],
                stateMutability: "view",
              },
            ],
            functionName: "currentBaseTokenPrice",
            args: [groupId],
          });

          const tvl =
            (Number(tvl_supply ?? 0) * Number(tvl_price ?? 0)) / 10 ** 36;

          const pt_supply = await chainClient.readContract({
            address: pt_address,
            abi: [
              {
                inputs: [],
                name: "totalSupply",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "totalSupply",
            args: [],
          });

          const pt_price = await chainClient.readContract({
            address: pt_address,
            abi: [
              {
                inputs: [],
                name: "nav",
                outputs: [
                  { internalType: "uint256", name: "", type: "uint256" },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            functionName: "nav",
            args: [],
          });

          const pt_market_cap =
            (Number(pt_supply ?? 0) * Number(pt_price ?? 0)) / 10 ** 36;
          const result = 8 * (tvl / pt_market_cap);
          value = result.toFixed() + "x Sonic Points";
        } catch (error) {}
        return value;
      },
    },
  ],
});
