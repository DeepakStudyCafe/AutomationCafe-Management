import React from 'react';
import { Metadata } from 'next';
import { PartnerClient } from './PartnerClient';

export const metadata: Metadata = {
  title: "Partner With Us — AutomationCafe",
  description: "Partner with AutomationCafe. Offer top-tier GST & Tax automation tools to your clients and earn attractive commissions.",
  alternates: {
    canonical: "https://automationcafe.in/Partner"
  }
};

export default function PartnerPage() {
  return <PartnerClient />;
}
