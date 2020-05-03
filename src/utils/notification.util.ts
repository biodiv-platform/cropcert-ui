import { isBrowser } from "@static/constants";
import cogoToast from "cogo-toast";

import { compiledMessage } from "./basic.util";

export enum NotificationType {
  Success = "success",
  Info = "info",
  Warning = "warn",
  Error = "error",
}

const notification = (message, type = NotificationType.Error, variables = {}) => {
  const m = compiledMessage(message.toString(), variables);
  if (isBrowser) {
    const toaster = cogoToast[type];
    const { hide } = toaster(m, {
      position: "top-center",
      hideAfter: 10,
      onClick: () => {
        hide();
      },
    });
  }
  console.info(m);
};

export default notification;
