'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { auth } from '@/lib/auth';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const resendVerification = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // In a real implementation, you would call a resend verification function
      setMessage('Verification email sent! Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#6db33f' }}>
            KJ Electronics
          </h1>
          <p className="text-gray-600 mt-2">Nigeria's No. 1 Electronics Store</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8" style={{ color: '#6db33f' }} />
            </div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <p className="text-gray-600">
              We've sent a verification link to your email address. Please click the link to verify your account.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {message && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <Button
                onClick={resendVerification}
                variant="outline"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>

              <Button
                onClick={() => router.push('/auth/login')}
                className="w-full"
                style={{ backgroundColor: '#6db33f' }}
              >
                Back to Login
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={resendVerification}
                  className="font-medium hover:underline"
                  style={{ color: '#6db33f' }}
                  disabled={loading}
                >
                  resend verification email
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}