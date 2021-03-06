/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import { Column, Cell } from 'react-table';
import { useParams } from 'react-router-dom';
import { formatDate } from '@Lib/date-formatting';
import { useGetTransactionsRangeQuery, Transaction } from '@Generated/graphql';
import { formatMoneyFromCentsToDollars } from '@Lib/money-utils';
import TransactionTypeCell from '@Modules/transactions/Table/TransactionTypeCell';
import TableSkeleton from '@Modules/transactions/Table/TableSkeleton';
import NoTransactions from '@Modules/transactions/Table/NoTransactions';
import { TableError } from '@Components/ErrorViews';
import { useDateRangeContext } from '@Context/daterange/DateRangeContext';
import { ReactTableProvider } from '@Context/react-table/reactTableContext';
import TableRows from '@Modules/transactions/Table/TableRows';
import TablePagination from '@Modules/transactions/Table/Pagination';

function RecentTransactions() {
  const { id } = useParams<{ id: string }>();

  const {
    range: { startDate, endDate },
  } = useDateRangeContext();
  const { data, loading, error } = useGetTransactionsRangeQuery({
    variables: { input: { startDate, endDate }, accountId: id },
  });

  const columns = useMemo<Column<Record<string, unknown>>[]>(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }: Cell<Transaction>) => {
          return <span>{formatDate(value, 'M/d/yyyy')}</span>;
        },
      },
      {
        Header: () => <span className="hide-small">Payee</span>,
        accessor: 'payee',
        className: 'hide-small',
        Cell: ({ value }: Cell<Transaction>) => {
          return <span className="hide-small">{value}</span>;
        },
      },

      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ value }: Cell<Transaction>) => {
          return <TransactionTypeCell type={value} />;
        },
      },
      {
        Header: () => <span className="align-right">Amount</span>,
        accessor: 'amount',
        Cell: ({ value }: Cell<Transaction>) => {
          return <div className="number">{formatMoneyFromCentsToDollars(value)}</div>;
        },
      },
    ],
    [],
  );

  if (loading) {
    return <TableSkeleton columns={3} rows={10} />;
  }

  if (error) {
    return <TableError error={error} />;
  }

  if (!data?.getTransactionsRange.length) {
    return (
      <NoTransactions heading="No recent transactions" data-testid="empty-transactions" />
    );
  }
  return (
    <ReactTableProvider
      withPagination={true}
      rowCount={10}
      columns={columns}
      data={data.getTransactionsRange}
    >
      <TableRows />
      <TablePagination />
    </ReactTableProvider>
  );
}

export default RecentTransactions;
