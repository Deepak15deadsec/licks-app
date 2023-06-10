/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {StoreProvider} from 'easy-peasy';
import {store} from './src/store/easy-peasy';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './src/react-query';

const StoreConfig = () => (
  <StoreProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StoreProvider>
);

AppRegistry.registerComponent(appName, () => StoreConfig);
