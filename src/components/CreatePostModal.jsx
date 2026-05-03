'use client';

import React, { useState, useRef } from "react";
import { 
  X, 
  Image as ImageIcon, 
  Film, 
  Music, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  AlertCircle
} from "lucide-react";

const CreatePostModal = ({ isOpen, onClose }) => {
  const [step, setStandardStep] = useState(1); // 1: Select, 2: Edit/Cover, 3: Details
  const [type, setType] = useState("POST"); // POST or REEL
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [error, setError] = useState("");
  
  const fileInputRef = useRef(null);
  const MAX_IMAGES = 10;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setError("");

    if (type === "POST") {
      if (files.length + selectedFiles.length > MAX_IMAGES) {
        setError(`You can only select up to ${MAX_IMAGES} images.`);
        return;
      }
      const newFiles = [...selectedFiles, ...files];
      setSelectedFiles(newFiles);
      setPreviewUrls(newFiles.map(f => URL.createObjectURL(f)));
      setStandardStep(2);
    } else {
      // REEL Logic
      const video = files[0];
      if (!video.type.startsWith("video/")) {
        setError("Please select a valid video file.");
        return;
      }
      // Simulating duration check
      setSelectedFiles([video]);
      setPreviewUrls([URL.createObjectURL(video)]);
      setStandardStep(2);
    }
  };

  const handleUpload = () => {
    // Simulating API call
    console.log("Uploading...", { type, selectedFiles, coverImage, caption, selectedMusic });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
        <X className="w-8 h-8" />
      </button>

      <div className="bg-white dark:bg-zinc-900 w-full max-w-[800px] aspect-square md:aspect-video rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="h-12 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-4">
          {step > 1 && (
            <button onClick={() => setStandardStep(step - 1)}><ChevronLeft className="w-6 h-6 dark:text-white" /></button>
          )}
          <h3 className="font-bold text-sm dark:text-white">
            {type === "REEL" ? "Create new reel" : "Create new post"}
          </h3>
          {step === 3 ? (
            <button onClick={handleUpload} className="text-blue-500 font-bold text-sm hover:text-blue-700">Share</button>
          ) : step === 2 ? (
            <button onClick={() => setStandardStep(3)} className="text-blue-500 font-bold text-sm">Next</button>
          ) : <div className="w-6" />}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* Left: Preview/Selection */}
          <div className="flex-1 bg-gray-50 dark:bg-zinc-950 flex items-center justify-center relative group">
            {step === 1 ? (
              <div className="flex flex-col items-center gap-6">
                <div className="flex gap-4">
                  <button onClick={() => setType("POST")} className={`p-4 rounded-xl border-2 transition-all ${type === 'POST' ? 'border-blue-500 bg-blue-50/10' : 'border-transparent'}`}>
                    <ImageIcon className="w-12 h-12 dark:text-white" />
                    <p className="text-xs font-bold mt-2 dark:text-white text-center">Post</p>
                  </button>
                  <button onClick={() => setType("REEL")} className={`p-4 rounded-xl border-2 transition-all ${type === 'REEL' ? 'border-blue-500 bg-blue-50/10' : 'border-transparent'}`}>
                    <Film className="w-12 h-12 dark:text-white" />
                    <p className="text-xs font-bold mt-2 dark:text-white text-center">Reel</p>
                  </button>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors"
                >
                  Select from computer
                </button>
                <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} multiple={type === "POST"} accept={type === "POST" ? "image/*" : "video/*"} />
              </div>
            ) : (
              <div className="w-full h-full relative">
                {type === "POST" ? (
                   <img src={previewUrls[0]} className="w-full h-full object-cover" alt="" />
                ) : (
                   <video src={previewUrls[0]} className="w-full h-full object-cover" controls />
                )}
                
                {/* Image Counter Badge */}
                {type === "POST" && selectedFiles.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-[10px] font-bold">
                    {selectedFiles.length} images
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Controls (Only in Step 2 & 3) */}
          {step >= 2 && (
            <div className="w-full md:w-[320px] border-l border-gray-200 dark:border-zinc-800 p-4 overflow-y-auto">
               {step === 2 && type === "REEL" && (
                 <div className="flex flex-col gap-6">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Cover Photo</label>
                      <div className="mt-2 aspect-[9/16] w-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer overflow-hidden">
                         {coverImage ? <img src={URL.createObjectURL(coverImage)} className="w-full h-full object-cover" /> : <Plus className="text-gray-400" />}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">Videos over 60s will be trimmed.</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Music className="w-4 h-4" /> Add Music</label>
                      <button className="w-full mt-2 bg-gray-100 dark:bg-zinc-800 p-2 rounded-lg text-xs font-semibold dark:text-white text-left">Search music...</button>
                    </div>
                 </div>
               )}

               {step === 3 && (
                 <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden"><img src="/oosu.hada.jpg" alt="" /></div>
                       <span className="font-bold text-sm dark:text-white">oosu.hada</span>
                    </div>
                    <textarea 
                      placeholder="Write a caption..." 
                      className="w-full h-32 bg-transparent outline-none resize-none text-sm dark:text-white"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 flex flex-col gap-4">
                       <button className="flex justify-between items-center text-sm dark:text-white"><span>Add location</span> <Plus className="w-4 h-4" /></button>
                       <button className="flex justify-between items-center text-sm dark:text-white"><span>Accessibility</span> <ChevronRight className="w-4 h-4" /></button>
                       <button className="flex justify-between items-center text-sm dark:text-white"><span>Advanced settings</span> <ChevronRight className="w-4 h-4" /></button>
                    </div>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold shadow-lg animate-bounce">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostModal;
