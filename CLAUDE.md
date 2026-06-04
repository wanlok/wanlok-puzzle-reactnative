@AGENTS.md

## Conventions

**Guard clauses:** Always use multi-line braces for early returns. Example: `if (!x) { return; }` on separate lines, not `if (!x) return;` on one line.

**Handler naming:** Local handler functions must match the prop name they are passed to. Example: `onCreateButtonClick={onCreateButtonClick}`, not `onCreateButtonClick={openCreateModal}`.

**Variable naming:** Use full descriptive names, not abbreviations. Example: `column` not `col`, `project` not `p`. Exception: use single-letter counters (`i`, `j`, `k`) for index variables in map/filter callbacks, not prefixed variants like `ci` or `ii`.
