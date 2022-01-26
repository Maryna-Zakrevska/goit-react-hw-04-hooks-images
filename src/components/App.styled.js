import styled from "styled-components";

const ModalImgStyled = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  border-color: rgba(255, 255, 255, 0.8);
`;

const AppDivStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

const NoResultsMessageStyled = styled.p`
  display: block;
  margin: 0 auto;
  color: darkblue;
  font-size: 20px;
`;

const CloseButtonStyled = styled.button`
  position: absolute;
  top: 24px;
  right: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 2px;
  margin-left: auto;
  color: #fff;
  background: gray;
  border-radius: 5px;
  transition: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, border-color;

  :hover,
  :focus {
    border-color: rgba(255, 255, 255, 0.8);
    opacity: 1;
  }
`;

export { ModalImgStyled, CloseButtonStyled, AppDivStyled, NoResultsMessageStyled };
