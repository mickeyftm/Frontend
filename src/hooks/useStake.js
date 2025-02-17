import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { useMasterChef, useMiniChef } from "./useContract";
import { miniStake, stake } from "../utils/callHelpers";

export const useStake = (farm, amount) => {
  const { account } = useWeb3React();
  const masterChefContract = useMasterChef();
  const miniChefContract = useMiniChef();

  const handleStake = useCallback(async () => {
    try {
      if (farm.type > 0) {
        const tx = await miniStake(miniChefContract, farm.pid, amount, account);
        return tx;
      } else {
        const tx = await stake(masterChefContract, farm.pid, amount, account);
        return tx;
      }
    } catch (e) {
      return false;
    }
  }, [account, amount, masterChefContract, miniChefContract, farm]);

  return { onStake: handleStake };
};
