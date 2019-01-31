import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { PageLayout } from "../layouts";
import Pies from "./Pies";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <PageLayout>
        <Route exact path="/" component={Pies} />
      </PageLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
