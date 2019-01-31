import createUrl from "./index";

const getPie = async (page, itemsPerPage, keyword = "", extra_params = {}) => {
  const params = {
    _page: page,
    _limit: itemsPerPage,
    ...(keyword && { q: keyword }),
    ...extra_params
  };
  const url = createUrl("pies", params);
  const response = await fetch(url);

  if (response.ok) {
    return {
      results: await response.json(),
      totalItems: await response.headers.get("X-Total-Count")
    };
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};

export default getPie;
