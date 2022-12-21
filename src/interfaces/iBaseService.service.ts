export interface IBaseService<T, E> {
    findAll(): Promise<T[]>
    findOne(id: number): Promise<T>
    save(item: E): Promise<T>
    remove(id: number): void
}