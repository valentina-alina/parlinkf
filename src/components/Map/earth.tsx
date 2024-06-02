import { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

const Earth: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const app = new Application(canvasRef.current);
            app.load('https://prod.spline.design/gJD4RMY8A5P1Q0lY/scene.splinecode');
        }
    }, []);

    return <canvas id="canvas3d" ref={canvasRef} className="w-full h-96"></canvas>;
};

export default Earth;