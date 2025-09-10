'use client'

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`rounded-xl border border-white bg-gradient-to-r from-[#0f172a] to-[#334155] [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0, isMobile: false, isTablet: false });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
      });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Responsive dimensions and spacing
  const responsiveConfig = useMemo(() => {
    const { isMobile, isTablet, width: screenWidth } = screenSize;
    
    if (isMobile) {
      return {
        width: Math.min(screenWidth * 0.9, 350),
        height: Math.min(screenWidth * 0.8, 280),
        cardDistance: 30,
        verticalDistance: 35,
        skew: 3,
        perspective: 600,
        translateX: '0%',
        translateY: '0%',
        containerClass: 'relative w-full flex justify-center'
      };
    } else if (isTablet) {
      return {
        width: Math.min(screenWidth * 0.6, 420),
        height: Math.min(screenWidth * 0.5, 320),
        cardDistance: 45,
        verticalDistance: 55,
        skew: 4,
        perspective: 750,
        translateX: '3%',
        translateY: '15%',
        containerClass: 'absolute bottom-0 right-0 transform origin-bottom-right'
      };
    } else {
      return {
        width: typeof width === 'number' ? width : 500,
        height: typeof height === 'number' ? height : 400,
        cardDistance,
        verticalDistance,
        skew: skewAmount,
        perspective: 900,
        translateX: '5%',
        translateY: '20%',
        containerClass: 'absolute bottom-0 right-0 transform origin-bottom-right'
      };
    }
  }, [screenSize, width, height, cardDistance, verticalDistance, skewAmount]);

  const config = useMemo(() => 
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: screenSize.isMobile ? 1.5 : 2,
          durMove: screenSize.isMobile ? 1.5 : 2,
          durReturn: screenSize.isMobile ? 1.5 : 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: screenSize.isMobile ? 0.6 : 0.8,
          durMove: screenSize.isMobile ? 0.6 : 0.8,
          durReturn: screenSize.isMobile ? 0.6 : 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        }
  , [easing, screenSize.isMobile]);

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() =>
    childArr.map(() => React.createRef<HTMLDivElement>() as CardRef),
    [childArr.length]
  );

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);

  // Mobile carousel auto-advance
  useEffect(() => {
    if (!screenSize.isMobile || childArr.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % childArr.length);
    }, delay);

    return () => clearInterval(interval);
  }, [screenSize.isMobile, childArr.length, delay]);

  // 3D animation for tablet/desktop
  useEffect(() => {
    if (screenSize.isMobile) return;

    const total = refs.length;
    if (!total) return;

    const { cardDistance: dist, verticalDistance: vDist, skew } = responsiveConfig;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, dist, vDist, total), skew);
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front]?.current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      // Drop animation
      tl.to(elFront, {
        y: '+=150',
        duration: config.durDrop,
        ease: config.ease
      });

      // Promote other cards
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx]?.current;
        if (!el) return;
        
        const slot = makeSlot(i, dist, vDist, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.1}`
        );
      });

      // Return front card to back
      const backSlot = makeSlot(refs.length - 1, dist, vDist, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    // Initial swap and interval
    swap();
    intervalRef.current = window.setInterval(swap, delay);

    // Pause on hover for tablet/desktop
    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [refs ,screenSize, responsiveConfig, config, delay, pauseOnHover]);

  // Mobile rendering with carousel
  if (screenSize.isMobile) {
    return (
      <div className="w-full px-4 sm:px-6">
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {childArr.map((child, i) =>
              isValidElement<CardProps>(child)
                ? cloneElement(child, {
                    key: i,
                    className: `w-full flex-shrink-0 p-4 mx-2 ${child.props.className || ''}`,
                    style: { 
                      width: responsiveConfig.width, 
                      height: responsiveConfig.height,
                      ...(child.props.style ?? {})
                    },
                    onClick: e => {
                      child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
                      onCardClick?.(i);
                    }
                  } as CardProps)
                : child
            )}
          </div>
          
          {/* Mobile indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {childArr.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-[#A91D3A]' : 'bg-white/30'
                }`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tablet/Desktop 3D rendering
  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          className: `absolute top-1/2 left-1/2 cursor-pointer hover:scale-105 transition-transform duration-300 ${child.props.className || ''}`,
          style: { 
            width: responsiveConfig.width, 
            height: responsiveConfig.height,
            ...(child.props.style ?? {})
          },
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className={`${responsiveConfig.containerClass} overflow-visible`}
      style={{ 
        width: responsiveConfig.width, 
        height: responsiveConfig.height,
        perspective: `${responsiveConfig.perspective}px`,
        transform: screenSize.isMobile ? 
          'none' : 
          `translate(${responsiveConfig.translateX}, ${responsiveConfig.translateY})`
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;