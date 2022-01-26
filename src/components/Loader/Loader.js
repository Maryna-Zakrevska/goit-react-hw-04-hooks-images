import React from "react";
import { Triangle } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {LoaderDivStyled} from "./Loader.styled"

export const Loader = () => {
  return (
    <LoaderDivStyled>
      <Triangle color="#3f51b5" height={200} width={200} />
    </LoaderDivStyled>
  );
};
