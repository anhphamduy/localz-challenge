import "antd/dist/antd.css";
import React from "react";
import "./App.css";
import AppRouter from "./routes";

const App = React.memo(() => {
  return <AppRouter />;
});

export default App;
