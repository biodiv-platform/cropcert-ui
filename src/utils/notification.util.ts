import { isBrowser } from "@static/constants";
import cogoToast from "cogo-toast";

import { compiledMessage } from "./basic.util";

export enum NotificationType {
  Success,
  Info,
  Warning,
  Error
}

const notification = (message, type = NotificationType.Error, variables = {}) => {
  const m = compiledMessage(message.toString(), variables);
  const pos: any = { position: "bottom-center" };
  if (isBrowser) {
    switch (type) {
      case NotificationType.Error:
        cogoToast.error(m, pos);
        break;

      case NotificationType.Info:
        cogoToast.info(m, pos);
        break;

      case NotificationType.Warning:
        cogoToast.warn(m, pos);
        break;

      default:
        cogoToast.success(m, pos);
        break;
    }
  }
};

export default notification;
