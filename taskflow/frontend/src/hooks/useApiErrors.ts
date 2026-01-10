import { useState } from "react";
import type { ApiError } from "@/types/api";
import { extractErrors } from "@/utils/exctractErrors";

export function useApiErrors() {
  const [errors, setErrors] = useState<string[]>([]);

  function handleError(err: unknown) {
    const apiError = err as ApiError;

    if (apiError?.data) {
     setErrors(extractErrors(apiError.data));
    } else if (apiError?.message) {
      setErrors([apiError?.message]);
    } else {
      setErrors(["Something went wrong"]);
    }
  }

  function clearErrors() {
    setErrors([]);
  }

  return { errors, handleError, clearErrors };
}
