## Simplify when I make the project public

zypper refresh
zypper install -y zypper-log man-pages* rsyslog git nodejs14 npm14 wget postgresql-server
zypper patch -y

# Start/Enable Postgresql
systemctl enable --now postgresql.service

# Ensure the SSH agent is running and add the SSH key
sudo mkdir -p /home/vagrant/.ssh/
sudo cp /tmp/id_ed25519* /home/vagrant/.ssh/
sudo chown vagrant:vagrant /home/vagrant/.ssh/id_ed25519*
sudo chmod 600 /home/vagrant/.ssh/id_ed25519
sudo chmod 640 /home/vagrant/.ssh/id_ed25519.pub

sudo mkdir -p /root/.ssh/
sudo cp /tmp/id_ed25519* /root/.ssh/
sudo chmod 600 /root/.ssh/id_ed25519
sudo chmod 640 /root/.ssh/id_ed25519.pub

# Start the SSH agent and add the SSH key as the vagrant user
sudo -u vagrant bash -c 'eval "$(ssh-agent -s)" && ssh-add /home/vagrant/.ssh/id_ed25519'

# Create the directory and set permissions
sudo mkdir -p /opt/lineage
sudo chown vagrant:vagrant /opt/lineage

# Add the remote host's key to the known_hosts file
sudo -u vagrant ssh-keyscan -H github.com >> /home/vagrant/.ssh/known_hosts

# Clone the Private Github Repo
sudo -u vagrant git clone git@github.com:slsnow/lineage.git /opt/lineage

# Change to the server directory and run the lineage_setup.sh script
cd /opt/lineage/server
sudo -u vagrant ./lineage_setup.sh
