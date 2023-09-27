import { Checkbox, Image, Link, Stack } from "@chakra-ui/react";
import { RESOURCE_SIZE } from "@static/constants";
import { getResourceThumbnail } from "@utils/media";
import { stripTags } from "@utils/text";
import React from "react";

const doFilter = (speciesTiles) => {
  const { name, reprImage, sGroup, commonName } = speciesTiles[0];
  return Object.keys({ reprImage, name, sGroup, commonName });
};

export const speciesTableMetaData = (speciesTiles, canEdit) => {
  const header = speciesTiles.length > 0 ? doFilter(speciesTiles) : [];

  return header.map((item) => {
    switch (item) {
      case "name":
        return {
          Header: "Media Gallery Name",
          accessor: "name",
          Cell: ({ value, cell, getCheckboxProps }) => {
            return (
              cell.row.original.id && (
                <Stack isInline>
                  {canEdit && (
                    <Checkbox
                      m={2}
                      {...getCheckboxProps({ value: cell.row.original.id })}
                    ></Checkbox>
                  )}

                  <Link href={`/species/show/${cell.row.original.id}`}>
                    <Link>{value}</Link>
                  </Link>
                </Stack>
              )
            );
          },
        };

      case "reprImage":
        return {
          Header: "Image",
          accessor: "reprImage",
          Cell: ({ value, cell }) => (
            <Image
              borderRadius={4}
              title={stripTags(cell.row.original.name)}
              boxSize="5rem"
              src={getResourceThumbnail(cell.row.original.context, value, RESOURCE_SIZE.DEFAULT)}
            />
          ),
        };

      default:
        return {
          Header: item.replace(/(\B[A-Z])/g, " $1").replace(/^./, item[0].toUpperCase()),
          accessor: item,
        };
    }
  });
};
