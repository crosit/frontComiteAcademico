import { Space, Image, Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Btn } from '../../components'
import { SizesButton } from '../../models'

export const Error404 = () => {
    const navigate = useNavigate()

    return (
        <div className='error-container'>
            <Space className='error-content' direction='vertical'>
                <div className='error-title'>
                    error 404
                </div>
                <div className='error-text'> Nuestra abejas obreras no pudieron encontrar la celda de conocimiento que estás buscado.</div>
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