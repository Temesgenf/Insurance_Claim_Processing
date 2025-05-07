// Dummy data for insurance products, each with tabs: Overview, Coverages, Key Features, Terminologies, Claim Process
// Later, this will be fetched from MySQL, but for now is hardcoded for development.

export const productsData = [
  {
    id: 'critical-care',
    name: 'Critical Care Insurance',
    tabs: {
      overview: 'Critical Care Insurance provides financial protection against major illnesses such as cancer, heart attack, and stroke. It offers a lump sum payout on diagnosis.',
      coverages: [
        'Cancer',
        'Heart Attack',
        'Stroke',
        'Kidney Failure',
        'Major Organ Transplant',
      ],
      keyFeatures: [
        'Lump sum payout on diagnosis',
        'Covers multiple critical illnesses',
        'Tax benefits under Section 80D',
        'Affordable premiums',
      ],
      terminologies: [
        'Sum Insured',
        'Waiting Period',
        'Survival Period',
      ],
      claimProcess: [
        'Submit diagnosis report',
        'Fill claim form',
        'Verification by insurer',
        'Claim approval and payout',
      ],
    },
  },
  {
    id: 'hospital-daily-cash',
    name: 'Hospital Daily Cash Benefit Insurance',
    tabs: {
      overview: 'This insurance offers a fixed daily cash benefit for each day of hospitalization, helping cover non-medical expenses.',
      coverages: [
        'Daily cash for hospitalization',
        'ICU benefit',
        'Convalescence benefit',
      ],
      keyFeatures: [
        'Fixed daily payout',
        'No bills required',
        'Covers ICU and recovery',
      ],
      terminologies: [
        'Daily Cash Limit',
        'ICU Benefit',
        'Convalescence',
      ],
      claimProcess: [
        'Hospitalization proof',
        'Submit claim form',
        'Insurer processes claim',
        'Cash benefit payout',
      ],
    },
  },
  {
    id: 'vector-care',
    name: 'Vector Care Insurance',
    tabs: {
      overview: 'Vector Care Insurance covers vector-borne diseases such as dengue, malaria, and chikungunya with a lump sum payout.',
      coverages: [
        'Dengue',
        'Malaria',
        'Chikungunya',
        'Zika Virus',
      ],
      keyFeatures: [
        'Lump sum benefit',
        'Covers multiple diseases',
        'Short waiting period',
      ],
      terminologies: [
        'Vector-borne Disease',
        'Policy Term',
      ],
      claimProcess: [
        'Submit positive medical test',
        'Fill claim form',
        'Claim reviewed and paid',
      ],
    },
  },
  {
    id: 'ambulance-service',
    name: 'Ambulance Service for Hospital Assistance Insurance',
    tabs: {
      overview: 'Provides coverage for ambulance services required for hospitalization, including road and air ambulance.',
      coverages: [
        'Road ambulance',
        'Air ambulance',
        'Emergency evacuation',
      ],
      keyFeatures: [
        'Covers ambulance expenses',
        'No sub-limits',
        'Covers all hospitalizations',
      ],
      terminologies: [
        'Sum Insured',
        'Network Hospital',
      ],
      claimProcess: [
        'Submit ambulance bill',
        'Hospitalization proof',
        'Claim processed',
      ],
    },
  },
  {
    id: 'family-health-protection',
    name: 'Family Health Protection Insurance',
    tabs: {
      overview: 'A comprehensive health plan for families, covering hospitalization, surgeries, and daycare procedures.',
      coverages: [
        'Hospitalization',
        'Pre- and post-hospitalization',
        'Daycare procedures',
        'Surgeries',
      ],
      keyFeatures: [
        'Covers entire family',
        'Cashless treatment',
        'Wide network of hospitals',
      ],
      terminologies: [
        'Sum Insured',
        'Cashless Network',
      ],
      claimProcess: [
        'Intimate insurer',
        'Submit documents',
        'Claim processed',
      ],
    },
  },
  {
    id: 'senior-citizen-health',
    name: 'Senior Citizen Health Cover Insurance',
    tabs: {
      overview: 'Specially designed for senior citizens, this plan covers age-related illnesses and offers higher sum insured.',
      coverages: [
        'Hospitalization',
        'Critical illness',
        'Pre-existing disease cover',
      ],
      keyFeatures: [
        'No entry age limit',
        'Covers pre-existing diseases',
        'Higher sum insured',
      ],
      terminologies: [
        'Pre-existing Disease',
        'Sum Insured',
      ],
      claimProcess: [
        'Hospitalization',
        'Submit claim form',
        'Claim approval',
      ],
    },
  },
  {
    id: 'maternity-child-care',
    name: 'Maternity & Child Care Insurance',
    tabs: {
      overview: 'Covers maternity expenses and newborn care, including delivery and vaccinations.',
      coverages: [
        'Delivery expenses',
        'Newborn care',
        'Vaccinations',
      ],
      keyFeatures: [
        'Covers maternity and child care',
        'Cashless facility',
        'No claim bonus',
      ],
      terminologies: [
        'Waiting Period',
        'Cashless Facility',
      ],
      claimProcess: [
        'Intimate insurer',
        'Submit bills',
        'Claim processed',
      ],
    },
  },
  {
    id: 'personal-accident',
    name: 'Personal Accident Protection Insurance',
    tabs: {
      overview: 'Provides financial support in case of accidental death or disability.',
      coverages: [
        'Accidental death',
        'Permanent disability',
        'Temporary disability',
      ],
      keyFeatures: [
        'Worldwide coverage',
        'Covers all types of accidents',
        'Quick claim settlement',
      ],
      terminologies: [
        'Permanent Disability',
        'Sum Insured',
      ],
      claimProcess: [
        'Accident report',
        'Submit claim form',
        'Claim processed',
      ],
    },
  },
];
