---
name: project-workflows
description: Standard development loops and CI/CD pipelines.
---
# Project Workflows

## Dev Loop (Vibe Coder Loop)
Strictly follow this sequence during development cycles:
1. **Read Memory**: Check `docs/milestones/00-ROADMAP.md` or history for context.
2. **Issue Tracking**: Create task artifacts or Github issues for new milestones.
3. **Coding**: Follow rules in `.agents/rules/`.
4. **Local Port Check**: Ensure ports 3000 (backend) and 4321 (frontend) are free before running `bun run dev`. Use `lsof -i :<port>` if needed.
5. **Testing**: Run `bun test` or `vitest run`.
6. **Git Push**: Use Conventional Commits.

## CI/CD Automation
On `git push` to `main`, GitHub Actions triggers:
1. `bun install` & `bun test`
2. Frontend deployment (Vercel)
3. Backend deployment (Koyeb)
