import { FormControl, Input, Text } from 'native-base'
import { ComponentProps } from 'react'

import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from 'react-hook-form'

type FormInputControllerProps<FieldsType extends FieldValues> = ComponentProps<
  typeof Input
> & {
  name: Path<FieldsType>
  defaultValue?: string
  rules?: RegisterOptions
  error?: FieldError
  control: Control<FieldsType>
}

type Props<FieldsType extends FieldValues> =
  FormInputControllerProps<FieldsType> & {
    label?: string
    placeholder?: string
  }

export const TextBoxField = <FieldsType extends FieldValues>({
  rules,
  label,
  control,
  name,
  placeholder,
  ...rest
}: Props<FieldsType>) => {
  const { fieldState } = useController({
    name,
    control,
    rules,
  })

  const isRequired = rules != null && 'required' in rules

  return (
    <FormControl isRequired={isRequired}>
      {label != null && <FormControl.Label>{label}</FormControl.Label>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChangeText={(val) => onChange(val)}
            {...rest}
          />
        )}
        rules={rules}
      />
      {fieldState.error && (
        <Text size={'xs'} color="red.400" height={5}>
          {fieldState.error.message}
        </Text>
      )}
    </FormControl>
  )
}
