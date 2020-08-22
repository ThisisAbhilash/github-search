import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import debounce from 'lodash.debounce';

import { fetchRequest } from '../../store/items/action';
import GitLogo from '../../../../public/git-logo.png';
import CardSkeleton from '../../components/card-skeleton';
import Card from '../../components/card-list';
import { getCurrentEntityType, getAllData, _hasMore } from './util';
import './style.css';

const MAX_SIZE = 240;

const App: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const { pathname = '' } = useLocation();
  const [search_text, setSearchText] = useState<string>('');
  const [search_type, setSearchType] = useState<string>(
    getCurrentEntityType(pathname),
  );
  const [page, setPage] = useState<number>(1);

  const { data, loading } = useSelector((state: any) => state.item);
  const dispatch = useDispatch();

  const fetchDataRequest = () => {
    if (search_text.length >= 3) {
      dispatch(fetchRequest({ search_text, search_type, page }));
    }
  };
  const _setSearchText = (val: any) => {
    console.log('called with val ', val);
    setSearchText(val);
  };

  const dSetSearchText = debounce(_setSearchText, 1000);

  useEffect(() => {
    fetchDataRequest();
  }, [pathname, page, search_text]);

  useEffect(() => {
    props.history.push(`/${search_type}`);
    setPage(1);
  }, [search_type]);

  const fetchNewPageDataRequest = () => {
    setPage(page + 1);
  };

  const { data_items, count = 0 } = getAllData(
    { search_text, search_type, page },
    data,
  );
  const hasMore = _hasMore(Math.min(count, MAX_SIZE), page);

  return (
    <div className="App">
      <section className="sticky">
        <div className="dFlex margin5">
          <div className="dFlex">
            <img src={GitLogo} height={40} />
          </div>
          <div className="imageText">
            <div className="dFlex">
              <b>Github Searcher</b>
            </div>
            <div>Search user and repositories below</div>
          </div>
        </div>
        <div className="dFlex margin5 pad5">
          <input
            id="search_text"
            type="text"
            placeholder="Start typing to search..."
            onChange={(evt) => dSetSearchText(evt.target.value)}
          />
          <select
            id="search_type"
            name="search_type"
            className="mLeft10"
            value={search_type}
            onChange={(evt) => setSearchType(evt.target.value)}
          >
            <option value="users">Users</option>
            <option value="repositories">Repositories</option>
          </select>
        </div>
      </section>
      <section>
        {loading && <CardSkeleton size={30} page={page} />}
        {!loading && data_items && search_text.length >= 3 && (
          <>
            <h2 className="section-title">
              Showing {count} {search_type} for &quot;{search_text}&quot;
            </h2>
            <InfiniteScroll
              loadMore={fetchNewPageDataRequest}
              hasMore={hasMore}
              loader={
                hasMore ? (
                  <CardSkeleton size={6} page={page + 1} />
                ) : (
                  <span>Done</span>
                )
              }
            >
              <ul className="list">
                {data_items.map((k: any) => (
                  <Card key={k.id} {...k} search_type={search_type} />
                ))}
              </ul>
            </InfiniteScroll>
          </>
        )}
      </section>
    </div>
  );
};

export default App;
