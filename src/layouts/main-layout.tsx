import React, { useState } from "react";
import Logo from "@assets/images/logo-sidebar.png";
import Config from "../pages/Config";
const MainLayout: React.FC = () => {
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  return (
    <div
      className="wrapper"
      style={{ minHeight: "100vh", overflowX: "hidden" }}
    >
      <nav className={`sidebar ${collapseSidebar ? "collapsed" : ""} `}>
        <div className="sidebar-content" style={{ height: "100vh" }}>
          <a className="sidebar-brand  d-flex mb-0 flex-column align-items-center pt-0">
            <img src={Logo} style={{ height: "50px", marginTop: "30px" }} />
            <p className="mt-2">پنل مدیریت</p>
          </a>
          <ul className="sidebar-nav pe-0">
            <li className="sidebar-header fw-bolder fs-lg">مدیریت فروشگاه</li>
            <li className="sidebar-item">
              <a className="sidebar-link">
                <span className="align-middle me-2">اطلاعات فروشگاه</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link">
                <span className="align-middle me-2">لیست محصولات</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="main">
        <nav className="navbar">
          <a
            className="sidebar-toggle"
            onClick={() => setCollapseSidebar(!collapseSidebar)}
          >
            <i className="hamburger align-self-center"></i>
          </a>
        </nav>
        <main className="content">
          <Config />
        </main>
        <div className="footer"></div>
      </div>

      {/* <Outlet /> */}
    </div>
  );
};

export default MainLayout;
