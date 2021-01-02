import remark from "remark";
import html from "remark-html";
import directive from "remark-directive";
import customDirectives from "./remark-custom-directives";
import { Node } from "unist";
import { VFile } from "vfile";
import unified, { Processor } from "unified";

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
      const block = await unified().use(identityNodeParser(content)).use(html).process("");
      footnoteHtmlByIdentifier[identifier] += block.toString();
    }
    return identifier;
  };

  return remark()
    .use(directive)
    .use(customDirectives, { createFootnote })
    .use(html)
    .process(markdown)
    .then((result) => ({ content: result.toString(), footnotes: footnoteHtmlByIdentifier }));
}
