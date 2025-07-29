import styled from 'styled-components';
import Background from '../../assets/background.jpg';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #a3c1f7 0%, #fbe7a1 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

export const Logo = styled.img`
  width: 250px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  background-color: #f1f1f1;
  border-radius: 25px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
  color: #004899;
  font-size: 24px;
`;

export const Input = styled.input`
  height: 40px;
  padding: 0 20px;
  border-radius: 30px;
  border: 1px solid #ccc;
  font-size: 14px;
`;

export const Button = styled.button`
  height: 40px;
  border-radius: 30px;
  border: none;
  background-color: #004899;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #F5A623;
  }
`;

export const Link = styled.a`
  text-align: center;
  font-size: 14px;
  color: #004899;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #F5A623;
  }
`;
export const SecondaryButton = styled(Button)`
  background-color: #fff;
  color: #004899;
  border: 2px solid #004899;

  &:hover {
    background-color: #e6f0fc;
    color: #004899;
  }
`;

