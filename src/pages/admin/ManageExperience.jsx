import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ManageExperience = () => {
    const [experiences, setExperiences] = useState([]);
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        location: '',
        duration: '',
        description: '' // comma-separated sentences
    });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const expCollectionRef = collection(db, "experience");

    useEffect(() => {
        const fetchExp = async () => {
            const data = await getDocs(expCollectionRef);
            setExperiences(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchExp();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const descArray = formData.description.split('\n').map(d => d.trim()).filter(d => d);
            const expData = { ...formData, description: descArray };
            if (editingId) {
                const expDoc = doc(db, "experience", editingId);
                await updateDoc(expDoc, expData);
                setEditingId(null);
                alert('Experience updated successfully!');
            } else {
                await addDoc(expCollectionRef, expData);
                alert('Experience added successfully!');
            }
            setFormData({ role: '', company: '', location: '', duration: '', description: '' });
            const data = await getDocs(expCollectionRef);
            setExperiences(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error('Error adding/updating experience:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        const expDoc = doc(db, "experience", id);
        await deleteDoc(expDoc);
        const data = await getDocs(expCollectionRef);
        setExperiences(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const handleEdit = (exp) => {
        setEditingId(exp.id);
        setFormData({
            role: exp.role,
            company: exp.company,
            location: exp.location,
            duration: exp.duration,
            description: exp.description ? exp.description.join('\n') : ''
        });
    };

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <button onClick={() => navigate('/admin/dashboard')} className="mb-4 text-primary hover:underline">Back to Dashboard</button>
            <h1 className="text-3xl font-bold mb-8">Manage Experience</h1>
            <div className="bg-card p-6 rounded-xl shadow-lg mb-8 max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Experience' : 'Add New Experience'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="role" placeholder="Role (e.g. Backend Developer Intern)" value={formData.role} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="duration" placeholder="Duration (e.g. 06/2024 - 07/2024)" value={formData.duration} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <textarea name="description" placeholder="Description (one bullet per line)" value={formData.description} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" rows={4} required />
                    <button type="submit" className="bg-primary py-2 rounded font-bold hover:bg-primary/80 transition">{editingId ? 'Update Experience' : 'Add Experience'}</button>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((exp) => (
                    <div key={exp.id} className="bg-card p-4 rounded-xl shadow-lg flex flex-col gap-3">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg font-semibold text-text_primary">{exp.role}</span>
                            <span className="text-sm text-text_secondary">@ {exp.company}</span>
                        </div>
                        <div className="text-xs text-text_secondary mb-1">{exp.location} | {exp.duration}</div>
                        <ul className="list-disc list-inside text-text_primary/90 text-sm">
                            {exp.description && exp.description.map((d, i) => (<li key={i}>{d}</li>))}
                        </ul>
                        <div className="flex gap-2 mt-2">
                            <button onClick={() => handleEdit(exp)} className="flex-1 bg-blue-600 py-1 rounded text-xs hover:bg-blue-700">Edit</button>
                            <button onClick={() => handleDelete(exp.id)} className="flex-1 bg-red-600 py-1 rounded text-xs hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageExperience;
