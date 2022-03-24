import { ReactElement, ChangeEvent } from "react";

import { ReactComponent as ErrorIcon } from "../../../assets/icons/error.svg";
import classes from "./Input.module.css";

type Props = {
  id: string;
  placeholder: string;
  labelText?: string;
  disabled?: boolean;
  height?: string;
  elementType: "input" | "textarea";
  value?: string;
  isError: boolean;
  changeHandler?: (
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => void;
};

const Input: React.FC<Props> = (props) => {
  const error = props.isError && (
    <div className={classes["Error-message"]}>
      <ErrorIcon />
      <p>Некорректно заполнено поле</p>
    </div>
  );

  let inputElement: ReactElement;
  if (props.elementType === "textarea") {
    inputElement = (
      <textarea
        maxLength={200}
        required
        value={props.value}
        id={props.id}
        className={
          props.isError
            ? classes.Textarea + " " + classes.Error
            : classes.Textarea
        }
        onChange={props.changeHandler}
        placeholder={props.placeholder}
        style={{ height: props.height }}
        disabled={props.disabled}
      />
    );
  } else {
    inputElement = (
      <input
        required
        id={props.id}
        value={props.value}
        className={
          props.isError ? classes.Input + " " + classes.Error : classes.Input
        }
        placeholder={props.placeholder}
        style={{ height: props.height }}
        disabled={props.disabled}
        onChange={props.changeHandler}
      />
    );
  }

  return (
    <div className={classes.Group}>
      {props.labelText && (
        <label
          htmlFor={props.id}
          className={props.disabled ? classes.Inactive : ""}
        >
          {props.labelText}
        </label>
      )}
      {inputElement}
      {error}
    </div>
  );
};

export default Input;
