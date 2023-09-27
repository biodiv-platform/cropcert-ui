import SITE_CONFIG from "@configs/site-config";
import { AssetStatus } from "@interfaces/custom";
import { ResourceMediaGallery } from "@interfaces/media";
import {
  axListMyUploads,
  axRemoveMyUploads,
  axUploadMediaGalleryResource,
} from "@services/files.service";
import { FORM_DATEPICKER_CHANGE } from "@static/events";
import { STORE } from "@static/inspection-report";
import { MY_UPLOADS_SORT } from "@static/media-gallery";
import { setupDB } from "@utils/db";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { emit } from "react-gbus";
import { useImmer } from "use-immer";
import { useIndexedDBStore } from "use-indexeddb";

interface ManageMediaGalleryContextProps {
  fieldName?: string;
  mediaGalleryAssets?: ResourceMediaGallery[];
  assets?: ResourceMediaGallery[];
  addAssets?;
  setMediaGalleryAssets?;
  removeAsset?;
  addToMediaGalleryAssets?;
  removeMediaGalleryAsset?;
  updateMediaGalleryAssets?;
  uploadPendingResource?;
  children?;
  isCreate?;
  resourcesSortBy?;
  setResourcesSortBy?;
  licensesList?;
}

const ManageMediaGalleryContext = createContext<ManageMediaGalleryContextProps>(
  {} as ManageMediaGalleryContextProps
);

export const ManageMediaGalleryProvider = (props: ManageMediaGalleryContextProps) => {
  const [mediaGalleryAssets, setMediaGalleryAssets] = useImmer({
    a: props.mediaGalleryAssets || [],
  });

  const [assets, setAssets] = useImmer({ a: props.assets || [] });

  const [resourcesSortBy, setResourcesSortBy] = useState(MY_UPLOADS_SORT[0].value);

  const { t } = useTranslation();

  const { add, getOneByKey, getManyByKey, deleteByID, update } =
    useIndexedDBStore<ResourceMediaGallery>(STORE.ASSETS);

  const reFetchAssets = async () => {
    const allUnUsedAssets = await getManyByKey("isUsed", 0);
    console.warn(" allUnUsedAssets", allUnUsedAssets);
    setAssets((_draft) => {
      _draft.a = allUnUsedAssets.sort((a, b) => b[resourcesSortBy] - a[resourcesSortBy]);
    });
  };

  useEffect(() => {
    reFetchAssets();
  }, [resourcesSortBy]);

  const fetchMyUploads = async () => {
    const { data } = await axListMyUploads();

    // housekeeping for expired assets
    const newAssetsHashKeys = data.map((a) => a.hashKey);
    const allUnUsedAssets = await getManyByKey("isUsed", 0);
    for (const asset of allUnUsedAssets) {
      if (!newAssetsHashKeys.includes(asset.hashKey) && asset.status === AssetStatus.Uploaded) {
        await deleteByID(asset.id);
      }
    }

    // Update all fetched assets into IndexedDB
    for (const asset of data) {
      const dbAsset = await getOneByKey("hashKey", asset.hashKey);
      if (!dbAsset) {
        await add({
          ...asset,
          status: AssetStatus.Uploaded,
          url: null,
          contributor: "",
          caption: "",
          rating: 0,
          licenseId: SITE_CONFIG.LICENSE.DEFAULT,
          isUsed: 0,
        });
      }
    }

    await reFetchAssets();
  };

  useEffect(() => {
    setupDB();
    fetchMyUploads();
  }, []);

  const updateLocalAssetStatus = async (hashKey, status: AssetStatus) => {
    setAssets((_draft) => {
      const index = _draft.a.findIndex((a) => a.hashKey === hashKey);
      if (index > -1) {
        _draft.a[index].status = status;
      }
    });
    setMediaGalleryAssets((_draft) => {
      const index = _draft.a.findIndex((a) => a.hashKey === hashKey);
      if (index > -1) {
        _draft.a[index].status = status;
      }
    });
  };

  const handleMediaFiles = async (pendingResource, noSave) => {
    try {
      const r = await axUploadMediaGalleryResource(pendingResource);
      if (r.success && noSave) {
        await update({
          ...pendingResource,
          status: AssetStatus.Uploaded,
        });
        await updateLocalAssetStatus(pendingResource.hashKey, AssetStatus.Uploaded);
      }
    } catch (e) {
      console.error(e);
      if (noSave) {
        await updateLocalAssetStatus(pendingResource.hashKey, AssetStatus.Pending);
      }
    }
  };

  const uploadPendingResource = async (pendingResource, noSave = true) => {
    if (noSave) {
      await updateLocalAssetStatus(pendingResource.hashKey, AssetStatus.InProgress);
    }

    handleMediaFiles(pendingResource, noSave);
  };

  const tryResourceSync = async () => {
    const pendingResources = await getManyByKey("status", AssetStatus.Pending);

    const uploadPromises = pendingResources.map((pendingResource) =>
      uploadPendingResource(pendingResource)
    );

    await Promise.all(uploadPromises);
  };

  useEffect(() => {
    assets.a.length && tryResourceSync();
  }, [assets.a.length]);

  const addToMediaGalleryAssets = async (hashKey) => {
    const a = await getOneByKey("hashKey", hashKey);

    if (a?.dateCreated) {
      emit(FORM_DATEPICKER_CHANGE + "createdOn", a?.dateCreated);
    }

    setMediaGalleryAssets((_draft) => {
      _draft.a.push(a);
    });
  };

  const addAssets = async (newAssets, addToMediaGallery) => {
    console.warn("newAssets , addToMediaGallery", newAssets, addToMediaGallery);

    await Promise.all(newAssets.map((o) => add(o)));
    await reFetchAssets();
    if (addToMediaGallery) {
      newAssets.forEach(({ hashKey }) => addToMediaGalleryAssets(hashKey));
    }
  };

  const removeAsset = async (asset) => {
    const { success } = await axRemoveMyUploads(asset);
    if (success) {
      await deleteByID(asset.id);
      await reFetchAssets();
      notification(t("Sucess"), NotificationType.Success);
    } else {
      notification(t("Failed"), NotificationType.Error);
    }
  };

  const removeMediaGalleryAsset = async (hashKey) => {
    setMediaGalleryAssets((_draft) => {
      const index = _draft.a.findIndex((o) => o.hashKey === hashKey);
      _draft.a.splice(index, 1);
    });
  };

  const updateMediaGalleryAssets = async (index, hashKey, key, value) => {
    if (props.isCreate) {
      const asset = await getOneByKey("hashKey", hashKey);
      await update({ ...asset, [key]: value });
    }
    setMediaGalleryAssets((_draft) => {
      _draft.a[index][key] = value;
    });
  };

  return (
    <ManageMediaGalleryContext.Provider
      value={{
        mediaGalleryAssets: mediaGalleryAssets.a,
        assets: assets.a,
        setMediaGalleryAssets,
        addAssets,
        removeAsset,
        addToMediaGalleryAssets,
        removeMediaGalleryAsset,
        updateMediaGalleryAssets,
        uploadPendingResource,
        resourcesSortBy,
        setResourcesSortBy,

        licensesList: props.licensesList,
      }}
    >
      {props.children}
    </ManageMediaGalleryContext.Provider>
  );
};

export default function useManageMediaGallery() {
  return useContext(ManageMediaGalleryContext);
}
