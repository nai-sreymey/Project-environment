# Step 1: Use official Nginx image
FROM nginx:alpine

# Step 2: Remove the default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Step 3: Copy React build to Nginx public folder
COPY dist /usr/share/nginx/html

# Step 4: Copy custom Nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 5: Expose port 80
EXPOSE 80

# Step 6: Start Nginx
CMD ["nginx", "-g", "daemon off;"]


