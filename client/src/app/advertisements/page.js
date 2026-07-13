'use client'

import { useState } from 'react'
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    X,
    Filter,
    Calendar,
    TrendingUp,
    MousePointer,
    Users,
    DollarSign,
    Play,
    Pause,
    MoreVertical,
    Image as ImageIcon,
    Link,
    Clock
} from 'lucide-react'

export default function AdvertisementsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('all')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [selectedAd, setSelectedAd] = useState(null)

    // Mock data - Replace with API calls
    const advertisements = [
        {
            id: 1,
            title: 'Summer Sale Banner',
            placement: 'Homepage',
            type: 'banner',
            views: 2345,
            clicks: 45,
            ctr: '1.92%',
            status: 'active',
            startDate: 'Jun 1, 2026',
            endDate: 'Jun 30, 2026',
            budget: '$500',
            spent: '$320',
            image: '🖼️',
            color: 'green'
        },
        {
            id: 2,
            title: 'Plumbing Services Ad',
            placement: 'Category Page',
            type: 'sidebar',
            views: 1234,
            clicks: 23,
            ctr: '1.86%',
            status: 'pending',
            startDate: 'Jun 15, 2026',
            endDate: 'Jul 15, 2026',
            budget: '$300',
            spent: '$0',
            image: '🔧',
            color: 'yellow'
        },
        {
            id: 3,
            title: 'New User Offer',
            placement: 'Booking Page',
            type: 'popup',
            views: 856,
            clicks: 12,
            ctr: '1.40%',
            status: 'expired',
            startDate: 'May 1, 2026',
            endDate: 'May 31, 2026',
            budget: '$200',
            spent: '$200',
            image: '🎉',
            color: 'red'
        },
        {
            id: 4,
            title: 'Painting Services Ad',
            placement: 'Homepage',
            type: 'banner',
            views: 1678,
            clicks: 34,
            ctr: '2.03%',
            status: 'active',
            startDate: 'Jun 10, 2026',
            endDate: 'Jul 10, 2026',
            budget: '$400',
            spent: '$210',
            image: '🎨',
            color: 'green'
        },
        {
            id: 5,
            title: 'Premium Subscription',
            placement: 'Sidebar',
            type: 'sidebar',
            views: 945,
            clicks: 8,
            ctr: '0.85%',
            status: 'pending',
            startDate: 'Jul 1, 2026',
            endDate: 'Jul 31, 2026',
            budget: '$250',
            spent: '$0',
            image: '⭐',
            color: 'yellow'
        },
        {
            id: 6,
            title: 'Electrical Services Ad',
            placement: 'Category Page',
            type: 'banner',
            views: 1123,
            clicks: 19,
            ctr: '1.69%',
            status: 'expired',
            startDate: 'Apr 1, 2026',
            endDate: 'Apr 30, 2026',
            budget: '$350',
            spent: '$350',
            image: '⚡',
            color: 'red'
        },
    ]

    // Get counts for tabs
    const getCounts = () => {
        const active = advertisements.filter(a => a.status === 'active').length
        const pending = advertisements.filter(a => a.status === 'pending').length
        const expired = advertisements.filter(a => a.status === 'expired').length
        return { active, pending, expired, all: advertisements.length }
    }

    const counts = getCounts()

    // Filter ads based on search and tab
    const filteredAds = advertisements.filter(ad => {
        const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ad.placement.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesTab = activeTab === 'all' || ad.status === activeTab
        return matchesSearch && matchesTab
    })

    // Get status badge style
    const getStatusBadge = (status) => {
        const configs = {
            'active': 'bg-green-100 text-green-700 border-green-200',
            'pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'expired': 'bg-red-100 text-red-700 border-red-200',
            'paused': 'bg-gray-100 text-gray-700 border-gray-200'
        }
        return configs[status] || configs['pending']
    }

    // Get status icon
    const getStatusIcon = (status) => {
        const icons = {
            'active': '🟢',
            'pending': '🟡',
            'expired': '🔴',
            'paused': '⏸️'
        }
        return icons[status] || '🟡'
    }

    // Get placement icon
    const getPlacementIcon = (placement) => {
        const icons = {
            'Homepage': '🏠',
            'Category Page': '📂',
            'Booking Page': '📅',
            'Sidebar': '📋',
            'Popup': '🪟'
        }
        return icons[placement] || '📋'
    }

    // Stats for summary cards
    const stats = [
        {
            label: 'Total Ads',
            value: advertisements.length,
            icon: ImageIcon,
            color: 'primary'
        },
        {
            label: 'Active Ads',
            value: advertisements.filter(a => a.status === 'active').length,
            icon: Play,
            color: 'green'
        },
        {
            label: 'Total Views',
            value: '8,181',
            icon: Eye,
            color: 'blue'
        },
        {
            label: 'Total Clicks',
            value: '141',
            icon: MousePointer,
            color: 'purple'
        },
    ]

    // Format number with commas
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Advertisement Management</h1>
                    <p className="text-sm text-gray-500">Create and manage your ad campaigns</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Ad
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-10 h-10 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'all'
                            ? 'text-primary-600 border-b-2 border-primary-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    All ({counts.all})
                </button>
                <button
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'active'
                            ? 'text-primary-600 border-b-2 border-primary-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Active ({counts.active})
                </button>
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'pending'
                            ? 'text-primary-600 border-b-2 border-primary-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Pending ({counts.pending})
                </button>
                <button
                    onClick={() => setActiveTab('expired')}
                    className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === 'expired'
                            ? 'text-primary-600 border-b-2 border-primary-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Expired ({counts.expired})
                </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search ads by title or placement..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>
            </div>

            {/* Ad Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAds.map((ad) => (
                    <div
                        key={ad.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group"
                    >
                        {/* Ad Preview Image */}
                        <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-6xl">{ad.image}</div>
                            <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(ad.status)}`}>
                                    {getStatusIcon(ad.status)} {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                                </span>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                {ad.placement}
                            </div>
                        </div>

                        {/* Ad Details */}
                        <div className="p-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold text-gray-800">{ad.title}</h3>
                                    <p className="text-sm text-gray-500">{ad.type.charAt(0).toUpperCase() + ad.type.slice(1)} Ad</p>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreVertical className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="mt-3 grid grid-cols-3 gap-2">
                                <div className="text-center p-2 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500">Views</p>
                                    <p className="text-sm font-semibold text-gray-800">{formatNumber(ad.views)}</p>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500">Clicks</p>
                                    <p className="text-sm font-semibold text-gray-800">{ad.clicks}</p>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500">CTR</p>
                                    <p className="text-sm font-semibold text-gray-800">{ad.ctr}</p>
                                </div>
                            </div>

                            {/* Budget & Date */}
                            <div className="mt-3 space-y-1 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Budget</span>
                                    <span className="font-medium text-gray-800">{ad.budget}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Spent</span>
                                    <span className="font-medium text-gray-800">{ad.spent}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500">Duration</span>
                                    <span className="text-gray-600 text-xs">{ad.startDate} - {ad.endDate}</span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full ${ad.status === 'active' ? 'bg-green-500' :
                                                ad.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${Math.min((parseInt(ad.spent.replace('$', '')) / parseInt(ad.budget.replace('$', ''))) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    {ad.status === 'active' && (
                                        <button className="p-1.5 hover:bg-yellow-50 rounded-lg transition-colors text-yellow-600">
                                            <Pause className="w-4 h-4" />
                                        </button>
                                    )}
                                    {ad.status === 'pending' && (
                                        <button className="p-1.5 hover:bg-green-50 rounded-lg transition-colors text-green-600">
                                            <Play className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => setSelectedAd(ad)}
                                    className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                                >
                                    <Eye className="w-3 h-3" />
                                    View Stats
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredAds.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <div className="text-6xl mb-4">📢</div>
                    <h3 className="text-lg font-semibold text-gray-800">No advertisements found</h3>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="mt-4 btn-primary inline-flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Ad
                    </button>
                </div>
            )}

            {/* Create Ad Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-800">Create New Advertisement</h2>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Title *</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g., Summer Sale Banner"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Placement *</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white">
                                        <option value="homepage">Homepage</option>
                                        <option value="category">Category Page</option>
                                        <option value="booking">Booking Page</option>
                                        <option value="sidebar">Sidebar</option>
                                        <option value="popup">Popup</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Type *</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white">
                                        <option value="banner">Banner</option>
                                        <option value="sidebar">Sidebar</option>
                                        <option value="popup">Popup</option>
                                        <option value="native">Native</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Image</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
                                    <div className="text-4xl mb-2">🖼️</div>
                                    <p className="text-sm text-gray-500">Click or drag to upload ad image</p>
                                    <p className="text-xs text-gray-400 mt-1">Recommended: 1200 x 628px</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Target URL</label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="https://example.com/landing-page"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget *</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g., $500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Daily Budget</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g., $50"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white">
                                    <option value="all">All Users</option>
                                    <option value="new">New Users</option>
                                    <option value="existing">Existing Users</option>
                                    <option value="location">By Location</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button className="flex-1 btn-primary">Create Ad</button>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Ad Stats Modal */}
            {selectedAd && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Ad Performance</h2>
                            <button
                                onClick={() => setSelectedAd(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">{selectedAd.image}</div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{selectedAd.title}</h3>
                                    <p className="text-sm text-gray-500">{selectedAd.placement}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <p className="text-sm text-gray-500">Total Views</p>
                                    <p className="text-2xl font-bold text-gray-800">{formatNumber(selectedAd.views)}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <p className="text-sm text-gray-500">Total Clicks</p>
                                    <p className="text-2xl font-bold text-gray-800">{selectedAd.clicks}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <p className="text-sm text-gray-500">CTR</p>
                                    <p className="text-2xl font-bold text-primary-600">{selectedAd.ctr}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(selectedAd.status)}`}>
                                        {selectedAd.status.charAt(0).toUpperCase() + selectedAd.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Budget</span>
                                    <span className="font-medium text-gray-800">{selectedAd.budget}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm mt-1">
                                    <span className="text-gray-500">Spent</span>
                                    <span className="font-medium text-gray-800">{selectedAd.spent}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm mt-1">
                                    <span className="text-gray-500">Remaining</span>
                                    <span className="font-medium text-green-600">
                                        ${parseInt(selectedAd.budget.replace('$', '')) - parseInt(selectedAd.spent.replace('$', ''))}
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-primary-600 h-2 rounded-full"
                                            style={{ width: `${(parseInt(selectedAd.spent.replace('$', '')) / parseInt(selectedAd.budget.replace('$', ''))) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedAd(null)}
                                className="w-full btn-primary"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
