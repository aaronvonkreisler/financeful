/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import '@reach/dialog/styles.css';
import { Overlay, Content } from '../style';
import Button from '@Common/Button';
import IconButton from '@Common/IconButton';
import { PlusIcon } from '@Common/Icons';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import {
  useFetchAccountsAndCategoriesQuery,
  TransactionInput,
  TransferInput,
} from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import { Form } from './FormProvider';
import PaymentForm from './PaymentForm';
import TransferForm from './TransferForm';
import { useCreateTransfer } from '../../mutations/useCreateTransfer';
import { useCreateTransaction } from '../../mutations/useCreateTransaction';

type Props = {
  asIcon?: boolean;
  fullWidth?: boolean;
  disableButton?: boolean;
};

function TransactionFormController({ asIcon = false, fullWidth = false, disableButton = false }: Props) {
  const { data, loading, error } = useFetchAccountsAndCategoriesQuery();
  const { mutate: createTransfer, loading: submittingTransfer } = useCreateTransfer();
  const {
    mutate: createTransaction,
    loading: submittingTransaction,
  } = useCreateTransaction();
  const [showDialog, setShowDialog] = useState(false);
  const smallDevice = useMediaQuery('(max-width: 605px)');
  const { showAlert } = useAlert();

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const onPaymentSubmit = async (values: TransactionInput) => {
    const response = await createTransaction({ variables: { input: values } });

    if (response.data?.createTransaction) {
      showAlert('Transaction successfully added', 'info');
    }
    if (response.errors) {
      showAlert('There was an error creating your transaction', 'error', 5000);
    }
  };

  const onTransferSubmit = async (values: TransferInput) => {
    const { data: response, errors } = await createTransfer({
      variables: { input: values },
    });

    if (errors) {
      showAlert('There was an error creating your transfer', 'error', 5000);
    }

    if (response?.createTransfer.transactions) {
      showAlert('Transfer successfully added', 'info');
    }

    if (response?.createTransfer.error) {
      showAlert(response.createTransfer.error.message, 'error', 7000);
    }
  };

  return (
    <>
      {asIcon ? (
        <IconButton blue onClick={open} ariaText="Add transaction" disabled={disableButton}>
          <PlusIcon />
        </IconButton>
      ) : (
        <Button onClick={open} variant="primary" fullWidth={fullWidth} disabled={disableButton}>
          {smallDevice ? 'New' : 'New Transaction'}
        </Button>
      )}

      <Overlay isOpen={showDialog} onDismiss={close}>
        <Content aria-label="Add transaction form">
          <Form isFetchingData={loading} fetchError={error}>
            <Form.Title onClose={close} />
            <Form.Loader />
            <Form.Payment>
              <PaymentForm
                onFormSubmit={onPaymentSubmit}
                categories={data?.getCategories}
                accounts={data?.getAccounts}
                isSubmitting={submittingTransaction}
              />
            </Form.Payment>
            <Form.Transfer>
              <TransferForm
                onFormSubmit={onTransferSubmit}
                accounts={data?.getAccounts}
                isSubmitting={submittingTransfer}
                categories={data?.getCategories}
              />
            </Form.Transfer>
            <Form.ErrorView />
          </Form>
        </Content>
      </Overlay>
    </>
  );
}

export default TransactionFormController;
