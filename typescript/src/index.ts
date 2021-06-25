import { Trade } from "../types/trading/trade_pb";
import { WeightedTradingStrategy } from "../types/trading/strategy_pb";
import {
  EvaluateStrategyRequest,
  CloseHodl,
} from "../types/apis/strategy_api_pb";
import { CloseHodlStrategyAPIClient } from "../types/apis/strategy_api_grpc_pb";

class Meme {
  GetTrade(): Trade {
    let t: Trade = new Trade();
    let s: WeightedTradingStrategy[] = [];

    t.setTicker("AMZN");
    t.setStrategiesList(s);

    return t;
  }

  async EvaluateStrategies(t: Trade, api: CloseHodlStrategyAPIClient) {
    let close = 0;
    let hodl = 0;
    for (const weightedStrategy of t.getStrategiesList()) {
      const request = new EvaluateStrategyRequest();

      request.setStrategy(weightedStrategy.getStrategy());
      await api.getStrategyForCloseHodl(request, (err, response) => {
        if (response.getResponse() === CloseHodl.CLOSE_CLOSE_CLOSE) {
          close += weightedStrategy.getWeight();
        } else {
          hodl += weightedStrategy.getWeight();
        }
      });
    }

    return close > hodl
      ? CloseHodl.CLOSE_CLOSE_CLOSE
      : CloseHodl.HODL_HODL_HODL;
  }
}
