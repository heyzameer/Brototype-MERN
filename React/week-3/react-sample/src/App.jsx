import React, { useState } from 'react';
import { X, Search, MapPin, Home, Compass, Car } from 'lucide-react';

const TravelSearch = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'Search All', icon: Search },
    { id: 'stays', label: 'Stays', icon: Home },
    { id: 'activities', label: 'Things to Do', icon: Compass },
    { id: 'rentals', label: 'Rentals', icon: Car }
  ];

  const data = {
    all: [
      { id: 1, name: 'Dandeli Forest Stay', type: 'Stay', badge: 'Jungle Resort', image: 'https://diplomatvisa.com/wp-content/uploads/2024/12/Best-Places-to-Visit-in-Dandeli-1024x576.jpg' },
      { id: 2, name: 'Coorg Homestay', type: 'Stay', badge: 'Hill View', image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80' },
      { id: 3, name: 'River Rafting', type: 'Activity', badge: 'Adventure', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80' },
      { id: 4, name: 'Jungle Trek', type: 'Activity', badge: 'Nature Walk', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80' },
      { id: 5, name: 'Luxury SUV', type: 'Rental', badge: '7 Seater', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
      { id: 6, name: 'Adventure Bike', type: 'Rental', badge: 'Off-Road', image: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=600&q=80' },
    ],
    stays: [
      { id: 1, name: 'Dandeli Forest Stay', badge: 'Jungle Resort', rating: '4.8', image: 'https://diplomatvisa.com/wp-content/uploads/2024/12/Best-Places-to-Visit-in-Dandeli-1024x576.jpg' },
      { id: 2, name: 'Coorg Homestay', badge: 'Hill View', rating: '4.9', image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80' },
      { id: 3, name: 'Gokarna Beach Resort', badge: 'Beach Front', rating: '4.7', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80' },
      { id: 4, name: 'Chikkamagaluru Estate', badge: 'Coffee Plantation', rating: '4.8', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80' },
      { id: 5, name: 'Hampi Heritage Hotel', badge: 'Historic', rating: '4.6', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80' },
      { id: 6, name: 'Kabini River Lodge', badge: 'Wildlife View', rating: '4.9', image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=600&q=80' },
      { id: 7, name: 'Wayanad Treehouse', badge: 'Eco Stay', rating: '4.8', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80' },
      { id: 8, name: 'Mysuru Palace Hotel', badge: 'Luxury', rating: '4.7', image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=80' },
    ],
    activities: [
      { id: 1, name: 'River Rafting', badge: 'Adventure', price: '₹1,500', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80' },
      { id: 2, name: 'Jungle Trek', badge: 'Nature Walk', price: '₹800', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80' },
      { id: 3, name: 'Camping Under Stars', badge: 'Overnight', price: '₹2,000', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
      { id: 4, name: 'Rock Climbing', badge: 'Extreme', price: '₹1,200', image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80' },
      { id: 5, name: 'Wildlife Safari', badge: 'Nature', price: '₹3,500', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80' },
      { id: 6, name: 'Kayaking', badge: 'Water Sport', price: '₹1,000', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80' },
      { id: 7, name: 'Paragliding', badge: 'Air Adventure', price: '₹4,000', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
      { id: 8, name: 'Bird Watching', badge: 'Peaceful', price: '₹600', image: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=600&q=80' },
    ],
    rentals: [
      { id: 1, name: 'Luxury SUV', badge: '7 Seater', price: '₹3,500/day', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80' },
      { id: 2, name: 'Sedan', badge: '5 Seater', price: '₹2,000/day', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80' },
      { id: 3, name: 'Adventure Bike', badge: 'Off-Road', price: '₹1,500/day', image: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=600&q=80' },
      { id: 4, name: 'Camping Gear Set', badge: 'Complete Kit', price: '₹800/day', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80' },
      { id: 5, name: 'Tempo Traveller', badge: '12 Seater', price: '₹5,000/day', image: 'https://images.unsplash.com/photo-1570733577910-eb1e23817dd2?w=600&q=80' },
      { id: 6, name: 'City Scooter', badge: 'Fuel Efficient', price: '₹500/day', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80' },
      { id: 7, name: 'Trekking Gear', badge: 'Pro Equipment', price: '₹600/day', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80' },
      { id: 8, name: 'Kayak Double', badge: '2 Person', price: '₹1,200/day', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80' },
    ]
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsPopupOpen(true);
    setSearchQuery('');
  };

  const filteredItems = data[activeTab].filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Main Search Section */}
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Where are you planning to go?
          </h1>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className="flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition-all hover:shadow-md"
                >
                  <Icon size={18} />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Places to go, things to do, hotels..."
              className="w-full pl-14 pr-32 py-4 bg-gray-50 rounded-2xl outline-none text-gray-700 text-base border-2 border-transparent focus:border-emerald-500 transition-all"
              onFocus={() => handleTabClick('all')}
              readOnly
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Search Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          />

          {/* Popup Content */}
          <div className="relative bg-white w-full sm:max-w-5xl sm:rounded-3xl rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="p-2 hover:bg-white/80 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-700" />
                </button>
              </div>

              {/* Search Input in Popup */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()}...`}
                  className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-gray-700 shadow-sm border border-gray-200"
                  autoFocus
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-gray-50">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIsPopupOpen(false);
                      }}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Type Badge for "Search All" */}
                        {activeTab === 'all' && (
                          <div className="absolute top-2 left-2 bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
                            {item.type}
                          </div>
                        )}
                        
                        {/* Badge */}
                        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-700 shadow-md">
                          {item.badge}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3">
                        <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate group-hover:text-emerald-600 transition-colors">
                          {item.name}
                        </h3>
                        {item.rating && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <span className="text-yellow-500">★</span>
                            <span className="font-medium">{item.rating}</span>
                          </div>
                        )}
                        {item.price && (
                          <div className="text-xs font-semibold text-emerald-600 mt-1">
                            {item.price}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-3">
                    <Search size={56} className="mx-auto opacity-40" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">No results found</p>
                  <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelSearch;