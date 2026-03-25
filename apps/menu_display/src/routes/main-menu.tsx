import { Link, useLoaderData } from 'react-router-dom';
import './main-menu.css';
import { CanvasFileData } from '@repo/types/canvasItem.schema';

function MainMenu() {
  const canvasData: CanvasFileData[] = useLoaderData();
  // const canvasData: any[] = [
  //   { name: 'Canvas 1', id: 1, content: 'Content for Canvas 1', createdAt: '2026-03-20' },
  //   { name: 'Canvas 2', id: 2, content: 'Content for Canvas 2', createdAt: '2026-03-22' },
  //   { name: 'Canvas 3', id: 3, content: 'Content for Canvas 3', createdAt: '2026-03-24' },
  // ];

  return (
    <div className="main-menu">
      <div className="title">
        <h1>Main Menu</h1>
        <p>Choose a canvas to continue</p>
      </div>

      <div className="canvas-grid">
        {canvasData &&
          canvasData?.map((canvas) => (
            <Link to="/canvas" state={canvas.content} key={canvas.id}>
              <button className="canvas-button">
                <h2>{canvas.name}</h2>
                <p>{canvas.createdAt}</p>
              </button>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default MainMenu;
