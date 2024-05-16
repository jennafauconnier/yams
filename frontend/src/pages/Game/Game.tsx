import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/redux/slice';
import ConfettiExplosion from 'react-confetti-explosion';
import api from '../../services/api/api';


const Game = () => {
  const dispatch = useDispatch();
  const [isExploding, setIsExploding] = useState(false)
  const [dices, setDices] = useState([0, 0, 0, 0, 0]);
  const [wonPastryMessage, setWonPastryMessage] = useState(null);
  const token = useSelector(state => state.auth.token);
  const [alreadyWon, setAlreadyWon] = useState<Boolean>(false)
  const [playThreeParties, setPlayThreeParties] = useState<Boolean>(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signup')
  };


  const launch = async () => {
    try {
      const response = await api.post('/gametest', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { dices, user, quantityWon, pastryWon } = response.data;
      setDices(dices);

      if (user.won) {
        console.log('res', response.data)
        setWonPastryMessage(`Félicitations, tu as fait un : ${pastryWon}, tu gagnes ${quantityWon} pâtisserie(s) 🎉`);

        setIsExploding(true)
      } else {
        setWonPastryMessage(null); 
      }
      animateDice()

      if (!!response.data.user.won) {
        setAlreadyWon(true)
        toast('Tu as gagner 🏆, tu ne peux plus jouer !', {
          type: 'warning',
        })
      }
    } catch (error) {
      console.error('Error while playing the game:', error);
      
      if (error.response.status === 401) {
        setPlayThreeParties(true)
        toast('Tu as déjà jouer 3 fois ⏳', {
            type: 'error',
          })
      } else if  (error.response.status === 403) {
        toast('Tu dois te reconnecter ⛔️', {
            type: 'error',
          })
      }
    }
  };

  const animateDice = () => {
    gsap.fromTo(
      '.dice',
      { rotationX: 'random(720, 1080)', rotationY: 'random(720, 1080)', rotationZ: 0 },
      { duration: 'random(2, 3)', rotationX: 0, rotationY: 0, ease: 'power3.out', stagger: 0.1 }
    );
  };

  const Dice = ({ value }) => {

    const diceRef = useRef();
    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.from(diceRef.current, {
          rotationX: 'random(720, 1080)',
          rotationY: 'random(720, 1080)',
          rotationZ: 0,
          duration: 'random(2, 3)',
        });
      }, diceRef);
      return () => ctx.revert();
    }, [value]);

    return (
      <DiceWrapper>
        <DiceFace ref={diceRef} className="dice">
          {dices.map((dice, index) => (
            <Face key={index} value={dice}>
              {value}
            </Face>
          ))}
        </DiceFace>
      </DiceWrapper>
    );
  };

  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <Title>Yam's</Title>
      {isExploding && <ConfettiExplosion />}
      <DiceContainer>
        {dices.map((dice, index) => (
          <Dice key={index} value={dice} />
        ))}
      </DiceContainer>
      {wonPastryMessage && <p>{wonPastryMessage}</p>}
      <Actions>
        <Button onClick={launch} disabled={alreadyWon || playThreeParties}>Jouer</Button>
        {alreadyWon && (
          <Link to="/winners">
            <WinnerButton>Voir les gagnants</WinnerButton>
          </Link>
        )}
      </Actions>
    </Container>
  );
};

export default Game;

const Container = styled.div`
  margin: 0;
  text-align: center;
  background-color: #031638;
  height: 100vh;
  width: 100vw;
`;

const Title = styled.h1`
  padding-top: 90px;
  margin: 0;
  font-family: 'Englebert', serif;
  font-size: 6rem;
  color: rgb(0, 180, 180);
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  border: none;
  background-color: ${props => props.disabled ? 'gray' : 'yellow'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-weight: bold;
  font-size: 1.5rem;
  color: ${props => props.disabled ? 'darkgray' : 'black'};
  transition: all 300ms;
  &:hover {
    color: ${props => props.disabled ? 'darkgray' : 'rgb(0, 180, 180)'};
    box-shadow: ${props => props.disabled ? 'none' : '0 0 0.5rem rgb(0, 180, 180)'};
  }
`;

const Actions = styled.div`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DiceContainer = styled.div`
  perspective: 500px;
  display: inline-block;
`;

const DiceWrapper = styled.div`
  display: inline-block;
`;

const DiceFace = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 0.75rem;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: 50%;
`;

const Face = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  color: black;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  outline: thin solid #c0c0c0;
  border-radius: 0.25rem;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
  transform: ${({ value }) => {
    switch (value) {
      case 1:
        return 'translateZ(1.5rem)';
      case 2:
        return 'rotateY(90deg) translateZ(1.5rem)';
      case 3:
        return 'rotateY(180deg) translateZ(1.5rem)';
      case 4:
        return 'rotateY(-90deg) translateZ(1.5rem)';
      case 5:
        return 'rotateX(-90deg) translateZ(1.5rem)';
      case 6:
        return 'rotateX(90deg) translateZ(1.5rem)';
      default:
        return 'none';
    }
  }};
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.5rem 1rem;
  border: none;
  background-color: yellow;
  color: black;
  cursor: pointer;
`;

const WinnerButton = styled.button`
  margin-top: 20px;
  padding: 0.5rem 1rem;
  border: none;
  background-color: yellow;
  color: black;
  cursor: pointer;
`;

