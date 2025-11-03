import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    // Sample data - replace with actual Supabase data
    setUsers([
      {
        id: 'user-1',
        username: 'john_doe',
        email: 'john@example.com',
        role: 'user',
        max_databases: 3,
        max_targets: 25,
        created_at: '2024-01-10',
        is_active: true
      },
      {
        id: 'user-2',
        username: 'jane_smith',
        email: 'jane@example.com',
        role: 'user',
        max_databases: 5,
        max_targets: 50,
        created_at: '2024-01-12',
        is_active: true
      },
      {
        id: 'user-3',
        username: 'admin',
        email: 'admin@pvb.com',
        role: 'admin',
        max_databases: 50,
        max_targets: 100,
        created_at: '2024-01-01',
        is_active: true
      }
    ]);
  }, []);

  const updateUserLimits = (userId, field, value) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, [field]: value } : user
    ));
  };

  return (
    <div className="admin-container">
      <Head>
        <title>Admin Panel - PVB Bot Manager</title>
      </Head>

      <header className="admin-header">
        <div className="header-content">
          <h1>👑 Admin Panel</h1>
          <div className="admin-nav">
            <a href="/dashboard">← Back to Dashboard</a>
            <a href="/" className="logout-btn">Logout</a>
          </div>
        </div>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <nav className="admin-nav">
            <button 
              className={activeTab === 'users' ? 'active' : ''}
              onClick={() => setActiveTab('users')}
            >
              👥 User Management
            </button>
            <button 
              className={activeTab === 'databases' ? 'active' : ''}
              onClick={() => setActiveTab('databases')}
            >
              🗄️ All Databases
            </button>
            <button 
              className={activeTab === 'stats' ? 'active' : ''}
              onClick={() => setActiveTab('stats')}
            >
              📊 Statistics
            </button>
            <button 
              className={activeTab === 'system' ? 'active' : ''}
              onClick={() => setActiveTab('system')}
            >
              ⚙️ System Settings
            </button>
          </nav>
        </aside>

        <main className="admin-main">
          {activeTab === 'users' && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>👥 User Management</h2>
                <button className="btn-primary">+ Add User</button>
              </div>

              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Max Databases</th>
                      <th>Max Targets</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>
                          <strong>{user.username}</strong>
                          {user.role === 'admin' && <span className="role-badge admin">Admin</span>}
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <select 
                            value={user.role}
                            onChange={(e) => updateUserLimits(user.id, 'role', e.target.value)}
                            className="role-select"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            value={user.max_databases}
                            onChange={(e) => updateUserLimits(user.id, 'max_databases', parseInt(e.target.value))}
                            className="limit-input"
                            min="1"
                            max="100"
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={user.max_targets}
                            onChange={(e) => updateUserLimits(user.id, 'max_targets', parseInt(e.target.value))}
                            className="limit-input"
                            min="1"
                            max="1000"
                          />
                        </td>
                        <td>
                          <span className={`status ${user.is_active ? 'active' : 'inactive'}`}>
                            {user.is_active ? '🟢 Active' : '🔴 Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-secondary">Edit</button>
                            <button className="btn-danger">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="admin-stats">
                <h3>Quick Stats</h3>
                <div className="stats-cards">
                  <div className="stat-card">
                    <div className="stat-number">{users.length}</div>
                    <div className="stat-label">Total Users</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{users.filter(u => u.role === 'admin').length}</div>
                    <div className="stat-label">Admins</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{users.filter(u => u.is_active).length}</div>
                    <div className="stat-label">Active Users</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'databases' && (
            <div className="tab-content">
              <h2>🗄️ All Databases</h2>
              <p>View and manage all databases across all users</p>
              
              <div className="search-bar">
                <input type="text" placeholder="Search databases..." />
                <select>
                  <option>All Users</option>
                  {users.map(user => (
                    <option key={user.id}>{user.username}</option>
                  ))}
                </select>
              </div>

              <div className="databases-list">
                <div className="database-item">
                  <div className="db-info">
                    <h4>Main Database</h4>
                    <p>Owner: john_doe • 8 targets • Created: 2024-01-15</p>
                  </div>
                  <div className="db-actions">
                    <button className="btn-secondary">View</button>
                    <button className="btn-danger">Deactivate</button>
                  </div>
                </div>
                
                <div className="database-item">
                  <div className="db-info">
                    <h4>Backup Database</h4>
                    <p>Owner: jane_smith • 12 targets • Created: 2024-01-18</p>
                  </div>
                  <div className="db-actions">
                    <button className="btn-secondary">View</button>
                    <button className="btn-danger">Deactivate</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="tab-content">
              <h2>📊 System Statistics</h2>
              
              <div className="stats-grid">
                <div className="stat-card large">
                  <h3>Usage Overview</h3>
                  <div className="stat-row">
                    <span>Total Users:</span>
                    <strong>15</strong>
                  </div>
                  <div className="stat-row">
                    <span>Total Databases:</span>
                    <strong>42</strong>
                  </div>
                  <div className="stat-row">
                    <span>Total Targets:</span>
                    <strong>287</strong>
                  </div>
                  <div className="stat-row">
                    <span>API Requests (24h):</span>
                    <strong>1,248</strong>
                  </div>
                </div>

                <div className="stat-card large">
                  <h3>System Health</h3>
                  <div className="health-item">
                    <span>Database:</span>
                    <span className="health-good">🟢 Operational</span>
                  </div>
                  <div className="health-item">
                    <span>API Server:</span>
                    <span className="health-good">🟢 Operational</span>
                  </div>
                  <div className="health-item">
                    <span>Uptime:</span>
                    <span>99.8%</span>
                  </div>
                  <div className="health-item">
                    <span>Response Time:</span>
                    <span>~120ms</span>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent System Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">👤</span>
                    <span>New user registered: mike_jones</span>
                    <span className="activity-time">1 hour ago</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">🗄️</span>
                    <span>Database created by jane_smith</span>
                    <span className="activity-time">3 hours ago</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">🔧</span>
                    <span>System backup completed</span>
                    <span className="activity-time">6 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="tab-content">
              <h2>⚙️ System Settings</h2>
              
              <div className="settings-grid">
                <div className="setting-group">
                  <h3>General Settings</h3>
                  <div className="setting-item">
                    <label>Site Name</label>
                    <input type="text" defaultValue="PVB Bot Manager" />
                  </div>
                  <div className="setting-item">
                    <label>Registration</label>
                    <select defaultValue="open">
                      <option value="open">Open Registration</option>
                      <option value="invite">Invite Only</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="setting-group">
                  <h3>API Settings</h3>
                  <div className="setting-item">
                    <label>Cache Duration</label>
                    <input type="number" defaultValue="120" /> seconds
                  </div>
                  <div className="setting-item">
                    <label>Rate Limiting</label>
                    <input type="number" defaultValue="100" /> requests/minute
                  </div>
                </div>

                <div className="setting-group">
                  <h3>Default Limits</h3>
                  <div className="setting-item">
                    <label>Default Max Databases</label>
                    <input type="number" defaultValue="3" />
                  </div>
                  <div className="setting-item">
                    <label>Default Max Targets</label>
                    <input type="number" defaultValue="25" />
                  </div>
                </div>
              </div>

              <div className="settings-actions">
                <button className="btn-primary">Save Settings</button>
                <button className="btn-secondary">Reset to Defaults</button>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background: #f5f6fa;
        }
        .admin-header {
          background: white;
          border-bottom: 1px solid #e1e5e9;
          padding: 1rem 2rem;
        }
        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .admin-nav {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .admin-layout {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 80px);
        }
        .admin-sidebar {
          width: 280px;
          background: white;
          border-right: 1px solid #e1e5e9;
          padding: 2rem 0;
        }
        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 0 1rem;
        }
        .admin-nav button {
          padding: 12px 16px;
          border: none;
          background: none;
          text-align: left;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .admin-nav button:hover {
          background: #f8f9fa;
        }
        .admin-nav button.active {
          background: #667eea;
          color: white;
        }
        .admin-main {
          flex: 1;
          padding: 2rem;
        }
        .users-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }
        .users-table table {
          width: 100%;
          border-collapse: collapse;
        }
        .users-table th,
        .users-table td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #e1e5e9;
        }
        .users-table th {
          background: #f8f9fa;
          font-weight: bold;
          color: #333;
        }
        .role-badge {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          margin-left: 8px;
        }
        .role-badge.admin {
          background: #667eea;
          color: white;
        }
        .role-select, .limit-input {
          padding: 6px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
        }
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        .admin-stats {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .stat-card.large {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }
        .stat-row, .health-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .health-good {
          color: #28a745;
          font-weight: bold;
        }
        .settings-grid {
          display: grid;
          gap: 30px;
          margin-bottom: 30px;
        }
        .setting-group {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .setting-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }
        .setting-item label {
          width: 200px;
          font-weight: bold;
        }
        .setting-item input, .setting-item select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 200px;
        }
        .settings-actions {
          display: flex;
          gap: 15px;
        }
      `}</style>
    </div>
  );
}
