import { useState } from "react";

export function useSetModalType(validate) {
  const [modalType, setModalType] = useState(-1);
  const [handleAfterAuth, setHandleAfterAuth] = useState(null);

  const handleAfterModalPass = () => {
    setValue(newValue);
    setIsValid(validate(newValue));
  };

  return {
    setModalType,
    setHandleAfterAuth,
    afterModalPass: handleAfterModalPass,
  };
}

export default useSetModalType;
