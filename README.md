### FRONTEND
``` 
cd client
npm i && npm start
```

NOTES: If this were in prod, I would want the api urls to be hidden in a .env file. This would be my next step if I had more time to make sure I never expose a live api accidentally. 

## BACKEND
I'm running this project on python version 3.9.5, however that should be fairly flexible.

### .ENV
```
SECRET_KEY=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
```

### Virtual Environment
```
python3.9 -m virtualenv myenv
source myenv/bin/activate
```

### Run Server
CD into server to run it locally
```
python manage.py runserver
```

## DATABASE and Migrations
I created a file called insert.py to insert comments.json into the database

If you have a postgresql database set up, first run migrations to setup database tables for comments

### Migrations to update tables in the database
```
python manage.py makemigrations 
python manage.py migrate
```

Then you can run the script in insert.py, you will need to set up the db_params.

I worked on this script before setting up the rest of the server including my .env file. With more time I would edit this to use global environment variables!

``` 
python3 ./db/insert.py 
```

## FUTURE IMPROVEMENTS I WOULD MAKE:
- .env file for frontend
- Better UX for frontend "edit" feature, possibly a modal experience styled with Material
- Ability to login as a user and like + post comments (not just as an admin)
- Filter comments by most recent (potentially other filter options as well, like most relevant)
