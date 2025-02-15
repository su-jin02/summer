import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./buttons.module.css";
const MypageButtons = ({ userid, onwithDrawal }) => {
  const navigate = useNavigate();
  const goToMyboards = (e) => {
    navigate("/myboards", { state: e.target.innerText });
  };
  const handleWithDraw = () => {
    onwithDrawal(userid);
  };
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={goToMyboards}>
        내 댓글 조회
      </button>
      <button className={styles.button} onClick={goToMyboards}>
        내 게시글 조회
      </button>
      <button className={styles.button} onClick={handleWithDraw}>
        회원 탈퇴
      </button>
    </div>
  );
};

export default MypageButtons;
