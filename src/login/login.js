import React, { useState } from 'react';
import styled from 'styled-components';
// import config from '../config';

const LoginPageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85%;
  .loginBox {
    background-color: #ffffff;
    color: black;
    justify-content: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 23px;
    width: 50%;
    height: auto;
    padding: 50px;
  }
  p {
    padding-top: 30px;
    color: #667071;
  }
  a {
    color: #415051;
  }
`;

const ButtonStyle = styled.button`
  width: 456px;
  height: 50px;
  border: 1px solid #323232;
  border-radius: 50px;
  margin-top: 30px;
  background-color: #323232;
  /* cursor: pointer; */

  .text {
    margin-top: -5px;
    font-size: 28px;
    color: #9d9d9d;
  }
`;

const InputStyle = styled.input`
  background-image: ${({ icon }) => 'url(' + icon + '-icon.svg)'};
  background-repeat: no-repeat;
  background-position: 10px;
  background-size: 30px 30px;
  width: 456px;
  height: 50px;
  border: 1px solid #9d9d9d;
  border-radius: 50px;
  margin-top: 30px;
  padding-left: 50px;
`;

export const InputField = React.forwardRef(
  ({ icon, name, type, place, callback, err }, ref) => {
    const [value, setValue] = useState();
    const handleChange = (event) => {
      setValue(event.target.value);
      callback(event.target.value);
    };

    if (ref) {
      ref.current = value;
    }

    return (
      <div className='d-flex justify-content-center'>
        <InputStyle
          icon={icon}
          type={type}
          value={value}
          onChange={handleChange}
          className={'form-control '}
          id={name}
          placeholder={place}
        />
        {!(err == '' || err == undefined) && (
          <div className='text-danger'>*{err}</div>
        )}
      </div>
    );
  }
);

export const SubmitButton = ({ action, text }) => {
  return (
    <div className='d-flex justify-content-center' onClick={action}>
      <ButtonStyle className='d-flex align-self-center justify-content-center border text-light'>
        <div className='align-self-center'>
          <div>{text}</div>
        </div>
      </ButtonStyle>
    </div>
  );
};
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const updateUserName = (value) => {
    setUsername(value);
    console.log(`username:${value}`);
  };
  const updatePassword = (value) => {
    setPassword(value);
    console.log(`password:${value}`);
  };
  const submit = () => {
    alert(`submit\n username:${username}\n password:${password}`);
  };
  return (
    <LoginPageStyle>
      <div className='loginBox'>
        <div className='d-flex justify-content-center'>
          <h1>MEMBER LOGIN</h1>
        </div>
        <InputField
          icon={'user'}
          name='username'
          type='text'
          place='username'
          callback={updateUserName}
        />
        <InputField
          icon={'password'}
          name='password'
          type='password'
          place='password'
          callback={updatePassword}
        />

        <SubmitButton text='LOGIN' action={submit}></SubmitButton>
        <div className='d-flex justify-content-center'>
          <p>
            don’t have any account ?
            <a href={`/register`}>
              {'  '}
              <u>register now</u>
            </a>
          </p>
        </div>
      </div>
    </LoginPageStyle>
  );
};

export default LoginPage;
// <span class='iconify' data-icon='fa:home'></span>;
