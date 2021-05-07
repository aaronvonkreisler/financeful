import Paper from '@Common/Paper';
import { Header, Container } from './style';
import { AssetsAndLiabilitesResponse } from '@Generated/graphql';
// import { formatCurrency } from '@Lib/money-utils';
import RangeBar from './RangeBar';
interface Props {
  data: AssetsAndLiabilitesResponse;
}

function BalanceOverview({ data }: Props) {
  return (
    <Paper maxHeight="350px" maxWidth="400px">
      <Container>
        <Header>
          <h3>Net Worth</h3>
          {/* <h4>{formatCurrency(data.aggregateBalance)}</h4> */}
          <h4>$120,000,000.00</h4>
        </Header>
        <RangeBar id="assets" labelAmount={4000.21} labelText="Assets" />
        <RangeBar
          id="liabilities"
          percentOfAssets={`${40 * -1}%`}
          labelText="Liabilites"
          labelAmount={2000.22}
          secondary
        />
      </Container>
    </Paper>
  );
}

export default BalanceOverview;
