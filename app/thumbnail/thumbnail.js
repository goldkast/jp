document.addEventListener('DOMContentLoaded', () => {
  const youtubeInput = document.getElementById('youtubeUrl');
  const youtubeButton = document.getElementById('loadYoutubeThumb');
  const canvas = document.getElementById('thumbCanvas');
  const stage = document.getElementById('thumbnailStage');
  const status = document.getElementById('thumbStatus');

  if (!youtubeInput || !youtubeButton || !canvas || !stage || !status) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    status.textContent = 'キャンバスの初期化に失敗しました。';
    return;
  }

  let currentObjectUrl = null;

  const setStageEmpty = (isEmpty) => {
    stage.classList.toggle('is-empty', isEmpty);
  };

  const setStatus = (message) => {
    status.textContent = message;
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawImageToCanvas = (img) => {
    clearCanvas();
    const scale = Math.min(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2;
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const revokeObjectUrl = () => {
    if (currentObjectUrl) {
      URL.revokeObjectURL(currentObjectUrl);
      currentObjectUrl = null;
    }
  };

  const loadImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setStageEmpty(true);
      setStatus('画像ファイルを選択してください。');
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    currentObjectUrl = objectUrl;

    img.onload = () => {
      drawImageToCanvas(img);
      setStageEmpty(false);
      setStatus(`読み込み完了：${file.name}`);
      revokeObjectUrl();
    };

    img.onerror = () => {
      setStageEmpty(true);
      setStatus('画像の読み込みに失敗しました。');
      revokeObjectUrl();
    };

    img.src = objectUrl;
  };

  const extractYoutubeId = (url) => {
    if (!url) return null;
    const trimmed = url.trim();
    const patterns = [
      /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{6,})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/
    ];
    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const loadYoutubeThumbnail = (videoId) => {
    if (!videoId) {
      setStageEmpty(true);
      setStatus('YouTube URL から動画IDを取得できませんでした。');
      return;
    }

    const primaryUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const fallbackUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const img = new Image();

    img.onload = () => {
      drawImageToCanvas(img);
      setStageEmpty(false);
      setStatus('YouTube サムネイルを読み込みました。');
    };

    img.onerror = () => {
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        drawImageToCanvas(fallbackImg);
        setStageEmpty(false);
        setStatus('YouTube サムネイル（hqdefault）を読み込みました。');
      };
      fallbackImg.onerror = () => {
        setStageEmpty(true);
        setStatus('サムネイルの取得に失敗しました。URLを確認してください。');
      };
      fallbackImg.src = fallbackUrl;
    };

    img.src = primaryUrl;
  };

  setStageEmpty(true);
  clearCanvas();

  youtubeButton.addEventListener('click', () => {
    const url = youtubeInput.value;
    const videoId = extractYoutubeId(url);
    loadYoutubeThumbnail(videoId);
  });

  youtubeInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const videoId = extractYoutubeId(youtubeInput.value);
    loadYoutubeThumbnail(videoId);
  });
});
