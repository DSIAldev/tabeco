# Mode secours file:// : convertit data/*.csv en data/data.js (window.DATA_AGENCE = {...}).
# PowerShell 7. Utilisable en fin de runbook après l'écriture des CSV.
param([string]$Dossier = (Join-Path $PSScriptRoot 'data'))
$noms = 'dim_domaine','dim_indicateur','dim_modalite','fait_valeur'
$data = [ordered]@{}
foreach ($n in $noms) {
    $f = Join-Path $Dossier "$n.csv"
    if (-not (Test-Path $f)) { throw "Fichier manquant : $f" }
    $data[$n] = (Get-Content -Path $f -Raw -Encoding utf8).TrimStart([char]0xFEFF)
}
$js = "// Généré par build_data.ps1 — ne pas modifier à la main`nwindow.DATA_AGENCE = " + ($data | ConvertTo-Json -Compress -Depth 3) + ";`n"
Set-Content -Path (Join-Path $Dossier 'data.js') -Value $js -Encoding utf8NoBOM
Write-Output "data/data.js généré ($((Get-Item (Join-Path $Dossier 'data.js')).Length) octets)"
