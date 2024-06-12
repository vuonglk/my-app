"use client";

import { Col, Form, Input, Row } from "antd";
// import LogoIcon from "assets/logo/LogoIcon.svg";
// import LogoText from "assets/logo/LogoText.svg";
// import Button from "components/ShareComponents/Button";
// import { env } from "configs/EnvironmentConfig";
// import { getTokenDevice } from "firebases";
// import Banner from "pages/banner-slide";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ResendMailComponent from "../../components/ShareComponents/ResendMail";
// import { signInSuccess } from "../../redux/actions/Auth";
// import JwtAuthService from "../../services/AuthServices";
// import "./style.scss";
// import { REGEXP_EMAIL } from "redux/contants/Auth";
// import { appendGoogleTag } from "utils/gtag";

export const detectAutofill = (element) => {
  if (!element) return;
  return new Promise((resolve) => {
    resolve(
      window.getComputedStyle(element, null).getPropertyValue("background") ===
        "rgb(232, 240, 254) none repeat scroll 0% 0% / auto padding-box border-box"
    );
  });
};

const Login = (props) => {
  const captchaRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    reCaptchaToken: "",
  });
  const [isVerify, setVerify] = useState(false);
  const [disable, setDisable] = useState(true);
  const { setTheme } = props;

  // const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  // useEffect(() => {
  //   appendGoogleTag();
  // }, []);

  useEffect(() => {
    // (async function () {
    //   if (
    //     (values?.email && values?.password) ||
    //     ((await detectAutofill(emailRef?.current?.input)) &&
    //       (await detectAutofill(passwordRef?.current?.input)))
    //   ) {
    //     setDisable(false);
    //   }
    //   if (
    //     values?.email &&
    //     values?.password &&
    //     REGEXP_EMAIL.test(values?.email)
    //   ) {
    //     setDisable(false);
    //   } else {
    //     setDisable(true);
    //   }
    // })();
  }, [values]);

  const handleLogin = async (payload) => {
    // try {
    //   setLoading(true);
    //   const result = await JwtAuthService.login(payload);
    //   localStorage.setItem("authen_token", result.tokens.access.token);
    //   result.user.role === "user"
    //     ? localStorage.setItem(
    //         "info_user",
    //         JSON.stringify({ id: result.user.id })
    //       )
    //     : localStorage.setItem("info_user", JSON.stringify(result.user));
    //   if (payload.deviceToken) {
    //     localStorage.setItem("d_token", payload.deviceToken);
    //   }
    //   dispatch(signInSuccess(result.tokens.access.token));
    //   window.location.href = `${
    //     result.user.role === "admin" ? "/admin" : ""
    //   }/dashboard`;
    // } catch (error) {
    //   if (error?.data?.systemCode === 1002) setVerify(true);
    //   toast.error(error?.data?.message || "Email or password incorrect");
    // } finally {
    //   setLoading(false);
    // }
  };

  const submitLogin = async (value) => {
    const tokenCaptcha = await captchaRef.current.executeAsync();
    // try {
    //   if (
    //     (values?.email && values?.password) ||
    //     ((await detectAutofill(emailRef?.current?.input)) &&
    //       (await detectAutofill(passwordRef?.current?.input)))
    //   ) {
    //     let payload = {
    //       email: values?.email,
    //       password: values?.password,
    //       reCaptchaToken: tokenCaptcha,
    //     };
    //     if (!window.Notification) {
    //       console.log("Browser does not support notifications.");
    //       handleLogin(payload);
    //     } else {
    //       // check if permission is already granted
    //       if (Notification.permission === "granted") {
    //         // show notification here
    //         await getTokenDevice()
    //           .then((deviceToken) => {
    //             handleLogin({
    //               ...payload,
    //               deviceToken,
    //             });
    //           })
    //           .catch((error) => {
    //             handleLogin(payload);
    //           });
    //       } else {
    //         handleLogin(payload);
    //       }
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // useEffect(() => {
  //   setTheme(false);
  //   return () => {
  //     setTheme(true);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleChange = (value, i) => {
    setValues({ ...values, ...i });
  };

  return (
    <div className="App">
      <Row>
        <Col span={0} xl={15}>
          {/* <Banner /> */}
        </Col>
        <Col span={24} xl={9}>
          {isVerify ? (
            // <ResendMailComponent email={values?.email} type="login" />
            "test"
          ) : (
            <div className="content-login">
              <div className="logo">
                <a
                  href="/home"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    justifyContent: "center",
                  }}
                >
                  <img
                    width={40}
                    height={40}
                    // src={LogoIcon}
                    alt="pubFuture logo"
                  />
                  <img
                    width={138}
                    height={16}
                    // src={LogoText}
                    alt="pubFuture content"
                  />
                </a>
              </div>
              <div className="content-form">
                <div className="title-page">
                  We Create Your Future
                  <br /> By Talking Forever To Grow Up
                </div>
                <div className="subtitle-page">Login</div>
                <Form
                  onFinish={submitLogin}
                  onValuesChange={handleChange}
                  layout="vertical"
                  autoComplete="off"
                >
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "" },
                      // { pattern: REGEXP_EMAIL, message: "" },
                    ]}
                  >
                    <Input
                      placeholder="Enter a valid email address"
                      id="email"
                      autoComplete="email"
                      ref={emailRef}
                      style={{ boxShadow: "none" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input.Password
                      placeholder="Password"
                      id="password"
                      ref={passwordRef}
                    />
                  </Form.Item>
                  {/* <p className="forgot-button">
                    <Link to="/auth/forgot-password">Forgot password?</Link>
                  </p>
                  <Button
                    disabled={disable}
                    className="btn-login"
                    htmlType="submit"
                    loading={isLoading}
                    background="var(--color-green)"
                    block
                  >
                    Login
                  </Button> */}

                  <p className="link-to">
                    Not a member? <a href="/auth/signup">Sign up now</a>
                  </p>
                  {/* <ReCAPTCHA
                    sitekey={env.SITE_KEY}
                    ref={captchaRef}
                    hl="en"
                    size="invisible"
                  /> */}
                </Form>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Login;
