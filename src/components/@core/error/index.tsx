import React from "react";
import { Helmet } from "react-helmet";

const statusCodes: { [code: number]: string } = {
  400: "Bad Request",
  404: "This page could not be found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
  401: "Unauthorized"
};

interface IProps {
  statusCode: number;
  title?: string;
}

const styles: { [k: string]: React.CSSProperties } = {
  error: {
    height: "100vh",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  desc: {
    display: "inline-block",
    textAlign: "left",
    lineHeight: "49px",
    height: "49px",
    verticalAlign: "middle"
  },

  h1: {
    display: "inline-block",
    borderRight: "1px solid rgba(0, 0, 0,.3)",
    margin: 0,
    marginRight: "20px",
    padding: "10px 23px 10px 0",
    fontSize: "24px",
    fontWeight: 500,
    verticalAlign: "top"
  },

  h2: {
    fontSize: "14px",
    fontWeight: "normal",
    lineHeight: "inherit",
    margin: 0,
    padding: 0
  }
};

export default function Error({ statusCode, title }: IProps) {
  title =
    title || statusCodes[statusCode] || "An unexpected error has occurred";
  return (
    <div style={styles.error}>
      <Helmet title={`${statusCode}: ${title}`} defer={false} />
      <div>
        {statusCode ? <h1 style={styles.h1}>{statusCode}</h1> : null}
        <div style={styles.desc}>
          <h2 style={styles.h2}>{title}.</h2>
        </div>
      </div>
    </div>
  );
}
