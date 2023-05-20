export const check_status_code = (statusCode: any) => {
    if (statusCode === 200 || statusCode === 201)
        return true

    return false
}

export const check_status_axios = (response: any, callback: () => void, callbackError?: () => void) => {
    if (check_status_code(response)) {
        callback()

        return
    }

    callbackError && callbackError()
}