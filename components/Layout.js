import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";

const Layout = (props) => {
  return (
    <div className="app-shell">
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>CrowdCoin | Kickstarter on Ethereum</title>
      </Head>
      <div className="app-background">
        <Container className="app-container">
          <Header />
          <div className="page-surface">{props.children}</div>
        </Container>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
          background: radial-gradient(circle at 20% 20%, #e0f2fe, transparent 30%),
            radial-gradient(circle at 80% 0%, #f5d0fe, transparent 25%),
            linear-gradient(135deg, #0f172a, #111827 45%, #0b132b 100%);
          color: #0f172a;
        }

        a {
          color: inherit;
        }

        .app-background {
          min-height: 100vh;
          padding: 32px 0 48px;
          backdrop-filter: blur(6px);
        }

        .app-container {
          max-width: 1100px !important;
        }

        .page-surface {
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(226, 232, 240, 0.7);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 25px 70px rgba(15, 23, 42, 0.18);
        }

        .page-content {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        h1,
        h2,
        h3,
        h4 {
          color: #0f172a;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
        }

        p.page-subtitle {
          color: #475569;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 15px;
        }

        .ui.menu.app-menu {
          border: none;
          box-shadow: none;
          background: transparent;
          padding: 4px 6px;
          margin-bottom: 18px;
        }

        .ui.menu.app-menu .item {
          font-weight: 600;
          color: #0f172a;
        }

        .ui.menu.app-menu .item:hover {
          color: #2563eb;
        }

        .ui.button.primary {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          border: none;
        }

        .ui.card,
        .ui.cards > .card {
          border-radius: 16px !important;
          box-shadow: 0 15px 45px rgba(15, 23, 42, 0.12) !important;
          border: 1px solid #e2e8f0 !important;
        }

        .ui.card:hover,
        .ui.cards > .card:hover {
          transform: translateY(-3px);
          transition: transform 160ms ease;
        }
      `}</style>
    </div>
  );
};
export default Layout;
