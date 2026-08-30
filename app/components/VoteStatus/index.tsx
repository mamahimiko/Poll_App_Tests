"use client";

import PollOption from "../PollOption";
import { useState } from "react";

type VotedStatusType = {
  hasVoted: boolean;
  votedOptionId: string | null;
  votedOptionName: string | null;
  options: PollOption[];
  onChangeVote: (optionId: string) => void;
};

const VoteStatus = ({
  hasVoted,
  votedOptionId,
  votedOptionName,
  options,
  onChangeVote,
}: VotedStatusType) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options?.find((option) => option.id === votedOptionId);

  return (
    <div>
      {hasVoted === true && votedOptionId?.length ? (
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <p>
              You voted for
              <span className="font-bold text-xl"> {votedOptionName}</span>
            </p>
            <div className="flex gap-2 py-4">
              <div className="relative">
                <p>Change vote:</p>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  onBlur={() => setTimeout(() => setIsOpen(false), 150)}
                  className="w-50 border-2 px-2 py-1 text-left "
                  data-testid="change-vote-option"
                >
                  {selectedOption?.name}
                </button>
                {isOpen && (
                  <ul className="absolute z-10 mt-1 w-full border-2 bg-white">
                    {options?.map((option) => (
                      <li
                        key={option.id}
                        data-testid={`vote-option-${option.id}`}
                        onMouseDown={() => onChangeVote(option.id)}
                        className="cursor-pointer px-2 py-1 hover:bg-gray-100"
                      >
                        {option.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-orange-500">You have not voted yet </p>
      )}
    </div>
  );
};

export default VoteStatus;
