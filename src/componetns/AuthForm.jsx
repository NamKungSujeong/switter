import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { authService } from "fbase";

import * as S from "./AuthForm.styled";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [errorPw, setErrorPw] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  let exptext = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.com+/;

  // 회원가입/로그인
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorEmail("같은 이메일이 존재합니다.");
      } else if (error.code === "auth/user-not-found") {
        setErrorEmail("아이디가 존재하지 않습니다.");
      } else if (error.code === "auth/wrong-password") {
        setErrorPw("비밀번호가 올바르지 않습니다.");
      }
    }
  };

  const handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    let errorMsg = "";
    if (name === "email") {
      if (newAccount && !exptext.test(value)) {
        errorMsg = "이메일 형식이 올바르지 않습니다.";
      }
      setEmail(value);
      setErrorEmail(errorMsg);
    } else if (name === "password") {
      if (newAccount && value.length < 6) {
        errorMsg = "비밀번호는 6자리 이상 입력해 주세요";
      }
      setPassword(value);
      setErrorPw(errorMsg);
    }
  };

  const handleToggleClick = () => {
    setNewAccount((prev) => !prev);
    setEmail("");
    setPassword("");
    setErrorPw("");
    setErrorEmail("");
  };
  return (
    <S.FormSection>
      <S.Form onSubmit={handleSubmit}>
        <InputEmail email={email} handleInputChange={handleInputChange} />
        <S.ErrorMsg>{errorEmail}</S.ErrorMsg>
        <InputPassword
          password={password}
          handleInputChange={handleInputChange}
        />
        <S.ErrorMsg>{errorPw}</S.ErrorMsg>
        <S.InputSubmit type="submit">
          {newAccount ? "회원가입" : "로그인"}
        </S.InputSubmit>
      </S.Form>
      <S.ToggleClickBtn onClick={handleToggleClick}>
        {newAccount ? "로그인" : "회원가입"}
      </S.ToggleClickBtn>
    </S.FormSection>
  );
};

export default AuthForm;

const InputEmail = ({ email, handleInputChange }) => {
  return (
    <>
      <S.InputUser
        name="email"
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
        autoFocus
        required
      />
    </>
  );
};

const InputPassword = ({ password, handleInputChange }) => {
  return (
    <>
      <S.InputUser
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange}
        required
        autoComplete="on"
      />
    </>
  );
};
