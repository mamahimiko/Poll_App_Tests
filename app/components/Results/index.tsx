import { ResultsProps } from "@/types/poll";

const Results = ({ percentages, winningOptionIds }: ResultsProps) => {
  const winner = (optionId: string) => {
    return winningOptionIds.includes(optionId);
  };

  return (
    <ul data-testid="results-bar">
      {percentages.map((option) => (
        <li key={option.id}>
          <div className="flex justify-between py-1">
            <p>
              {option.name} {winner(option.id) && "🦸"}
            </p>
            <p>{option.percentage}%</p>
          </div>
          <div className="pb-1">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                role="meter"
                aria-label={`${option.name} vote percentage`}
                aria-valuenow={option.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                className={`h-4 rounded-full ${winner(option.id) ? "bg-red-500" : "bg-gray-400"}`}
                style={{ width: `${option.percentage}%` }}
              ></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Results;
