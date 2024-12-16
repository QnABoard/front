import styled from 'styled-components';
import { useNavigate } from 'react-router';
import qublogo from '@/assets/qublogo.svg';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'; // Redux 추가
import { AppDispatch, RootState } from '@/store/store'; // Redux 타입 가져오기
import { loginThunk } from '@/store/slices/authSlice'; // Thunk 가져오기
import Input from '@/components/ui/atoms/Input';

export interface LoginProps {
  email: string;
  password: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    const result = await dispatch(loginThunk(data));

    if (loginThunk.fulfilled.match(result)) {
      alert('로그인에 성공했습니다!');
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    } else {
      alert(result.payload || '로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 로그인 상태 확인 후 리다이렉트 처리

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

          {error && <ErrorText>{error}</ErrorText>}

          <SubmitButton type='submit' disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </SubmitButton>
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

  &:disabled {
    background-color: #e5e7eb;
    cursor: not-allowed;
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
