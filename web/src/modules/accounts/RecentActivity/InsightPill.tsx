import React from 'react';
import { PillContainer, PillRight, PillLeft } from './style';
import { TransactionTypes, InsightPieChartData } from '@Generated/graphql';
import { capitalizeFirstLetter } from '@Lib/string-formating';
import { formatCurrency } from '@Lib/money-utils';
import { theme } from '@Constants/theme';

interface Props {
  data: InsightPieChartData;
  'data-testid'?: string;
}

const generateColor = (label: TransactionTypes) => {
  switch (label) {
    case TransactionTypes.Income:
      return theme.colors.green;
    case TransactionTypes.Expenses:
      return theme.colors.red;
    case TransactionTypes.Transfers:
      return theme.colors.primary;
  }
};

function InsightPill(props: Props) {
  const { data } = props;
  return (
    <PillContainer data-testid={props['data-testid']}>
      <PillLeft $color={generateColor(data.name)}>
        <span />
      </PillLeft>
      <PillRight>
        <h4>{formatCurrency(data.value)}</h4>
        <p>{capitalizeFirstLetter(data.name)}</p>
      </PillRight>
    </PillContainer>
  );
}

export default InsightPill;
