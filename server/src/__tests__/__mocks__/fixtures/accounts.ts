/**
 * @desription
 * Accounts used in mocking the repos that user Prisma to fetch accounts from the DB
 *
 */
export const accounts = [
  {
    id: 'ckorlgy3500523sqsc6akvfnf',
    userId: 'ckorlgy0400113sqs4risg2fb',
    accountName: 'Credit Card',
    accountType: 'Credit',
    balance: -20000,
    bankName: 'Discover',
    isAsset: false,
    isLiability: true,
    isInactive: false,
    createdAt: new Date('2021-05-16T19:51:47.345Z'),
    updatedAt: new Date('2021-05-16T19:51:47.346Z'),
  },
  {
    id: 'ckorlgy2x00453sqstm1pxwyd',
    userId: 'ckorlgy0400113sqs4risg2fb',
    accountName: 'Primary Savings',
    accountType: 'Savings Account',
    balance: 650000,
    bankName: 'Ally Savings',
    isAsset: true,
    isLiability: false,
    isInactive: false,
    createdAt: new Date('2021-05-16T19:51:47.337Z'),
    updatedAt: new Date('2021-05-16T19:51:47.338Z'),
  },
  {
    id: 'ckorlgy2o00383sqsw3mgulgf',
    userId: 'ckorlgy0400113sqs4risg2fb',
    accountName: 'Primary Checking',
    accountType: 'Checking Account',
    balance: 335400,
    bankName: 'Chase',
    isAsset: true,
    isLiability: false,
    isInactive: false,
    createdAt: new Date('2021-05-16T19:51:47.328Z'),
    updatedAt: new Date('2021-05-16T19:51:47.329Z'),
  },
];
