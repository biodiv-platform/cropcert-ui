import { Button } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import React from "react";
import GoogleLoginI from "react-google-login";

const GoogleLogin: any = GoogleLoginI;

export default function Oauth({ onSuccess, text, mb = 4 }) {
  const onFailure = ({ error }) => {
    console.error(error);
  };

  return (
    <GoogleLogin
      clientId={SITE_CONFIG.TOKENS.OAUTH_GOOGLE}
      render={(renderProps) => (
        <Button
          w="full"
          mb={mb}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          colorPalette="messenger"
        >
          {text}
        </Button>
      )}
      onAutoLoadFinished={() => null}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
    />
  );
}
