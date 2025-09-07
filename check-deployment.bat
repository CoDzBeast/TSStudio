@echo off
echo Checking TSStudio deployment status...
echo.

echo 1. Please visit these URLs to check if your site is working:
echo    - Root URL: https://codzbeast.github.io/
echo    - Direct URL: https://codzbeast.github.io/TSStudio/
echo    - Test page: https://codzbeast.github.io/TSStudio/test-deploy.html
echo.

echo 2. If the site is still not loading correctly, please check:
echo    - GitHub Repository Settings ^> Pages
echo    - Make sure "Source" is set to "GitHub Actions"
echo    - Check that the workflow completed successfully in the "Actions" tab
echo.

echo 3. Common issues and solutions:
echo    - If you see a 404 error, wait a few more minutes for deployment to complete
echo    - If assets are not loading, check that the base path is set correctly to "/TSStudio/"
echo    - If the page looks broken, verify that all paths use the "/TSStudio/" prefix
echo.

echo Your site should be available at: https://codzbeast.github.io/TSStudio/
echo.
pause