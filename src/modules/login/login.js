//

    import React from 'react';
    import logo from '../../css/img/logo.png';
    import {redirect} from '../../func/functions';

//

function Auth() {
    return (
        <section className="auth">
            <div className="auth_wrap">
                <div className="auth_head">
                    <a href="/">
                        <img src={logo} alt="imageWatcher" />
                    </a>
                </div>

                <div className="auth_content">
                    <h1>Добро пожаловать на imageWatcher, бесплатный сервис для удобного просмотра фотографий с сайта Unsplash</h1>
                </div>

                <div className="auth_but">
                    <a href="/" onClick={
                        (e) => {
                            e.preventDefault();
                            redirect();
                        }
                    }>Авторизоваться</a>
                </div>
            </div>
        </section>
    );
}

export default Auth;
