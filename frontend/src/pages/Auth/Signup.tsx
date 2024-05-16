import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../services/redux/slice';

interface SignupProps {
  className?: string;
  goToSignInPage: (route: string) => void
}

const Signup = ({ className, goToSignInPage }: SignupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (email: string, password: string) => {
      try {
        const res = await dispatch(signup({ email, password }));

      if(res.meta.requestStatus === "fulfilled") {
        await dispatch(login({ email, password }));
        navigate('/game');
      }
      } catch (error) {
        console.log('ERROR', error)
      }
  }

  return (
    <SignupContainer className={className}>
      <Title>Bienvenue sur notre jeu concours</Title>
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SignupButton onClick={(e) => {
          e.preventDefault();
          handleSignup(email, password);
        }}>
          S'inscrire
      </SignupButton>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 100vw;
  background-color: #031638;
`;

const InputField = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  color: #fff;
  padding-top: 30px;
`;

const SignupButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ChangeToSignin = styled.h4`
  color: #fff;
`
const LinkButton = styled.button`
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`