import styled from 'styled-components';

export const ActionsWrapper = styled.div`
  width: 100%;
  & > button {
    margin-top: 10px;
  }
`;

export const ActivityContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const TasksContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const ReceiptContainer = styled.div`
  display: none;

  @media (min-width: 905px) {
    display: inline-flex;
  }
`;
