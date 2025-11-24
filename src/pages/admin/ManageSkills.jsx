import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: 'Technical Skills'
    });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const skillsCollectionRef = collection(db, "skills");

    useEffect(() => {
        const getSkills = async () => {
            const data = await getDocs(skillsCollectionRef);
            setSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getSkills();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                const skillDoc = doc(db, "skills", editingId);
                await updateDoc(skillDoc, formData);
                setEditingId(null);
                alert('Skill updated successfully!');
            } else {
                await addDoc(skillsCollectionRef, formData);
                alert('Skill added successfully!');
            }
            setFormData({ name: '', image: '', category: 'Technical Skills' });
            const data = await getDocs(skillsCollectionRef);
            setSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error('Error adding/updating skill:', error);
            alert('Error: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        const skillDoc = doc(db, "skills", id);
        await deleteDoc(skillDoc);
        const data = await getDocs(skillsCollectionRef);
        setSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const handleEdit = (skill) => {
        setEditingId(skill.id);
        setFormData({
            name: skill.name,
            image: skill.image,
            category: skill.category || 'Technical Skills'
        });
    };

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <button onClick={() => navigate('/admin/dashboard')} className="mb-4 text-primary hover:underline">Back to Dashboard</button>
            <h1 className="text-3xl font-bold mb-8">Manage Skills</h1>

            <div className="bg-card p-6 rounded-xl shadow-lg mb-8 max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Skill' : 'Add New Skill'}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="name" placeholder="Skill Name (e.g. React)" value={formData.name} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="image" placeholder="Image URL (e.g. https://...)" value={formData.image} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <select name="category" value={formData.category} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required>
                        <option value="Technical Skills">Technical Skills</option>
                        <option value="Frameworks">Frameworks</option>
                        <option value="Others">Others</option>
                    </select>
                    <button type="submit" className="bg-primary py-2 rounded font-bold hover:bg-primary/80 transition">{editingId ? 'Update Skill' : 'Add Skill'}</button>
                </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {skills.map((skill) => (
                    <div key={skill.id} className="bg-card p-4 rounded-xl shadow-lg flex flex-col items-center gap-3">
                        <img src={skill.image} alt={skill.name} className="w-12 h-12 object-contain" />
                        <h3 className="text-lg font-semibold">{skill.name}</h3>
                        <p className="text-xs text-text_secondary">{skill.category || 'N/A'}</p>
                        <div className="flex gap-2 w-full">
                            <button onClick={() => handleEdit(skill)} className="flex-1 bg-blue-600 py-1 rounded text-xs hover:bg-blue-700">Edit</button>
                            <button onClick={() => handleDelete(skill.id)} className="flex-1 bg-red-600 py-1 rounded text-xs hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageSkills;
