import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "./likebutton.css"
function LikeButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button className="like-btn" onClick={handleClick}>
      <FontAwesomeIcon icon={faHeart} className="like-icon" />
      <span className="like-count">{count}</span>
    </button>
  );
}

export default LikeButton;
