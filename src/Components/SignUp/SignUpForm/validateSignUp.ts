import validateEmail from '@/Utils/validateEmail';
import { ValidateSignUpProps } from './type';

const validateSignUp = ({ fullName, email, password }: ValidateSignUpProps) => {
  const validationErrors: Partial<ValidateSignUpProps> = {};
  const validNameRegex = /^[가-힣a-zA-Z0-9]+$/;

  if (fullName && typeof fullName === 'string' && fullName.length > 16) {
    validationErrors.fullName = '유저명은 16자 이내로 작성해주세요.';
  }

  if (email && typeof email === 'string' && !validateEmail(email)) {
    validationErrors.email = '유효하지 않은 이메일입니다.';
  }

  if (password && typeof password === 'string' && password.length < 8) {
    validationErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
  }

  if (fullName && !validNameRegex.test(fullName)) {
    validationErrors.fullName = '자음과 모음을 합쳐주세요.';
  }

  return validationErrors;
};

export default validateSignUp;
