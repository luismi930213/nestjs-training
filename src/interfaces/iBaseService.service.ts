export interface IBaseService<T> {
    findAll(): Promise<T[]>
    findOne(id: number): T
    save(item: T): void
    remove(id: number): void
}