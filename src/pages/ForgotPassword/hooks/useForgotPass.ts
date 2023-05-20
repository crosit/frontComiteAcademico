import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { check_status_axios } from "../../../utilities/check_status_axios.utility"
import { forgot_pass } from "../services/forgot_pass.service"

export default function useForgotPass() {
    const navigate = useNavigate()

    const mutation = useMutation((email: string) => (forgot_pass(email)), {
        onSuccess: async (res: any) => {
            !!res &&
                check_status_axios(
                    res?.statusCode || res?.data?.statusCode,
                    () => {
                        //alert('Revisa tu correo!')
                        navigate('/login')
                    }
                )
        },
        onError: async (error) => console.log('Errorcito: ' + error)
    })

    const onFinish = (email: string) => {
        mutation.mutate(email)
    }

    const onFinishFailed = () => {
        console.log('onFinish Failed')
    }

    return {
        onFinish,
        onFinishFailed,
        isLoading: mutation.isLoading
    }
}