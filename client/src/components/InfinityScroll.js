import { useSpring, animated, config, useSpringRef } from 'react-spring';
import { useState, useRef, useEffect } from 'react';

import ScrollButton from './ScrollButton';

export default function InfinityScroll({ children }) {
    const contentRef = useRef();
    const scrollRef = useSpringRef();
    const [width, setWidth] = useState(0);
    const offset = 800;

    const [{ scrollVal }, setSpring] = useSpring(() => ({
        from: { scrollVal: 0 },
        config: config.molasses,
    }));

    useEffect(() => {
        if (contentRef.current) {
            setWidth(contentRef.current.offsetWidth);
            setSpring.set({ scrollVal: contentRef.current.offsetwidth });
        }
    }, [contentRef, setSpring]);

    const scrollHandler = async (dir = false) => {
        let val = scrollVal.get();
        let computedScrollVal = (val % width) + width;
        await setSpring.set({ scrollVal: computedScrollVal });
        await setSpring.start({ scrollVal: dir ? computedScrollVal - offset : computedScrollVal + offset }
        );
    };

    return (
        <div className="row">
            <ScrollButton direction="left" onClick={scrollHandler.bind(null, true)} />
            <ScrollButton direction="right" onClick={scrollHandler.bind(null, false)} />
            <animated.div className="translate-row" ref={scrollRef} scrollLeft={scrollVal}>
                <div >{children}</div>
                <div ref={contentRef}>{children}</div>
                <div >{children}</div>
                
            </animated.div>
        </div>
    );
}