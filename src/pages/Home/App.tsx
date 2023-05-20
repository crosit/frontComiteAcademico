// import reactLogo from '../../assets/react.svg'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/main.scss";
import { useTranslation } from "react-i18next";
import CardDocument from "../../components/CardDocument";
import Title from "antd/es/typography/Title";
import useUserViewDocuments from "./hooks/useUserViewDocuments";
import Loader from "../../components/Loader";
import animationData from "../../assets/lottie/lottie-loading2.json";
import { useRef, useEffect } from "react";
import Lottie from "lottie-web";

function App() {
  const { documents, isLoading, handleRefetch } = useUserViewDocuments();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const container = useRef<any>(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }, [documents]);

  const { t } = useTranslation();
  return (
    <div style={{ color: "black" }}>
      <Title className="titleHome">
        {t("documents.policiesandprocedures")}
      </Title>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {isLoading ? (
          <Loader />
        ) : documents.length > 0 ? (
          documents.map((document: any) => (
            <CardDocument
              key={document.id}
              document={document}
              handleRefetch={handleRefetch}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              marginTop: 100,
            }}
          >
            <div style={{ fontWeight: "bold", background: "#ffc858", padding: 10, borderRadius: 20 }}>
              {t("documents.noPendingDocuments")} 🐝 
            </div>
            <div style={{ height: 300, width: 300 }} ref={container}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
