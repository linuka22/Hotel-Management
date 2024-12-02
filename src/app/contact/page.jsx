'use client';  // Marking the component as a Client Component

import React, { useState } from "react";
import styles from "./ContactPage.module.css";
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for validation error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("");
    setErrorMessage(""); // Reset error message

    // Validate if all fields are filled
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      setErrorMessage("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus("Your message has been sent successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        setSubmissionStatus("There was an issue sending your message.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("There was an error submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <p className={styles.subHeader}>MAKE SOMETHING AWESOME TOGETHER</p>
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">NAME</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">PHONE NUMBER</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className={styles.input}
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">MESSAGE</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "SEND A MESSAGE"}
        </button>
      </form>

      {/* Validation Error Message */}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {/* Submission Status */}
      {submissionStatus && <p className={styles.status}>{submissionStatus}</p>}
    </div>
  );
};

export default ContactPage;
