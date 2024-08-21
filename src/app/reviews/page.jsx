"use client";
import React, { useState } from 'react';
import Image from 'next/image'; // Import the Image component from Next.js
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './reviews.module.css';

const ReviewPage = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [visitStatus, setVisitStatus] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    ads: false,
    business: false,
    location: false,
    price: false,
    recommendation: false,
    recreational: false,
    reputation: false,
    regular: false,
  });
  const [otherReason, setOtherReason] = useState('');
  const [feedback, setFeedback] = useState({
    checkInStaff: "",
    luggageAssist: "",
    roomService: "",
    pool: "",
    fitnessCenter: "",
    gameRoom: "",
    hotelSafety: "",
  });
  const [stay, setstay] = useState('');
  const [again, setagain] = useState('');
  const [recommend, setrecommend] = useState('');
  const [comments, setComments] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setCheckboxes({
      ...checkboxes,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", { checkInDate, checkOutDate, visitStatus, feedback, checkboxes, otherReason, stayLikelihood });
    // Add logic to send form data to the server or API endpoint
  };

  return (
    <div className={styles.container}>
      <banner className={styles.bannerContainer}>
          <Image 
            src="/feedback.jpg" // Ensure the correct path to the image
            alt="Feedback Emoticons"
            className={styles.bannerImage} // Apply the new CSS class
            width={1300} // Optional: Set width (can be handled by CSS)
            height={300} // Optional: Set height (can be handled by CSS)
          />
      </banner>

      
      <date className={styles.dateContainer}>
        <cin className={styles.checkInOutText}>
          <label htmlFor="checkInDate">Check in : </label>
          <DatePicker
            selected={checkInDate}
            onChange={date => setCheckInDate(date)}
            id="checkInDate"
          />
        </cin>

        <cout className={styles.checkInOutText}>
          <label htmlFor="checkOutDate">Check out : </label>
          <DatePicker
            selected={checkOutDate}
            onChange={date => setCheckOutDate(date)}
            id="checkOutDate"
          />
        </cout>
      </date>
      
      
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className={styles.questionContainer}>
            <label htmlFor="visitStatus">Was this your first visit to our hotel?</label>
            <div className={styles.radioContainer}>
              <label>
                <input
                  type="radio"
                  name="visitStatus"
                  value="yes"
                  checked={visitStatus === 'yes'}
                  onChange={e => setVisitStatus(e.target.value)}
                  className={styles.radio}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="visitStatus"
                  value="no"
                  checked={visitStatus === 'no'}
                  onChange={e => setVisitStatus(e.target.value)}
                  className={styles.radio}
                />
                No
              </label>
            </div>
          </div>
          
          <div className={styles.inputContainer}>
            <div className={styles.questionContainer}>
              <label>What influenced your decision to stay at our hotel?</label>
              <div className={styles.checkboxContainer}>
                <label>
                  <input
                    type="checkbox"
                    name="ads"
                    checked={checkboxes.ads}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  Advertisements
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="business"
                    checked={checkboxes.business}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  Business reasons
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="location"
                    checked={checkboxes.location}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  Location
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="price"
                    checked={checkboxes.price}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  Price
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="recommendation"
                    checked={checkboxes.recommendation}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  Recommended by someone I know
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="recreational"
                    checked={checkboxes.recreational}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  Recreational facilities
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="reputation"
                    checked={checkboxes.reputation}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  Reputation
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="regular"
                    checked={checkboxes.regular}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  I'm a regular customer
                </label>
                <div>
                  <label>Other: </label>
                  <input
                    type="text"
                    value={otherReason}
                    onChange={e => setOtherReason(e.target.value)}
                    className={styles.textInput}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.feedbackContainer}>
            <div className={styles.questionContainer}>
              <label>Feedback on Hotel Services</label>
              <table className={styles.feedbackTable}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Strongly Agree</th>
                    <th>Agree</th>
                    <th>Neutral</th>
                    <th>Disagree</th>
                    <th>Strongly Disagree</th>
                    <th>N/A</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "The check-in staff was polite", name: "checkInStaff" },
                    { label: "Someone was available to assist with my luggage", name: "luggageAssist" },
                    { label: "Room service was prompt", name: "roomService" },
                    { label: "The pool was adequate", name: "pool" },
                    { label: "The fitness center was adequate", name: "fitnessCenter" },
                    { label: "The game room was adequate", name: "gameRoom" },
                    { label: "The hotel felt safe", name: "hotelSafety" },
                  ].map((item, index) => (
                    <tr key={index}>
                      <th className={styles.serviceLabel}>{item.label}</th>
                      {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree", "N/A"].map((option, i) => (
                        <td key={i} className={styles.radioGroup}>
                          <label className={styles.radioLabel}>
                            <input
                              type="radio"
                              name={item.name}
                              value={option}
                              checked={feedback[item.name] === option}
                              onChange={handleFeedbackChange}
                              className={styles.radio}
                            />
                          </label>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.feedbackContainer}>
            <div className={styles.questionContainer}>
              <label>Feedback on Room Quality</label>
              <table className={styles.feedbackTable}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Strongly Agree</th>
                    <th>Agree</th>
                    <th>Neutral</th>
                    <th>Disagree</th>
                    <th>Strongly Disagree</th>
                    <th>N/A</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "The room was clean", name: "roomCleanliness" },
                    { label: "The furniture was in good condition", name: "furnitureCondition" },
                    { label: "The bed was comfortable", name: "bedComfort" },
                    { label: "The lighting was adequate", name: "roomLighting" },
                    { label: "The temperature was appropriate", name: "roomTemperature" },
                    { label: "The TV had good reception", name: "tvReception" },
                    { label: "The room had a nice view", name: "roomView" },
                    { label: "The room was quiet", name: "roomQuietness" },
                    { label: "Housekeeping kept the room in order", name: "housekeeping" }
                  ].map((item, index) => (
                    <tr key={index}>
                      <th className={styles.serviceLabel}>{item.label}</th>
                      {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree", "N/A"].map((option, i) => (
                        <td key={i} className={styles.radioGroup}>
                          <label className={styles.radioLabel}>
                            <input
                              type="radio"
                              name={item.name}
                              value={option}
                              checked={feedback[item.name] === option}
                              onChange={handleFeedbackChange}
                              className={styles.radio}
                            />
                          </label>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

  <div className={styles.inputContainer}>
  <div className={styles.questionContainer}>
    <label htmlFor="stayLikelihood">How likely is it that you will stay with us again?</label>
    <div id="rating" className={styles.ratingContainer}>
      <span className={styles.ratingLabel}>Not Likely</span>
      <div className={styles.ratingOptions}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(value => (
          <label key={value} className={styles.ratingOption}>
            <input
              type="radio"
              name="stay"
              value={value}
              checked={stay === value.toString()}
              onChange={e => setstay(e.target.value)}
              className={styles.radio}
            />
            <span className={styles.radioText}>{value}</span>
          </label>
        ))}
      </div>
      <span className={styles.ratingLabel}>Very Likely</span>
    </div>
  </div>
</div>

<div className={styles.inputContainer}>
  <div className={styles.questionContainer}>
    <label htmlFor="stayLikelihood">Overall, how do you rate your stay? </label>
    <div id="rating" className={styles.ratingContainer}>
      <span className={styles.ratingLabel}>Terrible</span>
      <div className={styles.ratingOptions}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(value => (
          <label key={value} className={styles.ratingOption}>
            <input
              type="radio"
              name="again"
              value={value}
              checked={again === value.toString()}
              onChange={e => setagain(e.target.value)}
              className={styles.radio}
            />
            <span className={styles.radioText}>{value}</span>
          </label>
        ))}
      </div>
      <span className={styles.ratingLabel}>Wonderful</span>
    </div>
  </div>
</div>

<div className={styles.inputContainer}>
  <div className={styles.questionContainer}>
    <label htmlFor="stayLikelihood">How likely is it that you will recommend us to others? </label>
    <div id="rating" className={styles.ratingContainer}>
      <span className={styles.ratingLabel}>Not Likely</span>
      <div className={styles.ratingOptions}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map(value => (
          <label key={value} className={styles.ratingOption}>
            <input
              type="radio"
              name="recommend"
              value={value}
              checked={recommend === value.toString()}
              onChange={e => setrecommend(e.target.value)}
              className={styles.radio}
            />
            <span className={styles.radioText}>{value}</span>
          </label>
        ))}
      </div>
      <span className={styles.ratingLabel}>Very Likely</span>
    </div>
  </div>
</div>

<div className={styles.questionContainer}>
        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          name="comments"
          value={comments}
          onChange={e => setComments(e.target.value)}
          className={styles.textInput}
          rows="4" // Adjusts the height of the text box
          placeholder="Write your comments here..."
        />
      </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      
    </div>
  );
};

export default ReviewPage;
