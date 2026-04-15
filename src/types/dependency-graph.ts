export type PackageManager = "npm" | "yarn" | "pnpm";

export type DepKind = "direct" | "transitive" | "dev" | "peer" | "optional";

export interface PackageNode {
  id: string; // "<name>@<version>"
  name: string;
  version: string;
  kind: DepKind;
  /** depth from the root package (0 = root, 1 = direct dep) */
  depth: number;
  license?: string;
  /** estimated install size in bytes */
  size?: number;
  /** IDs of PackageNodes that directly require this node */
  requiredBy: string[];
}

export interface DepEdge {
  source: string; // PackageNode.id
  target: string; // PackageNode.id
  kind: DepKind;
}

export interface GraphData {
  nodes: PackageNode[];
  edges: DepEdge[];
  root: string; // PackageNode.id of the root package
}

export interface LayoutNode extends PackageNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}
