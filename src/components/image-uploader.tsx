"use client";

import React, { SetStateAction, useState } from "react";
import { ImageUp, Paperclip } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./ui/file-upload";

const FileSvgDraw = () => {
  return (
    <button type="button" className="border p-[6px]">
      <ImageUp className="text-muted-foreground" />
    </button>
  );
};

export default function ImageUploader({
  files,
  setFiles,
}: {
  files: File[] | null;
  setFiles: React.Dispatch<SetStateAction<File[] | null>>;
}) {
  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background" // Added padding for inner spacing
    >
      <FileInput className="outline-1 outline-white">
        <div className="flex flex-col items-center justify-center">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem
              key={i}
              index={i}
              className="flex items-center space-x-2"
            >
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
}
