import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [databases, setDatabases] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data - replace with actual Supabase data
  useEffect(() => {
    setUser({
      username: 'john_doe',
      email: 'john@example.com',
      max_databases: 3,
      max_targets: 25,
      used_databases: 2,
      used_targets: 15
    });

    setDatabases([
      {
        id: 'db-001',
        name: 'Main Database',
        targets: 8,
        is_active: true,
        created_at: '2024-01-15'
      },
      {
        id: 'db-002', 
        name: 'Backup Database',
        targets: 7,
        is_active: true,
        created_at: '2024-01-20'
      }
    ]);
  }, []);

  const addDatabase = () => {
    const newDb = {
      id: 'db-' + Date.now(),
      name: 'New Database ' + (databases.length + 1),
      targets: 0,
      is_active: true,
      created_at: new Date().toISOString().split('T')[0]
    };
    setDatabases([...databases, newDb]);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <Head>
        <title>Dashboard - PVB Bot Manager</title>
      </Head>

      <header className="dashboard-header">
        <div className="header-content">
          <h1>📊 Dashboard</h1>
          <div className="user-info">
            <span>Welcome, <strong>{user.username}</strong></span>
            <a href="/" className="logout-btn">Logout</a>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              📈 Overview
            </button>
            <button 
              className={activeTab === 'databases' ? 'active' : ''}
              onClick={() => setActiveTab('databases')}
            >
              🗄️ Databases
            </button>
            <button 
              className={activeTab === 'targets' ? 'active' : ''}
              onClick={() => setActiveTab('targets')}
            >
              🎯 Targets
            </button>
            <button 
              className={activeTab === 'api' ? 'active' : ''}
              onClick={() => setActiveTab('api')}
            >
              🔗 API Keys
            </button>
          </nav>
        </aside>

        <main className="dashboard-main">
          {activeTab === 'overview' && (
            <div className="tab-content">
              <h2>📈 Overview</h2>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{user.used_databases}/{user.max_databases}</div>
                  <div className="stat-label">Databases</div>
                  <div className="stat-progress">
                    <div 
                      className="progress-bar" 
                      style={{width: `${(user.used_databases/user.max_databases)*100}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-value">{user.used_targets}/{user.max_targets}</div>
                  <div className="stat-label">Targets</div>
                  <div className="stat-progress">
                    <div 
                      className="progress-bar" 
                      style={{width: `${(user.used_targets/user.max_targets)*100}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-value">{databases.filter(db => db.is_active).length}</div>
                  <div className="stat-label">Active DBs</div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-value">
                    {databases.reduce((total, db) => total + db.targets, 0)}
                  </div>
                  <div className="stat-label">Total Targets</div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">✅</span>
                    <span>Database "Main Database" updated</span>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">🎯</span>
                    <span>5 new targets added</span>
                    <span className="activity-time">1 day ago</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">🆕</span>
                    <span>New database created</span>
                    <span className="activity-time">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'databases' && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>🗄️ My Databases</h2>
                <button onClick={addDatabase} className="btn-primary">
                  + Add Database
                </button>
              </div>

              <div className="databases-grid">
                {databases.map(db => (
                  <div key={db.id} className="database-card">
                    <div className="db-header">
                      <h3>{db.name}</h3>
                      <span className={`status ${db.is_active ? 'active' : 'inactive'}`}>
                        {db.is_active ? '🟢 Active' : '🔴 Inactive'}
                      </span>
                    </div>
                    
                    <div className="db-info">
                      <div className="info-item">
                        <span className="label">ID:</span>
                        <code className="db-id">{db.id}</code>
                      </div>
                      <div className="info-item">
                        <span className="label">Targets:</span>
                        <span className="value">{db.targets} targets</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Created:</span>
                        <span className="value">{db.created_at}</span>
                      </div>
                    </div>

                    <div className="db-actions">
                      <button className="btn-secondary">Edit</button>
                      <button className="btn-secondary">Manage Targets</button>
                      <button className="btn-danger">Delete</button>
                    </div>
                  </div>
                ))}
              </div>

              {databases.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon">🗄️</div>
                  <h3>No Databases Yet</h3>
                  <p>Create your first database to start managing targets</p>
                  <button onClick={addDatabase} className="btn-primary">
                    Create First Database
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'targets' && (
            <div className="tab-content">
              <h2>🎯 Target Management</h2>
              <p>Select a database to manage its targets</p>
              
              <div className="targets-list">
                {databases.map(db => (
                  <div key={db.id} className="target-db-card">
                    <h4>{db.name} ({db.targets} targets)</h4>
                    <button className="btn-primary">Manage Targets</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="tab-content">
              <h2>🔗 API Endpoints</h2>
              
              <div className="api-cards">
                <div className="api-card">
                  <h4>Get Database Config</h4>
                  <code>GET /api/config?db_id=YOUR_DB_ID</code>
                  <p>Returns targets and settings for specific database</p>
                  
                  <div className="api-example">
                    <h5>Example Response:</h5>
                    <pre>{`{
  "targets": [
    ["jid1@newsletter", "1"],
    ["jid2@g.us", "2"]
  ],
  "settings": {
    "active": true,
    "name": "My Database"
  }
}`}</pre>
                  </div>
                </div>

                <div className="api-card">
                  <h4>Get Active Databases</h4>
                  <code>GET /api/active-dbs</code>
                  <p>Returns list of all active database IDs</p>
                  
                  <div className="api-example">
                    <h5>Example Response:</h5>
                    <pre>{`{
  "success": true,
  "databases": ["db-001", "db-002"]
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="api-usage">
                <h3>Usage in Your Bot</h3>
                <pre>{`const response = await fetch('https://your-app.vercel.app/api/config?db_id=your-db-id');
const config = await response.json();

// Use in your bot
config.targets.forEach(([jid, templateId]) => {
  // Send message using template
});`}</pre>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: #f5f6fa;
        }
        .dashboard-header {
          background: white;
          border-bottom: 1px solid #e1e5e9;
          padding: 1rem 2rem;
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dashboard-header h1 {
          margin: 0;
          color: #333;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .logout-btn {
          color: #667eea;
          text-decoration: none;
          padding: 8px 16px;
          border: 1px solid #667eea;
          border-radius: 6px;
        }
        .dashboard-layout {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          min-height: calc(100vh - 80px);
        }
        .sidebar {
          width: 250px;
          background: white;
          border-right: 1px solid #e1e5e9;
          padding: 2rem 0;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 0 1rem;
        }
        .sidebar-nav button {
          padding: 12px 16px;
          border: none;
          background: none;
          text-align: left;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .sidebar-nav button:hover {
          background: #f8f9fa;
        }
        .sidebar-nav button.active {
          background: #667eea;
          color: white;
        }
        .dashboard-main {
          flex: 1;
          padding: 2rem;
        }
        .tab-content h2 {
          margin-top: 0;
          color: #333;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 8px;
        }
        .stat-label {
          color: #666;
          margin-bottom: 15px;
        }
        .stat-progress {
          height: 6px;
          background: #e9ecef;
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: #667eea;
          transition: width 0.3s;
        }
        .tab-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .btn-primary {
          background: #667eea;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        }
        .btn-secondary {
          background: #e9ecef;
          color: #333;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
        .btn-danger {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }
        .databases-grid {
          display: grid;
          gap: 20px;
        }
        .database-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .db-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .db-header h3 {
          margin: 0;
          color: #333;
        }
        .status.active {
          color: #28a745;
          font-weight: bold;
        }
        .status.inactive {
          color: #dc3545;
          font-weight: bold;
        }
        .db-info {
          margin-bottom: 20px;
        }
        .info-item {
          display: flex;
          margin-bottom: 8px;
        }
        .info-item .label {
          width: 80px;
          color: #666;
        }
        .db-id {
          background: #f8f9fa;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
        }
        .db-actions {
          display: flex;
          gap: 10px;
        }
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }
        .empty-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }
        .api-cards {
          display: grid;
          gap: 20px;
          margin-bottom: 40px;
        }
        .api-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .api-card code {
          background: #f8f9fa;
          padding: 8px 12px;
          border-radius: 4px;
          display: block;
          margin: 10px 0;
          font-family: monospace;
        }
        .api-example {
          margin-top: 20px;
        }
        .api-example pre {
          background: #2d3748;
          color: #e2e8f0;
          padding: 15px;
          border-radius: 6px;
          overflow-x: auto;
          font-size: 0.9rem;
        }
        .api-usage pre {
          background: #2d3748;
          color: #e2e8f0;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}
