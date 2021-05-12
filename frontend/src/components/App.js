import React from 'react'
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as authApi from "../utils/authApi";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirm from './PopupWithConfirm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import successLogo from "../images/Success.svg";
import failLogo from "../images/Error.svg";


import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {

  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setProfilePopup] = React.useState(false)
  const [isAddPlacePopupOpen, setPlacePopup] = React.useState(false);
  const [isImagePopupOpen, setImagePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState([]);
  const [currentUser, setСurrentUser] = React.useState({ name: '', about: '', avatar: '' });
  const [cards, setCards] = React.useState([]);

  const history = useHistory();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState("");
  const [dataInfoTool, setDataInfoTool] = React.useState({
    title: "",
    icon: "",
  });

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ]).then(([userInfo, cards]) => {
      setСurrentUser(userInfo);
      setCards(cards);
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDeleteSubmit() {
    api.deletePlaceCard(cardDelete._id).then(() => {
      const newCards = cards.filter((c) => c._id !== cardDelete._id);
      setCards(newCards);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    api.editUserInfo(userData).then((res) => {
      setСurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    console.log(userData);
    api.editAvatar(userData.avatar).then((res) => {
      setСurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api.addPlaceCard(card).then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setAvatarPopup(true);
  }

  function handleEditProfileClick() {
    setProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setPlacePopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(true);
    setImagePopup(card);
  }

  function handleConfirmPopupClick() {
    setIsConfirmPopupOpen(true);
  }

  function handleCardDelete(card) {
    setCardDelete(card)
    handleConfirmPopupClick();
  }

  function closeAllPopups() {
    setAvatarPopup(false);
    setProfilePopup(false);
    setPlacePopup(false);
    setSelectedCard(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function signOut() {
    setLoggedIn(false);
    setUserData("");
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  function handleLogin(email, password) {
    console.log(email, password);
    authApi
      .authorize(email, password)
      .then((data) => {
        authApi
          .getContent(data.token)
          .then((res) => {
            setUserData(res.data.email);
          })
          .catch((err) => {
            setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
            console.error(err);
            handleInfoTooltipOpen();
          });

        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
        console.error(err);
        handleInfoTooltipOpen();
      });
  }

  function handleRegister(email, password) {
    authApi
      .register(email, password)
      .then((data) => {
        history.push("/sign-in");
        console.log(data);
        setDataInfoTool({ title: "Вы успешно зарегистрировались!", icon: successLogo });
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        console.error(err);
        setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
        handleInfoTooltipOpen();
      });
  }

  // function tokenCheck() {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     authApi
  //       .getContent(token)
  //       .then((res) => {
  //         if (res) {
  //           setLoggedIn(true);
  //           setUserData(res.data.email);
  //           history.push("/");
  //         } else {
  //           setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
  //           handleInfoTooltipOpen();
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }

  React.useEffect(() => {
    const tokenCheck = () => {
      const token = localStorage.getItem("token");
      if (token) {
        authApi
          .getContent(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setUserData(res.data.email);
              history.push("/");
            } else {
              setDataInfoTool({ title: "Что-то пошло не так! Попробуйте ещё раз.", icon: failLogo });
              handleInfoTooltipOpen();
            }
          })
          .catch((err) => console.log(err));
      }
    };
    tokenCheck();
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          <Header headerMail={userData} signOut={signOut} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>

            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>

            <Route path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          {loggedIn && <Footer />}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithConfirm
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDeleteSubmit}
          />

          <ImagePopup
            isOpen={selectedCard}
            card={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            title={dataInfoTool.title}
            icon={dataInfoTool.icon}
          />

        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;