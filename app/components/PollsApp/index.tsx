"use client";
import { useState } from "react";
import { pollQuestions } from "@/data/pollData";
import usePollsState from "@/app/lib/usePollState";
import Poll from "../Poll";
import PollTabs from "../PollTabs";
import VoteStatus from "../VoteStatus";
import Results from "../Results";
import { calculatePercentages } from "@/app/lib/calculatePercentages";
import { getWinningOption } from "@/app/lib/getWinningOption";
import { PollData } from "@/types/poll";

type PollsAppProps = {
  initialPolls?: PollData[];
};

const PollsApp = ({ initialPolls = pollQuestions }: PollsAppProps) => {
  const [activePollId, setActivePollId] = useState<string>(
    initialPolls[0]?.id ?? "1",
  );
  const { polls, castVote, changeVote } = usePollsState(initialPolls);

  const activePoll = polls.find((poll) => poll.id === activePollId);

  return (
    <main className="w-[50%] --font-oswald">
      <div>
        <h1 className="text-2xl font-bold p-10 text-center">Marvel Polls</h1>
        <PollTabs
          polls={polls}
          activePollId={activePollId}
          onSelectPoll={setActivePollId}
        />
        {activePoll && (
          <Poll
            pollData={activePoll}
            votedOptionId={activePoll.votedOptionId}
            onVote={(optionId) => castVote(activePoll.id, optionId)}
            onChangeVote={(optionId: string) =>
              changeVote(activePoll.id, optionId)
            }
          />
        )}
        {activePoll && (
          <div>
            <VoteStatus
              hasVoted={activePoll.votedOptionId !== null}
              votedOptionId={activePoll?.votedOptionId}
              votedOptionName={
                activePoll?.options.find(
                  (name) => name.id === activePoll.votedOptionId,
                )?.name ?? ""
              }
              options={activePoll.options}
              onChangeVote={(optionId: string) =>
                changeVote(activePoll.id, optionId)
              }
            />
            {activePoll?.votedOptionId?.length && (
              <Results
                percentages={calculatePercentages(activePoll.options)}
                winningOptionIds={getWinningOption(activePoll.options).map(
                  (option) => option.id,
                )}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
};
export default PollsApp;
