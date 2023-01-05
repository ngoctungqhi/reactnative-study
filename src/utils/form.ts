import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'

/**
 * validateRuleの型
 * @example
 * const validateLoginId: ValidateRule<FormValues, 'loginId'> = useMemo(()=>({
 *   required: t('message.general.isRequired', {
 *     name: t('label.username'),
 *   }),
 *   maxLength: {
 *     value: 500,
 *     message: t('message.general.maxLength', {
 *       name: t('label.username'),
 *       value: 500,
 *     }),
 *   },
 * }), [t])
 */
export type ValidateRule<
  TFormValues extends FieldValues,
  TFormName extends FieldPath<TFormValues>
> = RegisterOptions<TFormValues, TFormName>

/**
 * validateRulesの型。
 * @example
 * const validateRules: ValidateRules<FormValues> = useMemo(() => ({
 *     loginId: {
 *       required: t('message.general.isRequired', {
 *         name: t('label.username'),
 *       }),
 *       maxLength: {
 *         value: 500,
 *         message: t('message.general.maxLength', {
 *           name: t('label.username'),
 *           value: 500,
 *         }),
 *       },
 *     },
 *  //...
 * }), [t])
 */
export type ValidateRules<TFormValues extends FieldValues> = {
  [key in keyof TFormValues]: key extends FieldPath<TFormValues>
    ? ValidateRule<TFormValues, key>
    : never
}
