import { createBotAlgorithm, ZombieType } from "../BotInterface";
import { comfuterAlgorithm } from "./ComfuterEvaluation";
import { createComfuterBasedAlgorithm } from "./ComfuterEvaluationExtensions";
import { randoBotAlgorithm } from "./RandomEvaluation";

export const RanterAlgorithm = createBotAlgorithm(
	createComfuterBasedAlgorithm({
		stringifiedType: ZombieType.Ranter,
		evaluate(...args) {
			if (Math.random() < 0.5) {
				return randoBotAlgorithm.evaluate.apply(this, args);
			} else return comfuterAlgorithm.evaluate.apply(this, args);
		},
		getName() {
			return "Ranter";
		}
	})
);
