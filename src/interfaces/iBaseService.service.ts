export interface IBaseService<T, E> {
    findAll(): Promise<T[]>
    findOne(id: number): T
    save(item: E): void
    remove(id: number): void
}