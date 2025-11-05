import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 text-center text-xs text-brand-text-secondary">
      <div className="flex justify-center items-center space-x-2 sm:space-x-4">
        <a href="#" className="hover:underline">Terms</a>
        <span>|</span>
        <a href="#" className="hover:underline">Privacy</a>
        <span>|</span>
        <a href="#" className="hover:underline">Disclaimer</a>
      </div>
      <p className="mt-2">
        © {currentYear} Empower Forward. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
