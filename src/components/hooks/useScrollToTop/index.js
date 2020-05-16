import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const useScrollToTop = () => {
    const [showNavigationItems, setShowNavigationItems] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
            setShowNavigationItems(false);
        });
        return () => {
            unlisten();
        };
    }, [history]);

    return [showNavigationItems, setShowNavigationItems];
};

export default useScrollToTop;
