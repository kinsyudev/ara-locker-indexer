import { createConfig, loadBalance } from "@ponder/core";
import { http } from "viem";

import { AraLockerAbi } from "./abis/locker-abi";
import { metis } from "viem/chains";

export default createConfig({
  networks: {
    metis: {
      chainId: metis.id,
      transport: loadBalance([
        http("https://metis-pokt.nodies.app"),
        http("https://andromeda.metis.io/?owner=1088"),
      ]),
    },
  },
  contracts: {
    AraLocker: {
      network: "metis",
      abi: AraLockerAbi,
      address: "0x3e12935B0005f7159780d2700A30FE8041163d00",
      startBlock: 10290664,
    },
  },
});
