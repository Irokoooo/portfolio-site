@echo off
chcp 65001 >nul
echo.
echo  ================================
echo    正在启动作品集网页...
echo  ================================
echo.
echo  稍等几秒，浏览器会自动打开！
echo  关闭此窗口即可停止服务。
echo.
cd /d "e:\portfolio-site"
start "" "http://localhost:3002"
timeout /t 3 /nobreak >nul
npx next dev --port 3002
pause
