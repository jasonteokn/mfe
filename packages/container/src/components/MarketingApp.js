import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory(); // Copy of browser history

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        // Marketing navigation passed back to container
        // Pathname is renamed
        console.log(nextPathname);
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          // Only when paths are different from container(pathname) and child(nextPathname) apps
          history.push(nextPathname); // Navigate to new path
        }
      },
    });

    history.listen(onParentNavigate); // Container navigatation passed to child
  }, []);

  return <div ref={ref} />;
};
