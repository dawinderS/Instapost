import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const name = useInput("");
  const email = useInput("");
  const secret = useInput("");

  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      name: name.value
    }
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const [confirmDemoMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: "demo@gmail.com",
      secret: "demo",
    },
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  // const clearErrors = () => {
  //   const allInputs = document.querySelectorAll("input");
  //   for (let i = 0; i < allInputs.length; i++) {
  //     allInputs[i].value = "";
  //   }
  // };

  const onDemo = async e => {
    e.preventDefault();
    try {
      const {
        data: { confirmSecret: token },
      } = await confirmDemoMutation();
      if (token !== "" && token !== undefined) {
        localLogInMutation({ variables: { token } });
        window.location = "/";
      } else {
        throw Error();
      }
    } catch {
      toast.error("Demo login is down, please log in with your own credentials.");
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          if (!requestSecret && email.value.includes('@')) {
            toast.error("The email you entered doesn't belong to an account. Please check your email and try again.");
          } else if (!requestSecret) {
            toast.error("The username you entered doesn't belong to an account. Please check your username and try again.");
          } else {
            toast.info("Check your inbox for your login passcode.");
            setAction("confirm");
          }
        } catch {
          toast.error("Can't request passcode, please try again");
        }
      } else {
        toast.error("Email field is required.");
      }
    } else if (action === "signUp") {
      if (username.value.includes(" ")) {
        toast.error("Username cannot include any spaces.")
        return;
      }
      if (
        email.value !== "" &&
        username.value !== ""
        // && name.value !== ""
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Cannot create account, please try again");
          } else {
            toast.info("Your account has been created! Log in now.");
            setTimeout(() => setAction("logIn"), 2500);
          }
        } catch (e) {
          toast.error(e.message.split(' ').slice(2).join(' '));
        }
      } else {
        toast.error("Email and username fields are required.");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
            window.location = "/";
          } else {
            throw Error();
          }
        } catch {
          toast.error("Incorrect passcode, please try again.");
        }
      }
    }
  };


  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      name={name}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
      onDemo={onDemo}
    />
  );
};
