import { Button } from 'antd'
import { ReactElement } from 'react'
import { SizesButton } from '../models'

type Props = {
    text: string
    onClick?: (data: any) => void
    disabled?: boolean
    className?: string
    startIcon?: ReactElement
    size?: SizesButton
    type?: "text" | "primary" | "link" | "ghost" | "default" | "dashed" | undefined
    loading?: boolean
    danger?: boolean
    htmlType?: "button" | "submit" | "reset"
}

export default function Btn({
    disabled = false,
    onClick,
    startIcon = undefined,
    text = '',
    className = '',
    size = SizesButton.MIDDLE,
    type = 'default',
    loading = false,
    danger = false,
    htmlType = 'button'
}: Props) {

    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            icon={startIcon ? startIcon : null}
            className={className}
            size={size}
            type={type}
            loading={loading}
            danger={danger}
            htmlType={htmlType}
        >
            {text}
        </Button>
    )
}