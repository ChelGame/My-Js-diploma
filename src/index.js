//

    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Provider } from 'react-redux';
    import { BrowserRouter } from 'react-router-dom';
    import store from './store/store';
    import RenderApp from './modules/App';
    import './css/normalize.css';
    import './css/index.css';

//

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <RenderApp />
            </Provider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
