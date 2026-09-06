# M1 → GitHub → M5 Validation Pilot

## Purpose

This document records the first repository-scoped pilot for the BK multi-machine coding workflow.

- Repository: `lepurecafe/c5-ues-lab`
- Base commit: `586a6af5d3f98e939c703a28e9d2a9f8f43f8847`
- Working branch: `m1/docs-validation-pilot`
- M1 role: implement, run local checks, commit, and push
- M5 role: fetch the exact commit, review the diff, rerun checks, and open a Draft PR

## Evidence Contract

The pilot is successful only when all of the following are recorded:

1. The M1 and M5 commit SHAs are identical.
2. The branch contains only this new documentation file.
3. Manifest drift check passes.
4. C5 doctor completes without an error status; existing warnings remain visible.
5. Doctor regression tests pass.
6. `git diff --check` reports no whitespace errors.
7. GitHub Actions runs on the Draft PR; merge remains a separate human decision.

## Validation Commands

```sh
node scripts/generate-c5-manifest.mjs --check
node scripts/c5-doctor.mjs --json
node scripts/test-c5-doctor.mjs
git diff --check
```

## Stop Conditions

Stop and return control to M5 if the base commit differs, unrelated files change, credentials appear in output or diffs, validation fails unexpectedly, or the requested work expands beyond this single-file pilot.

## Result Boundary

Passing this pilot proves the Git and validation handoff path. It does not authorize merging, deployment, release, account changes, or broader automation.
