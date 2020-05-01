import React from 'react';
import { useRouteMatch } from 'react-router-dom';

const NotFoundPage = () => {
  const match = useRouteMatch();
  return (
    <div>
      <h1> register </h1>
      <p> {JSON.stringify(match)}</p>
    </div>
  );
};

export default NotFoundPage;
