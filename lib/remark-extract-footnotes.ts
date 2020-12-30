import visit from "unist-util-visit";
import { Transformer } from "unified";
import { Node } from "unist";
import { Footnote, FootnoteDefinition, FootnoteReference } from "mdast";

export default function (settings: {
  generateIdentifier: () => string;
  footnoteCallback: (identifier: string, content: Node[]) => void;
}): Transformer {
  return function transformer(tree, file): void {
    visit<FootnoteDefinition>(tree, "footnoteDefinition", (node, index, parent) => {
      settings.footnoteCallback(node.identifier, node.children);
      parent?.children.splice(index, 1);
      return [visit.SKIP, index];
    });

    visit<Footnote>(tree, "footnote", (node, index, parent) => {
      const identifier = settings.generateIdentifier();
      settings.footnoteCallback(identifier, node.children as Node[]);
      parent?.children.splice(index, 1, {
        type: "footnoteReference",
        identifier,
        label: identifier,
        position: node.position,
      });
      return [visit.SKIP, index];
    });

    visit<FootnoteReference>(tree, "footnoteReference", (node) => {
      // TODO: anything useful to do here?
      // console.log(node);
    });
  };
}
