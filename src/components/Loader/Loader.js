import React from "react";
import { Puff } from 'react-loading-icons'
import {LoaderDivStyled} from "./Loader.styled"

export const Loader = () => {
  return (
    <LoaderDivStyled>
      <Puff stroke="#3f51b5" strokeOpacity={.125} speed={.75} />
    </LoaderDivStyled>
  );
};
