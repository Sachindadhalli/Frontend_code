// Polyfills
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from 'store/index';
import { showAlert } from 'actions/index';

import App from 'containers/App';
import Loader from 'components/Loader';
import Reload from 'components/Reload';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#e73a9e',
    }
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: `1px solid #e0e0e0`
        },
        "&:after": {
          borderBottom: `2px solid rgb(0, 0, 0)`
        }
      }
    },
    MuiInputLabel: {
      shrink: {
        transform: "translate(0, 1.5px) scale(1)",
        fontSize:'14px'
      }
    },
    MuiTooltip: {
      tooltip: {
          'max-width': '276px',
          'fontFamily': 'Roboto',
          'fontSize': '14px',
          'fontWeight': 'normal',
          'fontStyle': 'normal',
          'fontStretch': 'normal',
          'lineHeight': 'normal',
          'letterSpacing': 'normal',
          'textAlign': 'left',
          'color': '#757575',
          'backgroundColor': '#FFFFFF',
          'borderRadius': '3px',
          'boxShadow': `0 1px 2px 0 rgba(0, 0, 0, 0.1)`,
          'border': ` solid 1px #eaeaea`,
          'paddingTop': '8px',
          'paddingBottom': '8px',
          'paddingLeft': '7px',
          'paddingRight': '6px',
      }
  }
  }
});
export const app = {
  cssRetries: 0,
  fetchRetries: 0,

  run() {
    this.render(App);

    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'production') {
      this.initOfflinePlugin();
    }
  },
  initOfflinePlugin() {
    const OfflinePlugin = require('offline-plugin/runtime');

    /* istanbul ignore next */
    OfflinePlugin.install({
      onUpdateReady: () => {
        OfflinePlugin.applyUpdate();
      },
      onUpdated: () => {
        store.dispatch(showAlert(<Reload />, { id: 'sw-update', icon: 'bolt', timeout: 0 }));
      },
    });
  },
  render(Component) {
    const root = document.getElementById('react');

    /* istanbul ignore next */
    if (root) {
      ReactDOM.render(
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={<Loader size={100} block />} persistor={persistor}>
              <Component />
            </PersistGate>
          </Provider>
        </MuiThemeProvider>
        ,
        root,
      );
    }
  },
};

app.run();
