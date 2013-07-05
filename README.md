# The Executioner

The Executioner executes commands (only).

Based on Ansible for the backend, it provides a simple web interface where an end-user can type a command, select the targets (hosts) from an inventory available somewhere and start the execution flow.

Simple approach is to use ansible task only. More advanced would consider using ansible playbook for task chaining.


## Dependencies

This project depends on following projects:
*   ansible (automation tool)
*	twisted (asynchronous web server and framework)

Both can be installed with pip: "pip install ansible twisted"

## Installation and running

Install executioner by cloning this repository into a folder. Go into it and type "python app.py". This will start the web server at port 9000. Open the ui in browser at: "http://localhost:9000".

Remember to configure ansil inventory and needed ssh keay before using running this server.

