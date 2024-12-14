import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import qublogo from '@/assets/qublogo.svg';
import Input from '@/components/atoms/Input';
import PasswordGuideLines from '@/components/atoms/PasswordGuideLines';

export interface JoinProps {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

function JoinPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<JoinProps>();

  const password = watch('password');

  const onSubmit = (data: JoinProps) => {
    console.log('가입 정보:', data);
    navigate('/login');
  };

  return (
    <Container>
      <InnerWrapper>
        <LogoWrapper onClick={() => navigate('/')}>
          <LogoImage src={qublogo} alt='qub logo' />
        </LogoWrapper>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <StyledInput
              label='이메일'
              inputType='email'
              {...register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '유효한 이메일 형식이 아닙니다.',
                },
              })}
            />
          </InputWrapper>
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <InputWrapper>
            <StyledInput
              label='닉네임'
              inputType='nickname'
              {...register('nickname', {
                required: '닉네임을 입력하세요.',
                minLength: {
                  value: 3,
                  message: '닉네임은 최소 3자 이상이어야 합니다.',
                },
              })}
            />
          </InputWrapper>
          {errors.nickname && <ErrorText>{errors.nickname.message}</ErrorText>}

          <InputWrapper>
            <StyledInput
              label='비밀번호'
              inputType='password'
              {...register('password', {
                required: '비밀번호를 입력하세요.',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다.',
                },
              })}
            />
          </InputWrapper>
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          <InputWrapper>
            <StyledInput
              label='비밀번호 확인'
              inputType='password'
              {...register('confirmPassword', {
                required: '비밀번호를 다시 확인하세요.',
                validate: (value) =>
                  value === watch('password') ||
                  '비밀번호가 일치하지 않습니다.',
              })}
            />
          </InputWrapper>
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword.message}</ErrorText>
          )}

          <PasswordGuideLinesWrapper>
            <PasswordGuideLines password={password || ''} />
          </PasswordGuideLinesWrapper>

          <SubmitButton type='submit'>회원가입</SubmitButton>
        </Form>
      </InnerWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 24rem;
`;

const LogoWrapper = styled.div`
  margin-bottom: 2.5rem;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 150px;
  height: 80px;
  object-fit: contain;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StyledInput = styled(Input)`
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
  display: block;
`;

const PasswordGuideLinesWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  width: 300px;
  height: 70px;
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000000;
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 2rem;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;
  max-width: 350px;
`;

export default JoinPage;
