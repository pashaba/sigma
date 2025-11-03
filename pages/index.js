import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="container">
      <Head>
        <title>PVB Bot Manager</title>
        <meta name="description" content="Manage your PVB Bot databases and targets" />
      </Head>

      <header className="header">
        <h1>🌱 PVB Bot Manager</h1>
        <p>Kelola database dan target bot Anda dengan mudah</p>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => setActiveTab('home')}
        >
          🏠 Home
        </button>
        <button 
          className={activeTab === 'features' ? 'active' : ''}
          onClick={() => setActiveTab('features')}
        >
          ⚡ Features
        </button>
        <button 
          className={activeTab === 'api' ? 'active' : ''}
          onClick={() => setActiveTab('api')}
        >
          🔗 API Docs
        </button>
      </nav>

      <main className="main">
        {activeTab === 'home' && (
          <div className="card">
            <h2>Selamat Datang di PVB Bot Manager</h2>
            <p>Platform untuk mengelola database dan target bot Plant Vs Brainrot secara efisien.</p>
            
            <div className="features-grid">
              <div className="feature">
                <h3>🎯 Multi Database</h3>
                <p>Kelola multiple database dengan target berbeda</p>
              </div>
              <div className="feature">
                <h3>📊 Template System</h3>
                <p>17+ template message yang bisa dikustomisasi</p>
              </div>
              <div className="feature">
                <h3>🚀 Real-time API</h3>
                <p>API endpoint untuk integrasi dengan bot</p>
              </div>
              <div className="feature">
                <h3>👨‍💻 User Management</h3>
                <p>Admin dapat mengelola user dan limits</p>
              </div>
            </div>

            <div className="cta-buttons">
              <a href="/login" className="btn btn-primary">Login</a>
              <a href="/register" className="btn btn-secondary">Register</a>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="card">
            <h2>Fitur Lengkap PVB Bot Manager</h2>
            
            <div className="feature-detail">
              <h3>🌐 API Endpoints</h3>
              <ul>
                <li><code>GET /api/config?db_id=UUID</code> - Dapatkan konfigurasi database</li>
                <li><code>GET /api/active-dbs</code> - Daftar database aktif</li>
                <li><code>POST /api/targets</code> - Tambah target baru</li>
              </ul>
            </div>

            <div className="feature-detail">
              <h3>📋 Template System</h3>
              <p>17 template message yang sudah tersedia:</p>
              <div className="templates-grid">
                {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(templateId => (
                  <span key={templateId} className="template-badge">Template {templateId}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="card">
            <h2>📚 API Documentation</h2>
            
            <div className="api-endpoint">
              <h3>Get Database Config</h3>
              <code>GET /api/config?db_id=UUID</code>
              <p>Mendapatkan konfigurasi database beserta targets</p>
              
              <h4>Response:</h4>
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

            <div className="api-endpoint">
              <h3>Get Active Databases</h3>
              <code>GET /api/active-dbs</code>
              
              <h4>Response:</h4>
              <pre>{`{
  "success": true,
  "databases": ["uuid-1", "uuid-2", "uuid-3"]
}`}</pre>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>PVB Bot Manager &copy; 2024 - Powered by Supabase & Next.js</p>
      </footer>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          min-height: 100vh;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding: 40px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          color: white;
        }
        .header h1 {
          margin: 0;
          font-size: 2.5rem;
        }
        .tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          gap: 10px;
        }
        .tabs button {
          padding: 12px 24px;
          border: none;
          background: #f5f5f5;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .tabs button.active {
          background: #667eea;
          color: white;
        }
        .card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
        .feature {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          text-align: center;
        }
        .cta-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 30px;
        }
        .btn {
          padding: 12px 30px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s;
        }
        .btn-primary {
          background: #667eea;
          color: white;
        }
        .btn-secondary {
          background: #e9ecef;
          color: #333;
        }
        .templates-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 15px;
        }
        .template-badge {
          background: #e9ecef;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
        }
        .api-endpoint {
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .api-endpoint code {
          background: #333;
          color: #fff;
          padding: 8px 12px;
          border-radius: 4px;
          display: block;
          margin: 10px 0;
        }
        .footer {
          text-align: center;
          margin-top: 50px;
          padding: 20px;
          color: #666;
        }
      `}</style>
    </div>
  );
}
