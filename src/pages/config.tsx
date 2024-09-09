import { useState } from "react";
import { getSystemInfo } from "../core/http-service";

const Courses: React.FC = () => {
  const [slogan, setSlogan] = useState();
  const [siteId, setSiteId] = useState();
  const [plan, setPlan] = useState();
  const [api, setApi] = useState();
  getSystemInfo().then((data) => {
    if (data.successful) {
      setSlogan(data.slogan);
      setSiteId(data.id);
      setPlan(data.plan);
      setApi(data.api_version);
    } else {
      console.error("API request unsuccessful");
    }
  });
  return (
    <div className="container text-center pt-3">
      {" "}
      <span className="text">اطلاعات سرویس شما</span>
      <br />
      <div className="slogan-box">
        <span>شعار سایت : {slogan}</span>
      </div>
      <div className="site-Id">
        <span>آیدی سایت : {siteId}</span>
      </div>
      <div className="site-plan">
        <span>پلن سایت : {plan}</span>
      </div>
      <div className="site-Id">
        <span>{api} : api version </span>
      </div>
    </div>
  );
};

export default Courses;
