import React, { useState, useEffect } from 'react';
import { BarChart3, Users, UserCheck, UserX, Calendar, Filter, Download, MapPin,FilterIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LocationMap from '../components/LocationMap';
import LastLoggedIn from './LastloggedIn';
import { fetchDepartmentCardDetails } from '../api/api';
import { useAuth } from '../contexts/AuthContext';

interface LocationData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: 'worker' | 'establishment' | 'department';
  status?: 'online' | 'offline' | 'checked-in' | 'checked-out';
  lastUpdate?: Date;
  accuracy?: number;
}

const DepartmentDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [customFilter, setCustomFilter] = useState({
    startDate: '',
    endDate: '',
    district: '',
    workerType: ''
  });
    const { user } = useAuth();
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedView, setSelectedView] = useState<'stats' | 'map'>('stats');

  // Mock data - in real app, this would come from API
  const stats = {
    totalWorkers: 15420,
    loggedIn: 8934,
    loggedOut: 6486,
    present: 12340,
    absent: 3080,
    newRegistrations: 234
  };

  // Mock location data
  useEffect(() => {
    const mockLocations: LocationData[] = [
      {
        id: '1',
        name: 'Ravi Kumar',
        latitude: 17.3850,
        longitude: 78.4867,
        type: 'worker',
        status: 'checked-in',
        lastUpdate: new Date(),
        accuracy: 10
      },
      {
        id: '2',
        name: 'Priya Sharma',
        latitude: 17.3900,
        longitude: 78.4900,
        type: 'worker',
        status: 'checked-out',
        lastUpdate: new Date(Date.now() - 30 * 60 * 1000),
        accuracy: 15
      },
      {
        id: '3',
        name: 'ABC Construction Site',
        latitude: 17.3800,
        longitude: 78.4800,
        type: 'establishment',
        status: 'online',
        lastUpdate: new Date(),
        accuracy: 5
      },
      {
        id: '4',
        name: 'Labour Department Office',
        latitude: 17.3950,
        longitude: 78.4950,
        type: 'department',
        status: 'online',
        lastUpdate: new Date(),
        accuracy: 8
      }
    ];
    setLocations(mockLocations);
  }, []);

  const periodOptions = [
    { value: '7', label: t('department.last7Days') },
    { value: '15', label: t('department.last15Days') },
    { value: '30', label: t('department.last30Days') },
    { value: 'custom', label: 'Custom Range' }
  ];

  const StatCard = ({ icon: Icon, title, value, color, trend }: any) => (
    <div className="card-mobile">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl md:text-3xl font-bold ${color}`}>{value.toLocaleString()}</p>
          {trend && (
            <p className="text-sm text-gray-500 mt-1">
              {trend > 0 ? '+' : ''}{trend}% from last period
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
          <Icon className={`h-5 w-5 md:h-6 md:w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const handleLocationClick = (location: LocationData) => {
    console.log('Location clicked:', location);
    // Handle location click - could open details modal, etc.
  };


  const handleFilterClick = async () => {
  try {
    const data = await fetchDepartmentCardDetails();
    console.log("Filtered Data:", data);
  } catch (err) {
    console.error("Error fetching card details", err);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-8 mobile-nav-spacing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {t('department.dashboard')}
          </h1>
          <p className="text-gray-600">
            Monitor worker activities and generate reports
          </p>
          </div>
          <LastLoggedIn time={user?.lastLoggedIn ?? null} />
        </div>

        {/* View Toggle */}
        <div className="mb-6">
          <div className="flex space-x-2 bg-white rounded-lg p-1 w-fit">
            <button
              onClick={() => setSelectedView('stats')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'stats'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {t('department.statistics')}
            </button>
            <button
              onClick={() => setSelectedView('map')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <MapPin className="h-4 w-4 mr-1 inline" />
              {t('department.locationMap')}
            </button>
          </div>
        </div>

        {selectedView === 'stats' ? (
          <>
            {/* Filters */}
            <div className="card-mobile mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters & Controls</h2>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period
                  </label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {periodOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedPeriod === 'custom' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={customFilter.startDate}
                        onChange={(e) => setCustomFilter({...customFilter, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={customFilter.endDate}
                        onChange={(e) => setCustomFilter({...customFilter, endDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District
                  </label>
                  <select
                    value={customFilter.district}
                    onChange={(e) => setCustomFilter({...customFilter, district: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Districts</option>
                    <option value="visakhapatnam">Visakhapatnam</option>
                    <option value="guntur">Guntur</option>
                    <option value="krishna">Krishna</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Worker Type
                  </label>
                  <select
                    value={customFilter.workerType}
                    onChange={(e) => setCustomFilter({...customFilter, workerType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="skilled">Skilled</option>
                    <option value="semi-skilled">Semi-Skilled</option>
                    <option value="unskilled">Unskilled</option>
                  </select>
                </div>
                <div className="flex items-end">

              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm" onClick={handleFilterClick}>
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filter
                </button>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              <StatCard
                icon={Users}
                title={t('department.totalWorkers')}
                value={stats.totalWorkers}
                color="text-blue-600"
                trend={5.2}
              />
              <StatCard
                icon={UserCheck}
                title={t('department.loggedIn')}
                value={stats.loggedIn}
                color="text-green-600"
                trend={2.1}
              />
              <StatCard
                icon={UserX}
                title={t('department.loggedOut')}
                value={stats.loggedOut}
                color="text-orange-600"
                trend={-1.3}
              />
              <StatCard
                icon={Calendar}
                title={t('department.present')}
                value={stats.present}
                color="text-emerald-600"
                trend={3.7}
              />
              <StatCard
                icon={Users}
                title={t('department.absent')}
                value={stats.absent}
                color="text-red-600"
                trend={-2.8}
              />
              <StatCard
                icon={UserCheck}
                title="New Registrations"
                value={stats.newRegistrations}
                color="text-purple-600"
                trend={12.5}
              />
            </div>

            {/* Charts and Tables  */}
            {/* <div className="grid lg:grid-cols-2 gap-6 md:gap-8"> */}
              {/* Attendance Chart */}
              {/* <div className="card-mobile">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Daily Attendance Trend
                  </h3>
                  <BarChart3 className="h-5 w-5 text-gray-400" />
                </div>
                <div className="h-48 md:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Chart visualization would be implemented here</p>
                </div>
              </div> */}

              {/* Recent Activities */}
              {/* <div className="card-mobile">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Recent Activities
                </h3>
                <div className="space-y-4">
                  {[
                    { action: 'New worker registration', name: 'Ravi Kumar', time: '2 hours ago', type: 'registration' },
                    { action: 'Worker logged in', name: 'Priya Sharma', time: '3 hours ago', type: 'login' },
                    { action: 'Document verified', name: 'Suresh Reddy', time: '5 hours ago', type: 'verification' },
                    { action: 'Worker logged out', name: 'Anjali Devi', time: '6 hours ago', type: 'logout' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.name}</p>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            {/* </div> */}
          </>
        ) : (
          /* Location Map View */
          <div className="mb-8">
            <LocationMap
              locations={locations}
              center={{ latitude: 17.3850, longitude: 78.4867 }}
              zoom={13}
              height="600px"
              showControls={true}
              onLocationClick={handleLocationClick}
            />
          </div>
        )}

        {/* Worker List Table */}
        <div className="card-mobile mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Worker Management
            </h3>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Search workers..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Trade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Active</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Ravi Kumar', id: 'WK001', trade: 'Mason', status: 'Checked In', location: 'Site A', lastActive: '2 hours ago' },
                  { name: 'Priya Sharma', id: 'WK002', trade: 'Electrician', status: 'Checked Out', location: 'Site B', lastActive: '1 hour ago' },
                  { name: 'Suresh Reddy', id: 'WK003', trade: 'Carpenter', status: 'Offline', location: 'Unknown', lastActive: '1 day ago' },
                  { name: 'Anjali Devi', id: 'WK004', trade: 'Painter', status: 'Checked In', location: 'Site C', lastActive: '30 min ago' }
                ].map((worker, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{worker.name}</td>
                    <td className="py-3 px-4 text-gray-600">{worker.id}</td>
                    <td className="py-3 px-4 text-gray-600">{worker.trade}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        worker.status === 'Checked In' 
                          ? 'bg-green-100 text-green-800' 
                          : worker.status === 'Checked Out'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {worker.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{worker.location}</td>
                    <td className="py-3 px-4 text-gray-600">{worker.lastActive}</td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDashboard;