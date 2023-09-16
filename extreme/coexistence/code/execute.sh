## Start Install Google Chrome (You may comment out these lines during local development if you already have Chrome installed)

sudo apt update
sudo apt upgrade

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb

sudo apt-get install -f

## End Install Google Chrome

# Write your code here