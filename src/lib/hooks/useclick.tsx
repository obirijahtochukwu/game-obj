import React, { useEffect, useRef, useState } from "react";

export const useClick = {
  auto: () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const targetRef = useRef<HTMLInputElement>();

    useEffect(() => {
      const close = (e: MouseEvent) => {
        const target = e.target as Node; // Type assertion to Node
        if (targetRef.current && !targetRef.current.contains(target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", close);
      return () => {
        document.removeEventListener("mousedown", close);
      };
    }, [targetRef]);

    return {
      isOpen,
      setIsOpen,
      targetRef,
    };
  },
  manual: ({ isOpen, setIsOpen, isForm }: { isOpen: boolean; setIsOpen: React.Dispatch<boolean>; isForm?: boolean }) => {
    const targetRef = useRef<HTMLInputElement>();
    useEffect(() => {
      const close = (e: MouseEvent) => {
        const target = e.target as Node; // Type assertion to Node
        if (!isForm) {
          if (targetRef.current && !targetRef.current.contains(target)) {
            setIsOpen(false);
          }
        }
      };
      document.addEventListener("mousedown", close);
      return () => {
        document.removeEventListener("mousedown", close);
      };
    }, [targetRef]);

    return {
      isOpen,
      setIsOpen,
      targetRef,
    };
  },
};
