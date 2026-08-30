import { PollTabsProps } from "@/types/poll";

const PollTabs = ({ polls, activePollId, onSelectPoll }: PollTabsProps) => {
  return (
    <div>
      <div className="flex gap-2 justify-center">
        {polls.map((poll, index) => (
          <button
            onClick={() => onSelectPoll(poll.id)}
            key={index}
            className="bg-amber-400 hover:bg-red-500 p-2 rounded-sm"
            role="tab"
            aria-selected={poll.id === activePollId}
          >
            {poll.question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PollTabs;
