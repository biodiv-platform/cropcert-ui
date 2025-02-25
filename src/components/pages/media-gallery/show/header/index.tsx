import { Flex, Heading, Tabs, Text } from "@chakra-ui/react";
import SimpleActionButton from "@components/@core/action-buttons/simple";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import Add2Icon from "@icons/add";
import DeleteIcon from "@icons/delete";
import { axDeleteMediaGalleryById } from "@services/media-gallery.service";
import { ROLES } from "@static/constants";
import { viewTabs } from "@static/media-gallery-list";
import { hasAccess } from "@utils/auth";
import { getNextResourceRAW } from "@utils/media";
import notification, { NotificationType } from "@utils/notification";
import { format } from "indian-number-format";
import router from "next/router";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import EditIcon from "@/icons/edit";

import useMediaGalleryFilter from "../../common/use-media-gallery-filter";

export default function ListHeader() {
  const { filter, setFilter, mediaGalleryData } = useMediaGalleryFilter();
  const { t } = useTranslation();
  const currentRoute = useRouter();

  const handleOnViewChange = (e) => {
    setFilter((_draft) => {
      _draft.f.offset = 0;
      _draft.f.view = e.value;
    });
  };

  const handleOnDelete = async () => {
    const confirmed = window.confirm(t("common:media_gallery.delete.info"));

    if (confirmed) {
      const { success } = await axDeleteMediaGalleryById(filter.mId);
      if (success) {
        notification(t("common:media_gallery.delete.success"), NotificationType.Success);
        router.push(`/media-gallery/list/`);
      } else {
        notification(t("common:media_gallery.delete.failure"));
      }
    }
  };

  const handleOnAdd = () => router.push(`/media-gallery/upload/${filter.mId}`);

  const handleOnEdit = () => router.push(`/media-gallery/edit/${filter.mId}`);

  const { user } = useGlobalState();
  const isAdmin = hasAccess([ROLES.ADMIN], user);

  const isSingle = !filter?.mId?.includes(",");

  const getFirstImageResource = (data) => {
    const firstImageItem = data?.l?.find(
      (item) => item.resource.type === "IMAGE" && item.resource.fileName
    );
    return firstImageItem ? firstImageItem.resource : null;
  };

  const resource = getFirstImageResource(mediaGalleryData);

  const reprImage = getNextResourceRAW(resource?.id);
  const { lang } = useTranslation();

  return (
    <>
      <NextSeo
        openGraph={{
          type: "website",
          locale: lang,
          url: SITE_CONFIG.SITE.URL + currentRoute.asPath,
          title: mediaGalleryData.name,
          images: reprImage ? [{ url: reprImage }] : undefined,
          description: mediaGalleryData.description,
        }}
        title={mediaGalleryData.name}
        additionalLinkTags={[
          {
            rel: "icon",
            href: reprImage ? reprImage : mediaGalleryData.name,
          },
        ]}
      />

      <Flex mt={4} direction={{ base: "column", md: "row" }} justify="space-between">
        <Tabs.Root
          display="inline-block"
          className="icon-tabs"
          onValueChange={(e) => handleOnViewChange(e.value)}
          activationMode="manual"
          defaultValue={viewTabs[0].name}
          mb={4}
          lazyMount
        >
          <Tabs.List aria-orientation="vertical">
            {viewTabs.map(({ name, icon, key }) => (
              <Tabs.Trigger
                value={name}
                key={key}
                aria-label={t(name)}
                aria-controls={`view_${key}`}
              >
                {icon} {t(name)}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </Flex>
      {mediaGalleryData && mediaGalleryData.n > -1 && (
        <Flex mb={4} direction="column" justifyContent="center" alignItems="center">
          <Heading textAlign="center" size="2xl">
            {mediaGalleryData.name}
            {isSingle && (
              <>
                <SimpleActionButton
                  icon={<Add2Icon />}
                  title={t("common:media_gallery.contribute")}
                  onClick={handleOnAdd}
                  colorPalette="green"
                />
                {isAdmin && (
                  <>
                    <SimpleActionButton
                      icon={<EditIcon />}
                      title={t("common:edit")}
                      onClick={handleOnEdit}
                      colorPalette="green"
                    />
                    <SimpleActionButton
                      icon={<DeleteIcon />}
                      title={t("common:delete")}
                      onClick={handleOnDelete}
                      colorPalette="red"
                    />
                  </>
                )}
              </>
            )}
          </Heading>

          <Text fontSize="xl" color="gray.600">
            {mediaGalleryData.description} ({format(mediaGalleryData.n)}{" "}
            {t("common:media_gallery.total")})
          </Text>
        </Flex>
      )}
    </>
  );
}
