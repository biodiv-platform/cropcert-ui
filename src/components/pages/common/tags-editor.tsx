import { SelectAsyncInputField } from "@components/form/select-async";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

interface TagEditorProps {
  queryFunc;
  tags?;
  onChange;
}
export default function ResourceTagsEditor({ queryFunc, tags, onChange }: TagEditorProps) {
  const mapOriginalTags = (tags) => tags.map(({ value, label }) => ({ name: label, id: value }));

  const hForm = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        tags: Yup.array().nullable(),
      })
    ),
    defaultValues: { tags },
  });

  const onTagsQuery = async (q) => {
    const { data } = await queryFunc(q);
    return data.map((tag) => ({ label: tag.name, value: tag.id, version: tag.version }));
  };

  const handleOnChange = (selectedOptions) => {
    onChange(mapOriginalTags(selectedOptions));
  };

  return (
    <FormProvider {...hForm}>
      <form>
        <SelectAsyncInputField
          name="tags"
          multiple={true}
          onQuery={onTagsQuery}
          mb={2}
          placeholder="Select tags"
          onChange={handleOnChange}
        />
      </form>
    </FormProvider>
  );
}
