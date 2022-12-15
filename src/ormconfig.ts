import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres123',
    database: 'nestjs_training',
    entities: [__dirname + '/**/*.model{.ts,.js}'],
    synchronize: true
}

export default config;