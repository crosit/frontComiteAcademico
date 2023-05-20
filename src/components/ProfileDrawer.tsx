import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import useProfile from "../hooks/useProfile";
import ImageProfile from "./ImageProfile";
import { useQueryClient } from "react-query";

type Props = {};

export default function ProfileDrawer({}: Props) {
  const fileRef: any = useRef();
  const [urlLocation, setUrlLocation] = useState<any>("");
  const user: any = localStorage.getItem("user");
  const userparse = JSON.parse(user);
  const [data, setData] = useState<any>({});


  const { profile, handleUpload, handleSubmit } = useProfile({
    urlLocation, setUrlLocation
  });

  useEffect(() => {
    if (urlLocation) {
      data.profile_photo = urlLocation;
      userparse.profile_photo = urlLocation;
      handleSubmit(data);
      localStorage.setItem("user", JSON.stringify(userparse));
    } 
  }, [urlLocation]);


  return (
    <div className="profile-drawer-container">
      <div className="profile-drawer-header">
        <div className="profile-drawer-item">
          <Button
            onClick={() => fileRef.current.click()}
            className="button-image-profile"
          >
            <input
              hidden
              type="file"
              ref={fileRef}
              onChange={(e: any) => {
                console.log(e?.target?.files[0]);
                const formData = new FormData();
                formData.append("file", e?.target?.files[0]);
                handleUpload(formData)
              }}
            />
            <ImageProfile photo={profile?.profile_photo} />
          </Button>
        </div>
      </div>

      <div className="profile-drawer-body">
        <span className="name">{profile?.firstname} {profile?.lastname}</span>
        <br />

        <span className="item" style={{fontSize: '1rem'}}>{profile?.email}</span>
        <br />
        <span className="name" style={{marginTop: '1rem'}}>{profile?.company?.name}</span>
        <br />
        <span className="item">{profile?.position?.name}</span>
        <br />
        <span className="item">{profile?.position?.department?.name}</span>
        <br />
      </div>

      <div className="profile-drawer-footer"></div>
    </div>
  );
}
