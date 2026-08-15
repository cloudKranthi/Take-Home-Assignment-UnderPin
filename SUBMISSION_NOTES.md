# Submission Notes

## What I'd test next with more time
I'd test getStats() with more varied combinations — mixed overdue and
non-overdue tasks, tasks with no due date at all, and tasks right at the
boundary of "overdue" (due today) — to make sure the counting logic
holds up beyond the simple cases I covered.

## What surprised me
There's no real filtering or access control anywhere — any request can
read, update, or delete any task with no restriction. It's open to
anyone. That's fine for a small internal tool, but it's the first thing
I'd flag before this went anywhere near production. and the next thing which surprised me there is no user model no tracking of who created which tasks and taht also needs to be uupdated before production 

## PATCH /tasks/:id/assign — how I implemented it
The route reads `assignedUsername` from the request body and  it must be a string and non empty then only it passes,
along with the task id where the task id is being taken from the request params and then they are both passed  into a new `assignTask` function in the service
layer. That function finds the task, sets an `assignee` field on it, and
saves it back — same pattern as the existing `completeTask` function.

Design decisions:
- I considered blocking reassignment on tasks that are already marked
  "done," but decided against it — reassigning a completed task (e.g.
  for review) is a reasonable real use case, so I didn't want to lock
  that down without a clearer product reason to.
- "I return a 400 if assignedUsername is missing or empty or if it is not string ."