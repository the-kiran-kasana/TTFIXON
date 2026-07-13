'use client'

import { useState } from 'react'
import {
    Plus,
    Calendar,
    LayoutGrid,
    List,
    Edit,
    Pause,
    Play,
    BarChart3,
    Trash2,
    X,
    Search,
    Filter,
    MoreVertical,
    Clock,
    Users,
    TrendingUp,
    Eye
} from 'lucide-react'

// Helper function - Move outside component
const getCardColor = (color) => {
    const colors = {
        purple: 'border-purple-200 bg-purple-50',
        blue: 'border-blue-200 bg-blue-50',
        green: 'border-green-200 bg-green-50',
        yellow: 'border-yellow-200 bg-yellow-50',
        pink: 'border-pink-200 bg-pink-50',
        red: 'border-red-200 bg-red-50',
        orange: 'border-orange-200 bg-orange-50',
        indigo: 'border-indigo-200 bg-indigo-50'
    }
    return colors[color] || colors.purple
}

// Helper function - Move outside component
const getStatusColor = (status) => {
    const colors = {
        planning: 'bg-purple-100 text-purple-700 border-purple-200',
        running: 'bg-green-100 text-green-700 border-green-200',
        completed: 'bg-blue-100 text-blue-700 border-blue-200',
        paused: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    }
    return colors[status] || colors.planning
}

// Campaign Card Component
function CampaignCard({ campaign, status }) {
    const getActionButton = () => {
        switch (status) {
            case 'planning':
                return (
                    <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
                        Edit
                    </button>
                )
            case 'running':
                return (
                    <button className="text-xs text-yellow-600 hover:text-yellow-700 font-medium">
                        Pause
                    </button>
                )
            case 'completed':
                return (
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        View Stats
                    </button>
                )
            default:
                return null
        }
    }

    return (
        <div className={`bg-white rounded-lg p-4 border ${getCardColor(campaign.color)} shadow-sm hover:shadow-md transition-all group`}>
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl">{campaign.icon}</span>
                    <div>
                        <h4 className="font-medium text-gray-800 text-sm">{campaign.name}</h4>
                        <p className="text-xs text-gray-500">{campaign.type}</p>
                    </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{campaign.startDate} - {campaign.endDate}</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-700">{campaign.budget}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{campaign.reach} reach</span>
                </div>
                {getActionButton()}
            </div>

            {campaign.status === 'running' && (
                <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                            className="bg-green-500 h-1 rounded-full"
                            style={{ width: `${Math.min((campaign.conversions / 500) * 100, 100)}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">{campaign.conversions} conversions</span>
                        <span className="text-xs text-green-600 font-medium">{campaign.roi}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

// Helper component for check icon
function Check(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

export default function CampaignsPage() {
    const [viewMode, setViewMode] = useState('board')
    const [activeTab, setActiveTab] = useState('all')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    // Mock data
    const campaigns = [
        {
            id: 1,
            name: 'Diwali Sale 2026',
            type: 'Festival',
            status: 'planning',
            startDate: 'Jun 15, 2026',
            endDate: 'Jun 30, 2026',
            budget: '$5,000',
            reach: '12,500',
            conversions: 234,
            roi: '4.2x',
            icon: '🎆',
            color: 'purple'
        },
        {
            id: 2,
            name: 'Monsoon Mega Offer',
            type: 'Seasonal',
            status: 'running',
            startDate: 'Jun 1, 2026',
            endDate: 'Jun 15, 2026',
            budget: '$3,500',
            reach: '8,200',
            conversions: 189,
            roi: '3.8x',
            icon: '🌧️',
            color: 'blue'
        },
        {
            id: 3,
            name: 'Summer Sale Campaign',
            type: 'Seasonal',
            status: 'completed',
            startDate: 'May 1, 2026',
            endDate: 'May 31, 2026',
            budget: '$8,000',
            reach: '15,600',
            conversions: 456,
            roi: '5.1x',
            icon: '☀️',
            color: 'green'
        },
        {
            id: 4,
            name: 'New User Welcome',
            type: 'Acquisition',
            status: 'planning',
            startDate: 'Jul 1, 2026',
            endDate: 'Jul 31, 2026',
            budget: '$2,000',
            reach: '5,000',
            conversions: 0,
            roi: '0x',
            icon: '👋',
            color: 'yellow'
        },
        {
            id: 5,
            name: 'Referral Program',
            type: 'Loyalty',
            status: 'running',
            startDate: 'Jun 10, 2026',
            endDate: 'Aug 10, 2026',
            budget: '$4,000',
            reach: '6,800',
            conversions: 312,
            roi: '6.2x',
            icon: '🤝',
            color: 'pink'
        },
        {
            id: 6,
            name: 'Holiday Special',
            type: 'Festival',
            status: 'completed',
            startDate: 'Apr 1, 2026',
            endDate: 'Apr 30, 2026',
            budget: '$6,000',
            reach: '10,200',
            conversions: 289,
            roi: '4.5x',
            icon: '🎄',
            color: 'red'
        },
    ]

    // Filter campaigns
    const getFilteredCampaigns = () => {
        let filtered = campaigns

        if (activeTab !== 'all') {
            filtered = filtered.filter(c => c.status === activeTab)
        }

        if (searchTerm) {
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.type.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        return filtered
    }

    const filteredCampaigns = getFilteredCampaigns()

    // Get campaigns by status
    const getCampaignsByStatus = (status) => {
        return filteredCampaigns.filter(c => c.status === status)
    }

    // Stats
    const stats = [
        { label: 'Total Campaigns', value: campaigns.length, icon: TrendingUp, color: 'primary' },
        { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'running').length, icon: Play, color: 'green' },
        { label: 'Total Reach', value: '58,300', icon: Users, color: 'blue' },
        { label: 'Avg ROI', value: '4.8x', icon: BarChart3, color: 'purple' },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Campaign Management</h1>
                    <p className="text-sm text-gray-500">Plan, execute, and track marketing campaigns</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Campaign
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

            {/* View Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex flex-wrap gap-1 border-b border-gray-200 pb-2 sm:pb-0 sm:border-b-0">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === 'all'
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveTab('planning')}
                        className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === 'planning'
                                ? 'bg-purple-600 text-white'
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        Planning
                    </button>
                    <button
                        onClick={() => setActiveTab('running')}
                        className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === 'running'
                                ? 'bg-green-600 text-white'
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        Running
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === 'completed'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        Completed
                    </button>
                </div>

                {/* View Mode & Search */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all w-48 sm:w-56"
                        />
                    </div>

                    <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                        <button
                            onClick={() => setViewMode('board')}
                            className={`p-1.5 rounded transition-all ${viewMode === 'board' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`p-1.5 rounded transition-all ${viewMode === 'calendar' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <Calendar className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Board View */}
            {viewMode === 'board' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Planning Column */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <h3 className="font-semibold text-gray-800">Planning</h3>
                                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                                    {getCampaignsByStatus('planning').length}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {getCampaignsByStatus('planning').map((campaign) => (
                                <CampaignCard key={campaign.id} campaign={campaign} status="planning" />
                            ))}
                            {getCampaignsByStatus('planning').length === 0 && (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    No campaigns in planning
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Running Column */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <h3 className="font-semibold text-gray-800">Running</h3>
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                    {getCampaignsByStatus('running').length}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {getCampaignsByStatus('running').map((campaign) => (
                                <CampaignCard key={campaign.id} campaign={campaign} status="running" />
                            ))}
                            {getCampaignsByStatus('running').length === 0 && (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    No campaigns running
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Completed Column */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <h3 className="font-semibold text-gray-800">Completed</h3>
                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                                    {getCampaignsByStatus('completed').length}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {getCampaignsByStatus('completed').map((campaign) => (
                                <CampaignCard key={campaign.id} campaign={campaign} status="completed" />
                            ))}
                            {getCampaignsByStatus('completed').length === 0 && (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    No completed campaigns
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reach</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCampaigns.map((campaign) => (
                                    <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{campaign.icon}</span>
                                                <div>
                                                    <p className="font-medium text-gray-800">{campaign.name}</p>
                                                    <p className="text-xs text-gray-400">{campaign.type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {campaign.startDate} - {campaign.endDate}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{campaign.budget}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{campaign.reach}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-green-600">{campaign.roi}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="p-1.5 hover:bg-primary-50 rounded-lg transition-colors text-primary-600">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                {campaign.status === 'running' && (
                                                    <button className="p-1.5 hover:bg-yellow-50 rounded-lg transition-colors text-yellow-600">
                                                        <Pause className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Calendar View */}
            {viewMode === 'calendar' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📅</div>
                        <h3 className="text-lg font-semibold text-gray-800">Calendar View</h3>
                        <p className="text-sm text-gray-500 mt-1">Campaign calendar coming soon</p>
                        <p className="text-xs text-gray-400 mt-2">Switch to Board or List view to see campaigns</p>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredCampaigns.length === 0 && viewMode !== 'calendar' && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <div className="text-6xl mb-4">📣</div>
                    <h3 className="text-lg font-semibold text-gray-800">No campaigns found</h3>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="mt-4 btn-primary inline-flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Campaign
                    </button>
                </div>
            )}

            {/* Create Campaign Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-800">Create New Campaign</h2>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name *</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g., Summer Sale 2026"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type *</label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white">
                                        <option value="seasonal">Seasonal</option>
                                        <option value="festival">Festival</option>
                                        <option value="acquisition">Acquisition</option>
                                        <option value="loyalty">Loyalty</option>
                                        <option value="promotional">Promotional</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget *</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g., $5,000"
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
                                    <option value="premium">Premium Users</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="Describe your campaign..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button className="flex-1 btn-primary">Create Campaign</button>
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
        </div>
    )
}
