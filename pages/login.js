import { useState } from 'react';
import Head from 'next/head';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login functionality akan diimplementasi dengan Supabase');
  };

  return (
    <div className="login-container">
      <Head>
        <title>Login - PVB Bot Manager</title>
      </Head>

      <div className="login-card">
        <h1>🔐 Login</h1>
        <p>Masuk ke akun PVB Bot Manager Anda</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Masukkan password"
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="login-links">
          <a href="/">← Kembali ke Home</a>
          <a href="/register">Belum punya akun? Daftar</a>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .login-card {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
        }
        .login-card h1 {
          text-align: center;
          margin-bottom: 10px;
          color: #333;
        }
        .login-card p {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-weight: bold;
        }
        .form-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        .form-group input:focus {
          border-color: #667eea;
          outline: none;
        }
        .login-btn {
          width: 100%;
          padding: 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }
        .login-btn:hover {
          background: #5a6fd8;
        }
        .login-links {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }
        .login-links a {
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
