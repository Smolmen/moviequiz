import React from 'react';
import ReactDOM from 'react-dom';
import './sass/style.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App questions={10} moviedb_key="c2bfe07cf971b3e7519d8af96e206990" giphy_key="btqS4we1WkGYmdpxRsJzJVnHaLDk6g5D"/>, document.getElementById('root'));
registerServiceWorker();
