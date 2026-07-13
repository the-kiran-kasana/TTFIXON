'use client'

import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Copy,
  Calendar,
  Tag,
  Percent,
  DollarSign,
  MapPin,
  Users,
  X,
  Filter
} from 'lucide-react'

export default function DiscountPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('active')
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Mock data - Replace with API calls
  const discounts = [
    {
      id: 1,
      name: 'Summer Sale',
      type: 'percentage',
      value: 20,
      category: 'All Services',
      area: 'All Areas',
      startDate: 'Jun 1, 2026',
      endDate: 'Jun 30, 2026',
      status: 'active',
      usage: 234,
      maxUses: 500,
      icon: '☀️'
    },
    {
      id: 2,
      name: 'New User Offer',
      type: 'percentage',
      value: 50,
      category: 'All Services',
      area: 'All Areas',
      startDate: 'Jun 1, 2026',
      endDate: 'Dec 31, 2026',
      status: 'active',
      usage: 45,
      maxUses: 100,
      icon: '🆕',
      maxDiscount: '₹50'
    },
    {
      id: 3,
      name: 'Mumbai Special',
      type: 'fixed',
      value: 100,
      category: 'Plumbing',
      area: 'Mumbai Zone',
      startDate: 'Jun 1, 2026',
      endDate: 'Jun 15, 2026',
      status: 'active',
      usage: 67,
      maxUses: 200,
      icon: '🏙️'
    },
    {
      id: 4,
      name: 'Diwali Flash Sale',
      type: 'percentage',
      value: 30,
      category: 'All Services',
      area: 'All Areas',
      startDate: 'May 1, 2026',
      endDate: 'May 15, 2026',
      status: 'expired',
      usage: 345,
      maxUses: 1000,
      icon: '🎆'
    },
    {
      id: 5,
      name: 'Weekend Special',
      type: 'fixed',
      value: 50,
      category: 'Painting',
      area: 'Delhi Zone',
      startDate: 'Jun 5, 2026',
      endDate: 'Jun 7, 2026',
      status: 'inactive',
      usage: 12,
      maxUses: 50,
      icon: '🎨'
    },
  ]

  // Get counts for tabs
  const getCounts = () => {
    const active = discounts.filter(d => d.status === 'active').length
    const inactive = discounts.filter(d => d.status === 'inactive').length
    const expired = discounts.filter(d => d.status === 'expired').length
    return { active, inactive, expired, all: discounts.length }
  }

  const counts = getCounts()

  // Filter discounts based on search and tab
  const filteredDiscounts = discounts.filter(discount => {
    const matchesSearch = discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discount.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'all' || discount.status === activeTab
    return matchesSearch && matchesTab
  })

  // Get status badge style
  const getStatusBadge = (status) => {
    const configs = {
      'active': 'bg-green-100 text-green-700 border-green-200',
      'inactive': 'bg-gray-100 text-gray-700 border-gray-200',
      'expired': 'bg-red-100 text-red-700 border-red-200'
    }
    return configs[status] || configs['inactive']
  }

  // Get discount type display
  const getDiscountDisplay = (discount) => {
    if (discount.type === 'percentage') {
      return `${discount.value}% OFF`
    } else {
      return `₹${discount.value} OFF`
    }
  }

  // Get discount type icon
  const getDiscountIcon = (type) => {
    return type === 'percentage' ? <Percent className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Discount Management</h1>
          <p className="text-smtext-gray-500">Create and manage promotional discounts</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Discount
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === 'active' 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Active ({counts.active})
        </button>
        <button
          onClick={() => setActiveTab('inactive')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === 'inactive' 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Inactive ({counts.inactive})
        </button>
        <button
          onClick={() => setActiveTab('expired')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === 'expired' 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Expired ({counts.expired})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-sm font-medium transition-colors relative ${
            activeTab === 'all' 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          All ({counts.all})
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search discounts by name or category..."
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

      {/* Discount Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDiscounts.map((discount) => (
          <div 
            key={discount.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group"
          >
            <div className="p-6">
              {/* Header Row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{discount.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{discount.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      {getDiscountIcon(discount.type)}
                      <span className="font-medium text-primary-600">{getDiscountDisplay(discount)}</span>
                      {discount.maxDiscount && (
                        <span className="text-xs text-gray-400">(Max {discount.maxDiscount})</span>
                      )}
                    </div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(discount.status)} flex-shrink-0 ml-2`}>
                  {discount.status.charAt(0).toUpperCase() + discount.status.slice(1)}
                </span>
              </div>

              {/* Details Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{discount.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{discount.area}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                  <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>{discount.startDate} - {discount.endDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                  <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>{discount.usage} / {discount.maxUses} used</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-primary-600 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(discount.usage / discount.maxUses) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">{Math.round((discount.usage / discount.maxUses) * 100)}% used</span>
                  <span className="text-xs text-gray-400">{discount.maxUses - discount.usage} remaining</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-1">
                <button className="p-2 hover:bg-primary-50 rounded-lg transition-colors text-primary-600">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDiscounts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-lg font-semibold text-gray-800">No discounts found</h3>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filter</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="mt-4 btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create New Discount
          </button>
        </div>
      )}

      {/* Create Discount Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-800">Create New Discount</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Form Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Name *</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Summer Sale"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type *</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value *</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g., 20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="all">All Services</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="painting">Painting</option>
                    <option value="electrical">Electrical</option>
                    <option value="interior">Interior</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white">
                    <option value="all">All Areas</option>
                    <option value="mumbai">Mumbai Zone</option>
                    <option value="delhi">Delhi Zone</option>
                    <option value="bangalore">Bangalore Zone</option>
                  </select>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Uses</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., 500"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700">Auto-apply discount</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700">First-time users only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700">Subscription users only</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 btn-primary">Create Discount</button>
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
