TSStudio

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with your JotForm API keys:
   ```env
   VITE_JOTFORM_OWNER_API_KEY=your_actual_owner_api_key_here
   VITE_JOTFORM_COWORKER_API_KEY=your_actual_coworker_api_key_here
   ```

3. Replace `your_actual_owner_api_key_here` and `your_actual_coworker_api_key_here` with your real JotForm API keys.

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Keys

To get your JotForm API keys:
1. Log in to your JotForm account
2. Go to Settings > API
3. Copy your API key
4. Paste it in the `.env` file

**Important**: The form will not work properly without valid API keys. Make sure to replace the placeholder values with your actual API keys.

## Stylists Configuration

- **Owner (Taylor)**: 
  - New Client Form ID: 252445285616057
  - Extension Consultation Form ID: 252445322843051

- **Coworker (Shantel)**:
  - New Client Form ID: 240910497358059
  - Extension Consultation Form ID: 243017852134047

## Testing API Keys

To verify your API keys are working:
1. Make sure the development server is running (`npm run dev`)
2. Open the booking form in your browser
3. Select a stylist and appointment type
4. Fill in the form and submit
5. If you see a success message, your API keys are configured correctly

## Deployment

This site is automatically deployed to GitHub Pages. After pushing changes to the `main` branch, the site will be available at https://codzbeast.github.io/TSStudio/