import { ReactComponent as TweeterSVG } from "../../assets/icons/social/twitter.svg";
import { ReactComponent as BabySVG } from "../../assets/icons/social/baby.svg";
import { ReactComponent as TelegramSVG } from "../../assets/icons/social/telegram.svg";
import classes from "./Footer.module.css";

const Footer: React.FC = () => {
  const links = [
    { id: 1, path: "#", icon: <TweeterSVG /> },
    { id: 2, path: "#", icon: <BabySVG /> },
    { id: 3, path: "#", icon: <TelegramSVG /> },
  ];

  return (
    <footer className={classes.Footer}>
      <div className={classes.CopyRight}>
        © iLINK ACADEMY. ALL RIGHTS RESERVED. 2022
      </div>
      <nav>
        <ul className="links">
          {links.map((link) => {
            return (
              <li key={link.id}>
                <a href={link.path}>{link.icon}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
