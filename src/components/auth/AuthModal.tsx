import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const { login, register, quickDemoLogin } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      if (!email || !password) {
        onShowToast('error', 'Preencha seu e-mail e senha.');
        return;
      }
      await login(email, password);
      onShowToast('success', 'Login efetuado com sucesso!');
      onClose();
    } else {
      if (!name || !email || !password) {
        onShowToast('error', 'Preencha todos os campos obrigatórios.');
        return;
      }
      await register(name, email, phone, password);
      onShowToast('success', 'Cadastro realizado com sucesso!');
      onClose();
    }
  };

  const handleDemoLogin = (role: 'customer' | 'admin') => {
    quickDemoLogin(role);
    onShowToast('success', `Conectado como ${role === 'admin' ? 'Administrador Whitelabel' : 'Cliente VIP'}!`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet-content"
        style={{ height: 'auto', maxHeight: '90%' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-sheet-header">
          <h3 className="modal-sheet-title">
            {tab === 'login' ? 'Entrar na sua Conta' : 'Criar Nova Conta'}
          </h3>
          <button className="detail-icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab switch */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--bg-card-muted)',
            borderRadius: 'var(--radius-full)',
            padding: '4px',
            marginBottom: '18px'
          }}
        >
          <button
            onClick={() => setTab('login')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 700,
              backgroundColor: tab === 'login' ? 'var(--color-primary)' : 'transparent',
              color: tab === 'login' ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'var(--transition-fast)'
            }}
          >
            Entrar
          </button>
          <button
            onClick={() => setTab('register')}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 700,
              backgroundColor: tab === 'register' ? 'var(--color-primary)' : 'transparent',
              color: tab === 'register' ? '#FFFFFF' : 'var(--text-secondary)',
              transition: 'var(--transition-fast)'
            }}
          >
            Cadastrar
          </button>
        </div>

        {/* 1-Click Fast Demo Logins */}
        <div
          style={{
            backgroundColor: 'var(--color-primary-light)',
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '18px',
            border: '1px dashed var(--color-primary)'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-primary-active)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
            <Sparkles size={13} /> ACESSO RÁPIDO 1-CLIQUE (DEMO)
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={() => handleDemoLogin('customer')}
              style={{
                backgroundColor: 'var(--bg-card)',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11.5px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}
            >
              <User size={13} color="var(--color-primary)" /> Cliente VIP
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              style={{
                backgroundColor: 'var(--bg-card)',
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '11.5px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}
            >
              <ShieldCheck size={13} color="var(--color-primary)" /> Admin Whitelabel
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tab === 'register' && (
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', display: 'block' }}>
                Nome Completo
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--bg-input)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <User size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ background: 'transparent', width: '100%', fontSize: '13px' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', display: 'block' }}>
              E-mail
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--bg-input)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <Mail size={16} color="var(--text-muted)" />
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ background: 'transparent', width: '100%', fontSize: '13px' }}
              />
            </div>
          </div>

          {tab === 'register' && (
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', display: 'block' }}>
                Telefone / WhatsApp
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'var(--bg-input)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <Phone size={16} color="var(--text-muted)" />
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ background: 'transparent', width: '100%', fontSize: '13px' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', display: 'block' }}>
              Senha
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'var(--bg-input)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <Lock size={16} color="var(--text-muted)" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ background: 'transparent', width: '100%', fontSize: '13px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-checkout-cta"
            style={{ marginTop: '10px' }}
          >
            <span>{tab === 'login' ? 'Entrar' : 'Criar Conta'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
