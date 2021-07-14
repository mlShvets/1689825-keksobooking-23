const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'avif', 'webp'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');

const renderPictures = (picture) => {

  const pictureView = picture === 'avatar' ? fileChooserAvatar : fileChooserPhoto;

  pictureView.addEventListener('change', () => {
    const file = pictureView.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        if (picture === 'avatar') {
          previewAvatar.src = reader.result;
        }

        if (picture === 'photo') {
          previewPhoto.style.backgroundSize = 'cover';
          previewPhoto.style.backgroundPosition = 'center';
          previewPhoto.style.backgroundRepeat = 'no-repeat';
          previewPhoto.style.backgroundImage = `url('${reader.result}')`;
        }
      });

      reader.readAsDataURL(file);
    }
  });
};

renderPictures('avatar');
renderPictures('photo');

export { previewAvatar, previewPhoto, renderPictures };
