import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { DEV_MODE } from '../config/firebase';

type Mode = 'login' | 'signup' | 'reset';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<Mode>('login');
  const [successMessage, setSuccessMessage] = useState('');
  const { signIn, signUp, resetPassword, signInWithGoogle, signInWithGithub } = useAuth();

  const handleSubmit = async () => {
    try {
      setError('');
      setSuccessMessage('');

      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        await signUp(email, password);
      } else if (mode === 'reset') {
        await resetPassword(email);
        setSuccessMessage('Password reset email sent! Check your inbox.');
      } else {
        await signIn(email, password, rememberMe);
      }
    } catch (err) {
      setError(
        mode === 'reset'
          ? 'Failed to send password reset email'
          : mode === 'signup'
          ? 'Failed to create account'
          : 'Failed to sign in. Please check your credentials.'
      );
      console.error('Auth error:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, Platform.OS === 'web' && styles.webContainer]}
    >
      <View style={[styles.loginContainer, Platform.OS === 'web' && styles.webLoginContainer]}>
        <Text style={styles.title}>
          {mode === 'signup' ? 'Create Account' : mode === 'reset' ? 'Reset Password' : 'Welcome Back'}
        </Text>
        
        {DEV_MODE && (
          <View style={styles.devModeContainer}>
            <Text style={styles.devModeText}>DEV MODE ENABLED</Text>
            <Text style={styles.devModeSubtext}>Use any email/password to login</Text>
          </View>
        )}

        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {mode !== 'reset' && (
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        )}

        {mode === 'signup' && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        )}

        {mode === 'login' && (
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && <View style={styles.checkedBox} />}
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.mainButton} onPress={handleSubmit}>
          <Text style={styles.mainButtonText}>
            {mode === 'reset'
              ? 'Send Reset Link'
              : mode === 'signup'
              ? 'Sign Up'
              : 'Log In'}
          </Text>
        </TouchableOpacity>

        {mode === 'login' && (
          <>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.socialButton} onPress={signInWithGoogle}>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={signInWithGithub}>
              <Text style={styles.socialButtonText}>Continue with GitHub</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.footer}>
          {mode === 'login' ? (
            <>
              <TouchableOpacity onPress={() => setMode('signup')}>
                <Text style={styles.footerLink}>Create Account</Text>
              </TouchableOpacity>
              <Text style={styles.footerDot}>•</Text>
              <TouchableOpacity onPress={() => setMode('reset')}>
                <Text style={styles.footerLink}>Reset Password</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={() => setMode('login')}>
              <Text style={styles.footerLink}>Back to Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    maxWidth: Platform.OS === 'web' ? 400 : '100%',
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2c3e50',
  },
  devModeContainer: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  devModeText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 16,
  },
  devModeSubtext: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#2c3e50',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 12,
    height: 12,
    backgroundColor: '#2c3e50',
    borderRadius: 2,
  },
  rememberMeText: {
    color: '#2c3e50',
    fontSize: 14,
  },
  mainButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#2c3e50',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 10,
  },
  socialButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  footerLink: {
    color: '#3498db',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footerDot: {
    color: '#666',
    marginHorizontal: 10,
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: '#27ae60',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  webContainer: {
    backgroundColor: '#f5f6fa',
  },
  webLoginContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
}); 