import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ManageCertifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        issuer: '',
        date: '',
        link: '',
        category: 'Frontend' // Default category
    });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const certCollectionRef = collection(db, "certifications");

    useEffect(() => {
        const fetchCerts = async () => {
            const data = await getDocs(certCollectionRef);
            setCertifications(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchCerts();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const certDoc = doc(db, "certifications", editingId);
                await updateDoc(certDoc, formData);
                setEditingId(null);
                alert('Certification updated successfully!');
            } else {
                await addDoc(certCollectionRef, formData);
                alert('Certification added successfully!');
            }
            setFormData({ name: '', issuer: '', date: '', link: '', category: 'Frontend' });
            const data = await getDocs(certCollectionRef);
            setCertifications(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error('Error adding/updating certification:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this certification?')) {
            const certDoc = doc(db, "certifications", id);
            await deleteDoc(certDoc);
            const data = await getDocs(certCollectionRef);
            setCertifications(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
    };

    const handleEdit = (cert) => {
        setEditingId(cert.id);
        setFormData({
            name: cert.name,
            issuer: cert.issuer,
            date: cert.date,
            link: cert.link || '',
            category: cert.category || 'Frontend'
        });
    };

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <button onClick={() => navigate('/admin/dashboard')} className="mb-4 text-primary hover:underline">Back to Dashboard</button>
            <h1 className="text-3xl font-bold mb-8">Manage Certifications</h1>

            <div className="bg-card p-6 rounded-xl shadow-lg mb-8 max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Certification' : 'Add New Certification'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="name" placeholder="Certification Name (e.g. React Developer)" value={formData.name} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="issuer" placeholder="Issuer (e.g. Coursera, Udemy)" value={formData.issuer} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="date" placeholder="Date (e.g. Jan 2024)" value={formData.date} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="link" placeholder="Certificate Link (Optional)" value={formData.link} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" />

                    <select name="category" value={formData.category} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700">
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Other">Other</option>
                    </select>

                    <button type="submit" className="bg-primary py-2 rounded font-bold hover:bg-primary/80 transition">{editingId ? 'Update Certification' : 'Add Certification'}</button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert) => (
                    <div key={cert.id} className="bg-card p-4 rounded-xl shadow-lg flex flex-col gap-2 border border-gray-800">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg">{cert.name}</h3>
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{cert.category}</span>
                        </div>
                        <p className="text-sm text-gray-400">{cert.issuer} | {cert.date}</p>
                        {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline truncate">{cert.link}</a>}

                        <div className="flex gap-2 mt-4">
                            <button onClick={() => handleEdit(cert)} className="flex-1 bg-blue-600 py-1 rounded text-xs hover:bg-blue-700">Edit</button>
                            <button onClick={() => handleDelete(cert.id)} className="flex-1 bg-red-600 py-1 rounded text-xs hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCertifications;
