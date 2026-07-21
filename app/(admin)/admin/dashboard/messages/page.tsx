"use client";

import { useState, useEffect, useCallback } from "react";
import { MessageSquare, Search, Mail, Phone, Clock, Eye, X, Trash2, Calendar, User, Info } from "lucide-react";
import { getAllMessages, deleteMessage } from "@/services/messages.service";
import Toast from "@/app/components/ui/Toast";

interface Message {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone_number: string | null;
  subject: string;
  message: string;
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [showToast, setShowToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllMessages();
      setMessages(data || []);
    } catch (err: unknown) {
      setShowToast({ message: "Failed to fetch messages", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this message?")) return;
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      setShowToast({ message: "Message deleted successfully", type: "success" });
    } catch (err: unknown) {
      setShowToast({ message: "Failed to delete message", type: "error" });
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    msg.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 bg-white min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#222222] tracking-tight">Messages</h1>
          <p className="text-[#6A6A6A] font-medium mt-1">Review and manage user inquiries and support requests</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 text-blue-600 px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-sm">
           <MessageSquare className="w-5 h-5" /> {messages.length} Total Messages
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <div className="relative w-full xl:w-[32rem] group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0D9488] transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, email, or subject..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-8 py-4.5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] text-sm focus:outline-none focus:ring-4 focus:ring-[#0D9488]/5 focus:border-[#0D9488] transition-all font-medium"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">
                <th className="px-10 py-6">S.N</th>
                <th className="px-10 py-6">User Details</th>
                <th className="px-10 py-6">Subject</th>
                <th className="px-10 py-6">Received At</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                   <td colSpan={5} className="py-20 text-center text-gray-400 font-medium">
                      <div className="w-8 h-8 border-4 border-[#F0FDFA] border-t-[#0D9488] rounded-full animate-spin mx-auto mb-4"></div>
                      Fetching messages from database...
                   </td>
                </tr>
              ) : filteredMessages.length > 0 ? filteredMessages.map((msg, index) => (
                <tr key={msg.id} className="hover:bg-gray-50/30 transition-all group">
                  <td className="px-10 py-7 text-sm font-bold text-gray-300">
                    {index + 1}.
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex flex-col">
                      <div className="text-base font-bold text-[#222222] group-hover:text-[#0D9488] transition-colors">
                        {msg.full_name}
                      </div>
                      <div className="text-xs text-[#6A6A6A] font-medium flex items-center mt-1">
                        <Mail className="w-3 h-3 mr-2 text-gray-400" /> {msg.email}
                      </div>
                      {msg.phone_number && (
                        <div className="text-xs text-[#6A6A6A] font-medium flex items-center mt-1">
                          <Phone className="w-3 h-3 mr-2 text-gray-400" /> {msg.phone_number}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-10 py-7 font-bold text-gray-600 text-sm">
                    {msg.subject}
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl w-fit">
                        <Calendar className="w-4 h-4 opacity-50" />
                        {new Date(msg.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                       <button 
                        onClick={() => { setSelectedMessage(msg); setIsViewModalOpen(true); }}
                        title="View Message" 
                        className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                       >
                         <Eye className="w-5 h-5" />
                       </button>
                       <button 
                        onClick={() => handleDeleteMessage(msg.id)}
                        title="Delete Message" 
                        className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-500 hover:bg-black hover:text-white rounded-xl transition-all shadow-sm"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan={5} className="py-20 text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-gray-200">
                         <MessageSquare className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No messages found</p>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Message Modal */}
      {isViewModalOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#222222]/80 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col relative">
            
            <button 
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-8 right-8 z-10 w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-[#0D9488] hover:text-white rounded-full transition-all text-gray-400 shadow-sm"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-12">
               <div className="mb-10">
                  <div className="flex items-center gap-3 text-[#0D9488] font-bold uppercase tracking-[0.2em] text-[10px] mb-2">
                     <Info className="w-4 h-4" /> Message Detail
                  </div>
                  <h2 className="text-3xl font-black text-[#222222] tracking-tight mb-6 leading-tight">
                    {selectedMessage.subject}
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                           <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sender</p>
                           <p className="text-sm font-bold text-[#222222]">{selectedMessage.full_name}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                           <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Email</p>
                           <p className="text-sm font-bold text-[#222222]">{selectedMessage.email}</p>
                        </div>
                     </div>
                     {selectedMessage.phone_number && (
                        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Phone className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Phone</p>
                            <p className="text-sm font-bold text-[#222222]">{selectedMessage.phone_number}</p>
                          </div>
                        </div>
                     )}
                     <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                           <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Received</p>
                           <p className="text-sm font-bold text-[#222222]">
                              {new Date(selectedMessage.created_at).toLocaleString()}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#6A6A6A] mb-4">Message Content</h4>
                  <div className="text-[#222222] font-medium leading-relaxed whitespace-pre-wrap text-lg">
                    {selectedMessage.message}
                  </div>
               </div>

               <div className="mt-12">
                  <button 
                    onClick={() => setIsViewModalOpen(false)}
                    className="w-full py-5 bg-[#222222] text-white font-bold rounded-2xl hover:bg-[#333333] transition-all shadow-lg active:scale-[0.98]"
                  >
                    Done Reading
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <Toast 
          message={showToast.message} 
          type={showToast.type} 
          onClose={() => setShowToast(null)} 
        />
      )}

    </div>
  );
}
