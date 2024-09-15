export const paginate = (
    items: any[],
    page: number = 0,
    perPage: number = 10
) => {
    const start = (page - 1) * perPage
    const end = start + perPage
    console.log(start, end)
    return items.slice(start, end)
}
