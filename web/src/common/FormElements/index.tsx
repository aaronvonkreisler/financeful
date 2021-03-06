/* eslint-disable react/display-name */
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { DatePickerStyles } from '@Globals/datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  StyledUnderlineInput,
  StyledLabel,
  BorderedLabel,
  TransparentInput,
  TransparentSelect,
  Prefix,
  StyledError,
  StyledInsetInput,
  InsetLabel,
  StyledInsetSelect,
  StyledCheckbox,
} from './style';

type InputTypes = {
  disabled?: boolean;
  id?: string;
  children: React.ReactNode;
  htmlFor?: string;
  type: 'text' | 'password' | 'date';
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  autoFocus?: boolean;
  withPrefix?: boolean;
  prefix?: string;
  ariaDescribedBy?: string;
  required?: boolean;
  'data-testid'?: string;
  style?: React.CSSProperties;
};

export type CheckboxProps = {
  disabled?: boolean;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  'data-testid'?: string;
};

export const CheckBox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    return (
      <StyledCheckbox
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        id={props.id}
        disabled={props.disabled}
        data-testid={props['data-testid']}
        ref={ref}
      />
    );
  },
);

type InsetOptions =
  | { withoutLabel: true; children?: never }
  | { withoutLabel?: false; children: React.ReactNode };

type InputPropsWithoutChilren = Omit<InputTypes, 'children'>;

type InsetInputProps = InputPropsWithoutChilren & InsetOptions;

export const InsetInput = React.forwardRef<HTMLInputElement, InsetInputProps>(
  ({ withoutLabel = false, ...props }, ref) => {
    return (
      <>
        {withoutLabel ? (
          <StyledInsetInput
            type={props.type}
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            autoFocus={props.autoFocus}
            disabled={props.disabled}
            aria-describedby={props.ariaDescribedBy}
            aria-required={props.required}
            data-testid={props['data-testid']}
            ref={ref}
            style={props.style}
          />
        ) : (
          <InsetLabel>
            {props.children}
            <StyledInsetInput
              type={props.type}
              id={props.id}
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
              onBlur={props.onBlur}
              autoFocus={props.autoFocus}
              disabled={props.disabled}
              aria-describedby={props.ariaDescribedBy}
              aria-required={props.required}
              data-testid={props['data-testid']}
              ref={ref}
              style={props.style}
            />
          </InsetLabel>
        )}
      </>
    );
  },
);

export function InsetSelect(props: SelectProps) {
  return (
    <InsetLabel>
      {props.label}
      <StyledInsetSelect
        value={props.value}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        aria-describedby={props.ariaDescribedBy}
        aria-required={props.required}
        id={props.id}
        data-testid={props['data-testid']}
      >
        {props.children}
      </StyledInsetSelect>
    </InsetLabel>
  );
}

export function UnderlineInput(props: InputTypes) {
  return (
    <StyledLabel disabled={props.disabled} htmlFor={props.id}>
      {props.children}
      <StyledUnderlineInput
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        aria-describedby={props.ariaDescribedBy}
        aria-required={props.required}
        data-testid={props['data-testid']}
      />
    </StyledLabel>
  );
}

export const BorderedInput = React.forwardRef<HTMLInputElement, InputTypes>(
  (props, ref) => {
    return (
      <BorderedLabel htmlFor={props.id}>
        {props.children}
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          {props.withPrefix && <Prefix>{props.prefix}</Prefix>}
          <TransparentInput
            type={props.type}
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            autoFocus={props.autoFocus}
            disabled={props.disabled}
            onBlur={props.onBlur}
            ref={ref}
            aria-describedby={props.ariaDescribedBy}
            aria-required={props.required}
            data-testid={props['data-testid']}
          />
        </div>
      </BorderedLabel>
    );
  },
);

type SelectProps = {
  label: string;
  // children: React.DetailedHTMLProps<
  //   React.OptionHTMLAttributes<HTMLOptionElement>,
  //   HTMLOptionElement
  // >[];
  children: React.ReactNode;
  value: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
  ariaDescribedBy?: string;
  required?: boolean;
  id?: string;
  'data-testid'?: string;
};

export function BorderedSelect(props: SelectProps) {
  return (
    <BorderedLabel>
      {props.label}
      <TransparentSelect
        value={props.value}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        aria-describedby={props.ariaDescribedBy}
        aria-required={props.required}
        id={props.id}
        data-testid={props['data-testid']}
      >
        {props.children}
      </TransparentSelect>
    </BorderedLabel>
  );
}

type ErrorProps = {
  children: string | null;
  id?: string;
};

export function ErrorMessage({ children, id }: ErrorProps) {
  return (
    <StyledError role="alert" id={id}>
      {children}
    </StyledError>
  );
}

type DateProps = {
  selected: Date | null;
  label: string;
  onChange: (date: Date, event: React.SyntheticEvent<any, Event> | undefined) => void;
};
export const BorderedDatePicker = React.forwardRef<HTMLLabelElement, DateProps>(
  (props, ref) => {
    return (
      <BorderedLabel ref={ref}>
        {props.label}
        <DatePickerStyles>
          <DatePicker
            selected={props.selected}
            onChange={props.onChange}
            calendarClassName="fin"
            className="fin--input"
          />
        </DatePickerStyles>
      </BorderedLabel>
    );
  },
);

export const InsetDatePicker = React.forwardRef<HTMLLabelElement, DateProps>(
  (props, ref) => {
    return (
      <InsetLabel ref={ref}>
        {props.label}
        <DatePickerStyles inset>
          <DatePicker
            selected={props.selected}
            onChange={props.onChange}
            calendarClassName="fin"
            className="fin--input"
          />
        </DatePickerStyles>
      </InsetLabel>
    );
  },
);

export function SecondaryDatePicker(props: DateProps) {
  return (
    <DatePickerStyles secondary>
      <DatePicker
        selected={props.selected}
        onChange={props.onChange}
        calendarClassName="fin"
        className="fin--input"
        popperPlacement="bottom-end"
      />
    </DatePickerStyles>
  );
}
