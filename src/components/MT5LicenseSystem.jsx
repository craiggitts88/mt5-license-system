import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Plus, 
  Trash2, 
  Eye, 
  UserCheck, 
  UserX, 
  AlertCircle 
} from 'lucide-react';

const MT5LicenseSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [selectedEA, setSelectedEA] = useState('EA-Scalper');
  const [newAccount, setNewAccount] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data
  const [users] = useState([
    {
      id: 1,
      username: 'john_trader',
      email: 'john@example.com',
      status: 'active',
      joinDate: '2024-01-15',
      accounts: {
        'EA-Scalper': [
          { account: '12345678', status: 'active', addedDate: '2024-01-20' },
          { account: '87654321', status: 'pending', addedDate: '2024-01-25' }
        ],
        'EA-Trend': [
          { account: '11111111', status: 'active', addedDate: '2024-01-18' }
        ]
      }
    },
    {
      id: 2,
      username: 'sarah_fx',
      email: 'sarah@example.com',
      status: 'active',
      joinDate: '2024-02-01',
      accounts: {
        'EA-Grid': [
          { account: '99999999', status: 'denied', addedDate: '2024-02-05' }
        ]
      }
    }
  ]);

  const [userAccounts, setUserAccounts] = useState({
    'EA-Scalper': [
      { account: '12345678', status: 'active', addedDate: '2024-01-20' },
      { account: '87654321', status: 'pending', addedDate: '2024-01-25' }
    ],
    'EA-Trend': [
      { account: '11111111', status: 'active', addedDate: '2024-01-18' }
    ],
    'EA-Grid': [],
    'EA-Martingale': []
  });

  const [eaLimits] = useState({
    'EA-Scalper': 3,
    'EA-Trend': 2,
    'EA-Grid': 5,
    'EA-Martingale': 1
  });

  const eaList = ['EA-Scalper', 'EA-Trend', 'EA-Grid', 'EA-Martingale'];

  const addAccount = () => {
    if (newAccount && newAccount.length === 8) {
      const newAccountObj = {
        account: newAccount,
        status: 'pending',
        addedDate: new Date().toISOString().split('T')[0]
      };
      
      setUserAccounts(prev => ({
        ...prev,
        [selectedEA]: [...prev[selectedEA], newAccountObj]
      }));
      setNewAccount('');
    }
  };

  const removeAccount = (ea, accountToRemove) => {
    setUserAccounts(prev => ({
      ...prev,
      [ea]: prev[ea].filter(acc => acc.account !== accountToRemove)
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'denied': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'denied': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPendingRequests = () => {
    const pending = [];
    users.forEach(user => {
      Object.entries(user.accounts || {}).forEach(([ea, accounts]) => {
        accounts.forEach(account => {
          if (account.status === 'pending') {
            pending.push({
              ...account,
              username: user.username,
              email: user.email,
              ea: ea,
              userId: user.id
            });
          }
        });
      });
    });
    return pending;
  };

  // Login Screen
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">MT5 License Manager</h1>
            <p className="text-gray-600">Secure EA License Management</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView('user')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              User Login
            </button>
            
            <button
              onClick={() => setCurrentView('admin')}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <Settings className="w-5 h-5" />
              Admin Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User Dashboard
  if (currentView === 'user') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
              </div>
              <button
                onClick={() => setCurrentView('login')}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* EA Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Select EA</h2>
                <div className="space-y-2">
                  {eaList.map(ea => (
                    <button
                      key={ea}
                      onClick={() => setSelectedEA(ea)}
                      className={`w-full text-left p-3 rounded-lg transition duration-200 ${
                        selectedEA === ea
                          ? 'bg-blue-50 border-2 border-blue-200 text-blue-800'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="font-medium">{ea}</div>
                      <div className="text-sm text-gray-500">
                        {userAccounts[ea].length}/{eaLimits[ea]} accounts
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Management */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {selectedEA} Accounts
                  </h2>
                  <span className="text-sm text-gray-500">
                    Limit: {userAccounts[selectedEA].length}/{eaLimits[selectedEA]}
                  </span>
                </div>

                {/* Add Account */}
                {userAccounts[selectedEA].length < eaLimits[selectedEA] && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newAccount}
                        onChange={(e) => setNewAccount(e.target.value)}
                        placeholder="Enter 8-digit MT5 account number"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={8}
                      />
                      <button
                        onClick={addAccount}
                        disabled={!newAccount || newAccount.length !== 8}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Account List */}
                <div className="space-y-3">
                  {userAccounts[selectedEA].length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No accounts added yet
                    </div>
                  ) : (
                    userAccounts[selectedEA].map((account, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(account.status)}
                          <div>
                            <div className="font-medium text-gray-800">
                              {account.account}
                            </div>
                            <div className="text-sm text-gray-500">
                              Added: {account.addedDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                            {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                          </span>
                          <button
                            onClick={() => removeAccount(selectedEA, account.account)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (currentView === 'admin') {
    const pendingRequests = getPendingRequests();

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              </div>
              <button
                onClick={() => setCurrentView('login')}
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">{users.length}</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">{pendingRequests.length}</div>
                  <div className="text-sm text-gray-600">Pending Requests</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">
                    {users.reduce((acc, user) => {
                      return acc + Object.values(user.accounts || {}).flat().filter(a => a.status === 'active').length;
                    }, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Active Accounts</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">{eaList.length}</div>
                  <div className="text-sm text-gray-600">Available EAs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pending Requests */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Requests</h2>
              <div className="space-y-3">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No pending requests
                  </div>
                ) : (
                  pendingRequests.map((request, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-gray-800">{request.username}</div>
                          <div className="text-sm text-gray-600">{request.email}</div>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {request.ea}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Account: {request.account}
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          Approve
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                          <UserX className="w-3 h-3" />
                          Deny
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* User Management */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">User Management</h2>
              <div className="space-y-3">
                {users.map(user => (
                  <div key={user.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-800">{user.username}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        <div className="text-xs text-gray-500">Joined: {user.joinDate}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">User Details</h3>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-gray-800">{selectedUser.username}</div>
                  <div className="text-sm text-gray-600">{selectedUser.email}</div>
                  <div className="text-xs text-gray-500">Joined: {selectedUser.joinDate}</div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">EA Accounts</h4>
                  {Object.entries(selectedUser.accounts || {}).map(([ea, accounts]) => (
                    <div key={ea} className="mb-3">
                      <div className="text-sm font-medium text-gray-700">{ea}</div>
                      <div className="ml-4 space-y-1">
                        {accounts.map((account, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            {getStatusIcon(account.status)}
                            <span>{account.account}</span>
                            <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(account.status)}`}>
                              {account.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default MT5LicenseSystem;
