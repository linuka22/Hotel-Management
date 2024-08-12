import React from 'react';
import styles from './ContactPage.module.css';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';

const ContactPage = () => {
  return (
    <div className={styles.container}>
      {/* Banner Section */}
      <div className={styles.banner}>
        <h2 className={styles.bannerText}>
          <span className={styles.redText}>KEEP IN TOUCH</span>
          <span className={styles.whiteText}> WITH US</span>
        </h2>
      </div>
      
      {/* Subheader Section */}
      <div className={styles.subHeaderContainer}>
        <p className={styles.subHeader}>LET'S MAKE SOMETHING AWESOME TOGETHER</p>
        <div className={styles.icons}>
          <MapPinIcon className={styles.icon} />
          <EnvelopeIcon className={styles.icon} />
          <PhoneIcon className={styles.icon} />
        </div>
      </div>

      {/* Information Boxes */}
      <div className={styles.infoBoxesContainer}>
        <div className={styles.row}>
          <div className={styles.infoBox}>
            <MapPinIcon className={styles.icon} />
            <p>No.233, Kandy Road, Gampaha.</p>
          </div>
          <div className={styles.infoBox}>
            <EnvelopeIcon className={styles.icon} />
            <p>info@ardilla.lk</p>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.infoBox}>
            <PhoneIcon className={styles.icon} />
            <p>+94 333 154 220<br />+94 706 710 010<br />+94 706 696 981<br />+94 703 021 025</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">NAME</label>
          <input type="text" id="name" name="name" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">PHONE NUMBER</label>
          <input type="text" id="phone" name="phone" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" name="email" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">MESSAGE</label>
          <textarea id="message" name="message" rows="4" className={styles.textarea}></textarea>
        </div>
        <button type="submit" className={styles.button}>SEND A MESSAGE</button>
      </form>
    </div>
  );
};

export default ContactPage;

