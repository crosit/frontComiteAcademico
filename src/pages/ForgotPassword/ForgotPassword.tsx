import { Image, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/logo-login.png'
import { BtnLng } from '../../components'
import { ForgotPassForm } from './components'

type Props = {}

export default function ForgotPassword({ }: Props) {
  const { t } = useTranslation()

  return (
    <div className='forgot-pass-container'>
      <Space className='forgot-pass-content' direction='vertical'>
        <Image src={logo} className='login-logo' preview={false} />
        <Typography className='forgot-pass-title'>{t('forgot-pass.forgotPass')}</Typography>
        <Typography className='forgot-pass-text'>
          {t('forgot-pass.textForgotPass')}
        </Typography>
        <ForgotPassForm />
        <BtnLng className='button-lng-white' />
      </Space>
    </div>
  )
}

ForgotPassword.auth = false