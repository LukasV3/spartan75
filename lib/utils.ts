import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Object } from "@/lib/definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isObject = function (obj: unknown) {
  return obj === Object(obj) && !isArray(obj) && typeof obj !== "function";
};

const isArray = function (arr: unknown) {
  return Array.isArray(arr);
};

const toCamel = (str: string) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

/**
 * Transforms the keys of an object to camelCase recursively
 * @param obj - The object to transform
 * @returns A new object with camelCase keys
 */
export const keysToCamel = function (obj: Object): Object {
  if (isObject(obj)) {
    const n: Object = {};

    Object.keys(obj).forEach((k) => {
      n[toCamel(k)] = keysToCamel(obj[k]);
    });

    return n;
  } else if (isArray(obj)) {
    return obj.map((i) => {
      return keysToCamel(i);
    });
  }

  return obj;
};

export const getCurrentDayIndex = (challengeStartDate: string | null) => {
  if (challengeStartDate) {
    const today = new Date();
    const dayDifference =
      Math.floor(
        (today.getTime() - new Date(challengeStartDate).getTime()) /
          (1000 * 60 * 60 * 24),
      ) + 1;

    return dayDifference;
  }

  return 1;
};
