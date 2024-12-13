import styled from 'styled-components';
import { useNavigate } from 'react-router';
import qublogo from '@/assets/qublogo.svg';
import Input from '@/components/atoms/Input';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log('로그인 정보:', data);
    navigate('/');
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
              {...register('email', { required: '이메일을 입력하세요.' })}
            />
          </InputWrapper>
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <InputWrapper>
            <StyledInput
              label='비밀번호'
              inputType='password'
              {...register('password', { required: '비밀번호를 입력하세요.' })}
            />
          </InputWrapper>
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          <SubmitButton type='submit'>로그인</SubmitButton>
        </Form>

        <BottomSection>
          <InfoText>아직 회원이 아니신가요?</InfoText>
          <LinkText onClick={() => navigate('/join')}>이메일 회원가입</LinkText>
        </BottomSection>
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
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 2rem;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const BottomSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5rem;
  gap: 1rem;
`;

const InfoText = styled.span`
  color: #a7a7a7;
  font-size: 12px;
`;

const LinkText = styled.span`
  color: #000000;
  font-size: 12px;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;
  max-width: 350px;
`;

export default LoginPage;
