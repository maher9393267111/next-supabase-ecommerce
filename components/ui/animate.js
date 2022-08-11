import React from 'react';
import animationData from "../../helper/success-animation.json"
import Lottie from "react-lottie"
const Animate = () => {
    return (
        <div>
              <div>
          <Lottie
            options={{ animationData: animationData, loop: false }}
            height="50px"
            width="50px"
          ></Lottie>
        </div>
        </div>
    );
}

export default Animate;
