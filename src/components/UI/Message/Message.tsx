import { Fragment, useState } from "react";

import { ReactComponent as Bubble1 } from "../../../assets/message/v-bubble.svg";
import { ReactComponent as Bubble2 } from "../../../assets/message/green-bubble.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";

import classes from "./Message.module.css";

type Props = {
  error: boolean;
  clicked: () => void;
};

const Message: React.FC<Props> = ({ error, clicked }: Props) => {
  let header = "Успешно!";
  let message = "Спасибо за отзыв о нашей компании :)";
  let currentClass = classes.Main + " " + classes.Success;
  if (error) {
    header = "Что-то не так...";
    message = "Не получилось отправить отзыв. Попробуйте еще раз!";
    currentClass = classes.Main + " " + classes.Error;
  }

  return (
    <div className={currentClass}>
      <div className={classes.Container}>
        <Bubble2 className={classes.Bubble2} />
        <CloseIcon className={classes.Close} onClick={clicked} />
        <div className={classes.Text}>
          <h4>{header}</h4>
          <p>{message}</p>
        </div>
      </div>
      <Bubble1 className={classes.Bubble1} />
    </div>
  );
};
export default Message;
