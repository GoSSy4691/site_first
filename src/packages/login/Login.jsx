import s from "./login.module.css";
import patternCSS from "../pattern.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import useDetectClickOut from "../useDetectClickOut.js";
import ByPass from "./ByPass.jsx";
import ByPhone from "./ByPhone.jsx";

export default function Login(props) {
  const user = useSelector((state) => state.user);
  const [loginForm, setLoginForm] = useState(
    user.userData ? "Profile" : "byPhone"
  );
  const refLogin = useDetectClickOut(props.isShowLogin, props.setShowLogin);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  function logoutBtn() {
    dispatch({ type: "SUCCESS_MESSAGE", payload: "log out confirmed" });
    dispatch({ type: "LOGOUT_CONFIRM" });
    props.setShowLogin(false);
  }

  function closeAndRefresh() {
    if (cookies.get("Token") !== undefined) {
      dispatch({ type: "LOGIN_CONFIRM", payload: cookies.get("Token") });
      props.setShowLogin(false);
    } else {
      setLoginForm("byPhone");
    }
  }

  switch (loginForm) {
    case "byPhone":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <ByPhone
              setLoginForm={setLoginForm}
              setShowLogin={props.setShowLogin}
            />
          </div>
        </div>
      );
    case "byPass":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <ByPass setLoginForm={setLoginForm} />
          </div>
        </div>
      );
    case "Wait":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <div className={s.afterName}>
              <div className={s.flexbox}>
                <div className={s.afterToken}>
                  Please verify your profile in new window
                </div>
                <button className={s.loginBtn} onClick={closeAndRefresh}>
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    case "Profile":
      return (
        <div className={patternCSS.darkenBackground}>
          <div className={s.loginDialog} ref={refLogin}>
            <div className={s.naming}>Вход в учетную запись</div>
            <div className={s.afterName}>
              <div className={s.firstLine}>
                <div className={s.token}>Hello, {user.userData.name}!</div>
                <svg
                  onClick={() => console.error("Didn't work yet")}
                  className={s.editBtn}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_233:52)">
                    <path
                      d="M17.071 2.93033C15.1823 1.04175 12.6711 0.00170898 10 0.00170898C7.32892 0.00170898 4.81771 1.04175 2.929 2.93033C1.04021 4.81888 0 7.33004 0 10.001C0 12.6721 1.04021 15.1832 2.929 17.0717C4.81771 18.9603 7.32892 20.0004 10 20.0004C12.6711 20.0004 15.1823 18.9603 17.071 17.0717C18.9598 15.1832 20 12.6721 20 10.001C20 7.33004 18.9598 4.81888 17.071 2.93033ZM2.56271 15.3528C2.57296 15.3451 2.58292 15.3368 2.59263 15.328L5.15829 12.9831C5.39463 13.2429 5.78017 13.6381 6.40933 14.267C7.03975 14.8971 7.4355 15.2827 7.69538 15.5188L5.47471 17.9699C4.3265 17.3154 3.33283 16.4199 2.56271 15.3528ZM9.18512 10.2216C8.85842 10.2216 8.55138 10.348 8.31908 10.5789C7.83921 11.0607 7.842 11.8442 8.32483 12.3251C8.56063 12.5607 8.87317 12.6904 9.20483 12.6904C9.53246 12.6904 9.84029 12.5633 10.0729 12.3311C10.4476 11.9538 10.5257 11.3902 10.3087 10.9324L14.996 6.24425L13.0482 12.8162C13.0143 12.8649 12.9388 12.9523 12.8978 12.9918C12.5788 13.1548 10.0582 14.257 8.3585 14.9944C7.81825 14.5099 6.16992 12.8625 5.68254 12.3201C6.42929 10.631 7.54254 8.13133 7.70858 7.80796C7.74983 7.76554 7.83863 7.68879 7.88788 7.65437L14.3123 5.7495L9.72021 10.3423C9.555 10.2633 9.37321 10.2216 9.18512 10.2216ZM9.48292 11.7426C9.40896 11.8164 9.31021 11.8571 9.20483 11.8571C9.09558 11.8571 8.99225 11.8139 8.91333 11.7351C8.75567 11.578 8.75396 11.3232 8.90804 11.1684C8.98171 11.0952 9.08008 11.0549 9.18512 11.0549C9.29437 11.0549 9.39767 11.098 9.47579 11.176C9.63613 11.3364 9.63867 11.5858 9.48292 11.7426ZM10 19.1671C8.66242 19.1671 7.39096 18.879 6.24408 18.3619L8.54567 15.8214C8.83729 15.695 9.85738 15.2521 10.8703 14.8086C11.5711 14.5018 12.1313 14.2546 12.5354 14.074C13.2416 13.7585 13.3765 13.6982 13.4449 13.6202C13.5172 13.5555 13.5898 13.4725 13.6336 13.4198C13.7645 13.2627 13.8317 13.1459 13.8536 13.031L16.1288 5.35425C16.1438 5.30363 16.149 5.25063 16.1443 5.19804C16.1125 4.84996 15.8023 4.55588 15.4667 4.55588C15.4265 4.55588 15.3867 4.56167 15.3482 4.57304L7.64038 6.85846L7.6405 6.85883C7.4225 6.9205 7.20475 7.13008 7.09542 7.24842C7.07821 7.26287 7.06096 7.28121 7.04017 7.31067C7.02938 7.32342 7.02342 7.33092 7.023 7.3315L7.02517 7.33296C6.91025 7.511 6.683 8.02062 5.88179 9.81746C5.43146 10.8273 4.98163 11.8445 4.85475 12.1315L2.10158 14.6478C1.29629 13.2844 0.833333 11.6959 0.833333 10.001C0.833333 4.94683 4.94546 0.835001 10 0.835001C15.0545 0.835001 19.1667 4.94687 19.1667 10.001C19.1667 15.0552 15.0545 19.1671 10 19.1671Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_233:52">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className={s.token}>
                {user.userData.phone > 0
                  ? user.userData.phone
                  : "Birth date not set"}
              </div>
              <div className={s.token}>
                {user.userData.birthday > 0
                  ? user.userData.birthday
                  : "Birthday not set"}
              </div>
              <p className={s.loginBtn} onClick={logoutBtn}>
                Log out
              </p>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
