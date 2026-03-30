export interface Commit {
  id: string;
  message: string;
  branchName: string;
  parentIds: string[];
  timestamp: number;
}

export interface Branch {
  name: string;
  color: string;
  headCommitId: string;
}

export interface GitGraphState {
  commits: Commit[];
  branches: Branch[];
  head: string;
  selectedCommitId: string | null;
}

/** A single step in a workflow scenario */
export interface WorkflowStep {
  /** The git command to display, e.g. 'git commit -m "Initial commit"' */
  command: string;
  /** The action to execute */
  action: "init" | "commit" | "branch" | "checkout" | "merge";
  /** Arguments for the action */
  args: {
    message?: string;
    branchName?: string;
    sourceBranch?: string;
  };
}

/** A named workflow scenario with an ordered list of steps */
export interface WorkflowScenario {
  name: string;
  description: string;
  steps: readonly WorkflowStep[];
}
