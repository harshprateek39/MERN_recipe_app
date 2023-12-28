import React, { useState } from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';



const FormContainer = styled.div`
  display: flex;
  backgroud-color:"red";
  width:100%;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  

  &:focus {
    outline: none;
  }
`;

const FormButton = styled.button`
  background-color: #007bff;
  border: none;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;



const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit=async (event)=>{
          event.preventDefault();
      try {
         const apple= await axios.post("https://mern-recipe-backend-fz6l.vercel.app/contact", {
             name,email,message
          });
          console.log(apple.data.message);
          setName("");
          setEmail("");
          setMessage("");
          alert(apple.data.message);
          
      } catch (error) {
         console.log(error);
      }
         };

  return (
    <div className='auth'>
    <form  onSubmit={handleSubmit} >
      <FormTitle>Feel Free to contact</FormTitle>
      <FormInput
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <FormInput
        type="text"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <FormInput
        type="textarea"
        placeholder="Message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />
      <FormButton type="submit">Submit</FormButton>
      
    </form></div>
  );
};

const RegisterFormContainer = styled(FormContainer)``
export default RegisterForm;