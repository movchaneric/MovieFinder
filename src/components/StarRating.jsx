import { useState } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  defaultValue = 0,
  onSetRating,
}) => {
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize: `${size / 1.5}px`,
  };

  const [rating, setRating] = useState(
    defaultValue <= maxRating ? defaultValue : maxRating
  );

  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    onSetRating(rating);
  };

  return (
    <>
      <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
          {Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              clickRateValue={() => handleRating(i + 1)}
              isFull={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onHoverEnter={() => setTempRating(i + 1)}
              onHoverExit={() => setTempRating(0)}
              color={color}
              size={size}
            />
          ))}
        </div>
        <p style={textStyle}>{tempRating || rating || ""}</p>
      </div>
    </>
  );
};

export default StarRating;
