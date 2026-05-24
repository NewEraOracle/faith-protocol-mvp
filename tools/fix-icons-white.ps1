Add-Type -AssemblyName System.Drawing

$targets = @(
  "frontend\public\faith\design\icon-vaults.png",
  "frontend\public\faith\design\icon-pcs.png",
  "frontend\public\faith\design\icon-treasury.png"
)

function Remove-LightBackground {
  param([string]$Path)

  if (!(Test-Path $Path)) {
    Write-Host "Missing: $Path"
    return
  }

  $fullPath = (Resolve-Path $Path).Path
  $backupPath = "$fullPath.bak"

  if (!(Test-Path $backupPath)) {
    Copy-Item $fullPath $backupPath -Force
  }

  $src = [System.Drawing.Bitmap]::FromFile($fullPath)
  $bmp = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.DrawImage($src, 0, 0, $src.Width, $src.Height)

  for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
      $c = $bmp.GetPixel($x, $y)

      $avg = [int](($c.R + $c.G + $c.B) / 3)
      $grayish = ([Math]::Abs($c.R - $c.G) -lt 20) -and ([Math]::Abs($c.G - $c.B) -lt 20) -and ([Math]::Abs($c.R - $c.B) -lt 20)

      # Pure / almost white background -> fully transparent
      if ($avg -ge 238 -and $grayish) {
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $c.R, $c.G, $c.B))
      }
      # Soft light edge -> semi transparent for cleaner anti-alias
      elseif ($avg -ge 220 -and $grayish) {
        $alpha = [Math]::Max(0, 255 - (($avg - 220) * 7))
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb([int]$alpha, $c.R, $c.G, $c.B))
      }
    }
  }

  $g.Dispose()
  $src.Dispose()

  $bmp.Save($fullPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()

  Write-Host "Cleaned: $Path"
}

foreach ($file in $targets) {
  Remove-LightBackground -Path $file
}
