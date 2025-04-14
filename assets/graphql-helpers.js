/**
 * Server-side Handlebars helpers for GraphQL integration
 * 
 * Note: This file demonstrates how to create Handlebars helpers that could
 * be registered with the Zendesk Theme if server-side GraphQL integration is available.
 * 
 * This approach would require:
 * 1. Zendesk to allow custom Handlebars helpers in themes
 * 2. Server-side GraphQL fetching support
 * 
 * Since these features may not be available, the client-side approach using JavaScript
 * is the recommended implementation.
 */

// Example of how server-side graphql helpers could work if supported
export function registerGraphQLHelpers(Handlebars) {
  /**
   * {{#graphql_query 'queryName' arg1=value1 arg2=value2}}
   *   {{#each data.items}}
   *     <li>{{this.name}}</li>
   *   {{/each}}
   * {{/graphql_query}}
   */
  Handlebars.registerHelper('graphql_query', function(queryName, options) {
    // In a real implementation, this would execute the GraphQL query server-side
    // and provide the data to the template
    
    // Example queries that could be predefined:
    const queries = {
      navigationMenu: `
        query GetNavigationMenu($id: ID!) {
          navigationMenu(where: { id: $id }) {
            id
            beautyItems {
              id
              name
              link
              description
            }
            fitnessItems {
              id
              name
              link
              description
            }
            wellnessItems {
              id
              name
              link
              description
            }
            featureItems {
              id
              featureMenuItemType
              name
              link
              description
              flagAsNew
              flagAsBeta
            }
          }
        }
      `
    };
    
    // Extract variables from the options hash
    const variables = {};
    for (const key in options.hash) {
      variables[key] = options.hash[key];
    }
    
    // In a real implementation, this would actually fetch data
    // For demonstration purposes, return mock data
    const mockData = getMockDataForQuery(queryName, variables);
    
    // Pass the data to the block
    return options.fn(mockData);
  });
}

// Mock data for demonstration purposes
function getMockDataForQuery(queryName, variables) {
  if (queryName === 'navigationMenu') {
    return {
      data: {
        navigationMenu: {
          id: "mock-id",
          beautyItems: [
            { id: "b1", name: "Skincare", link: "/skincare", description: "Facial treatments" },
            { id: "b2", name: "Makeup", link: "/makeup", description: "Cosmetics" }
          ],
          fitnessItems: [
            { id: "f1", name: "Cardio", link: "/cardio", description: "Running and cycling" },
            { id: "f2", name: "Strength", link: "/strength", description: "Weight training" }
          ],
          wellnessItems: [
            { id: "w1", name: "Meditation", link: "/meditation", description: "Mental wellness" },
            { id: "w2", name: "Nutrition", link: "/nutrition", description: "Healthy eating" }
          ],
          featureItems: [
            { 
              id: "ft1", 
              name: "New Program", 
              link: "/new-program", 
              description: "Our latest offering",
              featureMenuItemType: "SPECIAL",
              flagAsNew: true,
              flagAsBeta: false
            }
          ]
        }
      }
    };
  }
  
  return { data: null };
} 