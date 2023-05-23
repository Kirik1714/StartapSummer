import Lottie from  'lottie-react'

import loadingAnimation from '../../loader.json'

import style from './loader.module.scss'

export const Loader = () => {
  const defaultOptions={
    loop:true,
    autoplay:true,

    
  }

  return (
    <div className={style.lottie} data-test-id='loader'>
      <Lottie options={defaultOptions} animationData={loadingAnimation} width={64}  height={64}/>
    </div>
  );
}
