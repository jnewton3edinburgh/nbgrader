# Build instructions
Clone Berts nbgrader repository (https://github.com/BertR/nbgrader/tree/jplab_a) or my fork of it (https://github.com/jnewton3edinburgh/nbgrader). The only difference being a cookiecutter extension being added on mine.
 
Setup dev environment:
Fresh python virtual env (I used asdf to manage a python version locally. I used 3.9.9)
* `pip install -r dev-requirements.txt -e .`
* `pip install "jupyterlab==2.3.2"`

To enable the extensions:
* `jupyter labextension list`
* `jupyter labextension install . --no-build`

Installing nbgrader extension:
(Following: https://nbgrader.readthedocs.io/en/latest/user_guide/installation.html)
* `pip install nbgrader`
* `jupyter nbextension install --sys-prefix --py nbgrader --overwrite`
* `jupyter nbextension enable --sys-prefix --py nbgrader`
* `jupyter serverextension enable --sys-prefix --py nbgrader`

I also ran, in each labextension directory (e.g. nbgrader/nbgrader/labextensions/assignment_list):
* `pip install -v .`

Making sure the server extensions are enabled:
* `jupyter serverextension enable --user nbgrader.labextensions.assignment_list.assignment_list`
* `jupyter serverextension enable --user nbgrader.labextensions.course_list.course_list`
* `jupyter serverextension enable --user nbgrader.labextensions.create_assignment.create_assignment`
* `jupyter serverextension enable --user nbgrader.labextensions.validate_assignment.validate_assignment`

nbgrader quickstart:
* `nbgrader quickstart course_id`
This will setup a course (replace `course_id` with whatever) so you can use the extensions

The labextensions should be visible via the command palette. Double click Assignment List to open the Assignment List panel.

Creating a new extension:
(Following: https://github.com/jupyterlab/extension-cookiecutter-ts)
To create a cookiecutter extension:
* `pip install cookiecutter`
* `cookiecutter https://github.com/jupyterlab/extension-cookiecutter-ts`
Then install and enable the extension as before.
You will see 'cookiecutter extension enabled' in the web browser console when jupyter lab loads.


Upgrading extensions from Jupyter lab 2.x to 3.x:
(Following: https://jupyterlab.readthedocs.io/en/stable/extension/extension_migration.html)
* `pip install jupyterlab-requirements`
Make sure you have jupyter lab 3: `pip install "jupyterlab==3.2.8"`
* `python -m jupyterlab.upgrade_extension .` (Run this inside the labextension directory)

This extension, according to the documentation, *should* be updated to 3.x format. However, the `author` line in package.json is not updated. Update this from:
* `"author": "Your Name"` to `"author": {"name": "your name", "email": "your email"}`

The next issue is:
* `ImportError: cannot import name 'wrap_installers' from 'jupyter_packaging' (/tmp/pip-build-env-ir3ftkkr/overlay/lib/python3.9/site-packages/jupyter_packaging/__init__.py)`
Which is ongoing.

---

# nbgrader

Build: [![Build](https://img.shields.io/github/workflow/status/jupyter/nbgrader/Test?logo=github&label=tests)](https://github.com/jupyter/nbgrader/actions)  
Forum: [![Google Group](https://img.shields.io/badge/-Google%20Group-lightgrey.svg)](https://groups.google.com/forum/#!forum/jupyter)  
Coverage: [![codecov.io](http://codecov.io/github/jupyter/nbgrader/coverage.svg?branch=master)](http://codecov.io/github/jupyter/nbgrader?branch=master)  
Cite: [![DOI](https://jose.theoj.org/papers/10.21105/jose.00032/status.svg)](https://doi.org/10.21105/jose.00032)

A system for assigning and grading Jupyter notebooks.

[Documentation can be found on Read the Docs.](https://nbgrader.readthedocs.io/en/stable/)

## Highlights of nbgrader

### Instructor toolbar extension for Jupyter notebooks
The nbgrader toolbar extension for Jupyter notebooks guides the instructor through
assignment and grading tasks using the familiar Jupyter notebook interface.

![Creating assignment](nbgrader/docs/source/user_guide/images/creating_assignment.gif "Creating assignment")

### Instructor "formgrader" extension for Jupyter notebooks

The formgrader extension for the Jupyter notebook allows instructors to use
the core functionality of nbgrader---generating the student version of an
assignment, releasing assignments to students, collecting assignments,
autograding submissions, and manually grading submissions.

![Formgrader extension](nbgrader/docs/source/user_guide/images/formgrader.gif "Formgrader extension")

### Student assignment list extension for Jupyter notebooks
Using the assignment list extension, students may conveniently view, fetch,
submit, and validate their assignments.

![nbgrader assignment list](nbgrader/docs/source/user_guide/images/student_assignment.gif "nbgrader assignment list")

### The command line tools of nbgrader

[Command line tools](https://nbgrader.readthedocs.io/en/latest/command_line_tools/index.html)
offer an efficient way for the instructor to generate, assign, release, collect,
and grade notebooks.

### SciPy 2017 overview talk (click to view on YouTube)

[![nbgrader: A Tool for Creating and Grading Assignments in the Jupyter Notebook | SciPy 2017 ](http://img.youtube.com/vi/5WUm0QuJdFw/0.jpg)](http://www.youtube.com/watch?v=5WUm0QuJdFw "nbgrader: A Tool for Creating and Grading Assignments in the Jupyter Notebook | SciPy 2017 ")

## Installation

For detailed instructions on installing nbgrader and the nbgrader extensions
for Jupyter notebook, please see [Installation](https://nbgrader.readthedocs.io/en/latest/user_guide/installation.html)
section in the User Guide.


## Contributing
Please see the [contributing guidelines and documentation](https://nbgrader.readthedocs.io/en/latest/contributor_guide/overview.html).

If you want to develop features for nbgrader, please follow the
[development installation instructions](https://nbgrader.readthedocs.io/en/latest/contributor_guide/installation_developer.html).
