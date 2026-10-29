@echo off
chcp 65001 >nul
rem 需要管理员权限：放行 8777 端口的入站访问（手机才能连上电脑的预览服务）
net session >nul 2>nul
if %errorlevel% neq 0 (
  echo 正在请求管理员权限……
  powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)
netsh advfirewall firewall delete rule name="Portfolio LAN 8777" >nul 2>nul
netsh advfirewall firewall add rule name="Portfolio LAN 8777" dir=in action=allow protocol=TCP localport=8777
echo.
echo 已放行本机 8777 端口。现在手机连同一个 Wi-Fi，访问 http://内网IP:8777/
pause
