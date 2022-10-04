import React from 'react';
import { motion } from 'framer-motion';
import '../css/LoadingComponent.css';

export default function LoadingComponent() {
  return (
    <motion.div
      className="loadingScreen"
      initial={ { opacity: 0 } }
      animate={ { opacity: 1 } }
      exit={ { opacity: 0 } }
    >
      <div className="loader" />
      Carregando...
    </motion.div>
  );
}
