# Catalog
[DEMO LINK](https://kshvetsova.github.io/catalog-typescript/)

Implemented Products catalog following [this design](https://www.figma.com/file/uEetgWenSRxk9jgiym6Yzp/Phone-catalog-redesign?node-id=1%3A2).
The design 1440px, adaptive for: 
- Notebook 1280px
- Tablet 768px
- Mobile (> 320px)

## Description

### App
1. Added a `Header` with links to all the pages
    - The `Logo` and the `Nav` are aligned left
    - The `Favorites` and the `Cart` are aligned right
1. Used `NavLink`s to highlight current page in `Header`
1. Added `Footer`
    - Footer content is limited the same width as the page content
    - Added the link to the Github repo
    - Implemented `Back to top` button

### Home page
1. Created `HomePage` available at `/` with just a title `Home page`
1. Created `ProductsSlider` component and used it in `Hot prices` block
    - Created `ProductCard` component to used it everywhere
    - Added ability to used `<` and `>` buttons to scroll products
1. Added `Brand new` block using `ProductsSlider`
1. Added `Shop by category` block with the links to `/phones`, `/tablets` and `/watches`.
1. Replaced the `Home page` title with slider
    - User can change pictures with buttons infinitely
    - Swipe pictures every 5 seconds

### Phones page
1. Created `PhonesPage` available at `/phones` with just a title `Mobile phones`
1. Added `ProductsList` showing all the `phones`
1. Added ability to sort the products by `model` (`Newest`), `name` (`Alphabetically`) and `price` (`Cheapest`)
    - Saved sort order in the URL `?sort=age` and applied it after the page reload
1. Added `Pagination` and `Items on page` with `4`, `8`, `16` and `All items` options.
    - Saved `?page=2&perPage=8` in the URL and applied them after the page reload

## Tablets and watches
1. Created `TabletsPage` page available at `/tablets` working the same way as `PhonesPage`
1. Created `WatchesPage` page available at `/watches` working the same way as `PhonesPage`

### Product details page
1. Created `ProductDetailsPage` available at `/product/:productId`
    - `ProductCard` is a link to the details page
1. Fetch phone details from API taking the `phoneId` from the URL
    - Use `Loader` when fetching the details
1. Showed the details on the page
    - `Available colors` and `Select capacity`
    - `About` section contain description
    - `Tech specs`
1. Added ability to choose a picture
1. Added `Back` working the same way as a Browser `Back` button
1. Added `Breadcrumbs` at the top

### Cart
1. Implemented `CartPage`
1. `Add to cart` button in `ProductCart` add a product to the `Cart`
1. If the product is already in the `Cart` the button say `Added to cart`
1. Added ability to remove items from the `Cart` with a `x` button
1. Added ability to change the quantity in the `Cart` with `-` and `+` buttons around the quantity
1. Total amount and quantity calculated automatically
1. Showed the total quantity near the `Cart` icon in the header
1. Saved the `Cart` to the `localSotrage`

### Favorites
1. Created `FavoritesPage` it show the `ProductsList` with all the favorite products
1. Added ability to add/remove favorite products by pressing a hart
1. Showed the favorites count near the `Favorites` icon in the header

### Search
1. Added a `Search` component with an input into the `Header` to filter products
1. Added `debounce` to the search field
1. Saved `Search` params in the URL using `queryParams`

### Tech stack
1. HTML5, Sass/SCSS
1. Flexbox, Grid, BEM
1. JavaScript
1. React, React router, React Hooks
1. localStorage/JSON
1. TypeScript
