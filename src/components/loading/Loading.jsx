import React from 'react';
import styles from './Loading.module.css'; // Import your CSS module for styling

const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.plane}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
