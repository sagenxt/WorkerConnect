import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Filter, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AttendanceHistory: React.FC = () => {
  const { t } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock attendance data
  const attendanceData = [
    { date: '2024-01-15', checkIn: '09:00', checkOut: '17:30', status: 'present', hours: 8.5 },
    { date: '2024-01-16', checkIn: '09:15', checkOut: '16:45', status: 'present', hours: 7.5 },
    { date: '2024-01-17', status: 'absent', hours: 0 },
    { date: '2024-01-18', checkIn: '09:00', checkOut: '13:00', status: 'partial', hours: 4 },
    { date: '2024-01-19', checkIn: '08:45', checkOut: '17:45', status: 'present', hours: 9 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'text-green-600 bg-green-100';
      case 'absent': return 'text-red-600 bg-red-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present': return t('department.present');
      case 'absent': return t('department.absent');
      case 'partial': return t('worker.partial');
      default: return status;
    }
  };

  return (
    <div className="min-h-screen py-8 mobile-nav-spacing">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t('worker.attendanceHistory')}
                </h1>
                <p className="text-gray-600">
                  {t('worker.viewAttendanceHistory')}
                </p>
              </div>
            </div>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              {t('common.download')}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card-mobile mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('common.filter')}
            </h3>
            <Filter className="h-5 w-5 text-gray-500" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('time.month')}
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(2024, i, 1).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('time.year')}
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {t('common.apply')}
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card-mobile text-center">
            <div className="text-2xl font-bold text-green-600">18</div>
            <div className="text-sm text-gray-600">{t('department.present')}</div>
          </div>
          <div className="card-mobile text-center">
            <div className="text-2xl font-bold text-red-600">2</div>
            <div className="text-sm text-gray-600">{t('department.absent')}</div>
          </div>
          <div className="card-mobile text-center">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-gray-600">{t('worker.partial')}</div>
          </div>
          <div className="card-mobile text-center">
            <div className="text-2xl font-bold text-blue-600">162</div>
            <div className="text-sm text-gray-600">{t('worker.totalHours')}</div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="card-mobile">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('worker.dailyAttendance')}
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">{t('common.date')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">{t('worker.checkIn')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">{t('worker.checkOut')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">{t('common.status')}</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">{t('worker.hours')}</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {record.checkIn ? (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-green-500" />
                          {record.checkIn}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {record.checkOut ? (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-red-500" />
                          {record.checkOut}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusText(record.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      {record.hours}h
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

export default AttendanceHistory;