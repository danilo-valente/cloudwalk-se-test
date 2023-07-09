# Setup

```
npm install # or `pnpm install`, if available
npm run build
```

# Usage

```
npm run start -- <log file> [--detailed] [--compare]

# Example 1: produce basic report with required data only
npm run start -- test-data/qgames.log --detailed --compare

# Example 2: produce extended report with detailed data and compare stats
npm run start -- test-data/qgames.log --detailed --compare
```

## Env Vars

- `DEBUG`: set to `true` or `1` to enable debug output (default: `false`)
- `NO_REPORT`: set to `true` or `1` to disable report printing to stdout (default: `false`)
