import axios from '../../../interceptors/axiosInterceptor'

export const forgot_pass = async (email: string) => {
    
    //Quitar los headers cuando ya no necesite token para recuperar contraseña

    // return await axios.post('user/req-recover-pass', { email }, {
    //     headers: {
    //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGV4Ljk5MThAaG90bWFpbC5jb20iLCJpYXQiOjE2NzU5NzA0NDksImV4cCI6MTY3NjA1Njg0OX0.EO-ywZM0S1rIpcblGPrFm2RDo6YmfdJCyNtprftiNQM'
    //     }
    // }).then((res: any) => res)

    return await axios.post('user/req-recover-pass', { email }, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbGV4Ljk5MThAaG90bWFpbC5jb20iLCJpYXQiOjE2NzU5NzA0NDksImV4cCI6MTY3NjA1Njg0OX0.EO-ywZM0S1rIpcblGPrFm2RDo6YmfdJCyNtprftiNQM'
        }
    })
        .then((res) => res)
        .catch((error) => {
            throw new Error(error)
        })
}