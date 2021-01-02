import visit from "./unist-util-visit-async";
import { Transformer } from "unified";
import { Node, Parent } from "unist";
import { html, paragraph } from "mdast-builder";
import fetchWorkflowyTree, { TextTree } from "./workflowyFetch";
import extract from "./extract";

export interface TextTreeNode extends Node {
  textTree: TextTree;
}

export default function (settings: {
  createFootnote: (content: Node[]) => Promise<string>;
}): Transformer {
  return async function transformer(tree): Promise<void> {
    await visit(
      tree,
      ["textDirective", "leafDirective", "containerDirective"],
      async (node, index, parent) => {
        parent?.children.splice(index, 1, await replacement(node, settings.createFootnote));
        // Skip old nodes children, re-process current index which is a new node now.
        return [visit.CONTINUE, index];
      }
    );
  };
}

const shareExtractor = extract`https://workflowy.com/s/${"shareName"}/${"shareId"}`;

async function replacement(
  node: Node,
  createFootnote: (content: Node[]) => Promise<string>
): Promise<Node> {
  const defaultResponse = paragraph((node as Parent).children);
  switch (node.name) {
    case "workflowy":
      try {
        const url = (node.attributes as any)?.["url"];
        if (typeof url !== "string") {
          throw new Error("Could not get workflowy URL");
        }
        const { shareId } = shareExtractor(url);
        const textTree = await fetchWorkflowyTree(shareId);
        return {
          type: "textTree",
          position: node.position,
          textTree,
        };
      } catch (e) {
        console.error("Failed to replace workflowy directive ", e);
        return defaultResponse;
      }
    case "note":
      try {
        const id = await createFootnote((node as Parent).children);
        // TODO: we can customize the fnref and fn sring now
        return html(`<sup id="fnref-${id}"><a href="#fn-${id}">${id}</a></sup>`);
      } catch (e) {
        console.error("Failed to replace note directive ", e);
        return defaultResponse;
      }
    default:
      console.error("Unknown directive name: " + node.name);
      return defaultResponse;
  }
}
