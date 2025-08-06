import React from 'react';
import LogoImage from '../../assets/wasion.svg'; // ajuste o caminho conforme necessário
import {
  LoaderContainer,
  Logo,
  Spinner
} from './Loading.styles';

export default function Loading() {
  return (
    <LoaderContainer>
      <Logo src={LogoImage} alt="Logo da empresa" />
      <Spinner />
    </LoaderContainer>
  );
}