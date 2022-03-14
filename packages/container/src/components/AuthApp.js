import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory(); // Copy of browser history

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => { // Pathname is renamed
        const { pathname } = history.location

        if (pathname !== nextPathname) { // Only when paths are different from container and child apps
          history.push(nextPathname); // Navigate to new path
        }
      },
      onSignIn
    });

    history.listen(onParentNavigate)
  }, []);

  return <div ref={ref} />;
};
