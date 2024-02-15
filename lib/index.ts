import womenPreview from '@previews/women-preview.jpeg';
import menPreview from '@previews/men-preview.jpg';
import kidsPreview from '@previews/kids-preview.jpg';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const navOptions = [
  {
    id: 'women',
    label: 'WOMEN',
    path: '/women',
    image: womenPreview,
    imageWidth: 220,
    imageHeight: 250,
    clothing: ['Dresses', 'Skirts', 'Tops', 'Trousers'],
    shoes: ['Slippers', 'Sandals', 'Heels', 'Sneakers'],
  },
  {
    id: 'men',
    label: 'MEN',
    path: '/men',
    image: menPreview,
    imageWidth: 220,
    imageHeight: 290,
    clothing: ['Jeans', 'Chinos', 'Shirts', 'Shorts', 'Underwear'],
    shoes: ['Loafers', 'Sneakers', 'Sandals', 'Slippers'],
  },
  {
    id: 'kids',
    label: 'KIDS',
    path: '/kids',
    image: kidsPreview,
    imageWidth: 200,
    imageHeight: 250,
    clothing: ['Gowns', 'Skirts', 'Tops', 'Jeans'],
    shoes: ['Slippers', 'Sandals', 'Sneakers'],
  },
];

export const adminNavOptions = [
  {
    id: 'adminListing',
    label: 'Manage All products',
    path: '/admin-view/all-product',
  },
  {
    id: 'adminNewProduct',
    label: 'Add New Product',
    path: '/admin-view/add-product',
  },
];

export const styles = {
  button:
    'mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white',
};
