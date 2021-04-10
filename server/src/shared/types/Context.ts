import { PrismaClient } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express';
import { ITransferRepo } from '@Modules/Transactions/repos/transferRepo';
import { IAccountRepo } from '@Modules/BankAccounts/repos/accountRepo';
import { IAuthRepo } from '@Modules/Auth/repos/authRepo';

export interface Context extends ExpressContext {
  prisma: PrismaClient;
  user: {
    id: string;
  };
  transferRepo: ITransferRepo;
  accountRepo: IAccountRepo;
  authRepo: IAuthRepo;
}
