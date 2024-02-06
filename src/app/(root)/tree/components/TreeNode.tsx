import { Category } from "@prisma/client";
import React from "react";

interface CategoryNodeWithChildren extends Category {
  children?: CategoryNodeWithChildren[];
}

const renderTree = (node: CategoryNodeWithChildren, level = 0) => {
  const indent = "-".repeat(level * 2); // Adjust the multiplier to increase or decrease indentation

  return (
    <ul key={node.id}>
      <li>
        {indent} {node.name}
        {node.children && (
          <ul>{node.children.map((child) => renderTree(child, level + 1))}</ul>
        )}
      </li>
    </ul>
  );
};

const buildTree = (
  nodes: CategoryNodeWithChildren[],
  parentId: string | null = null
): CategoryNodeWithChildren[] => {
  let tree: CategoryNodeWithChildren[] = [];
  for (let node of nodes) {
    if (node.parentCategoryId === parentId) {
      let children = buildTree(nodes, node.id);
      if (children.length) {
        node.children = children;
      }
      tree.push(node);
    }
  }
  return tree;
};

const CategoryNode: React.FC<{ data: CategoryNodeWithChildren[] }> = ({
  data,
}) => {
  const treeData = buildTree(data);
  return (
    <>
      <div className="border-b">{treeData.map((node) => renderTree(node))}</div>
    </>
  );
};

export default CategoryNode;
