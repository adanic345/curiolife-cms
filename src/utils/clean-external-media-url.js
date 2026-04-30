'use strict';

// Strip query params and fragments from YouTube and Vimeo URLs.
// Keeps only what's needed for embedding — avoids Turnstile tokens,
// referrer junk, and other params that break storage or embed generation.
function stripEmbedUrl(rawUrl) {
  if (!rawUrl) return rawUrl;

  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.replace('www.', '');

    if (host === 'youtube.com' || host === 'youtu.be') {
      const videoId = parsed.searchParams.get('v') || parsed.pathname.split('/').pop();
      return `https://www.youtube.com/watch?v=${videoId}`;
    }

    if (host === 'vimeo.com') {
      // Keep only the path (video ID), drop all query params
      return `https://vimeo.com${parsed.pathname}`;
    }

    // For direct URLs, return as-is
    return rawUrl;
  } catch {
    return rawUrl;
  }
}

function cleanExternalMediaUrl(data) {
  if (data?.externalMedia?.url) {
    data.externalMedia.url = stripEmbedUrl(data.externalMedia.url);
  }
}

module.exports = { cleanExternalMediaUrl, stripEmbedUrl };
