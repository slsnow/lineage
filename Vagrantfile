# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "opensuse/Leap-15.4.x86_64"
  config.vm.provider :libvirt do |libvirt|
    libvirt.cpus = 2
    libvirt.memory = 4096
    libvirt.disk_bus = "virtio"
    libvirt.disk_driver :cache => "writeback"
  end
  config.vm.hostname = "opensuse-leap-dev"
  config.vm.synced_folder ".", "/vagrant", disabled: true
  config.vm.network "private_network", ip: "192.168.50.10", gateway: "192.168.50.1"
  config.vm.network "public_network", bridge: "br0", use_dhcp_assigned_default_route: true
  config.vm.provision "file", source: "./id_ed25519", destination: "/tmp/id_ed25519"
  config.vm.provision "file", source: "./id_ed25519.pub", destination: "/tmp/id_ed25519.pub"

  config.vm.provision "shell", inline: <<-SHELL
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
  SHELL
end
