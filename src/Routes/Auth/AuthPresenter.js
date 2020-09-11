import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { DemoUser } from "../../Components/Icons";

const Wrapper = styled.div`
  min-height: 76vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
  border: 1px solid #dbdbdb;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 23px 0px;
  height: 63px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
  font-weight: 500;
`;

const Form = styled(Box)`
  padding: 30px 40px;
  padding-bottom: 30px;
  margin-bottom: 10px;
  form {
    width: 100%;
    max-height: 455px;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
      @media screen and (max-width: 770px) {
        border: 1px solid #dbdbdb;
      }
    }
    button {
      margin-top: 8px;
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
      padding: 0px;
      height: 30px;
    }
    img {
      margin: 0px 0px 12px 43px;
    }
    p {
      color: #8e8e8e;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      margin: 10px 0px;
      span {
        font-weight: 600;
      }
    }
  }
`;

const Text = styled.div`
  color: #8e8e8e;
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  margin-bottom: 15px;
`;

const Or = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  div {
    color: #8e8e8e;
    font-size: 13px;
    font-weight: 600;
    line-height: 15px;
  }
  margin-top: 10px;
  margin-bottom: 26px;
`;

const OrLine = styled.div`
  height: 1px;
  background-color: #dbdbdb;
  width: 40%;
`;

const DemoLog = styled.div`
  cursor: pointer;
  font-size: 15px;
  width: 100%;
  color: #385185;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    height: 20px;
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
`;

export default ({
  action,
  username,
  name,
  email,
  setAction,
  secret,
  onSubmit,
  onDemo
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <>
          <Helmet>
              <title>Login • Instapost</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <img src="instalogo.png" width="180" alt="instalogo" />
            <Text>Enter your username or email to receive your passcode.</Text>
            <Input placeholder={"Username or email"} {...email} />
            <Button text={"Log In"} />
          </form>
          <Or>
            <OrLine></OrLine>
            <div>OR</div>
            <OrLine></OrLine>
          </Or>
          <DemoLog onClick={onDemo}>
            <DemoUser />
            <div>Log in as Demo User</div>
          </DemoLog>
        </>
      )}
      {action === "signUp" && (
        <>
          <Helmet>
              <title>Sign up • Instapost</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <img src="instalogo.png" width="180" alt="instalogo" />
            <Text>Sign up to see photos and videos from your friends.</Text>
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Full Name"} {...name} />
            <Input placeholder={"Username"} {...username} />
            <Button text={"Sign up"} />
              <p>By signing up, you agree to contact me for <span>future job opportunities</span> :)</p>
          </form>
        </>
      )}
      {action === "confirm" && (
        <>
          <Helmet>
            <title>Confirm login • Instapost</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <img src="instalogo.png" width="180" alt="instalogo"/>
            <Text>Please enter the passcode we have emailed you.</Text>
            <Input placeholder="Paste your passcode" required {...secret} />
            <Button text={"Confirm to log in"} />
          </form>
        </>
      )}
    </Form>
      <StateChanger>
        {action === "logIn" && (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
          </>
        )} 
        {action === "signUp" && (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}
        {action === "confirm" && (
          <>
            Return back to log in?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}

      </StateChanger>
  </Wrapper>
);