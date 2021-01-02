import { TextTree } from "./workflowyFetch";
import { H, Handler } from "mdast-util-to-hast";
import { Node } from "unist";
import u from "unist-builder";

const WRAPPER_CLASSES = "border border-gray-200 rounded-2 p-4 my-4";
const DETAILS_CLASSES = "mb-2 text-sm";
const SUMMARY_CLASSES = "";
const LIST_CLASSES = "ml-4";

export interface TextTreeNode extends Node {
  type: "textTree";
  textTree: TextTree;
}

const textTreeNodeHandler: Handler = (h: H, node: Node) => {
  const textTreeNode = node as TextTreeNode;
  return h(node, "div", { class: WRAPPER_CLASSES }, [textTreeToHast(textTreeNode.textTree)]);
};

function textTreeToHast(textTree: TextTree, depth = 0): Node {
  if (textTree.children.length === 0) {
    return u("raw", textTree.content);
  }
  return u(
    "element",
    { properties: { class: DETAILS_CLASSES, open: depth <= 1 }, tagName: "details" },
    [
      u("element", { properties: { class: SUMMARY_CLASSES }, tagName: "summary" }, [
        u("raw", textTree.content),
      ]),
      u(
        "element",
        { properties: { class: LIST_CLASSES }, tagName: "ul" },
        textTree.children.map((t) => textTreeToHast(t, depth + 1)).map((child) => u("li", child))
      ),
    ]
  );
}

export default textTreeNodeHandler;
