import { Form, Input, Typography } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Btn } from '../../../components'
import { SizesButton } from '../../../models'
import useForgotPass from '../hooks/useForgotPass'

type Props = {}

export default function ForgotPassForm({ }: Props) {
    const [form] = Form.useForm()
    const { Item } = Form
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { onFinish, isLoading, onFinishFailed } = useForgotPass()

    return (
        <div>
            <Form
                name='forgot-pass-form'
                form={form}
                onFinish={(values) => onFinish(values.email)}
                onFinishFailed={onFinishFailed}
            >
                <Item name='email' rules={[{
                    required: true,
                    message: `${t('forgot-pass.emailRequired')}`,
                }, {
                    type: 'email',
                    message: `${t('forgot-pass.emailInvalid')}`
                }]}
                    className='forgot-pass-input'
                >
                    <Input
                        placeholder={t('common.email')!}
                        size='large'
                        className='login-input'
                    />
                </Item>

                <Item>
                    <Btn
                        text={t('forgot-pass.recoverAccount')}
                        htmlType='submit'
                        className='button-login'
                        size={SizesButton.LARGE}
                        loading={isLoading}
                    />
                </Item>

                <Item>
                    <Btn
                        text={t('forgot-pass.returnLogin')}
                        className='button-back-login'
                        size={SizesButton.LARGE}
                        onClick={() => navigate('/login')}
                    />
                </Item>
            </Form>
        </div>
    )
}