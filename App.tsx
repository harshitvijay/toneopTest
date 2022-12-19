import React, {FC} from 'react';
import Navigation from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import {store} from './src/Redux/Store/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
