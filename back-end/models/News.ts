interface NewsSection{
    id: number,
    type: string,
    content: string,
    news_id: number,
}

export interface News{
    id: number,
    title: string,
    banner: string,
    clip: string,
    date: Date,
}