import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import qublogo from '@/assets/qublogo.svg';
import Input from '@/components/atoms/Input';
import PasswordGuideLines from '@/components/atoms/PasswordGuideLines';
import { join } from '@/apis/auth.api';

export interface JoinProps {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

function JoinPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<JoinProps>();

  const password = watch('password'); // PasswordGuideLines에서 실시간 사용

  const onSubmit = async (data: JoinProps) => {
    setIsLoading(true);
    try {
      await join(data); // 회원가입 요청
      alert('회원가입이 완료되었습니다!');
      navigate('/login'); // 로그인 페이지로 이동
    } catch (error: any) {
      console.error('회원가입 중 에러 발생:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message); // 서버에서 반환된 에러 메시지 표시
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <InnerWrapper>
        <LogoWrapper onClick={() => navigate('/')}>
          <LogoImage src={qublogo} alt='qub logo' />
        </LogoWrapper>

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 */}
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

          {/* 닉네임 */}
          <InputWrapper>
            <StyledInput
              label='닉네임'
              inputType='text'
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

          {/* 비밀번호 */}
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

          {/* 비밀번호 확인 */}
          <InputWrapper>
            <StyledInput
              label='비밀번호 확인'
              inputType='password'
              {...register('confirmPassword', {
                required: '비밀번호를 다시 확인하세요.',
                validate: (value) =>
                  value === password || '비밀번호가 일치하지 않습니다.',
              })}
            />
          </InputWrapper>
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword.message}</ErrorText>
          )}

          {/* 비밀번호 가이드라인 */}
          <PasswordGuideLinesWrapper>
            <PasswordGuideLines password={password || ''} />
          </PasswordGuideLinesWrapper>

          {/* 제출 버튼 */}
          <SubmitButton type='submit' disabled={isLoading}>
            {isLoading ? '처리 중...' : '회원가입'}
          </SubmitButton>
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

  &:disabled {
    background-color: #e5e7eb;
    cursor: not-allowed;
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
