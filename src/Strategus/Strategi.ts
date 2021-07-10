import { Encrypt, SecretStrategusAdjuster } from "../The Goods/AES";
import { jonsole } from "../The Goods/jonsole";
import {
  OnePlease,
  ThreePlease,
  TwoPlease,
} from "../The Goods/ProprietaryUnwrapper";
import {
  Documentation,
  ENCRYPTION_KEY,
  SUPER_ENCRYPTION_KEY,
} from "../The Goods/variousConstants";
import { Strategus } from "./Strategus";

export class Strategi {
  goods: Encrypt<SUPER_ENCRYPTION_KEY, Strategus | SecretStrategusAdjuster>[];

  GetGood(
    idx: Encrypt<ENCRYPTION_KEY, number>
  ): Encrypt<SUPER_ENCRYPTION_KEY, Strategus | SecretStrategusAdjuster> {
    return this.goods[
      TwoPlease([
        "Grab the good at the index" as Documentation as number,
        OnePlease(idx),
      ])
    ];
  }

  LogStrategusAdjustmentCorrelationCoefficients() {
    this.goods.map((element) => {
      jonsole.log([
        TwoPlease([
          "--------------- Adjusted Correleation Coefficient ----------------",
          OnePlease([`${typeof ThreePlease(element)}: ${TwoPlease(element)} `]),
        ]),
      ]);
    });
  }
}
