import React, { useState } from 'react';
import { Home, Bookmark, Users, Settings, Bot, ChevronRight, ChevronLeft, LogOut, SquareDashedBottomCode, CloudUpload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname.split('/')[1]);
  const { logout } = useAuth();

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <aside
      className={`flex h-screen overflow-hidden ${isExpanded ? 'w-64' : 'w-16'} flex-col overflow-y-auto border-r bg-white py-2 transition-all duration-300 relative`}
    >
      <nav className={`flex flex-1 flex-col ${isExpanded ? 'items-start ml-4' : 'items-center'} mt-6 space-y-6`}>
        <a href="#" className="flex items-center justify-center w-10 h-10 rounded-lg bg-white relative group">
          <Bot size={48} className="text-gray-800" />
          {!isExpanded && (
            <div className="absolute -left-24 bottom-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs rounded py-1 px-2">
              FuseBot
            </div>
          )}
        </a>

        <a
          href="#"
          onClick={() => setActiveItem('home')}
          className={`flex items-center space-x-4 rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none ${activeItem === 'home' ? 'bg-gray-100 text-blue-600' : ''} relative group`}
        >
          <Home size={24} onClick={() => navigate('/home')} />
          {isExpanded && <span className="ml-4">Home</span>}
          {!isExpanded && (
            <div className="absolute -left-24 bottom-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs rounded py-1 px-2">
              Home
            </div>
          )}
        </a>

        <a
          href="#"
          onClick={() => setActiveItem('chart')}
          className={`flex items-center space-x-4 rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none ${activeItem === 'chart' ? 'bg-gray-100 text-blue-600' : ''} relative group`}
        >
          <SquareDashedBottomCode size={24} onClick={() => navigate('/studio')} />
          {isExpanded && <span className="ml-4">Bot Studio</span>}
        </a>

        <a
          href="#"
          onClick={() => setActiveItem('copy')}
          className={`flex items-center space-x-4 rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none ${activeItem === 'copy' ? 'bg-gray-100 text-blue-600' : ''} relative group`}
        >
          <CloudUpload size={24} onClick={() => navigate('/library')} />
          {isExpanded && <span className="ml-4">Upload Files</span>}
        </a>

        <a
          href="#"
          onClick={() => setActiveItem('bookmark')}
          className={`flex items-center space-x-4 rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none ${activeItem === 'bookmark' ? 'bg-gray-100 text-blue-600' : ''} relative group`}
        >
          <Bookmark size={24} />
          {isExpanded && <span className="ml-4">Bookmark</span>}
        </a>

        <a
          href="#"
          onClick={() => setActiveItem('users')}
          className={`flex items-center space-x-4 rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none ${activeItem === 'users' ? 'bg-gray-100 text-blue-600' : ''} relative group`}
        >
          <Users size={24} />
          {isExpanded && <span className="ml-4">Users</span>}
        </a>
      </nav>

      <div className={`flex flex-col ${isExpanded ? 'items-start ml-4' : 'items-center'} space-y-6 mt-auto`}>
        <a
          href="#"
          className={`flex items-center space-x-4 rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none relative group`}
        >
          <Settings size={24} />
          {isExpanded && <span className="ml-4">Settings</span>}
        </a>

        <a href="#" onClick={logout} className="relative group">
          <LogOut size={24} />
          {!isExpanded && (
            <div className="absolute -left-24 bottom-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-900 text-white text-xs rounded py-1 px-2">
              Logout
            </div>
          )}
        </a>
      </div>

      <button
        onClick={toggleSidebar}
        className={`absolute top-1/2 transform -translate-y-1/2 ${isExpanded ? 'right-[-16px]' : 'right-[-8px]'} p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none border border-gray-300`}
      >
        {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>
    </aside>
  );
}
