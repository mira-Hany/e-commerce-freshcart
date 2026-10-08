export interface LestResponse <type>{
    data: type[],
    result:number,
    metadata: Metadata
}

export interface Metadata{
    currentPage: number,
     limit: number
     numberOfPages: number
}