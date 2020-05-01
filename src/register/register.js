import React, { useState } from 'react';
import { LoginPageStyle, InputField, SubmitButton } from '../login/login';
import styled from 'styled-components';

const ImageUploaderStyle = styled.div`
  margin-top: 15px;
  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-image: url('camera-icon.svg');
    z-index: 1;
    margin-left: -50px;
    /* margin-top:-50px; */
  }
  #output_image {
    width: 126px;
    height: 126px;
    border-radius: 50%;
    border: none;
  }
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
`;

const ImageUploader = ({ callback }) => {
  const [image, setImage] = useState();
  const handleChange = (event) => {
    var reader = new FileReader();
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    callback(event.target.value);
  };

  return (
    <div className='d-flex justify-content-center'>
      <ImageUploaderStyle
        className='d-flex justify-content-end align-items-end'
        image={image}>
        <img className='profile-image' src={image || 'user-icon.svg'} />
        <label for='imageUpload'>
          <button></button>
        </label>
      </ImageUploaderStyle>
      <input
        id='imageUpload'
        type='file'
        accept='image/*'
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      {/** <input type='file' accept='image/*' onChange={handleChange} />*/}
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
    setImage(value);
    console.log(value);
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
        {/**  <ImageUploader callback={updateImage} />*/}

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
