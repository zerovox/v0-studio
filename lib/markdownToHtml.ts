import remark from "remark";
import html from "remark-html";
import footnotes from "remark-footnotes";
import extractFootnotes from "./remark-extract-footnotes";
import { Node } from "unist";
import { VFile } from "vfile";
import unified, { Processor } from "unified";

function identityNodeParser(this: Processor<{}>, settings: { content: Node }) {
  this.Parser = (_text: string, _file: VFile) => settings.content;
}

export default async function markdownToHtml(markdown: string) {
  const footnoteHtmlByIdentifier: { [ident: string]: string } = {};

  const generateIdentifier = () => {
    for (const ident of ["*", "†", "‡", "§", "‖", "¶"]) {
      if (footnoteHtmlByIdentifier[ident] === undefined) {
        return ident;
      }
    }

    let ident = 1;
    while (footnoteHtmlByIdentifier[ident] === undefined) {
      ident++;
    }
    return `${ident}`;
  };

  const footnoteCallback = (identifier: string, blocks: Node[]) => {
    for (const content of blocks) {
      const block = unified().use(identityNodeParser, { content }).use(html).processSync("");

      footnoteHtmlByIdentifier[identifier] = footnoteHtmlByIdentifier[identifier] ?? "";
      footnoteHtmlByIdentifier[identifier] += block.toString();
    }
  };

  const result = await remark()
    .use(footnotes, { inlineNotes: true })
    .use(extractFootnotes, { footnoteCallback, generateIdentifier })
    .use(html)
    .process(markdown);

  return result.toString();
}
