# Affiliate Hub

## Current State
The app is a fashion & home decor affiliate product listing site. The backend has a Product type with fields: id, name, description, imageUrl, price, category, affiliateLink, featured. It exposes getAllProducts, getProductsByCategory, getFeaturedProducts, and seed. There is no admin panel and no way to add/edit/delete products without code changes.

## Requested Changes (Diff)

### Add
- Admin panel page at /admin route (password-protected via authorization component)
- Admin can add new products (name, description, price, category, affiliateLink, imageUrl, featured toggle)
- Admin can edit existing products
- Admin can delete products
- Admin can toggle featured status of products
- Backend: addProduct, updateProduct, deleteProduct admin functions
- Navigation link to Admin in navbar (or separate admin login page)

### Modify
- Backend: add addProduct, updateProduct, deleteProduct functions (admin-only)
- Frontend: Add admin route/page with product management table
- Remove auto-seeding on every load; only seed if no products exist

### Remove
- Nothing removed from public-facing site

## Implementation Plan
1. Select authorization component for admin login
2. Regenerate backend with addProduct, updateProduct, deleteProduct, and getProductCount functions
3. Build AdminPage component with product list table, add/edit form dialog, delete confirmation
4. Add /admin route to App.tsx with auth guard
5. Update seeding logic: only seed if product count is 0
