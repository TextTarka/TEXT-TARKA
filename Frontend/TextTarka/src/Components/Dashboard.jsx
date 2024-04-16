import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar'
function PdfViewer() {
    const [text, setText] = useState('');
    const [editedText, setEditedText] = useState('');
    const [rephrasedText, setRephrasedText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const API_KEY = 'mHT2zeg04bUTtogojEVZfoe5PxhCWoPM';

    const extractText = (event) => {
        const file = event.target.files[0];

        if (file) {
            pdfToText(file)
                .then((result) => {
                    setText(result);
                    setEditedText(result); // Set the initial value for editing
                    setErrorMessage('');
                })
                .catch((error) => {
                    console.error("Failed to extract text from pdf", error);
                    setErrorMessage('Failed to extract text from PDF');
                });
        }
    };

   const rephraseText = async () => {
    try {
        const chunkSize = 500; // Define the chunk size
        const chunks = [];

        for (let i = 0; i < editedText.length; i += chunkSize) {
            chunks.push(editedText.substring(i, i + chunkSize));
        }

        const paraphrasedChunks = await Promise.all(chunks.map(async (chunk) => {
            const response = await axios.post('https://api.ai21.com/studio/v1/paraphrase', {
                text: chunk,
                model: 'text-davinci-002'
            }, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.suggestions && response.data.suggestions.length > 0 && response.data.suggestions[0].text) {
                return response.data.suggestions[0].text;
            } else {
                console.warn(`No suggestions returned from the API for chunk: ${chunk}`);
                return ''; // Return empty string for this chunk
            }
        }));

        const rephrasedText = paraphrasedChunks.join('');
        setRephrasedText(rephrasedText);

    } catch (error) {
        console.error('Error:', error.message);
        setErrorMessage('Error occurred while rephrasing text');
    }
};

    const handleTextChange = (event) => {
        setEditedText(event.target.value);
    };

    return (
        <div className="container mt-5">
            <Navbar />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center mb-4">PDF Text Viewer & Editor</h2>
                    <div className="mb-3">
                        <input type="file" className="form-control" accept="application/pdf" onChange={extractText} />
                    </div>
                    {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                    {text && (
                        <div>
                            <h3 className="text-center">Extracted Text:</h3>
                            <textarea
                                rows={10}
                                className="form-control mb-3"
                                value={editedText}
                                onChange={handleTextChange}
                            />
                            <button className="btn btn-primary mb-3" onClick={rephraseText}>Rephrase Text</button>
                            <h3 className="text-center">Rephrased Text:</h3>
                            <textarea
                                rows={10}
                                className="form-control"
                                value={rephrasedText}
                                readOnly
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PdfViewer;