import { Request } from 'express';

/**
 * return common elem in two array (array intersection)
 * @param arr1
 * @param arr2
 */
export const intersection = (arr1: string[], arr2: string[]): string[] =>
  arr1.filter((item) => arr2.includes(item));

/**
 * concat two input array, remove duplicates
 * @param arr1
 * @param arr2
 */
export const mergeUnique = (arr1: string[], arr2: string[]): string[] => {
  const temp = arr1.concat(arr2);
  return temp.filter((item, index) => temp.indexOf(item) === index);
};

/**
 * pick given keys from object [custom lodash pick function]
 * @param obj
 * @param keys
 */
export const pick = (obj: any, keys: string[]): any => {
  const ret: any = {};
  if (!keys || keys.length === 0) return obj;

  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
};

/**
 * @param arg
 * @returns {boolean}
 * checks if a given object is empty
 */
export const isEmpty = (arg: any): boolean => {
  let val = arg;
  if (typeof val === 'number') {
    val = arg.toString();
  }
  return !val || val === 0 || val.length === 0 || Object.keys(val).length === 0;
};

/**
 * stringifies param, query & body from req to log
 * @param req
 * @return {string}
 */
export const fetchRequestData = (req: Request): string => {
  const { params, query, body } = req;
  let log = '';
  if (!isEmpty(params)) {
    log += `Req Params: ${JSON.stringify(params)}`;
  }
  if (!isEmpty(query)) {
    log += `Req Query: ${JSON.stringify(query)}`;
  }
  if (!isEmpty(body)) {
    log += `Req Body: ${JSON.stringify(body)}`;
  }
  return log;
};
