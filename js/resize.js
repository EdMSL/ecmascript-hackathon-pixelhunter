const getAspectRatio = (width, height) => (width > height) ? width / height : height / width;

const isWidthBiggest = (image) => {
  if (image.width > image.height) {
    return true;
  } else if (image.width < image.height) {
    return false;
  } else {
    return -1;
  }
};

const resize = (frame, image) => {
  const newImageSize = {};

  const imageAspectRatio = getAspectRatio(image.width, image.height);

  const frameWidthBiggest = isWidthBiggest(frame);
  const imageWidthBiggest = isWidthBiggest(image);

  if (frameWidthBiggest && imageWidthBiggest === -1) {
    newImageSize.width = newImageSize.height = frame.height;
  } else if (!frameWidthBiggest && imageWidthBiggest === -1) {
    newImageSize.width = newImageSize.height = frame.width;
  } else {
    newImageSize.width = (imageWidthBiggest) ? frame.width : Math.floor(frame.height / imageAspectRatio);
    newImageSize.height = (imageWidthBiggest) ? Math.floor(frame.width / imageAspectRatio) : frame.height;
  }

  return newImageSize;
};

export default resize;
