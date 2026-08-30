import Image from "next/image";
import type { PollOption } from "@/types/poll";

type PollOptionProps = {
  option: PollOption;
  hasVoted: boolean;
  isSelected: boolean;
  onVote: (optionId: string) => void;
};

const PollOption = ({
  option,
  hasVoted,
  isSelected,
  onVote,
}: PollOptionProps) => {
  return (
    <div className="flex justify-between p-3 border border-gray-200 items-center rounded-md">
      <div className="flex items-center gap-5 ">
        <Image
          src={option.image}
          alt={option.name}
          width={100}
          height={100}
          className="rounded-full h-20 w-20 object-cover object-top"
        ></Image>
        <p>{option.name}</p>
      </div>
      {hasVoted ? (
        <button
          disabled
          className="bg-gray-400 h-10 w-20 rounded-md font-bold text-amber-50"
        >
          {isSelected ? "Voted" : "Vote"}
        </button>
      ) : (
        <button
          onClick={() => onVote(option.id)}
          aria-label={`vote for ${option.name.toLowerCase()}`}
          className="bg-red-500 h-10 w-20 rounded-md font-bold text-amber-50 hover:bg-red-400 bg-"
        >
          Vote
        </button>
      )}
    </div>
  );
};

export default PollOption;
