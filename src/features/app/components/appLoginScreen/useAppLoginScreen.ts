import { useLoginMutation } from 'features/app/apis/appApis'
import { useNavigation } from '@react-navigation/native'
import { changeLanguage, setLoggedInUser } from 'features/app/states/appSlice'
import { useAppDispatch, useAppSelector } from 'states/hooks'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ValidateRules } from 'utils/form'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppLanguage } from 'enums/app'

type FormValues = {
  loginId: string
  password: string
  tenantAlias: string
}

const formInitialValues: FormValues = {
  loginId: '',
  password: '',
  tenantAlias: '',
}

export const useAppLoginScreen = () => {
  const [loginMutation] = useLoginMutation()
  const dispatch = useAppDispatch()
  const { navigate } = useNavigation()
  const { t, i18n } = useTranslation()

  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, formState, control } = useForm<FormValues>({
    criteriaMode: 'all',
    defaultValues: formInitialValues,
  })

  const canSend = useMemo(
    // formState.isValidはerrorsが空でもfalseになることがあるためerrorsで判定する
    () => formState.isDirty && Object.keys(formState.errors).length === 0,
    // formStateはproxyなのでformState自体をlistenする必要がある
    // https://react-hook-form.com/api/useform/formstate
    [formState]
  )

  const handleFormSubmit = useCallback(() => {
    const onSubmit: SubmitHandler<FormValues> = async (values) => {
      try {
        const response = await loginMutation({
          loginId: values.loginId,
          password: values.password,
          tenantAlias: values.tenantAlias,
        }).unwrap()

        // 秘匿ではないuser情報を保存
        dispatch(setLoggedInUser(response.data))
        navigate('Home' as never, {} as never)
      } catch (err) {
        console.log('================', err)
      }
    }

    handleSubmit(onSubmit)()
  }, [dispatch, handleSubmit, loginMutation])

  const validateRules: ValidateRules<FormValues> = useMemo(
    () => ({
      loginId: {
        required:
          t('message.general.isRequired', {
            name: t('label.username'),
          }),
      },
      password: {
        required:
          t('message.general.isRequired', {
            name: t('label.password'),
          }),
      },
      tenantAlias: {
        required:
          t('message.general.isRequired', {
            name: t('label.tenantId'),
          }),
      },
    }),
    [t]
  )

  const currentLanguage = useAppSelector((state) => state.app.currentLanguage)
  // 言語切替ボタン押下時、言語設定を更新
  const handleChangeLocaleButtonPress = useCallback(() => {
    if (currentLanguage === AppLanguage.Ja) {
      dispatch(changeLanguage(AppLanguage.En))
    } else if (currentLanguage === AppLanguage.En) {
      dispatch(changeLanguage(AppLanguage.Ja))
    }
  }, [currentLanguage, dispatch])

  // 言語設定変更時、表示言語を切り替える
  useEffect(() => {
    if (currentLanguage === AppLanguage.En) {
      i18n.changeLanguage('en')
    } else if (currentLanguage === AppLanguage.Ja) {
      i18n.changeLanguage('ja')
    }
  }, [currentLanguage, i18n])

  return {
    handleFormSubmit,
    formInitialValues,
    control,
    validateRules,
    canSend,
    showPassword,
    setShowPassword,
    handleChangeLocaleButtonPress,
    currentLanguage,
    t,
  }
}
