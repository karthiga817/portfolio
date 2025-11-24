import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
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

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background text-white p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition duration-300"
                >
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                    onClick={() => navigate('/admin/projects')}
                    className="p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-transparent hover:border-primary"
                >
                    <h2 className="text-xl font-semibold mb-2">Manage Projects</h2>
                    <p className="text-gray-400">Add, edit, or remove portfolio projects.</p>
                </div>
                <div
                    onClick={() => navigate('/admin/skills')}
                    className="p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-transparent hover:border-primary"
                >
                    <h2 className="text-xl font-semibold mb-2">Manage Skills</h2>
                    <p className="text-gray-400">Update your technical skills list.</p>
                </div>
                <div
                    onClick={() => navigate('/admin/experience')}
                    className="p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-transparent hover:border-primary"
                >
                    <h2 className="text-xl font-semibold mb-2">Manage Experience</h2>
                    <p className="text-gray-400">Add, edit, or remove your work experience.</p>
                </div>
                <div
                    onClick={() => navigate('/admin/certifications')}
                    className="p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-transparent hover:border-primary"
                >
                    <h2 className="text-xl font-semibold mb-2">Manage Certifications</h2>
                    <p className="text-gray-400">Add, edit, or remove your certifications.</p>
                </div>
                <div
                    onClick={() => navigate('/admin/achievements')}
                    className="p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-transparent hover:border-primary"
                >
                    <h2 className="text-xl font-semibold mb-2">Manage Achievements</h2>
                    <p className="text-gray-400">Add, edit, or remove your achievements.</p>
                </div>
                <div
                    onClick={() => navigate('/admin/profile')}
                    className="p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-transparent hover:border-primary"
                >
                    <h2 className="text-xl font-semibold mb-2">Manage Profile</h2>
                    <p className="text-gray-400">Update Hero content, Bio, and Links.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
