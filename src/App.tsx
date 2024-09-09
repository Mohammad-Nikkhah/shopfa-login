import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect, useState } from "react";
import { getSystemInfo } from "./core/http-service";

function App() {
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    getSystemInfo().then((data) => {
      if (data.successful) {
        setTitle(data.title);
        document.title = data.title;
      } else {
        console.error("error api request!");
      }
    });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
