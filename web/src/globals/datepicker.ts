import styled, { css } from 'styled-components';

type Props = {
  secondary?: boolean;
  inset?: boolean;
};
export const DatePickerStyles = styled.div<Props>`
  & > .react-datepicker-wrapper {
    width: 100%;

    & > .react-datepicker__input-container {
      display: inline-flex;
      /*  Input styles  */
      & .fin--input {
        width: 100%;
        flex: 1 0 auto;
        background: transparent;
        font-weight: 500;
        font-size: 1.125rem;
        padding-top: 4px;
        padding-bottom: 4px;
        margin-top: 2px;
        box-shadow: none;
        color: ${({ theme }) => theme.colors.textPrimary};
        ${({ secondary }) =>
          secondary &&
          css`
            background: ${({ theme }) => theme.colors.darkThree};
            font-size: 0.7rem;
            padding: 0 6px;
            height: 32px;
            width: 82px;
            text-align: center;
            font-weight: 600;
            font-family: inherit;
          `}

        ${({ inset }) =>
          inset &&
          css`
            height: 38px;
            width: 100%;
            border-radius: 3px;
            border: 1px solid transparent;
            outline: 0;
            border-top: none;
            border-bottom: 1px solid #131619;
            background: ${({ theme }) => theme.colors.darkOne};
            color: #fff;
            font-family: inherit;
            font-size: 1rem;
            padding: 0.5rem 0.5rem;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.39), 0 -1px 1px #131619,
              0 1px 0 #131619;
          `}
      }
    }
  }
  & .fin {
    background: ${({ theme }) => theme.colors.darkTwo};
    border: 1px solid transparent;
    font-family: 'Poppins', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';

    & > .react-datepicker__triangle {
      border-bottom-color: ${({ theme }) => theme.colors.darkTwo};

      &::before {
        border-bottom-color: ${({ theme }) => theme.colors.darkThree};
      }
    }
    & > button.react-datepicker__navigation.react-datepicker__navigation--next {
      border-left-color: ${({ theme }) => theme.colors.textSecondary};
    }
    & > button.react-datepicker__navigation.react-datepicker__navigation--previous {
      border-right-color: ${({ theme }) => theme.colors.textSecondary};
    }

    ${({ secondary }) =>
      secondary &&
      css`
        border: 1px solid ${({ theme }) => theme.colors.darkThree};
        & > .react-datepicker__triangle {
          border-bottom-color: ${({ theme }) => theme.colors.darkTwo};

          &::before {
            border-bottom-color: ${({ theme }) => theme.colors.darkThree};
          }
        }
      `}
  }

  & .react-datepicker__header {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.darkTwo};

    & > .react-datepicker__current-month {
      color: ${({ theme }) => theme.colors.textPrimary};
    }

    & > .react-datepicker__day-names .react-datepicker__day-name {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }

  & .react-datepicker__month {
    & > .react-datepicker__week .react-datepicker__day {
      color: ${({ theme }) => theme.colors.textPrimary};

      &:hover {
        color: ${({ theme }) => theme.colors.textPrimary};
        background-color: ${({ theme }) => theme.colors.darkThree};
      }
    }
  }

  & .react-datepicker__week {
    & > .react-datepicker__day.react-datepicker__day--selected {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
