const getAspectRatio = (width, height) => (width > height) ? width / height : height / width;

const getBiggestSide = (image) => {
  if (image.width > image.height || image.width === image.height) {
    return image.width;
  }
  return image.height;
};

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

  if (frameWidthBiggest === -1) {
    if (imageWidthBiggest === -1) {
      newImageSize.width = frame.width;
      newImageSize.height = frame.height;
    } else if (imageWidthBiggest) {
      newImageSize.width = frame.width;
      newImageSize.height = Math.floor(frame.width / imageAspectRatio);
    } else {
      newImageSize.width = Math.floor(frame.height / imageAspectRatio);
      newImageSize.height = frame.height;
    }
  } else if (frameWidthBiggest) {
    if (imageWidthBiggest === -1) {
      newImageSize.width = frame.height;
      newImageSize.height = frame.height;
    } else if (imageWidthBiggest) {
      newImageSize.width = frame.width;
      newImageSize.height = Math.floor(frame.width / imageAspectRatio);
    } else {
      newImageSize.width = Math.floor(frame.height / imageAspectRatio);
      newImageSize.height = frame.height;
    }
  } else {
    if (imageWidthBiggest === -1) {
      newImageSize.width = frame.width;
      newImageSize.height = frame.width;
    } else if (imageWidthBiggest) {
      newImageSize.width = frame.width;
      newImageSize.height = Math.floor(frame.width / imageAspectRatio);
    } else {
      newImageSize.width = Math.floor(frame.height / imageAspectRatio);
      newImageSize.height = frame.height;
    }
  }

  return newImageSize;
};

export default resize;
