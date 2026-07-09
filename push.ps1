# push.ps1 -- commit y push en un solo comando
# uso: .\push.ps1 "mensaje del commit"
#   ej: .\push.ps1 "fix: colores del titlebar"
# si no pasas mensaje, usa un default con fecha

param([string]$msg = "update $(Get-Date -Format 'yyyy-MM-dd HH:mm')")

Set-Location $PSScriptRoot

git add -A

# solo commitea si hay cambios
$changes = git status --porcelain
if ([string]::IsNullOrWhiteSpace($changes)) {
  Write-Host "nada para commitear" -ForegroundColor Yellow
} else {
  git commit -m $msg
  git push
  Write-Host "-> pusheado: $msg" -ForegroundColor Green
}
