import { Space, Image, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import logo from '../../assets/logo-login.png'
import { BtnLng } from '../../components'
import { RecoverPassForm } from './components'

type Props = {}

export default function RecoverPassword({ }: Props) {
    const { t } = useTranslation()
    const { token } = useParams()

    return (
        <div className='forgot-pass-container'>
            <Space className='forgot-pass-content' direction='vertical'>
                <Image src={logo} className='login-logo' preview={false} />
                <Typography className='forgot-pass-title'>{t('recover-pass.recoverPass')}</Typography>
                <Typography className='forgot-pass-text'>
                    {t('recover-pass.textRecoverPass')}
                </Typography>
                <RecoverPassForm token={token}/>
                <BtnLng className='button-lng-white' />
            </Space>
        </div>
    )
}

RecoverPassword.auth = false