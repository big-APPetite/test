import React from 'react';
import ImagePicker from 'react-native-image-picker';

export function pickImageHandler() {
  ImagePicker.showImagePicker({
    title: 'Pick an image',
    maxWidth: 800,
    maxHeight: 600,
  });
  response => {
    if (response.error) {
      console.log('image error');
    } else {
      console.log('Image:' + response.uri);
    }
  };
}
