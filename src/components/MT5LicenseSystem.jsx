import React, { useState } from 'react';
import { User, Shield, Plus, Trash2, Check, X, Ban, Eye, Settings, LogOut, Users, Clock, Edit3 } from 'lucide-react';

const MT5LicenseSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userType, setUserType] = useState('user');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // EA Configuration - Admin can modify these
  const [eaConfig, setEaConfig] = useState({
    'EA-Scalper': { maxAccounts: 2 },
    'EA-Trend': { maxAccounts: 2 },
    'EA-Grid': { maxAccounts: 2 },
    'EA-Martingale': { maxAccounts: 2 }
  });

  // Mock data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      accounts: {
        'EA-Scalper': [
          { number: '12345678', status: 'active' },
          { number: '87654321', status: 'pending' }
        ],
        'EA-Trend': [
          { number: '11111111', status: 'denied' }
        ],
        'EA-Grid': [],
        'EA-Martingale': [
          { number: '99999999', status: 'active' }
        ]
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active',
      accounts: {
        'EA-Scalper': [
          { number: '55555555', status: 'pending' }
        ],
        'EA-Trend': [],
        'EA-Grid': [
          { number: '66666666', status: 'active' }
        ],
        'EA-Martingale': []
      }
    }
  ]);

  const EAs = Object.keys(eaConfig);

  const updateEAConfig = (ea, maxAccounts) => {
    setEaConfig(prev => ({
      ...prev,
      [ea]: { maxAccounts: parseInt(maxAccounts) }
    }));
  };

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">MT5 License Manager</h1>
          <p className="text-gray-300">Secure EA License Management</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          
          <div className="flex gap-2">
            <button
              onClick={() => { setCurrentView('dashboard'); setUserType('user'); }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-colors"
            >
              User Login
            </button>
            <button
              onClick={() => { setCurrentView('admin'); setUserType('admin'); }}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-medium transition-colors"
            >
              Admin Login
            </button>
          </div>
          
          <div className="text-center">
            <a href="#" className="text-blue-400 hover:text-blue-300 text-sm">Create Account</a>
          </div>
        </div>
      </div>
    </div>
  );

  const UserDashboard = () => {
    const currentUser = users[0]; // Mock current user
    
    const addAccount = (ea, accountNumber) => {
      if (accountNumber && currentUser.accounts[ea].length < eaConfig[ea].maxAccounts) {
        const newAccount = { number: accountNumber, status: 'pending' };
        currentUser.accounts[ea].push(newAccount);
        setUsers([...users]);
      }
    };

    const removeAccount = (ea, index) => {
      currentUser.accounts[ea].splice(index, 1);
      setUsers([...users]);
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'active': return 'text-green-400 bg-green-400/10';
        case 'pending': return 'text-yellow-400 bg-yellow-400/10';
        case 'denied': return 'text-red-400 bg-red-400/10';
        default: return 'text-gray-400 bg-gray-400/10';
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'active': return 'Active';
        case 'pending': return 'Awaiting Approval';
        case 'denied': return 'Denied';
        default: return 'Unknown';
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">MT5 License Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">{currentUser.name}</p>
                <p className="text-gray-400 text-sm">{currentUser.email}</p>
              </div>
              <button
                onClick={() => setCurrentView('login')}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid gap-6">
            {EAs.map((ea) => (
              <div key={ea} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">{ea}</h2>
                  <span className="text-gray-400 text-sm">
                    {currentUser.accounts[ea].length}/{eaConfig[ea].maxAccounts} accounts
                  </span>
                </div>

                <div className="space-y-4">
                  {currentUser.accounts[ea].map((account, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-4">
                        <span className="text-white font-mono">{account.number}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                          {getStatusText(account.status)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeAccount(ea, index)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {currentUser.accounts[ea].length < eaConfig[ea].maxAccounts && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter MT5 Account Number"
                        className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addAccount(ea, e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = e.target.previousElementSibling;
                          addAccount(ea, input.value);
                          input.value = '';
                        }}
                        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AdminPanel = () => {
    const pendingRequests = users.flatMap(user =>
      Object.entries(user.accounts).flatMap(([ea, accounts]) =>
        accounts
          .map((account, index) => ({ ...account, user, ea, index }))
          .filter(account => account.status === 'pending')
      )
    );

    const updateAccountStatus = (user, ea, accountIndex, newStatus) => {
      user.accounts[ea][accountIndex].status = newStatus;
      setUsers([...users]);
    };

    const blockUser = (userId) => {
      const userIndex = users.findIndex(u => u.id === userId);
      users[userIndex].status = users[userIndex].status === 'blocked' ? 'active' : 'blocked';
      setUsers([...users]);
    };

    const SettingsModal = ({ onClose }) => (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 rounded-xl border border-white/10 p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">EA Configuration</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {EAs.map((ea) => (
              <div key={ea} className="bg-white/5 rounded-lg border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{ea}</h3>
                    <p className="text-gray-400 text-sm">Maximum accounts per user</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={eaConfig[ea].maxAccounts}
                      onChange={(e) => updateEAConfig(ea, e.target.value)}
                      className="w-20 p-2 bg-white/10 border border-white/20 rounded text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <span className="text-gray-400 text-sm">accounts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );

    const UserDetailModal = ({ user, onClose }) => (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-slate-800 rounded-xl border border-white/10 p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => blockUser(user.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  user.status === 'blocked'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {user.status === 'blocked' ? 'Unblock User' : 'Block User'}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {EAs.map((ea) => (
              <div key={ea} className="bg-white/5 rounded-lg border border-white/10 p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-white">{ea}</h3>
                  <span className="text-gray-400 text-sm">
                    {user.accounts[ea].length}/{eaConfig[ea].maxAccounts} accounts
                  </span>
                </div>
                {user.accounts[ea].length === 0 ? (
                  <p className="text-gray-400">No accounts registered</p>
                ) : (
                  <div className="space-y-2">
                    {user.accounts[ea].map((account, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-mono">{account.number}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            account.status === 'active' ? 'bg-green-400/10 text-green-400' :
                            account.status === 'pending' ? 'bg-yellow-400/10 text-yellow-400' :
                            'bg-red-400/10 text-red-400'
                          }`}>
                            {account.status}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateAccountStatus(user, ea, index, 'active')}
                            className="p-1 text-green-400 hover:text-green-300 transition-colors"
                            title="Accept"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateAccountStatus(user, ea, index, 'denied')}
                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                            title="Deny"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              user.accounts[ea].splice(index, 1);
                              setUsers([...users]);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="EA Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Pending Approvals */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">Pending Approvals</h2>
                <span className="bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded-full text-sm">
                  {pendingRequests.length}
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {pendingRequests.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No pending requests</p>
                ) : (
                  pendingRequests.map((request, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-medium">{request.user.name}</p>
                          <p className="text-gray-400 text-sm">{request.ea}</p>
                        </div>
                        <span className="text-white font-mono text-sm">{request.number}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateAccountStatus(request.user, request.ea, request.index, 'active')}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateAccountStatus(request.user, request.ea, request.index, 'denied')}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* All Users */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">All Users</h2>
                <span className="bg-blue-400/10 text-blue-400 px-2 py-1 rounded-full text-sm">
                  {users.length}
                </span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <div key={user.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                        <div className="flex gap-2 mt-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
                          }`}>
                            {user.status}
                          </span>
                          <span className="text-xs text-gray-400">
                            {Object.values(user.accounts).flat().length} accounts
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => blockUser(user.id)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          title={user.status === 'blocked' ? 'Unblock' : 'Block'}
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {selectedUser && (
          <UserDetailModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}

        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>
    );
  };

  // Render current view
  switch (currentView) {
    case 'login':
      return <LoginScreen />;
    case 'dashboard':
      return <UserDashboard />;
    case 'admin':
      return <AdminPanel />;
    default:
      return <LoginScreen />;
  }
};

export default MT5LicenseSystem;
