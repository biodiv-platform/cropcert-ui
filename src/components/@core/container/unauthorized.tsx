import { Link } from "gatsby";
import React from "react";

function Unauthorized() {
  return (
    <div className="center-xy">
      <h1>Unauthorized</h1>
      <div className="pt-4">
        Please <Link to="/auth/sign-in">Sign-In</Link> or{" "}
        <Link to="/auth/sign-out">Switch Account</Link>
      </div>
    </div>
  );
}

export default Unauthorized;
