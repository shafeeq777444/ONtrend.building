import { useInView } from "react-intersection-observer";

const LazyRenderOnView = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,       // render only once
        rootMargin: "200px",     // start loading a bit before it’s visible
    });

    return <div ref={ref}>{inView ? children : null}</div>;
};
export default LazyRenderOnView;