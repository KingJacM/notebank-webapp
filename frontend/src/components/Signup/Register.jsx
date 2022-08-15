import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import "./Register.css";
import React from "react";
import {
  GridForm,
  GridLabel,
  FullGridRow,
  FullWidthButton,
  SignupInput,
  CenterDiv,
  GreyMessage,
} from "../../StyleComponent";

const PWD_REGEX = /^.{8,24}$/;
const REGISTER_URL = "/users";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!PWD_REGEX.test(pwd)) {
      setErrMsg("Invalid Password");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response?.email);
      setSuccess(true);

      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className="register-container">
          <section>
            <h1>Success!</h1>
            <p>
              <a href="/signin">Sign In</a>
            </p>
          </section>
        </div>
      ) : (
        <React.Fragment>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <GridForm onSubmit={handleSubmit} id="signupform">
            <div>
              <GridLabel font_size="15px" htmlFor="firstname">
                First Name
              </GridLabel>
              <SignupInput
                type="text"
                id="firstname"
                autoComplete="off"
                required
              />
            </div>

            <div>
              <GridLabel font_size="15px" htmlFor="lastname">
                Last Name
              </GridLabel>
              <SignupInput
                type="text"
                id="lastname"
                autoComplete="off"
                required
              />
            </div>

            <FullGridRow>
              <GridLabel font_size="15px" htmlFor="username">
                Email address
              </GridLabel>
              <SignupInput
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
            </FullGridRow>
            <FullGridRow>
              <GridLabel font_size="15px" htmlFor="password">
                Password
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
              </GridLabel>

              <SignupInput
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                placeholder="Use 8-24 characters"
              />
            </FullGridRow>
            <FullGridRow>
              <GridLabel font_size="15px" htmlFor="confirm_pwd">
                Confirm Password
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </GridLabel>
              <SignupInput
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
            </FullGridRow>
            <div>
              <GridLabel font_size="15px" htmlFor="degree">
                Field of degree
              </GridLabel>
              <SignupInput
                type="text"
                id="degree"
                autoComplete="off"
                required
              />
            </div>
          </GridForm>
          <CenterDiv>
            <GreyMessage width="80%">
              By clicking "Sign Up", you agree to our Terms, Data Policy, Cookie
              Policy and Anti-Spam Policy. You may receive SMS/Email
              notifications from us and can opt out at any time.
            </GreyMessage>
            <FullWidthButton
              type="submit"
              form="signupform"
              width="350px"
              disabled={!validPwd || !validMatch ? true : false}
            >
              Sign Up
            </FullWidthButton>
          </CenterDiv>
        </React.Fragment>
      )}
    </>
  );
};

export default Register;
