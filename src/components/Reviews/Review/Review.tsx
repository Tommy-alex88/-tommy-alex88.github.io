import Profile from "../../Profile/Profile";

import classes from "./Review.module.css";

type Props = {
  name: string;
  surname: string;
  photo: string;
  date: Date;
  text: string;
  id: number;
  length: number;
};

export const Review: React.FC<Props> = (props) => {
  const prevId = props.id + 3;
  const nextId = props.id + 1;
  const prvId = prevId > props.length ? prevId - props.length : prevId;
  const nxtId = nextId > props.length ? nextId - props.length : nextId;
  return (
    <li
      className={classes["carousel__slide"]}
      id={`carousel__slide${props.id}`}
    >
      <div className={classes.Review}>
        <div className={classes.Header}>
          <Profile
            fontWeight={500}
            name={props.name}
            surname={props.surname}
            photo={props.photo}
          />
          <div className={classes.Date}>{props.date.toLocaleDateString()}</div>
        </div>
        <p className={classes.Text}>{props.text}</p>
      </div>
      <a
        href={`#carousel__slide${prvId}`}
        className={classes["carousel__prev"]}
      ></a>
      <a
        href={`#carousel__slide${nxtId}`}
        className={classes["carousel__next"]}
      ></a>
    </li>
  );
};
export default Review;
