import PollOption from "../PollOption";

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
  return (
    <div>
      {hasVoted === true && votedOptionId?.length ? (
        <div>
          <div className="flex justify-between">
            <p>You voted for {votedOptionName}</p>
            <div>
              <p>Change vote:</p>
              <select
                onChange={(e) => onChangeVote(e.target.value)}
                name="poll-option"
                value={votedOptionId}
                data-testid="change-vote-option"
              >
                {options?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
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
