import React, { useState, useRef } from 'react';
import { CreateAccountInput } from '@Generated/graphql';
import { ModalRoot, ModalBody, ModalTitle } from '@Components/Modal';
import { useCreateAccount } from '../mutations/useCreateAccount';
import { useAlert } from '@Context/alert/alertContext';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import Button from '@Common/Button';
import IconButton from '@Common/IconButton';
import { PlusIcon } from '@Common/Icons';
import AddAccountForm from './AddAccountForm';
import Progressbar from '@Common/Progressbar';

function AddAccountFormController() {
  const [displayModal, setDisplayModal] = useState(false);
  const { mutate: createAccount, loading } = useCreateAccount();
  const { showAlert } = useAlert();
  const smallDevice = useMediaQuery('(max-width: 600px');

  const close = () => setDisplayModal(false);

  const onFormSubmit = async (values: CreateAccountInput) => {
    try {
      await createAccount({ variables: { input: values } });
      showAlert('Successfully added account', 'info');
    } catch (err) {
      showAlert('We ran into an error. Try again', 'error', 7000);
    }
  };
  const accountNameInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      {smallDevice ? (
        <IconButton ariaText="Add account" onClick={() => setDisplayModal(true)} blue>
          <PlusIcon />
        </IconButton>
      ) : (
        <Button
          variant="primary"
          onClick={() => setDisplayModal(true)}
          data-testid="add-account-button"
        >
          Add account
        </Button>
      )}

      <ModalRoot
        isOpen={displayModal}
        onDismiss={close}
        ariaLabel="Add an account"
        initialFocusRef={accountNameInputRef}
      >
        <ModalTitle title="Add account" onClose={close} />
        {loading && <Progressbar />}
        <ModalBody>
          <AddAccountForm onFormSubmit={onFormSubmit} inputRef={accountNameInputRef} />
        </ModalBody>
      </ModalRoot>
    </>
  );
}

export default AddAccountFormController;
