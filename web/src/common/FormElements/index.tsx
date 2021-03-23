/* eslint-disable react/display-name */
import * as React from 'react';
import {
  StyledUnderlineInput,
  StyledLabel,
  BorderedLabel,
  TransparentInput,
  TransparentSelect,
  Prefix,
  StyledError,
} from './style';

type InputTypes = {
  disabled?: boolean;
  id?: string;
  children: React.ReactNode;
  htmlFor?: string;
  type: 'text' | 'password' | 'date';
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>,
  ) => void;
  value: string;
  autoFocus?: boolean;
  withPrefix?: boolean;
  prefix?: string;
};

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
            ref={ref}
          />
        </div>
      </BorderedLabel>
    );
  },
);

type SelectProps = {
  label: string;
  children: React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >[];
  value: string;
  defaultValue?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>,
  ) => void;
};
export function BorderedSelect(props: SelectProps) {
  return (
    <BorderedLabel>
      {props.label}
      <TransparentSelect
        value={props.value}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      >
        {props.children}
      </TransparentSelect>
    </BorderedLabel>
  );
}

type ErrorProps = {
  children: string | null;
};

export function ErrorMessage({ children }: ErrorProps) {
  return <StyledError>{children}</StyledError>;
}
