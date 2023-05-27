import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDisplayError } from '../hooks';
import { useDisplayNotification } from '../hooks/useDisplayNotification';
import { useNetwork } from '../hooks';
import ErrorHandler from './ErrorHandler';
import Loading from './Loading';
import NotificationHandler from './NotificationHandler';
import Header from './Header';

export default function Global(props: any) {
  const { error, deleteAfterExpiryTime, addError } = useDisplayError();
  const { notification, deleteAfterExpiryTimeNotification, addNotification } =
    useDisplayNotification();
  const { isOnline, isOffline, networkError } = useNetwork();
  useEffect(() => {
    const aTags = document.getElementsByTagName('a');
    const buttons = document.getElementsByTagName('button');
    if (!isOnline) {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('disabled', 'true');
      }
      for (let i = 0; i < aTags.length; i++) {
        aTags[i].setAttribute('disabled', 'true');
      }
    } else {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute('disabled');
      }
      for (let i = 0; i < aTags.length; i++) {
        aTags[i].removeAttribute('disabled');
      }
    }
  }, [isOnline]);
  return (
    <div className="relative grid-rows-[auto_1fr] grid overflow-hidden">
      {isOffline ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Outlet context={{ addError, addNotification }} />
          <ErrorHandler
            error={error}
            deleteAfterExpiryTime={deleteAfterExpiryTime}
          />
          <NotificationHandler
            notification={notification}
            deleteAfterExpiryTime={deleteAfterExpiryTimeNotification}
          />
        </>
      )}
    </div>
  );
}
