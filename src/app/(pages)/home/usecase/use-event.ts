"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const useEvent = () => {
  const [keyword, setKeywords] = useDebounceValue("", 500);
  const [showModal, setShowModal] = useState(false);

  const route = useRouter();

  const _onShowModal = (isOpen: boolean) => {
    setShowModal(isOpen);
  };

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeywords(e.target.value);
    },
    [setKeywords]
  );

  const _onSearch = useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setShowModal(false);
      route.push(`/home?search=${keyword}`);
    },
    [keyword, route]
  );

  return {
    keyword,
    showModal,
    handleOnChange: _onChange,
    handleOnSearch: _onSearch,
    handleOnShowModal: _onShowModal,
  };
};

export default useEvent;
