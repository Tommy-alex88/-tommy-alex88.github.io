import { ReactNode } from "react";
import { ReactComponent as PlusIcon } from "../../../assets/icons/plus.svg";
import { ReactComponent as HumanoidIcon } from "../../../assets/icons/humanoid.svg";
import classes from "./Button.module.css";

type Props = {
  children?: ReactNode;
  onButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonClassName: "Button" | "Button_Icon";
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  mobileSize?: boolean;
};

const Button: React.FC<Props> = (props) => {
  const currentClass = props.mobileSize
    ? classes[props.buttonClassName] + " " + classes.Minimize
    : classes[props.buttonClassName];
  return (
    <button
      className={currentClass}
      type={props.type}
      onClick={props.onButtonClick}
      disabled={props.disabled}
    >
      <PlusIcon className={classes.Plus} />
      <HumanoidIcon className={classes.Humanoid} />
      <p className={classes.Text}>{props.children}</p>
    </button>
  );
};

export default Button;
