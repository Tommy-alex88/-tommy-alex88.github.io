import classes from "./UserCard.module.css";
import UserInfo from "./UserInfo/UserInfo";

type Props = {
  user: {
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
};

const UserCard: React.FC<Props> = (props) => {
  return (
    <div className={classes.UserCard}>
      <div className={classes.ImageContainer}>
        <img src={props.user.photo} alt="MyPhoto" />
      </div>
      <div className={classes.UserStory}>
        <UserInfo userData={props.user} />
      </div>
    </div>
  );
};
export default UserCard;
