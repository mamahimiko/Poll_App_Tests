import { PollProps } from "@/types/poll";
import PollOption from "../PollOption";

const Poll = ({ pollData, votedOptionId, onVote, onChangeVote }: PollProps) => {
  return (
    <div className="flex flex-col gap-4 py-10">
      <h2 className="font-bold">{pollData.question}</h2>
      {pollData.options.map((data, index) => (
        <div key={index} className="">
          <PollOption
            option={data}
            hasVoted={votedOptionId !== null}
            isSelected={votedOptionId == data.id}
            onVote={onVote}
          />
        </div>
      ))}
    </div>
  );
};

export default Poll;
