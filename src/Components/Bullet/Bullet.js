import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Bullet.css';

const Bullet = React.forwardRef((props, ref) => {
  const [bulletVisible, setBulletVisible] = useState(false);
  const [bulletPosition, setBulletPosition] = useState({ x: 0, y: 0 });
  const [bulletTarget, setBulletTarget] = useState({ x: 0, y: 0 });
  const bulletRef = useRef(null);

  // Expose shootBullet function through ref
  React.useImperativeHandle(ref, () => ({
    shootBullet: (startX, startY, targetX, targetY) => {
      const { x: endX, y: endY } = calculateEndPoint(startX, startY, targetX, targetY);
      setBulletPosition({ x: startX, y: startY });
      setBulletTarget({ x: endX, y: endY });
      setBulletVisible(true);
      // Printing Co ordinates where bulleted has been shooted
      console.log({ startX, startY, endX, endY });

      // Setting Bullet's Final Position Div To The endX and endY Coordinates
      if (bulletRef.current) {
        bulletRef.current.style.top = `${endY}%`;
        bulletRef.current.style.left = `${endX}%`;
      }
    }
  }));

  useEffect(() => {
    const moveBullet = () => {
      if (!bulletVisible || !bulletRef.current) return;

      gsap.to(bulletRef.current, {
        top: `${bulletTarget.y}%`,
        left: `${bulletTarget.x}%`,
        ease: "none",
        duration: 0.5,
        onComplete: () => {

          setBulletVisible(false);
        }
      });
    };

    moveBullet();

  }, [bulletVisible, bulletTarget]);

  const calculateEndPoint = (startX, startY, targetX, targetY) => {
    const dx = targetX - startX;
    const dy = targetY - startY;
    const slope = dy / dx;
    let endX, endY;

    if (Math.abs(slope) < 1) {
      if (dx > 0) {
        endX = 100;
        endY = startY + slope * (100 - startX);
      } else {
        endX = 0;
        endY = startY + slope * -startX;
      }
    } else {
      if (dy > 0) {
        endY = 100;
        endX = startX + (100 - startY) / slope;
      } else {
        endY = 0;
        endX = startX + -startY / slope;
      }
    }

    return { x: endX, y: endY };
  };

  return bulletVisible ? (
    <>
      <div ref={bulletRef} className="bullet" style={{ top: `${bulletPosition.y}%`, left: `${bulletPosition.x}%` }}></div>
    </>
  ) : null;
});

export default Bullet;

