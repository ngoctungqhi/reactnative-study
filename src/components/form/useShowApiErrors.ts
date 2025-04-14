export const useShowApiErrors = () => {
  const toast = useToast()
  const [t] = useTranslation()

  const showApiErrors = useCallback(
    (error: unknown) => {
      const decodedError = isApiErrorResult(error)

      if (decodedError) {
        const isJwtMissing = IsApiErrorJwtMissingError(error.data)
        if (!isJwtMissing) {
          toast.error(
            t(
              `message.apiError.${error.data.code}`,
              error.data as { [key: string]: any }
            )
          )
        }
      } else {
        toast.error(
          t('message.apiError.unknownResult', {
            error: JSON.stringify(error),
          })
        )
      }
    },
    [t, toast]
  )

  return [showApiErrors]
}
