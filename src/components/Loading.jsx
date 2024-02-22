import React from "react";
import { DNA } from "react-loader-spinner";
<DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>;

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-zinc-900 bg-opacity-70 backdrop-filter backdrop-blur-sm z-50">
      <DNA />
    </div>
  );
};

export default Loading;
