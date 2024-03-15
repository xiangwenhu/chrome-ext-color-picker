import '@pages/popup/Popup.css';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import withSuspense from '@src/shared/hoc/withSuspense';
import { useState } from 'react';

const Popup = () => {
  const [backgroundColor, setBackgroundColor] = useState('');

  const onToPickColor = () => {
    if (!('EyeDropper' in window)) {
      alert("你的浏览器不支持 EyeDropper API");
      return;
    }
    // @ts-ignore
    const eyeDropper = new EyeDropper();
    const abortController = new AbortController();

    eyeDropper
      .open({ signal: abortController.signal })
      .then((result) => {
        setBackgroundColor(result.sRGBHex);
      })
      .catch((err: Error) => {
        alert(`发生错误：${err && err.message || '未知错误'}`)
      });
  }

  return (
    <div className='App'>
      <button className="start-button" onClick={onToPickColor}>打开拾色器</button>
      <div>
        颜色是：<span id="result">{backgroundColor}</span>
      </div>
      <div className='color-rect' style={{
        backgroundColor
      }}></div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
