import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const M = motion;
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 50, stiffness: 300, mass: 0.1 };
    const springTrail = { damping: 30, stiffness: 150, mass: 0.8 };

    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const trailXSpring = useSpring(cursorX, springTrail);
    const trailYSpring = useSpring(cursorY, springTrail);

    const handleHoverStart = useCallback(() => setIsHovered(true), []);
    const handleHoverEnd = useCallback(() => setIsHovered(false), []);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        const attachListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, .interactive, input, textarea');
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
        };

        attachListeners();

        // Observer to handle dynamic content
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
            const interactiveElements = document.querySelectorAll('a, button, .interactive, input, textarea');
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverStart);
                el.removeEventListener('mouseleave', handleHoverEnd);
            });
        };
    }, [cursorX, cursorY, handleHoverStart, handleHoverEnd]);

    return (
        <>
            {/* Primary Pointer */}
            <M.div
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            {/* Secondary Trail / Ring */}
            <M.div
                className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: trailXSpring,
                    y: trailYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovered ? 2.5 : 1,
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
                    borderColor: isHovered ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                }}
                transition={{ duration: 0.3 }}
            />
            {/* Background Ambient Glow */}
            <M.div
                className="cursor-glow"
                style={{
                    x: trailXSpring,
                    y: trailYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 0.8 : 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
