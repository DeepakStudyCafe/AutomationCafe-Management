import React from 'react';
import { Metadata } from 'next';
import { ReferralClient } from './ReferralClient';

export const metadata: Metadata = {
  title: "Referral Program — Earn 20% Commission",
  description: "Join the AutomationCafe Referral Program. Promote our automation tools and earn 20% referral income on every successful subscription.",
  keywords: "AutomationCafe referral program, Referral program, earn commission, CA affiliate program India",
  alternates: {
    canonical: "https://automationcafe.in/Referral"
  }
};

export default function ReferralPage() {
  return <ReferralClient />;
}
