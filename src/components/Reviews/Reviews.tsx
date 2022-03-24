import Button from "../UI/Button/Button";
import Review from "./Review/Review";
import { ReactComponent as ArrowRight } from "../../assets/arrows/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "../../assets/arrows/arrow-left.svg";
import { ReviewType } from "../../dataTypes";
import classes from "./Reviews.module.css";
import { useState } from "react";

type Props = {
  onButtonClick: () => void;
  reviews: ReviewType[];
};

const Reviews: React.FC<Props> = (props) => {
  const [move, setMove] = useState<string>("");

  let currentClass = classes["carousel__viewport"];
  currentClass = move
    ? `${classes["carousel__viewport"]} ${move}`
    : classes["carousel__viewport"];

  const leftClickHandler = () => {
    setMove("Moveleft");
  };
  const rightClickHandler = () => {
    setMove("MoveRight");
  };
  return (
    <div className={classes.ReviewCard}>
      <div className={classes.Invite}>
        <h2>Отзывы</h2>
        <div className={classes["Button_section"]}>
          <Button
            mobileSize
            buttonClassName="Button_Icon"
            onButtonClick={props.onButtonClick}
          >
            Добавить отзыв
          </Button>
        </div>
      </div>
      <div className={classes.carousel}>
        <ul className={currentClass}>
          {props.reviews.map((review, index, array) => {
            return (
              <Review
                id={review.id}
                key={review.id}
                name={review.name}
                surname={review.surname}
                photo={review.photo}
                date={review.date}
                text={review.text}
                length={array.length}
              />
            );
          })}
        </ul>
        <aside className={classes["carousel__navigation"]}>
          <ol className={classes["carousel__navigation-list"]}>
            {props.reviews.map((review) => (
              <li
                key={review.id}
                className={classes["carousel__navigation-item"]}
              >
                <a
                  href={`#carousel__slide${review.id}`}
                  className={classes["carousel__navigation-button"]}
                ></a>
              </li>
            ))}
          </ol>
        </aside>
      </div>
      <div className={classes.Arrows}>
        <div className={classes.Left}>
          <ArrowLeft onClick={leftClickHandler} />
        </div>
        <div className={classes.Right}>
          <ArrowRight onClick={rightClickHandler} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
