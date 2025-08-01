import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
`;


export const Navbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 2px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Logo = styled.img`
  height: 40px;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  flex: 1;
  text-align: center;
  margin: 0;
`;

export const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #c0392b;
  }
`;
export const Content = styled.main`
  margin: 2rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;


export const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 3px 6px rgb(0 0 0 / 0.1);
`;

export const CardTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

export const CardText = styled.p`
  color: #555;
  line-height: 1.4;
`;
export const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: 2rem;
`;

export const NavItem = styled.span`
  cursor: pointer;
  font-weight: 500;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
    text-decoration: underline;
  }
`;
