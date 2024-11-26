export const Input = {
  number: ({
    value,
    onChange,
  }: {
    value: string | number;
    onChange?: (name: string | number) => void;
  }) => {
    const handleChange = (e) => {
      const inputValue = e.target.value;
      const regex = /^[0-9]*$/;
      if (regex.test(inputValue)) {
        onChange(inputValue);
      }
    };

    return (
      <input
        onChange={handleChange}
        value={value}
        placeholder="0.00"
        className="h-14 w-full bg-muted border border-gray rounded-lg font-semibold text-base text-primary px-3 py-1.5 mt-2 focus:outline-none"
      />
    );
  },
};
