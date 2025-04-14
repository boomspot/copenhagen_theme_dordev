/**
 * Fallback navigation data for when GraphQL requests fail
 * This ensures the site remains functional even if the GraphQL endpoint is unavailable
 */

export const fallbackNavigationData = {
  data: {
    navigationMenu: {
      id: "fallback",
      beautyItems: [
        {
          id: "beauty1",
          name: "Skincare",
          link: "/hc/en-us/categories/skincare",
          description: "All skincare products"
        },
        {
          id: "beauty2",
          name: "Makeup",
          link: "/hc/en-us/categories/makeup",
          description: "Makeup products and tutorials"
        }
      ],
      fitnessItems: [
        {
          id: "fitness1",
          name: "Workouts",
          link: "/hc/en-us/categories/workouts",
          description: "Exercise routines and guides"
        }
      ],
      wellnessItems: [
        {
          id: "wellness1",
          name: "Meditation",
          link: "/hc/en-us/categories/meditation",
          description: "Meditation guides and resources"
        },
        {
          id: "wellness2",
          name: "Nutrition",
          link: "/hc/en-us/categories/nutrition",
          description: "Healthy eating guides"
        }
      ],
      featureItems: [
        {
          id: "feature1",
          featureMenuItemType: "NEW",
          name: "New Collection",
          link: "/hc/en-us/categories/new-collection",
          description: "Our latest product collection",
          flagAsNew: true,
          flagAsBeta: false
        },
        {
          id: "feature2",
          featureMenuItemType: "BETA",
          name: "Beta Program",
          link: "/hc/en-us/categories/beta",
          description: "Join our beta testing program",
          flagAsNew: false,
          flagAsBeta: true
        }
      ]
    }
  }
};