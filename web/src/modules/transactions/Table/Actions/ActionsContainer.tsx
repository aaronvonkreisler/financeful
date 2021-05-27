import React from 'react';
import { EditFormController } from '@Modules/transactions/Forms/EditTransactionForm';
import {
  Transaction,
  useDeleteTransactionMutation,
  useDeleteTransferMutation,
} from '@Generated/graphql';
import { useAlert } from '@Context/alert/alertContext';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transaction: Transaction | null;
};

function ActionsContainer({ isModalOpen, setIsModalOpen, transaction }: Props) {
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [deleteTransfer] = useDeleteTransferMutation();
  const { showAlert } = useAlert();

  if (!transaction) {
    return null;
  }

  const onDelete = () => {
    if (transaction.isTransfer && transaction.transferId) {
      return handleTransferDelete(transaction.transferId);
    }

    handlePaymentDelete();
  };

  const handlePaymentDelete = async () => {
    try {
      const { id } = transaction;
      const { data } = await deleteTransaction({
        variables: { id },
        update(cache) {
          cache.modify({
            fields: {
              getTransactionsRange(
                existingTransactionsRef: Transaction[],
                { readField },
              ) {
                return existingTransactionsRef.filter(
                  (transactionRef) => id !== readField('id', transactionRef),
                );
              },
            },
          });
        },
      });

      setIsModalOpen(false);
      if (data?.deleteTransaction) {
        showAlert(data.deleteTransaction, 'info');
      }
    } catch (err) {
      setIsModalOpen(false);

      showAlert('Please try again later', 'error', 5000);
    }
  };
  const handleTransferDelete = async (transferId: string) => {
    try {
      const { data } = await deleteTransfer({
        variables: { transferId },
        update(cache) {
          cache.modify({
            fields: {
              getTransactionsRange(
                existingTransactionsRef: Transaction[],
                { readField },
              ) {
                return existingTransactionsRef.filter(
                  (transactionRef) =>
                    transferId !== readField('transferId', transactionRef),
                );
              },
            },
          });
        },
      });
      setIsModalOpen(false);

      if (data?.deleteTransfer) {
        showAlert(data.deleteTransfer, 'info');
      }
    } catch (error) {
      setIsModalOpen(false);
      showAlert('Please try again later', 'error', 5000);
    }
  };

  return (
    <EditFormController
      transaction={transaction}
      closeModal={() => setIsModalOpen(false)}
      isOpen={isModalOpen}
      onDelete={onDelete}
    />
  );
}

export default ActionsContainer;
