import { useState } from "react";

import { user, reviews } from "./UserData";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Message from "./components/UI/Message/Message";
import Footer from "./components/Footer/Footer";
import Reviews from "./components/Reviews/Reviews";
import Modal from "./components/UI/Modal/Modal";
import UserCard from "./components/UserCard/UserCard";
import { FormData } from "./dataTypes";
import classes from "./App.module.css";

function App() {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [showMessage, setshowMessage] = useState<boolean>(false);

  const buttonClickHandler = () => {
    setIsModalOpened(true);
  };

  const closeModalClickHandler = () => {
    setIsModalOpened(false);
  };

  const messageClickHandler = () => {
    setshowMessage(false);
  };

  // get review form data from modal
  const modadFormCallback = (formData: FormData) => {
    setshowMessage(true);
    console.log(formData);
    if (formData.error) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className={classes.App}>
      {isModalOpened && (
        <Modal
          show={isModalOpened}
          onModalCloseClick={closeModalClickHandler}
          bindFormData={modadFormCallback}
        />
      )}
      <Toolbar name={user.name} surname={user.surname} photo={user.photo} />
      <main className={classes.Content}>
        <h1>Добро пожаловать в академию!</h1>
        <UserCard user={user} />
        <Reviews onButtonClick={buttonClickHandler} reviews={reviews} />
        {showMessage && <Message error={error} clicked={messageClickHandler} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
