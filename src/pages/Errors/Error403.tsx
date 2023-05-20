import { Space, Image, Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Btn } from '../../components'
import { SizesButton } from '../../models'

export const Error403 = () => {
    const navigate = useNavigate()

    return (
        <div className='error-container'>
            <Space className='error-content' direction='vertical'>
                <div className='error-title'>
                    error 403
                </div>
                <div className='error-text'> Nuestra abejas obreras no te dieron accesso a la celda que estás buscado.</div>
                <Btn
                    text='Regresar a inicio'
                    className='button-back-login'
                    onClick={() => navigate('/')}
                    size={SizesButton.LARGE}
                />
            </Space>
        </div>
    )
}