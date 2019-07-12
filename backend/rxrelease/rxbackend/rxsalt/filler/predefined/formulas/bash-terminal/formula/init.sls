/etc/bashrc:
  file:
    - managed
    - source: salt://bash-terminal/bashrc-productie
    - user: root
    - group: root
    - mode: 644
