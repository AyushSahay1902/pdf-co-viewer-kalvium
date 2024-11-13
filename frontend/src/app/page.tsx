"use client";
import { useState } from "react";
import PDFViewer from "@/components/PDFViewer";

export default function Home() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  interface FileInputEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleBrowsePDF = (e: FileInputEvent): void => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPdfFileName(file.name);
      alert("PDF file selected.");
    } else {
      setPdfFile(null);
      setPdfFileName(null);
      alert("Please select a PDF file.");
    }
  };

  const handleStartViewing = () => {
    try {
      if (!pdfFile) {
        alert("Please select a PDF file first.");
        return;
      }

      // Check if the selected file is a PDF
      if (pdfFile.type !== "application/pdf") {
        alert(
          "The selected file is not a valid PDF. Please choose a PDF file."
        );
        return;
      }

      console.log("Starting to view the PDF file:", pdfFile.name);
      setShowPDFViewer(true);
    } catch (error) {
      console.error("An error occurred while starting the PDF viewer:", error);
    }
  };

  return (
    <>
      {showPDFViewer ? (
        <PDFViewer pdfFile={pdfFile} />
      ) : (
        <>
          {/* Navigation */}
          <nav className="flex items-center justify-between bg-gray-800 text-white py-4 px-8 shadow-md">
            <a
              href="/"
              className="font-bold text-xl hover:text-blue-400 transition-colors duration-300"
            >
              PDF Co-Viewer by Ayush Sahay
            </a>
            <div className="flex items-center gap-4 font-medium">
              <a
                href="https://drive.google.com/file/d/16RVKt4vmDFntnYLvzCNbgOy7wLp5fNiz/view?usp=sharing"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                Resume
              </a>
              <a
                href="https://www.linkedin.com/in/ayushsahay-developer/"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/AyushSahay1902/"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                GitHub
              </a>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-10 bg-gray-100 text-gray-800">
            <main className="flex flex-col items-center justify-center gap-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-xl font-semibold text-center">PDF Viewer</h1>
              <div className="flex flex-col items-center gap-4">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => document.getElementById("pdfInput")?.click()}
                >
                  Browse PDF
                </button>
                <input
                  id="pdfInput"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleBrowsePDF}
                />
                {pdfFileName && (
                  <p className="text-sm text-gray-600">{pdfFileName}</p>
                )}
                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-300"
                  onClick={handleStartViewing}
                >
                  Start Viewing
                </button>
              </div>
            </main>
          </div>

          {/* Footer */}
          <footer className="flex gap-6 flex-wrap items-center justify-center py-4 bg-gray-800 text-white">
            <p className="text-center text-sm">
              Made by Ayush Sahay | Project for Kalvium
            </p>
          </footer>
        </>
      )}
    </>
  );
}
