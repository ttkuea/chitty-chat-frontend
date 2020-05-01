import React from 'react';
import { useRouteMatch } from 'react-router-dom';

const NotFoundPage = () => {
  const match = useRouteMatch();
  return (
    <div>
      <h1> 404 Not found </h1>
      <p>oil</p>
    </div>
  );
};

export default NotFoundPage;
