import { TableInstance } from 'react-table';
import { Container, PageCountWrapper, ActionsWrapper, Actions } from './style';
import DropdownButton, { DropdownItems } from '@Common/DropdownButton';

function TablePagination<T extends Record<string, unknown>>({
  instance,
}: {
  instance: TableInstance<T>;
}) {
  const {
    pageOptions,
    gotoPage,
    state: { pageIndex },
  } = instance;

  const pageItems: DropdownItems = pageOptions.map((page) => ({
    label: `Page ${page + 1}`,
    onSelect: () => gotoPage(page),
  }));

  return (
    <Container>
      <PageCountWrapper>
        <div>
          Viewing page {pageIndex + 1} of {pageOptions.length}
        </div>
      </PageCountWrapper>
      <ActionsWrapper>
        <Actions>
          <DropdownButton
            selected={`Page ${pageIndex + 1}`}
            id="transaction-page"
            items={pageItems}
          />
        </Actions>
      </ActionsWrapper>
    </Container>
  );
}

export default TablePagination;