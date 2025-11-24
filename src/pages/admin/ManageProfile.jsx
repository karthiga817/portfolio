import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ManageProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        roles: '', // Comma separated string for input
        bio: '',
        github: '',
        linkedin: '',
        resumeUrl: '', // Optional: if they want to host it elsewhere or update the filename
        profileImgUrl: '' // Optional
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Redirect unauthenticated users to login page
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                navigate('/admin/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        const fetchProfile = async () => {
            console.log("ManageProfile: Starting to fetch profile data...");
            try {
                console.log("ManageProfile: Creating doc reference...");
                const docRef = doc(db, "profile", "info");
                console.log("ManageProfile: Fetching document...");
                const docSnap = await getDoc(docRef);
                console.log("ManageProfile: Document fetched, exists:", docSnap.exists());

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log("ManageProfile: Document data:", data);
                    setFormData({
                        ...data,
                        roles: data.roles ? data.roles.join(', ') : ''
                    });
                } else {
                    console.log("ManageProfile: No document found, using defaults");
                    // Initialize with default/current values if no doc exists
                    setFormData({
                        name: 'Karthiga M',
                        roles: 'Full Stack Developer, Web Designer, UI/UX Designer, Programmer',
                        bio: 'I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.',
                        github: 'https://github.com/karthiga817',
                        linkedin: 'https://www.linkedin.com/in/karthiga-m-8a1216291',
                        resumeUrl: '/resume.pdf',
                        profileImgUrl: '/profile.jpg'
                    });
                }
                console.log("ManageProfile: Setting loading to false");
                setLoading(false);
            } catch (error) {
                console.error("ManageProfile: Error fetching profile:", error);
                console.error("ManageProfile: Error details:", error.message, error.code);
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rolesArray = formData.roles.split(',').map(role => role.trim()).filter(role => role !== '');
            const dataToSave = {
                ...formData,
                roles: rolesArray
            };
            await setDoc(doc(db, "profile", "info"), dataToSave);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Error updating profile:", error);
            alert('Error updating profile: ' + error.message);
        }
    };

    if (loading) return <div className="text-white p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <button onClick={() => navigate('/admin/dashboard')} className="mb-4 text-primary hover:underline">Back to Dashboard</button>
            <h1 className="text-3xl font-bold mb-8">Manage Profile (Hero Section)</h1>

            <div className="bg-card p-6 rounded-xl shadow-lg max-w-3xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-card_light p-3 rounded border border-gray-700 focus:border-primary outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Roles (comma separated)</label>
                        <input name="roles" value={formData.roles} onChange={handleChange} className="w-full bg-card_light p-3 rounded border border-gray-700 focus:border-primary outline-none" placeholder="e.g. Developer, Designer, Coder" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows="5" className="w-full bg-card_light p-3 rounded border border-gray-700 focus:border-primary outline-none" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">GitHub URL</label>
                            <input name="github" value={formData.github} onChange={handleChange} className="w-full bg-card_light p-3 rounded border border-gray-700 focus:border-primary outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">LinkedIn URL</label>
                            <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full bg-card_light p-3 rounded border border-gray-700 focus:border-primary outline-none" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Resume URL/Path</label>
                            <input name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} className="w-full bg-card_light p-3 rounded border border-gray-700 focus:border-primary outline-none" placeholder="/resume.pdf or https://..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Profile Image URL/Path</label>
                            <input name="profileImgUrl" value={formData.profileImgUrl} onChange={handleChange} className="w-full bg-card_light p-3 rounded border border-gray-700 focus:border-primary outline-none" placeholder="/profile.jpg or https://..." />
                        </div>
                    </div>

                    <button type="submit" className="bg-primary py-3 rounded font-bold hover:bg-primary/80 transition text-lg mt-4">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default ManageProfile;
