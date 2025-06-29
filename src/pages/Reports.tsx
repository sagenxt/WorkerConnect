import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, FileText, TrendingUp, Users, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Reports: React.FC = () => {
  const { t } = useLanguage();
  const [selectedReport, setSelectedReport] = useState('worker_summary');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  });
  const [filters, setFilters] = useState({
    district: 'all',
    status: 'all',
    category: 'all'
  });

  const reportTypes = [
    {
      id: 'worker_summary',
      title: 'Worker Summary Report',
      description: 'Comprehensive overview of all registered workers',
      icon: Users
    },
    {
      id: 'establishment_summary',
      title: 'Establishment Summary Report',
      description: 'Overview of all registered establishments',
      icon: Building2
    },
    {
      id: 'attendance_report',
      title: 'Attendance Report',
      description: 'Daily and monthly attendance statistics',
      icon: Calendar
    },
    {
      id: 'compliance_report',
      title: 'Compliance Report',
      description: 'Compliance status and violations summary',
      icon: BarChart3
    },
    {
      id: 'registration_trends',
      title: 'Registration Trends',
      description: 'Monthly registration trends and analytics',
      icon: TrendingUp
    },
    {
      id: 'document_verification',
      title: 'Document Verification Report',
      description: 'Status of document verification process',
      icon: FileText
    }
  ];

  const mockData = {
    worker_summary: {
      totalWorkers: 15420,
      activeWorkers: 12340,
      maleWorkers: 9876,
      femaleWorkers: 5544,
      skilledWorkers: 7890,
      semiSkilledWorkers: 4320,
      unskilledWorkers: 3210,
      districtWise: [
        { district: 'Hyderabad', count: 3456 },
        { district: 'Visakhapatnam', count: 2890 },
        { district: 'Guntur', count: 2345 },
        { district: 'Krishna', count: 1987 },
        { district: 'Chittoor', count: 1654 }
      ]
    },
    establishment_summary: {
      totalEstablishments: 1250,
      activeEstablishments: 987,
      privateCommercial: 456,
      privateResidential: 321,
      stateGovernment: 234,
      centralGovernment: 189,
      totalProjectValue: 125000000000,
      totalWorkers: 45000
    },
    attendance_report: {
      averageAttendance: 87.5,
      presentToday: 12340,
      absentToday: 3080,
      monthlyTrend: [
        { month: 'Jan', attendance: 85.2 },
        { month: 'Feb', attendance: 87.8 },
        { month: 'Mar', attendance: 89.1 },
        { month: 'Apr', attendance: 86.5 },
        { month: 'May', attendance: 88.3 }
      ]
    }
  };

  const generateReport = () => {
    // Simulate report generation
    alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.title}...`);
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Simulate export
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const renderReportPreview = () => {
    const data = mockData[selectedReport as keyof typeof mockData];
    
    if (selectedReport === 'worker_summary') {
      const workerData = data as typeof mockData.worker_summary;
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{workerData.totalWorkers.toLocaleString()}</div>
              <div className="text-sm text-blue-700">Total Workers</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{workerData.activeWorkers.toLocaleString()}</div>
              <div className="text-sm text-green-700">Active Workers</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{workerData.maleWorkers.toLocaleString()}</div>
              <div className="text-sm text-purple-700">Male Workers</div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">{workerData.femaleWorkers.toLocaleString()}</div>
              <div className="text-sm text-pink-700">Female Workers</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Skill Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Skilled</span>
                  <span className="text-sm font-medium">{workerData.skilledWorkers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Semi-Skilled</span>
                  <span className="text-sm font-medium">{workerData.semiSkilledWorkers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Unskilled</span>
                  <span className="text-sm font-medium">{workerData.unskilledWorkers.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Top 5 Districts</h4>
              <div className="space-y-2">
                {workerData.districtWise.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm text-gray-600">{item.district}</span>
                    <span className="text-sm font-medium">{item.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (selectedReport === 'establishment_summary') {
      const estData = data as typeof mockData.establishment_summary;
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{estData.totalEstablishments.toLocaleString()}</div>
              <div className="text-sm text-orange-700">Total Establishments</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{estData.activeEstablishments.toLocaleString()}</div>
              <div className="text-sm text-green-700">Active</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">₹{(estData.totalProjectValue / 10000000).toFixed(0)}Cr</div>
              <div className="text-sm text-blue-700">Project Value</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{estData.totalWorkers.toLocaleString()}</div>
              <div className="text-sm text-purple-700">Total Workers</div>
            </div>
          </div>
          
          <div className="bg-white p-4 border rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Category Distribution</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{estData.privateCommercial}</div>
                <div className="text-sm text-gray-600">Private Commercial</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{estData.privateResidential}</div>
                <div className="text-sm text-gray-600">Private Residential</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{estData.stateGovernment}</div>
                <div className="text-sm text-gray-600">State Government</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{estData.centralGovernment}</div>
                <div className="text-sm text-gray-600">Central Government</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (selectedReport === 'attendance_report') {
      const attData = data as typeof mockData.attendance_report;
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{attData.averageAttendance}%</div>
              <div className="text-sm text-green-700">Average Attendance</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{attData.presentToday.toLocaleString()}</div>
              <div className="text-sm text-blue-700">Present Today</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{attData.absentToday.toLocaleString()}</div>
              <div className="text-sm text-red-700">Absent Today</div>
            </div>
          </div>
          
          <div className="bg-white p-4 border rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Monthly Attendance Trend</h4>
            <div className="space-y-2">
              {attData.monthlyTrend.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${item.attendance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{item.attendance}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-center py-8">
        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Select a report type to view preview</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 mobile-nav-spacing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            Generate comprehensive reports and analytics for data-driven insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Types */}
          <div className="lg:col-span-1">
            <div className="card-mobile">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Types</h3>
              <div className="space-y-2">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  return (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(report.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedReport === report.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${
                          selectedReport === report.id ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                        <div>
                          <h4 className={`font-medium ${
                            selectedReport === report.id ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {report.title}
                          </h4>
                          <p className={`text-sm ${
                            selectedReport === report.id ? 'text-blue-700' : 'text-gray-600'
                          }`}>
                            {report.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="card-mobile mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <select
                    value={filters.district}
                    onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Districts</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="visakhapatnam">Visakhapatnam</option>
                    <option value="guntur">Guntur</option>
                    <option value="krishna">Krishna</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <button
                  onClick={generateReport}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* Report Preview */}
          <div className="lg:col-span-2">
            <div className="card-mobile">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {reportTypes.find(r => r.id === selectedReport)?.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => exportReport('pdf')}
                    className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </button>
                  <button
                    onClick={() => exportReport('excel')}
                    className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Excel
                  </button>
                  <button
                    onClick={() => exportReport('csv')}
                    className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    CSV
                  </button>
                </div>
              </div>

              {renderReportPreview()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;