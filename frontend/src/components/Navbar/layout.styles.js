import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
`;

export const Navbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Logo = styled.img`
  height: 45px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
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
    gap: 0.5rem;
  }
`;

export const NavItem = styled.span`
  cursor: pointer;
  font-weight: 500;
  color: #555;
  padding: 0.7rem 1.2rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  position: relative;

  &:hover {
    color: #667eea;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  }

  &.active {
    color: #667eea;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
    font-weight: 600;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after,
  &.active::after {
    width: 80%;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    width: 100%;
    text-align: left;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    align-self: flex-end;
    flex-direction: row;
  }
`;

export const AdminButton = styled.button`
  background: linear-gradient(45deg, #3c56e7, #5a67d8);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(60, 86, 231, 0.3);
  font-size: 0.9rem;

  &:hover {
    background: linear-gradient(45deg, #5a67d8, #667eea);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(60, 86, 231, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;

export const LogoutButton = styled.button`
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;