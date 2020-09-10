import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CanvasWrapper from "./components/Canvas/CanvasWrapper";
import { store, persistor } from "./store";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CanvasWrapper />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
