import { Controllers } from "./controllers";
import { MiddleWares } from "./middlewares";
import container from "./container";

import "./repositories";
import "./services";
import "./useCases";

export const resolve = <T>(type: Controllers | MiddleWares): T => {
  return container.get<T>(type);
};

export default container;
