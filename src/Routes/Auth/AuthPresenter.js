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
  @media screen and (max-width: 770px) {
    min-height: 65vh;
  }
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
    #temppassword {
      color: #385185;
      margin: 15px 0px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
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
  span {
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
  onDemo,
  demoLog,
  setLogin,
  setSignup,
  setGetEmail,
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
            <Text>Enter your credentials to login.</Text>
            <Input placeholder={"Username or email"} {...email} />
            <Input type="password" placeholder={"Password"} {...secret} />
            <Button text={"Log In"} />
            <p id="temppassword" onClick={setGetEmail}>
              Forgot password?
            </p>
          </form>
          <Or>
            <OrLine></OrLine>
            <div>OR</div>
            <OrLine></OrLine>
          </Or>
          <DemoLog onClick={onDemo}>
            {demoLog === false && (
              <>
                <DemoUser />
                <span>Log in as Demo User</span>
              </>
            )}
            {demoLog === true && <span>Loading... Please wait</span>}
          </DemoLog>
        </>
      )}
      {action === "getEmail" && (
        <>
          <Helmet>
            <title>Email Password • Instapost</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <img src="instalogo.png" width="180" alt="instalogo" />
            <Text>
              Enter your username or email and we'll email you your password.
            </Text>
            <Input placeholder={"Username or email"} {...email} />
            <Button text={"Send Password"} />
          </form>
          <Or>
            <OrLine></OrLine>
            <div>OR</div>
            <OrLine></OrLine>
          </Or>
          <DemoLog onClick={setSignup}>
            <>
              <DemoUser />
              <span>Create New Account</span>
            </>
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
            <Text>Sign up to see photos from your friends and others.</Text>
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Full Name"} {...name} />
            <Input placeholder={"Username"} {...username} />
            <Input type="password" placeholder={"Password"} {...secret} />
            <Button text={"Sign up"} />
            <p>
              By signing up, you agree to contact me for{" "}
              <span>future job opportunities</span> :)
            </p>
          </form>
        </>
      )}
      {action === "confirm" && (
        <>
          <Helmet>
            <title>Confirm login • Instapost</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <img src="instalogo.png" width="180" alt="instalogo" />
            <Text>Please enter the password we have emailed you.</Text>
            <Input placeholder="Enter your password" required {...secret} />
            <Button text={"Confirm to log in"} />
          </form>
        </>
      )}
    </Form>
    <StateChanger>
      {action === "logIn" && (
        <>
          Don't have an account? <Link onClick={setSignup}>Sign up</Link>
        </>
      )}
      {action === "signUp" && (
        <>
          Have an account? <Link onClick={setLogin}>Log in</Link>
        </>
      )}
      {action === "getEmail" && (
        <>
          Return back to log in? <Link onClick={setLogin}>Log in</Link>
        </>
      )}
      {action === "confirm" && (
        <>
          Return back to log in? <Link onClick={setLogin}>Log in</Link>
        </>
      )}
    </StateChanger>
  </Wrapper>
);