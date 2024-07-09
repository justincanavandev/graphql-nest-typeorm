import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './graphql/entities/User';
import { UsersModule } from './users/users.module';
import { UserSettings } from './graphql/entities/UserSettings';
// import { UserSettings } from './graphql/models/UserSettings';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'nest_graphql_typeorm_practice',
      entities: [UserSettings, User],
      synchronize: true,
    }),
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: `src/schema.gql`,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
