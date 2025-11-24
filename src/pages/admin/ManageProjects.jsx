import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        description: '',
        image: '',
        tags: '',
        category: '',
        github: '',
        webapp: ''
    });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const projectsCollectionRef = collection(db, "projects");

    useEffect(() => {
        const getProjects = async () => {
            const data = await getDocs(projectsCollectionRef);
            setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getProjects();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim());
            const projectData = { ...formData, tags: tagsArray };

            console.log("ManageProjects: Saving project data:", projectData);
            console.log("ManageProjects: GitHub URL:", projectData.github);
            console.log("ManageProjects: Webapp URL:", projectData.webapp);

            if (editingId) {
                const projectDoc = doc(db, "projects", editingId);
                await updateDoc(projectDoc, projectData);
                setEditingId(null);
                alert('Project updated successfully!');
            } else {
                await addDoc(projectsCollectionRef, projectData);
                alert('Project added successfully!');
            }

            setFormData({
                title: '',
                date: '',
                description: '',
                image: '',
                tags: '',
                category: '',
                github: '',
                webapp: ''
            });

            // Refresh list
            const data = await getDocs(projectsCollectionRef);
            setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error('Error adding/updating project:', error);
            alert('Error: ' + error.message + '. Please check Firebase permissions.');
        }
    };

    const handleDelete = async (id) => {
        const projectDoc = doc(db, "projects", id);
        await deleteDoc(projectDoc);
        // Refresh list
        const data = await getDocs(projectsCollectionRef);
        setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const handleEdit = (project) => {
        setEditingId(project.id);
        setFormData({
            title: project.title,
            date: project.date,
            description: project.description,
            image: project.image,
            tags: project.tags.join(', '),
            category: project.category,
            github: project.github || '',
            webapp: project.webapp || ''
        });
    };

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <button onClick={() => navigate('/admin/dashboard')} className="mb-4 text-primary hover:underline">Back to Dashboard</button>
            <h1 className="text-3xl font-bold mb-8">Manage Projects</h1>

            <div className="bg-card p-6 rounded-xl shadow-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="date" placeholder="Date (e.g., Nov 2023 - Present)" value={formData.date} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700 md:col-span-2" required />
                    <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="category" placeholder="Category (e.g., web app)" value={formData.category} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" required />
                    <input name="github" placeholder="GitHub URL" value={formData.github} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" />
                    <input name="webapp" placeholder="Live App URL" value={formData.webapp} onChange={handleChange} className="bg-card_light p-2 rounded border border-gray-700" />
                    <button type="submit" className="md:col-span-2 bg-primary py-2 rounded font-bold hover:bg-primary/80 transition">{editingId ? 'Update Project' : 'Add Project'}</button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-card p-4 rounded-xl shadow-lg">
                        <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{project.date}</p>
                        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(project)} className="flex-1 bg-blue-600 py-1 rounded hover:bg-blue-700">Edit</button>
                            <button onClick={() => handleDelete(project.id)} className="flex-1 bg-red-600 py-1 rounded hover:bg-red-700">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProjects;
