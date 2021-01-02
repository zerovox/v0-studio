import convert from "unist-util-is/convert";
import { Node, Parent } from "unist";
import { ActionTuple } from "unist-util-visit-parents";
import { Test } from "unist-util-is";

const CONTINUE = true;
const SKIP = "skip" as const;
const EXIT = false;

visit.SKIP = SKIP;
visit.EXIT = EXIT;
visit.CONTINUE = CONTINUE;

export type Visitor<V extends Node> = (
  node: V,
  index: number,
  parent: Parent | undefined
) => Promise<ActionTuple>;

export default async function visit<V extends Node>(
  tree: Node,
  test: Test<V> | Array<Test<any>>,
  visitor: Visitor<V>,
  reverse?: boolean
): Promise<void> {
  const is = convert(test as any);
  const step = reverse ? -1 : 1;

  await factory(tree, 0, undefined)();

  function factory(
    node: Node,
    index: number,
    parent: Parent | undefined
  ): () => Promise<ActionTuple> {
    return visit;

    async function visit(): Promise<ActionTuple> {
      const result: ActionTuple = [CONTINUE, index + 1];

      if (is(node, index, parent)) {
        const result = await visitor(node as V, parent?.children.indexOf(node) ?? 0, parent);

        if (result[0] === EXIT) {
          return result;
        }
      }

      if (node.children && result[0] !== SKIP) {
        const nodeAsParent = node as Parent;
        let offset = (reverse ? nodeAsParent.children.length : -1) + step;

        while (offset > -1 && offset < nodeAsParent.children.length) {
          const subresult = await factory(nodeAsParent.children[offset], offset, nodeAsParent)();

          if (subresult[0] === EXIT) {
            return subresult;
          }

          offset = subresult[1];
        }
      }

      return result;
    }
  }
}
