import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false
});
 type Editor = {
    setFieldValue : (name:string,text:string) =>{}
    content :any
}

export default function SunEditorComponent({setFieldValue,content}:Editor) {
    // const [content, setContent] = useState("");
    // console.log("--content-",content);
    

    

    return (
        <div>
            <SunEditor
                name="content"
                defaultValue={content}
                onChange={(text) => {
                    setFieldValue('contentBody',text)
                }}
                setDefaultStyle="font-family: DM Sans; font-size: 16px;"
                setOptions={{
                    maxWidth: '800px',
                    minWidth: '400px',
                    minHeight: "300px",
                    maxHeight: "600px",
                    videoWidth: '80%',
                    font: [
                        "DM Sans",
                        "Arial",
                        "Comic Sans MS",
                        "Courier New",
                        
                        // Add other fonts here
                    ],
                    buttonList: [
                        [
                            "undo", "redo",
                            "formatBlock",
                            "font",
                            "fontSize",
                            "fontColor",
                            "align",
                            "paragraphStyle",
                        ],
                        [
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "subscript",
                            "superscript"
                        ],
                        ["removeFormat"],
                        ["outdent", "indent"],
                        ["table", "list", "lineHeight"],
                        [
                            "link", "image", "video", "showBlocks", "codeView", 'preview', 'print',
                        ]
                    ]
                }}
                
            />
        </div>
    );
}
