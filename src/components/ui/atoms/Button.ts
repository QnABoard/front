import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'outline';
  disabled?: boolean;
}

const cx = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const styles = {
  base: `
    font-size: 1em;
    padding: 0.5em 1em;
    border-radius: 5px;
    cursor: pointer;
  `,
  primary: `
    background-color: mediumseagreen;
    color: white;
    border: none;

    &:hover {
      background-color: seagreen;
    }
  `,
  outline: `
    background-color: white;
    color: mediumseagreen;
    border: 2px solid mediumseagreen;

    &:hover {
      background-color: mediumseagreen;
      color: white;
    }
  `,
  disabled: `
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  `,
};

const Button = styled.button<ButtonProps>`
  ${({ variant, disabled }) =>
    cx(
      styles.base,
      variant === 'primary' && styles.primary,
      variant === 'outline' && styles.outline,
      disabled && styles.disabled
    )}
`;

export default Button;
