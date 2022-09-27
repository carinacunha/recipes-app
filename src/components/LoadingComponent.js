import React from 'react';
import '../css/LoadingComponent.css';

export default function LoadingComponent() {
  return (
    <div className="loadingScreen">
      <div className="loader" />
      Carregando...
    </div>
  );
}
