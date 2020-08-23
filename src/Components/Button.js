import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.button`
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.blueColor};
  color: white;
  font-weight: 600;
  outline: none;
  font-size: 14px;
  line-height: 26px;
  text-overflow: ellipsis;
  cursor: pointer;
  height: 28px;
  width: 92px;
  padding: 1px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = ({ text, onClick }) => (
  <Container onClick={onClick}>{text}</Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;