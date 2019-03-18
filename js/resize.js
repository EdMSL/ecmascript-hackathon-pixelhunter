const resize = (frame, image) => {
  const newImageSize = {};
  const frameMinSize = Math.min(frame.width, frame.height);

  const widthRatio = frame.width / image.width;
  const heightRatio = frame.height / image.height;

  if (image.width === image.height) {
    newImageSize.width = newImageSize.height = frameMinSize;
  } else {
    newImageSize.width = (widthRatio < heightRatio) ? frame.width : Math.floor(heightRatio * image.width);
    newImageSize.height = (widthRatio < heightRatio) ? Math.floor(widthRatio * image.height) : frame.height;
  }

  return newImageSize;
};

export default resize;
