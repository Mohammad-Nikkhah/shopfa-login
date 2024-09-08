import React, { useState } from "react";
import Logo from "@assets/images/logo-sidebar.png";
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
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                  />
                </svg>
                <span className="align-middle me-2">اطلاعات فروشگاه</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"
                  />
                </svg>
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
        <main className="content"></main>
        <div className="footer"></div>
      </div>

      {/* <Outlet /> */}
    </div>
  );
};

export default MainLayout;
