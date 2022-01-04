// Loading component
function Loading({isError}){
    return(
        <>
        {!isError && 
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row" style={{textAlign: "center", padding: "10%"}}>
                <i className="fa fa-spinner fa-pulse fa-5x"></i>
                <h1>Loading...</h1>
            </div>
        </div>}

        {isError &&
            <div className="container rounded bg-white mt-5 mb-5">
            <div className="row" style={{textAlign: "center", padding: "10%"}}>
                <i className="fa fa-exclamation-circle fa-5x"></i>
                <h1>Can not connect to server.</h1>
            </div>
        </div>}

        </>
    )
};

export default Loading;