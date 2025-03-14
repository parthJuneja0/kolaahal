// components/ThreeDComponent.jsx
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function ThreeDComponent({ sceneUrl }) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Spline scene={sceneUrl} />
    </div>
  );
}
