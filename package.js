const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_PACKAGE_PATH = path.resolve(__dirname, 'package.json');
const ADDON_DIR = path.resolve(__dirname, 'addon');
const GIT_JSON_PATH = path.resolve(__dirname, 'git.json');

// Step 1: Clone missing repos
const gitLinks = require(GIT_JSON_PATH);
if (!fs.existsSync(ADDON_DIR)) {
  fs.mkdirSync(ADDON_DIR);
}

gitLinks.forEach((url) => {
  const repoName = url.split('/').pop().replace(/\.git$/, '');
  const destPath = path.join(ADDON_DIR, repoName);

  if (!fs.existsSync(destPath)) {
    console.log(`⬇️ Cloning ${url} into addon/${repoName}`);
    try {
      execSync(`git clone ${url} ${destPath}`, { stdio: 'inherit' });
    } catch (err) {
      console.error(`❌ Failed to clone ${url}:`, err.message);
    }
  } else {
    console.log(`✅ Already exists: addon/${repoName}`);
  }
});

// Step 2: Merge addon dependencies
const rootPkg = JSON.parse(fs.readFileSync(ROOT_PACKAGE_PATH, 'utf-8'));
rootPkg.dependencies = rootPkg.dependencies || {};
rootPkg.devDependencies = rootPkg.devDependencies || {};

const addonDirs = fs.readdirSync(ADDON_DIR).filter((dir) => {
  const fullPath = path.join(ADDON_DIR, dir);
  return fs.statSync(fullPath).isDirectory();
});

for (const dir of addonDirs) {
  const addonPkgPath = path.join(ADDON_DIR, dir, 'package.json');
  if (fs.existsSync(addonPkgPath)) {
    const addonPkg = JSON.parse(fs.readFileSync(addonPkgPath, 'utf-8'));

    if (addonPkg.dependencies) {
      for (const [pkg, ver] of Object.entries(addonPkg.dependencies)) {
        if (!rootPkg.dependencies[pkg]) {
          rootPkg.dependencies[pkg] = ver;
        }
      }
    }

    if (addonPkg.devDependencies) {
      for (const [pkg, ver] of Object.entries(addonPkg.devDependencies)) {
        if (!rootPkg.devDependencies[pkg]) {
          rootPkg.devDependencies[pkg] = ver;
        }
      }
    }
  }
}

fs.writeFileSync(ROOT_PACKAGE_PATH, JSON.stringify(rootPkg, null, 2));