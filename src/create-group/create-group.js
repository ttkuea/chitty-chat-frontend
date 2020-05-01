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
    </div>
  );
};

const RegisterPage = () => {
  const [groupname, setGroupname] = useState('');
  const [image, setImage] = useState();
  const updateGroupname = (value) => {
    setGroupname(value);
    console.log(`groupname:${value}`);
  };
  const updateImage = (value) => {
    setImage(value);
    console.log(value);
  };

  const submit = () => {
    alert(`submit\n  groupname:${groupname}`);
  };

  return (
    <LoginPageStyle>
      <div className='loginBox'>
        <div className='d-flex justify-content-center'>
          <h1>CREATE A NEW GROUP</h1>
        </div>
        {/**  <ImageUploader callback={updateImage} />*/}

        <InputField
          icon={'user'}
          name='groupname'
          type='text'
          place='group name'
          callback={updateGroupname}
        />

        <SubmitButton text='CREATE' action={submit}></SubmitButton>
      </div>
    </LoginPageStyle>
  );
};

export default RegisterPage;
