const PER_PAGE = 48;
/**
 * util to debounce function execution
 * @param n debounce timeout
 * @param fn function to debounce
 * @param immed if run immediately
 */

export function debounce(
  n: number,
  fn: (...params: any[]) => any,
  immed = false,
): any {
  let timer: any;
  return function (this: any, ...args: any[]) {
    console.log('clear debounce ', timer);
    if (timer === undefined && immed) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), n);
    console.log('set clear debounce ', timer);
  };
}

export const getCurrentEntityType = (pathname: string): string => {
  switch (pathname) {
    case '/users':
      return 'users';
    case '/repositories':
      return 'repositories';
    default:
      return 'users';
  }
};

export const getAllData = (input: any, items: any): any => {
  const { search_type, search_text, page = 1, per_page = PER_PAGE } = input;
  if (!search_text) {
    return { data_items: null, count: 0 };
  }
  const _search_text = search_text.replace(' ', '+');
  let all_data_items: any = [];
  let _count = 0;
  for (
    let start_page = 1;
    start_page <= page && _search_text;
    start_page += 1
  ) {
    const key = `${search_type}_${_search_text.toLowerCase()}_${start_page}_${per_page}`;
    const { data_items = [], count = 0 } = items[key] || {};
    all_data_items = all_data_items.concat(data_items);
    _count = count;
  }
  return { data_items: all_data_items, count: _count };
};

export const _hasMore = (total: number, page: number): boolean => {
  return page <= Math.ceil(total / PER_PAGE);
};
