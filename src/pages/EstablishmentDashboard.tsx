import React, { useState, useEffect, useRef } from 'react';
import { Building2, Users, UserCheck, UserX, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { fetchEstablishmentCardDetails } from '../api/api';
import LastLoggedIn from './LastloggedIn';

const EstablishmentDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const hasFetched = useRef(false);
      console.log(user, 'cardDetails data');

  const [cardDetails, setCardDetails] = useState<any>(null);

  const [stats, setStats] = useState({
    totalWorkers: 45,
    activeWorkers: 38,
    presentToday: 32,
    absentToday: 6,
    pendingRegistrations: 3,
    complianceScore: 92
  });

  
  useEffect(() => {
    if (!user || hasFetched.current) return;
    hasFetched.current = true;
    const loadData = async () => {
      if (user?.type === "establishment") {

        const data = await fetchEstablishmentCardDetails(Number(user?.establishmentId));
        setCardDetails(data);
      }
    };

    loadData();
  }, [user]);
console.log(cardDetails, 'cardDetails');
  const StatCard = ({ icon: Icon, title, value, color, trend, link }: any) => (
    <Link to={link || '#'} className="card-mobile hover:shadow-xl transition-shadow group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl md:text-3xl font-bold ${color}`}>{value}</p>
          {/* {trend && (
            <p className="text-sm text-gray-500 mt-1">
              {trend > 0 ? '+' : ''}{trend}% from last week
            </p>
          )} */}
        </div>
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')} group-hover:scale-110 transition-transform`}>
          <Icon className={`h-5 w-5 md:h-6 md:w-6 ${color}`} />
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen py-8 mobile-nav-spacing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center space-x-3 mb-2">
            <Building2 className="h-8 w-8 text-orange-600" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {t('establishment.dashboard')}
              </h1>
              <p className="text-gray-600">
                {/* {t('common.welcome')}, { user?.establishmentName} */}
                {t('common.welcome')},{" "}
  {user?.type === "establishment" && user?.establishmentName}
              </p>
            </div>
          </div>
          <LastLoggedIn time={user?.lastLoggedIn} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <StatCard
            icon={Users}
            title={t('establishment.totalWorkers')}
            value={cardDetails?.totalWorkers}
            color="text-blue-600"
            trend={5.2}
            // link="/workers/management"
          />
          <StatCard
            icon={UserCheck}
            title={t('establishment.activeWorkers')}
            value={cardDetails?.activeWorkers}
            color="text-green-600"
            trend={2.1}
          />
          {/* <StatCard
            icon={Calendar}
            title={t('department.present')}
            value={stats?.presentToday}
            color="text-emerald-600"
            trend={3.7}
          /> */}
          <StatCard
            icon={UserX}
            title={t('department.absent')}
            value={stats?.absentToday}
            color="text-red-600"
            trend={-1.3}
          />
          {/* <StatCard
            icon={AlertTriangle}
            title={t('establishment.pendingRegistrations')}
            value={stats?.pendingRegistrations}
            color="text-yellow-600"
          /> */}
          {/* <StatCard
            icon={TrendingUp}
            title={t('establishment.complianceScore')}
            value={`${stats?.complianceScore}%`}
            color="text-purple-600"
            trend={1.5}
          /> */}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/workers/management" className="card-mobile hover:shadow-xl transition-shadow group">
            <div className="flex items-center space-x-3 mb-3">
              <Users className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">{t('establishment.workerManagement')}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {t('establishment.manageWorkers')}
            </p>
            <div className="text-blue-600 group-hover:text-blue-700 text-sm font-medium">
              {t('common.view')} →
            </div>
          </Link>

          <Link to="/attendance/reports" className="card-mobile hover:shadow-xl transition-shadow group">
            <div className="flex items-center space-x-3 mb-3">
              <Calendar className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">{t('establishment.attendanceReport')}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {t('establishment.viewAttendanceReports')}
            </p>
            <div className="text-green-600 group-hover:text-green-700 text-sm font-medium">
              {t('common.view')} →
            </div>
          </Link>

          {/* <Link to="/compliance/reports" className="card-mobile hover:shadow-xl transition-shadow group">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">{t('establishment.complianceReport')}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              {t('establishment.viewComplianceStatus')}
            </p>
            <div className="text-purple-600 group-hover:text-purple-700 text-sm font-medium">
              {t('common.view')} →
            </div>
          </Link> */}
        </div>

        {/* Recent Activities */}
        <div className="card-mobile">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('department.recentActivities')}
          </h3>
          <div className="space-y-4">
            {[
              { action: 'New worker registered', name: 'Ravi Kumar', time: '2 hours ago', type: 'registration' },
              { action: 'Worker checked in', name: 'Priya Sharma', time: '3 hours ago', type: 'checkin' },
              { action: 'Compliance report generated', name: 'Monthly Report', time: '1 day ago', type: 'report' },
              { action: 'Safety training completed', name: '15 workers', time: '2 days ago', type: 'training' }
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
        </div>
      </div>
    </div>
  );
};

export default EstablishmentDashboard;