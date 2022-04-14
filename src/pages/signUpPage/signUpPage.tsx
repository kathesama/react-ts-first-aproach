/*
Created by: Katherine Aguirre
On: 7/4/2022 : 7/4/2022
Project: react-ts-first-aproach
*/
import React, { FC, FormEvent, useEffect, useState } from "react";
import { UserInfo } from "@/models/UserInfo";
import AxiosApi from "@/services/api/axiosApi";
import { getPostUserUrl } from "@/utilities/routes";
import InputComponent from "@/components/input/input";
// import cssStyle from "./signUpPage.module.scss";

const defaultUserInfo: UserInfo = {
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
};

const SignUpPage: FC<any> = (): any => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [disabled, setDisabled] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const [error, setError] = useState(() => (<></>));
  const [errorObj, setErrorObj] = useState({});

  useEffect(() => {
    const { password, confirmPassword = "" } = userInfo;
    if (password?.length > 0 && confirmPassword?.length > 0) {
      setDisabled(password !== confirmPassword || submitting);
    }
  }, [userInfo, submitting]);

  const onChangeHandler = (event: FormEvent) => {
    const { id, value } = (event.target as HTMLInputElement);
    setUserInfo({ ...userInfo, [id]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    await AxiosApi
      .post(getPostUserUrl(), {
        username: userInfo?.username,
        email: userInfo?.email,
        password: userInfo?.password
      })
      .then(() => {
        setSuccess(true);
        setSubmitting(false);
        // eslint-disable-next-line react/jsx-no-useless-fragment
        setError(() => (<></>))
      })
      .catch((err) => {
        // console.log(err);
        setSuccess(false);
        setSubmitting(false);
        if (err.response.status === 400) {
          const errObj = err?.response?.data?.validationErrors || {};
          const response = Object.keys(errObj).map((key, index) => 
            // eslint-disable-next-line react/no-array-index-key
             <li key={`idx_${index}`}>{`${errObj[key]}`}</li>
          );
          setError(() => (<>{err?.response?.data?.message}<ul>{response}</ul></>));
          setErrorObj(err?.response?.data?.validationErrors);
        }
      });
  };

  return (
    <div>
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
        <form className="card mt-5">
          <div className="card-header">
            <h1 className="text-center">Sign Up</h1>
          </div>
          <div className="card-body">
            <InputComponent
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              onChange={onChangeHandler}
              className="form-control"
              error={errorObj}
            />
            <div className="mb-3">
              <input
                id="email"
                placeholder="email"
                onChange={onChangeHandler}
                className="form-control"
                data-testid="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
                <input
                  id="password"
                  type="password"
                  onChange={onChangeHandler}
                  className="form-control"
                  data-testid="password"
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={onChangeHandler}
                  className="form-control"
                  data-testid="confirmPassword"
                />
              </label>
            </div>
            <div className="text-center">
              <button
                disabled={disabled}
                type="submit"
                name="signUp"
                onClick={handleSubmit}
                className="btn btn-primary mb-3"
                data-testid="signUp"
              >
                {submitting && <span data-testid="spinner-test" className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>}
                Sign Up
              </button>
            </div>
          </div>
        </form>
        {success && <div className="alert alert-success mt-3">Account activation email sent</div>}
        {/* {error.props?.children?.length > 0 && <div className="alert alert-danger mt-3">{error}</div>} */}
      </div>
    </div>
  );
};

export default SignUpPage;
