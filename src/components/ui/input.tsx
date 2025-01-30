import { useEffect, useState } from "react";
import { useClick } from "../../lib/hooks/useclick";
import { inputEvent } from "../../lib/types";

export const Input = {
  number: ({
    required,
    disabled,
    value,
    onChange,
  }: {
    required?: boolean;
    disabled?: boolean;
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
        required={required}
        disabled={disabled}
        value={value}
        placeholder="0.00"
        className="mt-2 h-14 w-full rounded-lg border border-gray bg-dark px-3 py-1.5 text-base font-semibold text-primary focus:outline-none"
      />
    );
  },
};

const formInputClass = `absolute bottom-1.5 left-1 -z-10 px-2 py-0.5 text-grey duration-300`;

const formInputStyle = "h-10 w-full bg-transparent px-4 py-2 text-base text-primary focus:outline-none z-10 text-primary";

export const FormInput = {
  text: (props?: inputEvent) => {
    return (
      <div className="relative z-10 h-fit rounded-md bg-dark">
        <input {...props} id="input-anime" type="text" placeholder="" className={formInputStyle} />
        <label htmlFor="input-anime" className={formInputClass}>
          {props?.placeholder}
        </label>
      </div>
    );
  },
  email: (props?: inputEvent) => {
    return (
      <div className="relative z-10 h-fit rounded-md bg-dark">
        <input {...props} id="input-anime-email" type="email" placeholder="" className={formInputStyle} />
        <label htmlFor="input-anime-email" className={formInputClass}>
          {props?.placeholder}
        </label>
      </div>
    );
  },
  password: (props?: inputEvent) => {
    return (
      <div className="relative z-10 h-fit rounded-md bg-dark">
        <input {...props} id="input-anime-password" type="password" placeholder="" className={formInputStyle} />
        <label htmlFor="input-anime-password" className={formInputClass}>
          {props?.placeholder}
        </label>
      </div>
    );
  },
  number: (props?: inputEvent) => {
    return (
      <div className="relative z-10 h-fit rounded-md bg-dark">
        <input {...props} id="input-anime-number" type="text" placeholder="" className={formInputStyle} />
        <label htmlFor="input-anime-number" className={formInputClass}>
          {props?.placeholder}
        </label>
      </div>
    );
  },
  date: (props?: inputEvent) => {
    const [animation, setAnimation] = useState(false);
    const { targetRef } = useClick.manual({
      isOpen: animation,
      setIsOpen: setAnimation,
    });

    useEffect(() => {
      if (targetRef.current.value) {
        setAnimation(true);
      }
    }, [animation, props.value]);

    return (
      <div className="relative z-10 h-fit rounded-md bg-dark">
        <input
          {...props}
          id="input-anime-date"
          ref={targetRef}
          onClick={() => setAnimation(true)}
          type="date"
          name="placeholder"
          placeholder=""
          className={formInputStyle + `${animation || " date"}`}
        />

        <label htmlFor="input-anime-date" className={formInputClass}>
          {props?.placeholder}
        </label>
      </div>
    );
  },
  setting: (props?: inputEvent) => (
    <input
      {...props}
      id="input-anime"
      className="mt-2 flex h-14 w-full items-center justify-between gap-3 rounded-lg border border-gray bg-dark px-3 py-1.5 text-base font-semibold text-primary"
    />
  ),
};
