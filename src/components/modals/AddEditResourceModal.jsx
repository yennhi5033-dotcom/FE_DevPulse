import React, { useState, useEffect } from 'react';
import { X, Link2, Tag, FileText, AlertCircle, Sparkles } from 'lucide-react';
import Button from '../common/Button';

const CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'AI', 'Mobile', 'UI/UX'];

export const AddEditResourceModal = ({
  isOpen = false,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false,
  apiError = null
}) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    category: 'Frontend',
    tags: [],
    summary: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        url: initialData.url || '',
        category: initialData.category || 'Frontend',
        tags: initialData.tags || [],
        summary: initialData.summary || ''
      });
    } else {
      setFormData({
        title: '',
        url: '',
        category: 'Frontend',
        tags: [],
        summary: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    const trimmed = tagInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!trimmed) return;
    if (formData.tags.length >= 5) {
      setErrors(prev => ({ ...prev, tags: 'Chỉ được thêm tối đa 5 tags.' }));
      return;
    }
    if (formData.tags.includes(trimmed)) {
      setTagInput('');
      return;
    }
    setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmed] }));
    setTagInput('');
    setErrors(prev => ({ ...prev, tags: null }));
  };

  const handleKeyDownTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề không được để trống.';
    } else if (formData.title.trim().length < 3 || formData.title.trim().length > 100) {
      newErrors.title = 'Tiêu đề phải từ 3 đến 100 ký tự.';
    }

    const urlPattern = /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    if (!formData.url.trim()) {
      newErrors.url = 'Đường dẫn URL không được để trống.';
    } else if (!urlPattern.test(formData.url.trim())) {
      newErrors.url = 'Vui lòng nhập URL hợp lệ (bắt đầu bằng http:// hoặc https://).';
    }

    if (!formData.category) {
      newErrors.category = 'Vui lòng chọn danh mục.';
    }

    if (!formData.tags || formData.tags.length === 0) {
      newErrors.tags = 'Vui lòng nhập ít nhất 1 tag.';
    }

    if (formData.summary && formData.summary.length > 300) {
      newErrors.summary = 'Mô tả không được vượt quá 300 ký tự.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (onSubmit) {
        onSubmit({
          ...formData,
          title: formData.title.trim(),
          url: formData.url.trim(),
          summary: formData.summary.trim()
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0f1422] border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isEditMode ? 'Chỉnh sửa tài nguyên' : 'Thêm tài nguyên mới'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEditMode ? 'Cập nhật thông tin bookmark' : 'Lưu trữ bookmark công cụ/tài liệu vào workspace'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Global API Error Banner */}
        {apiError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* 1. Title Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-200 flex items-center gap-1">
                <span>Tiêu đề tài nguyên</span>
                <span className="text-rose-400">*</span>
              </label>
              <span className="text-[10px] text-slate-500 font-mono">
                {formData.title.length}/100
              </span>
            </div>
            <input
              type="text"
              maxLength={100}
              placeholder="VD: React 19 Documentation, Tailwind CSS, Docker Guide..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3.5 py-2.5 bg-slate-900/90 text-slate-100 rounded-xl border focus:outline-none transition-colors ${
                errors.title ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.title && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.title}
              </p>
            )}
          </div>

          {/* 2. URL Input */}
          <div>
            <label className="font-semibold text-slate-200 flex items-center gap-1 mb-1.5">
              <Link2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Link URL</span>
              <span className="text-rose-400">*</span>
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className={`w-full px-3.5 py-2.5 bg-slate-900/90 text-slate-100 rounded-xl border focus:outline-none transition-colors ${
                errors.url ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.url && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.url}
              </p>
            )}
          </div>

          {/* 3. Category & 4. Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-slate-200 block mb-1.5">
                <span>Danh mục (Category)</span>
                <span className="text-rose-400 ml-1">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 text-slate-100 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-slate-200">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-slate-200 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tags (1-5 tags)</span>
                  <span className="text-rose-400">*</span>
                </label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {formData.tags.length}/5
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Gõ tag + Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDownTag}
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 text-slate-100 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium shrink-0 cursor-pointer"
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>

          {/* Tags preview chips */}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-[11px]"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-cyan-400 hover:text-rose-400 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          {errors.tags && (
            <p className="text-[11px] text-rose-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.tags}
            </p>
          )}

          {/* 5. Summary Textarea with Character counter */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-200 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Nội dung tóm tắt</span>
                <span className="text-slate-500 font-normal">(tùy chọn)</span>
              </label>
              <span className={`text-[10px] font-mono ${
                300 - formData.summary.length < 20 ? 'text-amber-400' : 'text-slate-500'
              }`}>
                {300 - formData.summary.length} ký tự còn lại
              </span>
            </div>
            <textarea
              rows={3}
              maxLength={300}
              placeholder="Tóm tắt ngắn gọn tính năng chính hoặc lý do tài nguyên này hữu ích..."
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900/90 text-slate-100 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          {/* Modal Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/80">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              disabled={isLoading}
            >
              Hủy bỏ
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isEditMode ? 'Lưu thay đổi' : 'Thêm tài nguyên'}
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default AddEditResourceModal;
