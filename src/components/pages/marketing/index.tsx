import { EmailIcon } from "@chakra-ui/icons";
import { Badge, Button, Checkbox, Spinner } from "@chakra-ui/react";
import CoMultiSelect from "@components/@core/accesser/co-multi-select";
import PlainUnionSelect from "@components/@core/accesser/plain-union-select";
import Container from "@components/@core/container";
import { CoreGrid } from "@components/@core/layout";
import Table from "@components/@core/table";
import LotCell from "@components/@core/table/lot-cell";
import timeCell from "@components/@core/table/time-cell";
import useGlobalState from "@hooks/use-global-state";
import { hasAccess } from "@utils/auth";
import React, { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { PageHeader } from "../page/show/header";
import useMarketing from "./use-marketing";

export const columns = [
  {
    name: "Lot Id",
    selector: (row) => row.id,
    width: "100px",
    cell: (row) => {
      const { user } = useGlobalState();
      const isGIAdmin = hasAccess(["gi_admin"], user);
      return isGIAdmin ? <LotCell {...row} type="l" /> : `L-${row.id}`;
    },
  },
  {
    name: "Cooperative Name",
    selector: (row) => row.cooperativeName,
    width: "150px",
  },
  {
    name: "Weight",
    selector: (row) => row.highGradeWeight,
    width: "80px",
  },
  {
    name: "Quality Score",
    selector: (row) => row.qualityScores.toString() || "-",
    width: "110px",
  },
  {
    name: "Lot Name",
    selector: (row) => row.lotName,
    width: "240px",
  },
  {
    name: "GRN",
    selector: (row) => row.grnNumber || "-",
  },
  {
    name: "Status",
    selector: (row) => row.lotStatus,
    cell: (row) => <Badge>{row.lotStatus}</Badge>,
  },
  {
    name: "Updated",
    selector: (row) => row.createdOn,
    maxWidth: "160px",
    cell: (row) => timeCell(row.createdOn),
    sortable: true,
  },
  {
    name: "Contact",
    sortable: true,
    width: "120px",
    cell: (r) => {
      const to = r.contact || process.env.NEXT_PUBLIC_CC;

      return (
        <Button
          size="sm"
          colorScheme="blue"
          leftIcon={<EmailIcon />}
          as="a"
          href={`mailto:${to}?cc=${process.env.NEXT_PUBLIC_CC}&subject=Inquiry on Lot ${r.lotName}&body=Hi ${r.manager},%0A%0A<your message>%0A%0APlease, provide the following detail:%0ACompany name:%0AAddress:%0AContact person:%0ATelephone:%0Aemail:%0A%0A------------------------------------%0A%0ALot Information%0ALot Name: ${r.lotName} (L-${r.id})%0ACooperative: ${r.cooperativeFullName} (${r.cooperativeName})%0AWeight: ${r.highGradeWeight}%0AStatus: ${r.lotStatus}`}
        >
          Inquire
        </Button>
      );
    },
  },
];

export default function MarketingPageComponent() {
  const { list, setCoCodes, loadMore, isLoading } = useMarketing();
  const [union, setUnion] = useState<any>();
  const { user } = useGlobalState();

  const isGIAdmin = hasAccess(["gi_admin"], user);
  const [isFiltered, setIsFiltered] = useState(!isGIAdmin);

  const [dataList, headerData] = useMemo(
    () => [
      isFiltered ? list.l.filter((r) => r.qualityScores?.[0] > 0) : list.l,
      {
        title: isGIAdmin ? "Lot Details" : "Lots for Sale",
        description: `Organic certified coffee lots for sale are listed below. Please
      click on the Inquire button on the lot and send a mail with your mail and contact details
      and we will get back to you.`,
      },
    ],
    [isFiltered, list]
  );

  return (
    <>
      <PageHeader page={headerData} hideOptions={true} />
      <Container py={6}>
        <CoreGrid>
          <PlainUnionSelect onChange={setUnion} />
          <CoMultiSelect unionId={union?.value} onChange={setCoCodes} />

          <Checkbox
            defaultChecked={isFiltered}
            onChange={(e) => setIsFiltered(e.target.checked)}
            mt={4}
          >
            with quality scores only
          </Checkbox>
        </CoreGrid>

        {isLoading ? (
          <Spinner />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => loadMore()}
            loader={<Spinner key="loader" />}
            hasMore={list.hasMore}
          >
            {dataList.length ? <Table data={dataList} columns={columns} /> : "No Lots Available"}
          </InfiniteScroll>
        )}
      </Container>
    </>
  );
}
