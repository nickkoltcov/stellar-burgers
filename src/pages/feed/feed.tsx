import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedSelector, getFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(feedSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
};
