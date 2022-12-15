export interface IBaseService<T> {
    findAll(): T[]
    findOne(id: number): T
    save(item: T): void
    remove(id: number): void
}