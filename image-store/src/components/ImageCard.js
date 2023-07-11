import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCartPlus, BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import '../styles/ImageCard.css';
import { Button, Card, styled } from '@mui/material';
import { UserContext } from '../contexts/UserContext';

const CartButton = styled(Button)(({ theme, disabled }) => ({
  padding: '0.5rem 1rem',
  backgroundColor: disabled ? theme.palette.grey[400] : '#ffe666',
  color: disabled ? theme.palette.text.secondary : '#1c1c1b',
  '&:hover': {
    backgroundColor: disabled ? theme.palette.grey[400] : '#ffd900',
  },
}));

const ImageCard = ({ image }) => {
  const { user, handleAddToCart, handleToggleLike } = useContext(UserContext);

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isLiked =
    userInfo &&
    userInfo.likes.some((likedImage) => likedImage._id === image._id);
  const isInCart =
    userInfo && userInfo.cart.some((cartImage) => cartImage._id === image._id);

  return (
    <>
      <div className="col-3 mt-3">
        <Card
          variant="outlined"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="image-card position-relative">
            <div className="like-icon position-absolute">
              {user && isHovered && (
                <>
                  {isLiked ? (
                    <BsSuitHeartFill
                      className="fs-2"
                      onClick={() => handleToggleLike(image._id)}
                    />
                  ) : (
                    <BsSuitHeart
                      className="fs-2"
                      onClick={() => handleToggleLike(image._id)}
                    />
                  )}
                </>
              )}
            </div>
            <Link to={`/image/${image._id}`}>
              <div className="product-image">
                <img src={image.imageSrc} alt={image.title} />
              </div>
            </Link>
            <div className="d-flex align-items-center justify-content-between">
              <div className="image-details mt-3 ms-2">
                <Link to={`/image/${image._id}`}>
                  <h5 className="image-title">
                    {image.title.length > 15
                      ? `${image.title.substr(0, 14)}...`
                      : `${image.title.substr(0, 14)}`}
                  </h5>
                </Link>
                <p className="image-price">${image.price} </p>
              </div>
              <div className="action-bar">
                <CartButton
                  className="addToCart p-2 me-2"
                  onClick={() => handleAddToCart(image._id)}
                  disabled={isInCart}
                >
                  {isInCart ? (
                    <>Already In Cart</>
                  ) : (
                    <>
                      Add To Cart <BsCartPlus className="fs-4 ms-2" />
                    </>
                  )}
                </CartButton>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ImageCard;
