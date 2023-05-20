import { useState } from "react"

const useLogicModal = (defaultValue: boolean) => {
    const [open, setOpen] = useState<boolean>(defaultValue)
    const [data, setData] = useState<any>('')

    const handleOpen = (data?: any) => {
        setOpen(true)

        //Si se manda el parametro de data, se seteará.
        data && setData(data)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return {
        open,
        data,
        handleOpen,
        handleClose
    }
}

export default useLogicModal