import { useState } from 'react';
import Head from 'next/head';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    alert('Registrasi berhasil! (Akan diintegrasikan dengan Supabase)');
  };

  return (
    <div className="register-container">
      <Head>
        <title>Daftar - PVB Bot Manager</title>
      </Head>

      <div className="register-card">
        <h1>🚀 Daftar Akun Baru</h1>
        <p>Buat akun untuk mulai mengelola database bot Anda</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              placeholder="Pilih username"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Masukkan email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Buat password"
              required
            />
          </div>

          <div className="form-group">
            <label>Konfirmasi Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Ulangi password"
              required
            />
          </div>

          <div className="form-terms">
            <label className="checkbox-label">
              <input type="checkbox" required />
              Saya menyetujui syarat dan ketentuan
            </label>
          </div>

          <button type="submit" className="register-btn">Daftar Sekarang</button>
        </form>

        <div className="register-links">
          <a href="/">← Kembali ke Home</a>
          <a href="/login">Sudah punya akun? Login</a>
        </div>

        <div className="features-preview">
          <h3>Dengan mendaftar, Anda mendapatkan:</h3>
          <ul>
            <li>✅ Hingga 3 database gratis</li>
            <li>✅ 25 targets per database</li>
            <li>✅ Akses ke 17+ template message</li>
            <li>✅ API endpoint untuk bot</li>
            <li>✅ Dashboard management yang mudah</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .register-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .register-card {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 450px;
        }
        .register-card h1 {
          text-align: center;
          margin-bottom: 10px;
          color: #333;
        }
        .register-card p {
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
        .form-terms {
          margin: 25px 0;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: normal;
          cursor: pointer;
        }
        .checkbox-label input {
          width: auto;
        }
        .register-btn {
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
        .register-btn:hover {
          background: #5a6fd8;
        }
        .register-links {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }
        .register-links a {
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
        }
        .features-preview {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e1e5e9;
        }
        .features-preview h3 {
          color: #333;
          margin-bottom: 15px;
        }
        .features-preview ul {
          color: #666;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
