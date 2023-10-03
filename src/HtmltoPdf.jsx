
import "./style/htmltopdf_style.css";
import html2pdf from 'html2pdf.js';
import logo from './img/logo-nobg.png';
import { useRef,useState } from 'react';

export default function InvoicePdf() {
    const pdfRef = useRef(null);

    const handleConvertToPDF = () => {
        const input = pdfRef.current;

        const pdfOptions = {
            margin: 2,
            filename: 'document.pdf',
            image: { type: 'jpeg', quality: 1.00 },
            html2canvas: { scale: 3 },
            jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' },
        };

        html2pdf().from(input).set(pdfOptions).save();
    };


    //upload
    const [selectedImage, setSelectedImage] = useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // setSelectedImage(null)

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage((prev) => {


                    return ([...prev, reader.result])

                }
                );

            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="App">
            <header className="App-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        {/* <!-- Logo and Name on the left --> */}
                        <img src={logo} alt="" width="185px"></img>


                        {/* <!-- Logout option on the far right --> */}
                        <ul className="navbar-nav ml-auto pointer">
                            <li className="nav-item">
                                <a className="nav-link">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <div className="container mt-4">

                <button onClick={handleConvertToPDF}>Convert to PDF</button>
            </div>
            <div className="content" ref={pdfRef}>
                {/* Add your HTML content to be converted to PDF here */}

                <div className='print-table'>

                    <div className="d-flex flex-column container white-bg">
                        <div className="d-flex flex-row  justify-content-between">

                            <div className="deets">
                                <div className="infos">
                                    <div className="fields">

                                        Name of the client :
                                    </div>
                                    <input type="text" id='name' className='info-space' />
                                </div>

                                <div className="infos">
                                    <div className="fields">

                                        Name of the Intervention Specialist :
                                    </div>
                                    <input type="text" id='social-worker' className='info-space' />
                                </div>

                                <div className="infos">
                                    <div className="fields">

                                        Date :
                                    </div>
                                    <input type="text" id='date ' className='info-space' />

                                </div>
                            </div>
                            <div className="img-container">
                                <img src={logo} alt="" width={"400px"} />
                            </div>
                        </div>

                        <div className="table-info">

                            <div className="container mt-5">
                                <table className="table custom-table container">
                                    <thead>
                                        <tr>
                                            <th>Area of Focus</th>
                                            <th>Activities Done</th>
                                            <th>Purpose</th>
                                            <th>Outcome</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Physical Excercises</td>
                                            <td><textarea name="" id="" rows="5"></textarea> </td>
                                            <td><textarea name="" id="" rows="5" ></textarea></td>
                                            <td><textarea name="" id="" rows="5"></textarea></td>
                                        </tr>
                                        <tr>
                                            <td>Cognitive Simulation</td>
                                            <td><textarea name="" id="" rows="6"></textarea></td>
                                            <td><textarea name="" id="" rows="6"></textarea></td>
                                            <td><textarea name="" id="" rows="6"></textarea></td>
                                        </tr>
                                        <tr>
                                            <td>Creative Expression / Pursuing Hobbies</td>
                                            <td><textarea name="" id="" rows="6"></textarea></td>
                                            <td><textarea name="" id="" rows="6"></textarea></td>
                                            <td><textarea name="" id="" rows="6"></textarea></td>
                                        </tr>
                                        <tr className='secondPage'>
                                            <td>Promoting Independence </td>
                                            <td><textarea name="" id="" rows="5"></textarea></td>
                                            <td><textarea name="" id="" rows="5"></textarea></td>
                                            <td><textarea name="" id="" rows="5"></textarea></td>
                                        </tr>
                                        <tr className='secondPage pagebreak'>
                                            <td>Remarks</td>
                                            <td>

                                                <input type="file" onChange={handleImageChange} />
                                                {selectedImage && (
                                                    <div>
                                                        {console.log("this is  : ", selectedImage.length > 1)}
                                                        <img src={selectedImage[0]} alt="" width="300" />
                                                    </div>
                                                )}
                                            </td>
                                            <td>  <input type="file" onChange={handleImageChange} />
                                                {selectedImage && (
                                                    <div>
                                                        {
                                                            selectedImage.length > 1 ? <img src={selectedImage[1]} alt="Uploaded" width="300" /> : <div> </div>
                                                        }

                                                    </div>
                                                )}

                                            </td>
                                            <td>
                                                <input type="file" onChange={handleImageChange} />
                                                {selectedImage && (
                                                    <div>
                                                        {
                                                            selectedImage.length > 2 ? <img src={selectedImage[2]} alt="Uploaded" width="300" /> : <div> </div>
                                                        }

                                                    </div>
                                                )}
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>



                        </div>



                    </div>


                </div>

            </div>
            <div className="warning"> Please view this in desktop </div>
        </div>
    );
}
