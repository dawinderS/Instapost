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
`;

export default () => (
  <Loader>
    <Logo size={50} />
  </Loader>
);
