import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProfile, updateProfilePhoto } from "../services/profile.service";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

type Profile = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  company: {
    name: string;
  };
  position: {
    name: string;
    department: {
      name: string;
    };
  };
};

const useProfile = ({urlLocation, setUrlLocation}:any) => {
  const user: any = localStorage.getItem("user");
  const userparse = JSON.parse(user);
  const id = Number(userparse.id);
  const queryClient = useQueryClient();
  const { t } = useTranslation();


  let profile = useQuery("profile", getProfile, {
    onError: () => {
      notification.error({
        message: "Error",
        description: "Error al obtener el perfil",
        style: {
          background: "#ffe7a6",
          borderRadius: "10px",
          fontWeight: "bold",
        },
        icon: <CloseCircleOutlined style={{ color: "#FF4D4F" }} />,
      });
    },
  });

  // const uploadData = useMutation((data: any) => uploadPhoto(data), {
  //   onSuccess: (res) => {
  //     setUrlLocation(res.data.location);
  //   },
  //   onError: (error: any) => {
  //     console.log(error);
  //   },
  // });

  // const handleUpload = (data: any) => {
  //   return uploadData.mutate(data);
  // };

  const onSubmit = useMutation((data: any) => updateProfilePhoto(data, id), {
    onSuccess: (res) => {
      queryClient.removeQueries("profile");
      notification.success({
        message: t('profile.profilePhoto'),
        placement: "top",
        description: t('profile.updatePhoto'),
        style: {
          background: "#ffe7a6",
          borderRadius: "10px",
          fontWeight: "bold",
          // border: "2px solid #52C41A",
        },
        icon: <CheckCircleOutlined style={{ color: "#52C41A" }} />,
      });
    },
    onError: (error: any) => {
      console.log(error);
      notification.error({
        style: {
          background: "#ffe7a6",
          borderRadius: "10px",
          fontWeight: "bold",
        },
        icon: <CloseCircleOutlined style={{ color: "#FF4D4F" }} />,
        message: "Error",
        placement: "top",
        description: t('profile.updatePhotoError'),
      });
    },
  });

  const handleSubmit = (data: any) => {
    return onSubmit.mutate(data);
  };

  return {
    profile: profile.data,
    // handleUpload,
    handleSubmit
  };
};

export default useProfile;
