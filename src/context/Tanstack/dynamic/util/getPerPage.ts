import { PAGE_SIZE } from './const';

interface Props {
  perPage: number;
  page: number;
}
// default page siz is PAGE_SIZE, ie 20
// If user selects per page at 40, then we need to get fromPage and toPage
// if perPage = 20 (ie default) then fromPage and toPage both same number
// if perPage = 30
export const getPerPage = ({ perPage, page }: Props) => {
  const fromPage = page;
  const inc = perPage > PAGE_SIZE ? Math.ceil(perPage / PAGE_SIZE) - 1 : page;
  const toPage = fromPage + inc;
  return { fromPage, toPage };
};
