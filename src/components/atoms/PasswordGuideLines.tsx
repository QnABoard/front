import { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import styled from 'styled-components';

interface Guideline {
  label: string;
  isValid: boolean;
  check: (password: string) => boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  > * + * {
    margin-top: 0.5rem;
  }
`;

const GuidelineItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  width: 1.25rem;
  height: 1.25rem;
  color: #32c040;
`;

const EmptyCircle = styled.span`
  margin-left: 0.15rem;
  width: 0.85rem;
  height: 0.85rem;
  border: 1px solid #374151;
  border-radius: 9999px;
  display: inline-block;
`;

const GuidelineLabel = styled.span<{ isValid: boolean }>`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: ${(props) => (props.isValid ? '#32C040' : '#6b7280')};
`;

const PasswordGuideLines = ({ password }: { password: string }) => {
  const [guidelines, setGuidelines] = useState<Guideline[]>([
    {
      label: '8자 이상, 15자 이하로 설정해 주세요',
      isValid: false,
      check: (password: string) =>
        password.length >= 8 && password.length <= 15,
    },
    {
      label: '특수 문자를 사용해 주세요',
      isValid: false,
      check: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      label: '동일한 문자가 4번 반복되면 안돼요',
      isValid: false,
      check: (password: string) =>
        !/(.)\1{3}/.test(password.replace(/\s/g, '')),
    },
  ]);

  useEffect(() => {
    setGuidelines((prevGuidelines) =>
      prevGuidelines.map((guideline) => ({
        ...guideline,
        isValid: guideline.check(password),
      }))
    );
  }, [password]);

  return (
    <Container>
      {guidelines.map(({ label, isValid }, index) => (
        <GuidelineItem key={index}>
          {isValid ? <StyledCheckCircleIcon /> : <EmptyCircle />}
          <GuidelineLabel isValid={isValid}>{label}</GuidelineLabel>
        </GuidelineItem>
      ))}
    </Container>
  );
};

export default PasswordGuideLines;
