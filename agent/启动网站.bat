@echo off
chcp 65001 >nul
cd /d "%~dp0"
set PORT=8777
set LANIP=
title Portfolio 本地预览 - 端口 %PORT%

rem 端口已在跑：不重复启动，直接打开页面
netstat -ano | findstr /r /c:":%PORT% .*LISTENING" >nul 2>nul
if %errorlevel%==0 (
  echo 端口 %PORT% 已有服务在运行，直接打开页面……
  start "" "http://127.0.0.1:%PORT%/"
  pause
  exit /b
)

rem 取本机内网 IPv4（排除回环与 169.254 自动地址）
for /f "usebackq delims=" %%a in (`powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 ^| Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' } ^| Select-Object -First 1).IPAddress"`) do set LANIP=%%a

rem 尝试放行入站端口（非管理员会静默失败，不影响本机访问）
netsh advfirewall firewall add rule name="Portfolio LAN %PORT%" dir=in action=allow protocol=TCP localport=%PORT% >nul 2>nul

echo ==========================================
echo   电脑浏览器打开： http://127.0.0.1:%PORT%/
if defined LANIP echo   手机浏览器打开： http://%LANIP%:%PORT%/
if not defined LANIP echo   手机浏览器打开： 没取到内网 IP，请先连上 Wi-Fi
echo   注意：必须带 :%PORT% 端口号，只输 127.0.0.1 会报“拒绝连接”
echo   停止服务：在本窗口按 Ctrl+C
echo ==========================================
if defined LANIP ( echo http://%LANIP%:%PORT%/| clip ) else ( echo http://127.0.0.1:%PORT%/| clip )

rem 等服务就绪再开浏览器，避免“连接被拒绝”
start "" /b cmd /c "timeout /t 1 >nul & start "" http://127.0.0.1:%PORT%/"

where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server %PORT% --bind 0.0.0.0
) else (
  py -m http.server %PORT% --bind 0.0.0.0
)
pause
