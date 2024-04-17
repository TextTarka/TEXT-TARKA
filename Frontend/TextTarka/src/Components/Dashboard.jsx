import React, { useState, useEffect } from 'react';
import pdfToText from 'react-pdftotext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Row, Col, Button, Card } from 'react-bootstrap';
import { BiUpload, BiDownload } from 'react-icons/bi'; // Import icons
import html2pdf from 'html2pdf.js';
import NavbarComponent from './Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

function PdfViewer() {
    const [text, setText] = useState('');
    const [editedText, setEditedText] = useState('');
    const [rephrasedText, setRephrasedText] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [editorHeight, setEditorHeight] = useState('auto');

    const API_KEY = 'whjdkwbnzWtVe2Y9kZ1tgLlazswEJYW7';

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
                    toast.success('File Uploaded Successfully!!!');
                })
                .catch((error) => {
                    toast.error('Failed to extract text from pdf');
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
                        'Authorization': Bearer ${API_KEY},
                        'Content-Type': 'application/json',
                    }
                });

                if (response.data.suggestions && response.data.suggestions.length > 0 && response.data.suggestions[0].text) {
                    return response.data.suggestions[0].text;
                } else {
                    console.warn(No suggestions returned from the API for chunk: ${chunk});
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
            toast.success("PDF downloaded Successfully");
            html2pdf().from(element).set(opt).save();
        } catch (error) {
            toast.error("Error generating PDF");
            console.error('Error generating PDF:', error);
            setErrorMessage('Error generating PDF');
        }
    };

    const handleTextChange = (event) => {
        setEditedText(event.target.value);
    };

    return (
        <div className='card' style={{'backgroundColor':'#e9ecef'}}>
            <NavbarComponent />
            <Container className='card, mt-3' style={{'backgroundColor':'black', 'borderRadius':'5px'}}>
                <Row>
                    <Col md={12} className="text-center mb-3">   
                        <h2 style={{'color':'white'}}>PDF Text Extraction & Enrichment Platform</h2>
                        <input type="file" className="form-control mt-3" accept="application/pdf" onChange={extractText} style={{ width: '50%', margin: 'auto' }} />
                    </Col>
                    <Col md={6} >
                        {text && (
                            <Card>
                                <Card.Body>
                                    <h3 className="text-center">Extracted Text:</h3>
                                    <textarea
                                        rows={10}
                                        className="form-control"
                                        style={{ height: editorHeight }}
                                        value={editedText}
                                        onChange={handleTextChange}
                                    />
                                    <div className="text-center mt-3">
                                        <Button style={{backgroundColor:'black',color:'white'}} variant="secondary" onClick={rephraseText}><BiDownload /> Enhance Text</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                    <Col md={6}>
                        {rephrasedText.length > 0 && (
                            <Card>
                                <Card.Body>
                                    <h3 className="text-center mb-3">Enhanced Text:</h3>
                                    <div id="rephrasedTextTable">
                                        <ul className="list-group">
                                            {rephrasedText.map((chunk, index) => (
                                                <li className="list-group-item" key={index}>
                                                    <span className="bullet">&#8226;</span> {chunk}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="text-center mt-3">
                                        <Button style={{backgroundColor:'black',color:'white'}} variant="secondary" onClick={downloadPDF}><BiDownload /> Download PDF</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            <div>
                <br></br>
            </div>
            </Container>

        </div>
    );
}

export default PdfViewer;