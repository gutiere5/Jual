import { useState } from "react";
import { Layer, Stage } from "react-konva";

function RestaurantDisplay() {
  const [jsonText, setJsonText] = useState("");

  function handleFileUpload(e : React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

      if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          setJsonText(String(reader.result ?? ""));
        }
        reader.readAsText(file);

  }

  return (<>
  <h1>Restaurant Display</h1>
  <div>
    <h2>Upload File</h2>
    <label>

    <input 
    type="file"
    accept=".json"
    onChange={handleFileUpload}
    />
JSON Upload
    </label>
  </div>
  <div>
    <h2>JSON Content</h2>
    <pre>{jsonText}</pre>
  </div>
  </>

  <Stage width={500} height={500}>
    <Layer>
      <CanvasItems item={JSON.parse(jsonText)}/>
    </Layer>
  </Stage>
  )
}

export default RestaurantDisplay;
