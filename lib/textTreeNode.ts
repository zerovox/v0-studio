import { TextTree } from "./workflowyFetch";
import { H, Handler } from "mdast-util-to-hast";
import { Node } from "unist";
import u from "unist-builder";
import getUrls from "get-urls";

const WRAPPER_CLASSES = "border border-gray-200 rounded-2 p-4 my-4";
const DETAILS_CLASSES = "mb-2 text-sm";
const SUMMARY_CLASSES = "";
const LIST_CLASSES = "ml-4";
const LEAF_LIST_ITEM_CLASSES = "list-disc";

export interface TextTreeNode extends Node {
  type: "textTree";
  textTree: TextTree;
  collapseDepth?: number;
  rand?: boolean;
}

const textTreeNodeHandler: Handler = (h: H, node: Node) => {
  const textTreeNode = node as TextTreeNode;
  return h(node, "div", { class: WRAPPER_CLASSES }, [
    textTreeToHast(
      textTreeNode.textTree,
      0,
      textTreeNode.collapseDepth ?? 2,
      textTreeNode.rand ?? false
    ),
  ]);
};

function collectAllLinks(children: TextTree[]) {
  const allLinks: string[] = [];
  for (const child of children) {
    // N.B, child.content might be a url, some text, or workflowy might have converted a ULR to an a-tag
    for (const link of getUrls(child.content)) {
      // N.B, strip </a> from found URL
      allLinks.push(link.replace("%3C/a%3E", ""));
    }
  }
  return allLinks;
}

function textTreeToHast(
  textTree: TextTree,
  depth: number,
  collapseDepth: number,
  rand: boolean
): Node {
  if (textTree.children.length === 0) {
    return u("element", { tagName: "div" }, [u("raw", textTree.content)]);
  }
  const summaryChildren: Node[] = [u("raw", textTree.content)];
  if (rand) {
    const allLinks = collectAllLinks(textTree.children);
    if (allLinks.length > 0) {
      const randIdx = Math.floor(Math.random() * allLinks.length);
      summaryChildren.push(
        u("element", { tagName: "span" }, [
          u("raw", "&nbsp;"),
          u(
            "element",
            {
              tagName: "a",
              properties: {
                href: allLinks[randIdx],
                title: "Open a random article",
                target: "_blank",
              },
            },
            [u("raw", "&#x2197;")]
          ),
        ])
      );
    }
  }
  const summary = u(
    "element",
    { properties: { class: SUMMARY_CLASSES }, tagName: "summary" },
    summaryChildren
  );
  const children = u(
    "element",
    { properties: { class: LIST_CLASSES }, tagName: "ul" },
    textTree.children.map((t) =>
      u(
        "element",
        {
          tagName: "li",
          properties: t.children.length === 0 ? { class: LEAF_LIST_ITEM_CLASSES } : {},
        },
        [textTreeToHast(t, depth + 1, collapseDepth, rand)]
      )
    )
  );
  const details = u(
    "element",
    { properties: { class: DETAILS_CLASSES, open: depth < collapseDepth }, tagName: "details" },
    [summary, children]
  );
  return details;
}

export default textTreeNodeHandler;
