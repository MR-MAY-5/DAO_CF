import React from 'react';
import { ReactDOM } from 'react-dom/client';
import { Form, BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebConfigProvider, ThirdwebProvider } from '@thirdweb-dev/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
        <Router>
            <App />
        </Router>
    </ThirdwebProvider>
)