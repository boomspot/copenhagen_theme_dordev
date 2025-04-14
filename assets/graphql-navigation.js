// Import the GraphQL client
import { graphqlRequest } from '../src/modules/shared/graphql/client.js';

// Alternative query with variables
const ALTERNATIVE_QUERY = `
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
`;

// Query to fetch navigation menu items - using exact format from client.js
const NAV_MENU_QUERY = `
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

// Fetch navigation menu and render it
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const navBeautyContainer = document.getElementById('nav-beauty-items');
    const navFitnessContainer = document.getElementById('nav-fitness-items');
    const navWellnessContainer = document.getElementById('nav-wellness-items');
    const navFeaturesContainer = document.getElementById('nav-feature-items');
    
    // Check if at least one container exists
    if (!navBeautyContainer && !navFitnessContainer && !navWellnessContainer && !navFeaturesContainer) {
      console.log('No navigation containers found on page, skipping navigation menu rendering');
      return;
    }
    
    // Show loading state in all containers
    const setLoadingState = (container) => {
      if (container) container.innerHTML = '<div class="text-center py-2">Loading...</div>';
    };
    
    setLoadingState(navBeautyContainer);
    setLoadingState(navFitnessContainer);
    setLoadingState(navWellnessContainer);
    setLoadingState(navFeaturesContainer);
    
    console.log('Fetching navigation menu data...');
    
    // Try both query approaches
    let response;
    try {
      console.log('Trying the inline query first...');
      // Fetch data from GraphQL using the exact query
      response = await graphqlRequest(NAV_MENU_QUERY);
      console.log('Inline query response:', response);
    } catch (err) {
      console.error('Inline query failed:', err);
      console.log('Trying alternative query with variables...');
      // Try the alternative query with variables
      response = await graphqlRequest(ALTERNATIVE_QUERY, { id: "clezyiora1akc0an0g68whmx0" });
      console.log('Alternative query response:', response);
    }
    
    console.log('Navigation menu response:', response);
    
    if (!response || !response.data) {
      throw new Error('Invalid GraphQL response structure');
    }
    
    const menuData = response.data;
    if (!menuData.navigationMenu) {
      console.error('Navigation menu not found in GraphQL response:', menuData);
      const setErrorState = (container) => {
        if (container) container.innerHTML = '<div class="text-center py-2">Menu not found</div>';
      };
      
      setErrorState(navBeautyContainer);
      setErrorState(navFitnessContainer);
      setErrorState(navWellnessContainer);
      setErrorState(navFeaturesContainer);
      return;
    }
    
    const menu = menuData.navigationMenu;
    console.log('Full menu data:', menu);
    
    // Render beauty items
    if (navBeautyContainer) {
      if (menu.beautyItems && menu.beautyItems.length > 0) {
        console.log(`Rendering ${menu.beautyItems.length} beauty items:`, menu.beautyItems);
        navBeautyContainer.innerHTML = '';
        renderMenuItems(menu.beautyItems, navBeautyContainer);
      } else {
        navBeautyContainer.innerHTML = '<div class="text-center py-2">No beauty items found</div>';
      }
    }
    
    // Render fitness items
    if (navFitnessContainer) {
      if (menu.fitnessItems && menu.fitnessItems.length > 0) {
        console.log(`Rendering ${menu.fitnessItems.length} fitness items:`, menu.fitnessItems);
        navFitnessContainer.innerHTML = '';
        renderMenuItems(menu.fitnessItems, navFitnessContainer);
      } else {
        navFitnessContainer.innerHTML = '<div class="text-center py-2">No fitness items found</div>';
      }
    }
    
    // Render wellness items
    if (navWellnessContainer) {
      if (menu.wellnessItems && menu.wellnessItems.length > 0) {
        console.log(`Rendering ${menu.wellnessItems.length} wellness items:`, menu.wellnessItems);
        navWellnessContainer.innerHTML = '';
        renderMenuItems(menu.wellnessItems, navWellnessContainer);
      } else {
        navWellnessContainer.innerHTML = '<div class="text-center py-2">No wellness items found</div>';
      }
    }
    
    // Render feature items
    if (navFeaturesContainer) {
      if (menu.featureItems && menu.featureItems.length > 0) {
        console.log(`Rendering ${menu.featureItems.length} feature items:`, menu.featureItems);
        navFeaturesContainer.innerHTML = '';
        renderFeatureItems(menu.featureItems, navFeaturesContainer);
      } else {
        navFeaturesContainer.innerHTML = '<div class="text-center py-2">No feature items found</div>';
      }
    }
    
    console.log('Navigation menu rendered successfully');
    
  } catch (error) {
    console.error('Error fetching navigation menu:', error);
    const setErrorState = (container) => {
      if (container) container.innerHTML = `<div class="text-center py-2">Error loading menu items: ${error.message}</div>`;
    };
    
    setErrorState(document.getElementById('nav-beauty-items'));
    setErrorState(document.getElementById('nav-fitness-items'));
    setErrorState(document.getElementById('nav-wellness-items'));
    setErrorState(document.getElementById('nav-feature-items'));
  }
});

// Helper function to render standard menu items
function renderMenuItems(items, container) {
  if (!items || items.length === 0) {
    container.innerHTML = '<div class="text-center py-2">No items available</div>';
    return;
  }
  
  items.forEach(item => {
    if (!item || !item.name) {
      console.warn('Skipping invalid menu item:', item);
      return;
    }
    
    const li = document.createElement('li');
    li.className = 'group';
    li.innerHTML = `
      <a href="${item.link || '#'}" class="block p-3 rounded-md hover:bg-gray-50 transition-colors duration-200">
        <div class="font-medium text-gray-900 group-hover:text-blue-600">${item.name}</div>
        ${item.description ? `<div class="mt-1 text-sm text-gray-500">${item.description}</div>` : ''}
      </a>
    `;
    container.appendChild(li);
  });
}

// Helper function to render feature items with badges
function renderFeatureItems(items, container) {
  if (!items || items.length === 0) {
    container.innerHTML = '<div class="text-center py-2">No feature items available</div>';
    return;
  }
  
  items.forEach(item => {
    if (!item || !item.name) {
      console.warn('Skipping invalid feature item:', item);
      return;
    }
    
    const li = document.createElement('li');
    li.className = 'group';
    
    // Create badges for flagAsNew and flagAsBeta
    const badges = [];
    if (item.flagAsNew) {
      badges.push('<span class="ml-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">New</span>');
    }
    if (item.flagAsBeta) {
      badges.push('<span class="ml-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Beta</span>');
    }
    
    const menuItemType = item.featureMenuItemType ? `<span class="text-xs text-gray-500 ml-1">[${item.featureMenuItemType}]</span>` : '';
    
    li.innerHTML = `
      <a href="${item.link || '#'}" class="block p-3 rounded-md hover:bg-gray-50 transition-colors duration-200">
        <div class="font-medium text-gray-900 group-hover:text-blue-600">
          ${item.name}${menuItemType}
          ${badges.join('')}
        </div>
        ${item.description ? `<div class="mt-1 text-sm text-gray-500 bg-red-500">${item.description}</div>` : ''}
      </a>
    `;
    container.appendChild(li);
  });
} 