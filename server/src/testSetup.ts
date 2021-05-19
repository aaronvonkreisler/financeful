import { mockDeep, MockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: MockProxy<PrismaClient>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};
