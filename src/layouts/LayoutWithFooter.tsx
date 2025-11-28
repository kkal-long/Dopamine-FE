import { Outlet } from "react-router-dom";

import Footer from "@/components/common/Footer";

const LayoutWithFooter = () => {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutWithFooter;
