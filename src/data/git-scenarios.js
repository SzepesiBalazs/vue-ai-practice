export const featureBranchWorkflow = {
    name: "Feature Branch",
    description: "Create a feature branch, make commits, merge back to main",
    steps: [
        { command: "git init", action: "init", args: {} },
        {
            command: 'git commit -m "Initial commit"',
            action: "commit",
            args: { message: "Initial commit" },
        },
        {
            command: 'git commit -m "Add project structure"',
            action: "commit",
            args: { message: "Add project structure" },
        },
        {
            command: "git checkout -b feature/login",
            action: "branch",
            args: { branchName: "feature/login" },
        },
        {
            command: 'git commit -m "Add login form"',
            action: "commit",
            args: { message: "Add login form" },
        },
        {
            command: 'git commit -m "Add validation"',
            action: "commit",
            args: { message: "Add validation" },
        },
        {
            command: 'git commit -m "Add auth API call"',
            action: "commit",
            args: { message: "Add auth API call" },
        },
        {
            command: "git checkout main",
            action: "checkout",
            args: { branchName: "main" },
        },
        {
            command: "git merge feature/login",
            action: "merge",
            args: { sourceBranch: "feature/login" },
        },
        {
            command: 'git commit -m "Update README"',
            action: "commit",
            args: { message: "Update README" },
        },
    ],
};
export const gitflowWorkflow = {
    name: "Gitflow",
    description: "Develop branch, feature branches, release branch, hotfix",
    steps: [
        { command: "git init", action: "init", args: {} },
        {
            command: 'git commit -m "Initial commit"',
            action: "commit",
            args: { message: "Initial commit" },
        },
        {
            command: "git checkout -b develop",
            action: "branch",
            args: { branchName: "develop" },
        },
        {
            command: 'git commit -m "Setup dev tooling"',
            action: "commit",
            args: { message: "Setup dev tooling" },
        },
        {
            command: "git checkout -b feature/auth",
            action: "branch",
            args: { branchName: "feature/auth" },
        },
        {
            command: 'git commit -m "Add auth module"',
            action: "commit",
            args: { message: "Add auth module" },
        },
        {
            command: 'git commit -m "Add JWT handling"',
            action: "commit",
            args: { message: "Add JWT handling" },
        },
        {
            command: "git checkout develop",
            action: "checkout",
            args: { branchName: "develop" },
        },
        {
            command: "git merge feature/auth",
            action: "merge",
            args: { sourceBranch: "feature/auth" },
        },
        {
            command: "git checkout -b release/1.0",
            action: "branch",
            args: { branchName: "release/1.0" },
        },
        {
            command: 'git commit -m "Bump version to 1.0"',
            action: "commit",
            args: { message: "Bump version to 1.0" },
        },
        {
            command: "git checkout main",
            action: "checkout",
            args: { branchName: "main" },
        },
        {
            command: "git merge release/1.0",
            action: "merge",
            args: { sourceBranch: "release/1.0" },
        },
    ],
};
export const hotfixWorkflow = {
    name: "Hotfix",
    description: "Production hotfix branched from main, merged back",
    steps: [
        { command: "git init", action: "init", args: {} },
        {
            command: 'git commit -m "Initial commit"',
            action: "commit",
            args: { message: "Initial commit" },
        },
        {
            command: 'git commit -m "Add user dashboard"',
            action: "commit",
            args: { message: "Add user dashboard" },
        },
        {
            command: 'git commit -m "Release v1.0"',
            action: "commit",
            args: { message: "Release v1.0" },
        },
        {
            command: "git checkout -b hotfix/fix-login",
            action: "branch",
            args: { branchName: "hotfix/fix-login" },
        },
        {
            command: 'git commit -m "Fix login crash on empty email"',
            action: "commit",
            args: { message: "Fix login crash on empty email" },
        },
        {
            command: 'git commit -m "Add regression test"',
            action: "commit",
            args: { message: "Add regression test" },
        },
        {
            command: "git checkout main",
            action: "checkout",
            args: { branchName: "main" },
        },
        {
            command: "git merge hotfix/fix-login",
            action: "merge",
            args: { sourceBranch: "hotfix/fix-login" },
        },
        {
            command: 'git commit -m "Release v1.0.1"',
            action: "commit",
            args: { message: "Release v1.0.1" },
        },
    ],
};
export const allScenarios = [
    featureBranchWorkflow,
    gitflowWorkflow,
    hotfixWorkflow,
];
