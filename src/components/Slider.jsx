"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Slider.module.css";

const Slider = () => {
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const images1 = [
    "/hroom1.jpg",
    "/hroom2.jpg",
    "/hroom3.jpg",
  ];
  
  const images2 = [
    "/food1.jpg",
    "/food2.jpg",
    "/food3.jpg",
  ];
  
  const images3 = [
    "/drink1.jpg",
    "/drink2.jpg",
    "/drink3.jpg",
  ];
  

  const goToSlide1 = (index) => {
    setCurrentIndex1(index);
  };

  const goToSlide2 = (index) => {
    setCurrentIndex2(index);
  };

  const goToSlide3 = (index) => {
    setCurrentIndex3(index);
  };

  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  return (
    <div className={styles.slidersContainer}>
      {/* First Slider */}
      <div className={styles.sliderContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={images1[currentIndex1]}
            alt={`Slide ${currentIndex1 + 1}`}
            width={350}
            height={350}
            className={styles.image}
          />
          <div className={styles.dotsContainer}>
            {images1.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  currentIndex1 === index ? styles.activeDot : ""
                }`}
                onClick={() => goToSlide1(index)}
              ></span>
            ))}
          </div>
        </div>
        <div className={styles.detailsBox1}>
          <p>FULLY AIR CONDITION</p>
          <p>FREE WI-FI</p>
          <p>MINI BAR</p>
          <p>COFFEE/TEA MAKER</p>
          <p>IN-ROOM DINING SERVICE</p>
          <p className={styles.viewMore} onClick={() => openPopup("room")}>
            VIEW MORE...
          </p>
        </div>
      </div>

      {/* Second Slider */}
      <div className={styles.sliderContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={images2[currentIndex2]}
            alt={`Slide ${currentIndex2 + 1}`}
            width={350}
            height={350}
            className={styles.image}
          />
          <div className={styles.dotsContainer}>
            {images2.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  currentIndex2 === index ? styles.activeDot : ""
                }`}
                onClick={() => goToSlide2(index)}
              ></span>
            ))}
          </div>
        </div>
        <div className={styles.detailsBox2}>
          <p>OPEN FROM 9 AM - 23HRS</p>
          <p>SIGNATURE DISHES</p>
          <p>SPECIAL GUEST DISCOUNTS</p>
          <p>HANDCRAFTED DESSERTS</p>
          <p>EXCLUSIVE PRIVATE DINING</p>
          <p className={styles.viewMore} onClick={() => openPopup("food")}>
            VIEW MORE
          </p>
        </div>
      </div>

      {/* Third Slider */}
      <div className={styles.sliderContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={images3[currentIndex3]}
            alt={`Slide ${currentIndex3 + 1}`}
            width={350}
            height={350}
            className={styles.image}
          />
          <div className={styles.dotsContainer}>
            {images3.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  currentIndex3 === index ? styles.activeDot : ""
                }`}
                onClick={() => goToSlide3(index)}
              ></span>
            ))}
          </div>
        </div>
        <div className={styles.detailsBox3}>
          <p>OPEN FROM 10 AM - 23 HRS</p>
          <p>WEEKEND LIVE ENTERTAINMENTS</p>
          <p>EXCLUSIVE PROMOTIONS</p>
          <p>EXCLUSIVE WINES</p>
          <p>FRIENDLY ENVIRONMENT</p>
          <p className={styles.viewMore} onClick={() => openPopup("drink")}>
            VIEW MORE...
          </p>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h2>
              {popupContent === "room"
                ? "Room Details"
                : popupContent === "food"
                ? "Food Details"
                : popupContent === "drink"
                ? "Drink Details"
                : ""}
            </h2>
            {popupContent === "room" && (
              <>
                <Image
                  src="/room1.jpg"
                  alt="Room Details"
                  width={400}
                  height={300}
                />
                <p>
                  The Deluxe Suite offers an elevated level of luxury and
                  comfort, featuring spacious living areas, elegant furnishings,
                  and premium amenities. Guests can enjoy a separate bedroom, a
                  large living area with a sofa, and often an additional dining
                  space. The suite is designed with high-end finishes and
                  provides stunning views, making it perfect for those seeking a
                  more opulent and expansive stay.
                </p>
              
                <Image
                  src="/room2.jpg"
                  alt="Room Details"
                  width={400}
                  height={300}
                />
                <p>
                  The Superior Room is a stylish and well-appointed space
                  designed for maximum comfort and convenience. It includes
                  modern furnishings, a comfortable bed, and high-quality
                  amenities. The Superior Room typically offers more space than
                  a standard room and often includes additional features such as
                  a larger work desk, enhanced décor, and upgraded bath
                  amenities.
                </p>
              
                <Image
                  src="/room3.jpg"
                  alt="Room Details"
                  width={400}
                  height={300}
                />
                <p>
                  The Standard Room provides a cozy and functional space ideal
                  for both business and leisure travelers. It is thoughtfully
                  designed with comfortable furnishings, essential amenities,
                  and a welcoming atmosphere. The Standard Room offers a
                  relaxing retreat with all the necessary features for a
                  pleasant stay, including a comfortable bed, a work desk, and a
                  well-equipped bathroom.
                </p>
                
                <Image
                  src="/room4.jpg"
                  alt="Room Details"
                  width={400}
                  height={300}
                />
                <p>
                  The Executive Room is tailored for the discerning traveler who
                  values both style and practicality. It combines modern
                  elegance with functional amenities such as a spacious work
                  desk, high-speed internet, and comfortable seating. The
                  Executive Room is designed to cater to business needs while
                  providing a relaxing and comfortable environment for rest and
                  rejuvenation.
                </p>
                
                
              </>
            )}
            {popupContent === "food" && (
              <>
                <Image
                  src="/restuarant.jpg"
                  alt="Restuarant Details"
                  width={400}
                  height={300}
                />
                <p>
                  Our hotel restaurant is a culinary haven designed to provide an exceptional dining experience. Open from 9 AM to 11 PM, the
                  restaurant offers a diverse menu featuring signature dishes crafted with the finest ingredients. Guests can enjoy special
                  discounts, particularly curated for our esteemed visitors, and indulge in handcrafted desserts that showcase our pastry chef&apos;s
                  creativity. For those seeking an exclusive dining experience, we offer private dining options, perfect for special occasions or
                  intimate gatherings. Whether you&apos;re here for breakfast, lunch, or dinner, our restaurant promises a delightful and memorable
                  culinary journey.
                </p>
              </>
            )}
            {popupContent === "drink" && (
              <>
                <Image
                  src="/bar.jpg"
                  alt="Bar Details"
                  width={400}
                  height={300}
                />
                <p>The hotel bar offers a vibrant and welcoming atmosphere, open daily from 10 AM to 11 PM. Guests can enjoy live entertainment on weekends, creating an engaging and lively environment. The bar features exclusive promotions on select days, offering unique deals on drinks and more. A curated selection of exclusive wines is available for guests looking to indulge in premium beverages. The friendly and inviting setting makes it a perfect spot to unwind, socialize, and enjoy the best of what the hotel has to offer.</p>
              </>
            )}
            <button className={styles.closeButton} onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider
