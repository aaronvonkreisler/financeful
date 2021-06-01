import Task from '@Components/Tasks';
import React from 'react';
import { useGetUncategorizedLengthQuery } from '@Generated/graphql';

function TaskList() {
  const { data, loading, error } = useGetUncategorizedLengthQuery();

  if (error) {
    return null;
  }

  return (
    <>
      {data?.getUncategorizedLength && data.getUncategorizedLength > 0 ? (
        <Task
          heading={`Review ${data?.getUncategorizedLength} transactions`}
          subheading="Ensure your transactions are categorized"
          loading={loading}
          onClick={() => console.log('hi')}
        />
      ) : null}
    </>
  );
}

export default TaskList;
