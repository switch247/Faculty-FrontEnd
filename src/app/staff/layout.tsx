import React from "react";
import StaffHeader from "@/components/header/StaffHeader";
const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <main>
      <StaffHeader />

        <br />

        {children}
      </main>
    </div>
  );
};

export default Layout;
