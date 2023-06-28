import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./features/user";
import Root from "./Root";


const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
