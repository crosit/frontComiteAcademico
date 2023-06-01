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
import { Button, Card, Space } from "antd";
import { ArrowRightOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { formatDateReverse } from "../../utilities/formats";

function App() {
  const { documents, isLoading, handleRefetch } = useUserViewDocuments();

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  // const container = useRef<any>(null);

  // useEffect(() => {
  //   Lottie.loadAnimation({
  //     container: container.current,
  //     renderer: "svg",
  //     loop: true,
  //     autoplay: true,
  //     animationData: animationData,
  //   });
  // }, [documents]);

  console.log(documents);

  const navigate = useNavigate();

  return (
    <div>
      <div style={{ marginTop: '50px',marginBottom: '50px', marginRight: '90px', display: 'flex', justifyContent: 'end' }}>
        <Button
          onClick={() => navigate("/create")}
        >
          Crear nueva solicitud
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexWrap: "wrap",
        }}
      >
        {documents?.map((card:any, index:number) => (
          <Card
            key={index}
            headStyle={{ background: "#3B76EC", color: "white" }}
            title={card.nombreDocumento}
            style={{
              background: "#3B76EC",
              color: "white",
              margin: "16px",
              minWidth: "300px",
              maxWidth: "300px",
              borderRadius: "8px",
              borderColor: "#3B76EC",
              borderWidth: "2px",
            }}
            actions={[
              <Button
                icon={<CheckOutlined />}
                type="primary"
                style={{ background: "#45C27A" }}
              />,
              <Button icon={<CloseOutlined />} type="primary" danger />,
            ]}
          >
            <div
              style={{
                height: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p style={{ fontSize: 16 }}>{card.descripcion}</p>
              <p style={{ fontSize: 16, fontWeight: "bold" }}>
                Fecha de creación: <br></br> {formatDateReverse({value: card.createdAt})}
              </p>
            </div>
            <Button style={{ width: '100%', marginTop: '1rem' }} icon={<ArrowRightOutlined />}>
              Ver solicitud
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
