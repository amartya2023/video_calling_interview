import { Code2Icon, PlusIcon, LoaderIcon } from "lucide-react";
import { PROBLEMS } from "../data/problem";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-8">
          Create New Session
        </h3>

        {/* PROBLEM SELECTION */}
        <div className="space-y-2">
          <label className="label">
            <span className="label-text font-semibold">
              Select Problem
            </span>

            <span className="label-text-alt text-error">*</span>
          </label>

          <select
            className="select select-bordered w-full"
            value={roomConfig.problem}
            onChange={(e) => {
              const selectedProblem = problems.find(
                (p) => p.title === e.target.value
              );

              if (!selectedProblem) return;

              setRoomConfig({
                difficulty: selectedProblem.difficulty,
                problem: e.target.value,
              });
            }}
          >
            <option value="" disabled>
              Choose a coding problem...
            </option>

            {problems.map((problem) => (
              <option key={problem.id} value={problem.title}>
                {problem.title} ({problem.difficulty})
              </option>
            ))}
          </select>
        </div>

        {/* ROOM SUMMARY */}
        {roomConfig.problem && (
          <div className="alert alert-success mt-8">
            <Code2Icon className="size-5" />

            <div>
              <p className="font-semibold">Room Summary:</p>

              <p>
                Problem:{" "}
                <span className="font-medium">
                  {roomConfig.problem}
                </span>
              </p>

              <p>
                Max Participants:{" "}
                <span className="font-medium">
                  2 (1-on-1 session)
                </span>
              </p>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={isCreating}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>

      {/* BACKDROP */}
      <div
        className="modal-backdrop"
        onClick={onClose}
      ></div>
    </div>
  );
}

export default CreateSessionModal;