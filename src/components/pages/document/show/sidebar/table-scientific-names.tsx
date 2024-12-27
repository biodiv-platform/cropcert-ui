import { Box, Skeleton, Table } from "@chakra-ui/react";
import DeleteActionButton from "@components/@core/action-buttons/delete";
import ExternalBlueLink from "@components/@core/blue-link/external";
import BoxHeading from "@components/@core/layout/box-heading";
import { stickyTh } from "@components/pages/observation/list/views/stats/common";
import useGlobalState from "@hooks/use-global-state";
import { axUpdateScientifcNameToIsDeleted } from "@services/document.service";
import { adminOrAuthor } from "@utils/auth";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function ScientificNamesTable({
  data,
  title,
  loadMoreNames,
  authorId,
  refreshFunc,
}) {
  const { t } = useTranslation();

  const [showActions, setShowActions] = useState<boolean>();
  const { isLoggedIn } = useGlobalState();

  useEffect(() => {
    setShowActions(adminOrAuthor(authorId));
  }, [isLoggedIn]);

  return data?.list?.length > 0 ? (
    <Box className="white-box">
      <BoxHeading>⭐ {title}</BoxHeading>
      <Box w="full" overflowY="auto" h={360}>
        <Table.Root striped colorScheme="gray" size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader {...stickyTh}>
                {t("document:show.scientific_names_table.name_header")}
              </Table.ColumnHeader>
              <Table.ColumnHeader {...stickyTh}>
                {t("document:show.scientific_names_table.count_header")}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.list.map(({ id, canonicalForm, frequency, taxonConceptId }) => (
              <Table.Row>
                <Table.Cell>
                  {taxonConceptId != null ? (
                    <NextLink
                      href={`/taxonomy/list?showTaxon=${taxonConceptId}&taxonId=${taxonConceptId}`}
                      legacyBehavior
                    >
                      <ExternalBlueLink>{canonicalForm}</ExternalBlueLink>
                    </NextLink>
                  ) : (
                    canonicalForm
                  )}
                </Table.Cell>

                <Table.Cell>
                  {frequency}
                  {showActions && (
                    <DeleteActionButton
                      observationId={id}
                      title={t("document:show.scientific_names_table.delete.title")}
                      description={t("document:show.scientific_names_table.delete.description")}
                      deleted={t("document:show.scientific_names_table.delete.deleted")}
                      deleteFunc={axUpdateScientifcNameToIsDeleted}
                      deleteGnfinderName={true}
                      refreshFunc={refreshFunc}
                    />
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <Button w="full" onClick={loadMoreNames} loading={data.isLoading} borderTopRadius={0}>
        {t("common:load_more")}
      </Button>
    </Box>
  ) : data.isLoading ? (
    <Skeleton h={450} borderRadius="md" />
  ) : null;
}
