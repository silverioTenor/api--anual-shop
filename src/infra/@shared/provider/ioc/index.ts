import { IocContainer } from "tsoa";
import { container } from "tsyringe";

export const iocContainer: IocContainer = {
  get: (controllerClass) => {
    return container.resolve(controllerClass as any);
  },
};
