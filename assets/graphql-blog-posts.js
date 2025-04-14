// Import the GraphQL client
import { graphqlRequest } from '../src/modules/shared/graphql/client.js';

// Query to fetch blog posts
const BLOG_POSTS_QUERY = `
  query GetBlogPosts {
    blogPosts(first: 3, orderBy: publishedAt_DESC) {
      id
      title
      excerpt
      slug
      publishedAt
      coverImage {
        url
      }
      categories {
        name
      }
      author {
        name
        picture {
          url
        }
        title
      }
    }
  }
`;

// Function to format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Fetch blog posts and render them
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const blogPostsContainer = document.getElementById('blog-posts-container');
    if (!blogPostsContainer) return;

    // Show loading state
    blogPostsContainer.innerHTML = '<div class="text-center py-8">Loading blog posts...</div>';
    
    // Fetch data from GraphQL
    const response = await graphqlRequest(BLOG_POSTS_QUERY);
    const posts = response.data.blogPosts;
    
    if (!posts || posts.length === 0) {
      blogPostsContainer.innerHTML = '<div class="text-center py-8">No blog posts found</div>';
      return;
    }
    
    // Clear loading state
    blogPostsContainer.innerHTML = '';
    
    // Render each post
    posts.forEach(post => {
      const postElement = document.createElement('article');
      postElement.className = 'flex flex-col items-start justify-between';
      
      const categoryName = post.categories && post.categories.length > 0 
        ? post.categories[0].name 
        : 'Uncategorized';
      
      postElement.innerHTML = `
        <div class="relative w-full">
          <img src="${post.coverImage?.url || 'https://placehold.co/600x400?text=No+Image'}" 
            alt="${post.title}" 
            class="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]">
          <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
        </div>
        <div class="max-w-xl">
          <div class="mt-8 flex items-center gap-x-4 text-xs">
            <time datetime="${post.publishedAt}" class="text-gray-500">${formatDate(post.publishedAt)}</time>
            <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">${categoryName}</a>
          </div>
          <div class="group relative">
            <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
              <a href="/hc/articles/${post.slug}">
                <span class="absolute inset-0"></span>
                ${post.title}
              </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">${post.excerpt}</p>
          </div>
          ${post.author ? `
          <div class="relative mt-8 flex items-center gap-x-4">
            <img src="${post.author.picture?.url || 'https://placehold.co/100x100?text=A'}" 
              alt="${post.author.name}" 
              class="size-10 rounded-full bg-gray-100">
            <div class="text-sm/6">
              <p class="font-semibold text-gray-900">
                <a href="#">
                  <span class="absolute inset-0"></span>
                  ${post.author.name}
                </a>
              </p>
              <p class="text-gray-600">${post.author.title || ''}</p>
            </div>
          </div>
          ` : ''}
        </div>
      `;
      
      blogPostsContainer.appendChild(postElement);
    });
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    const blogPostsContainer = document.getElementById('blog-posts-container');
    if (blogPostsContainer) {
      blogPostsContainer.innerHTML = '<div class="text-center py-8">Error loading blog posts</div>';
    }
  }
}); 