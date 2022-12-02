import { Button, Image, Text } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import DownloadIcon from "@icons/download";
import { ENDPOINT } from "@static/constants";
import { adminOrAuthor } from "@utils/auth";
import { formatDate } from "@utils/date";
import { getUserImage } from "@utils/media";
import { stripSpecialCharacters } from "@utils/text";
import React from "react";

const doFilter = (data) => {
  if (data[0]) {
    const { params, status, id, filterUrl, ...others } = data[0];
    return data.length ? Object.keys({ ...others }) : [];
  }
};

export const downloadLogsRow = (data, downloadLabel, unknown) => {
  const header = doFilter(data);

  return header?.map((item) => {
    switch (item) {
      case "sourceType":
        return {
          name: "Source",

          selector: (row) => row["sourceType"],
          cell: (row) => {
            return (
              <a href={`${row.filterUrl}`}>
                <BlueLink> {row.sourceType || unknown} </BlueLink>
              </a>
            );
          },
        };

      case "user":
        return {
          name: stripSpecialCharacters(item),
          selector: (row) => row["user"],
          cell: (row) => (
            <a href={`/user/show/${row.id}`}>
              <Image
                borderRadius={50}
                title={row.name}
                boxSize="2rem"
                fallbackSrc={`/api/avatar?t=${row.name}&s=${100}`}
                src={getUserImage(row.profilePic, row.name, 100)}
              />
            </a>
          ),
        };

      case "createdOn":
        return {
          name: stripSpecialCharacters(item),
          selector: (row) => row[`${item}`],
          cell: (row) => (
            <Text key={row} fontStyle="italic">
              {formatDate(row.createdOn)}
            </Text>
          ),
        };

      case "filePath":
        return {
          name: "File",
          selector: (row) => row[`${item}`],
          cell: (row) => (
            <Button
              variant="outline"
              size="sm"
              as="a"
              href={
                row.filePath.startsWith("/naksha") ? row.filePath : `${ENDPOINT.RAW}${row.filePath}`
              }
              download={true}
              disabled={!adminOrAuthor(row.user.id)}
              leftIcon={<DownloadIcon />}
              colorScheme="blue"
            >
              {downloadLabel}
            </Button>
          ),
        };

      default:
        return {
          name: stripSpecialCharacters(item),
          selector: (row) => row[`${item}`],
        };
    }
  });
};
