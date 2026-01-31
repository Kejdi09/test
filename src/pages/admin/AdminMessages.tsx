import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DataTable } from '../../components/admin/DataTable';
import { Modal } from '../../components/admin/Modal';
import { Mail, MailOpen, Trash2, Search, Reply } from 'lucide-react';
import { apiClient } from '../../lib/api';
import { toast } from 'sonner';

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  reply?: string;
  repliedAt?: string;
  createdAt: string;
}

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [filterRead, setFilterRead] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 0 });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchMessages();
  }, [page, filterRead]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const params: any = { page, limit: 20 };
      if (filterRead !== 'all') {
        params.isRead = filterRead === 'read';
      }

      const response = await apiClient.getMessages(params);
      setMessages(response.data.messages);
      setPagination(response.data.pagination);
      setUnreadCount(response.data.unreadCount);
    } catch (error: any) {
      toast.error('Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewMessage = async (message: Message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);

    if (!message.isRead) {
      try {
        await apiClient.markMessageAsRead(message._id, true);
        fetchMessages();
      } catch (error) {
        console.error('Failed to mark as read:', error);
      }
    }
  };

  const handleToggleRead = async (messageId: string, currentStatus: boolean) => {
    try {
      await apiClient.markMessageAsRead(messageId, !currentStatus);
      toast.success(`Marked as ${!currentStatus ? 'read' : 'unread'}`);
      fetchMessages();
    } catch (error) {
      toast.error('Failed to update message status');
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await apiClient.deleteMessage(messageId);
      toast.success('Message deleted successfully');
      fetchMessages();
      if (selectedMessage?._id === messageId) {
        setIsViewModalOpen(false);
        setSelectedMessage(null);
      }
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    try {
      await apiClient.replyToMessage(selectedMessage._id, replyText);
      toast.success('Reply sent successfully');
      setReplyText('');
      setIsReplyModalOpen(false);
      fetchMessages();
    } catch (error) {
      toast.error('Failed to send reply');
    }
  };

  const columns = [
    {
      key: 'isRead',
      label: '',
      render: (message: Message) => (
        <div className="flex items-center">
          {message.isRead ? (
            <MailOpen className="w-5 h-5 text-gray-400" />
          ) : (
            <Mail className="w-5 h-5 text-blue-600" />
          )}
        </div>
      )
    },
    {
      key: 'name',
      label: 'From',
      render: (message: Message) => (
        <div>
          <div className="font-medium">{message.name}</div>
          <div className="text-xs text-gray-500">{message.email}</div>
        </div>
      )
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (message: Message) => (
        <div className="max-w-md truncate">
          {message.subject}
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (message: Message) => (
        <div className="text-sm">
          {new Date(message.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (message: Message) => (
        <div className="flex flex-col gap-1">
          <span className={`px-2 py-1 text-xs rounded-full inline-block ${
            message.isRead ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {message.isRead ? 'Read' : 'Unread'}
          </span>
          {message.repliedAt && (
            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 inline-block">
              Replied
            </span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (message: Message) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleRead(message._id, message.isRead);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
            title={message.isRead ? 'Mark as unread' : 'Mark as read'}
          >
            {message.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(message._id);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterRead('all')}
              className={`px-4 py-2 rounded-lg ${
                filterRead === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterRead('unread')}
              className={`px-4 py-2 rounded-lg ${
                filterRead === 'unread'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilterRead('read')}
              className={`px-4 py-2 rounded-lg ${
                filterRead === 'read'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Read
            </button>
          </div>
        </div>

        <DataTable
          data={messages}
          columns={columns}
          isLoading={isLoading}
          onRowClick={handleViewMessage}
          emptyMessage="No messages found"
          pagination={{
            page,
            pages: pagination.pages,
            total: pagination.total,
            onPageChange: setPage
          }}
        />
      </div>

      {/* View Message Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedMessage(null);
        }}
        title="Message Details"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">From</label>
                <p className="mt-1 text-gray-900">{selectedMessage.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900">{selectedMessage.email}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <p className="mt-1 text-gray-900">{selectedMessage.subject}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <p className="mt-1 text-gray-900">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Message</label>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>

            {selectedMessage.reply && (
              <div>
                <label className="text-sm font-medium text-gray-700">Your Reply</label>
                <div className="mt-2 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.reply}</p>
                  {selectedMessage.repliedAt && (
                    <p className="mt-2 text-xs text-gray-500">
                      Replied on {new Date(selectedMessage.repliedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => handleDelete(selectedMessage._id)}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
              >
                Delete
              </button>
              <button
                onClick={() => setIsReplyModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Reply className="w-4 h-4" />
                Reply
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reply Modal */}
      <Modal
        isOpen={isReplyModalOpen}
        onClose={() => {
          setIsReplyModalOpen(false);
          setReplyText('');
        }}
        title="Reply to Message"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Reply
            </label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Type your reply here..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => {
                setIsReplyModalOpen(false);
                setReplyText('');
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleReply}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Send Reply
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};
