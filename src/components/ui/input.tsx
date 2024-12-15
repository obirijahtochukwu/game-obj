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
        className="h-14 w-full bg-muted border border-gray rounded-lg font-semibold text-base text-primary px-3 py-1.5 mt-2 focus:outline-none"
      />
    );
  },
};

const formInputClass = (animation: boolean) =>
  `${
    animation
      ? "text-sm bottom-7 text-primary/50 z-10 bg-muted/20"
      : "bottom-1.5 -z-10"
  } absolute ml-1 px-2 py-0.5 duration-200`;

const formInputStyle =
  "h-10 w-full bg-transparent px-4 py-2 text-base text-primary focus:outline-none z-10 text-primary";

export const FormInput = {
  text: (props?: inputEvent) => {
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
      <div className="relative h-fit z-10 bg-muted/40 rounded-md">
        <input
          {...props}
          ref={targetRef}
          onFocus={() => setAnimation(true)}
          onClick={() => setAnimation(true)}
          type="text"
          placeholder=""
          className={formInputStyle}
        />
        <div className={formInputClass(animation)}>{props?.placeholder}</div>
      </div>
    );
  },
  email: (props?: inputEvent) => {
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
      <div className="relative h-fit z-10 bg-muted/40 rounded-md">
        <input
          {...props}
          ref={targetRef}
          onClick={() => setAnimation(true)}
          type="email"
          placeholder=""
          className={formInputStyle}
        />
        <div className={formInputClass(animation)}>{props?.placeholder}</div>
      </div>
    );
  },
  password: (props?: inputEvent) => {
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
      <div className="relative h-fit z-10 bg-muted/40 rounded-md">
        <input
          {...props}
          ref={targetRef}
          onClick={() => setAnimation(true)}
          type="password"
          placeholder=""
          className={formInputStyle}
        />
        <div className={formInputClass(animation)}>{props?.placeholder}</div>
      </div>
    );
  },
  number: (props?: inputEvent) => {
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
      <div className="relative h-fit z-10 bg-muted/40 rounded-md">
        <input
          {...props}
          ref={targetRef}
          onClick={() => setAnimation(true)}
          type="text"
          placeholder=""
          className={formInputStyle}
        />
        <div className={formInputClass(animation)}>{props?.placeholder}</div>
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
      <div className="relative h-fit z-10 bg-muted/40 rounded-md">
        <input
          {...props}
          ref={targetRef}
          onClick={() => setAnimation(true)}
          type="date"
          className={formInputStyle + `${animation || " date"}`}
        />

        <div className={formInputClass(animation)}>{props?.placeholder}</div>
      </div>
    );
  },
  setting: (props?: inputEvent) => (
    <input
      {...props}
      className="h-14 w-full bg-muted border border-gray rounded-lg flex items-center justify-between font-semibold text-base text-primary px-3 py-1.5 mt-2 gap-3"
    />
  ),
};
