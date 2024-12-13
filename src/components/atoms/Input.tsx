import React, { ForwardedRef, useState } from 'react';
import styled from 'styled-components';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputType?: 'text' | 'email' | 'password' | 'number' | 'nickname';
}

const Container = styled.div`
  position: relative;
  width: 100%;
  align-items: center;
  margin-top: 1.5rem;
  justify-content: center;
`;

interface LabelProps {
  isActive: boolean;
}

const StyledLabel = styled.label<LabelProps>`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #727272;
  font-family: sans-serif;
  transition: all 0.2s ease-in-out;

  ${({ isActive }) =>
    isActive &&
    `
      top: 25%;
      font-size: 0.75rem; /* text-xs */
      color: #6b7280; /* text-gray-500 */
    `}
`;

const StyledInput = styled.input`
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0.1rem 1rem;
  background-color: #ffffff;
  border-radius: 0.375rem;
  border: 0.5px solid #000000;
  color: #727272;
  font-size: 1.25rem;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: transparent; /* placeholder-transparent */
  }
`;

const Input = React.forwardRef(
  (
    { label, inputType = 'text', onChange, ...props }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleInputFocus = () => setIsFocused(true);
    const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value !== '');
    };

    return (
      <Container>
        <StyledLabel isActive={isFocused || hasValue}>{label}</StyledLabel>
        <StyledInput
          ref={ref}
          type={inputType}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={onChange}
          {...props}
        />
      </Container>
    );
  }
);

export default Input;
