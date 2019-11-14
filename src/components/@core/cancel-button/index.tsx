import { isBrowser } from "@utils/constants";
import { Button } from "carbon-components-react";
import React from "react";

function CancelButton() {
  const goBack = () => {
    if (isBrowser) {
      window.history.back();
    }
  };

  return (
    <Button kind="secondary" className="mr-3" onClick={goBack}>
      Cancel
    </Button>
  );
}

export default CancelButton;
