import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Dashboard.css';

const Messages: React.FC = () => {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');

  // Fake data for UI presentation
  const contacts = [
    { id: 1, name: 'Karim Alaoui', trip: 'Paris → Casablanca', avatar: 'K', unread: 2, lastMessage: 'Super, on se voit à l\'aéroport !', time: '10:42' },
    { id: 2, name: 'Sara Majid', trip: 'Marrakech → Tanger', avatar: 'S', unread: 0, lastMessage: 'Combien de kilos vous reste-t-il ?', time: 'Hier' },
    { id: 3, name: 'Youssef Benali', trip: 'Agadir → Rabat', avatar: 'Y', unread: 0, lastMessage: 'Colis bien reçu, merci beaucoup 👍', time: 'Mar' },
  ];

  const currentMessages = [
    { id: 1, sender: 'Karim', text: 'Bonjour, est-ce que vous avez toujours de la place pour un colis de 3kg ?', time: '10:30', isMe: false },
    { id: 2, sender: 'Moi', text: 'Bonjour Karim ! Oui absolument, il me reste 5kg de disponibles.', time: '10:35', isMe: true },
    { id: 3, sender: 'Karim', text: 'Parfait. Comment fait-on pour la récupération ? Je suis à Paris 15e.', time: '10:38', isMe: false },
    { id: 4, sender: 'Moi', text: 'Je passe par la gare Montparnasse demain matin si ça vous arrange.', time: '10:40', isMe: true },
    { id: 5, sender: 'Karim', text: 'Super, on se voit à l\'aéroport !', time: '10:42', isMe: false },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    // In a real app we'd send via API here
    console.log("Sending message:", messageText);
    setMessageText('');
  };

  return (
    <div className="dashboard-page flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="container main-content flex-grow flex flex-col h-[calc(100vh-64px)] pb-8 pt-6">
        <header className="dashboard-header mb-6">
          <h1>Messagerie</h1>
          <p className="welcome-sub text-gray-500">Échangez facilement pour organiser vos envois de colis.</p>
        </header>

        <section className="card flex-grow flex overflow-hidden border border-gray-100 shadow-sm rounded-2xl" style={{ maxHeight: '70vh', background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
          {/* Sidebar */}
          <div className="w-1/3 min-w-[300px] border-r border-gray-100 flex flex-col" style={{ borderColor: 'var(--border)' }}>
            <div className="p-4 border-b border-gray-100" style={{ borderColor: 'var(--border)' }}>
              <div className="relative">
                <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  placeholder="Rechercher une conversation..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
                  style={{ background: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-grow">
              {contacts.map(contact => (
                <div 
                  key={contact.id}
                  onClick={() => setActiveChat(contact.id)}
                  className={`p-4 border-b border-gray-50 flex items-center gap-3 cursor-pointer transition-colors ${activeChat === contact.id ? 'bg-[var(--primary)] bg-opacity-5 border-l-4 border-[var(--primary)]' : 'hover:bg-gray-50'}`}
                  style={{ borderColor: activeChat === contact.id ? 'var(--primary)' : 'var(--border)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, var(--primary), var(--primary-dark))` }}>
                    {contact.avatar}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">{contact.name}</h4>
                      <span className="text-xs text-gray-500">{contact.time}</span>
                    </div>
                    <p className="text-xs text-[var(--primary)] font-medium mb-1 truncate"><i className="fa-solid fa-route mr-1"></i> {contact.trip}</p>
                    <p className={`text-sm truncate ${contact.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-[var(--primary)] text-white text-xs flex items-center justify-center font-bold">
                      {contact.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50" style={{ background: 'var(--bg-color)' }}>
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center shadow-sm z-10" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-[var(--primary)]">
                      {contacts.find(c => c.id === activeChat)?.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{contacts.find(c => c.id === activeChat)?.name}</h3>
                      <p className="text-xs text-gray-500">En ligne aujourd'hui</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors" style={{ background: 'var(--bg-subtle)' }}>
                      <i className="fa-solid fa-phone"></i>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors" style={{ background: 'var(--bg-subtle)' }}>
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                  <div className="text-center my-2">
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">Aujourd'hui</span>
                  </div>
                  
                  {currentMessages.map(msg => (
                    <div key={msg.id} className={`flex max-w-[70%] ${msg.isMe ? 'self-end' : 'self-start'}`}>
                      <div className={`p-4 px-5 rounded-2xl shadow-sm ${msg.isMe ? 'bg-[var(--primary)] text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'}`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <span className={`text-[10px] mt-2 block text-right ${msg.isMe ? 'text-white opacity-70' : 'text-gray-400'}`}>
                          {msg.time} {msg.isMe && <i className="fa-solid fa-check-double ml-1"></i>}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
                  <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
                    <button type="button" className="p-3 text-gray-400 hover:text-[var(--primary)] transition-colors">
                      <i className="fa-solid fa-paperclip text-xl"></i>
                    </button>
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl flex items-end p-1 transition-all focus-within:border-[var(--primary)] focus-within:ring-1 focus-within:ring-[var(--primary)]" style={{ background: 'var(--bg-subtle)', borderColor: 'var(--border)' }}>
                      <textarea 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Écrivez votre message..." 
                        className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] p-3 text-sm text-gray-800"
                        rows={1}
                        style={{ outline: 'none' }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      ></textarea>
                      <button type="button" className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
                        <i className="fa-regular fa-face-smile text-xl"></i>
                      </button>
                    </div>
                    <button 
                      type="submit" 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-transform hover:scale-105"
                      style={{ background: messageText.trim() ? 'var(--primary)' : 'var(--text-light)', cursor: messageText.trim() ? 'pointer' : 'default' }}
                      disabled={!messageText.trim()}
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-[var(--primary)] shadow-inner">
                  <i className="fa-regular fa-comments text-4xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Vos messages</h3>
                <p className="text-gray-500 max-w-sm">Sélectionnez une conversation dans la liste de gauche pour afficher les messages, ou démarrez une nouvelle discussion.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Messages;
