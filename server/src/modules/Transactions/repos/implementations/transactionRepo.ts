import { DataSource } from '@Shared/core/DataSource';
import { Transaction } from '@Shared/types';
import { ITransactionRepo } from '../transactionRepo';
import { TransactionInput } from '../../types/transaction.types';

export class TransactionRepo extends DataSource implements ITransactionRepo {
  constructor() {
    super();
  }

  private createQueryOptions(): any {
    return {
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        account: {
          select: {
            accountName: true,
            id: true,
          },
        },
      },
    };
  }

  public async findMany(userId: string): Promise<Transaction[]> {
    const options = this.createQueryOptions();
    return await this.client.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        date: 'desc',
      },
      ...options,
    });
  }

  public async findOne(id: string): Promise<Transaction | null> {
    const options = this.createQueryOptions();

    return await this.client.transaction.findUnique({
      where: {
        id: id,
      },
      ...options,
    });
  }

  public async createOne(
    input: TransactionInput,
    userId: string,
  ): Promise<Transaction> {
    const baseOptions = this.createQueryOptions();

    let transactionDate = new Date(input.date);

    const { accountId, ...filteredInput } = input;

    const updatedAccount = await this.client.account.update({
      where: {
        id: input.accountId,
      },
      data: {
        balance:
          input.type === 'INCOME'
            ? { increment: input.amount }
            : { decrement: input.amount },
        transaction: {
          create: {
            ...filteredInput,
            userId,
            date: transactionDate,
            categoryId: input.categoryId ? input.categoryId : null,
            amount: input.type === 'INCOME' ? input.amount : input.amount * -1,
            isCashIn: input.type === 'INCOME',
            isCashOut: input.type === 'EXPENSE',
            isTransfer: false,
            isUncategorized: !input.categoryId,
          },
        },
      },
      select: {
        transaction: {
          where: {
            date: transactionDate,
          },
          ...baseOptions,
        },
      },
    });

    const newTransaction = updatedAccount.transaction[0];

    console.log(newTransaction);

    const transaction = await this.client.transaction.create({
      data: {
        ...input,
        userId,
        categoryId: input.categoryId ? input.categoryId : null,
        amount: input.type === 'INCOME' ? input.amount : input.amount * -1,
        isCashIn: input.type === 'INCOME',
        isCashOut: input.type === 'EXPENSE',
        isTransfer: false,
        isUncategorized: !input.categoryId,
      },
      ...baseOptions,
    });
    return transaction;
  }

  public async deleteOne(id: string): Promise<void> {
    await this.client.transaction.delete({
      where: {
        id,
      },
    });
    //TODO:
    // update accoutnt where id = deleted transaction accountId

    // put in $prisma.transaction
  }
  public async updateOne(
    id: string,
    input: TransactionInput,
  ): Promise<Transaction> {
    const options = this.createQueryOptions();

    // TODO: Use a nested write to update account balance and transaction.

    const transaction: Transaction = await this.client.transaction.update({
      where: {
        id,
      },
      data: {
        ...input,
        categoryId: input.categoryId ? input.categoryId : null,
        amount: input.type === 'INCOME' ? input.amount : input.amount * -1,
        isCashIn: input.type === 'INCOME',
        isCashOut: input.type === 'EXPENSE',
        isTransfer: false,
        isUncategorized: !input.categoryId,
      },
      ...options,
    });

    return transaction;
  }
}
