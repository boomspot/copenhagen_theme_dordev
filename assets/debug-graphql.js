// This file is for debugging the GraphQL query directly in browser console
// Simple script to test GraphQL queries directly

async function testGraphQLQuery() {
  const token = await fetch(
    "https://us-west-2.cdn.hygraph.com/content/cld3gw4bb0hr001ue9afzcunb/master"
  )
    .then((response) => response.json())
    .then((data) => data.csrf_token);

  console.log("Got token:", token ? "yes" : "no");

  const query = `
    query GetStaticNavItems {
      navigationMenu(
        where: { id: "clezyiora1akc0an0g68whmx0" }
      ) {
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

  console.log("Sending GraphQL query...");
  
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": token,
    },
    body: JSON.stringify({ query }),
  }).then((res) => res.json());

  console.log("GraphQL Response:", response);

  if (response.data && response.data.navigationMenu) {
    console.log("Beauty Items:", response.data.navigationMenu.beautyItems);
    console.log("Fitness Items:", response.data.navigationMenu.fitnessItems);
    console.log("Wellness Items:", response.data.navigationMenu.wellnessItems);
    console.log("Feature Items:", response.data.navigationMenu.featureItems);
  } else {
    console.error("No navigation menu data found!");
  }
}

// Run the test
console.log("Testing GraphQL query...");
testGraphQLQuery().catch(error => {
  console.error("Error testing GraphQL query:", error);
});

// Add a button to the page for manual testing
document.addEventListener('DOMContentLoaded', () => {
  const button = document.createElement('button');
  button.textContent = 'Test GraphQL Query';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '9999';
  button.style.padding = '10px 20px';
  button.style.backgroundColor = '#4F46E5';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  
  button.addEventListener('click', () => {
    console.clear();
    testGraphQLQuery().catch(error => {
      console.error("Error testing GraphQL query:", error);
    });
  });
  
  document.body.appendChild(button);
}); 