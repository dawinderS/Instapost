import React from "react";
import styled, { keyframes } from "styled-components";
import { Logo } from "./Icons";

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:0.5
    }
    100%{
        opacity:0;
    }
`;

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  padding-top: 100px;
  width: 100%;
  text-align: center;
  span {
    cursor: pointer;
    font-size: 15px;
    width: 100%;
    color: #385185;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
  }
`;

export default () => (
  <Loader>
    <span>
      Loading... Please wait
    </span>
  </Loader>
);