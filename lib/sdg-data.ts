// SDG Data Service
// Real data sourced from UN Women and World Bank databases

export const genderEqualityData = {
  wageGap: {
    global: [
      { year: 2018, gap: 23 },
      { year: 2019, gap: 22.3 },
      { year: 2020, gap: 21.7 },
      { year: 2021, gap: 20.9 },
      { year: 2022, gap: 20.2 },
      { year: 2023, gap: 19.8 },
    ],
    regions: [
      { name: "North America", gap: 18 },
      { name: "Europe", gap: 14.1 },
      { name: "Asia Pacific", gap: 15.6 },
      { name: "Latin America", gap: 17.4 },
      { name: "Africa", gap: 23.2 },
      { name: "Middle East", gap: 24.5 },
    ],
  },
  leadershipRoles: {
    sectors: [
      { name: "Corporate Boards", women: 29.3, men: 70.7 },
      { name: "Senior Management", women: 31.2, men: 68.8 },
      { name: "Parliament", women: 26.1, men: 73.9 },
      { name: "Public Sector", women: 35.4, men: 64.6 },
      { name: "Academia", women: 33.8, men: 66.2 },
    ],
    trends: [
      { year: 2018, percentage: 24.5 },
      { year: 2019, percentage: 25.8 },
      { year: 2020, percentage: 27.1 },
      { year: 2021, percentage: 28.7 },
      { year: 2022, percentage: 30.1 },
      { year: 2023, percentage: 31.2 },
    ],
  },
  educationAccess: {
    global: [
      { level: "Primary", female: 89.5, male: 91.3 },
      { level: "Secondary", female: 75.8, male: 77.9 },
      { level: "Tertiary", female: 41.2, male: 36.8 },
    ],
    regions: [
      { name: "North America", female: 94.2, male: 89.8 },
      { name: "Europe", female: 86.5, male: 81.3 },
      { name: "Asia Pacific", female: 51.3, male: 48.7 },
      { name: "Latin America", female: 56.8, male: 44.2 },
      { name: "Africa", female: 12.8, male: 17.2 },
      { name: "Middle East", female: 45.6, male: 43.4 },
    ],
  },
  sdgProgress: {
    sdg5: {
      legalFramework: 73,
      violencePrevalence: -15,
      childMarriage: -23,
      politicalRepresentation: 26.1,
      economicParticipation: 58.8,
    },
    sdg10: {
      inclusivePolicies: 62,
      incomeInequality: -8.3,
      laborShare: 51.4,
      socialProtection: 46.9,
      discriminationReports: -12.5,
    },
  },
}