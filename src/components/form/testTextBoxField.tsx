import { ComponentProps, useMemo } from 'react'
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form'

/**
 * Usage
 * <TextBoxField<FormValueType>
 *  name=""
 *  control={control}
 *
 * >
 */

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = Omit<
  ComponentProps<typeof TestTextBox>,
  'ref' | 'name' | 'value' | 'onValueChange' | 'onFocusOut' | 'isValid' //これらはcontrollerが提供するのでpropsから除外する
> & {
  id: string
  required?: boolean
  label?: string
  showLabel?: boolean
} & UseControllerProps<TFieldValues, TName>

export const TestTextBoxField = genericMemo(
  <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
    // useController用
    name,
    rules,
    control,
    shouldUnregister,
    defaultValue,
    // ラベル用
    id,
    required = false,
    label,
    showLabel = true,
    // その他
    children,
    ...rest
  }: Props<TFieldValues, TName>) => {
    const { field, fieldState, formState } = useController({
      name,
      control,
      rules,
      shouldUnregister,
      defaultValue,
    })

    // 要素にid属性を付与するためのオブジェクト
    // data-testidのようなカスタム属性はinputAttrで指定する必要がある
    // https://supportcenter.devexpress.com/ticket/details/t1052998/form-unable-to-pass-custom-attributes-to-items
    const inputAttr = useMemo(() => {
      return { id: id, 'data-testid': field.name }
    }, [field.name, id])

    return (
      <div className="flex flex-col gap-1">
        {showLabel && (
          <TestFieldLabel text={label} required={required} htmlFor={id} />
        )}
        <TestTextBox
          {...rest}
          inputAttr={inputAttr}
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}
          onFocusOut={field.onBlur}
          isValid={!fieldState.error}
        >
          {children}
        </TestTextBox>
        <TestErrorMessages
          isValid={!fieldState.error}
          errors={formState.errors}
          field={field}
        />
      </div>
    )
  }
)
