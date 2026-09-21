'use client'

import { useState } from 'react'

interface Server {
  id: string
  serverName: string
  embedUrl: string
  quality: string
  orderPriority: number
}

interface ServerSwitcherProps {
  servers: Server[]
}

export default function ServerSwitcher({ servers }: ServerSwitcherProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const activeServer = servers[activeIdx]

  if (servers.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--card-radius)' }}>
        <div className="empty-state__icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        </div>
        <h2 className="empty-state__title">Server Tidak Tersedia</h2>
        <p>Maaf, server untuk episode ini belum tersedia.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Video Player */}
      <div className="player-wrapper">
        <iframe
          key={activeServer.embedUrl}
          src={activeServer.embedUrl}
          title={`Video player - ${activeServer.serverName}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
          id="video-player-iframe"
        />
      </div>

      {/* Server Switcher Tabs */}
      <div style={{ marginTop: '1rem' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Pilih Server:
        </p>
        <div className="server-tabs" role="tablist" aria-label="Pilih server video">
          {servers.map((server, idx) => (
            <button
              key={server.id}
              className={`server-tab ${idx === activeIdx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
              role="tab"
              aria-selected={idx === activeIdx}
              id={`server-tab-${idx}`}
              aria-label={`${server.serverName} (${server.quality})`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              {server.serverName}
              <span style={{
                fontSize: '0.7rem',
                padding: '1px 5px',
                borderRadius: '4px',
                background: idx === activeIdx ? 'rgba(229,23,63,0.3)' : 'rgba(255,255,255,0.07)',
                color: idx === activeIdx ? '#ff6b8a' : 'var(--text-muted)',
              }}>
                {server.quality}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
