import EditorMenuBar from "./menubar/EditorMenuBar";
import { createContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Editor from "./editor/Editor";
import FramesList from "./frames-list/framesListSideBarView";
import EffectSelector from "./effect/EffectSelector";
import PreviewSelector from "./preview/previewSelector";
import useFrameEditor from "@/hooks/useFrameEditor";
import PreviewVideo from "./preview/previewVideo";
import AnimationController from "./AnimationController/AnimationController";
import { AnimationContext } from "@/types/frame";

export enum SelectAction {
  Edit = "edit",
  Frame = "frame",
  Video = "video",
}


const FrameEditorContext = createContext<AnimationContext>({
  animatingText: 0,
  setAnimatingText: () => 0,
})

export default function FrameEditor() {
  const [selection, setSelect] = useState<SelectAction>(SelectAction.Edit);
  const [animatingText, setAnimatingText] = useState(0);

  
  return (
    <FrameEditorContext.Provider value={{animatingText, setAnimatingText}}>
      <div className="flex flex-row h-screen">
      <FramesList />
      <div className="flex flex-col h-full w-1/2 ml-5 mr-5">
        <div className="flex flex-row mt-2">
          <EditorMenuBar />
          <PreviewSelector select={setSelect} />
        </div>

        <MediaController selection={selection} />

        <AnimationController/>
      </div>
      <EffectSelector />
    </div>
    </FrameEditorContext.Provider>
    
  );
}

function MediaController({ selection }: { selection: SelectAction }) {
  const { currentFrame, frames } = useFrameEditor();
  if (selection === SelectAction.Edit) {
    return (
      <DndProvider backend={HTML5Backend}>
        <Editor />
      </DndProvider>
    );
  } else if (selection === SelectAction.Frame) {
    return <PreviewVideo frames={[frames[currentFrame]]} />;
  }
  return <PreviewVideo frames={frames} />;
}
