import fileIcon from "../../../assets/icons/fileIcon.svg";
import { ReactComponent as TrashBin } from "../../../assets/icons/trashbin.svg";
import Spinner from "../Spinner/Spinner";
import classes from "./ProgressBar.module.css";

type Props = {
  filename?: string;
  completed: boolean;
  progress: number;
  error: boolean;
  onBinClick: () => void;
};

const ProgressBar: React.FC<Props> = (props) => {
  const completWidth = 168;

  let widthValue = 0;

  if (!props.completed) {
    widthValue = Math.round((props.progress / 100) * completWidth);
  } else {
    widthValue = completWidth;
  }

  const currentClass = props.error
    ? classes.Loading + " " + classes.Error
    : classes.Loading;

  const text = props.error ? "Your file is too big!" : props.filename;

  return (
    <div className={classes.Container}>
      <img className={classes.File} src={fileIcon} alt="File" />
      <div className={currentClass}>
        <p>{text}</p>
        <div className={classes.Progress}>
          <div
            className={classes.Value}
            style={{ width: widthValue + "px" }}
          ></div>
        </div>
      </div>
      {props.completed ? (
        <div className={classes["Spinner-container"]}>
          <TrashBin onClick={props.onBinClick} className={classes.Trashbin} />
        </div>
      ) : (
        <div className={classes["Spinner-container"]}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default ProgressBar;
