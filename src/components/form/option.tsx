import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import AddIcon from "@icons/add2";
import DeleteIcon from "@icons/delete";
import { nanoid } from "nanoid";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface IOptionsProps {
  helpText?: string;
  label: string;
  name: string;
  placeholder?: string;
  title?: string;
  mb?: number;
  disabled?: boolean;
  hint?: string;
  isRequired?: boolean;
  hidden?;
  disableValues?;
}

export const OptionsField = ({
  helpText,
  label,
  name,
  placeholder,
  title,
  mb = 4,
  disabled,
  hint,
  isRequired,
  hidden,
  disableValues,
  ...props
}: IOptionsProps) => {
  const { formState, register } = useFormContext();
  const { fields, append, remove: _r } = useFieldArray({ name });

  const add = () => append({ label: "", value: "", valueId: nanoid() });

  const remove = (index) => {
    if (confirm("Are you sure want to delete?")) _r(index);
  };

  return (
    <FormControl
      isInvalid={!!formState?.errors?.[name]?.message}
      mb={mb}
      hidden={hidden}
      isRequired={isRequired}
      id={name}
      {...props}
    >
      {label && <FormLabel htmlFor={name} children={label} />}
      <div>
        {fields.map((field, index) => (
          <SimpleGrid spacing={4} columns={7} key={field.id} mb={4}>
            <GridItem colSpan={3}>
              <Input
                {...register(`${name}.${index}.label`)}
                placeholder="Display Label"
                bg="white"
              />
              <FormErrorMessage children={formState.errors[`${name}.${index}.label`]?.toString()} />
            </GridItem>
            <GridItem colSpan={3}>
              <Input
                {...register(`${name}.${index}.value`)}
                placeholder="Value"
                disabled={disableValues}
                bg="white"
              />
              <FormErrorMessage children={formState.errors[`${name}.${index}.value`]?.toString()} />
            </GridItem>
            <Button
              colorScheme="red"
              type="button"
              onClick={() => remove(index)}
              disabled={disableValues}
              leftIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </SimpleGrid>
        ))}
        <Button
          colorScheme="green"
          leftIcon={<AddIcon />}
          type="button"
          onClick={add}
          disabled={disableValues}
        >
          Add
        </Button>
      </div>
      <FormErrorMessage children={formState?.errors?.[name]?.message?.toString()} />
      {hint && <FormHelperText color="gray.600">{hint}</FormHelperText>}
    </FormControl>
  );
};
