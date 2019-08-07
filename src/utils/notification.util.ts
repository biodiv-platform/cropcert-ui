import { Notyf } from "notyf";

import { isBrowser } from "./constants";

const showNotification = (message, type = "error") => {
  if (isBrowser) {
    const notyf = new Notyf({
      types: [
        {
          type: "info",
          backgroundColor: "#1EA7FD",
          icon: false,
        },
      ],
    });

    notyf.open({ type, message });
  }
};

export default showNotification;
