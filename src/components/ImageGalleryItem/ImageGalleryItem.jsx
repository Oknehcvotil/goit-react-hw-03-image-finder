const ImageGalleryItem = ({ id, img, alt }) => {
  return (
    <li id={id}>
      <img src={img} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
