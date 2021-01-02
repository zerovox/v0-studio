import remark from "remark";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import directive from "remark-directive";
import customDirectives from "./remark-custom-directives";
import { Node } from "unist";
import { VFile } from "vfile";
import unified, { Processor } from "unified";
import textTreeNodeHandler from "./textTreeNode";

function identityNodeParser(node: Node) {
  return function (this: Processor<unknown>) {
    this.Parser = (_text: string, _file: VFile) => node;
  };
}

export default function markdownToHtml(markdown: string) {
  const footnoteHtmlByIdentifier: { [ident: string]: string } = {};

  const generateIdentifier = () => {
    for (const ident of ["*", "†", "‡", "§", "‖", "¶"]) {
      if (footnoteHtmlByIdentifier[ident] === undefined) {
        return ident;
      }
    }

    let ident = 1;
    while (footnoteHtmlByIdentifier[ident] !== undefined) {
      ident++;
    }
    return `${ident}`;
  };

  const createFootnote = async (blocks: Node[]) => {
    const identifier = generateIdentifier();
    footnoteHtmlByIdentifier[identifier] = "";
    for (const content of blocks) {
      // TODO: this could be mdast-util-to-hast + hast-stringify
      const block = await unified().use(identityNodeParser(content)).use(html).process("");
      footnoteHtmlByIdentifier[identifier] += block.toString();
    }
    return identifier;
  };

  return remark()
    .use(directive)
    .use(customDirectives, { createFootnote })
    .use(remark2rehype, {
      handlers: {
        textTree: textTreeNodeHandler,
      },
      allowDangerousHtml: true,
    })
    .use(html, { allowDangerousHtml: true })
    .process(markdown)
    .then((result) => ({ content: result.toString(), footnotes: footnoteHtmlByIdentifier }));
}
