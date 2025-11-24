import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";

const Layout = (props) => {
  return (
    <div className="app-background">
      <Container className="app-shell">
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#111827" />
        </Head>
        <Header />
        {props.children}
      </Container>

      <style jsx global>{`
        :root {
          --surface: rgba(15, 23, 42, 0.75);
          --border: rgba(255, 255, 255, 0.08);
          --brand: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
          background: radial-gradient(circle at 20% 20%, rgba(96, 165, 250, 0.12), transparent 25%),
            radial-gradient(circle at 80% 0%, rgba(167, 139, 250, 0.1), transparent 30%),
            linear-gradient(180deg, #0f172a 0%, #0b1220 100%);
          color: #e2e8f0;
          min-height: 100vh;
        }

        a {
          color: inherit;
        }

        .app-shell {
          padding: 32px 0 72px;
          min-height: 100vh;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: #e2e8f0;
          letter-spacing: -0.02em;
        }

        p {
          color: #cbd5e1;
          line-height: 1.6;
        }

        .ui.card,
        .ui.cards > .card {
          border-radius: 14px;
          border: 1px solid var(--border);
          background: var(--surface);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .ui.card:hover {
          transform: translateY(-3px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
        }

        .glass-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px !important;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35) !important;
          padding: 20px !important;
        }

        .page-header {
          margin-bottom: 32px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: #93c5fd;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .section-subtitle {
          color: #cbd5e1;
          max-width: 720px;
          margin-top: 10px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 18px;
        }

        .pill {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          padding: 10px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          color: #cbd5e1;
          font-weight: 600;
        }

        .pill strong {
          color: #e2e8f0;
        }

        .card-section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin: 20px 0 12px;
        }

        .card-section-header span {
          color: #94a3b8;
          font-size: 14px;
        }

        .nav-bar {
          background: transparent !important;
          border: none !important;
          margin-bottom: 20px;
          padding: 6px 0;
        }

        .nav-bar .item,
        .nav-bar a.item {
          color: #cbd5e1 !important;
          font-weight: 600;
        }

        .nav-bar .item:hover {
          color: #ffffff !important;
        }

        .brand {
          font-weight: 800 !important;
          font-size: 18px !important;
          letter-spacing: -0.02em;
        }

        .brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          margin-right: 10px;
          border-radius: 10px;
          background-image: var(--brand);
          color: #0b1220;
          font-weight: 800;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .create-button {
          background-image: var(--brand) !important;
          color: #0b1220 !important;
          border-radius: 999px !important;
          font-weight: 700 !important;
          padding: 10px 18px !important;
          border: none !important;
          box-shadow: 0 10px 30px rgba(96, 165, 250, 0.35);
        }

        .ui.button.primary,
        .ui.primary.buttons .button {
          background-image: var(--brand);
          border: none;
          color: #0b1220;
          font-weight: 700;
        }

        .ui.button.primary:hover,
        .ui.primary.buttons .button:hover {
          filter: brightness(1.05);
        }

        .frosted-table {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.4);
        }

        .frosted-table table {
          margin: 0;
        }

        .frosted-table .header,
        .frosted-table .row {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
};
export default Layout;
