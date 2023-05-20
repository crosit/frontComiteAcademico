import axios from '../../../interceptors/axiosInterceptor'

export const recover_pass = async (password: string, token: string) => {
    //Quitar headers cuando el token ya no sea necesario en este endpoint

    return await axios.patch('user/recover-pass/' + token, { password }, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJyaWNhcmRvLmFjYWRlbWljOThAZ21haWwuY29tIiwiaWF0IjoxNjc1OTczNDYwLCJleHAiOjE2NzYwNTk4NjB9.5P7qPBwZEkeWX1TuDwMy2BcrPGED2LNdvaQrTJgwJzo'
        }
    })
        .then((res) => res)
        .catch((error) => {
            throw new Error(error)
        })
}