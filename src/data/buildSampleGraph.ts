import type {
  GraphData,
  PackageNode,
  DepEdge,
  PackageManager,
} from "@/types/dependency-graph";

interface PackageJsonDep {
  [name: string]: string; // name → version range
}

interface PackageJsonLike {
  name: string;
  version: string;
  dependencies?: PackageJsonDep;
  devDependencies?: PackageJsonDep;
  peerDependencies?: PackageJsonDep;
}

/**
 * Builds a two-level GraphData from a package.json-like object.
 * In a real app, replace with an actual lockfile parser or `npm ls --json` output.
 */
export function buildGraphFromPackageJson(pkg: PackageJsonLike): GraphData {
  const nodes: PackageNode[] = [];
  const edges: DepEdge[] = [];
  const rootId = `${pkg.name}@${pkg.version}`;

  nodes.push({
    id: rootId,
    name: pkg.name,
    version: pkg.version,
    kind: "direct",
    depth: 0,
    requiredBy: [],
  });

  function addDeps(
    deps: PackageJsonDep | undefined,
    kind: "direct" | "dev" | "peer",
    depth: number,
  ) {
    if (!deps) return;
    for (const [name, versionRange] of Object.entries(deps)) {
      const version = versionRange.replace(/^[~^>=<v\s]+/, "");
      const nodeId = `${name}@${version}`;
      const existing = nodes.find((n) => n.id === nodeId);
      if (existing) {
        if (!existing.requiredBy.includes(rootId)) {
          existing.requiredBy.push(rootId);
        }
      } else {
        nodes.push({
          id: nodeId,
          name,
          version,
          kind,
          depth,
          requiredBy: [rootId],
        });
      }
      edges.push({ source: rootId, target: nodeId, kind });
    }
  }

  addDeps(pkg.dependencies, "direct", 1);
  addDeps(pkg.devDependencies, "dev", 1);
  addDeps(pkg.peerDependencies, "peer", 1);

  return { nodes, edges, root: rootId };
}

/** npm sample: React app */
export const npmSampleGraph: GraphData = buildGraphFromPackageJson({
  name: "my-app",
  version: "1.0.0",
  dependencies: {
    react: "18.2.0",
    "react-dom": "18.2.0",
    axios: "1.6.7",
    zustand: "4.5.2",
  },
  devDependencies: {
    vite: "5.2.0",
    typescript: "5.4.4",
    vitest: "1.4.0",
    "@vitejs/plugin-react": "4.2.1",
  },
  peerDependencies: {
    react: ">=18",
  },
});

/** yarn sample: Vue app */
export const yarnSampleGraph: GraphData = buildGraphFromPackageJson({
  name: "my-vue-app",
  version: "1.0.0",
  dependencies: {
    vue: "3.4.21",
    "vue-router": "4.3.0",
    pinia: "2.1.7",
    axios: "1.6.7",
  },
  devDependencies: {
    vite: "5.2.0",
    typescript: "5.4.4",
    "@vitejs/plugin-vue": "5.0.4",
    "vue-tsc": "2.0.6",
  },
  peerDependencies: {
    vue: ">=3",
  },
});

/** pnpm sample: Node API */
export const pnpmSampleGraph: GraphData = buildGraphFromPackageJson({
  name: "my-api",
  version: "1.0.0",
  dependencies: {
    express: "4.18.3",
    zod: "3.22.4",
    "better-sqlite3": "9.4.3",
    pino: "8.19.0",
  },
  devDependencies: {
    typescript: "5.4.4",
    "@types/express": "4.17.21",
    "@types/better-sqlite3": "7.6.8",
    tsx: "4.7.1",
  },
  peerDependencies: {
    node: ">=18",
  },
});

/** Default export for backwards compat */
export const sampleGraph = npmSampleGraph;

export function getSampleGraph(pm: PackageManager): GraphData {
  if (pm === "yarn") return yarnSampleGraph;
  if (pm === "pnpm") return pnpmSampleGraph;
  return npmSampleGraph;
}
