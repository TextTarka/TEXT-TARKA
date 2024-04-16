import React, { useState, useEffect } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import html2pdf from 'html2pdf.js';

function PdfViewer() {
    const [text, setText] = useState('');
    const [editedText, setEditedText] = useState('');
    const [rephrasedText, setRephrasedText] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [editorHeight, setEditorHeight] = useState('auto');

    const API_KEY = 'io6VmKzJ1X217hUJnwwh2HWhXjlNym8a';

    useEffect(() => {
        if (rephrasedText.length === 0) {
            setEditorHeight('100vh');
        } else {
            setEditorHeight('auto');
        }
    }, [rephrasedText]);

    const extractText = (event) => {
        const file = event.target.files[0];

        if (file) {
            pdfToText(file)
                .then((result) => {
                    setText(result);
                    setEditedText(result);
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
            const chunkSize = 500;
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
                    return '';
                }
            }));

            setRephrasedText(paraphrasedChunks);

        } catch (error) {
            console.error('Error:', error.message);
            setErrorMessage('Error occurred while rephrasing text');
        }
    };

    const downloadPDF = () => {
        try {
            const element = document.getElementById('rephrasedTextTable');
            const opt = {
                margin:       1,
                filename:     'rephrased_text.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            html2pdf().from(element).set(opt).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
            setErrorMessage('Error generating PDF');
        }
    };

    const handleTextChange = (event) => {
        setEditedText(event.target.value);
    };

    return (
        <div className="container mt-5">
            <Navbar />
            <div className="row">
                <div className="col-md-12 text-center mb-3">
                    <h2>PDF Text Viewer & Editor</h2>
                    <input type="file" className="form-control mt-3" accept="application/pdf" onChange={extractText} style={{ width: '50%', margin: 'auto' }} />
                </div>
                <div className="col-md-6">
                    {text && (
                        <div>
                            <h3 className="text-center">Extracted Text:</h3>
                            <textarea
                                rows={10}
                                className="form-control"
                                style={{ height: editorHeight }}
                                value={editedText}
                                onChange={handleTextChange}
                            />
                            <div className="text-center">
                                <button className="btn btn-primary mt-3" onClick={rephraseText}>Rephrase Text</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    {rephrasedText.length > 0 && (
                        <div>
                            <h3 className="text-center mb-3">Rephrased Text:</h3>
                            <div id="rephrasedTextTable">
                                <table className="table">
                                    <tbody>
                                        {rephrasedText.map((chunk, index) => (
                                            <tr key={index}>
                                                <td><span className="bullet">&#8226;</span> {chunk}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-success" onClick={downloadPDF}>Download PDF</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PdfViewer;
