"use client";
import StyledComponentsRegistry from "./AntdRegistry";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
