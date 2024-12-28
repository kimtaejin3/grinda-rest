export const downloadImage = async (
  srcUrl: string,
  name: string
): Promise<void> => {
  try {
    const res = await fetch(srcUrl, { method: 'GET' });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
  } catch (err) {
    console.error('이미지 다운로드 실패:', err);
    throw err;
  }
};
