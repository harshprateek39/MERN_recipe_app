import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 97%;
  align-items: center;
  background-color: #9ba4b587;
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 10px 20px;
  
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavbarBrand = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

const NavbarMenu = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  

  @media (max-width: 768px) {
    flex-direction: column;
    align-items:center;
    margin-top: 10px;
    width: 100%;
    justify-content: space-around;
  }
`;

const NavbarMenuItem = styled.li`
  border-radius: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  height: 20px;
  border-style: none;
  
`;

const NavbarLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-family: Inter;
  transition: all 0.3s ease-in-out;
  text-shadow: 2px 2px 7px rgba(33, 0, 0, 0.44);


  &:hover {
    color: #777;
  }

  &.active {
    color: black;
  }
`;

const Button = styled.button`
  background-color: black;
  border: none;
  color: #fff;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Inter';
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['access']);
  const logout = () => {
    setCookies('access', '');
    window.localStorage.removeItem('userID');
    navigate('/auth');
  };

  return (
    <NavbarContainer>
      <NavbarBrand>Recipees!</NavbarBrand>
      <NavbarMenu>
        <NavbarMenuItem>
          <NavbarLink exact to="/" activeClassName="active">
            Home
          </NavbarLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarLink to="/createRecipe" activeClassName="active">
            Add
          </NavbarLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarLink to="/savedRecipe" activeClassName="active">
            Saved
          </NavbarLink> 
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavbarLink to="/contact" activeClassName="active">
            Contact Us
          </NavbarLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          {!cookies.access ? (
            <NavbarLink style={{ color: 'white' }} to="/auth" activeClassName="active">
              <Button style={{ alignSelf: 'center', height: '40px' }}>Sign In</Button>
            </NavbarLink>
          ) : (
            <Button onClick={logout}>Logout</Button>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </NavbarContainer>
  );
};

export default Navbar;
