const Config: React.FC = () => {
  return (
    <div className="container text-center pt-3">
      {" "}
      <span className="text-center ">
        hello {localStorage.getItem("token")}
      </span>
    </div>
  );
};

export default Config;
