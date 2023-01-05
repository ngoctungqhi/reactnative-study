import { Box, Button, Icon, Pressable, Image, Text } from 'native-base'
import LogoSvg from 'assets/images/logo.svg'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { useAppLoginScreen } from './useAppLoginScreen'
import { TextBoxField } from 'components/form/textBoxField'
import { japanFlag, usaFlag } from 'assets/images'

export const AppLoginScreen = () => {
  const {
    handleFormSubmit,
    control,
    validateRules,
    showPassword,
    setShowPassword,
    handleChangeLocaleButtonPress,
    currentLanguage,
    t,
  } = useAppLoginScreen()

  return (
    <Box px={10} height={'100%'} style={[styles.container]}>
      <Pressable onPress={handleChangeLocaleButtonPress} alignItems="flex-end">
        <Image
          key={currentLanguage}
          source={currentLanguage === 'ja' ? japanFlag : usaFlag}
          alt="Flag"
        />
      </Pressable>
      <LogoSvg width={'100%'} height={'15%'} />
      <TextBoxField
        control={control}
        name="loginId"
        placeholder={t('label.username')}
        size={'xl'}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="person" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        rules={validateRules.loginId}
      />

      <TextBoxField
        mt={3}
        control={control}
        name="password"
        placeholder={t('label.password')}
        size={'xl'}
        type={showPassword ? 'text' : 'password'}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="lock" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        InputRightElement={
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Icon
              as={
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        rules={validateRules.password}
      />

      <TextBoxField
        mt={3}
        control={control}
        name="tenantAlias"
        placeholder={t('label.tenantId')}
        size={'xl'}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="group" />}
            size={5}
            ml="2"
            color="muted.400"
          />
        }
        rules={validateRules.tenantAlias}
      />

      <Box mt={5} alignItems="flex-end">
        <Button width={'100%'} onPress={handleFormSubmit}>
          {t('action.login')}
        </Button>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
