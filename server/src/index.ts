import 'reflect-metadata';
import express from 'express';
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { authChecker as customAuthChecker } from './lib/auth-checker';
import { AuthResolver } from '@Modules/Auth/resolvers/AuthResolver';
import { UserResolver } from '@Modules/Users/resolvers/UserResolver';
import { TransactionResolver } from '@Modules/Transactions/resolvers/TransactionResolver';
import { TransferResolver } from '@Modules/Transactions/resolvers/TransferResolver';
import { AccountResolver } from '@Modules/Accounts/resolvers/AccountResolver';
import { CategoryResolver } from '@Modules/Transactions/resolvers/CategoryResolver';
import { TransferRepo } from '@Modules/Transactions/repos/TransferRepo';

const prisma = new PrismaClient();

const main = async () => {
  const app = express();
  const PORT = process.env.port || 4000;
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AuthResolver,
        UserResolver,
        TransactionResolver,
        TransferResolver,
        CategoryResolver,
        AccountResolver,
      ],
      authChecker: customAuthChecker,
    }),
    context: ({ req }) => ({
      req,
      prisma,
      transferService: new TransferRepo(prisma),
    }),
  });

  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    ),
  );
  server.applyMiddleware({ app });
};

main()
  .catch((e) => {
    console.error(e.message);
    throw e;
  })
  .finally(() => {
    prisma.$disconnect();
  });
