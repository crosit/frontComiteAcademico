import React from "react";
import AppFooter from "./AppFooter";
import HeaderNav from "./HeaderNav";

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <HeaderNav />
      <div
        style={{
          padding: "0 2rem 0rem 2rem",
          height: "100%",
          minHeight: "80vh",
        }}
      >
        {children}
      </div>
      <div className="footer">
        <AppFooter />
      </div>
    </div>
  );
}

export default AppLayout;
