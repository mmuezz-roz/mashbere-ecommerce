Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Projects\mashbere\mashbere e-commerce\public\photos\ChatGPT Image May 12, 2026, 01_31_49 PM.webp"
$targetPath = "c:\Projects\mashbere\mashbere e-commerce\public\photos\ChatGPT Image May 12, 2026, 07_22_45 PM.webp"

$sourceImg = [System.Drawing.Image]::FromFile($sourcePath)
$targetImg = [System.Drawing.Image]::FromFile($targetPath)

Write-Host "Source (01_31_49 PM): $($sourceImg.Width) x $($sourceImg.Height)"
Write-Host "Target (07_22_45 PM): $($targetImg.Width) x $($targetImg.Height)"

$newWidth  = $sourceImg.Width
$newHeight = $sourceImg.Height

$resized = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$graphics = [System.Drawing.Graphics]::FromImage($resized)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($targetImg, 0, 0, $newWidth, $newHeight)

# Save as PNG first, then we'll overwrite the webp
$tempPath = "c:\Projects\mashbere\mashbere e-commerce\public\photos\temp_resized.png"
$resized.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Resized image saved to temp PNG: $tempPath"

$sourceImg.Dispose()
$targetImg.Dispose()
$graphics.Dispose()
$resized.Dispose()
