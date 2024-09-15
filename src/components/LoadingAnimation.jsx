import React from "react";
import Lottie from "react-lottie";
import * as loading from "../Animation.json";

const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div style={{ marginTop: "1rem" }}>
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
};

export default LoadingAnimation;
