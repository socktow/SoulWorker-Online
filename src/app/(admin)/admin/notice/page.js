'use client';

import { useState } from 'react';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CalendarOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';

export default function NoticePage() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Bảo trì server ngày 15/12/2024',
      content: 'Server sẽ bảo trì từ 02:00 - 06:00 ngày 15/12/2024. Vui lòng lưu game trước khi bảo trì.',
      type: 'maintenance',
      status: 'active',
      priority: 'high',
      createdAt: '2024-12-10T10:30:00',
      createdBy: 'Admin',
      views: 1250,
    },
    {
      id: 2,
      title: 'Event Halloween đã bắt đầu!',
      content: 'Tham gia event Halloween để nhận quà hấp dẫn. Event diễn ra từ 20/10 - 05/11.',
      type: 'event',
      status: 'active',
      priority: 'medium',
      createdAt: '2024-12-08T14:20:00',
      createdBy: 'Moderator',
      views: 890,
    },
    {
      id: 3,
      title: 'Cập nhật phiên bản mới v2.1.5',
      content: 'Phiên bản mới v2.1.5 đã được phát hành với nhiều tính năng mới và sửa lỗi.',
      type: 'update',
      status: 'inactive',
      priority: 'low',
      createdAt: '2024-12-05T09:15:00',
      createdBy: 'Admin',
      views: 567,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'general',
    status: 'active',
    priority: 'medium',
  });

  const noticeTypes = [
    { value: 'general', label: 'Thông báo chung', color: 'bg-blue-100 text-blue-800' },
    { value: 'maintenance', label: 'Bảo trì', color: 'bg-orange-100 text-orange-800' },
    { value: 'event', label: 'Sự kiện', color: 'bg-green-100 text-green-800' },
    { value: 'update', label: 'Cập nhật', color: 'bg-purple-100 text-purple-800' },
    { value: 'warning', label: 'Cảnh báo', color: 'bg-red-100 text-red-800' },
  ];

  const priorityLevels = [
    { value: 'low', label: 'Thấp', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Trung bình', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'Cao', color: 'bg-red-100 text-red-800' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Hoạt động', color: 'bg-green-100 text-green-800' },
    { value: 'inactive', label: 'Không hoạt động', color: 'bg-gray-100 text-gray-800' },
  ];

  const openModal = (notice = null) => {
    if (notice) {
      setEditingNotice(notice);
      setFormData({
        title: notice.title,
        content: notice.content,
        type: notice.type,
        status: notice.status,
        priority: notice.priority,
      });
    } else {
      setEditingNotice(null);
      setFormData({
        title: '',
        content: '',
        type: 'general',
        status: 'active',
        priority: 'medium',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNotice(null);
    setFormData({
      title: '',
      content: '',
      type: 'general',
      status: 'active',
      priority: 'medium',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingNotice) {
      // Update existing notice
      setNotices(notices.map(notice => 
        notice.id === editingNotice.id 
          ? { ...notice, ...formData, updatedAt: new Date().toISOString() }
          : notice
      ));
    } else {
      // Create new notice
      const newNotice = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        createdBy: 'Admin',
        views: 0,
      };
      setNotices([newNotice, ...notices]);
    }
    
    closeModal();
  };

  const deleteNotice = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
      setNotices(notices.filter(notice => notice.id !== id));
    }
  };

  const getTypeInfo = (type) => {
    return noticeTypes.find(t => t.value === type) || noticeTypes[0];
  };

  const getPriorityInfo = (priority) => {
    return priorityLevels.find(p => p.value === priority) || priorityLevels[1];
  };

  const getStatusInfo = (status) => {
    return statusOptions.find(s => s.value === status) || statusOptions[0];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Thông báo</h1>
          <p className="text-gray-600 mt-2">Tạo và quản lý thông báo cho server game</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <PlusOutlined />
          <span>Tạo thông báo</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tổng thông báo</p>
              <p className="text-2xl font-bold text-gray-900">{notices.length}</p>
            </div>
            <BellOutlined className="text-3xl text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Đang hoạt động</p>
              <p className="text-2xl font-bold text-green-600">
                {notices.filter(n => n.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tổng lượt xem</p>
              <p className="text-2xl font-bold text-gray-900">
                {notices.reduce((sum, notice) => sum + notice.views, 0)}
              </p>
            </div>
            <EyeOutlined className="text-3xl text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Ưu tiên cao</p>
              <p className="text-2xl font-bold text-red-600">
                {notices.filter(n => n.priority === 'high').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Danh sách thông báo</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông báo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ưu tiên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lượt xem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notices.map((notice) => {
                const typeInfo = getTypeInfo(notice.type);
                const priorityInfo = getPriorityInfo(notice.priority);
                const statusInfo = getStatusInfo(notice.status);
                
                return (
                  <tr key={notice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{notice.title}</div>
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {notice.content.substring(0, 100)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityInfo.color}`}>
                        {priorityInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {notice.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(notice.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openModal(notice)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <EditOutlined />
                        </button>
                        <button
                          onClick={() => deleteNotice(notice.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingNotice ? 'Chỉnh sửa thông báo' : 'Tạo thông báo mới'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề thông báo
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tiêu đề thông báo..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung thông báo
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập nội dung thông báo..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại thông báo
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {noticeTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mức độ ưu tiên
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {priorityLevels.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingNotice ? 'Cập nhật' : 'Tạo thông báo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
