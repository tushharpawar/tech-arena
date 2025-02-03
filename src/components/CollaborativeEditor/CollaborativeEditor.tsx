"use client";

import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react/suspense";
import { useCallback, useEffect, useState } from "react";
import styles from "./CollaborativeEditor.module.css";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";


type CollaborativeEditorProps = {

  language: string;

  codeSnippet: string;

  onChange: (value: string) => void;

};


export function CollaborativeEditor({language,codeSnippet,onChange}:CollaborativeEditorProps) {
  const room = useRoom();
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState(codeSnippet);

  useEffect(() => {
    if(!language){
      return
    }
    setValue(codeSnippet);
    onChange(value ? value:codeSnippet)
  }, [codeSnippet]);

  useEffect(() => {
    let yProvider: LiveblocksYjsProvider;
    let yDoc: Y.Doc;
    let binding: MonacoBinding;

    if (editorRef) {
      yDoc = new Y.Doc();
      const yText = yDoc.getText("monaco");
      yProvider = new LiveblocksYjsProvider(room, yDoc);

      // Attach Yjs to Monaco
      binding = new MonacoBinding(
        yText,
        editorRef.getModel() as editor.ITextModel,
        new Set([editorRef]),
        yProvider.awareness as unknown as Awareness
      );
    }

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
      binding?.destroy();
    };
  }, [editorRef, room]);

  const handleOnMount = useCallback((editorInstance: editor.IStandaloneCodeEditor) => {
    setEditorRef(editorInstance);
  }, []);

  const onHandleChange = (newValue: string | undefined) => {
       setValue(newValue || "")
       onChange(newValue || "")
    }

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}></div>
      <div className={styles.editorContainer}>
        <Editor
          onMount={handleOnMount}
          height="100%"
          width="100hw"
          theme="vs-dark"
          language={language}
          defaultValue=""
          value={value}
          onChange={(newValue)=>onHandleChange(newValue)}
          options={{
            tabSize: 2,
            padding: { top: 20 },
          }}
        />
      </div>
    </div>
  );
}
