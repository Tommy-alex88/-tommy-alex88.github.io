import { ReactElement } from "react";

import { ReactComponent as CameraIcon } from "../../assets/icons/camera.svg";
import classes from "./Profile.module.css";

type Props = {
  name: string;
  surname: string;
  photo: string;
  fontWeight?: number;
};

const Profile: React.FC<Props> = (props) => {
  let userImage: string | ReactElement;
  if (props.photo) {
    userImage = <img src={props.photo} alt="MyPhoto" />;
  } else {
    userImage = <CameraIcon />;
  }

  return (
    <div className={classes.Profile}>
      <div className={classes.ImageContainer}>{userImage}</div>
      <p style={{ fontWeight: props.fontWeight }}>
        {props.name} <span className={classes.Surname}>{props.surname}</span>
      </p>
    </div>
  );
};

export default Profile;
