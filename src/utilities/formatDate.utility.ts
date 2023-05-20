export const getLocaleDateString = (date: string) => {
    const formatDate = new Date(date)

    return formatDate.toLocaleDateString()
}