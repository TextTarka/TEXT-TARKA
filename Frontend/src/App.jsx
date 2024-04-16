import React from 'react';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

const App = () => {
  const loader = new PDFLoader(); // Initialize PDFLoader instance

  const handleSubmit = async () => {
    try {
      const pdfPath = '';

      console.log('Loading PDF from path:', pdfPath);

      // Load PDF document from a URL or file path
      const documents = await loader.load(pdfPath);

      console.log('Loaded PDF documents:', documents);

      if (!documents || !Array.isArray(documents)) {
        throw new Error('Invalid documents received from PDFLoader');
      }

      const text = documents.map(doc => doc.pageContent).join('');
      console.log('Extracted Text:', text);
    } catch (error) {
      console.error('Error loading or processing PDF:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Extract PDF Content</button>
    </div>
  );
};

export default App;