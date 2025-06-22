import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CookieModal from './CookieModal';


Object.defineProperty(window.document, 'cookie', {
  writable: true,
  value: '',
});

describe('CookieModal Component RGPD', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('affiche la bannière RGPD au premier chargement', () => {
    render(<CookieModal />);
    expect(screen.getByText(/nous utilisons des cookies/i)).toBeInTheDocument();
    expect(screen.getByText(/tout accepter/i)).toBeInTheDocument();
  });

  it('ouvre le panneau de préférences quand on clique sur "Plus d\'options"', () => {
    render(<CookieModal />);
    fireEvent.click(screen.getByText(/plus d'options/i));
    expect(screen.getByText(/paramètres de personnalisation et cookies/i)).toBeInTheDocument();
  });

  it('enregistre le consentement complet sur clic "Tout accepter"', () => {
    render(<CookieModal />);
    fireEvent.click(screen.getByText(/tout accepter/i));
    expect(document.cookie).toMatch(/userConsent=/);
    expect(document.cookie).toMatch(/"status":"accepted"/);
  });
});
