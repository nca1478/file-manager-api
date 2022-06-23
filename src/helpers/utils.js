export const getFilenameFromURL = (url) => {
    const urlImage = url.split("/");
    return urlImage[urlImage.length - 1];
};
