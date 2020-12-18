## Dependencies

* Python 3.9
* Yarn


## Setup instructions

0. Clone the project
1. poetry install
2. cp .env.example .env
3. poetry run python manage.py migrate
4. yarn --cwd static install
5. poetry run python honcho start
6. Visit http://localhost:8000/home/
