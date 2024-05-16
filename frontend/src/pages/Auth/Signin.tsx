import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/redux/slice';


interface Props {
    goToSignUpPage: (route: string) => void
}

const Signin = ({ goToSignUpPage }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
       await dispatch(login({ email, password }));
       navigate('/game')
      
    } catch (error) {
      console.error('Error during signin:', error);
    }
  }

  return (
    <SignupContainer>
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
      <SignupButton onClick={() => handleLogin(email, password)}>Se connecter</SignupButton>
      <LinkButton onClick={() => goToSignUpPage('signup')}>
        <ChangeToSignup>Tu n'as pas de compte ? Viens t'en créer un ici 👈</ChangeToSignup>
      </LinkButton>
    </SignupContainer>
  );
};

export default Signin;

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

const ChangeToSignup = styled.h4`
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