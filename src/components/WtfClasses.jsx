import React, { useState, useEffect } from 'react';
import "../style/style.css"

const WtfClasses = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [moreInfo,setMoreInfo] = useState(false)

    useEffect(() => {
        // Fetch data from mock API
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await fetch('http://localhost:3000/classes');
            const data = await response.json();
            setClasses(data);
        } catch (error) {
            console.error("Error fetching classes:", error);
            // Handle error, maybe set a default state
        }
    };

    const handleClassClick = (cls) => {
        setSelectedClass(cls);
        setMoreInfo(true)
    };

    const handleCloseDetail = () => {
        setSelectedClass(null);
    };

    const openModal = (cls) => {
        setMoreInfo(false)
        setSelectedClass(cls)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const participentHandler = () => {
        const updatedClasses = classes.map(cls => {
            if (selectedClass.id === cls.id) {
                return {
                    ...cls,
                    participants: [...cls.participants, name]
                };
            }
            return cls; // Don't forget to return the unchanged class if no update is needed
        });
        setClasses(updatedClasses);
        setIsModalOpen(false);
    };

    return (
        <div >
            <div className="weekly-calendar">
                <div className="day">
                    {classes.map((cls) => (
                        <div key={cls.id} className="class-item">
                            <h3>{cls.name}</h3>
                            <img src={cls.image}   alt="NO IMAGE FOUND" />
                            <div className="day-time">
                            <p><span> Time :</span> {cls.time}</p>
                            <p> <span>Day :</span>  {cls.day}</p>
                            </div>
                            <div className='main-btn'>
                            <button className='generic-btn' onClick={() => handleClassClick(cls)} >More Information</button>
                            <button className='generic-btn' onClick={() => openModal(cls)} >Sign Up for This Class</button>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>

            {/* more information modal */}
            {moreInfo &&  selectedClass && (
            <div className="modal-overlay" onClick={handleOverlayClick} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}>
                    <div className="modal-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                        <button onClick={handleCloseDetail} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#333' }}>X</button>
                        <div className="class-detail">
                            <h2>{selectedClass.name}</h2>
                            <p> <span>Date:</span>  {selectedClass.date}</p>
                            <p> <span>Time:</span>  {selectedClass.time}</p>
                            <p> <span>Duration:</span>  {selectedClass.duration}</p>
                            <p><span>Instructor: </span> {selectedClass.instructor}</p>
                            <p><span>Description: </span> {selectedClass.description}</p>
                            <p><span>Participants :</span>  {selectedClass.participants.length === 0 ? "No Participants" : selectedClass.participants && selectedClass.participants.map((item) => item).join(",")}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* handle sign up modal user detail */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}>
                    <div className="modal-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                        <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#333' }}>X</button>
                        <h2>Add Your Details</h2>
                        <div className='mainInput'>
                            <label htmlFor="">Name:</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='mainInput'>
                            <label htmlFor="">Email Id:</label>
                            <input type="text"/>
                        </div>
                        <button className='generic-btn' onClick={participentHandler}>Become A Participant</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WtfClasses;
