import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ headerMail, signOut }) {
    return (
        <header className="header">
            <img src={logo} alt="логотип" className="logo" />

            <Route exact path="/">
                <div className="header__info">
                    <p className="header__mail">{headerMail}</p>
                    <Link to="/sign-in" className="header__out" onClick={signOut}>
                        Выйти
          </Link>
                </div>
            </Route>

            <Route path="/sign-in">
                <div className="header__sign-block">
                    <Link to="/sign-up" className="header__sign">
                        Регистрация
          </Link>
                </div>
            </Route>

            <Route path="/sign-up">
                <div className="header__sign-block">
                    <Link to="/sign-in" className="header__sign">
                        Войти
          </Link>
                </div>
            </Route>
        </header>
    );
}

export default Header;