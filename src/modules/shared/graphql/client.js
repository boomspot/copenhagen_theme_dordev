/**
 * GraphQL client for Zendesk Copenhagen theme
 *
 * A lightweight GraphQL client that uses fetch API to query GraphQL endpoints
 */

/**
 * Fetch a CSRF token from Zendesk's API
 *
 * @returns {Promise<string>} The CSRF token
 */

/**
 * Make a GraphQL request to a Hygraph endpoint
 *
 * @param {string} query - The GraphQL query or mutation
 * @param {Object} [variables={}] - Variables for the GraphQL operation
 * @param {string} [endpoint='https://us-west-2.cdn.hygraph.com/content/cld3gw4bb0hr001ue9afzcunb/master'] - The GraphQL endpoint URL
 * @returns {Promise<Object>} The GraphQL response
 */
export async function graphqlRequest(
  query,
  variables = {},
  endpoint = "https://us-west-2.cdn.hygraph.com/content/cld3gw4bb0hr001ue9afzcunb/master"
) {
  try {
    // Hygraph doesn't require CSRF token, using direct fetch
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `GraphQL request failed: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
}

/**
 * Query the navigation menu from the GraphQL API
 *
 * @returns {Promise<Object>} The navigation menu data
 */
export async function queryNavigationMenu() {
  const query = `
    query GetStaticNavItems {
      navigationMenu(where: { id: "clezyiora1akc0an0g68whmx0" }) {
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
  `;

  try {
    // Cache the response to avoid repeated network requests
    if (!window.navigationMenuCache) {
      console.log("Fetching navigation menu data...");
      const response = await graphqlRequest(query);
      // Validate response to ensure it's properly structured
      if (!response || !response.data || !response.data.navigationMenu) {
        console.warn("Response structure is not as expected");
      }
      window.navigationMenuCache = response;
    } else {
      console.log("Using cached navigation menu data");
    }
    return window.navigationMenuCache;
  } catch (error) {
    console.error("Error fetching navigation menu:", error);
    throw error;
  }
}
