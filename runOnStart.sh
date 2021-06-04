# check dependencies exist
sudo apt update
if which node >/dev/null; then
  echo "node is installed, skipping..."
else
  sudo apt -y install nodejs
fi
if which npm >/dev/null; then
  echo "npm is installed, skipping..."
else
  sudo apt -y install npm@latest
fi
npm install
