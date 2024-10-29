"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faTv, faParking, faWifi, faShower, faCogs, faSwimmingPool, faBanSmoking } from '@fortawesome/free-solid-svg-icons';
import styles from './Facilities.module.css';

const Facilities = () => {
  const facilities = [
    { icon: faBed, label: 'KING SIZE BED' },
    { icon: faTv, label: 'LARGE SCREEN TV' },
    { icon: faParking, label: 'FREE PARKING' },
    { icon: faWifi, label: 'FREE WIFI' },
    { icon: faShower, label: 'HOT & COLD WATER' },
    { icon: faCogs, label: 'QUICK SERVICE' },
    { icon: faSwimmingPool, label: 'SWIMMING POOL' },
    { icon: faBanSmoking, label: 'SMOKING FREE' },
  ];

  return (
    <div className={styles.facilitiesContainer}>
      <h2 className={styles.title}>FACILITIES</h2>
      <div className={styles.facilitiesGrid}>
        {facilities.map((facility, index) => (
          <div key={index} className={styles.facilityItem}>
            <FontAwesomeIcon icon={facility.icon} size="4x" className={styles.icon} />
            <p>{facility.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
