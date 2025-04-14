/**
 * Dynamic Navigation using GraphQL
 * For Zendesk Copenhagen theme
 */

import { queryNavigationMenu } from './client';
import { fallbackNavigationData } from './fallback';

/**
 * Renders a navigation menu from GraphQL data
 */
export async function renderDynamicNav() {
  try {
    // Get the navigation container element
    const navContainer = document.querySelector('.user-nav-list');
    
    if (!navContainer) {
      console.error('Navigation container not found');
      return;
    }
    
    // Save existing navigation items as fallback
    const existingNavItems = Array.from(navContainer.querySelectorAll('li:not(.dynamic-nav-item)'));
    
    // Skip manipulation if we can't find the nav container
    if (!navContainer || !navContainer.parentElement) {
      console.warn('Cannot find proper navigation container');
      return;
    }
    
    // Clear existing dynamic nav items
    const existingDynamicItems = navContainer.querySelectorAll('.dynamic-nav-item');
    existingDynamicItems.forEach(item => item.remove());
    
    // Query the navigation menu
    let data;
    try {
      data = await queryNavigationMenu();
      
      // Check for valid response structure
      if (!data || !data.data || !data.data.navigationMenu) {
        console.warn('Using fallback navigation data');
        data = fallbackNavigationData;
      }
    } catch (error) {
      console.warn('GraphQL request failed, using fallback navigation data', error);
      data = fallbackNavigationData;
    }
    
    // Extract navigation items from Hygraph's schema
    const menu = data.data.navigationMenu;
    const categories = [
      { items: menu.beautyItems || [], label: 'Beauty' },
      { items: menu.fitnessItems || [], label: 'Fitness' },
      { items: menu.wellnessItems || [], label: 'Wellness' }
    ];
    
    // Render the navigation categories
    categories.forEach(category => {
      if (category.items.length === 0) return;
      
      // Create list item for category
      const li = document.createElement('li');
      li.className = 'dynamic-nav-item';
      
      // Avoid restricted identifiers by adding a safe prefix to any generated IDs
      const safeId = `nav_${Math.random().toString(36).substring(2, 9)}`;
      li.id = safeId;
      
      // Create dropdown for category
      const dropdown = document.createElement('div');
      dropdown.className = 'dropdown';
      
      // Create dropdown toggle with safe ID
      const toggleId = `toggle_${Math.random().toString(36).substring(2, 9)}`;
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'dropdown-toggle';
      toggleBtn.id = toggleId;
      toggleBtn.setAttribute('aria-haspopup', 'true');
      toggleBtn.innerHTML = `
        ${category.label}
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" focusable="false" viewBox="0 0 12 12" class="dropdown-chevron-icon" aria-hidden="true">
          <path fill="none" stroke="currentColor" stroke-linecap="round" d="M3 4.5l2.6 2.6c.2.2.5.2.7 0L9 4.5"/>
        </svg>
      `;
      
      // Create dropdown menu with safe ID
      const menuId = `menu_${Math.random().toString(36).substring(2, 9)}`;
      const dropdownMenu = document.createElement('div');
      dropdownMenu.className = 'dropdown-menu';
      dropdownMenu.id = menuId;
      dropdownMenu.setAttribute('role', 'menu');
      
      // Add child items to dropdown menu
      category.items.forEach((item, idx) => {
        const linkId = `link_${Math.random().toString(36).substring(2, 9)}_${idx}`;
        const childLink = document.createElement('a');
        childLink.href = item.link;
        childLink.id = linkId;
        childLink.textContent = item.name;
        childLink.setAttribute('role', 'menuitem');
        childLink.title = item.description || '';
        dropdownMenu.appendChild(childLink);
      });
      
      // Assemble dropdown
      dropdown.appendChild(toggleBtn);
      dropdown.appendChild(dropdownMenu);
      li.appendChild(dropdown);
      
      // Initialize dropdown using the existing Dropdown constructor from script.js
      if (window.Dropdown) {
        new window.Dropdown(toggleBtn, dropdownMenu);
      }
      
      // Add to navigation container
      navContainer.appendChild(li);
    });
    
    // Handle feature items separately - these are standalone links
    if (menu.featureItems && menu.featureItems.length > 0) {
      menu.featureItems.forEach(item => {
        // Create list item
        const li = document.createElement('li');
        li.className = 'dynamic-nav-item feature-item';
        
        // Avoid restricted identifiers by adding a safe prefix to any generated IDs
        const safeId = `feature_${Math.random().toString(36).substring(2, 9)}`;
        li.id = safeId;
        
        // Simple link with no children, using safe ID
        const linkId = `feature_link_${Math.random().toString(36).substring(2, 9)}`;
        const a = document.createElement('a');
        a.href = item.link;
        a.id = linkId;
        a.textContent = item.name;
        
        // Add "new" or "beta" badge if flagged, with safe ID
        if (item.flagAsNew || item.flagAsBeta) {
          const badgeId = `badge_${Math.random().toString(36).substring(2, 9)}`;
          const badge = document.createElement('span');
          badge.id = badgeId;
          badge.className = item.flagAsNew ? 'badge-new' : 'badge-beta';
          badge.textContent = item.flagAsNew ? 'New' : 'Beta';
          a.appendChild(document.createTextNode(' '));
          a.appendChild(badge);
        }
        
        li.appendChild(a);
        navContainer.appendChild(li);
      });
    }
  } catch (error) {
    console.error('Error rendering dynamic navigation:', error);
  }
}

// Make Dropdown constructor available globally
window.addEventListener('DOMContentLoaded', () => {
  // Wait for the script.js to load the Dropdown constructor
  setTimeout(() => {
    renderDynamicNav();
  }, 100);
});