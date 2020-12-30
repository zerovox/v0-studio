import markdownStyles from "./markdown-styles.module.css";
import Footnote from "./footnote";
import { useEffect, useState } from "react";

type Props = {
  content: string;
  footnotes: {
    [identifier: string]: string;
  };
};

const PostBody = ({ content, footnotes }: Props) => {
  const [selectedIdentifier, setSelectedIdentifier] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      const identifierIndex = location.hash.indexOf("#fn-");
      setSelectedIdentifier(
        identifierIndex === -1 ? "" : decodeURIComponent(location.hash.slice(identifierIndex + 4))
      );
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  });

  return (
    <>
      <div className="flex">
        <div className="max-w-3xl mr-8" id="fn-container">
          <div
            className={markdownStyles["markdown"]}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="w-2/4 relative">
          {Object.keys(footnotes).map((identifier) => (
            <Footnote
              content={footnotes[identifier]}
              key={identifier}
              identifier={identifier}
              selected={identifier === selectedIdentifier}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PostBody;
