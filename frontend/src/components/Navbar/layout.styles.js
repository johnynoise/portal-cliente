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
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Logo = styled.img`
  height: 40px;
`;

export const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0;
    width: 100%;
  }
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

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

export const AdminButton = styled.button`
  background-color: #3c56e7ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c03a2b91;
  }

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;