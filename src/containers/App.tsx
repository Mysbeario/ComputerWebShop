import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import Loading from "./Loading";
import { ThemeProvider } from "@material-ui/styles";
import Routes from "./Routes";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#212121",
    },
    primary: {
      main: "#ba000d",
    },
  },
});

const App = (): JSX.Element => {
  return (
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <ThemeProvider theme={theme}>
          <CssBaseLine />
          <Routes />
        </ThemeProvider>
      </Suspense>
    </RecoilRoot>
  );
};

export default App;
