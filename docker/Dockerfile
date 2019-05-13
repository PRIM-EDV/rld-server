FROM yyolk/rpi-archlinuxarm

SHELL ["/bin/bash", "-c"]
RUN export SHELL=/bin/bash

# FIX
RUN rm /etc/ssl/certs/ca-certificates.crt
RUN pacman -Rcs ca-certificates-cacert --noconfirm
RUN pacman -Syu ca-certificates --noconfirm

# Packages
RUN pacman -Sy  --noconfirm \
    python2 \
    gcc \
    scons \
    git \
    wget

# Install MongoDB
RUN  wget https://fastdl.mongodb.org/src/mongodb-src-r3.2.12.tar.gz -P /opt --no-check-certificate
RUN  tar -xvzf /opt/mongodb-src-r3.2.12.tar.gz -C /opt

RUN ln /usr/bin/python2 /usr/bin/python 
RUN cd /opt/mongodb-src-r3.2.12/src/third_party/mozjs-38/ && ./get_sources.sh && ./gen-config.sh arm linux 
RUN cd /opt/mongodb-src-r3.2.12 && scons all -j 2 --disable-warnings-as-errors