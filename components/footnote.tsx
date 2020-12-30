import markdownStyles from "./markdown-styles.module.css";
import { useEffect, useState } from "react";
import classNames from "classnames";

type Props = {
  identifier: string;
  content: string;
  selected: boolean;
};

const Footnote = ({ content, identifier, selected }: Props) => {
  const [{ positioned, offsetTop }, setState] = useState({
    positioned: false,
    offsetTop: 0,
  });

  useEffect(() => {
    const reference = document.getElementById("fnref-" + identifier);
    const footnoteContainer = document.getElementById("fn-container");
    if (reference == null || footnoteContainer == null) {
      console.log("not found", reference, footnoteContainer);
      return;
    }

    const newOffsetTop = reference.offsetTop - footnoteContainer.offsetTop;
    if (!positioned || offsetTop !== newOffsetTop) {
      setState({
        positioned: true,
        offsetTop: newOffsetTop,
      });
    }
  });

  return (
    <div
      className={classNames("absolute", "italic", markdownStyles["markdown"], {
        hidden: !positioned || !selected,
      })}
      style={{ top: offsetTop }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Footnote;
