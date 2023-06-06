/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { StoreProvider } from 'easy-peasy';
import { store } from "./src/store/easy-peasy";


const StoreConfig = () => (
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
);

AppRegistry.registerComponent(appName, () => StoreConfig);
