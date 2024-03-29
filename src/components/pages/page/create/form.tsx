import useGlobalState from "@hooks/use-global-state";
import { axCreatePage } from "@services/pages.service";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import { PAGE_TYPES, transformPagePayload } from "../common/data";
import PageForm from "../common/form";

const defaultValues = {
  content: "",
  description: null,
  url: null,
  parentId: 0,
  sticky: true,
  pageType: PAGE_TYPES.CONTENT,
  allowComments: false,
  showInFooter: false,
  showInMenu: false,
};

export default function PageCreateForm(): JSX.Element {
  const { t } = useTranslation();
  const { user, languageId, getPageTree } = useGlobalState();
  const router = useRouter();

  const handleOnPageEdit = async (values) => {
    const payload = transformPagePayload(values, {
      date: new Date().toISOString(),
      pageIndex: 0,
      showInFooter: false,
      userGroupId: null,
      languageId,
      autherId: user?.id,
      autherName: user?.name,
    });

    const { success, data } = await axCreatePage(payload);
    if (success) {
      await getPageTree();
      notification(t("page:create.success"), NotificationType.Success);
      router.push(`/page/show/${data?.id}`);
    } else {
      notification(t("page:create.failure"));
    }
  };

  return (
    <PageForm
      defaultValues={defaultValues}
      submitLabel={t("page:create.title")}
      onSubmit={handleOnPageEdit}
      hideParentId={false}
    />
  );
}
