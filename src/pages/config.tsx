import { useState, useEffect } from "react";
import { getSystemInfo } from "../core/http-service";

const Courses: React.FC = () => {
  const [slogan, setSlogan] = useState();
  const [siteId, setSiteId] = useState();
  const [plan, setPlan] = useState();
  const [api, setApi] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("systemInfo");
        if (cachedData) {
          const data = JSON.parse(cachedData);
          setSlogan(data.slogan);
          setSiteId(data.id);
          setPlan(data.plan);
          setApi(data.api_version);
        } else {
          const data = await getSystemInfo();
          if (data.successful) {
            setSlogan(data.slogan);
            setSiteId(data.id);
            setPlan(data.plan);
            setApi(data.api_version);
            localStorage.setItem("systemInfo", JSON.stringify(data));
          } else {
            console.error("API request unsuccessful");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
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
