import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  width: 100%;
`;
export const ChartContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;

  @media (max-width: 1023px) {
    flex-direction: column-reverse;
  }
`;

export const TransactionsContainer = styled.section`
  flex-basis: 50%;
  @media ${({ theme }) => theme.device.tabletAndDown} {
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    width: 100%;
  }
`;

export const InsightsContainer = styled.section`
  flex-basis: 50%;
  padding-left: 20px;
  margin-bottom: 20px;

  @media (max-width: 1023px) {
    padding-left: 0;
  }
`;
