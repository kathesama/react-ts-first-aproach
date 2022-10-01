/*
Created by: Katherine Aguirre
On: 7/4/2022 : 7/4/2022
Project: react-ts-first-aproach
*/
import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { UserInfo } from '../../models/UserInfo';
import useAxios from '../../hooks/useAxios/useAxios';
import { getPostUserUrl } from '../../utilities/routes';
import InputComponent from '../../components/input/input';

// import cssStyle from "./signUpPage.module.scss";

const defaultUserInfo: UserInfo = {
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
};

const SignUpPage: FC<any> = (props: any): any => {
  const { i18n } = props;
  const { t } = useTranslation();
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultUserInfo);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [errorForm, setErrorForm] = useState<UserInfo>(defaultUserInfo);
  const { error, success, loading : submitting, action } = useAxios();

  useEffect(() => {
    const { password, confirmPassword = '' } = userInfo;
    if (password?.length > 0 && confirmPassword?.length > 0) {
      setDisabled(password !== confirmPassword || submitting);
    }
  }, [userInfo, submitting]);

  const onChangeHandler = (event: FormEvent) => {
    const { id, value } = (event.target as HTMLInputElement);
    setErrorForm({ ...errorForm, [id]: '' });
    setUserInfo({ ...userInfo, [id]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const content = {
      url: getPostUserUrl(),
      method: 'POST',
      data: {
        username: userInfo?.username,
        email: userInfo?.email,
        password: userInfo?.password
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': i18n.language
      }
    };

    await action(content, () => {});

    /*
    await AxiosApi
      .post(getPostUserUrl(), {
        username: userInfo?.username,
        email: userInfo?.email,
        password: userInfo?.password
      },{
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": i18n.language
        }
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
          setErrorForm(err?.response?.data?.validationErrors);
        }
      });
      */
  };

  useEffect(() => {
    if (error.status !== 200) {
      const { data = { validationErrors: defaultUserInfo} } = error;
      setErrorForm(data?.validationErrors);
    }
  }, [error]);

  return (
    <div data-testid="signup-page">
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
        <form className="card mt-5" data-testid="form-signing-test">
          <div className="card-header">
            <h1 className="text-center">{t('signUp')}</h1>
          </div>
          <div className="card-body">
            <InputComponent
              id="username"
              label={t('username')}
              type="text"
              placeholder={t('username')}
              name="username"
              onChange={onChangeHandler}
              className="form-control"
              error={errorForm?.username}
            />
            <div className="mb-3">
              <InputComponent
                id="email"
                label={t('email')}
                type="text"
                placeholder={t('email')}
                name="email"
                onChange={onChangeHandler}
                className="form-control"
                error={errorForm?.email}
              />
            </div>
            <div className="mb-3">
              <InputComponent
                id="password"
                label={t('password')}
                type="password"
                placeholder={t('password')}
                name="password"
                onChange={onChangeHandler}
                className="form-control"
                error={errorForm?.password}
              />
            </div>
            <div className="mb-3">
              <InputComponent
                id="confirmPassword"
                label={t('passwordRepeat')}
                type="password"
                placeholder={t('passwordRepeat')}
                name="confirmPassword"
                onChange={onChangeHandler}
                className="form-control"
                error={disabled && userInfo.password?.length > 0 ? t('passwordMismatchValidation') : ''}
              />
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
                {submitting
                  && <span data-testid="spinner-test" className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>}
                {t('signUpBtn')}
              </button>
            </div>
          </div>
        </form>
        {success && <div className="alert alert-success mt-3">Account activation email sent</div>}
      </div>
    </div>
  );
};

const SignUpPageWithTranslation = withTranslation()(SignUpPage);

export default SignUpPageWithTranslation;
