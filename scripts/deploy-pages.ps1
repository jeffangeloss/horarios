$ErrorActionPreference = "Stop"

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$pagesDir = Join-Path (Split-Path $repoRoot -Parent) "HorariosGabyJeff-gh-pages"

Push-Location $repoRoot

try {
  npm.cmd run build

  if (Test-Path $pagesDir) {
    git worktree remove $pagesDir --force 2>$null
    if (Test-Path $pagesDir) {
      Remove-Item -Recurse -Force $pagesDir
    }
  }

  $remoteGhPages = git ls-remote --heads origin gh-pages
  if ($remoteGhPages) {
    git worktree add --track -B gh-pages $pagesDir origin/gh-pages
  }
  else {
    git worktree add -B gh-pages $pagesDir
  }

  try {
    git -C $pagesDir rm -rf . 2>$null | Out-Null
    Copy-Item -Recurse -Force (Join-Path $repoRoot "dist\*") $pagesDir
    New-Item -ItemType File -Path (Join-Path $pagesDir ".nojekyll") -Force | Out-Null

    git -C $pagesDir add .
    $status = git -C $pagesDir status --porcelain
    if ($status) {
      git -C $pagesDir commit -m "Deploy GitHub Pages"
    }
    git -C $pagesDir push -u origin gh-pages
  }
  finally {
    git worktree remove $pagesDir --force
  }
}
finally {
  Pop-Location
}
