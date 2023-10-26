export default function takeScreenshot() {
  const canvas = document.createElement('canvas');
  canvas.width = video.width;
  canvas.height = video.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Сохранить скриншот в массиве
  faceData.push(canvas.toDataURL('image/png'));

  // Отобразить скриншот в <div> с идентификатором 'screenshotsContainer'
  const img = document.createElement('img');
  img.src = canvas.toDataURL('image/png');
  screenshotsContainer.appendChild(img);
}