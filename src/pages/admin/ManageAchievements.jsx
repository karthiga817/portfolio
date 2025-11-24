import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ManageAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: ''
    });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const achCollectionRef = collection(db, "achievements");

    useEffect(() => {
        const fetchAchievements = async () => {
            const data = await getDocs(achCollectionRef);
            setAchievements(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        fetchAchievements();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const achDoc = doc(db, "achievements", editingId);
                await updateDoc(achDoc, formData);
                setEditingId(null);
                alert('Achievement updated successfully!');
            } else {
                await addDoc(achCollectionRef, formData);
                alert('Achievement added successfully!');
            }
            setFormData({ title: '', description: '', date: '' });
            const data = await getDocs(achCollectionRef);
            setAchievements(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error('Error adding/updating achievement:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this achievement?')) {
            const achDoc = doc(db, "achievements", id);
            await deleteDoc(achDoc);
            const data = await getDocs(achCollectionRef);
            setAchievements(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
    };

    const handleEdit = (ach) => {
        setEditingId(ach.id);
        setFormData({
            title: ach.title,
            description: ach.description,
            date: ach.date
        });
    };

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <button onClick={() => navigate('/admin/dashboard')} className="mb-4 text-primary hover:underline">Back to Dashboard</button>
            <h1 className="text-3xl font-bold mb-8">Manage Achievements</h1>

            <div className="bg-card p-6 rounded-xl shadow-lg mb-8 max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Achievement' : 'Add New Achievement'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="title" placeholder="Achievement Title" value={formData.title} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="date" placeholder="Date (e.g. 2024)" value={formData.date} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />

                    <button type="submit" className="bg-primary py-2 rounded font-bold hover:bg-primary/80 transition">{editingId ? 'Update Achievement' : 'Add Achievement'}</button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((ach) => (
                    <div key={ach.id} className="bg-card p-4 rounded-xl shadow-lg flex flex-col gap-2 border border-gray-800">
                        <h3 className="font-bold text-lg">{ach.title}</h3>
                        <p className="text-sm text-gray-400">{ach.description}</p>
                        <p className="text-xs text-gray-500">{ach.date}</p>

                        <div className="flex gap-2 mt-4">
                            <button onClick={() => handleEdit(ach)} className="flex-1 bg-blue-600 py-1 rounded text-xs hover:bg-blue-700">Edit</button>
                            <button onClick={() => handleDelete(ach.id)} className="flex-1 bg-red-600 py-1 rounded text-xs hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageAchievements;
