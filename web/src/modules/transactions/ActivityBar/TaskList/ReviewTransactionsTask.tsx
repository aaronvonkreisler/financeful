import React from 'react';
import { useHistory } from 'react-router-dom';
import Task from '@Components/Tasks';
import { useGetUncategorizedLengthQuery } from '@Generated/graphql';

function ReviewTransactionsTask() {
  const { data, loading, error } = useGetUncategorizedLengthQuery();
  const [heading, setHeading] = React.useState<string>('');
  const [subheading, setSubheading] = React.useState<string>('');
  const history = useHistory();

  React.useEffect(() => {
    setHeading(`Review ${data?.getUncategorizedLength || ''} transactions`);
  }, [data]);

  React.useEffect(() => {
    const value = data?.getUncategorizedLength;

    if (value && value > 0) {
      return setSubheading('Make sure your transactions are properly categorized');
    }

    setSubheading("When you have transactions to review, you'll see them here");
  }, [data]);

  if (error) {
    return null;
  }

  return (
    <>
      <Task
        heading={heading}
        subheading={subheading}
        loading={loading}
        onClick={() => {
          history.push('/transactions?search=uncategorized');
        }}
      />
    </>
  );
}

export default ReviewTransactionsTask;
