"use client";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocumentProxy } from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfFile: File | null;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
    console.log(`PDF loaded with ${pdf.numPages} pages`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 text-gray-800">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        {pdfFile ? (
          <Document
            file={URL.createObjectURL(pdfFile)}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        ) : (
          <p>Please select a PDF file to view.</p>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
