import { ChangeEvent, Fragment, useState } from "react";

import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import { ReactComponent as NoteIcon } from "../../../assets/icons/notation.svg";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";
import Input from "../Input/Input";
import ProgressBar from "../ProgressBar/ProgressBar";
import { FormData } from "../../../dataTypes";

import classes from "./Modal.module.css";

type Props = {
  show: boolean;
  onModalCloseClick: () => void;
  bindFormData: (data: FormData) => void;
};

const Modal: React.FC<Props> = (props) => {
  const initialFormState = {
    name: "",
    review: "",
    image: null,
    error: true,
  };
  const [formValues, setFormValues] = useState<FormData>(initialFormState);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadCompleted, setLoadCompleted] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [inputIsValid, setInputIsValid] = useState<boolean>(false);
  const [textAreaIsValid, setTextAreaIsValid] = useState<boolean>(false);
  const [isInputEscaped, setIsInputEscaped] = useState<boolean>(false);
  const [isTextAreaEscaped, setIsTextAreaEscaped] = useState<boolean>(false);
  const [fileError, setFileError] = useState<boolean>(false);
  const reader = new FileReader();

  const updateProgress = (event: ProgressEvent) => {
    if (event.lengthComputable) {
      const percentLoaded: number = Math.round(
        (event.loaded / event.total) * 100
      );
      console.log(percentLoaded);
      if (percentLoaded < 100) {
        setPercent(percentLoaded);
      }
    }
  };

  //  helper function to access the hidden <input type="file"/> without especial tricks
  const clickHandler = () => {
    const fileInput = document.getElementById("load");
    if (fileInput) {
      fileInput.click();
    }
  };

  const binClickHandler = () => {
    setLoading(false);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      image: null,
    }));
    reader.abort();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      image: file ? file : null,
    }));
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      error: true,
    }));

    if (file && file.size < 500000000) {
      setFileError(false);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        error: false,
      }));
    } else {
      setFileError(true);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        error: true,
      }));
    }

    reader.onloadstart = () => setLoading(true);
    reader.onprogress = updateProgress;
    reader.onload = () => setLoadCompleted(true);
    reader.onabort = () => {
      setLoading(false);
    };
    reader.onerror = function () {
      throw new Error("There was an issue reading the file." + reader.error);
    };
    if (event.target.files) {
      reader.readAsArrayBuffer(event.target.files[0]);
    }
  };
  const inputChangeHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const pattern = /[(a-zа-я)]\s*[(a-zа-я)]*/gi;
    const result = value.match(pattern);
    if (result) {
      setInputIsValid(true);
    } else {
      setInputIsValid(false);
    }
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      name: value,
    }));
  };

  const textAreaChangeHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const pattern = /[(a-zа-я)]\s*[(a-zа-я)]*/gi;
    const result = value.match(pattern);
    if (result) {
      setTextAreaIsValid(true);
    } else {
      setTextAreaIsValid(false);
    }
    setCount(event.target.value.length);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      review: value,
    }));
  };

  const formSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onModalCloseClick();

    if (formValues.image !== null && inputIsValid && textAreaIsValid) {
      //success
      props.bindFormData(formValues);
      props.onModalCloseClick();
      setFormValues(initialFormState);
    } else {
      //error
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        error: true,
      }));
      console.log("Error in form validation");
      props.bindFormData(formValues);
    }
  };

  const inputBlureHandler = () => {
    setIsInputEscaped(true);
  };
  const textAreaBlurHandler = () => {
    setIsTextAreaEscaped(true);
  };

  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.onModalCloseClick} />
      <div className={classes.Modal}>
        <div className={classes.Header}>
          <h4>Отзыв</h4>
          <div onClick={props.onModalCloseClick}>
            <CloseIcon />
          </div>
        </div>
        <form className={classes.Form}>
          <div className={classes["Name-group"]}>
            <div className={classes.Name} onBlur={inputBlureHandler}>
              <Input
                isError={!inputIsValid && isInputEscaped}
                elementType="input"
                labelText="Как вас зовут?"
                id="Name"
                placeholder="Имя Фамилия"
                value={formValues.name}
                changeHandler={(event) => inputChangeHandler(event)}
              />
            </div>
            <div className={classes.Load}>
              <Button
                type="button"
                buttonClassName="Button_Icon"
                onButtonClick={clickHandler}
              >
                Загрузить фото
              </Button>
              <input
                type="file"
                onChange={handleImageChange}
                id="load"
                hidden
              />
            </div>
          </div>
          {formValues.image && loading && (
            <ProgressBar
              error={fileError}
              completed={loadCompleted}
              progress={percent}
              filename={formValues.image?.name}
              onBinClick={binClickHandler}
            />
          )}
          <div
            className={classes["Textarea-container"]}
            onBlur={textAreaBlurHandler}
          >
            <Input
              isError={!textAreaIsValid && isTextAreaEscaped}
              elementType="textarea"
              height="105px"
              labelText="Все ли вам понравилось?"
              id="Review"
              placeholder="Напишите пару слов о вашем опыте..."
              value={formValues.review}
              changeHandler={(event) => textAreaChangeHandler(event)}
            />
            <div className={classes.Counter}>{count}/200</div>
          </div>

          <div className={classes.Send}>
            <div className={classes["Send-button-section"]}>
              <Button
                buttonClassName="Button"
                onButtonClick={(event) => formSubmitHandler(event)}
              >
                Отправить отзыв
              </Button>
            </div>
            <div className={classes.Notation}>
              <NoteIcon />
              <p>Все отзывы проходят модерацию в течение 2 часов</p>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default Modal;
