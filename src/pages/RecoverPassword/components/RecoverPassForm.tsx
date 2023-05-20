import { Form, Input, Typography } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Btn } from '../../../components'
import { SizesButton } from '../../../models'
import useRecoverPass from '../hooks/useRecoverPass'

type Props = {
    token: string | undefined
}

export default function ForgotPassForm({ token = '' }: Props) {
    const [form] = Form.useForm()
    const { Item } = Form
    const { Password } = Input
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [error, setError] = useState<boolean>(false)
    const { onFinish, isLoading, onFinishFailed } = useRecoverPass()
    // console.log(token)

    return (
        <div>
            <Form
                name='recover-pass-form'
                form={form}
                onFinish={(values) => onFinish(values.newPassword, token)}
                onFinishFailed={onFinishFailed}
            >
                <Item name='newPassword' rules={[{
                    required: true,
                    message: `${t('common.passRequired')}`,
                }]}
                    className='forgot-pass-input'
                >
                    <Password
                        placeholder={t('common.newPass')!}
                        size='large'
                        className='login-input'
                    />
                </Item>

                <Item name='repeatPassword' rules={[{
                    required: true,
                    message: `${t('common.passRequired')}`,
                }, {
                    validator(_, value) {
                        // console.log(value)
                        // console.log(form.getFieldValue('newPassword'))
                        if (value === form.getFieldValue('newPassword'))
                            return Promise.resolve(setError(false))

                        return Promise.reject(setError(true))
                    },
                }]}
                    className='forgot-pass-input'
                // extra={error && <div><Typography.Text type='danger'> {t('recover-pass.passMatch')} </Typography.Text></div>}
                >
                    <Password
                        placeholder={t('recover-pass.repeatPass')!}
                        size='large'
                        className='login-input'
                    />
                </Item>
                {error && <div style={{ marginBottom: '5%' }}>
                    <Typography.Text type='danger'> {t('recover-pass.passMatch')} </Typography.Text>
                </div>}

                <Item>
                    <Btn
                        text={t('recover-pass.changePass')}
                        htmlType='submit'
                        className='button-login'
                        size={SizesButton.LARGE}
                        loading={isLoading}
                    />
                </Item>
            </Form>
        </div>
    )
}