import iLinkLogo from "../../assets/logo.svg";
import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={iLinkLogo} alt="iLink" />
    </div>
  );
};

export default Logo;
