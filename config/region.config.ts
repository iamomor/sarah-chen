export type Region = "US" | "AU" | "CA" | "UK";

export const regionConfigs = {
  US: {
    currency: "USD",
    symbol: "$",
    areaUnit: "sqft",
    areaLabel: "sq ft",
    agentTitle: "REALTOR®",
    listingPlatform: "MLS",
    idxEnabled: true,
    schoolRating: "GreatSchools",
    phoneFormat: "+1 (XXX) XXX-XXXX",
    mortgageTerms: [15, 30],
    defaultInterestRate: 6.8,
    compliance:
      "Licensed by [State] Real Estate Commission. MLS® data provided by [Local Board].",
    fairHousingRequired: true,
    language: "en",
    inspectionLabel: "Schedule Tour",
    
    // Valuation Localization
    postalCodeRegex: "^\\d{5}$",
    postalCodePlaceholder: "e.g. 78746",
    postalCodeLabel: "Zip Code",
    defaultCity: "Austin",
    defaultState: "TX",
    regionName: "Central Texas",
    sqftOptions: ["<1000", "1000-1500", "1500-2000", "2000-2500", "2500-3500", "3500+"],
  },
  AU: {
    currency: "AUD",
    symbol: "A$",
    areaUnit: "sqm",
    areaLabel: "m²",
    agentTitle: "Licensed Real Estate Agent",
    listingPlatform: "REA / Domain",
    idxEnabled: false,
    schoolRating: "MySchool.edu.au",
    phoneFormat: "+61 4XX XXX XXX",
    mortgageTerms: [25, 30],
    defaultInterestRate: 6.2,
    compliance:
      "Licensed under [State] Property, Stock & Business Agents Act. Listings sourced from [Provider].",
    fairHousingRequired: false,
    language: "en-AU",
    inspectionLabel: "Request Inspection",
    
    // Valuation Localization
    postalCodeRegex: "^\\d{4}$",
    postalCodePlaceholder: "e.g. 2000",
    postalCodeLabel: "Postcode",
    defaultCity: "Sydney",
    defaultState: "NSW",
    regionName: "New South Wales",
    sqftOptions: ["<100", "100-150", "150-200", "200-250", "250-350", "350+"],
  },
  CA: {
    currency: "CAD",
    symbol: "C$",
    areaUnit: "sqft",
    areaLabel: "sq ft",
    agentTitle: "REALTOR®",
    listingPlatform: "CREA / MLS®",
    idxEnabled: true,
    schoolRating: "Fraser Institute School Rankings",
    phoneFormat: "+1 (XXX) XXX-XXXX",
    mortgageTerms: [20, 25],
    defaultInterestRate: 5.8,
    compliance:
      "Member of CREA. MLS® data provided under license from [Local Board].",
    fairHousingRequired: true,
    language: "en-CA",
    inspectionLabel: "Schedule Tour",
    
    // Valuation Localization
    postalCodeRegex: "^[A-Z]\\d[A-Z] ?\\d[A-Z]\\d$",
    postalCodePlaceholder: "e.g. M5V 2T6",
    postalCodeLabel: "Postal Code",
    defaultCity: "Toronto",
    defaultState: "ON",
    regionName: "Greater Toronto",
    sqftOptions: ["<1000", "1000-1500", "1500-2000", "2000-2500", "2500-3500", "3500+"],
  },
  UK: {
    currency: "GBP",
    symbol: "£",
    areaUnit: "sqft",
    areaLabel: "sq ft",
    agentTitle: "Estate Agent",
    listingPlatform: "Rightmove / Zoopla",
    idxEnabled: false,
    schoolRating: "Ofsted",
    phoneFormat: "+44 XXXX XXXXXX",
    mortgageTerms: [25, 35],
    defaultInterestRate: 5.2,
    compliance:
      "Member of NAEA Propertymark. Licensed under Estate Agents Act 1979.",
    fairHousingRequired: false,
    language: "en-GB",
    inspectionLabel: "Request Inspection",
    
    // Valuation Localization
    postalCodeRegex: "^[A-Z]{1,2}\\d[A-Z\\d]? ?\\d[A-Z]{2}$",
    postalCodePlaceholder: "e.g. SW1A 1AA",
    postalCodeLabel: "Postcode",
    defaultCity: "London",
    defaultState: "Greater London",
    regionName: "Central London",
    sqftOptions: ["<1000", "1000-1500", "1500-2000", "2000-2500", "2500-3500", "3500+"],
  },
};

// CHANGE THIS ONE VALUE TO SWITCH REGIONS
export const activeRegion: Region = "US";

export const region = regionConfigs[activeRegion];

export type RegionConfig = typeof regionConfigs.US;

