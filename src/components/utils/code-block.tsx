import React from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
}) => {
  return (
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className="rounded-md p-4 overflow-auto max-h-[350px]"
          style={style}
        >
          {tokens.map((line, i) => {
            // Destructure key from lineProps to handle it separately
            const { key: lineKey, ...lineProps } = getLineProps({
              line,
              key: i,
            });
            return (
              <div key={i} {...lineProps}>
                {line.map((token, j) => {
                  // Destructure key from tokenProps to handle it separately
                  const { key: tokenKey, ...tokenProps } = getTokenProps({
                    token,
                    key: j,
                  });
                  return <span key={j} {...tokenProps} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};
