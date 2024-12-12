import { useNavigate } from "react-router-dom";
import Style from "./BackBtn.module.css";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <>
      <button className={Style.back_btn} onClick={() => navigate(-1)}>
        Voltar
      </button>
    </>
  );
};

export default BackBtn;
