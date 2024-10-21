@echo off
echo Running tests...
npm test

if %errorlevel% equ 0 (
    echo All tests passed successfully!
) else (
    echo Some tests failed. Please check the output above for details.
)

pause
