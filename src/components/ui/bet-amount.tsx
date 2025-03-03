import { formattedNumber } from "../../lib/utils/formattedNumber";
import { useGlobalContext } from "../../lib/global-context";
import { useClick } from "../../lib/hooks/useclick";
import Walkthrough from "./walkthrough";

export default function BetAmount(props) {
  const { value, onChange, disableIntro } = props;
  const { balance } = useGlobalContext().user?.info;
  const { isOpen, setIsOpen, targetRef } = useClick.auto();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(inputValue) && inputValue < balance) {
      onChange(inputValue);
    }
  };

  const adjustAmount = (label: string) => {
    if (label == "2x") {
      if (value * 2 < balance) onChange(value * 2);
    } else {
      if (value > 1) {
        onChange((value * 0.5).toFixed(1));
      }
    }
  };

  return (
    <Walkthrough
      {...props}
      title="Enter Your Bet Amount"
      content="Type or select the amount you want to bet in the input field."
      containerStyle=""
    >
      <div className="flex items-center gap-2 text-base font-medium">Bet Amount</div>
      <article
        ref={targetRef}
        className="relative mt-2 flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-gray bg-muted px-3 py-1.5 text-base font-semibold text-primary"
      >
        <input
          onClick={() => setIsOpen(true)}
          required
          value={value}
          onChange={handleInputChange}
          placeholder="0.05"
          className="h-full w-full bg-transparent focus:outline-none"
        />
        <div className="grid h-full w-full max-w-24 grid-cols-2 rounded-md border border-gray bg-advance py-2">
          {["1/2x", "2x"].map((label, idx) => (
            <button
              disabled={value < 0}
              type="button"
              key={idx}
              onClick={() => adjustAmount(label)}
              className={`${
                idx == 1 && "border-l"
              } flex cursor-pointer items-center justify-center font-advance text-xs font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {label}
            </button>
          ))}
        </div>
      </article>
      <section className={`mt-3 flex flex-wrap gap-3 gap-y-1`}>
        {[50, 25, 14, 20, 8, 150].map((number) => {
          return (
            <div
              key={number}
              onClick={() => {
                onChange(number);
                setIsOpen(false);
              }}
              className="cursor-pointer rounded-full border border-gray bg-image px-4 py-1 text-sm"
            >
              ${number}
            </div>
          );
        })}
      </section>
    </Walkthrough>
  );
}
