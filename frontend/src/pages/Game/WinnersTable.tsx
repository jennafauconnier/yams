import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../services/api/api';


const WinnersTable = () => {
    const [groupedWinners, setGroupedWinners] = useState([]);
  
    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const response = await api.get('/gametest/winners');
                setGroupedWinners(response.data);
            } catch (error) {
                console.error('Error fetching winners:', error);
            }
        };
  
        fetchWinners();
    }, []);
    
    const groupedWinnersArray = Object.values(groupedWinners);

    return (
      <Container>
          <TableContainer>
              <Table>
                  <thead>
                      <Tr>
                          <Th>Email</Th>
                          <Th>Date</Th>
                          <Th>Patisserie gagnées</Th>
                      </Tr>
                  </thead>
                  <tbody>
                      {groupedWinnersArray.map((winner, index) => (
                          <Tr key={index}>
                              <Td>{winner?.email}</Td>
                              <Td>{new Date(winner?.date).toLocaleDateString()} {new Date(winner.date).toLocaleTimeString()}</Td>
                              <Td>{winner?.pastriesWon ? winner?.pastriesWon.join(', ') : ''}</Td>
                          </Tr>
                      ))}
                  </tbody>
              </Table>
          </TableContainer>
          <Link to="/signup">
            <GoBackButton>Retour a l'inscription</GoBackButton>
          </Link>
      </Container>
  );
};

export default WinnersTable;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100vw; */
  width: 100vw;
  background-color: #031638;
`;

const TableContainer = styled.div`
  margin-top: 130px;
  width: 80%;
  border: 2px solid #000000;
  padding: 20px;
  background-color: #ffffff;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  color: #000000;

`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: #000000;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const GoBackButton = styled.button`
  margin-top: 20px;
  margin-bottom: 130px;
  padding: 0.5rem 1rem;
  border: none;
  background-color: yellow;
  color: black;
  cursor: pointer;
`;