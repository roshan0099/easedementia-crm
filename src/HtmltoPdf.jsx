
import "./style/htmltopdf_style.css";
import html2pdf from 'html2pdf.js';
import logo from './img/logo-nobg.png';
import { useEffect, useRef, useState } from 'react';
import supabase from './authLogin';
import { useNavigate } from 'react-router-dom';

export default function InvoicePdf() {
    const navigate = useNavigate()
    const pdfRef = useRef(null);
    const [clientDeets, setClientDeets] = useState([])
    const [details, setDetails] = useState()
    const [infoClient, setInfoClient] = useState([])
    const [stateOption, setStateOption] = useState("")

    useEffect(() => {

        async function fetching() {

            const { data, error } = await supabase
                .from('info_text')
                .select('*')


            setClientDeets(data)
        }

        fetching()


    }, [])


    async function updateQuery() {

        if (stateOption === "") {

            const { error } = await supabase
                .from('info_text')
                .insert(infoClient)


            console.log("errr : ", error)
        } else {


            const { error } = await supabase
                .from('info_text')
                .update(infoClient)
                .eq('id', stateOption)

                console.log("error : ",error)
        }

    }

    const handleConvertToPDF = () => {

        updateQuery()

        const input = pdfRef.current;

        const pdfOptions = {
            // margin: { top: 20, right: 10, bottom: 10, left: 10 }
            // margin: 5,
            margin: [20, 10],
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
                const sampleArray = [...selectedImage]
                if (e.target.className === "pic3") {


                    sampleArray[2] = reader.result

                    setSelectedImage(sampleArray)

                } else if (e.target.className === "pic2") {

                    sampleArray[1] = reader.result

                    setSelectedImage(sampleArray)

                }

                else {

                    // console.log("this is reader :  ", reader)

                    sampleArray[0] = reader.result

                    setSelectedImage(sampleArray)


                    // setSelectedImage((prev) => {


                    //     return ([...prev, reader.result])

                    // }
                    // );
                }

            };
            reader.readAsDataURL(file);
        }
    };

    async function signOut() {
        const { error } = await supabase.auth.signOut()

        navigate("/")
        // setProfile(null)

    }

    // function DropDownOption(){


    // }

    // useEffect(() => {

    //     async function fetching(){

    //         const { data, error } = await supabase
    //         .from('info_text')
    //         .select('*')
    //         .eq("id",1)


    //         console.log("data => ", data)
    //         // setClientDeets(data)

    //         console.log("this is selection : ",data)
    //     }

    //     fetching()


    // },[details])

    //edit the value in the field
    function editValue(elm) {


        // tempArray["name_client"] += elm.target.value

        // setInfoClient(tempArray)

        setInfoClient((prev) => {


            return (
                {
                    ...prev, [elm.target.id]: elm.target.value
                }
            )
        })
    }



    function check_data(dataElm) {

        var i = 0
        for (i = 0; i < clientDeets.length; i++) {
            if (clientDeets[i].id == dataElm) {
                setInfoClient(clientDeets[i])
            }
        }

    }
    function fetchdeets(e) {
        // console.log("this is fetch deets : ", e.target.value)
        // setDetails(e.target.value)
        setStateOption(e.target.value)
    
        if (e.target.value === "recent") {
            window.location.reload()
            // console.log("info : ",infoClient)
        } else {

            check_data(e.target.value)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        {/* <!-- Logo and Name on the left --> */}
                        <img src={logo} alt="" width="185px"></img>


                        {/* <!-- Logout option on the far right --> */}

                        <ul className="navbar-nav ml-auto pointer">

                            <select id="dropdown" className="recent-opt" onChange={fetchdeets}>
                                <option value="recent">recent</option>
                                {
                                    clientDeets?.map(name => {
                                        // console.log("this si : ",name)
                                        return (
                                            <>
                                                <option value={name.id}>{name.name_client}</option>
                                            </>
                                        )
                                    })
                                }
                                {/* <option value="option1">Option 2</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option> */}
                            </select>

                            <li className="nav-item cursor-pointer">
                                <a className="nav-link" onClick={signOut}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <div className="container mt-4">

                <button className="pdf-btn" onClick={handleConvertToPDF}>Convert to PDF</button>
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
                                    <input type="text" id='name_client' className='info-space' value={infoClient?.name_client} onChange={editValue} />
                                </div>

                                <div className="infos">
                                    <div className="fields">

                                        Name of the Intervention Specialist :
                                    </div>
                                    <input type="text" id='name_is' className='info-space' value={infoClient?.name_is} onChange={editValue} />
                                </div>

                                <div className="infos">
                                    <div className="fields">

                                        Date :
                                    </div>
                                    <input type="text" id='date' className='info-space' value={infoClient?.date} onChange={editValue} />

                                </div>
                            </div>
                            <div className="img-container">
                                <img src={logo} alt="" width={"400px"} />
                            </div>
                        </div>

                        <div className="table-info">

                            <div className="container mt-5">
                                <div className="">
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
                                                <td><textarea name="" id="PE_1" rows="5" value={infoClient["PE_1"]== null ? " " : infoClient["PE_1"]} onChange={editValue}></textarea> </td>
                                                <td><textarea name="" id="PE_2" rows="5" value={infoClient["PE_2"]== null ? " " : infoClient["PE_2"]} onChange={editValue}></textarea></td>
                                                <td><textarea name="" id="PE_3" rows="5" value={infoClient["PE_3"]== null ? " " : infoClient["PE_3"]} onChange={editValue}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td>Cognitive Simulation</td>
                                                <td><textarea name="" id="CS_1" rows="6" value={infoClient["CS_1"]== null ? " " : infoClient["CS_1"]} onChange={editValue}></textarea></td>
                                                <td><textarea name="" id="CS_2" rows="6" value={infoClient["CS_2"]== null ? " " : infoClient["CS_2"]} onChange={editValue}></textarea></td>
                                                <td><textarea name="" id="CS_3" rows="6" value={infoClient["CS_3"]== null ? " " : infoClient["CS_3"]} onChange={editValue}></textarea></td>
                                            </tr>
                                            <tr className='secondPage'>
                                                <td>Creative Expression / Pursuing Hobbies</td>
                                                <td><textarea name="" id="CE_1" rows="6" value={infoClient["CE_1"]== null ? " " : infoClient["CE_1"]} onChange={editValue}></textarea></td>
                                                <td><textarea name="" id="CE_2" rows="6" value={infoClient["CE_2"]== null ? " " : infoClient["CE_2"]} onChange={editValue}></textarea></td>
                                                <td><textarea name="" id="CE_3" rows="6" value={infoClient["CE_3"]== null ? " " : infoClient["CE_3"]} onChange={editValue}></textarea></td>
                                            </tr>
                                            <tr className='secondPage pagebreak'>
                                                <td>Promoting Independence </td>
                                                <td><textarea name="" id="PI_1" rows="5" value={infoClient["PI_1"]== null ? " " : infoClient["PI_1"]} onChange={editValue}></textarea></td>
                                                <td><textarea name="" id="PI_2" rows="5" value={infoClient["PI_2"]== null ? " " : infoClient["PI_2"]} onChange={editValue}></textarea></td>
                                                <td><textarea name="" id="PI_3" rows="5" value={infoClient["PI_3"]== null ? " " : infoClient["PI_3"]} onChange={editValue}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td>Remarks</td>
                                                <td>

                                                    <input type="file" className="pic1" onChange={handleImageChange} />
                                                    {selectedImage && (
                                                        <div>
                                                            <img src={selectedImage[0]} alt="" width="300" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td>  <input type="file" className="pic2" onChange={handleImageChange} />
                                                    {selectedImage && (
                                                        <div>
                                                            {
                                                                selectedImage.length > 1 ? <img src={selectedImage[1]} alt="Uploaded" width="300" /> : <div> </div>
                                                            }

                                                        </div>
                                                    )}

                                                </td>
                                                <td>
                                                    <input type="file" className="pic3" onChange={handleImageChange} />
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

            </div>
            <div className="warning"> Please view this in desktop </div>
        </div>
    );
}
