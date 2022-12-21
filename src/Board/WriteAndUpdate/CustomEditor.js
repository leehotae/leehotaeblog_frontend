/*import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import axios from "axios";*/
import React, { Component } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import axios from "axios";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Clipboard from "@ckeditor/ckeditor5-clipboard/src/clipboard";

const customUploadAdapter = (loader) => {
  // (2)
  return {
    upload() {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        loader.file.then((file) => {
          data.append("image", file);

          axios({
            url: "api/image",
            method: "POST",
            data: data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((res) => {
              console.log(res);
              resolve({
                default: `${axios.defaults.baseURL + "/upload"}/${
                  res.data.data.imageUrl
                }`,
              });
            })
            .catch((err) => {
              console.log("ce er" + err);
              reject(err.response.data.message);
            });
        });
      });
    },
  };
};

function uploadPlugin(editor) {
  // (3)
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return customUploadAdapter(loader);
  };
}

const editorConfiguration = {
  plugins: [
    Heading,
    Essentials,
    Bold,
    Italic,
    Paragraph,
    Alignment,
    BlockQuote,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,
    Link,
    List,
    Clipboard,
  ],
  toolbar: [
    "heading",
    "|",
    "alignment",
    ,
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "uploadImage",
    "blockQuote",
    "undo",
    "redo",
  ],

  image: {
    resizeUnit: "px",
    toolbar: [
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "|",
      "toggleImageCaption",
      "imageTextAlternative",
    ],
  },

  extraPlugins: [uploadPlugin],
};

function CustomEditor(props) {
  return (
    <div className="Editor">
      <CKEditor
        ref={props.editorRef}
        editor={ClassicEditor}
        data={props.initvalue}
        config={editorConfiguration}
        onReady={(editor) => {
          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              "500px",
              editor.editing.view.document.getRoot()
            );
          });
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
      />
    </div>
  );
}

export default CustomEditor;
