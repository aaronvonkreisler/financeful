import * as React from 'react';
import { StyledButton } from './style';
import VisuallyHidden from '@reach/visually-hidden';
type Props = {
  small?: boolean;
  active?: boolean;
  grey?: boolean;
  blue?: boolean;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaText: string;
};

function IconButton({ small, active, grey, blue, ariaText, ...props }: Props) {
  return (
    <>
      <StyledButton
        $small={small}
        $grey={grey}
        $active={active}
        $blue={blue}
        {...props}
      >
        <VisuallyHidden>{ariaText}</VisuallyHidden>
        {props.children}
      </StyledButton>
    </>
  );
}

export default IconButton;
