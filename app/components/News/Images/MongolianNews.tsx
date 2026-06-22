'use client';

import PhotoMedee from './PhotoMedee';
import OntslohZurag from './OntsohZurag';

export default function MongolianNews() {
  return (
    <div className="bg-[#f5f6f8] font-sans py-4 space-y-6">
      <PhotoMedee />
      <div className="border-t border-gray-200" />
      <OntslohZurag />
    </div>
  );
}