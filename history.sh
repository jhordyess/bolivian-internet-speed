# Commands history

# Create devcontainer directory and devcontainer.json file
mkdir -p .devcontainer && touch .devcontainer/devcontainer.json

# Start a new project with Vanilla TS template
yarn create vite --template vanilla-ts bolivian-internet-speed-lp

# Move those files to the root directory including .gitignore
mv bolivian-internet-speed-lp/* bolivian-internet-speed-lp/.gitignore . && rm -rf bolivian-internet-speed-lp
touch vite.config.js

# Initialize yarn and install dependencies
yarn init -y && yarn

# Install prettier with tailwindcss plugin
yarn add -D prettier prettier-plugin-tailwindcss
touch .prettierrc.json

# Install eslint and initialize it
yarn add -D eslint && yarn eslint --init

# Install tailwindcss, postcss and autoprefixer
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init && touch postcss.config.js

# Install husky and add a pre-commit hook for linting
yarn add -D husky && yarn husky install
yarn husky add .husky/pre-commit "yarn lint"

# Install gh-pages
yarn add -D gh-pages