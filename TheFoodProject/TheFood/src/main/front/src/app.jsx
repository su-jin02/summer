import { useRef } from "react";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import styles from "./app.module.css";
import AboutUs from "./component/about_us/about_us";
import BoardDetail from "./component/board_detail/board_detail";
import BoardWrite from "./component/board_write/board_write";
import FindPw from "./component/findPw/findPw";
import Free from "./component/free/free";
import Home from "./component/home/home";
import Login from "./component/login/login";
import Myboards from "./component/myboards/myboards";
import Mypage from "./component/mypage/mypage";
import Recipe from "./component/recipe/recipe";
import Restaurant from "./component/restaurant/restaurant";
import Signup from "./component/signup/signup";
import UserBtn from "./component/user_btn/user_btn";
function App({ auth, boardApi }) {
  const [user, setUser] = useState();
  const [tokenExpiration, setTokenExpiration] = useState();
  const [token, setToken] = useState();

  const navigate = useNavigate();
  const onMypageChange = (mypageForm) => {
    auth
      .mypageChange(mypageForm) //
      .then((u) => {
        setUser(u);
        alert("회원 정보가 성공적으로 수정되었습니다!");
        navigate("/");
      });
  };
  const onwithDrawal = (id) => {
    if (window.confirm("회원 탈퇴를 정말로 하시겠습니까?")) {
      auth //
        .withDrawal(id)
        .then((_) => {
          alert("회원 탈퇴가 성공적으로 완료되었습니다!");
          localStorage.clear();
          setUser();
          navigate("/");
        });
    }
  };
  const onSignup = (signupForm) => {
    auth
      .signup(signupForm) //
      .then((u) => {
        if (!u) {
          alert("이미 존재하는 회원입니다.");
        } else {
          alert("회원가입이 성공적으로 완료되었습니다!");
          navigate("/");
        }
      });
  };

  //로그인 유지
  const onStayLogin = (token, expiration) => {
    const tokenForm = { token };
    if (expiration < new Date()) {
      onLogout();
      return;
    }
    auth
      .stayLogin(tokenForm) //
      .then((u) => {
        setUser(u);
        //로그아웃을 위한 세팅
        setToken(token);
        //만료시간 세팅되면 로그아웃 타이머 작동함
        setTokenExpiration(expiration);
      })
      .catch((e) => {
        //해당 토큰이 만료되었을 경우 체크하는 부분 필요함.
        console.log("token error: there is no token");
        setUser();
      });
  };

  //첫 로그인
  const onLogin = (loginForm) => {
    auth
      .login(loginForm) //
      .then((t) => {
        if (!t) {
          alert("이메일 혹은 비밀번호를 다시 확인해주세요.");
        } else {
          console.log(t);
          const tokenLocal = { token: t.token, expiration: t.expiration };
          localStorage.removeItem("token");
          localStorage.setItem("token", JSON.stringify(tokenLocal));
          onStayLogin(t.token, t.expiration);
          alert("로그인이 성공적으로 완료 됐습니다.");
          navigate("/");
        }
      });
  };

  const onLogout = () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("token");
    setToken(null);
    setTokenExpiration(null);
    setUser(null);
    navigate("/");
  };
  const onLogoutNoAlert = (e) => {
    localStorage.removeItem("token");
    setToken(null);
    setTokenExpiration(null);
    setUser(null);
    navigate("/");
  };

  const onFindPw = (findPwForm) => {
    return auth.findPw(findPwForm); //
  };

  const goToLogin = () => {
    navigate("/login");
  };
  const goToSignup = () => {
    navigate("/signup");
  };
  const goToFindPw = () => {
    navigate("/findPw");
  };
  const goToMypage = () => {
    navigate("/mypage");
  };
  //재접속 자동 로그인
  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem("token"));
    if (localToken) {
      const currentTokenExpiration = new Date(localToken.expiration);
      //유효 만료시간이 아직 남은 경우에만 로그인
      if (currentTokenExpiration > new Date()) {
        onStayLogin(localToken.token, currentTokenExpiration);
      } else {
        onLogoutNoAlert();
      }
    }
  }, []);

  //자동 로그아웃
  const logoutTimer = useRef();
  const alertTimer = useRef();

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainTime = tokenExpiration.getTime() - new Date().getTime();
      const alertTime = remainTime - 1000 * 60;
      logoutTimer.current = setTimeout(onLogout, remainTime);
      alertTimer.current = setTimeout(
        () =>
          alert(
            "로그인 유지되는 시간이 곧 끝납니다. 1분 뒤에 자동으로 로그아웃 됩니다."
          ),
        alertTime
      );
    } else {
      clearTimeout(logoutTimer.current);
      clearTimeout(alertTimer.current);
    }
  }, [tokenExpiration]);

  return (
    <div className={styles.app}>
      <UserBtn
        user={user}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToMypage={goToMypage}
        onLogout={onLogout}
      />
      <Routes>
        <Route path="/" exact element={<Home user={user} />} />
        <Route
          path="/login"
          exact
          element={
            <Login
              onLogin={onLogin}
              goToSignup={goToSignup}
              goToFindPw={goToFindPw}
            />
          }
        />
        <Route
          path="/signup"
          exact
          element={
            <Signup
              onSignup={onSignup}
              goToLogin={goToLogin}
              goToFindPw={goToFindPw}
            />
          }
        />
        <Route
          path="/mypage"
          exact
          element={
            <Mypage
              auth={auth}
              userProps={user}
              onChange={onMypageChange}
              onwithDrawal={onwithDrawal}
            />
          }
        />
        <Route
          path="/myboards"
          exact
          element={<Myboards auth={auth} boardApi={boardApi} />}
        />
        <Route
          path="/findPw"
          exact
          element={
            <FindPw
              onFindPw={onFindPw}
              goToLogin={goToLogin}
              goToSignup={goToSignup}
            />
          }
        />
        <Route
          path="/boardwrite"
          exact
          element={<BoardWrite auth={auth} boardApi={boardApi} />}
        />
        <Route
          path="/boarddetail"
          exact
          element={<BoardDetail auth={auth} boardApi={boardApi} />}
        />
        <Route
          path="/recipe"
          exact
          element={<Recipe auth={auth} boardApi={boardApi} />}
        />
        <Route
          path="/restaurant"
          exact
          element={<Restaurant auth={auth} boardApi={boardApi} />}
        />
        <Route
          path="/free"
          exact
          element={<Free auth={auth} boardApi={boardApi} />}
        />
        <Route path="/aboutus" exact element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
