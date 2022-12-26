export interface IBaseService<T, E> {
    findAll(query?: unknown): Promise<unknown>
    findOne(id: number): Promise<T>
    create(item: E): Promise<T>
    update(id: number, item: E): Promise<T>
    remove(id: number): void
}