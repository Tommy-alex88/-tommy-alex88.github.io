import Logo from "../../Logo/Logo";
import Profile from "../../Profile/Profile";
import Button from "../Button/Button";

import classes from "./Toolbar.module.css";

type Props = {
  name: string;
  surname: string;
  photo: string;
};

const Toolbar: React.FC<Props> = ({ name, surname, photo }: Props) => {
  return (
    <header className={classes.Toolbar}>
      <Profile name={name} surname={surname} photo={photo} />
      <Logo />
      <div className={classes["Button_section"]}>
        <div className={classes.Button}>
          <Button mobileSize buttonClassName="Button" onButtonClick={() => {}}>
            Панель управления
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Toolbar;
