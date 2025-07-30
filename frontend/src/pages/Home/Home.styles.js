import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #004899 0%, #c3d4f7 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;

export const Header = styled.header`
  width: 100%;
  max-width: 1200px;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

export const LogoutButton = styled.button`
  background-color: #F5A623;
  border: none;
  padding: 10px 18px;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e5941a;
  }
`;

export const Content = styled.main`
  width: 100%;
  max-width: 1200px;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  width: 280px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  color: #004899;
`;

export const CardText = styled.p`
  font-size: 14px;
  color: #333;
`;
