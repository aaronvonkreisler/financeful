/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@reach/dialog/styles.css';
import { useState } from 'react';
import { Overlay, Content } from '../style';
import Button from '@Common/Button';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import PaymentForm from './PaymentForm';
import {
  useFetchAccountsAndCategoriesQuery,
  useAddTransactionMutation,
  GetTransactionsDocument,
  TransactionInput,
  TransferInput,
} from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';
import { Form } from './FormProvider';
import TransferForm from './TransferForm';
import { useCreateTransfer } from '../../mutations/useCreateTransfer';

function TransactionForm() {
  const { data, loading, error } = useFetchAccountsAndCategoriesQuery();
  const [addTransaction, submitting] = useAddTransactionMutation();
  const { mutate: createTransfer, loading: submittingTransfer } = useCreateTransfer();

  const [showDialog, setShowDialog] = useState(false);
  const smallDevice = useMediaQuery('(max-width: 605px)');
  const { showAlert } = useAlert();

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const onPaymentSubmit = async (values: TransactionInput) => {
    const response = await addTransaction({
      variables: { input: values },
      update: (cache, { data: createTransaction }) => {
        cache.modify({
          fields: {
            getTransactions: (existingFieldData = []) => {
              const newTransactionRef = cache.writeQuery({
                data: createTransaction,
                query: GetTransactionsDocument,
              });
              return [newTransactionRef, ...existingFieldData];
            },
          },
        });
      },
    });

    if (response.data?.createTransaction) {
      showAlert('Transaction successfully added', 'info');
    }
    if (response.errors) {
      showAlert('There was an error creating your transaction', 'error', 5000);
    }
  };

  const onTransferSubmit = async (values: TransferInput) => {
    const response = await createTransfer({ variables: { input: values } });

    if (response.errors) {
      showAlert('There was an error creating your transfer', 'error', 5000);
    }

    if (response.data?.createTransfer) {
      showAlert('Transfer successfully added', 'info');
    }
  };

  return (
    <div>
      <Button onClick={open} variant="primary">
        {smallDevice ? 'New' : 'New Transaction'}
      </Button>
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
                isSubmitting={submitting.loading}
              />
            </Form.Payment>
            <Form.Transfer>
              <TransferForm
                onFormSubmit={onTransferSubmit}
                accounts={data?.getAccounts}
                isSubmitting={false}
                categories={data?.getCategories}
              />
              {/* Remember to change isSubmitting prop */}
            </Form.Transfer>
            <Form.ErrorView />
          </Form>
        </Content>
      </Overlay>
    </div>
  );
}

export default TransactionForm;
