import React from "react";
import { Outlet } from "react-router-dom";

const IdentityLayout: React.FC = () => {
  return (
    <>
      <>
        <div className="main w-100 d-flex justify-content-center">
          <main className="p-0 d-flex content">
            <div className="container d-flex flex-column">
              <div className="row h-100">
                <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table">
                  <div className="align-middle d-table-cell">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    </>
  );
};

export default IdentityLayout;
