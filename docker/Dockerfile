FROM yyolk/rpi-archlinuxarm

# FIX
RUN pacman -Syuw && --noconfirm \
    rm /etc/ssl/certs/ca-certificates.crt && \
    pacman -Su

# Packages
RUN pacman -Sy \
    glibc && \
    gnutls && \
    gcc && \
    scons && \
    git && \
    wget \

# Install MongoDB
RUN  https://fastdl.mongodb.org/src/mongodb-src-r3.2.12.tar.gz /opt --no-check-certificate
RUN  tar -xvzf /opt/mongodb-src-r3.2.12.tar.gz

RUN scon all /opt/mongodb-src-r3.2.12 --disable-warnings-as-errors