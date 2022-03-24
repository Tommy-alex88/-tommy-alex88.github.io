import { ReactComponent as DogFoodIcon } from "../../../assets/icons/dogfood.svg";
import { ReactComponent as MaleGenderIcon } from "../../../assets/icons/malegender.svg";
import classes from "./UserInfo.module.css";

type UserData = {
  name: string;
  surname: string;
  photo: string;
  birthDate: Date;
  city: string;
  gender: string;
  age: number;
  about: string;
  pets: boolean;
};

type Props = {
  userData: UserData;
};

const UserInfo: React.FC<Props> = (props) => {
  return (
    <div className={classes.Card}>
      <div className={classes.Nameline}>
        <h3>
          {props.userData.name} {props.userData.surname}
        </h3>
        <p>{props.userData.birthDate.toLocaleDateString()}</p>
      </div>
      <p>
        <span>Город:</span> {props.userData.city}
      </p>
      <div className={classes.Gender}>
        <p>
          <span>Пол:</span> {props.userData.gender}
        </p>
        <MaleGenderIcon />
      </div>
      <p>
        <span>Возраст:</span> {props.userData.age}
      </p>
      <p className={classes.About}>
        <span>О себе:</span> {props.userData.about}
      </p>
      <div className={classes.Pets}>
        <DogFoodIcon />
        <p>
          <span>Домашние животные:</span>{" "}
          {props.userData.pets ? "есть" : "нет животных"}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
