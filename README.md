# v0.studio

## Site

- `npm run dev` starts a dev server at http://localhost:3000
- `npm run build` generates `out/` containing static site
- `npm run fmt` reformats files
- `npm run lint` fixes lint issues

## Bins

- Get a workflowy shared tree as a JSON representation
  - `ts-node -O {\"module\":\"commonjs\"} bin/get-workflowy-share.ts 7Jls9gnBqM21Tp6h`
  - Requires `ts-node` to be installed globally
