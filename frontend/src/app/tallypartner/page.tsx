import React from 'react';
import { Metadata } from 'next';
import { TallyPartnerClient } from './TallyPartnerClient';

export const metadata: Metadata = {
  title: "Apply for Tally Integration — AutomationCafe",
  description: "Apply for Tally Integration with AutomationCafe. Convert PDF & Excel Invoices directly to Tally XML with automated GST sync.",
  alternates: {
    canonical: "https://automationcafe.in/TallyPartner"
  }
};

export default function TallyPartnerPage() {
  return <TallyPartnerClient />;
}
