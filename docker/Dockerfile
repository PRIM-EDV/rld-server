FROM yyolk/rpi-archlinuxarm

# FIX
RUN rm /etc/ssl/certs/ca-certificates.crt
RUN pacman -Rcs ca-certificates-cacert --noconfirm
RUN pacman -Syu ca-certificates --noconfirm

# Packages
RUN pacman -Sy  --noconfirm \
    base-devel \
    python2 \
    scons \
    git \
    wget

# Link python executable
RUN ln /usr/bin/python2 /usr/bin/python

# Install MongoDB
RUN  wget https://fastdl.mongodb.org/src/mongodb-src-r3.2.12.tar.gz -P /opt --no-check-certificate
RUN  tar -xvzf /opt/mongodb-src-r3.2.12.tar.gz -C /opt

WORKDIR /opt/mongodb-src-r3.2.12/src/third_party/mozjs-38
RUN ./get_sources.sh
RUN SHELL=bin/bash /bin/bash -c './gen-config.sh arm linux'

WORKDIR /opt/mongodb-src-r3.2.12
RUN scons core -j 8 --wiredtiger=off --mmapv1=on --disable-warnings-as-errors