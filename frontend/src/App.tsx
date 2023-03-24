import { useState } from "react";
import "./App.css";
import { VideoDownloader } from "../wailsjs/go/main/App";

function App() {
  const [url, setUrl] = useState<string>("");
  const [nameVideo, setNameVideo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [resultText, setResultText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateURL = (e: any) => setUrl(e.target.value);
  const updateNameVideo = (e: any) => setNameVideo(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  function download() {
    setError("")
    setIsLoading(true);
    VideoDownloader(url, nameVideo)
      .then(updateResultText)
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <div id="App">
      {error.length !== 0 ? <p>{error}</p> : <div></div>}
      {isLoading ? <p>Descargando...</p> : <p> {resultText}</p>}
      <div id="input" className="input-box">
        <input
          onChange={updateNameVideo}
          autoComplete="off"
          type="text"
          placeholder="Nombre con el que queres guardar el video"
        />

        <input
          onChange={updateURL}
          autoComplete="off"
          type="text"
          placeholder="URL DEL VIDEO"
        />
        <button onClick={download}>Descargar video</button>
      </div>
    </div>
  );
}

export default App;
