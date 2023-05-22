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
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

function App() {
  // const { documents, isLoading, handleRefetch } = useUserViewDocuments();

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

  const cardData = [
    {
      title: "Titulo 1",
      description:
        "Esta es la descripción de la tarjeta 3, descripción larga, se puede ver que se ajusta al tamaño de la tarjeta, y se ve bien.",
      creationDate: "2023-05-19",
    },
    {
      title: "Titulo 2",
      description:
        "Esta es la descripción de la tarjeta 3, descripción larga, se puede ver que se ajusta al tamaño de la tarjeta, y se ve bien.",
      creationDate: "2023-05-20",
    },
    {
      title: "Titulo 3",
      description:
        "Esta es la descripción de la tarjeta 3, descripción larga, se puede ver que se ajusta al tamaño de la tarjeta, y se ve bien.",
      creationDate: "2023-05-21",
    },
  ];

  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "90vh",
      }}
    >
      <div style={{ marginTop: '50px', marginRight: '90px', display: 'flex', justifyContent: 'end' }}>
        <Button
          onClick={() => navigate("/create")}
        >
          Crear nueva peticion
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {cardData.map((card, index) => (
          <Card
            key={index}
            headStyle={{ background: "#3B76EC", color: "white" }}
            title={card.title}
            style={{
              background: "#3B76EC",
              color: "white",
              margin: "16px",
              maxWidth: "350px",
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
              <Button
                icon={<CheckOutlined />}
                type="primary"
                style={{ background: "#45C27A" }}
              />,
              <Button icon={<CloseOutlined />} type="primary" danger />,
              <Button
                icon={<CheckOutlined />}
                type="primary"
                style={{ background: "#45C27A" }}
              />,
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
              <p style={{ fontSize: 16 }}>{card.description}</p>
              <p style={{ fontSize: 16, fontWeight: "bold" }}>
                Fecha de creación: {card.creationDate}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
