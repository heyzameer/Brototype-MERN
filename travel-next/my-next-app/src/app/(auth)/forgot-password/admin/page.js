'use client';
import React, { useState, useRef } from 'react';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const pinRefs = [useRef(), useRef(), useRef(), useRef(), useRef()];

  React.useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    // TODO: Backend API call to send code to email
    setStep(2);
    setTimer(60);
    setCanResend(false);
  };

  const handlePinChange = (idx, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newPin = [...pin];
    newPin[idx] = val;
    setPin(newPin);
    if (val && idx < 4) {
      pinRefs[idx + 1].current.focus();
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (pin.some((d) => d === '')) {
      setError('Please enter the full code.');
      return;
    }
    // TODO: Backend API call to verify code
    setStep(3);
  };

  const handleResend = () => {
    if (!canResend) return;
    // TODO: Backend API call to resend code
    setPin(['', '', '', '', '']);
    setTimer(60);
    setCanResend(false);
    pinRefs[0].current.focus();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // TODO: Backend API call to reset password
    // On success, redirect to user dashboard
    window.location.href = '/dashboard/admin';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Forgot Password</h2>
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-lg">Send Code</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Enter 5-digit code</label>
              <div className="flex gap-2 justify-center">
                {pin.map((d, i) => (
                  <input
                    key={i}
                    ref={pinRefs[i]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handlePinChange(i, e.target.value)}
                    className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                ))}
              </div>
            </div>
            <div className="text-center text-gray-500 text-sm">
              {canResend ? (
                <button type="button" onClick={handleResend} className="text-indigo-600 hover:text-indigo-800 font-medium">Resend Code</button>
              ) : (
                <>Resend in <span className="font-semibold">{timer}s</span></>
              )}
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-lg">Verify Code</button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
                placeholder="New password"
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg"
                placeholder="Confirm password"
                required
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-lg">Reset Password</button>
          </form>
        )}
        {error && <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">{error}</div>}
      </div>
    </div>
  );
}
