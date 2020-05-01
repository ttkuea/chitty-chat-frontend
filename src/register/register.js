import React, { useState, useRef } from 'react';
import { LoginPageStyle, InputField, SubmitButton } from '../login/login';
import styled from 'styled-components';

const ImageUploaderStyle = styled.div`
  margin-top: 15px;
  width: 126px;
  height: 126px;
  background-image: url('user-icon.svg');
  button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background-image: url('camera-icon.svg');
  }
`;

const ImageUploader = ({ action }) => {
  return (
    <div className='d-flex justify-content-center'>
      <input
        type='file'
        id='img'
        name='img'
        accept='image/*'
        style={{ display: 'none' }}></input>
      <ImageUploaderStyle className='d-flex justify-content-end align-items-end'>
        <button onClick={action}></button>
      </ImageUploaderStyle>
    </div>
  );
};

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState();
  const updateUserName = (value) => {
    setUsername(value);
    console.log(`username:${value}`);
  };
  const updatePassword = (value) => {
    setPassword(value);
    console.log(`password:${value}`);
  };
  const updateImage = (value) => {
    console.log(value);
    setImage(value);
  };

  const uploadImage = () => {
    alert('uploadImage');
  };
  const submit = () => {
    alert(`submit\n username:${username}\n password:${password}`);
  };

  return (
    <LoginPageStyle>
      <div className='loginBox'>
        <div className='d-flex justify-content-center'>
          <h1>REGISTRATION</h1>
        </div>

        <ImageUploader action={uploadImage} />

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

        <SubmitButton text='REGISTER' action={submit}></SubmitButton>
        <div className='d-flex justify-content-center'>
          <p>
            already have an account ?
            <a href={`/login`}>
              {'  '}
              <u>login</u>
            </a>
          </p>
        </div>
      </div>
    </LoginPageStyle>
  );
};

export default RegisterPage;
