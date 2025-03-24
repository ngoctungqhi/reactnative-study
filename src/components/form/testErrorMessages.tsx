import { FC, memo, ReactNode, useCallback } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import {
  ControllerRenderProps,
  Message,
  MultipleFieldErrors,
} from 'react-hook-form'

export type TestErrorMessagesProps = {
  isValid: boolean
  errors: any
  field: ControllerRenderProps<any, any>
}

export const TestErrorMessages: FC<TestErrorMessagesProps> = memo((props) => {
  const customErrorMessageRender: (data: {
    message: Message
    messages?: MultipleFieldErrors
  }) => ReactNode = useCallback(
    ({ message, messages }) =>
      // useFormが「criteriaMode: all」でmessagesが存在する場合はそれを使用してメッセージを出力
      messages ? (
        <div className="flex flex-col gap-1">
          {Object.entries(messages).map(([key, message]) => {
            return (
              <p className="m-0 text-sm Test-error-text" key={key}>
                {message}
              </p>
            )
          })}
        </div>
      ) : message ? (
        <p className="m-0 text-sm Test-error-text">{message}</p>
      ) : null,
    []
  )

  return props.isValid ? null : (
    <ErrorMessage
      errors={props.errors}
      name={props.field.name}
      render={customErrorMessageRender}
    />
  )
})
