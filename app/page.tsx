'use client';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { Notification } from '../components/Notification';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const generateShortUrl = async() => {
    setShortUrl('');
    setError('');
    
    if (!longUrl) {
      setError('Please enter a URL');
      return;
    }
    if (!URL.canParse(longUrl)) {
      setError('Please enter a valid URL');
      return;
    }
    if (longUrl.includes(window.location.hostname)) {
      setError('Cannot shorten URLs from this domain');
      return;
    }
    if (!alias) {
      setError('Please enter an alias');
      return;
    }
    if (alias.includes(' ')) {
      setError('Alias cannot contain spaces');
      return;
    }
    if (alias.includes('/')) {
      setError('Alias cannot contain slashes');
      return;
    }
    
    const res = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ longUrl, alias }),
    });

    const data = await res.text();

    if (res.ok) {
      setShortUrl(data);
      setNotificationMessage('URL shortened successfully!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } else {
      setError(data);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setNotificationMessage('Copied to clipboard!');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  }

  const resetForm = () => {
    setLongUrl('');
    setAlias('');
    setShortUrl('');
    setError('');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Notification
        show={showNotification}
        message={notificationMessage}
      />
      <div className="flex flex-col w-full max-w-[362px] p-6 border border-gray-200 rounded-lg">
        <h1 className="text-2xl font-bold tracking-tight">URL Shortener</h1>
        
        {!shortUrl ? (
          <>
            <p className="text-gray-500 pt-2">Enter a long URL to get a shortened version</p>
            <label htmlFor="alias" className="pt-4 pb-1">Long URL</label>
            <input
              type="url"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="https://example.com/very/long/url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <label htmlFor="alias" className="pt-4 pb-1">Custom Alias</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              placeholder="my-custom-alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
            <button
              className="py-2 text-white bg-black hover:bg-black/80 rounded-md mt-4 transition-colors"
              onClick={generateShortUrl}
            >Shorten URL</button>
            {error && (
              <p className="text-sm text-red-500 text-center pt-2">{error}</p>
            )}
          </>
        ) : (
          <div className="flex flex-col">
            <p className="text-gray-500 pt-2">Your shortened URL is ready!</p>
            <label htmlFor="shortUrl" className="pt-4 pb-1">Shortened URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                value={shortUrl}
                readOnly
              />
              <button
                className="px-4 py-2 text-black bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-colors"
                onClick={copyToClipboard}
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <button
              className="py-2 text-white bg-black hover:bg-black/80 rounded-md mt-4 transition-colors"
              onClick={resetForm}
            >
              Shorten Another URL
            </button>
          </div>
        )}
      </div>
    </div>
  );
}