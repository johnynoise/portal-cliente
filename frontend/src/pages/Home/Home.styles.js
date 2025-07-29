import styled from 'styled-components';
import Background from '../../assets/background.jpg';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #a3c1f7 0%, #fbe7a1 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
`;



export const Logo = styled.img`
  width: 300px;
  margin-bottom: 30px;
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
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #004899;
  margin-bottom: 10px;
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

export const Card = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const CardInfo = styled.div`
  margin-bottom: 10px;

  p {
    margin: 4px 0;
    color: #333;
    font-size: 14px;
  }
`;

export const CardButton = styled(Button)`
  width: 100%;
  background-color: #004899;

  &:hover {
    background-color: #F5A623;
  }
`;

export const PasswordRules = styled.div`
  font-size: 13px;
  color: #333;
  background-color: #f0f0f0;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  line-height: 1.5;
  margin-top: -10px;
  margin-bottom: -10px;
`;

