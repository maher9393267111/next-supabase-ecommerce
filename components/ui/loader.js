import animationData from './loading-spinner.json'
import Lottie from 'react-lottie'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export const Loader = ({ height, width }) => <Lottie options={defaultOptions} height={height} width={width} />