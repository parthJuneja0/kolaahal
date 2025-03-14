"use client";
import dynamic from 'next/dynamic';


const SplineClient = dynamic(() => import('./SplineClient'), { ssr: false });
<SplineClient scene="https://prod.spline.design/actual-scene-url/scene.splinecode" />

export default function ThreeDComponent({ sceneUrl }) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <SplineClient scene={sceneUrl} />
    </div>
  );
}
