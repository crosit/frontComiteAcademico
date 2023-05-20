import { Divider, Modal } from 'antd'
import React, { ReactElement } from 'react'
import Btn from './Btn'

type Props = {
    open: boolean
    handleOpen?: () => void
    handleClose: () => void
    handleSubmit?: (data?: any) => void
    title: string
    content: ReactElement
    footer: any
}

export default function ModalSimple({
    open = false,
    handleClose,
    handleOpen,
    handleSubmit,
    title = '',
    content = <></>,
    footer = <></>
}: Props) {

    return (
        <Modal
            title={title}
            open={open}
            onOk={handleClose}
            onCancel={handleClose}
            centered
            className='modal'
            footer={footer}
        >
            <Divider className='divider-black' />
            {content}
        </Modal>
    )
}