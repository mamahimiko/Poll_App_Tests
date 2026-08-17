# Marvel Polls

A small single-page voting app built with Next.js and TypeScript. Users
vote on three Marvel-themed polls, see live results as percentages, and can
change their vote at any point.

## Features

- **Three independent polls**, switchable via tabs
- **Vote once per poll** — casting a vote reveals live results (a
  percentage bar per option) that were hidden beforehand
- **Change your vote** — swap to a different option via a dropdown;
  the old option loses a vote, the new one gains it, and results update
- **Leading option highlight** — the option (or options, in a tie) with
  the most votes is marked with a super hero icon
- **Independent poll state** — voting on one poll doesn't affect another;
  switching tabs and back preserves your vote

## Screenshots

![Poll before voting](./public/before_vote.png)
*A poll before the user has voted — no results shown yet.*

![Poll after voting](./public/after_vote.png)
*After voting, results appear with percentages and an icon on the
leading option.*

![Changing a vote](./public/changing_vote.png)
*The change vote dropdown, used to switch to a different option.*

## Architectural Notes

Since only tests are submitted, this section explains the logic behind
the four functions that don't have visible source code in this repo,
and which tests prove they work.

### Voting logic (lives in `PollsApp`)

- **`castVote(pollId, optionId)`** — records the user's choice for that
  poll and increments the chosen option's `votes` by 1.
- **`changeVote(pollId, newOptionId)`** — decrements the *previous*
  option's votes by 1 and increments the *new* one by 1 (net total
  stays the same). No-ops if you
  reselect the option you already voted for.

Tested in: `__tests__/integration/` — these click through the
real vote/changeing vote flow and check the resulting DOM, which is how
this logic is verified without the source being in this repo.

### `calculatePercentages(options)`

Pure function. Sums all `votes`, then returns each option's share as a
rounded whole-number percentage. Returns `0%` for everyone if total
votes is `0`.

Used inside `Poll`, passed to `Results` as its `percentages` prop.

Tested in: `__tests__/lib/CalculatePercentages.test.tsx` and indirectly via the integration tests (checking the
correct % shows up on screen).

### `getWinningOption(options)`

Pure function. Returns the option/s with the highest votes — an
**array**, since ties are possible. Returns `[]` if nobody's voted yet.

Used inside `Poll`, passed to `Results` as `winningOptionIds` (marks
the leading option(s) with a hero icon).

Tested in: `__tests__/lib/GetWinningOptions.test.tsx` (isolated, includes
a tie case), and indirectly via `Results.test.tsx` / integration tests
(checking the hero icon appears on the correct option/s).
## Tests

All tests are in `__tests__/`, organized into:
- `lib/` — unit tests for the pure percentage/winner-calculation logic
- `components/` — unit tests for each individual components
- `integration/` — tests covering multiple components working together
  (voting, changing a vote, switching between polls)

Note: Type definitions (types/) are included alongside the tests, since the tests require them to type-check and they contain the data shapes above.

Run tests with `npm test`.