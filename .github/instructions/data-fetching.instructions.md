---
description: Read this file to undsertand 
            how to fecth data in the project.
---
# Data fething guidelines
In this project, we use the `fetch` API to retrieve data from external sources in Next.js. The `fetch` API is a modern interface that allows you to make HTTP requests and handle responses in a more flexible and powerful way compared to traditional methods.

## 1. Use server components for data fetching
In Next.js, you can use server components to fetch data on the server side. This allows you to fetch data before rendering the component, improving performance and SEO. To fetch data in a server component, you can use the `fetch` function directly in the component's code. NEVER use `fetch` in client components, as it can lead to performance issues and unnecessary network requests.

## 2. Data Fetching methods

ALAWAYS use the helper functions in 
the /data directory to fetch data.
NEVER fetch data directly in the components. This helps to keep the components clean and focused on rendering, while the data fetching logic is encapsulated in separate functions.

All helper functions in the /data directory should 
use Drizzle ORM for database interactions.