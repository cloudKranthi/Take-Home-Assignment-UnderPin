# Bug Report

## Bug 1: Status filter accepts any string, not just valid statuses

**Expected:** `GET /tasks?status=done` should return only tasks with
status exactly "done". An invalid or random status value should return
nothing (or a 400 error) — not partial matches.

**Actual:** `getByStatus` uses `.includes()` to match status, which
checks for a substring, not an exact value. Since there's no validation
on the `status` query param (unlike the request body, where status is
checked against an enum of valid values), any string is accepted. A
query like `?status=o` incorrectly matches "todo", "done", and
"in_progress" all at once, since all three contain the letter "o".

**How I found it:** I have written a test filtering by status  "o" saw it
return all 3 tasks instead of 0 or an error.

**Suggested fix:** For making it consistent and to make it error free Validate the `status` query param against the same
list of valid status used elsewhere (todo, in_progress, done), and
change the filter to check for an exact match instead of a substring.

---

## Bug 2: Completing a task resets its priority

**Expected:** Marking a task as complete (`PATCH /tasks/:id/complete`)
should only change its status and completion time. Priority shouldn't be
touched.

**Actual:** `completeTask` always sets priority to "medium", no matter
what it was before. A high-priority task silently becomes medium the
moment it's marked done.

**How I found it:**I have a written a test in that i  created a task with priority "high", marked it completed
and checked the response  — priority had changed to "medium".
**Suggested fix:** Remove the line that overwrites priority in
`completeTask`, so only `status` and `completedAt` get updated.

---

## Bug 3: Pagination skipped the first page (fixed)

**Expected:** `GET /tasks?page=1&limit=10` should return the first 10
tasks.

**Actual:** It returned tasks 11-20 instead, skipping the first page
completely.

**How I found it:** On the first attempt when I ran the unit test with page 1 and offset 10  this test failed when i looked back to the service u understood that the The offset was being calculated as `page * limit`,
so with page=1, the offset was 10 instead of 0 — the code was treating
page 1 like page 2.

**Fix (applied):** Changed the offset calculation to `(page - 1) *
limit`, so page 1 now correctly maps to offset 0 and gives the correct Pagination.