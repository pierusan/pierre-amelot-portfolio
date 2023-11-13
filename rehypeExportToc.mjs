import AST from 'abstract-syntax-tree';
import { visit } from 'unist-util-visit';
import { toString as hastNodeToString } from 'hast-util-to-string';

// TODO: Create a typescript package for this plugin. Having types in here would
// make things cleaner, but because Next config can't be a TS file we'd have to
// transpile it ourselves before running scripts.

// Rehype plugins work on a MDX HTML/Hypertext Abstract Syntax Tree (MdxHast)
// https://github.com/mdx-js/specification#how-does-it-work
export function rehypeExportToc(options) {
  return (tree) => {
    const namedExport = (options && options.namedExport) || 'toc';

    // Our ToCs are very minimal in this portfolio and only includes h2s. For
    // more complete ToCs in future projects, we should consider reusing
    // https://github.com/syntax-tree/mdast-util-toc
    const h2s = [];

    // Visit all 'h2' in the MdxHast
    // https://github.com/syntax-tree/hast#element
    // https://unifiedjs.com/learn/guide/create-a-plugin/#plugin
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h2') {
        h2s.push({
          value: hastNodeToString(node),
          // Assume rehype-slug plugin has already run and the h2s have an id
          // attribute
          id: node.properties.id,
        });
      }
    });

    // To give users who import the MDX file access to its ToC, we inject it as
    // an export statement at the top of the MDX file. This is more flexible
    // than the approach of https://github.com/remarkjs/remark-toc which injects
    // it directly as a unordered list in the markdown. If we need to use the
    // ToC in the markdown, it can be still be passed as a prop to the MDX
    // component.
    const tocExportStatementToInject = `export const ${namedExport} = ${JSON.stringify(
      h2s
    )};`;

    // Create ESTree representation of the export statement.
    // abstract-syntax-tree seemed popular but we could also consider using
    // https://github.com/syntax-tree/esast-util-from-js in the future
    const tocExportStatementEsTree = AST.parse(tocExportStatementToInject);

    // https://github.com/syntax-tree/mdast-util-mdxjs-esm#mdxjsesm
    const tocExportStatementMdxHastNode = {
      type: 'mdxjsEsm',
      value: tocExportStatementToInject,
      data: {
        estree: tocExportStatementEsTree,
      },
    };
    // Insert the toc into the MDX HAST
    tree.children.unshift(tocExportStatementMdxHastNode);
  };
}
