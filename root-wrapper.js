import React from "react";
import { MDXProvider } from "@mdx-js/tag";

const components = {
  code: ({ exec, ...props }) => {
    // props.children is MDX code from a code block
    // in this case we're choosing to not execute arbitrary code when server-rendering
    if (exec && process.env.GATSBY_BUILD_STAGE !== "build-html") {
      const arbitraryCode = new Function(props.children);
      arbitraryCode();
    }
    return <code {...props} />;
  }
};

export default ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);
