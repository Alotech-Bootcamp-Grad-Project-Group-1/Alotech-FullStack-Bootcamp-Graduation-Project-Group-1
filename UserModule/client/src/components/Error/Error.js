// Error component
function Error({ message }) {
  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row" style={{ textAlign: "center", padding: "10%" }}>
          <i className="fa fa-exclamation-circle fa-5x"></i>
          <h1>{message}</h1>
        </div>
      </div>
    </>
  );
}

export default Error;
