import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroBanner from '../components/layout/HeroBanner';
import CategoryFilters from '../components/filters/CategoryFilters';
import FilterToolbar from '../components/filters/FilterToolbar';
import ResourceGrid from '../components/resources/ResourceGrid';
import SkeletonGrid from '../components/feedback/SkeletonGrid';
import EmptyState from '../components/feedback/EmptyState';
import AddEditResourceModal from '../components/modals/AddEditResourceModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import ToastNotification from '../components/feedback/ToastNotification';
import resourceApi from '../services/api/apiDev';
import { ChevronLeft, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import Button from '../components/common/Button';

export const DashboardPage = () => {
  // 1. Core Data & Loading States
  const [resources, setResources] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1
  });
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // 2. Filter, Search, Sort & Pagination States
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // 3. Modals & Action States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [deletingResource, setDeletingResource] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalApiError, setModalApiError] = useState(null);

  // 4. Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 3500);
  };

  // Debounce search query (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset page on new search
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch resources from Backend API
  const fetchResources = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      const params = {
        page: currentPage,
        limit: 12,
        sortBy
      };

      if (debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      if (activeCategory && activeCategory !== 'All') {
        params.category = activeCategory;
      }

      if (activeTag.trim()) {
        params.tag = activeTag.trim();
      }

      const res = await resourceApi.getAll(params);

      if (res.success) {
        setResources(res.data || []);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      }
    } catch (err) {
      console.error('Fetch resources error:', err);
      setFetchError(err.message || 'Không thể kết nối đến máy chủ API. Vui lòng kiểm tra lại kết nối mạng.');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, sortBy, debouncedSearch, activeCategory, activeTag]);

  // Trigger fetch when query params change
  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  // Reset pagination when category or tag changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleTagChange = (tag) => {
    setActiveTag(tag);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveCategory('All');
    setActiveTag('');
    setSearchQuery('');
    setDebouncedSearch('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Create Resource
  const handleCreateResource = async (formData) => {
    setIsSubmitting(true);
    setModalApiError(null);

    try {
      const res = await resourceApi.create(formData);
      if (res.success) {
        setIsCreateModalOpen(false);
        showToast('success', 'Tạo mới thành công', `Đã thêm tài nguyên "${res.data.title}" vào workspace.`);
        fetchResources();
      }
    } catch (err) {
      console.error('Create resource error:', err);
      const errorMsg = err.errors && err.errors.length > 0 ? err.errors.join(', ') : err.message;
      setModalApiError(errorMsg);
      showToast('error', 'Thất bại', errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Resource
  const handleUpdateResource = async (formData) => {
    if (!editingResource?._id) return;
    setIsSubmitting(true);
    setModalApiError(null);

    try {
      const res = await resourceApi.update(editingResource._id, formData);
      if (res.success) {
        setEditingResource(null);
        showToast('success', 'Cập nhật thành công', `Đã lưu thay đổi cho "${res.data.title}".`);
        // Optimistically update in state
        setResources(prev => prev.map(item => item._id === res.data._id ? res.data : item));
      }
    } catch (err) {
      console.error('Update resource error:', err);
      const errorMsg = err.errors && err.errors.length > 0 ? err.errors.join(', ') : err.message;
      setModalApiError(errorMsg);
      showToast('error', 'Cập nhật thất bại', errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Resource
  const handleDeleteResource = async () => {
    if (!deletingResource?._id) return;
    setIsSubmitting(true);

    try {
      const res = await resourceApi.delete(deletingResource._id);
      if (res.success) {
        const deletedTitle = deletingResource.title;
        setDeletingResource(null);
        showToast('error', 'Đã xóa tài nguyên', `Tài nguyên "${deletedTitle}" đã được gỡ khỏi hệ thống.`);
        // Optimistically remove from state
        setResources(prev => prev.filter(item => item._id !== deletingResource._id));
        setPagination(prev => ({ ...prev, total: Math.max(0, prev.total - 1) }));
      }
    } catch (err) {
      console.error('Delete resource error:', err);
      showToast('error', 'Xóa thất bại', err.message || 'Có lỗi khi xóa tài nguyên.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Upvote Resource (Optimistic Update)
  const handleUpvote = async (id) => {
    // Optimistic UI increment
    setResources(prev =>
      prev.map(item =>
        item._id === id ? { ...item, upvotes: (item.upvotes || 0) + 1 } : item
      )
    );

    try {
      await resourceApi.upvote(id);
      showToast('success', 'Đã Upvote', 'Cảm ơn bạn đã bình chọn cho tài nguyên này!');
    } catch (err) {
      console.error('Upvote error:', err);
      // Rollback on error
      setResources(prev =>
        prev.map(item =>
          item._id === id ? { ...item, upvotes: Math.max(0, (item.upvotes || 1) - 1) } : item
        )
      );
      showToast('error', 'Lỗi Upvote', err.message || 'Không thể ghi nhận lượt bình chọn.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-100">
      
      {/* 1. Navbar */}
      <Navbar
        onOpenCreateModal={() => {
          setModalApiError(null);
          setIsCreateModalOpen(true);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Hero Banner */}
      <HeroBanner onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {/* 3. Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Category Filter Chips */}
        <CategoryFilters
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />

        {/* Filter Toolbar (Search input, Tag pills, Sort dropdown, Results count) */}
        <FilterToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTag={activeTag}
          onSelectTag={handleTagChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          totalResults={pagination.total}
        />

        {/* Fetch Error State Banner */}
        {fetchError && (
          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/30 text-rose-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white">Không thể tải dữ liệu</h4>
                <p className="text-xs opacity-90">{fetchError}</p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={fetchResources}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Thử lại
            </Button>
          </div>
        )}

        {/* Dynamic Display: Loading / Empty / Resource Grid */}
        {isLoading ? (
          <SkeletonGrid count={8} />
        ) : resources.length === 0 ? (
          <EmptyState
            title="Không tìm thấy tài nguyên"
            message={
              debouncedSearch || activeCategory !== 'All' || activeTag
                ? 'Không có tài nguyên nào phù hợp với bộ lọc tìm kiếm hiện tại.'
                : 'Chưa có tài nguyên nào trong hệ thống. Hãy là người đầu tiên đóng góp!'
            }
            onResetFilters={
              debouncedSearch || activeCategory !== 'All' || activeTag
                ? handleResetFilters
                : null
            }
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        ) : (
          <ResourceGrid
            resources={resources}
            onEdit={(resource) => {
              setModalApiError(null);
              setEditingResource(resource);
            }}
            onDelete={(resource) => setDeletingResource(resource)}
            onUpvote={handleUpvote}
          />
        )}

        {/* 4. Pagination Controls */}
        {!isLoading && resources.length > 0 && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-800/80 text-xs">
            <p className="text-slate-400 font-mono">
              Hiển thị trang <span className="font-semibold text-slate-200">{pagination.page}</span> /{' '}
              <span className="font-semibold text-slate-200">{pagination.totalPages}</span> (Tổng {pagination.total} tài nguyên)
            </p>

            <div className="flex items-center gap-1.5">
              <button
                disabled={pagination.page <= 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - pagination.page) <= 1)
                .map((page, idx, arr) => (
                  <React.Fragment key={page}>
                    {idx > 0 && page - arr[idx - 1] > 1 && (
                      <span className="px-1 text-slate-600 font-mono">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-xl font-mono text-xs font-semibold border transition-all cursor-pointer ${
                        pagination.page === page
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}

              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* 5. Modals */}
      {/* Create Modal */}
      <AddEditResourceModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setModalApiError(null);
        }}
        onSubmit={handleCreateResource}
        isLoading={isSubmitting}
        apiError={modalApiError}
      />

      {/* Edit Modal */}
      <AddEditResourceModal
        isOpen={Boolean(editingResource)}
        initialData={editingResource}
        onClose={() => {
          setEditingResource(null);
          setModalApiError(null);
        }}
        onSubmit={handleUpdateResource}
        isLoading={isSubmitting}
        apiError={modalApiError}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingResource)}
        resourceTitle={deletingResource?.title}
        onClose={() => setDeletingResource(null)}
        onConfirm={handleDeleteResource}
        isLoading={isSubmitting}
      />

      {/* 6. Toast Notification */}
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* 7. Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 text-center text-xs text-slate-500">
        <p>© 2026 DevPulse – Bookmark & Resource Directory. Built with React & Node.js.</p>
      </footer>

    </div>
  );
};

export default DashboardPage;
