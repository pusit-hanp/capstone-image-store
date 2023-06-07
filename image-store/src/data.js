const data = {
  images: Array.from({ length: 300 }, (_, index) => ({
    _id: index + 1,
    title: `Image ${index + 1}`,
    price: `${100 + index * 50}`,
    imageSrc: 'images/catbanner-01.jpg',
  })),
};

export default data;