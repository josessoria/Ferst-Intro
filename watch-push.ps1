# watch-push.ps1 — auto push watcher
#
# uso: abrí PowerShell en la carpeta y correlo con
#      .\watch-push.ps1
#
# Cada 8 segundos revisa si Claude modificó archivos.
# Si hay cambios: git add + commit + push automáticamente.
#
# Dejalo corriendo en una ventana aparte de PowerShell.
# Ctrl+C para detener.

Set-Location $PSScriptRoot

$intervalSeconds = 8

Write-Host ""
Write-Host "  auto-push activo" -ForegroundColor Cyan
Write-Host "  ------------------" -ForegroundColor Cyan
Write-Host "  carpeta: $PSScriptRoot" -ForegroundColor Gray
Write-Host "  intervalo: $intervalSeconds segundos" -ForegroundColor Gray
Write-Host "  Ctrl+C para detener" -ForegroundColor Gray
Write-Host ""

$errCount = 0

while ($true) {
    $status = git status --porcelain 2>$null

    if (-not [string]::IsNullOrWhiteSpace($status)) {
        $lines = ($status -split "`n").Count
        git add -A 2>&1 | Out-Null
        $msg = "auto: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git commit -m $msg 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0) {
            $pushOut = git push 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] -> pushed ($lines archivos)" -ForegroundColor Green
                $errCount = 0
            } else {
                $errCount++
                Write-Host "[$(Get-Date -Format 'HH:mm:ss')] X push fallo:" -ForegroundColor Red
                Write-Host "  $pushOut" -ForegroundColor Red
                if ($errCount -ge 3) {
                    Write-Host ""
                    Write-Host "  3 errores seguidos - pausando 60s..." -ForegroundColor Yellow
                    Start-Sleep -Seconds 60
                    $errCount = 0
                }
            }
        }
    }

    Start-Sleep -Seconds $intervalSeconds
}
