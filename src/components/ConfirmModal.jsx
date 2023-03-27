import React from "react";
import styled from "styled-components";
import StyledButton from "../ui/StyledButton";
import StyledModal from "../ui/StyledModal";

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => (
  <StyledModal appElement={document.getElementById("root")} isOpen={isOpen}>
    <h3>Confirm Delete</h3>
    <p>Are you sure you want to delete this piece?</p>
    <ButtonsWrapper>
      <StyledButton primary onClick={onConfirm}>
        Delete
      </StyledButton>
      <StyledButton danger onClick={onCancel}>
        Cancel
      </StyledButton>
    </ButtonsWrapper>
  </StyledModal>
);

export default ConfirmModal;
